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

function StatsSlide({ title, items = [], note }) {
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
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
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

function SplitSlide({ title, left, right, note, size = 'normal' }) {
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
      <div className={`split ${size}`}>
        <Column col={left} from={-80} />
        <Column col={right} from={80} />
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
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
function ScopeSlide({ title, author, constraints = [], from, to, example, levels }) {
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
      {levels && (
        <motion.div className="scope-levels" animate={{ opacity: switched ? 1 : 0, y: switched ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.7 }}>
          <span className="scope-levels-label">{levels.label}</span>
          {levels.items.map((l, i) => (
            <span key={i} className="level-chip"><strong>{l.code}</strong>{l.name}</span>
          ))}
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

/* Development-process layouts ------------------------------------------ */

const Question = ({ children }) =>
  children ? <motion.p className="question" variants={fadeUp}>{children}</motion.p> : null;

/** Five phases in a snake: 1 → 2 → 3 ↓ 4 → 5, click a phase for its detail. */
function PhasesSlide({ title, phases = [], loopLabel, hint }) {
  const [open, setOpen] = useState(null);
  const [p1, p2, p3, p4, p5] = phases;
  const Box = ({ p, i }) => (
    <motion.button
      type="button"
      className={`phase-box ${open === i ? 'on' : ''}`}
      variants={pop}
      onClick={() => setOpen(open === i ? null : i)}
    >
      <span className="phase-n">{i + 1}</span>
      <strong>{p.heading}</strong>
      <span>{p.question}</span>
    </motion.button>
  );
  const Arrow = ({ children = '→' }) => <motion.span className="phase-arrow" variants={fadeUp}>{children}</motion.span>;
  const detail = open !== null ? phases[open] : null;
  return (
    <Stage variants={stagger(0.12, 0.2)}>
      <Title>{title}</Title>
      <div className="phases">
        <div className="phase-row">
          <Box p={p1} i={0} /><Arrow /><Box p={p2} i={1} /><Arrow /><Box p={p3} i={2} />
        </div>
        <div className="phase-row end"><Arrow>↓</Arrow></div>
        <div className="phase-row end">
          <Box p={p5} i={4} />
          <motion.div className="phase-back" variants={fadeUp}>
            <span>←</span>
            <span className="dashed">{loopLabel} ⇢</span>
          </motion.div>
          <Box p={p4} i={3} />
        </div>
      </div>
      <motion.div className="phase-detail" variants={fadeUp}>
        {detail ? (
          <><strong>{open + 1}. {detail.verb}</strong> — {detail.logic}</>
        ) : (
          <span className="muted">{hint}</span>
        )}
      </motion.div>
    </Stage>
  );
}

/** One step box; `split` turns it into two stacked boxes (e.g. pass / fail). */
function StepBox({ step }) {
  if (step.split) {
    return (
      <div className="step-split">
        {step.split.map((s, i) => <StepBox key={i} step={s} />)}
      </div>
    );
  }
  return (
    <div className={`step-box ${step.tone || ''}`}>
      <strong>{step.heading}</strong>
      {step.sub && <span>{step.sub}</span>}
    </div>
  );
}

/** Horizontal flow of steps, optionally framed (group), with input/output ends and a loop-back line. */
function StepsSlide({ title, question, input, group, steps = [], output, loop, note, facts = [] }) {
  const row = (
    <div className="steps-row">
      {steps.map((st, i) => (
        <motion.div key={i} className="steps-item" variants={pop}>
          {i > 0 && <span className="steps-arrow">→</span>}
          <StepBox step={st} />
        </motion.div>
      ))}
    </div>
  );
  return (
    <Stage variants={stagger(0.15, 0.2)}>
      <Title>{title}</Title>
      <Question>{question}</Question>
      <div className="steps">
        {input && (
          <motion.div className="steps-item" variants={pop}>
            <StepBox step={{ ...input, tone: 'dark' }} /><span className="steps-arrow">→</span>
          </motion.div>
        )}
        {group ? (
          <motion.div className="steps-group" variants={stagger(0.15, 0.1)}>
            <motion.span className="steps-group-label" variants={fadeUp}>{group}</motion.span>
            {row}
          </motion.div>
        ) : row}
        {output && (
          <motion.div className="steps-item" variants={pop}>
            <span className="steps-arrow">→</span><StepBox step={{ ...output, tone: 'dark' }} />
          </motion.div>
        )}
      </div>
      {loop && (
        <motion.div
          className="steps-loop"
          style={{ originX: 1 }}
          variants={{ hidden: { opacity: 0, scaleX: 0 }, show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, delay: 1.2 } } }}
        >
          <span>↻ {loop}</span>
        </motion.div>
      )}
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
      {facts.length > 0 && (
        <motion.ul className="facts" variants={stagger(0.2, 0.9)}>
          {facts.map((f, n) => <motion.li key={n} variants={fadeUp}>{f}</motion.li>)}
        </motion.ul>
      )}
    </Stage>
  );
}

/** Bar chart on the left, numbers table on the right. */
function BenchmarkSlide({ title, question, chartLabel, unit = '', data = [], columns = [], rows = [], note }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Stage>
      <Title>{title}</Title>
      <Question>{question}</Question>
      <div className="bench">
        <div className="bench-left">
        {chartLabel && <motion.p className="bench-chart-label" variants={fadeUp}>{chartLabel}</motion.p>}
        <div className="bench-chart">
          {data.map((d, i) => (
            <div key={i} className="bar-col">
              {/* the track has a fixed height, so each bar is exactly value / max of it */}
              <div className="bar-track">
                <motion.div className={`bar-value ${d.highlight ? 'hl' : ''}`} variants={fadeUp}>{d.value}{unit}</motion.div>
                <motion.div
                  className="bar"
                  style={{ originY: 1, height: `${(d.value / max) * 100}%` }}
                  variants={{
                    hidden: { scaleY: 0 },
                    show: { scaleY: 1, transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: 'easeOut' } },
                  }}
                >
                  <div className={`bar-fill ${d.highlight ? 'hl' : ''}`} style={{ height: '100%' }} />
                </motion.div>
              </div>
              <div className="bar-label">{d.label}</div>
            </div>
          ))}
        </div>
        </div>
        <motion.div className="table-wrap bench-table" variants={fadeUp}>
          <table className="deck-table">
            <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => (
                <td key={j} className={c && c.best ? 'best' : ''}>{c && typeof c === 'object' ? c.text : c}</td>
              ))}</tr>
            ))}</tbody>
          </table>
        </motion.div>
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
    </Stage>
  );
}

/** Rows of before → after numbers. */
function BeforeAfterSlide({ title, question, pairs = [], note }) {
  return (
    <Stage variants={stagger(0.25, 0.2)}>
      <Title>{title}</Title>
      <Question>{question}</Question>
      <div className="ba">
        {pairs.map((p, i) => (
          <motion.div key={i} className="ba-row" variants={stagger(0.25, 0)}>
            <motion.div className="ba-label" variants={fadeUp}>{p.label}</motion.div>
            <motion.div className="ba-card before" variants={fadeUp}>
              <span className="ba-tag">Before</span>
              <strong>{p.before.value}</strong>
              <span>{p.before.sub}</span>
            </motion.div>
            <motion.span className="ba-arrow" variants={fadeUp}>→</motion.span>
            <motion.div className="ba-card after" variants={pop}>
              <span className="ba-tag">After</span>
              <strong>{p.after.value}</strong>
              <span>{p.after.sub}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
    </Stage>
  );
}

/** Grid of feature cards with an icon. */
function FeaturesSlide({ title, question, items = [], note }) {
  return (
    <Stage variants={stagger(0.15, 0.2)}>
      <Title>{title}</Title>
      <Question>{question}</Question>
      <div className="features">
        {items.map((it, i) => (
          <motion.div key={i} className="feature" variants={pop}>
            <div className="feature-icon">{it.icon}</div>
            <h3>{it.heading}</h3>
            <p>{it.sub}</p>
          </motion.div>
        ))}
      </div>
      {note && <motion.p className="caption left" variants={fadeUp}>{note}</motion.p>}
    </Stage>
  );
}

/** Peffers DSR process (6 activities) with the three cycles drawn around it.
 *  Activities appear first, then the cycles and their dashed links.
 *  Click any block for its explanation; a cycle also highlights its activities. */
const DSR_BOX = { w: 186, h: 124, y: 158, gap: 24 };
const dsrX = (i) => i * (DSR_BOX.w + DSR_BOX.gap);
const dsrCx = (i) => dsrX(i) + DSR_BOX.w / 2;
const DSR_BOTTOM = DSR_BOX.y + DSR_BOX.h;
const DSR_CYCLES = {
  relevance: { x: 380, y: 0, w: 480, h: 66, color: '#4ade80',
    paths: [
      `M440 66 V112 H${dsrCx(0)} V${DSR_BOX.y - 4}`,
      `M${dsrCx(3)} 66 V${DSR_BOX.y - 4}`,
      `M800 66 V112 H${dsrCx(4)} V${DSR_BOX.y - 4}`,
    ] },
  rigor: { x: 0, y: 372, w: 400, h: 66, color: '#c4b5fd',
    paths: [
      `M${dsrCx(1)} 372 V${DSR_BOTTOM + 4}`,
      `M350 372 V338 H${dsrCx(2) - 20} V${DSR_BOTTOM + 4}`,
      `M400 405 H600 V318 H${dsrCx(4) - 22} V${DSR_BOTTOM + 4}`,
    ] },
  design: { x: 700, y: 372, w: 420, h: 66, color: '#60a5fa',
    paths: [
      `M${dsrCx(4) + 22} ${DSR_BOTTOM + 2} V368`,
      `M760 372 V350 H${dsrCx(2) + 20} V${DSR_BOTTOM + 4}`,
    ],
    label: { x: 660, y: 350, text: 'Refine' } },
};

function DsrSlide({ title, activities = [], cycles = [], hint, citation }) {
  const [focus, setFocus] = useState(null);
  const toggle = (id) => setFocus(focus === id ? null : id);
  const focusedCycle = cycles.find((c) => c.id === focus);
  const lit = (n) => focusedCycle?.links?.includes(n);
  const detail = activities.find((a) => a.id === focus) || focusedCycle;
  const draw = (delay) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, delay } },
  });
  const cycleIn = (i) => ({
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.5 + i * 0.35 } },
  });
  return (
    <Stage className="stage dsr-stage" variants={stagger(0.15, 0.2)}>
      <Title>{title}</Title>
      <div className="dsr">
        <svg className="dsr-lines" viewBox="0 0 1236 438" width="1236" height="438">
          <defs>
            {['#94a3b8', '#4ade80', '#c4b5fd', '#60a5fa'].map((c) => (
              <marker key={c} id={`dsr-arrow-${c.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill={c} />
              </marker>
            ))}
          </defs>
          {activities.slice(0, -1).map((_, i) => (
            <motion.path key={i} d={`M${dsrX(i) + DSR_BOX.w + 2} ${DSR_BOX.y + DSR_BOX.h / 2} H${dsrX(i + 1) - 3}`}
              stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#dsr-arrow-94a3b8)"
              variants={draw(0.35 + i * 0.15)} />
          ))}
          {cycles.map((c, ci) => {
            const g = DSR_CYCLES[c.id];
            if (!g) return null;
            const dim = focusedCycle && focusedCycle.id !== c.id;
            return (
              <g key={c.id} opacity={dim ? 0.15 : 1} style={{ transition: 'opacity .3s' }}>
                {g.paths.map((d, k) => (
                  <motion.path key={k} d={d} stroke={g.color} strokeWidth={focusedCycle?.id === c.id ? 3 : 2}
                    strokeDasharray="6 5" fill="none" markerEnd={`url(#dsr-arrow-${g.color.slice(1)})`}
                    variants={draw(1.8 + ci * 0.35 + k * 0.1)} />
                ))}
              </g>
            );
          })}
        </svg>
        {DSR_CYCLES.design.label && (
          <motion.span className="dsr-refine" style={{ left: DSR_CYCLES.design.label.x, top: DSR_CYCLES.design.label.y }}
            variants={cycleIn(2.2)}>↺ {DSR_CYCLES.design.label.text}</motion.span>
        )}
        {activities.map((a, i) => (
          <motion.button type="button" key={a.id}
            className={`dsr-box ${focus === a.id ? 'on' : ''} ${lit(i + 1) ? 'lit' : ''}`}
            style={{ left: dsrX(i), top: DSR_BOX.y, width: DSR_BOX.w, height: DSR_BOX.h }}
            variants={pop} onClick={() => toggle(a.id)}>
            <strong>{i + 1}. {a.heading}</strong>
            <span>{a.sub}</span>
          </motion.button>
        ))}
        {cycles.map((c, ci) => {
          const g = DSR_CYCLES[c.id];
          if (!g) return null;
          return (
            <motion.button type="button" key={c.id}
              className={`dsr-cycle ${c.id} ${focus === c.id ? 'on' : ''}`}
              style={{ left: g.x, top: g.y, width: g.w, height: g.h }}
              variants={cycleIn(ci)} onClick={() => toggle(c.id)}>
              <strong>{c.heading}</strong>
              <span>{c.sub}</span>
            </motion.button>
          );
        })}
      </div>
      <motion.div className="phase-detail dsr-detail" variants={fadeUp}>
        {detail ? <><strong>{detail.heading}:</strong> {detail.detail}</> : <span className="muted">{hint}</span>}
      </motion.div>
      {citation && <motion.p className="citation" variants={fadeUp}>{citation}</motion.p>}
    </Stage>
  );
}

/** Small 1–5 phase tracker shown in the corner of process slides. */
export function PhaseTracker({ phase, labels = [] }) {
  return (
    <div className="phase-tracker">
      {labels.map((l, i) => (
        <span key={i} className={i + 1 === phase ? 'on' : i + 1 < phase ? 'past' : ''}>{i + 1} {l}</span>
      ))}
    </div>
  );
}

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
  phases: PhasesSlide,
  steps: StepsSlide,
  benchmark: BenchmarkSlide,
  beforeafter: BeforeAfterSlide,
  features: FeaturesSlide,
  dsr: DsrSlide,
};
