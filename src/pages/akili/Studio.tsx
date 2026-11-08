import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Check, FileText, Lightbulb, MessageSquare, Rocket, Sparkles, TrendingDown, TrendingUp, Wand2 } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnPrimary, card } from '../../components/StaffShell';
import { Field, Toast, inputCls } from '../../components/ui';
import { SUBJECTS, TESTS, analyse, draftFromNotes, parentSummary, publishTopic, sampleClass, type Topic } from '../../akili/engine';

const SAMPLE_NOTES = `Topic: The digestive system (Form 1 Biology)

Objectives
- Name the organs of the digestive system
- Describe what happens in the mouth and stomach
- Explain how food is absorbed

Digestion is the breakdown of large food molecules into small soluble molecules.
Saliva is a liquid in the mouth that contains the enzyme amylase.
The stomach is a muscular bag that mixes food with gastric juice.
Villi are tiny finger-like projections that increase the surface area for absorption.
The liver is the organ that produces bile.
Absorption is the movement of digested food into the blood.`;

function Insights() {
  const cls = useMemo(() => sampleClass(), []);
  const a = useMemo(() => analyse(cls), [cls]);
  const max = 100;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-gold-50 px-5 py-3 text-sm text-ink-2"><Sparkles className="h-4 w-4 text-gold-500" />Form 3 East · {cls.length} students · {TESTS.join(', ')} · example class data. With the school database connected, Akili reads real results from ForShule and test uploads.</div>
      <div className="grid gap-4 xl:grid-cols-3">
        <section className={`${card} p-5 xl:col-span-2`}>
          <div className="flex items-baseline justify-between"><h2 className="m-0 font-display text-xl font-bold">Subject performance</h2><span className="text-sm text-ink-3">Class average {a.classAverage.toFixed(1)}</span></div>
          <div className="mt-5 flex flex-col gap-4">
            {a.subjects.map((s) => (
              <div key={s.subject} className="grid grid-cols-[120px_1fr_90px] items-center gap-3">
                <span className="text-[15px] font-medium">{s.subject}</span>
                <div className="flex h-7 items-end gap-1">
                  {s.byTest.map((v, i) => (
                    <div key={i} className="flex-1" title={`${TESTS[i]}: ${v.toFixed(1)}`}>
                      <div className={`rounded-md transition-all ${i === s.byTest.length - 1 ? (s.change < 0 ? 'bg-gold-400' : 'bg-green-600') : 'bg-green-200'}`} style={{ height: `${(v / max) * 28}px` }} />
                    </div>
                  ))}
                </div>
                <span className={`flex items-center justify-end gap-1 text-[15px] font-semibold tabular-nums ${s.change < 0 ? 'text-gold-700' : 'text-green-600'}`}>
                  {s.change < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                  {s.change > 0 ? '+' : ''}{s.change.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 mt-4 text-xs text-ink-3">Bars show the class average in each test. The number is the change from {TESTS[0]} to {TESTS[TESTS.length - 1]}.</p>
        </section>
        <section className={`${card} p-5`}>
          <h2 className="m-0 font-display text-xl font-bold">Topic gaps</h2>
          <div className="mt-4 flex flex-col gap-3">
            {a.gaps.map((g) => (
              <div key={g.topic}>
                <div className="flex justify-between text-[14px]"><span><b>{g.subject}</b> · {g.topic}</span><span className="tabular-nums">{g.correct}%</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-paper-2"><div className={`h-2 rounded-full ${g.correct < 50 ? 'bg-gold-400' : 'bg-green-400'}`} style={{ width: `${g.correct}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="m-0 mt-3 text-xs text-ink-3">Share of questions answered correctly on each topic.</p>
        </section>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <section className={`${card} p-5`}>
          <h2 className="m-0 font-display text-xl font-bold">Students to support or stretch</h2>
          <div className="mt-4 flex flex-col gap-2">
            {a.flags.slice(0, 7).map((f) => (
              <div key={f.name + f.subject} className="flex items-start gap-3 rounded-xl border border-line p-3">
                {f.kind === 'support' ? <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-gold-500" /> : <Rocket className="mt-0.5 h-5 w-5 flex-none text-green-600" />}
                <div className="flex-1"><p className="m-0 text-[15px]"><b>{f.name}</b> · {f.subject}</p><p className="m-0 text-sm text-ink-3">{f.reason}</p></div>
                <Badge tone={f.kind === 'support' ? 'gold' : 'green'}>{f.kind === 'support' ? 'Support' : 'Stretch'}</Badge>
              </div>
            ))}
          </div>
          <p className="m-0 mt-3 text-xs text-ink-3">Found from each student’s trend across tests, not one mark. Staff decide what to do.</p>
        </section>
        <section className="rounded-3xl bg-green-950 p-5 text-white">
          <h2 className="m-0 flex items-center gap-2 font-display text-xl font-bold"><Lightbulb className="h-5 w-5 text-gold-400" />Suggested actions</h2>
          <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            {a.actions.map((t, i) => <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/90"><span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-gold-400 text-sm font-bold text-ink">{i + 1}</span>{t}</li>)}
          </ol>
          <p className="m-0 mt-4 text-sm text-gold-400">The Head of Academics approves before anything is sent.</p>
        </section>
      </div>
    </div>
  );
}

function Notes() {
  const [title, setTitle] = useState('The digestive system');
  const [subject, setSubject] = useState('Biology');
  const [form, setForm] = useState('Form 1');
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const [draft, setDraft] = useState<Topic | null>(null);
  const [ok, setOk] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const approved = draft ? draft.objectives.flatMap((o) => o.questions).filter((q) => ok[q.id]).length : 0;

  const make = () => {
    setBusy(true);
    setToast('');
    setTimeout(() => {
      const t = draftFromNotes(notes, title, subject, form);
      setDraft(t);
      setOk(Object.fromEntries(t.objectives.flatMap((o) => o.questions).map((q) => [q.id, true])));
      setBusy(false);
    }, 700);
  };
  const publish = () => {
    if (!draft) return;
    publishTopic({ ...draft, objectives: draft.objectives.map((o) => ({ ...o, questions: o.questions.filter((q) => ok[q.id]) })).filter((o) => o.questions.length) });
    setToast(`“${draft.title}” is live in Akili Learn for ${form} students.`);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className={`${card} flex flex-col gap-4 p-5`}>
        <h2 className="m-0 flex items-center gap-2 font-display text-xl font-bold"><FileText className="h-5 w-5 text-green-600" />Teacher notes and objectives</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Topic"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} /></Field>
          <Field label="Subject"><select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Class"><select value={form} onChange={(e) => setForm(e.target.value)} className={inputCls}>{['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'].map((s) => <option key={s}>{s}</option>)}</select></Field>
        </div>
        <Field label="Paste your notes. Start objectives with a dash."><textarea rows={14} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls + ' font-mono text-[14px]'} /></Field>
        <button type="button" onClick={make} disabled={busy} className={btnPrimary + ' min-h-[48px]'}><Wand2 className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} />{busy ? 'Akili is reading your notes…' : 'Draft lesson and questions'}</button>
      </section>
      <section className={`${card} flex flex-col gap-4 p-5`}>
        {toast && <Toast text={toast} />}
        {!draft ? (
          <div className="grid flex-1 place-items-center text-center text-ink-3"><div><Sparkles className="mx-auto h-10 w-10 text-gold-500" /><p className="m-0 mt-3 font-display text-lg font-bold text-ink">Akili turns your notes into practice</p><p className="m-0 mt-1 text-sm">Objectives come from your list. Questions come from your own sentences. You approve each one.</p></div></div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="m-0 font-display text-xl font-bold">{draft.title}</h2><Badge tone="gold">Draft · needs your approval</Badge></div>
            {draft.objectives.map((o) => (
              <div key={o.id} className="rounded-xl border border-line p-4">
                <p className="m-0 text-[13px] font-semibold uppercase tracking-[.1em] text-green-600">Objective</p>
                <p className="m-0 font-semibold">{o.text}</p>
                {o.questions.map((q) => (
                  <label key={q.id} className="mt-3 flex cursor-pointer gap-3 rounded-lg bg-paper-2 p-3">
                    <input type="checkbox" checked={!!ok[q.id]} onChange={() => setOk({ ...ok, [q.id]: !ok[q.id] })} className="mt-1 h-4 w-4 accent-green-600" />
                    <span className="text-[14px]"><b>{q.q}</b><br /><span className="text-ink-3">Answer: {q.options[q.answer]}</span></span>
                  </label>
                ))}
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={publish} disabled={!approved} className={btnPrimary}><Check className="h-4 w-4" />Publish {approved} questions to students</button>
              <Link to="/akili" className={btnGhost}>Open Akili Learn <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function Parents() {
  const cls = useMemo(() => sampleClass(), []);
  const [i, setI] = useState(3);
  const [lang, setLang] = useState<'sw' | 'en'>('sw');
  const [sent, setSent] = useState(false);
  const st = cls[i];
  const text = parentSummary(st, lang);
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <section className={`${card} p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 font-display text-xl font-bold">Results explained for parents</h2>
          <div className="flex gap-1 rounded-full bg-paper-2 p-1">{(['sw', 'en'] as const).map((l) => <button key={l} type="button" onClick={() => setLang(l)} className={`min-h-[36px] rounded-full px-4 text-sm font-medium ${lang === l ? 'bg-green-600 text-white' : ''}`}>{l === 'sw' ? 'Kiswahili' : 'English'}</button>)}</div>
        </div>
        <Field label="Student" className="mt-4 max-w-sm"><select value={i} onChange={(e) => { setI(Number(e.target.value)); setSent(false); }} className={inputCls}>{cls.map((s, k) => <option key={s.name} value={k}>{s.name}</option>)}</select></Field>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-line text-ink-3"><th className="py-2 font-semibold">Subject</th>{TESTS.map((t) => <th key={t} className="py-2 font-semibold">{t}</th>)}</tr></thead>
            <tbody>{SUBJECTS.map((s) => <tr key={s} className="border-b border-paper-2"><td className="py-2">{s}</td>{st.scores[s].map((v, k) => <td key={k} className="py-2 tabular-nums">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="rounded-[32px] border-[10px] border-green-950 bg-white p-5">
        <p className="m-0 font-display text-lg font-bold text-green-600">{lang === 'sw' ? `Muhtasari wa ${st.name.split(' ')[0]}` : `${st.name.split(' ')[0]}’s summary`}</p>
        <p key={text} className="m-0 mt-3 text-[15px] leading-relaxed animate-pop">{text}</p>
        <button type="button" onClick={() => setSent(true)} className={btnPrimary + ' mt-5 w-full'}><MessageSquare className="h-4 w-4" />{sent ? 'Approved and queued for SMS and Parent Hub' : 'Approve and send to parent'}</button>
        <p className="m-0 mt-2 text-xs text-ink-3">Example class data. Messages go out once SMS is connected.</p>
      </section>
    </div>
  );
}

export default function Studio() {
  const [tab, setTab] = useState<'insights' | 'notes' | 'parents'>('insights');
  const tabs = [['insights', 'Results insights'], ['notes', 'Notes to lessons'], ['parents', 'Parent summaries']] as const;
  return (
    <StaffShell kicker="AKILI · THE GREEN ACRES AI" title="Akili Studio" actions={<Link to="/akili" className={btnGhost}>Student view <ArrowRight className="h-4 w-4" /></Link>}>
      <div role="tablist" className="no-scrollbar mb-5 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map(([id, l]) => <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`min-h-[44px] flex-none border-b-2 px-4 text-sm font-semibold ${tab === id ? 'border-green-600 text-green-700' : 'border-transparent text-ink-3'}`}>{l}</button>)}
      </div>
      {tab === 'insights' ? <Insights /> : tab === 'notes' ? <Notes /> : <Parents />}
    </StaffShell>
  );
}
