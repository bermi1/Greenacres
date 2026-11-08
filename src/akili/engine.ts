/* Akili: the Green Acres AI engine.
   Runs fully in the browser for the demo. In production the question drafting and
   explanations call a language model through the school API; the mastery model and the
   results analysis below are the same code. */

export type Question = { id: string; q: string; options: string[]; answer: number; hint: string; explainEn: string; explainSw: string };
export type Objective = { id: string; text: string; questions: Question[] };
export type Topic = { id: string; subject: string; form: string; title: string; objectives: Objective[]; byTeacher?: boolean };

const q = (id: string, qq: string, options: string[], answer: number, hint: string, explainEn: string, explainSw: string): Question => ({ id, q: qq, options, answer, hint, explainEn, explainSw });

export const BUILT_IN: Topic[] = [
  {
    id: 'bio-f2-cells', subject: 'Biology', form: 'Form 2', title: 'Cell structure and organisation',
    objectives: [
      { id: 'o1', text: 'Name the parts of a cell and their functions', questions: [
        q('b1', 'Which organelle is the site of aerobic respiration?', ['Ribosome', 'Mitochondrion', 'Golgi body', 'Vacuole'], 1, 'Think of the “power house” of the cell.', 'Mitochondria release energy from food by aerobic respiration.', 'Mitokondria hutoa nishati kutoka kwenye chakula kwa upumuaji wa aerobiki.'),
        q('b2', 'What controls all the activities of the cell?', ['Cell membrane', 'Cytoplasm', 'Nucleus', 'Chloroplast'], 2, 'It contains the genetic material.', 'The nucleus holds DNA and controls cell activities.', 'Kiini kina DNA na hudhibiti shughuli zote za seli.'),
        q('b3', 'Where are proteins made in the cell?', ['Ribosomes', 'Vacuole', 'Cell wall', 'Lysosome'], 0, 'They are tiny and found on the rough endoplasmic reticulum.', 'Ribosomes join amino acids to make proteins.', 'Ribosomu huunganisha asidi amino kutengeneza protini.'),
      ] },
      { id: 'o2', text: 'Compare plant and animal cells', questions: [
        q('b4', 'Which structure is found in plant cells but not in animal cells?', ['Nucleus', 'Cell membrane', 'Chloroplast', 'Mitochondrion'], 2, 'It makes food using sunlight.', 'Chloroplasts carry out photosynthesis, which animal cells do not do.', 'Kloroplasti hufanya usanisinuru, jambo ambalo seli za wanyama hazifanyi.'),
        q('b5', 'What gives a plant cell its fixed shape?', ['Cell wall', 'Cytoplasm', 'Nucleus', 'Ribosome'], 0, 'It is made of cellulose.', 'The cellulose cell wall is rigid and keeps the shape of the plant cell.', 'Ukuta wa seli wa selulosi ni imara na hushikilia umbo la seli ya mmea.'),
        q('b6', 'Plant cells usually have…', ['many small vacuoles', 'one large permanent vacuole', 'no vacuole', 'a vacuole only at night'], 1, 'It is filled with cell sap.', 'A large permanent vacuole holds cell sap and keeps the cell firm.', 'Vakuoli kubwa ya kudumu huhifadhi utomvu wa seli na kuifanya seli kuwa imara.'),
      ] },
      { id: 'o3', text: 'Explain levels of organisation', questions: [
        q('b7', 'A group of similar cells doing the same job is called a…', ['tissue', 'organ', 'system', 'organism'], 0, 'It is one step above the cell.', 'Similar cells form a tissue, tissues form organs, organs form systems.', 'Seli zinazofanana huunda tishu, tishu huunda ogani, ogani huunda mfumo.'),
        q('b8', 'Which is the correct order?', ['Organ, cell, tissue, system', 'Cell, tissue, organ, system', 'Tissue, cell, system, organ', 'System, organ, cell, tissue'], 1, 'Start with the smallest unit.', 'Cell, tissue, organ, organ system, organism.', 'Seli, tishu, ogani, mfumo wa ogani, kiumbe.'),
        q('b9', 'The heart is an example of…', ['a tissue', 'a cell', 'an organ', 'an organism'], 2, 'It is made of several tissues working together.', 'The heart contains muscle, nerve and other tissues working together, so it is an organ.', 'Moyo una tishu za misuli, neva na nyingine zinazofanya kazi pamoja, hivyo ni ogani.'),
      ] },
    ],
  },
  {
    id: 'phy-f3-motion', subject: 'Physics', form: 'Form 3', title: 'Motion graphs',
    objectives: [
      { id: 'o1', text: 'Read a distance–time graph', questions: [
        q('p1', 'On a distance–time graph, a horizontal line means the body is…', ['speeding up', 'at rest', 'moving at constant speed', 'slowing down'], 1, 'Distance does not change.', 'If distance stays the same over time, the body is not moving.', 'Ikiwa umbali haubadiliki kadri muda unavyopita, kitu hakisogei.'),
        q('p2', 'The gradient of a distance–time graph gives…', ['acceleration', 'speed', 'force', 'distance'], 1, 'Gradient is change in distance over change in time.', 'Distance divided by time is speed.', 'Umbali ukigawanywa kwa muda ni kasi.'),
        q('p3', 'A steeper straight line on a distance–time graph shows…', ['a lower speed', 'a higher speed', 'zero speed', 'deceleration'], 1, 'Steeper means more distance in the same time.', 'More distance covered in the same time means higher speed.', 'Umbali mkubwa kwa muda uleule maana yake kasi kubwa.'),
      ] },
      { id: 'o2', text: 'Read a velocity–time graph', questions: [
        q('p4', 'The area under a velocity–time graph gives…', ['acceleration', 'displacement', 'speed', 'mass'], 1, 'Velocity times time.', 'Velocity multiplied by time is displacement, which is the area under the line.', 'Kasi ya mwelekeo ikizidishwa kwa muda ni uhamishaji, ambao ni eneo chini ya mstari.'),
        q('p5', 'The gradient of a velocity–time graph gives…', ['displacement', 'acceleration', 'distance', 'momentum'], 1, 'Change in velocity over time.', 'Change in velocity divided by time is acceleration.', 'Mabadiliko ya kasi ya mwelekeo yakigawanywa kwa muda ni mchapuko.'),
        q('p6', 'A horizontal line on a velocity–time graph means…', ['constant velocity', 'at rest only', 'constant acceleration', 'falling freely'], 0, 'Velocity does not change.', 'Velocity stays the same, so acceleration is zero and velocity is constant.', 'Kasi ya mwelekeo haibadiliki, hivyo mchapuko ni sifuri.'),
      ] },
      { id: 'o3', text: 'Calculate acceleration from data', questions: [
        q('p7', 'A car goes from rest to 20 m/s in 5 s. Its acceleration is…', ['2 m/s²', '4 m/s²', '25 m/s²', '100 m/s²'], 1, 'a = change in velocity ÷ time.', '(20 − 0) ÷ 5 = 4 m/s².', '(20 − 0) ÷ 5 = 4 m/s².'),
        q('p8', 'A bus slows from 15 m/s to 5 m/s in 2 s. Its acceleration is…', ['5 m/s²', '−5 m/s²', '10 m/s²', '−10 m/s²'], 1, 'Final minus initial, then divide by time.', '(5 − 15) ÷ 2 = −5 m/s², a deceleration.', '(5 − 15) ÷ 2 = −5 m/s², yaani upunguaji wa kasi.'),
        q('p9', 'Which unit is used for acceleration?', ['m/s', 'm/s²', 'N', 'kg·m'], 1, 'Velocity per second.', 'Metres per second, per second: m/s².', 'Mita kwa sekunde, kwa sekunde: m/s².'),
      ] },
    ],
  },
];

/* ---------- topics a teacher has published ---------- */

const TKEY = 'akili-topics';
export function teacherTopics(): Topic[] {
  try {
    return JSON.parse(localStorage.getItem(TKEY) || '[]');
  } catch {
    return [];
  }
}
export function publishTopic(t: Topic) {
  const all = [t, ...teacherTopics().filter((x) => x.id !== t.id)];
  try {
    localStorage.setItem(TKEY, JSON.stringify(all));
  } catch {
    /* memory only */
  }
}
export const allTopics = () => [...teacherTopics(), ...BUILT_IN];

/** Draft objectives and questions from a teacher's notes.
    Objectives: lines starting with "-", "*" or a number. Questions: definition sentences ("X is Y", "X are Y"),
    with the other definitions as distractors. */
export function draftFromNotes(notes: string, title: string, subject: string, form: string): Topic {
  const lines = notes.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const objLines = lines.filter((l) => /^([-*•]|\d+[.)])\s+/.test(l)).map((l) => l.replace(/^([-*•]|\d+[.)])\s+/, ''));
  const sentences = notes.replace(/\n+/g, ' ').split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 12);
  const defs = sentences
    .map((s) => s.match(/^(?:The |A |An )?([A-Za-z][A-Za-z\s-]{1,40}?)\s+(is|are)\s+(.{6,120}?)[.!?]?$/i))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => ({ term: m[1].trim(), verb: m[2].toLowerCase(), meaning: m[3].trim() }));
  const objectives = (objLines.length ? objLines : ['Key ideas from the notes']).slice(0, 4).map((text, i) => ({ id: 'o' + (i + 1), text, questions: [] as Question[] }));
  defs.forEach((d, i) => {
    const others = defs.filter((x) => x !== d).map((x) => x.meaning);
    const pool = [...new Set(others)].slice(0, 3);
    while (pool.length < 3) pool.push(['None of these', 'It has no function', 'It only works at night'][pool.length]);
    const pos = i % 4;
    const options = [...pool];
    options.splice(pos, 0, d.meaning);
    const first = d.meaning.split(' ')[0];
    objectives[i % objectives.length].questions.push(
      q('t' + i, `What ${d.verb} ${d.term.toLowerCase()}?`, options, pos, `It starts with “${first}…”.`, `${d.term} ${d.verb} ${d.meaning}.`, `${d.term}: ${d.meaning}. (Mwalimu ataongeza maelezo kwa Kiswahili.)`),
    );
  });
  return { id: 'teacher-' + Date.now().toString(36), subject, form, title, objectives: objectives.filter((o) => o.questions.length), byTeacher: true };
}

/* ---------- the mastery model ---------- */

export type Progress = Record<string, number>; // objective id -> mastery 0..1
export const MASTERED = 0.8;
export const startProgress = (t: Topic): Progress => Object.fromEntries(t.objectives.map((o) => [o.id, 0.3]));

/** Correct answers raise mastery (less after a hint); wrong answers pull it down. */
export function update(p: number, correct: boolean, usedHint: boolean) {
  if (correct) return Math.min(1, p + (1 - p) * (usedHint ? 0.18 : 0.38));
  return Math.max(0.05, p * 0.6);
}

/** Next question: the weakest objective not yet mastered; once all are mastered, a revision question from the oldest. */
export function nextQuestion(t: Topic, prog: Progress, recent: string[]): { obj: Objective; q: Question; revision: boolean } | null {
  const open = t.objectives.filter((o) => prog[o.id] < MASTERED).sort((a, b) => prog[a.id] - prog[b.id]);
  const revision = open.length === 0;
  const obj = revision ? t.objectives[recent.length % t.objectives.length] : open[0];
  if (!obj) return null;
  const fresh = obj.questions.filter((x) => !recent.includes(x.id));
  const qq = (fresh.length ? fresh : obj.questions)[0];
  return { obj, q: qq, revision };
}

/* ---------- results intelligence (Akili Insights) ---------- */

export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
export const TESTS = ['Test 1', 'Test 2', 'Mid-term'];
export type Student = { name: string; scores: Record<string, number[]> };

/** Example class data, generated the same way every time so the demo is repeatable. */
export function sampleClass(): Student[] {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const names = ['Neema', 'Baraka', 'Rehema', 'Ibrahim', 'Grace', 'Joseph', 'Amina', 'Daudi', 'Zawadi', 'Elia', 'Halima', 'Godfrey', 'Faraja', 'Musa', 'Upendo', 'Salma', 'Peter', 'Asha', 'Kelvin', 'Rose', 'Hamisi', 'Lucy', 'Juma', 'Witness'];
  const trend: Record<string, number> = { Mathematics: 1, Physics: -5, Chemistry: 6, Biology: 2, English: 1 };
  return names.map((n, i) => {
    const base = 48 + rnd() * 36;
    const scores: Record<string, number[]> = {};
    SUBJECTS.forEach((s) => {
      let v = base + (rnd() - 0.5) * 16;
      const personal = i === 3 && s === 'Physics' ? -10 : i === 9 && s === 'Mathematics' ? -9 : i === 14 && s === 'Chemistry' ? 7 : 0;
      scores[s] = TESTS.map((_, t) => Math.round(Math.max(12, Math.min(98, v + t * (trend[s] + personal) + (rnd() - 0.5) * 6))));
      v = 0;
    });
    return { name: `${n} ${String.fromCharCode(65 + (i % 26))}.`, scores };
  });
}

const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
/** Least-squares slope: points gained or lost per test. */
export const slope = (ys: number[]) => {
  const xs = ys.map((_, i) => i);
  const mx = mean(xs), my = mean(ys);
  return xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
};

export function analyse(cls: Student[]) {
  const subjects = SUBJECTS.map((s) => {
    const byTest = TESTS.map((_, t) => mean(cls.map((st) => st.scores[s][t])));
    return { subject: s, latest: byTest[byTest.length - 1], change: byTest[byTest.length - 1] - byTest[0], byTest };
  }).sort((a, b) => b.change - a.change);

  const flags: { name: string; subject: string; reason: string; kind: 'support' | 'stretch'; score: number }[] = [];
  cls.forEach((st) => SUBJECTS.forEach((s) => {
    const sc = st.scores[s];
    const k = slope(sc);
    const last = sc[sc.length - 1];
    if (k <= -6) flags.push({ name: st.name, subject: s, kind: 'support', score: k, reason: `down ${Math.abs(Math.round(k))} marks per test (${sc.join(' → ')})` });
    else if (last < 35) flags.push({ name: st.name, subject: s, kind: 'support', score: last - 50, reason: `latest mark ${last}, below the pass line` });
    else if (k >= 7 && last >= 75) flags.push({ name: st.name, subject: s, kind: 'stretch', score: k, reason: `up ${Math.round(k)} marks per test, ready for extension` });
  }));
  flags.sort((a, b) => (a.kind === b.kind ? Math.abs(b.score) - Math.abs(a.score) : a.kind === 'support' ? -1 : 1));

  const gaps = [
    { subject: 'Physics', topic: 'Velocity–time graphs', correct: 41 },
    { subject: 'Physics', topic: 'Calculating acceleration', correct: 48 },
    { subject: 'Mathematics', topic: 'Simultaneous equations', correct: 52 },
    { subject: 'Biology', topic: 'Levels of organisation', correct: 58 },
  ];
  const worst = subjects[subjects.length - 1];
  const best = subjects[0];
  const actions = [
    `Set the Akili Learn topic “Motion graphs” for the whole class; ${gaps[0].correct}% answered velocity–time questions correctly.`,
    `Meet the ${flags.filter((f) => f.kind === 'support').length} students flagged for support before the next test.`,
    `Ask the ${best.subject} teacher to share what changed: the class average rose ${best.change.toFixed(1)} marks.`,
    `${worst.subject} fell ${Math.abs(worst.change).toFixed(1)} marks across three tests; review pacing with the department.`,
  ];
  return { subjects, flags, gaps, actions, classAverage: mean(subjects.map((s) => s.latest)) };
}

/** Plain-language summary for one student's parents. */
export function parentSummary(st: Student, lang: 'en' | 'sw') {
  const rows = SUBJECTS.map((s) => ({ s, k: slope(st.scores[s]), last: st.scores[s][2] })).sort((a, b) => b.k - a.k);
  const up = rows[0], down = rows[rows.length - 1];
  const first = st.name.split(' ')[0];
  const sw: Record<string, string> = { Mathematics: 'Hisabati', Physics: 'Fizikia', Chemistry: 'Kemia', Biology: 'Biolojia', English: 'Kiingereza' };
  if (lang === 'sw')
    return `${first} amepanda zaidi katika ${sw[up.s]} (alama ${st.scores[up.s].join(' → ')}). ${down.k < -2 ? `${sw[down.s]} imeshuka kidogo (alama ${st.scores[down.s].join(' → ')}); mazoezi ya dakika 20 kwa siku kwenye Akili Learn yatasaidia.` : 'Masomo mengine yako imara.'} Muhtasari huu umeandaliwa na Akili na kuthibitishwa na mwalimu wa darasa.`;
  return `${first} improved most in ${up.s} (marks ${st.scores[up.s].join(' → ')}). ${down.k < -2 ? `${down.s} dipped (marks ${st.scores[down.s].join(' → ')}); 20 minutes a day on Akili Learn will help.` : 'Other subjects are steady.'} Prepared by Akili and checked by the class teacher.`;
}
