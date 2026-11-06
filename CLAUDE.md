# CLAUDE.md — Claude & Coffee site

Static marketing site for the Claude & Coffee meetup in Lexington, KY. Plain HTML + CSS on GitHub Pages. Full design and content spec is in `SPEC.md`; read it before making structural or visual changes.

## Ground rules

- No frameworks, build tools, or package managers. Plain `index.html` + `styles.css`.
- No JavaScript except the signup form embed and the small topic-voting script at the bottom of `index.html` (approved by Nick). Don't add other scripts.
- The footer disclaimer must always remain on the page, unchanged unless Nick asks: "Claude & Coffee is an independent community meetup. It is not affiliated with, sponsored by, or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC."
- Never add Anthropic's logo, the Claude spark/starburst mark, or imitations of them.
- Keep the visual system in `SPEC.md` (palette, Fraunces + Instrument Sans, menu-board card). Don't introduce new colors or fonts without being asked.
- After any change, check the page still works at 320px wide and that the HTML is valid.

## Meetup facts

- Schedule: first and third Fridays of each month, 9:30–11:00 AM Eastern.
- Venues:
  - Manchester Coffee Co., 576 E Third St, Lexington, KY 40508
  - Awesome Inc, 348 E Main St, Lexington, KY 40507

## Where content lives

All editable content in `index.html` sits between clearly labeled comment blocks:

- `<!-- NEXT MEETUP: START -->` … `<!-- NEXT MEETUP: END -->`
- `<!-- PAST MEETUPS: START -->` … `<!-- PAST MEETUPS: END -->`
- `<!-- TOPIC VOTING: START -->` … `<!-- TOPIC VOTING: END -->`
- `<!-- SIGNUP FORM: START -->` … `<!-- SIGNUP FORM: END -->`
- `<!-- FOOTER: START -->` … `<!-- FOOTER: END -->`

Keep these markers in place.

## How to update the next meetup

When Nick says something like "next meetup is Nov 6 at Awesome Inc, guest host is Jane Doe":

1. **Archive the current one.** Add the current next meetup to the top of the Past Meetups list (date, venue, guest hosts). Unhide the section if it was hidden. Ask Nick for anything he hasn't given: attendee count, key topics discussed, and links shared. Include only what he provides; never invent numbers or links. Use the item format in the comment inside the PAST MEETUPS block.
2. **Update the card** in the NEXT MEETUP block: date, time, venue name, address, directions link, guest hosts. If there are no guest hosts, remove the hosts row entirely (don't leave it empty).
3. **Regenerate `next-meetup.ics`** with the same details. Use UTC times:
   - Daylight time (second Sunday in March to first Sunday in November): Eastern = UTC−4, so 9:30–11:00 AM = `13:30–15:00Z`.
   - Standard time (rest of the year): Eastern = UTC−5, so 9:30–11:00 AM = `14:30–16:00Z`.
   - Update `UID` (use the date, e.g. `claude-coffee-2026-11-06@claudeandcoffee`), `DTSTAMP` (now, UTC), `LOCATION`, and `DESCRIPTION`.
4. **Update the Event JSON-LD** in `<head>` to match.
5. **Sanity-check the date** falls on a first or third Friday. If it doesn't, ask Nick whether it's intentional before committing.
6. Commit with a message like `Next meetup: Nov 6 at Awesome Inc`.

If Nick only gives a date, assume 9:30–11:00 AM and ask which venue if it isn't stated.

## Topic voting

- Voting is JS (inline script at the bottom of `index.html`) backed by a Google Sheet + Apps Script web app. Backend code and setup steps are in `vote-backend/Code.gs`; it isn't served by the site.
- The section stays hidden until `VOTE_URL` in the script is set and the Sheet's Topics tab has active topics. Topics and counts live in the Sheet, so changing topics never needs a site deploy.
- Votes are keyed to the date in the NEXT MEETUP card's `<time datetime>`, so updating the card automatically starts a fresh vote. Browsers remember a vote per event date in localStorage (a soft limit only).
- Topic suggestions post to Formspree (inbox only, never shown publicly). That block stays hidden until its `FORM_ID` is replaced.
- Never add a way for visitors to publish topics directly.

## Signup form

- Default: HubSpot form embed (signups go to HubSpot as contacts). Needs `portalId` and `formId`.
- Fallback: plain HTML form posting to Formspree (`https://formspree.io/f/FORM_ID`).
- Whichever is used, keep the site's own styling for fields and button. Button text: "Notify me".

## Deploy

Pushing to `main` deploys via GitHub Pages. Nothing else to run.
