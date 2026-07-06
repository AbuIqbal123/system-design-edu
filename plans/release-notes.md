# Release Notes

## Release

- Version: 1.1.0
- Commit: a5391ff
- Date: 2026-07-06
- Environment: production (Vercel auto-deploy via GitHub)

## What shipped

Replaced all emoji characters with lucide-react SVG icons across the entire app. Emojis render inconsistently across OS/browser combinations — lucide icons are uniform, accessible, and themeable. Added `src/components/Icon.jsx` as a centralized icon registry (31 icons) and wired it into all components and pages.

## Why

Emojis in UI look inconsistent across platforms (Apple vs Android vs Windows render them differently), can't be themed with CSS, and some screen readers announce them as image descriptions. SVG icons from lucide-react solve all three.

## Scope

- [x] `src/components/Icon.jsx` — new centralized icon registry mapping 31 string names to lucide-react components
- [x] `src/data/topics.js` — all 15 emoji `icon` fields replaced with string names (e.g. `'⚡'` → `'zap'`)
- [x] `src/components/Sidebar.jsx` — logo, category headers, nav links, footer star
- [x] `src/components/Header.jsx` — search icon, menu toggle
- [x] `src/components/ContentRenderer.jsx` — pros/cons headers
- [x] `src/components/LatencyChart.jsx` — info tooltip icon
- [x] `src/pages/Home.jsx` — all section headings, study guide table, accordion chevrons
- [x] `src/pages/InterviewPrep.jsx` — section headings, accordion chevrons
- [x] `src/pages/QuizPage.jsx` — page icon
- [x] `src/pages/TopicPage.jsx` — topic icon, completion toggle, sources heading
- [x] `package.json` — added `lucide-react` dependency

## Rollback

1. `git revert a5391ff`
2. `git push origin main` — Vercel auto-deploys

## Health checks

- [x] `npm run lint` — 0 warnings, 0 errors
- [x] `npm run build` — clean build, 287KB JS (90KB gzip), 24KB CSS (5KB gzip)
- [x] Emoji scan — 0 remaining in source files
- [x] Pushed to GitHub — Vercel auto-deploy triggered

## Follow-ups

- [ ] Provide image URLs for `interviewQuestions` in `data/topics.js` (currently empty strings, renders broken images)
- [ ] Add topics to the `interview` category or remove the count display for it
- [ ] Add `aria-label` to SVG progress ring in `Header.jsx:106`
- [ ] Add `role="dialog"` and `aria-label` to mobile overlay in `Sidebar.jsx:13`
- [ ] Add `ponytail:` comment to `dangerouslySetInnerHTML` in `ContentRenderer.jsx:8`
- [ ] Set up CI (lint + build on PR)
