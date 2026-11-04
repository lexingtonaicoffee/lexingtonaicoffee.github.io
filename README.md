# Claude & Coffee

Website for Claude & Coffee, a community meetup in Lexington, KY for people using AI tools of any kind (Claude, ChatGPT, Gemini, and more). It meets the first and third Friday of every month, 9:30–11:00 AM.

It's a single static page (`index.html` + `styles.css`) hosted on GitHub Pages. There is no build step.

- **Design and content spec:** [SPEC.md](SPEC.md)
- **How to update content (next meetup, past meetups, signup form):** [CLAUDE.md](CLAUDE.md)
- **Calendar file for the next meetup:** `next-meetup.ics`

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Push to `main`. GitHub Pages serves the repository root (Settings → Pages → Deploy from a branch → `main` / root). Turn on "Enforce HTTPS". For a custom domain, add a `CNAME` file containing the domain and configure DNS.

Claude & Coffee is an independent community meetup. It is not affiliated with, sponsored by, or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC.
