import { Deck, Slide, Notes, DefaultTemplate, fadeTransition } from 'spectacle';
import { slides, deckTitle, phaseLabels } from './content.js';
import { layouts, PhaseTracker } from './components/layouts.jsx';
import { theme } from './theme.js';

export default function App() {
  document.title = deckTitle;
  return (
    <Deck
      theme={theme}
      template={() => <DefaultTemplate color="#94a3b8" />}
      transition={fadeTransition}
    >
      {slides.map((s, i) => {
        const { type, notes, background, phase, ...props } = s;
        const Layout = layouts[type];
        return (
          <Slide key={i} backgroundColor={background || 'tertiary'}>
            {Layout ? (
              <Layout {...props} />
            ) : (
              <p className="error">Unknown slide type: “{type}”</p>
            )}
            {phase && <PhaseTracker phase={phase} labels={phaseLabels} />}
            <div className="page-number">{i + 1} / {slides.length}</div>
            {notes && <Notes>{notes}</Notes>}
          </Slide>
        );
      })}
    </Deck>
  );
}
