# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Agency creative leaders (CDs / ECDs)** deciding whether to bring in a freelance team for a project, a pitch, or to cover a gap. They are busy, have seen thousands of portfolios, and judge fast on the work itself.
- **Creative recruiters and talent managers** placing senior creatives. They need to understand quickly who Dan and Marc are, what level they work at, and how to reach them.

Both arrive mostly from a direct link (email, LinkedIn, a referral) and skim on desktop or phone.

## Product Purpose

danandmarc.ca is the portfolio of **Dan Cantelon and Marc Levesque**, a Toronto-based freelance creative team. It exists to get the duo hired: freelance bookings, and the right full-time creative leadership role. Success is a qualified visitor emailing them after looking at the work.

## Positioning

A senior duo, not a solo freelancer or an agency: two hybrid creatives who both concept and both lead (they have worked as Associate Creative Directors), with a combined 25+ years at top-tier agencies (Taxi, john st., Rethink, BBDO, Ogilvy and more) and work recognized at every major international and national award show (Cannes, One Show, D&AD, Clios, ADCC, Marketing Awards and more). They present as one unit; individual roles are not split out.

## Operating Context

- Visitors scan the work grid, open two or three case studies, watch a video, glance at Awards, then email (or don't).
- Case studies combine short copy, credits (Agency / Client / Role), image galleries, GIF-style loops and self-hosted video, plus awards and press per project.
- The site is updated often by Dan and Marc themselves (new projects, copy, images) and must stay easy to edit.

## Capabilities and Constraints

- **Stack:** Astro static site; content lives in `src/content/work/*.yaml` (one file per project, `order:` sets position) and `src/data/awards.yaml`; images in `src/assets/work/<project>/`.
- **Hosting:** self-hosted on Unraid (Docker: nginx + a live builder that rebuilds on file change or git push). Videos are self-hosted outside the repo at `/mnt/cache/appdata/danandmarc-media/<project>/<id>.mp4`, served at `/media`.
- **Pages:** Work (home grid), project pages, Contact (bio, emails, client list, portrait), Awards. Old Squarespace URLs 301 to new ones.
- **Fonts must be properly licensed.** Commercial fonts (e.g. Degular, Swear Display, which the original site used via Squarespace) can only be used with an Adobe Fonts web project or a foundry web licence. No such licence exists yet; free stand-ins are used meanwhile.
- **Undecided:** which homepage direction ships (several are live for comparison: `/`, `/night`, `/stack`, `/catalog`, `/timeline`, `/editorial`, `/material`); final headline/body fonts (exploration at `/fonts`, `/pairings`); project years are estimates.

## Brand Commitments

- **Name and running joke:** "We're Dan and Marc. But you can call us Marc and Dan." The names swap; the wordmark flips Dan&Marc ↔ Marc&Dan.
- **Voice:** dry, self-deprecating, confident without bragging ("a combined height of 12'5"", "Dan's the one that's tall", "Say hi to neither"). Short sentences; jokes land in the details.
- **Binding visual preferences stated by the client:** they like the dark theme (near-black `#010101`, warm off-white `#fbefe0`); **no all-caps headlines**; Familjen Grotesk is the current headline stand-in for Degular.

## Evidence on Hand

- 14 projects with real copy, credits, images and video: Smashed (A&W, Rethink, newest; final copy pending), Who are you reading? (Scotiabank Giller Prize, Rethink), The #Unignorable Tower and #UNIGNORABLE (United Way, Taxi), john st. Minecraft Edition, Welcome to the Flavourhood (DoorDash), Search History (Covenant House), The BP Wish List (Boston Pizza), Top Comic (SiriusXM), Leon's, If You're Cooking, You're A Cook (Loblaws), Strategy Junior, and two "before" collections of earlier solo work.
- Full awards record (235 entries) in `src/data/awards.yaml`; per-project awards and press in each project file.
- Smashed results: +13.5 sales growth, 26M earned impressions; press quotes (Little Black Book, PR Newswire, social).
- Portrait by Saty+Pratha (credit required).
- **Absent, do not fabricate:** client testimonials, rates/pricing, availability dates, individual bios beyond what's on Contact.

## Product Principles

1. **The work is the pitch.** Every page gets a visitor to the work faster; nothing competes with it.
2. **Senior, not salesy.** Credibility comes from the work, the agencies and the awards, never from marketing claims.
3. **One duo, one voice.** Present Dan and Marc as a single creative unit with a shared, funny voice.
4. **Easy to say hi.** Contact is always one step away, in plain language.
5. **Easy to keep current.** New projects and copy must stay simple for Dan and Marc to add themselves.

## Accessibility & Inclusion

No product-specific requirement established. The site already respects reduced-motion settings (loops pause, swaps hold still).
