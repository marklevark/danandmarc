"""One-off: convert scraped Squarespace pages (HTML + ?format=json) into src/content YAML and src/assets images.

Usage: python3 scripts/migrate-squarespace.py <scrape-dir> <repo-root>. Kept for reference; the YAML is now the source of truth.
"""
import json, os, re, sys, urllib.parse, urllib.request, html as htmlmod
from bs4 import BeautifulSoup, NavigableString
import yaml

SITE = sys.argv[1]          # scraped site dir
REPO = sys.argv[2]          # repo root
CDN = "images.squarespace-cdn.com"

SLUGS = {  # old urlId -> new slug
    "gillerprize": "who-are-you-reading",
    "theunignorabletower": "the-unignorable-tower",
    "js": "john-st-minecraft-edition",
    "unignorable": "unignorable",
    "doordash": "welcome-to-the-flavourhood",
    "searchhistory": "search-history",
    "bpwishlist": "the-bp-wish-list",
    "unignorable-29ejk": "top-comic",
    "leons": "leons",
    "loblaws": "if-youre-cooking-youre-a-cook",
    "strategyjunior": "strategy-junior",
    "unignorable-29ejk-rhmpk": "marc-before-dan-and-marc",
    "unignorable-29ejk-rhmpk-lbrs9": "dan-before-marc-and-dan",
}

class Str(str): pass
def str_presenter(dumper, data):
    style = "|" if "\n" in data else None
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style=style)
yaml.add_representer(Str, str_presenter)
yaml.add_representer(str, str_presenter)

def clean_url(src):
    src = src.split("?")[0]
    if src.startswith("//"): src = "https:" + src
    return src

def download(url, dest_dir, used):
    os.makedirs(dest_dir, exist_ok=True)
    name = urllib.parse.unquote(urllib.parse.unquote(url.rsplit("/", 1)[1])).replace("+", "-")
    name = re.sub(r"[^A-Za-z0-9._-]+", "-", name).strip("-").lower()
    base, ext = os.path.splitext(name)
    ext = ext or ".jpg"
    if ext == ".jpeg": ext = ".jpg"
    name = base + ext; i = 2
    while name in used and used[name] != url:
        name = f"{base}-{i}{ext}"; i += 1
    used[name] = url
    path = os.path.join(dest_dir, name)
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r, open(path, "wb") as f:
            f.write(r.read())
    return name

def text_of(el):
    # keep <br> as newlines, links as markdown
    parts = []
    for c in el.descendants:
        if isinstance(c, NavigableString):
            if c.parent.name == "a": continue
            parts.append(str(c))
        elif c.name == "br": parts.append("\n")
        elif c.name == "a" and c.get("href"):
            t = c.get_text()
            parts.append(f"[{t}]({c['href']})" if not c["href"].startswith("mailto:") else t)
    return "\n".join(l.strip() for l in re.sub(r"[ \t]+", " ", "".join(parts)).split("\n")).strip()

def walk(main):
    """Yield ordered content tokens from a Squarespace page body."""
    for p in main.select(".item-pagination, .lightbox, .gallery-lightbox"): p.decompose()
    def is_target(el):
        if el.name is None: return False
        cls = el.get("class", [])
        if el.parent is not None and "sqs-html-content" in el.parent.get("class", []): return True
        if "sqs-video-wrapper" in cls and el.get("data-html"): return True
        if el.name == "img": return True
        return False
    for el in main.find_all(is_target):
        cls = el.get("class", [])
        if el.name == "img":
            src = el.get("data-src") or el.get("data-image") or el.get("src")
            if src and CDN in src: yield ("img", clean_url(src), el.get("alt", ""))
        elif "sqs-video-wrapper" in cls:
            h = el["data-html"]
            m = re.search(r"player\.vimeo\.com/video/(\d+)", h)
            y = re.search(r"youtube(?:-nocookie)?\.com/embed/([\w-]+)", h)
            title = (re.search(r'title="([^"]*)"', h) or [None, ""])[1]
            if m: yield ("vimeo", m.group(1), htmlmod.unescape(title))
            elif y: yield ("youtube", y.group(1), htmlmod.unescape(title))
        else:
            t = text_of(el)
            if not t: continue
            if el.name in ("h1", "h2", "h3", "h4"): yield ("h", el.name, t)
            elif el.name in ("ul", "ol"):
                for li in el.find_all("li"): yield ("p", text_of(li))
            else: yield ("p", t)

META_RE = re.compile(r"^(Agency|Client|Role|Client / Agency)\s*:", re.I)

def parse_meta(t):
    out = {}
    for m in re.finditer(r"(Agency|Client / Agency|Client|Role)\s*:\s*(.*?)(?=\s+(?:Agency|Client / Agency|Client|Role)\s*:|$)", t.replace("\n", " ")):
        key = {"agency": "agency", "client": "client", "role": "role", "client / agency": "agency"}[m.group(1).lower()]
        out[key] = m.group(2).strip()
    return out

def convert_project(slug_old, cover_url, order):
    slug = SLUGS[slug_old]
    s = BeautifulSoup(open(f"{SITE}/html/work_{slug_old}.html", encoding="utf8"), "html.parser")
    main = s.find("main")
    item = json.load(open(f"{SITE}/json/work_{slug_old}.json"))["item"]
    title = htmlmod.unescape(item["title"])
    toks = list(walk(main))
    imgdir = f"{REPO}/src/assets/work/{slug}"
    used = {}
    data = {"title": title, "order": order}
    cover = download(clean_url(cover_url), imgdir, used)
    data["cover"] = f"../../assets/work/{slug}/{cover}"
    blocks, seen_imgs = [], set()
    i = 0
    first_meta = None
    while i < len(toks):
        t = toks[i]
        if t[0] == "h":
            # side awards table: names then counts
            if t[2].strip().lower() == "awards":
                ps = []
                j = i + 1
                while j < len(toks) and toks[j][0] == "p": ps.append(toks[j][1]); j += 1
                half = len(ps) // 2
                data["awards"] = [{"show": a, "result": b} for a, b in zip(ps[:half], ps[half:])]
                i = j; continue
            if t[2].strip().lower() == "pr":
                ps = []
                j = i + 1
                while j < len(toks) and toks[j][0] == "p": ps.append(toks[j][1]); j += 1
                data["press"] = " ".join(ps)
                i = j; continue
            if not blocks and t[2].strip().lower() == title.lower():
                i += 1; continue
            blocks.append({"heading": re.sub(r"\s*\n\s*", " ", t[2]).rstrip(":"), "level": int(t[1][1])})
        elif t[0] == "p":
            if META_RE.match(t[1]):
                meta = parse_meta(t[1])
                # merge consecutive meta lines
                while i + 1 < len(toks) and toks[i + 1][0] == "p" and META_RE.match(toks[i + 1][1]):
                    i += 1; meta.update(parse_meta(toks[i][1]))
                if first_meta is None: first_meta = meta
                blocks.append({"credits": meta})
            elif blocks and "text" in blocks[-1]:
                blocks[-1]["text"] = Str(blocks[-1]["text"] + "\n\n" + t[1])
            else:
                blocks.append({"text": Str(t[1])})
        elif t[0] == "img":
            if t[1] in seen_imgs: i += 1; continue
            seen_imgs.add(t[1])
            f = download(t[1], imgdir, used)
            entry = {"src": f"../../assets/work/{slug}/{f}"}
            if t[2] and not re.match(r"^[\w\-+ %().]+\.(jpe?g|png|gif)$", t[2], re.I): entry["alt"] = t[2]
            if blocks and "images" in blocks[-1]: blocks[-1]["images"].append(entry)
            else: blocks.append({"images": [entry]})
        elif t[0] in ("vimeo", "youtube"):
            v = {"provider": t[0], "id": t[1]}
            if t[2]: v["title"] = t[2]
            if blocks and "videos" in blocks[-1]: blocks[-1]["videos"].append(v)
            else: blocks.append({"videos": [v]})
        i += 1
    # drop trailing pagination headings (next/prev project links)
    while blocks and "heading" in blocks[-1]: blocks.pop()
    norm = lambda x: re.sub(r"[’']", "'", x).lower()
    if blocks and "heading" in blocks[0] and norm(blocks[0]["heading"]) == norm(title):
        blocks.pop(0)
    credits = [b["credits"] for b in blocks if "credits" in b]
    if credits and all(c == credits[0] for c in credits):
        # one set of credits for the whole page -> lift into frontmatter
        data.update(credits[0])
        blocks = [b for b in blocks if "credits" not in b]
    if slug == "top-comic":
        # Squarespace grid put year headings after their copy; move each one up
        for k in range(len(blocks) - 1):
            if "text" in blocks[k] and "heading" in blocks[k + 1]:
                blocks[k], blocks[k + 1] = blocks[k + 1], blocks[k]
    data["blocks"] = blocks
    os.makedirs(f"{REPO}/src/content/work", exist_ok=True)
    with open(f"{REPO}/src/content/work/{slug}.yaml", "w") as f:
        f.write(f"# Migrated from https://danandmarc.ca/work/{slug_old}\n")
        yaml.dump(data, f, sort_keys=False, allow_unicode=True, width=1000)
    return slug, len(blocks), len(used)

def convert_awards():
    s = BeautifulSoup(open(f"{SITE}/html/contact-1.html", encoding="utf8"), "html.parser")
    regions = []
    for blk in s.find("main").select(".sqs-html-content"):
        h3 = blk.find("h3")
        if not h3: continue
        region = {"region": h3.get_text(strip=True), "shows": []}
        for p in blk.find_all("p"):
            # each <p> may contain several shows; split on <strong>
            cur = None
            buf = ""
            def flush():
                nonlocal buf, cur
                for line in buf.split("\n"):
                    line = line.strip()
                    if not line or cur is None: continue
                    m = re.match(r"^(\d{4})\s*[-–|]\s*(.*)$", line)
                    if m: cur["entries"].append({"year": int(m.group(1)), "award": m.group(2).strip()})
                    else: cur["entries"].append({"award": line})
                buf = ""
            for c in p.children:
                if getattr(c, "name", None) == "strong" and c.get_text(strip=True):
                    flush()
                    cur = {"show": c.get_text(strip=True), "tally": "", "entries": []}
                    region["shows"].append(cur)
                    buf = ""
                    cur["_tally_pending"] = True
                elif getattr(c, "name", None) == "br":
                    if cur and cur.get("_tally_pending"):
                        cur["tally"] = buf.strip(); buf = ""; cur.pop("_tally_pending")
                    else: buf += "\n"
                else:
                    buf += c.get_text() if hasattr(c, "get_text") else str(c)
            if cur and cur.get("_tally_pending"):
                cur["tally"] = buf.strip(); buf = ""; cur.pop("_tally_pending")
            flush()
        for sh in region["shows"]:
            sh["tally"] = sh["tally"].strip().strip("()").strip()
        regions.append(region)
    os.makedirs(f"{REPO}/src/data", exist_ok=True)
    with open(f"{REPO}/src/data/awards.yaml", "w") as f:
        f.write("# Migrated from https://danandmarc.ca/contact-1\n")
        yaml.dump(regions, f, sort_keys=False, allow_unicode=True, width=1000)
    return [(r["region"], len(r["shows"]), sum(len(x["entries"]) for x in r["shows"])) for r in regions]

if __name__ == "__main__":
    items = json.load(open(f"{SITE}/json/work.json"))["items"]
    for n, it in enumerate(items, 1):
        print(convert_project(it["urlId"], it["assetUrl"], n))
    print(convert_awards())
    # portraits for about page
    used = {}
    for page in ("contact",):
        s = BeautifulSoup(open(f"{SITE}/html/{page}.html", encoding="utf8"), "html.parser")
        for img in s.find("main").find_all("img"):
            src = img.get("data-src") or img.get("src")
            if src and CDN in src: print(download(clean_url(src), f"{REPO}/src/assets/about", used))
