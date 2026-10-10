# Claude & Coffee — Website Spec

A small, single-page marketing site for Claude & Coffee, a recurring community meetup in Lexington, KY for people using Claude. Hosted on GitHub Pages. Plain HTML and CSS, no build step, no framework.

## Goals

1. Anyone landing on the page knows within five seconds when and where the next meetup is.
2. Visitors can sign up to be notified about upcoming meetups.
3. It's clear the meetup is an independent community event, not affiliated with Anthropic.
4. Nick can update everything by asking Claude Code, so content must live in obvious, single places.

## Audience

Lexington-area business leaders, builders, and curious professionals who use Claude (or want to). Mostly found via LinkedIn shares, word of mouth, and the 210 Leaders / Awesome Inc network, so the page will usually be opened on a phone from a shared link.

## Meetup facts (current)

- **Schedule:** first and third Fridays of every month, 9:30–11:00 AM Eastern
- **Usual locations:**
  - Manchester Coffee Co., 576 E Third St, Lexington, KY 40508 *(confirm address before launch)*
  - Awesome Inc, 348 E Main St, Lexington, KY 40507 *(confirm address before launch)*
- **Next meetup:** Friday, October 16, 2026, 9:30–11:00 AM at Manchester Coffee Co.
- **Guest hosts:** Keith McMunn and Jason Mize of Stellar TechWorks

## File structure

```
/
├── index.html          # the whole site; content blocks clearly commented
├── styles.css
├── next-meetup.ics     # calendar file for the next meetup
├── assets/
│   ├── favicon.svg     # original coffee-cup mark, not the Claude spark
│   └── og-image.png    # 1200×630 social preview
├── CNAME               # only if a custom domain is used
├── CLAUDE.md
└── README.md
```

## Page sections (top to bottom)

### 1. Header
Wordmark "Claude & Coffee" set in the display face, plus a single "Get notified" link that jumps to the signup section. No other nav.

### 2. Hero + next meetup (the signature element)
A one-line description beside or above the next-meetup card, e.g. "A twice-monthly morning meetup in Lexington for people putting Claude to work."

The next-meetup card is styled like a café menu board: espresso-brown background, cream lettering, a slightly inset border like a framed chalkboard. This is the one bold visual moment on the page; everything else stays quiet. Contents:

- Date: "Friday, October 16"
- Time: "9:30–11:00 AM"
- Venue: "Manchester Coffee Co." with the street address beneath
- Guest hosts (optional row, omit entirely when there are none): "Guest hosts: Keith McMunn & Jason Mize, Stellar TechWorks"
- Two actions: "Add to calendar" (links to `next-meetup.ics`) and "Get directions" (Google Maps search URL for the address)

Below the card, one quiet line: "We meet the first and third Friday of every month, alternating between Manchester Coffee Co. and Awesome Inc."

### 3. What happens at a meetup
Two to three short sentences, no cards. Suggested copy: "Grab a coffee, meet people working with Claude, and see what's actually working. Most sessions include a short demo or topic from a guest host, then open conversation and Q&A. Come with a question, a win, or just curiosity."

### 4. Get notified (signup)
Heading: "Get notified about upcoming meetups"
Fields: email (required), first name (optional). Button: "Notify me". Success message: "You're on the list. See you at the next one."

**Form backend:** default to a HubSpot form embed so signups land in HubSpot as contacts. Leave clearly marked placeholders for `portalId` and `formId` and a comment explaining where to get them. If HubSpot isn't ready at build time, build the form as a plain HTML form posting to Formspree (`action="https://formspree.io/f/FORM_ID"`) so it can be swapped later. Either way, style the form to match the site rather than using the provider's default styling.

### 5. Past meetups
A simple list, newest first: date, venue, guest hosts or topic. Starts empty; hide the section entirely while empty.

### 6. Footer
- Disclaimer (required, always visible): "Claude & Coffee is an independent community meetup. It is not affiliated with, sponsored by, or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC."
- Contact line (placeholder email or LinkedIn link for Nick)
- © year

## Visual design

The brief: borrow the calm, warm, literate feel of Anthropic's Claude product, then pull it into a neighborhood coffee shop.

### Palette

| Name | Hex | Use |
|---|---|---|
| Kraft | `#F3ECE0` | page background |
| Steamed milk | `#FBF7F1` | form fields, light surfaces |
| Espresso | `#2A1C14` | body text, menu-board background |
| Roast | `#6B4A36` | secondary text, borders |
| Crema | `#E7C9A0` | lettering accents on the menu board, dividers |
| Clay | `#C4673F` | buttons and links (the nod to Claude) |

Check contrast: clay buttons need cream or white text at sufficient size; body text is espresso on kraft.

### Type
- **Display:** Fraunces (Google Fonts), using its soft, slightly wonky optical styles at large sizes for a hand-lettered café-sign feel. Used for the wordmark, headings, and the menu-board date.
- **Body/UI:** Instrument Sans (Google Fonts).
- Clear type scale, sentence case everywhere, body line length under ~70 characters.
- Avoid: all-caps eyebrow labels, highlighting a single word in a headline, arrows appended to buttons, numbered section markers.

### Layout
- Mobile-first, single column; on wide screens the hero can sit description-left, menu-board-right.
- Left-aligned text. Generous vertical spacing between sections.
- Max content width around 1040px.

### Imagery
- No photos required at launch. Optional subtle paper/kraft texture via CSS.
- A small original coffee-cup mark for the favicon and header.
- Do not use Anthropic's logo, the Claude spark/starburst mark, or anything that imitates them.

### Motion
At most one gentle page-load moment (e.g. the menu board settling in). Respect `prefers-reduced-motion`. No scroll-triggered animations.

## Calendar file (`next-meetup.ics`)

Valid iCalendar file for the next meetup. Use UTC times to avoid time-zone blocks. October 16, 2026 is during daylight time, so 9:30–11:00 AM EDT = `13:30–15:00Z`:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Claude & Coffee//EN
BEGIN:VEVENT
UID:claude-coffee-2026-10-16@claudeandcoffee
DTSTAMP:20261009T000000Z
DTSTART:20261016T133000Z
DTEND:20261016T150000Z
SUMMARY:Claude & Coffee
LOCATION:Manchester Coffee Co., 576 E Third St, Lexington, KY 40508
DESCRIPTION:Guest hosts: Keith McMunn & Jason Mize, Stellar TechWorks
END:VEVENT
END:VCALENDAR
```

## SEO and sharing
- `<title>`: "Claude & Coffee · Lexington, KY"
- Meta description mentioning the schedule and Lexington
- Open Graph and Twitter card tags pointing to `assets/og-image.png`
- Schema.org `Event` JSON-LD for the next meetup (keep in sync with the card)

## Quality bar
- Valid, semantic HTML; one `<h1>`
- Responsive to 320px wide
- Visible keyboard focus states, labeled form inputs
- Lighthouse accessibility and performance 95+
- No JavaScript except the form embed (if HubSpot is used)

## Deployment
GitHub Pages from the `main` branch, root folder. If a custom domain is chosen, add it to `CNAME` and configure DNS. Enable "Enforce HTTPS."

## Open items for Nick
- Confirm both venue addresses
- HubSpot portal ID and form ID (or decide on Formspree)
- Contact email/LinkedIn for the footer
- Custom domain, if any
- Links for guest hosts (Stellar TechWorks website, LinkedIn profiles), if wanted
