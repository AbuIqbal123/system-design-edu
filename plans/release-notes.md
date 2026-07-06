# Release Notes

## Release

- Version: 1.0.0
- Commit: N/A (not a git repo)
- Date: 2026-07-06
- Environment: preview (static build ready for deployment)

## What shipped

Initial release of the System Design Primer learning platform. A React + Vite single-page app with 10 curated system design topics, interactive quiz cards (12 cards with flip-to-reveal), a latency numbers visualization chart, back-of-the-envelope calculation references, structured interview prep with step-by-step guides, progress tracking via localStorage, and full keyboard/screen reader accessibility. Dark theme, responsive mobile layout.

## Why

Closes the initial scaffold-to-functional-app gap. The codebase had well-structured components and pages but was non-functional: `App.jsx` was still the Vite template with no routing, `src/data/topics.js` was missing (all pages crashed on import), and multiple accessibility gaps blocked keyboard users.

## Scope

- [x] `src/App.jsx` — BrowserRouter, layout shell (Sidebar + Header + ReadingProgress), 4 routes (`/`, `/topic/:id`, `/interview`, `/quiz`)
- [x] `src/data/topics.js` — 10 topics, 5 categories, 8 interview questions, 6 interview steps, 12 quiz cards, latency data, powers of two
- [x] `src/pages/QuizPage.jsx` — new page for full quiz card deck
- [x] `src/components/QuizCard.jsx` — `role="button"`, `tabIndex={0}`, Enter/Space keyboard support
- [x] `src/pages/Home.jsx` + `InterviewPrep.jsx` — accordion `<div>` → `<button>`, `aria-expanded`, `aria-controls`
- [x] `src/components/Header.jsx` — ArrowUp/Down/Enter/Escape keyboard nav on search, `role="listbox"`, `role="option"`, `aria-selected`
- [x] `src/index.css` — `prefers-reduced-motion: reduce` media query
- [x] `src/App.css` — deleted (unused Vite scaffold)
- [x] `README.md` — project description, setup, deploy, architecture

## Rollback

1. Revert to previous commit (pre-engineering changes)
2. No database migrations to reverse
3. No environment config to restore

## Health checks

- [x] `npm run lint` — 0 warnings, 0 errors
- [x] `npm run build` — clean build, 276KB JS (86KB gzip), 24KB CSS (5KB gzip)
- [x] All 6 previous blocking findings verified resolved
- [x] QA score: 21/25 (Correctness 4, Security 5, Accessibility 4, Performance 5, Documentation 3→4 after README update)

## Follow-ups

- [ ] Provide image URLs for `interviewQuestions` in `data/topics.js` (currently empty strings, renders broken images)
- [ ] Add topics to the `interview` category or remove the count display for it
- [ ] Add `aria-label` to SVG progress ring in `Header.jsx:106`
- [ ] Add `role="dialog"` and `aria-label` to mobile overlay in `Sidebar.jsx:13`
- [ ] Add `ponytail:` comment to `dangerouslySetInnerHTML` in `ContentRenderer.jsx:8`
- [ ] Initialize git repo and make initial commit
- [ ] Set up CI (lint + build on PR)
- [ ] Deploy to a static host (Vercel, Netlify, or GitHub Pages)
