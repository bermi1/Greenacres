import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, Lightbulb, Languages, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { brand } from '../../lib/media';
import { LangToggle } from '../../components/SiteLayout';
import { MASTERED, allTopics, nextQuestion, startProgress, update, type Progress, type Topic } from '../../akili/engine';

function Bar({ v }: { v: number }) {
  return (
    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-green-50">
      <div className={`h-full rounded-full transition-all duration-700 ${v >= MASTERED ? 'bg-green-600' : v >= 0.5 ? 'bg-green-400' : 'bg-gold-400'}`} style={{ width: `${Math.round(v * 100)}%` }} />
    </div>
  );
}

function Session({ topic, onExit }: { topic: Topic; onExit: () => void }) {
  const { tr } = useLang();
  const [prog, setProg] = useState<Progress>(() => startProgress(topic));
  const [recent, setRecent] = useState<string[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [sw, setSw] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const next = useMemo(() => nextQuestion(topic, prog, recent), [topic, prog, recent]);
  const allDone = topic.objectives.every((o) => prog[o.id] >= MASTERED);
  if (!next) return null;
  const { obj, q, revision } = next;
  const isRight = picked === q.answer;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setAnswered((n) => n + 1);
    if (i === q.answer) setCorrect((n) => n + 1);
  };
  const advance = () => {
    setProg((p) => ({ ...p, [obj.id]: update(p[obj.id], picked === q.answer, hint) }));
    setRecent((r) => [q.id, ...r].slice(0, 4));
    setPicked(null);
    setHint(false);
    setSw(false);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[340px_1fr]">
      <aside className="flex flex-col gap-4">
        <button type="button" onClick={onExit} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-green-600"><ArrowLeft className="h-4 w-4" />{tr('All topics', 'Mada zote')}</button>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[.12em] text-green-600">{topic.subject} · {topic.form}</p>
          <h2 className="m-0 mt-1 font-display text-xl font-bold">{topic.title}</h2>
          <div className="mt-5 flex flex-col gap-4">
            {topic.objectives.map((o) => (
              <div key={o.id}>
                <p className={`m-0 mb-1.5 text-[14px] leading-snug ${o.id === obj.id ? 'font-semibold text-ink' : 'text-ink-3'}`}>{o.text}</p>
                <div className="flex items-center gap-3"><Bar v={prog[o.id]} /><span className="w-16 text-right text-xs font-semibold tabular-nums text-ink-3">{prog[o.id] >= MASTERED ? tr('Mastered', 'Umemudu') : `${Math.round(prog[o.id] * 100)}%`}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-card"><p className="m-0 font-display text-2xl font-bold text-green-600">{answered}</p><p className="m-0 text-xs text-ink-3">{tr('questions', 'maswali')}</p></div>
          <div className="rounded-xl bg-white p-4 shadow-card"><p className="m-0 font-display text-2xl font-bold text-green-600">{answered ? Math.round((correct / answered) * 100) : 0}%</p><p className="m-0 text-xs text-ink-3">{tr('correct', 'sahihi')}</p></div>
        </div>
      </aside>

      <main className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        {allDone && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 animate-pop">
            <Trophy className="h-6 w-6 flex-none text-gold-500" />
            <span className="text-[15px] font-semibold">{tr('All objectives mastered. Akili now mixes in revision so it sticks.', 'Malengo yote yamemudu. Akili sasa inaongeza marudio ili usisahau.')}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
          <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">{revision ? tr('Revision', 'Marudio') : tr('Your weakest objective', 'Lengo lako dhaifu zaidi')}</span>
          <span className="text-ink-3">{obj.text}</span>
        </div>
        <h1 key={q.id} className="m-0 mt-5 font-display text-[26px] font-bold leading-snug animate-fadeUp">{q.q}</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {q.options.map((o, i) => {
            const state = picked === null ? 'idle' : i === q.answer ? 'right' : i === picked ? 'wrong' : 'off';
            return (
              <button key={o} type="button" onClick={() => choose(i)} disabled={picked !== null} className={`flex min-h-[60px] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[16px] transition ${state === 'idle' ? 'border-line hover:border-green-600 hover:bg-green-50' : state === 'right' ? 'border-green-600 bg-green-50' : state === 'wrong' ? 'border-red-400 bg-red-50' : 'border-line opacity-60'}`}>
                <span className={`grid h-8 w-8 flex-none place-items-center rounded-full text-sm font-semibold ${state === 'right' ? 'bg-green-600 text-white' : state === 'wrong' ? 'bg-red-500 text-white' : 'bg-paper-2 text-ink-2'}`}>
                  {state === 'right' ? <Check className="h-4 w-4" /> : state === 'wrong' ? <X className="h-4 w-4" /> : 'ABCD'[i]}
                </span>
                {o}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {picked === null && !hint && (
            <button type="button" onClick={() => setHint(true)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gold-400 px-5 font-semibold text-ink"><Lightbulb className="h-4 w-4" />{tr('Give me a hint', 'Nipe dokezo')}</button>
          )}
          {picked !== null && (
            <button type="button" onClick={() => setSw(!sw)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-green-950 px-5 font-semibold text-white"><Languages className="h-4 w-4" />{sw ? 'Explain in English' : 'Eleza kwa Kiswahili'}</button>
          )}
        </div>
        {hint && picked === null && <p className="m-0 mt-4 rounded-xl bg-gold-50 p-4 text-[16px] animate-pop"><b>{tr('Hint', 'Dokezo')}:</b> {q.hint}</p>}
        {picked !== null && (
          <div className={`mt-4 rounded-xl p-5 animate-pop ${isRight ? 'bg-green-50' : 'bg-paper-2'}`}>
            <p className="m-0 font-display text-lg font-bold">{isRight ? tr('Correct!', 'Sahihi!') : tr('Not quite. Here is why:', 'Si sahihi. Sababu ni hii:')}</p>
            <p className="m-0 mt-1 text-[16px] leading-relaxed">{sw ? q.explainSw : q.explainEn}</p>
            <button type="button" onClick={advance} className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-green-600 px-6 font-semibold text-white hover:bg-green-700">{tr('Next question', 'Swali linalofuata')} <ArrowRight className="h-4 w-4" /></button>
          </div>
        )}
        <p className="m-0 mt-8 flex items-center gap-2 text-xs text-ink-3"><Sparkles className="h-3.5 w-3.5 text-gold-500" />{tr('Akili chooses each question from your weakest objective and adapts after every answer.', 'Akili huchagua kila swali kutoka lengo lako dhaifu na hubadilika baada ya kila jibu.')}</p>
      </main>
    </div>
  );
}

export default function Learn() {
  const { tr } = useLang();
  const topics = useMemo(() => allTopics(), []);
  const [open, setOpen] = useState<Topic | null>(null);
  return (
    <div className="min-h-screen bg-paper-2 font-sans text-ink">
      <header className="bg-green-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-white no-underline">
            <img src={brand('logo-white.png')} alt="" className="h-11 w-auto" />
            <span className="leading-tight"><span className="block font-display text-lg font-bold">Akili Learn</span><span className="block text-xs text-white/80">Green Acres Schools</span></span>
          </Link>
          <div className="flex items-center gap-2"><LangToggle dark /><span className="hidden rounded-full bg-white/15 px-3 py-1.5 text-sm sm:inline">{tr('Student: Form demo', 'Mwanafunzi: onyesho')}</span></div>
        </div>
      </header>
      {open ? (
        <Session key={open.id} topic={open} onExit={() => setOpen(null)} />
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
          <p className="m-0 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[.12em] text-green-600"><span className="h-[3px] w-8 rounded-full bg-gold-400" />{tr('Adaptive learning', 'Kujifunza kwa kasi yako')}</p>
          <h1 className="m-0 mt-3 font-display text-[34px] font-bold leading-tight sm:text-[42px]">{tr('Learn at your own pace, one objective at a time', 'Jifunze kwa kasi yako, lengo moja baada ya jingine')}</h1>
          <p className="m-0 mt-3 max-w-2xl text-[17px] text-ink-3">{tr('Your teachers set the objectives. Akili gives you practice where you need it most, hints when you are stuck, and explanations in English or Kiswahili.', 'Walimu wako huweka malengo. Akili hukupa mazoezi pale unapohitaji zaidi, madokezo ukikwama, na maelezo kwa Kiingereza au Kiswahili.')}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <button key={t.id} type="button" onClick={() => setOpen(t)} className="group flex flex-col gap-3 rounded-2xl bg-white p-6 text-left shadow-card transition hover:-translate-y-1">
                <span className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-green-600"><BookOpen className="h-6 w-6" /></span>
                  {t.byTeacher && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold">{tr('New from your teacher', 'Mpya kutoka kwa mwalimu')}</span>}
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-[.1em] text-green-600">{t.subject} · {t.form}</span>
                <span className="font-display text-xl font-bold">{t.title}</span>
                <span className="text-sm text-ink-3">{t.objectives.length} {tr('objectives', 'malengo')} · {t.objectives.reduce((n, o) => n + o.questions.length, 0)} {tr('questions', 'maswali')}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 font-semibold text-green-600">{tr('Start learning', 'Anza kujifunza')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </button>
            ))}
          </div>
          <p className="m-0 mt-8 flex items-center gap-2 text-sm text-ink-3"><RotateCcw className="h-4 w-4" />{tr('Teachers add topics from Akili Studio in the Control Centre.', 'Walimu huongeza mada kupitia Akili Studio.')}</p>
        </div>
      )}
    </div>
  );
}
