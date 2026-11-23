// ─────────────────────────────────────────────────────────────
//  SLIDE CONTENT — this is the only file you need to edit.
//
//  Each object in the array is one slide. Pick a `type`, fill in
//  its fields, and save: the browser updates instantly.
//
//  Standard types:
//    title · bullets · stats · chart · split · code · quote
//    timeline · image · end
//  Grüezi Deutsch types (fields shown by the slides below):
//    origin     CH → Confoederatio Helvetica → Helvetism
//    venn       two circles + overlap; click a region for examples
//    evidence   count-up numbers + two numbered cards
//    scope      constraints + "from" crossed out → "to" (click to toggle)
//    table      rows slide in; size: 'normal' | 'small'
//    agentflow  conceptual agent diagram with repair loop
//    layers     clickable list A, B, C… with a detail panel
//    architecture  learner → system blocks → output
//
//  Optional on every slide:
//    notes: 'Speaker notes (press Alt/Option+P for presenter view)'
//    background: '#1e1b4b'   // override the slide background colour
// ─────────────────────────────────────────────────────────────

export const deckTitle = 'Grüezi Deutsch — How the app works';

export const slides = [
  {
    type: 'title',
    kicker: 'DPE project · Grüezi Deutsch',
    title: 'Grüezi Deutsch',
    subtitle: 'Helping newcomers practise the German Switzerland actually speaks',
    notes: 'Our goal: help newcomers integrate in Switzerland better and faster.',
  },

  {
    type: 'origin',
    title: 'Why is Switzerland “CH”?',
    letters: ['C', 'H'],
    expansion: ['Confoederatio', 'Helvetica'],
    arrow: '↓',
    result: 'Helvetica → Helvetism',
    resultNote: 'A Helvetism is a word or usage typical of Switzerland. The Latin name of the country lives on in it.',
    notes:
      'CH stands for Confoederatio Helvetica, the Latin name of the Swiss Confederation. ' +
      'From Helvetica comes “Helvetism”: a word or usage that is typically Swiss, like Velo or Perron.',
  },

  {
    type: 'venn',
    title: 'Three kinds of German',
    left: {
      heading: 'Hochdeutsch',
      sub: 'Standard German',
      text: 'The standard language taught in courses and textbooks. This is what Lena learned for her A1 exam.',
      examples: ['Fahrrad', 'Bahnsteig', 'Fahrkarte', 'Bürgersteig', 'Straße (ß)'],
    },
    right: {
      heading: 'Helvetisms',
      sub: 'Swiss-specific features',
      text: 'Swiss-specific words and usages. Many came into Swiss High German from French (Französisch) or Italian.',
      examples: ['Velo (FR vélo)', 'Perron (FR)', 'Billett (FR billet)', 'Trottoir (FR)', 'Glace (FR)', 'Natel', 'Abwart'],
    },
    overlap: {
      heading: 'Swiss High German',
      sub: 'our focus',
      text: 'Standard High German grammar with Swiss vocabulary, conventions and characteristics: no ß, Swiss words, Swiss context.',
      examples: ['„Der Zug fährt ab Perron 3.“', '„Mein Velo ist weg.“', 'Strasse (ss, never ß)', '„Grüezi“'],
    },
    caption: 'Click a circle or the overlap to see examples. Grüezi Deutsch works in the overlap.',
    notes:
      'Left: Hochdeutsch, the standard language. Right: Helvetisms, Swiss-specific features, many from French. ' +
      'The overlap is Swiss High German: standard German with Swiss vocabulary and conventions. That is what newcomers actually meet.',
  },

  {
    type: 'evidence',
    title: 'Who we built it for, and why',
    stats: [
      { value: 50, suffix: '+', label: 'informal conversations (not recorded)' },
      { value: 10, suffix: '+', label: 'group discussions' },
      { value: 6, label: 'detailed recorded interviews' },
    ],
    cards: [
      {
        heading: 'User group',
        text: 'Newcomers in Switzerland who are learning High German (A1–B1).',
      },
      {
        heading: 'Purpose',
        text: 'Make integration easier and faster by practising real Swiss everyday situations.',
      },
    ],
    footnote: 'The recorded interviews are attached in the appendix.',
    notes:
      'We talked to more than 50 people informally, ran more than 10 group discussions and did 6 detailed recorded interviews; ' +
      'I conducted one of them. From this we defined our user group and the purpose of the app.',
  },

  {
    type: 'scope',
    title: 'Scope: bounded rationality',
    author: 'Herbert Simon: we decide within limits of time, information and brainpower',
    constraints: [
      { icon: '⏱', label: 'Limited time (one semester)' },
      { icon: '📚', label: 'Limited information' },
      { icon: '🧠', label: 'Limited brainpower' },
    ],
    from: 'Schweizerdeutsch',
    to: 'Swiss Hochdeutsch',
    example: {
      from: '„Wo isch de Perron 3?“',
      to: '„Wo ist der Perron 3?“',
      note: 'We keep the Swiss words (Perron) but not the dialect. Dialects differ by region and have no standard spelling.',
    },
    notes:
      'Following Herbert Simon’s bounded rationality, we cannot solve everything with our limited time, information and brainpower. ' +
      'So we narrowed the scope from Swiss German dialect to Swiss High German. Click the phrase to replay the change.',
  },

  {
    type: 'bullets',
    title: 'Does it fit the Agentic AI Reference Architecture?',
    reveal: 'click',
    items: [
      'Yes, quite well, but Grüezi Deutsch is a more constrained, task-specific agent system',
      'It doesn’t have to match every box',
      'We map our existing components to the architectural layers',
      'Strongest matches: Reasoning Layer, Orchestration Engine, Agents, Tools, Memory, Observability',
    ],
    notes: 'Press the right arrow to reveal each point.',
  },

  {
    type: 'table',
    title: 'Mapping (1/2): user, reasoning, agents',
    size: 'small',
    columns: ['Reference architecture', 'Grüezi Deutsch', 'What it does'],
    rows: [
      ['User', 'Learner', 'Selects situation, CEFR level and target words'],
      ['User Goal', 'A suitable Swiss Standard German dialogue', 'Practise a real-life situation at their level'],
      ['Reasoning Layer', 'Planner + Writer + Repairer', 'Plans, generates and improves the dialogue'],
      ['Task decomposition', 'Planner', 'Breaks the dialogue into roles, turns, target words and structure'],
      ['Agent 1', 'Planner', 'Creates a dialogue plan'],
      ['Agent 2', 'Writer', 'Generates the dialogue based on the plan'],
      ['Agent 3', 'Repairer', 'Fixes the specific problems the checker found'],
      ['Orchestration Engine', 'Pipeline / controller (pipeline.py)', 'Controls order, loops, decisions and stopping'],
    ],
  },

  {
    type: 'table',
    title: 'Mapping (2/2): tools, memory, output',
    size: 'small',
    columns: ['Reference architecture', 'Grüezi Deutsch', 'What it does'],
    rows: [
      ['Orchestration Schema', 'Structured plans, JSON outputs, check reports', 'Defines what each step produces and passes on'],
      ['Tools 1, 2', 'Word lists, Helvetism lookup, CEFR resources, checks', 'Factual resources and deterministic validation'],
      ['Systems 1–3', 'Local code, SQLite, language-checking tools', 'Supporting software and data'],
      ['Integration Layer', 'Python functions, model API, Streamlit', 'Connects the components and the external model'],
      ['Agent-to-Agent APIs', 'Planner → Writer → Checker → Repairer', 'Hands structured outputs and issues between steps'],
      ['Memory Management', 'SQLite, review history, spaced repetition', 'Stores word progress and exercise results'],
      ['Observability', 'Check reports, loop history, benchmark, logs', 'Tracks quality, failures, loops and performance'],
      ['Response Personalization', 'Level, situation, target words, Swiss resources', 'Adapts the dialogue to the learner'],
      ['Task Output', 'Dialogue, Swiss-word explanations, exercises', 'A practice experience for the learner'],
    ],
  },

  {
    type: 'agentflow',
    title: 'Grüezi Deutsch drawn as an agent system',
    systemLabel: 'Orchestration Engine · pipeline.py',
    learner: 'Learner',
    goal: 'Goal: practise an everyday situation in Swiss Standard German',
    chain: ['Planner Agent', 'Writer Agent', 'Deterministic Checker', 'Repair Agent'],
    loop: 'Issues found → back to Repair · passed or 3 loops reached → Output Controller',
    controller: 'Output Controller',
    outputs: ['Exercise Generator', 'Comprehension Questions'],
    resources: [
      'Language resources: CEFR · word lists · Helvetisms · situations · examples',
      'Memory: SQLite progress & reviews',
      'Observability & evaluation',
    ],
    output: 'Dialogue + Swiss vocabulary explanations',
    note: 'Conceptual view: some functions are grouped into layers. Not every box is a separate agent in the code.',
    notes:
      'The orchestrator, pipeline.py, runs Planner, Writer, the deterministic checker and the Repairer. ' +
      'If the checker finds issues, the Repairer fixes only the flagged lines, at most 3 times. Then the output goes to the learner with exercises.',
  },

  {
    type: 'layers',
    title: 'What each layer means in our project',
    hint: 'Click a layer to see the detail.',
    layers: [
      {
        letter: 'A', name: 'User & User Goal',
        lead: 'Adult learner of German in Switzerland who wants to practise a real situation at their CEFR level.',
        items: ['Situation (e.g. Arzttermin)', 'Level: A1, A2 or B1', 'Target vocabulary', 'Optional custom situation'],
      },
      {
        letter: 'B', name: 'Reasoning Layer',
        lead: 'Where the LLM-driven roles live.',
        items: ['Planner: roles, structure, goals, target words, key phrases', 'Writer: the dialogue at the right level and in Swiss context', 'Repairer: rewrites only the lines the checker flagged'],
        note: 'Conceptual roles: in the code they are model calls, not independent autonomous agents.',
      },
      {
        letter: 'C', name: 'Orchestration Engine',
        lead: 'pipeline.py is the conductor. It does not write the dialogue, it controls the others.',
        items: ['Which step runs first', 'When the checker runs', 'Whether the Repairer is activated', 'When to stop (max 3 loops)', 'Which dialogue is returned'],
      },
      {
        letter: 'D', name: 'Tools & Systems',
        lead: 'Resources the roles can use.',
        items: ['CEFR word lists · Helvetism list', 'LanguageTool (de-CH) · spaCy', 'Readability and validation functions', 'Systems: Python, Streamlit, SQLite, LLM provider'],
        note: 'Many tools are local Python functions rather than external APIs, but they play the same role.',
      },
      {
        letter: 'E', name: 'Integration Layer',
        lead: 'Connects the components.',
        items: ['Planner output becomes Writer input', 'Check report becomes Repairer input', 'Structured JSON outputs and model API', 'Streamlit ↔ backend ↔ SQLite'],
      },
      {
        letter: 'F', name: 'Memory Management',
        lead: 'Persistent application data and learner progress.',
        items: ['System memory: dialogues, review history, word progress', 'Learner memory: which words to practise again, and when'],
        note: 'No long-running conversational memory between agents; this is app data, not an autonomous agent’s memory.',
      },
      {
        letter: 'G', name: 'Observability',
        lead: 'Checker reports and the benchmark page.',
        items: ['Off-level vocabulary %, sentence complexity', 'Target-word coverage, grammar errors', 'Swiss vocabulary use', 'Loop count, pass/fail, latency, benchmark'],
        note: 'Full per-call logging and traces are proposed improvements.',
      },
      {
        letter: 'H', name: 'Response Personalization',
        lead: 'Built into generation, not a separate agent.',
        items: ['CEFR level and situation', 'Target words and sentence patterns', 'Swiss vocabulary', 'Exercises and spaced repetition'],
      },
    ],
  },

  {
    type: 'table',
    title: 'How we adapt the generic architecture',
    size: 'small',
    columns: ['Generic component', 'For Grüezi Deutsch'],
    rows: [
      ['Agent 1, 2, 3', 'Name them Planner, Writer and Repairer'],
      ['Reasoning Layer', 'Keep it, containing the agent workflow'],
      ['Orchestration Schema', 'Structured outputs, JSON schemas, contracts between modules'],
      ['Orchestration Engine', 'pipeline.py as the central controller'],
      ['Integration Layer', 'Python, model connection and hand-offs'],
      ['Tools', 'CEFR lists, Helvetisms, spaCy, LanguageTool, validation functions'],
      ['Systems 1–3', 'Named supporting systems instead of numbered boxes'],
      ['Memory Management', 'SQLite and spaced-repetition progress'],
      ['Observability', 'Checker, metrics, loop history, benchmark'],
      ['Response Personalization', 'Level, situation, target words, Swiss context'],
      ['Human-in-the-loop', 'Only if a teacher actually reviews output in the workflow'],
    ],
  },

  {
    type: 'architecture',
    title: 'The simplified architecture',
    top: { heading: 'Learner', sub: 'Situation · Level · Target words' },
    system: 'Grüezi Deutsch Agent System',
    blocks: [
      { heading: 'Orchestration Engine', sub: 'Controls execution and decision-making' },
      { heading: 'Reasoning Layer', sub: 'Planner → Writer → Checker → Repairer' },
      { heading: 'Tools & Language Resources', sub: 'CEFR · Helvetisms · spaCy · LanguageTool · Python checks' },
    ],
    pair: [
      { heading: 'Memory', sub: 'SQLite · SRS' },
      { heading: 'Observability', sub: 'Checks · metrics' },
    ],
    bottom: { heading: 'Personalized learning output', sub: 'Dialogue · Vocabulary explanations · Exercises' },
  },

  {
    type: 'quote',
    text: 'The strength is not just multiple agents. It is LLM generation, deterministic checks, targeted repair and Swiss language resources working together.',
    author: 'Our key insight',
  },

  {
    type: 'end',
    title: 'Danke · Merci · Grazie',
    subtitle: 'Questions?',
    contact: 'Grüezi Deutsch · DPE project, BFH',
  },
];
