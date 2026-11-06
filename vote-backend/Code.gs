/**
 * Claude & Coffee — topic voting backend (Google Apps Script).
 * This file is NOT served by the site; it lives here for reference and version control.
 *
 * SETUP (one time, ~5 minutes)
 * 1. Create a new Google Sheet (e.g. "Claude & Coffee votes").
 * 2. Extensions → Apps Script. Paste this whole file over the default Code.gs.
 * 3. Run the `setup` function once (authorize when prompted). It creates two tabs:
 *      Topics: id | label | active    (the list people vote from)
 *      Votes:  timestamp | event | topic_id
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as: Me.  Who has access: Anyone.
 *    Copy the web app URL and paste it into VOTE_URL in index.html.
 *
 * EVERY MEETUP
 * - Edit the Topics tab: 5–10 rows, each with a short unique id (e.g. "agents"), a label shown
 *   on the site, and active = TRUE. Set active to FALSE (or delete the row) to retire a topic.
 * - Votes are tagged with the date from the site's NEXT MEETUP card, so counts start fresh
 *   for each meetup. Old votes stay in the Votes tab as a record.
 * - Visitors can only vote for ids that are active here. Nobody can add topics through the site;
 *   suggestions go to your inbox via the Formspree form.
 *
 * AFTER CHANGING THIS CODE: Deploy → Manage deployments → edit → New version → Deploy.
 */

var MAX_VOTES = 3;
var TOPICS_SHEET = "Topics";
var VOTES_SHEET = "Votes";

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var topics = ss.getSheetByName(TOPICS_SHEET) || ss.insertSheet(TOPICS_SHEET);
  if (topics.getLastRow() === 0) {
    topics.appendRow(["id", "label", "active"]);
    topics.appendRow(["example", "Example topic (edit or delete me)", true]);
  }
  var votes = ss.getSheetByName(VOTES_SHEET) || ss.insertSheet(VOTES_SHEET);
  if (votes.getLastRow() === 0) votes.appendRow(["timestamp", "event", "topic_id"]);
  // Keep the event column as plain text so "2026-11-20" isn't turned into a date.
  votes.getRange("B:B").setNumberFormat("@");
}

function doGet(e) {
  var event = cleanEvent(e && e.parameter && e.parameter.event);
  return json(event ? results(event) : { ok: false, error: "bad event" });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var body = JSON.parse(e.postData.contents);
    var event = cleanEvent(body.event);
    if (!event) return json({ ok: false, error: "bad event" });

    var active = {};
    activeTopics().forEach(function (t) { active[t.id] = true; });

    var seen = {};
    var ids = (Array.isArray(body.topics) ? body.topics : [])
      .map(String)
      .filter(function (id) {
        if (!active[id] || seen[id]) return false;
        seen[id] = true;
        return true;
      })
      .slice(0, MAX_VOTES);
    if (!ids.length) return json({ ok: false, error: "no valid topics" });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VOTES_SHEET);
    var start = sheet.getLastRow() + 1;
    var now = new Date();
    var rows = ids.map(function (id) { return [now, event, id]; });
    sheet.getRange(start, 2, rows.length, 1).setNumberFormat("@");
    sheet.getRange(start, 1, rows.length, 3).setValues(rows);

    var out = results(event);
    out.ok = true;
    return json(out);
  } catch (err) {
    return json({ ok: false, error: "bad request" });
  } finally {
    lock.releaseLock();
  }
}

function activeTopics() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TOPICS_SHEET);
  var rows = sheet.getDataRange().getValues().slice(1);
  return rows
    .filter(function (r) { return r[0] && r[1] && (r[2] === true || String(r[2]).toUpperCase() === "TRUE"); })
    .map(function (r) { return { id: String(r[0]), label: String(r[1]) }; });
}

function results(event) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VOTES_SHEET);
  var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  var counts = {};
  sheet.getDataRange().getValues().slice(1).forEach(function (r) {
    var ev = r[1] instanceof Date ? Utilities.formatDate(r[1], tz, "yyyy-MM-dd") : String(r[1]);
    if (ev === event) counts[r[2]] = (counts[r[2]] || 0) + 1;
  });
  return {
    event: event,
    topics: activeTopics().map(function (t) {
      return { id: t.id, label: t.label, votes: counts[t.id] || 0 };
    })
  };
}

function cleanEvent(v) {
  v = String(v || "");
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
