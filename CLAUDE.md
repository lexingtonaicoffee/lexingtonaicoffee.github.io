# CLAUDE.md — Claude & Coffee site

Static marketing site for the Claude & Coffee meetup in Lexington, KY. Plain HTML + CSS on GitHub Pages. Full design and content spec is in `SPEC.md`; read it before making structural or visual changes.

## Ground rules

- No frameworks, build tools, or package managers. Plain `index.html` + `styles.css`.
- No JavaScript except the signup form embed.
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
- `<!-- SIGNUP FORM: START -->` … `<!-- SIGNUP FORM: END -->`
- `<!-- FOOTER: START -->` … `<!-- FOOTER: END -->`

Keep these markers in place.

## How to update the next meetup

When Nick says something like "next meetup is Nov 6 at Awesome Inc, guest host is Jane Doe":

1. **Archive the current one.** Add the current next meetup to the top of the Past Meetups list (date, venue, guest hosts/topic). Unhide the section if it was hidden.
2. **Update the card** in the NEXT MEETUP block: date, time, venue name, address, directions link, guest hosts. If there are no guest hosts, remove the hosts row entirely (don't leave it empty).
3. **Regenerate `next-meetup.ics`** with the same details. Use UTC times:
   - Daylight time (second Sunday in March to first Sunday in November): Eastern = UTC−4, so 9:30–11:00 AM = `13:30–15:00Z`.
   - Standard time (rest of the year): Eastern = UTC−5, so 9:30–11:00 AM = `14:30–16:00Z`.
   - Update `UID` (use the date, e.g. `claude-coffee-2026-11-06@claudeandcoffee`), `DTSTAMP` (now, UTC), `LOCATION`, and `DESCRIPTION`.
4. **Update the Event JSON-LD** in `<head>` to match.
5. **Sanity-check the date** falls on a first or third Friday. If it doesn't, ask Nick whether it's intentional before committing.
6. Commit with a message like `Next meetup: Nov 6 at Awesome Inc`.

If Nick only gives a date, assume 9:30–11:00 AM and ask which venue if it isn't stated.

## Signup form

- Default: HubSpot form embed (signups go to HubSpot as contacts). Needs `portalId` and `formId`.
- Fallback: plain HTML form posting to Formspree (`https://formspree.io/f/FORM_ID`).
- Whichever is used, keep the site's own styling for fields and button. Button text: "Notify me".

## Deploy

Pushing to `main` deploys via GitHub Pages. Nothing else to run.
