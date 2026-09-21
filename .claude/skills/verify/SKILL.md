---
name: verify
description: How to build/launch/drive this app for runtime verification
---

# Verifying the expense tracker

Surface: browser GUI (Vite dev server, React SPA, no backend).

## Launch

`.claude/skills/verify/../../launch.json` already defines a `expense-tracker`
config (`npm run dev`, port 5173). Use the Browser pane:

```
preview_start({ name: "expense-tracker" })
```

## Drive

- Add: fill Description/Amount/Category/Date, click "Add expense".
- Edit: click "Edit" on a row, form switches to "Edit expense" with
  "Save changes"/"Cancel".
- Filter: category chips above the list.
- Delete: "Delete" button on a row.
- Data lives in `localStorage["expenses"]` — reload the page to check
  persistence.

## Gotchas

- `preview_start`/`navigate` opens tab id `"seed"`. If `computer` screenshot
  calls start timing out with "tab not on screen / minimized", call
  `tabs_select({ tabId: "seed" })` to front it, or fall back to
  `get_page_text` — it works even when the pane isn't drawn.
- Prefer `read_page` → click by `ref`, not raw pixel `coordinate`. The
  screenshot's displayed size (e.g. 800x609) does not match the actual
  viewport (1024x768 by default), so coordinates read off a screenshot can
  click the wrong element.
- The Amount field has native HTML5 `min="0"` validation. Submitting a
  negative number is blocked by the *browser* before React's `onSubmit`
  runs, so the app's own inline error text does not update — it can be left
  showing a stale message from a prior submit attempt.
- Known bugs (see code review findings, not yet fixed as of 2026-09-21):
  switching "Edit" to a different row silently discards unsaved edits in the
  first row; changing the category filter while a row is being edited hides
  it from the list but the edit form stays live and still saves to it.
