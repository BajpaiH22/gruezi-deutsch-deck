# React Deck — instructions for Claude Code

This is a Spectacle + Motion slide deck (Vite, React 18).

- **Slide content lives only in `src/content.js`.** Add, remove or reorder slides by editing the `slides` array. Don't hard-code text in components.
- Each slide is `{ type, ...fields, notes?, background? }`. Existing types and their fields are documented by the examples in `content.js`.
- **New slide type:** write a component in `src/components/layouts.jsx` that uses `<Stage>` plus `motion.*` variants (so it animates whenever the slide becomes active), then register it in the `layouts` map. Add an example to `content.js`.
- Step-by-step reveals use Spectacle's `<Appear>`; code highlight steps use `highlight: [[start, end], ...]`.
- Colours: `src/theme.js` (Spectacle) plus the `:root` CSS variables in `src/styles.css`. Keep them in sync.
- Images go in `public/` and are referenced as `'/name.ext'`.
- After changes, run `npm run build` to check for errors.
