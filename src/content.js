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
//  Development-process types:
//    phases       the 5 phases as a snake; click a phase for its detail
//    steps        boxes left → right; optional input, output, group frame,
//                 loop line, tone: 'orange' | 'green' | 'red', split: [a, b]
//    benchmark    bar chart + numbers table
//    beforeafter  rows of Before → After numbers
//    features     cards with an emoji icon
//    dsr          Peffers DSR activities + relevance/rigor/design cycles
//  `question:` adds the green guiding question under a title.
//  `phase: 1…5` shows the phase tracker in the top-right corner.
//
//  Optional on every slide:
//    notes: 'Speaker notes (press Alt/Option+P for presenter view)'
//    background: '#1e1b4b'   // override the slide background colour
// ─────────────────────────────────────────────────────────────

export const deckTitle = 'Grüezi Deutsch — How the app works';

// Names in the phase tracker (top right of the development-process slides).
export const phaseLabels = ['Understand', 'Engineer', 'Evaluate', 'Refine', 'Deploy'];

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
    title: 'Scope',
    author: 'Herbert Simon: we decide within limits of time, information and brainpower',
    constraints: [
      { icon: '⏱', label: 'Limited time (one semester)' },
      { icon: '📚', label: 'Limited information (user interviews, course & AI knowldege)' },
      { icon: '🧠', label: 'Limited brainpower (4 people)' },
    ],
    from: 'Schweizerdeutsch',
    to: 'Swiss Hochdeutsch',
    example: {
      from: '„Wo isch de Perron 3?“',
      to: '„Wo ist der Perron 3?“',
      note: 'We keep the Swiss words (Perron) but not the dialect. Dialects differ by region and have no standard spelling.',
    },
    levels: {
      label: 'Levels in the app:',
      items: [
        { code: 'A1', name: 'Beginner' },
        { code: 'A2', name: 'Elementary' },
        { code: 'B1', name: 'Intermediate' },
      ],
    },
    notes:
      'Following Herbert Simon’s bounded rationality, we cannot solve everything with our limited time, information and brainpower. ' +
      'So we narrowed the scope from Swiss German dialect to Swiss High German. Click the phrase to replay the change. ' +
      'The app covers the CEFR levels A1, A2 and B1.',
  },

    {
    type: 'agentflow',
    title: 'Grüezi Deutsch: a task - specific agent system',
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

  // ─── How we built it: the 5-phase development process ───────────

  {
    type: 'dsr',
    title: 'How we built it: research process (DSR)',
    activities: [
      { id: 'a1', heading: 'Problem identification', sub: 'Newcomers lack Swiss Standard German practice',
        detail: 'Explore newcomer difficulties and the potential gap in Swiss-specific learning resources. (Relevance cycle)' },
      { id: 'a2', heading: 'Objectives', sub: 'Practical, level-adapted Swiss everyday dialogues',
        detail: 'Define what the solution should achieve: practical dialogues, level adaptation and Swiss vocabulary.' },
      { id: 'a3', heading: 'Design & development', sub: 'Planner → Writer → Checker → Repairer',
        detail: 'Build the AI workflow, prompts, checks, exercises and prototype. (Design cycle)' },
      { id: 'a4', heading: 'Demonstration', sub: 'Scenarios, e.g. post office, doctor',
        detail: 'Use the prototype in real-life scenarios to show how it solves the problem.' },
      { id: 'a5', heading: 'Evaluation', sub: 'Benchmarks, teacher review, user testing',
        detail: 'Measure performance and assess quality; refine the artifact based on results.' },
      { id: 'a6', heading: 'Communication', sub: 'Report, prototype & presentation',
        detail: 'Share the problem, artifact, methodology, results and limitations.' },
    ],
    // links = which activities (1–6) each cycle feeds; clicking a cycle highlights them
    cycles: [
      { id: 'relevance', heading: 'Relevance cycle', sub: 'Real users · Needs · Swiss context', links: [1, 4, 5],
        detail: 'Real-world problem, user needs, newcomer context.' },
      { id: 'rigor', heading: 'Rigor cycle', sub: 'CEFR · Literature · Existing knowledge', links: [2, 3, 5],
        detail: 'Existing knowledge, CEFR, research and methods.' },
      { id: 'design', heading: 'Design cycle', sub: 'Build · Test · Refine', links: [3, 5],
        detail: 'Build, evaluate and iteratively refine the prototype.' },
    ],
    hint: 'Six DSR activities (Peffers) with three cycles around them (Hevner). Click any block.',
    citation: 'Sources: Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). A Design Science Research Methodology for Information Systems Research. Journal of Management Information Systems, 24(3), 45–77. · Hevner, A. R. (2007). A Three Cycle View of Design Science Research. Scandinavian Journal of Information Systems, 19(2), 87–92.',
    notes: `We follow Design Science Research. The six blocks are the Peffers process: problem identification, objectives, design and development, demonstration, evaluation and communication.
Around them are three cycles. The relevance cycle connects us to real users and the Swiss context. The rigor cycle brings in CEFR, literature and existing knowledge. The design cycle is our build, test, refine loop: evaluation results go back into design and development.
Click a cycle to highlight the activities it feeds.`,
  },

/* ── HIDDEN SLIDE: five-phases overview (replaced by the DSR slide) ──
   To show it again, delete this line and the closing line below.

  {
    type: 'phases',
    title: 'How we built it: five phases',
    phases: [
      { heading: 'Solution Understanding', question: 'What does a good expert do?', verb: 'Understand',
        logic: 'define what good language-learning support looks like.' },
      { heading: 'Prompt Engineering', question: 'How do we teach AI to do it?', verb: 'Engineer',
        logic: 'turn that knowledge into prompts, instructions and a workflow.' },
      { heading: 'Prompt Evaluation', question: 'How well does AI perform?', verb: 'Evaluate',
        logic: "measure the AI's performance against evidence and criteria." },
      { heading: 'Iteration & Refinement', question: 'How do we improve it?', verb: 'Refine',
        logic: 'identify failure patterns and improve prompts, code and models.' },
      { heading: 'Prototype Deployment', question: 'Can learners use it?', verb: 'Deploy',
        logic: 'make the improved system accessible as an app.' },
    ],
    loopLabel: 'Future improvements',
    hint: 'Understand what a good expert does → teach AI to imitate it → test → improve → put it into a working app. Click a phase.',
    notes: `Grüezi Deutsch follows a cycle: understand what a good human expert does, teach AI to imitate that process, test how well it performs, improve it, and put it into a working app.
Each phase has evidence behind it, and some things still await validation. Click each box to show its one-line logic.`,
  },
── END HIDDEN SLIDE ─────────────────────────────────────────────── */



  {
    type: 'table',
    phase: 1,
    title: 'Phase 1 · From expert knowledge to a system',
    columns: ['Human expert', 'Grüezi Deutsch equivalent'],
    rows: [
      ["Teacher's vocabulary knowledge", 'CEFR vocabulary lists'],
      ['Knowledge of Swiss expressions', 'Helvetism database'],
      ["Teacher's level assessment", 'Python level-checking functions'],
      ["Teacher's correction", 'Automated checker + repair loop'],
      ["Teacher's learning materials", 'Dialogue and exercises'],
    ],
    note: "This is the expert-inspired design hypothesis.",
    notes: `Each part of the teacher's knowledge becomes a part of the system.
Be clear: this is our design hypothesis. Teachers have not yet validated how the app behaves.`,
  },

  {
    type: 'bullets',
    phase: 1,
    title: 'Ideal outcome: a measurable good dialogue',
    reveal: 'click',
    items: [
      "≤ 5% of words above the learner's level",
      'No ß in the displayed text',
      'Every target word used at least twice',
      'Natural, relevant Swiss dialogue',
      'Words that can be practised and remembered',
    ],
    notes: `Instead of "it sounds good", we defined what a good dialogue is in numbers the code can check.
The first three are fully measurable; the last two still need people to judge them.`,
  },

  {
    type: 'steps',
    phase: 2,
    title: 'Phase 2 · Prompt engineering',
    question: "How do we instruct an AI to imitate the expert's process?",
    input: { heading: 'Input', sub: 'Situation + A1/A2/B1 + target words' },
    group: 'Prompt chain',
    steps: [
      { heading: '1. Planner', sub: 'Plans turns and word placement', tone: 'orange' },
      { heading: '2. Writer', sub: 'Creates the dialogue from the plan', tone: 'orange' },
      { heading: '3. Checker', sub: 'Python checks language criteria', tone: 'orange' },
      { heading: '4. Repairer', sub: 'Fixes flagged issues', tone: 'orange' },
    ],
    output: { heading: 'Output', sub: 'Improved dialogue' },
    note: 'Instead of one big prompt, the job is split into smaller tasks.',
    facts: [
      'Temperature 0.3 for repairs makes fixes repeatable.',
      'Without an output-token limit, one DeepSeek call took 9 minutes, so every call is now capped (src/config.py).',
    ],
    notes: `We do not ask the AI to do everything in one prompt.
The planner decides the turns and where each target word goes, the writer writes, Python checks, and the repairer fixes only what was flagged.
Two settings matter: repairs run at temperature 0.3 so fixes are repeatable, and every call has an output-token limit, because without it one DeepSeek call took 9 minutes.`,
  },

  {
    type: 'table',
    phase: 2,
    title: 'Phase 2 · Prompt techniques we use',
    size: 'small',
    columns: ['Technique', 'Purpose'],
    rows: [
      ['Role prompting', 'Tells the model what role it plays'],
      ['CEFR descriptions', 'Gives the model clear language-level requirements'],
      ['Few-shot prompting', 'Provides an example dialogue to guide output'],
      ['Prompt chaining', 'Splits planning, writing and repairing into separate tasks'],
      ['Structured JSON', 'Makes output easier for Python to process'],
      ['Target word placement', 'Tells the planner where the words should occur'],
      ['Automated feedback', 'Sends failures back to the model for correction'],
    ],
    notes: 'Seven techniques. The most important ones for quality were prompt chaining, target word placement and automated feedback.',
  },

  {
    type: 'stats',
    phase: 2,
    title: 'Initial results (21 November)',
    items: [
      { value: 0, suffix: ' / 15', label: 'first drafts used every target word at least twice' },
      { value: 139, label: 'words at most per dialogue (range 41–139): too short' },
    ],
    note: 'B1 dialogues also often had very short, A1-like sentences.',
    notes: `Our first drafts were not good enough. Not one of fifteen used every target word twice, the dialogues were short, and B1 sounded like A1.
This is why the next phases matter.`,
  },

  {
    type: 'benchmark',
    phase: 2,
    title: 'Model comparison',
    question: 'Results for 36 dialogues per model using the full loop',
    chartLabel: 'Passed after the loop',
    unit: '%',
    data: [
      { label: 'DeepSeek V4.1 Flash', value: 100, highlight: true },
      { label: 'Llama 8B', value: 78 },
      { label: 'Llama 8B, best of 3', value: 78 },
      { label: 'GPT-4o-mini', value: 78 },
    ],
    // { text, best: true } shows a value in bold green
    columns: ['', 'DeepSeek V4.1 Flash', 'Llama 8B', 'Llama 8B, best of 3 drafts', 'GPT-4o-mini'],
    rows: [
      ['First draft passed', '47%', '33%', '28%', '19%'],
      ['Passed after the loop', { text: '100%', best: true }, '78%', '78%', '78%'],
      ['Words above the level (after loop)', { text: '0.7%', best: true }, '1.9%', '2.1%', '2.0%'],
      ['Words (aim: about 80)', { text: '87', best: true }, '135', '142', '109'],
      ['Target words used 5+ times', { text: '0.28', best: true }, '0.5', '0.94', '0.44'],
      ['Seconds per dialogue', '73', { text: '6', best: true }, '13', '19'],
      ['Cost per dialogue (USD)', '0.0095', { text: '0.0003', best: true }, '0.0010', '0.0012'],
    ],
    note: "DeepSeek's planner placed all target words correctly in 36/36 dialogues (GPT-4o-mini: 4/36). Reported experimental results, not independently validated benchmarks.",
    notes: `DeepSeek V4.1 Flash passed every dialogue after the loop, stayed closest to the 80-word aim and had the fewest words above the level, but it is the slowest. Llama 8B is fastest and cheapest but passes 78%; taking the best of 3 Llama drafts did not raise the pass rate. GPT-4o-mini had the weakest first drafts.
This is evidence from our experiment, not proof that DeepSeek is better in general.`,
  },

  {
    type: 'steps',
    phase: 3,
    title: 'Phase 3 · Prompt evaluation',
    question: 'How do we know whether the prompts and generated dialogues are actually good?',
    steps: [
      { heading: 'Generate dialogue' },
      { heading: 'Compare against criteria', sub: 'Vocabulary level · target words · grammar · length · Swiss language' },
      { split: [
        { heading: 'Pass', sub: 'Criteria met', tone: 'green' },
        { heading: 'Fail', sub: 'Criteria not met', tone: 'red' },
      ] },
      { heading: 'Analyse results', sub: 'Find recurring weaknesses and limitations' },
    ],
    note: 'We evaluate against measurable criteria, not only whether the dialogue sounds good.',
    facts: [
      'Best prompt setup: plan with word placement plus the two repairs, with DeepSeek.',
      'Its first plan placed every target word correctly in 36 of 36 dialogues, against 4 of 36 for GPT-4o-mini.',
    ],
    notes: `Every dialogue is checked against the same criteria. Passes and fails are both analysed to find patterns.
Our best setup is planning with word placement plus the two repairs, using DeepSeek: its first plan placed every target word correctly in 36 of 36 dialogues, against 4 of 36 for GPT-4o-mini.`,
  },

  {
    type: 'split',
    phase: 3,
    size: 'small',
    title: 'What evidence exists?',
    left: {
      heading: 'Existing evidence',
      items: [
        '2 AI-written gold/example dialogues',
        'B1 example: 4.8% words above level (passes)',
        'A2 example: 27.8% words above level (fails)',
        'Checker flags words like Schmerzmittel and Versicherungskarte',
      ],
    },
    right: {
      heading: 'Still missing',
      items: [
        'No teacher-labelled gold test set',
        'No completed teacher ratings',
        'No learner study',
        'No evidence yet that learners retain more vocabulary',
      ],
    },
    notes: 'Be honest here: we have technical evidence, but no teacher ratings or learner study yet.',
  },

  {
    type: 'split',
    phase: 3,
    size: 'small',
    title: 'The evaluation gap',
    left: {
      heading: 'The system can measure',
      items: ['Vocabulary level', 'Word coverage', 'Length and readability', 'Grammar and other predefined checks'],
    },
    right: {
      heading: 'Humans still need to judge',
      items: ['Naturalness', 'Cultural authenticity', 'Teaching usefulness', 'Learner confidence and vocabulary retention'],
    },
    note: 'Automated evaluation measures compliance with programmed criteria. It does not yet establish pedagogical effectiveness.',
    notes: 'The left side we can measure automatically. The right side needs teachers and learners, and that is our next step.',
  },

  {
    type: 'steps',
    phase: 4,
    title: 'Phase 4 · Iteration and refinement',
    question: 'How do we use evaluation results to make the system better?',
    steps: [
      { heading: '1. Generate', sub: 'Produce a dialogue' },
      { heading: '2. Measure', sub: 'Run the checks' },
      { heading: '3. Identify failures', sub: 'Missing target words, off-level words, structure', tone: 'orange' },
      { heading: '4. Refine prompts & code', sub: 'Plan, prompt, checks, parameters or model', tone: 'orange' },
      { heading: '5. Test again', sub: 'Does the new version improve?', tone: 'green' },
    ],
    loop: 'repeat the cycle',
    notes: 'This is our feedback loop: test, find weaknesses, change the system, test again.',
  },

  {
    type: 'table',
    phase: 4,
    title: 'What we changed',
    size: 'small',
    columns: ['Before', 'Improvement', 'Why'],
    rows: [
      ['Speaker names counted in checks', 'Check only spoken text', 'Avoid false errors'],
      ['Target words not reliably placed', 'Plan target words per turn', 'Improve word coverage'],
      ['Missing words caused failure', 'Repair by adding new sentences', 'Keep the dialogue, add missing words'],
      ['Generic sentence structures', 'Konjunktiv II at B1', 'Better level-specific dialogue'],
      ['Inconsistent word use', 'One example sentence per target word', 'Guide model usage'],
      ['Poorly controlled output', 'Cap model output tokens', 'Prevent long generation time'],
      ['Target words sometimes missing', 'Check placement before writing', 'Catch failures earlier'],
      ['One temperature for every step', 'Temperature 0.7 for planning and writing, 0.3 for repairs', 'Natural dialogues, repeatable fixes'],
      ['Llama 3.1 8B as the default model', 'Switched to DeepSeek V4.1 Flash', 'Highest pass rate (100%) and fewest off-level words'],
    ],
    notes: `Each change came from a failure we saw in the checks.
The last two rows: planning and writing run at temperature 0.7 for natural variety, repairs at 0.3 so fixes are repeatable; and on 23 November we switched the default model from Llama 3.1 8B to DeepSeek V4.1 Flash after the model comparison.`,
  },

  {
    type: 'beforeafter',
    phase: 4,
    title: 'Measured improvement',
    pairs: [
      { label: 'Target words used ≥ 2×',
        before: { value: '0 / 15', sub: 'first drafts' },
        after: { value: '100%', sub: 'reported final model outputs' } },
      { label: 'Words above level',
        before: { value: '~5%', sub: 'earlier' },
        after: { value: '0.7–2%', sub: 'refined (approx.)' } },
      { label: 'Post-office dialogue, A1',
        before: { value: '3 loops', sub: 'still did not pass' },
        after: { value: '1 loop', sub: '71 words, each target word 3×, 0% above level' } },
    ],
    note: 'Reported approximate figures. This shows a technical improvement, not yet a proven improvement in learner outcomes.',
    notes: `The same checks show clear progress: all target words now reach the minimum, fewer words are above level, and the post-office dialogue passes in one loop instead of failing after three.
It is a technical improvement; learning outcomes still need to be tested.`,
  },

  {
    type: 'steps',
    phase: 5,
    title: 'Phase 5 · Prototype deployment',
    question: 'Can we turn the improved system into something a learner can actually use?',
    steps: [
      { heading: 'Learner', sub: 'Opens the web app' },
      { heading: 'Streamlit app', sub: 'Select situation and level' },
      { heading: 'Dialogue pipeline', sub: 'Planner · Writer · Checker · Repairer', tone: 'orange' },
      { heading: 'Learning interface', sub: 'Dialogue · exercises · vocabulary review' },
      { heading: 'Learner practises', sub: 'Repeats and reviews vocabulary', tone: 'green' },
    ],
    notes: 'The learner opens the web app, picks a situation and level, the pipeline generates the dialogue, and the learner practises with exercises and vocabulary review.',
  },

  {
    type: 'table',
    phase: 5,
    title: 'Technology',
    size: 'small',
    columns: ['Component', 'Technology'],
    rows: [
      ['Frontend / app interface', 'Streamlit'],
      ['Deployment', 'Streamlit Community Cloud'],
      ['Source code', 'Private GitHub repository'],
      ['Dialogue generation', 'LLM API'],
      ['Quality control', 'Python checks'],
      ['Learning progress', 'SQLite and spaced repetition'],
      ['Evaluation', 'Benchmark page'],
    ],
    notes: 'A simple, low-cost stack: Streamlit for the app, an LLM API for generation, Python for checks, SQLite for progress.',
  },

  {
    type: 'features',
    phase: 5,
    title: 'What the prototype offers',
    items: [
      { icon: '💬', heading: 'Dialogue practice', sub: "Scenario-based dialogues adapted to the learner's level" },
      { icon: '✏️', heading: 'Exercises', sub: 'Gap-fill, sentence reordering and comprehension questions' },
      { icon: '🔁', heading: 'Spaced repetition', sub: 'Review vocabulary based on learning progress' },
      { icon: '📊', heading: 'Benchmark', sub: 'View measurements from generated dialogues' },
    ],
    notes: 'Four things a learner, or a teacher, can do in the app today.',
  },

  {
    type: 'split',
    phase: 5,
    size: 'small',
    title: 'How well does it meet the needs?',
    left: {
      heading: 'Technical achievements',
      items: [
        'Dialogues for different situations and CEFR levels',
        'Swiss-specific vocabulary',
        'Automated quality checks and repair',
        'Exercises and vocabulary repetition',
        '100% pass rate in the 36-dialogue DeepSeek experiment',
      ],
    },
    right: {
      heading: 'Still to validate',
      items: [
        'Natural and culturally appropriate, according to teachers?',
        'Useful and intuitive, according to learners?',
        'Do learners retain more words than with other methods?',
        'Is a 1–3 minute generation wait acceptable?',
      ],
    },
    notes: 'Technically the prototype works. Whether it helps learners is the open question for our next study.',
  },

  {
    type: 'timeline',
    title: 'From expert knowledge to a prototype',
    items: [
      { when: '1 · Understand', what: 'Teacher process + criteria' },
      { when: '2 · Engineer', what: 'Plan · write · check · repair' },
      { when: '3 · Evaluate', what: 'Compare models' },
      { when: '4 · Refine', what: 'Fix failures' },
      { when: '5 · Deploy', what: 'Streamlit app' },
    ],
    notes: `We started by defining what a good language teacher would do. We then translated that process into an AI workflow, tested different models and prompts, identified weaknesses, iteratively refined the system and deployed the improved solution as a working prototype.
The technical results are promising, while the pedagogical effectiveness still needs to be validated with teachers and learners.`,
  },

  {
    type: 'quote',
    text: 'The technical results are promising. The pedagogical effectiveness still needs to be validated with teachers and learners.',
    author: 'Where we stand',
  },

  {
    type: 'quote',
    text: 'The strength is not just multiple agents. It is LLM generation, deterministic checks, targeted repair and Swiss language resources working together.',
    author: 'Our key insight',
  },

  {
    type: 'title',
    kicker: 'Emergent finding · evaluation interviews',
    title: 'A new user group',
    subtitle: 'Children of families moving within Switzerland, not only adult newcomers from abroad',
    notes: `Found in our evaluation interviews:
- A mother told us the family moved from the French-speaking part to the German-speaking part of Switzerland.
- Her son is in grade 3 and is learning German at school.
- Speaking Schweizerdeutsch with friends does not give him the practice he needs.
Why Grüezi Deutsch helps:
- He can practise everyday situations with the right words and grammar.`,
  },
/* ── HIDDEN SLIDES: Agentic AI reference-architecture mapping ──────────
   Kept here but not shown. To show them again, delete this line
   and the closing line below.

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

── END HIDDEN SLIDES ─────────────────────────────────────────────── */


  {
    type: 'end',
    title: 'Danke · Merci · Grazie',
    subtitle: 'Questions?',
    contact: 'Grüezi Deutsch · DPE project, BFH',
  },
];
