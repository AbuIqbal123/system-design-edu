# System Design Primer

An interactive learning platform for system design interview preparation. Built with React + Vite.

## Features

- 10 curated topics covering fundamentals, data/storage, communication, and scale
- Interactive quiz cards with flip-to-reveal answers
- Latency numbers visualization with animated bar chart
- Back-of-the-envelope calculation reference (powers of two)
- Structured interview approach with step-by-step guide
- Progress tracking (persisted to localStorage)
- Full keyboard and screen reader accessibility
- Dark theme with responsive mobile layout

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run oxlint |

## Deploy

The `dist/` folder is a static site. Deploy to any static host:

- **Vercel**: `vercel --prod`
- **Netlify**: drag `dist/` or `netlify deploy --prod`
- **GitHub Pages**: push `dist/` to `gh-pages` branch

## Architecture

Single-page app with client-side routing (`react-router-dom`). All content is static data in `src/data/topics.js` — no backend, no database. Progress is stored in `localStorage`.

```
src/
  components/   — Header, Sidebar, ContentRenderer, QuizCard, LatencyChart, ReadingProgress
  pages/        — Home, TopicPage, InterviewPrep, QuizPage
  data/         — topics.js (all content)
```

## License

MIT
