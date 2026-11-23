// ─────────────────────────────────────────────────────────────
//  LAYOUTS — one React component per slide `type`.
//  To add a new type: write a component here, then register it
//  in the `layouts` map at the bottom of this file.
// ─────────────────────────────────────────────────────────────
import { useContext, useEffect, useState } from 'react';
import { motion, animate } from 'motion/react';
import { SlideContext, Appear, CodePane } from 'spectacle';

/** True while this slide is on screen — used to (re)start animations. */
export function useIsActive() {
  const ctx = useContext(SlideContext);
  return ctx?.isSlideActive ?? true;
}

/* Re-usable animation presets ----------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = (gap = 0.15, delay = 0.2) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Wrapper that plays its variants every time the slide becomes active. */
function Stage({ children, className = 'stage', variants = stagger() }) {
  const active = useIsActive();
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

const Title = ({ children }) => (
  <motion.h2 className="slide-title" variants={fadeUp}>
    {children}
  </motion.h2>
);

/* Layouts -------------------------------------------------------------- */

function TitleSlide({ kicker, title, subtitle }) {
  return (
    <Stage className="stage center" variants={stagger(0.2, 0.1)}>
      {kicker && <motion.p className="kicker" variants={fadeUp}>{kicker}</motion.p>}
      <motion.h1
        className="hero"
        variants={{
          hidden: { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
          show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.9 } },
        }}
      >
        {title}
      </motion.h1>
      <motion.div className="accent-line" variants={{
        hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } },
      }} />
      {subtitle && <motion.p className="subtitle" variants={fadeUp}>{subtitle}</motion.p>}
    </Stage>
  );
}

function BulletsSlide({ title, items = [], reveal = 'auto' }) {
  if (reveal === 'click') {
    return (
      <Stage>
        <Title>{title}</Title>
        <ul className="bullets">
          {items.map((item, i) => (
            <Appear key={i}>
              <li>{item}</li>
            </Appear>
          ))}
        </ul>
      </Stage>
    );
  }
  return (
    <Stage>
      <Title>{title}</Title>
      <motion.ul className="bullets" variants={stagger(0.18, 0.3)}>
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </Stage>
  );
}

function CountUp({ value, decimals = 0, suffix = '', prefix = '' }) {
  const active = useIsActive();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) { setDisplay(0); return; }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    });
    // Fallback: always land on the final number, even if the animation is interrupted.
    const done = setTimeout(() => setDisplay(value), 1800);
    return () => { controls.stop(); clearTimeout(done); };
  }, [active, value]);
  return <span>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

function StatsSlide({ title, items = [] }) {
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="stats">
        {items.map((s, i) => (
          <motion.div key={i} className="stat" variants={fadeUp}>
            <div className="stat-value"><CountUp {...s} /></div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Stage>
  );
}

function ChartSlide({ title, data = [], unit = '' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="chart">
        {data.map((d, i) => (
          <div key={i} className="bar-col">
            <motion.div className="bar-value" variants={fadeUp}>{d.value}{unit}</motion.div>
            <motion.div
              className="bar"
              style={{ originY: 1 }}
              variants={{
                hidden: { scaleY: 0 },
                show: { scaleY: 1, transition: { duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' } },
              }}
            >
              <div className="bar-fill" style={{ height: `${(d.value / max) * 100}%` }} />
            </motion.div>
            <div className="bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function SplitSlide({ title, left, right }) {
  const Column = ({ col, from }) => (
    <motion.div
      className="column"
      variants={{
        hidden: { opacity: 0, x: from },
        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      }}
    >
      <h3>{col.heading}</h3>
      <ul>{col.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </motion.div>
  );
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="split">
        <Column col={left} from={-80} />
        <Column col={right} from={80} />
      </div>
    </Stage>
  );
}

function CodeSlide({ title, code, language = 'js', highlight }) {
  return (
    <Stage>
      <Title>{title}</Title>
      <motion.div className="code-wrap" variants={fadeUp}>
        <CodePane language={language} highlightRanges={highlight}>
          {code}
        </CodePane>
      </motion.div>
    </Stage>
  );
}

function TimelineSlide({ title, items = [] }) {
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="timeline">
        <motion.div
          className="timeline-line"
          style={{ originX: 0 }}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, delay: 0.3 } } }}
        />
        <motion.div className="timeline-items" variants={stagger(0.25, 0.5)}>
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 14 } },
              }}
            >
              <div className="dot" />
              <div className="when">{it.when}</div>
              <div className="what">{it.what}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Stage>
  );
}

function ImageSlide({ title, src, caption }) {
  // Prefix public-folder paths so the built deck also works from a sub-folder.
  const url = src?.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src;
  return (
    <Stage>
      {title && <Title>{title}</Title>}
      <motion.img
        className="image"
        src={url}
        alt={caption || title || ''}
        variants={{
          hidden: { opacity: 0, scale: 1.15 },
          show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: 'easeOut' } },
        }}
      />
      {caption && <motion.p className="caption" variants={fadeUp}>{caption}</motion.p>}
    </Stage>
  );
}

function QuoteSlide({ text, author }) {
  return (
    <Stage className="stage center" variants={stagger(0.4, 0.2)}>
      <motion.blockquote
        className="quote"
        variants={{
          hidden: { opacity: 0, rotateX: 40, y: 30 },
          show: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.9 } },
        }}
      >
        “{text}”
      </motion.blockquote>
      {author && <motion.p className="author" variants={fadeUp}>— {author}</motion.p>}
    </Stage>
  );
}

function EndSlide({ title, subtitle, contact }) {
  return (
    <Stage className="stage center" variants={stagger(0.25, 0.1)}>
      <motion.h1
        className="hero"
        variants={{
          hidden: { opacity: 0, y: 60 },
          show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 12 } },
        }}
      >
        {title}
      </motion.h1>
      {subtitle && <motion.p className="subtitle" variants={fadeUp}>{subtitle}</motion.p>}
      {contact && <motion.p className="contact" variants={fadeUp}>{contact}</motion.p>}
    </Stage>
  );
}


/* ── Grüezi Deutsch custom layouts ─────────────────────────────────── */

const pop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 14 } },
};

/** CH → Confoederatio Helvetica → Helvetism */
function OriginSlide({ title, letters = [], expansion = [], arrow, result, resultNote }) {
  return (
    <Stage className="stage center" variants={stagger(0.5, 0.2)}>
      {title && <Title>{title}</Title>}
      <motion.div className="origin-badge" variants={pop}>
        {letters.map((l, i) => <span key={i}>{l}</span>)}
      </motion.div>
      <motion.div className="origin-expansion" variants={stagger(0.25, 0)}>
        {expansion.map((w, i) => (
          <motion.span key={i} variants={fadeUp}>
            <b>{w.slice(0, 1)}</b>{w.slice(1)}
          </motion.span>
        ))}
      </motion.div>
      <motion.div className="origin-arrow" variants={fadeUp}>{arrow}</motion.div>
      <motion.div className="origin-result" variants={pop}>{result}</motion.div>
      {resultNote && <motion.p className="subtitle small" variants={fadeUp}>{resultNote}</motion.p>}
    </Stage>
  );
}

/** Two overlapping circles; click a region to see its examples. */
function VennSlide({ title, left, right, overlap, caption }) {
  const [focus, setFocus] = useState('overlap');
  const active = useIsActive();
  useEffect(() => { if (!active) setFocus('overlap'); }, [active]);
  const regions = { left, overlap, right };
  const current = regions[focus];
  const circle = (side, from) => (
    <motion.div
      className={`venn-circle ${side} ${focus === side ? 'focused' : ''}`}
      onClick={() => setFocus(side)}
      variants={{
        hidden: { opacity: 0, x: from },
        show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } },
      }}
    >
      <div className="venn-label">
        <strong>{regions[side].heading}</strong>
        <span>{regions[side].sub}</span>
      </div>
    </motion.div>
  );
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="venn-wrap">
        <div className="venn">
          {circle('left', -160)}
          {circle('right', 160)}
          <motion.button
            className={`venn-overlap ${focus === 'overlap' ? 'focused' : ''}`}
            onClick={() => setFocus('overlap')}
            variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { delay: 0.9, type: 'spring' } } }}
          >
            <strong>{overlap.heading}</strong>
            <span>{overlap.sub}</span>
          </motion.button>
        </div>
        <motion.div className={`venn-detail ${focus}`} variants={fadeUp} key={focus}>
          <h3>{current.heading}</h3>
          <p>{current.text}</p>
          <div className="chips">
            {current.examples.map((e, i) => <span key={i} className="chip">{e}</span>)}
          </div>
        </motion.div>
      </div>
      {caption && <motion.p className="caption" variants={fadeUp}>{caption}</motion.p>}
    </Stage>
  );
}

/** Research numbers + two cards (user group, purpose). */
function EvidenceSlide({ title, stats = [], cards = [], footnote }) {
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="stats compact">
        {stats.map((s, i) => (
          <motion.div key={i} className="stat" variants={fadeUp}>
            <div className="stat-value"><CountUp {...s} /></div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="cards">
        {cards.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeUp}>
            <div className="card-num">{i + 1}</div>
            <div>
              <h3>{c.heading}</h3>
              <p>{c.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {footnote && <motion.p className="caption left" variants={fadeUp}>{footnote}</motion.p>}
    </Stage>
  );
}

/** Bounded rationality: constraints narrow the scope; the "from" phrase morphs into "to". */
function ScopeSlide({ title, author, constraints = [], from, to, example }) {
  const active = useIsActive();
  const [switched, setSwitched] = useState(false);
  useEffect(() => {
    if (!active) { setSwitched(false); return; }
    const t = setTimeout(() => setSwitched(true), 2200);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <Stage>
      <Title>{title}</Title>
      {author && <motion.p className="kicker left" variants={fadeUp}>{author}</motion.p>}
      <div className="constraints">
        {constraints.map((c, i) => (
          <motion.div key={i} className="constraint" variants={pop}>
            <span className="c-icon">{c.icon}</span>
            <span>{c.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="scope-shift" variants={fadeUp} onClick={() => setSwitched((v) => !v)}>
        <motion.span
          className="scope-from"
          animate={switched ? { opacity: 0.45, scale: 0.85 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {from}
          <motion.span
            className="strike"
            style={{ originX: 0 }}
            animate={{ scaleX: switched ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.span>
        <motion.span className="scope-arrow" animate={{ opacity: switched ? 1 : 0.2 }}>→</motion.span>
        <motion.span
          className="scope-to"
          animate={switched ? { opacity: 1, scale: 1.08 } : { opacity: 0.15, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 160, damping: 12 }}
        >
          {to}
        </motion.span>
      </motion.div>
      {example && (
        <motion.div className="scope-example" animate={{ opacity: switched ? 1 : 0, y: switched ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <span className="dialect">{example.from}</span>
          <span className="scope-arrow small">→</span>
          <span className="standard">{example.to}</span>
          {example.note && <em>{example.note}</em>}
        </motion.div>
      )}
    </Stage>
  );
}

/** Table whose rows slide in one after another. */
function TableSlide({ title, columns = [], rows = [], note, size = 'normal' }) {
  return (
    <Stage>
      <Title>{title}</Title>
      <div className={`table-wrap ${size}`}>
        <table className="deck-table">
          <thead>
            <tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <motion.tbody variants={stagger(0.07, 0.3)}>
            {rows.map((r, i) => (
              <motion.tr
                key={i}
                variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}
              >
                {r.map((cell, j) => <td key={j}>{cell}</td>)}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
    </Stage>
  );
}

/** Conceptual agent-system diagram with a repair loop. */
function AgentFlowSlide({ title, systemLabel, learner, goal, chain = [], loop, controller, outputs = [], resources = [], output, note }) {
  const node = (text, cls = '') => (
    <motion.div className={`flow-node ${cls}`} variants={pop}>{text}</motion.div>
  );
  return (
    <Stage className="stage" variants={stagger(0.12, 0.2)}>
      <Title>{title}</Title>
      <div className="flow">
        <div className="flow-row">
          {node(learner, 'dark')}
          <motion.span className="flow-arrow" variants={fadeUp}>→</motion.span>
          {node(goal, 'goal')}
        </div>
        <motion.div className="flow-system" variants={stagger(0.12, 0.1)}>
          <motion.div className="flow-system-label" variants={fadeUp}>{systemLabel}</motion.div>
          <div className="flow-row">
            {chain.map((c, i) => (
              <span key={i} className="flow-step">
                {node(c, c.includes('Checker') ? 'checker' : 'agent')}
                {i < chain.length - 1 && <motion.span className="flow-arrow" variants={fadeUp}>→</motion.span>}
              </span>
            ))}
            <motion.span className="flow-arrow" variants={fadeUp}>→</motion.span>
            {node(controller, 'controller')}
          </div>
          {loop && (
            <motion.div className="flow-loop" variants={fadeUp}>↺ {loop}</motion.div>
          )}
          <div className="flow-row small">
            {outputs.map((o, i) => <span key={i}>{node(o, 'mini')}</span>)}
          </div>
          <div className="flow-row side">
            {resources.map((r, i) => <span key={i}>{node(r, 'resource')}</span>)}
          </div>
        </motion.div>
        <div className="flow-row">{node(output, 'dark wide')}</div>
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
    </Stage>
  );
}

/** Clickable list of layers: click a letter to see what it means. */
function LayersSlide({ title, layers = [], hint }) {
  const [sel, setSel] = useState(0);
  const active = useIsActive();
  useEffect(() => { if (!active) setSel(0); }, [active]);
  const L = layers[sel];
  return (
    <Stage>
      <Title>{title}</Title>
      <div className="layers">
        <motion.div className="layer-tabs" variants={stagger(0.06, 0.2)}>
          {layers.map((l, i) => (
            <motion.button
              key={i}
              className={`layer-tab ${i === sel ? 'on' : ''}`}
              onClick={() => setSel(i)}
              variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
            >
              <span className="layer-letter">{l.letter}</span>{l.name}
            </motion.button>
          ))}
        </motion.div>
        <motion.div className="layer-detail" key={sel} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h3>{L.letter} · {L.name}</h3>
          {L.lead && <p className="lead">{L.lead}</p>}
          <ul>{L.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          {L.note && <p className="layer-note">{L.note}</p>}
        </motion.div>
      </div>
      {hint && <motion.p className="caption left" variants={fadeUp}>{hint}</motion.p>}
    </Stage>
  );
}

/** Simplified six-block architecture (learner → system → output). */
function ArchitectureSlide({ title, top, system, blocks = [], pair = [], bottom }) {
  const drop = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
  };
  return (
    <Stage className="stage" variants={stagger(0.18, 0.2)}>
      <Title>{title}</Title>
      <div className="arch">
        <motion.div className="arch-end" variants={drop}><strong>{top.heading}</strong><span>{top.sub}</span></motion.div>
        <motion.div className="arch-arrow" variants={fadeUp}>↓</motion.div>
        <motion.div className="arch-system" variants={stagger(0.18, 0.1)}>
          <motion.div className="arch-system-label" variants={fadeUp}>{system}</motion.div>
          {blocks.map((b, i) => (
            <motion.div key={i} className="arch-block" variants={drop}><strong>{b.heading}</strong><span>{b.sub}</span></motion.div>
          ))}
          <div className="arch-pair">
            {pair.map((b, i) => (
              <motion.div key={i} className="arch-block" variants={drop}><strong>{b.heading}</strong><span>{b.sub}</span></motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="arch-arrow" variants={fadeUp}>↓</motion.div>
        <motion.div className="arch-end" variants={drop}><strong>{bottom.heading}</strong><span>{bottom.sub}</span></motion.div>
      </div>
    </Stage>
  );
}

/* Registry: slide `type` → component ----------------------------------- */
export const layouts = {
  title: TitleSlide,
  bullets: BulletsSlide,
  stats: StatsSlide,
  chart: ChartSlide,
  split: SplitSlide,
  code: CodeSlide,
  timeline: TimelineSlide,
  image: ImageSlide,
  quote: QuoteSlide,
  end: EndSlide,
  origin: OriginSlide,
  venn: VennSlide,
  evidence: EvidenceSlide,
  scope: ScopeSlide,
  table: TableSlide,
  agentflow: AgentFlowSlide,
  layers: LayersSlide,
  architecture: ArchitectureSlide,
};
