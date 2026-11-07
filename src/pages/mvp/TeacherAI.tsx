import { useState } from 'react';
import { CheckCircle2, ClipboardList, FileDown, Sparkles, WandSparkles } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnPrimary, card } from '../../components/StaffShell';
import { Pill, Toast } from '../../components/ui';

const SUBJECTS: [string, string, string][] = [['bio', 'Biology', 'Cell structure and organisation'], ['chem', 'Chemistry', 'The mole concept'], ['phy', 'Physics', 'Motion in a straight line'], ['geo', 'Geography', 'Weather and climate']];
const BANK: Record<string, string[]> = {
  bio: ['Which organelle is the site of aerobic respiration? (A) Ribosome (B) Mitochondrion (C) Golgi body (D) Vacuole', 'Name two structures found in a plant cell but not in an animal cell, and state one function of each.', 'Explain why red blood cells cannot divide.', 'Draw and label a typical animal cell as seen under a light microscope.'],
  chem: ['How many moles are in 22 g of carbon dioxide? (C = 12, O = 16)', 'Define the term "molar mass" and give its SI unit.', 'Calculate the number of molecules in 0.5 mol of water. (L = 6.02 × 10²³)', "State Avogadro's law."],
  phy: ['Distinguish between distance and displacement.', 'A car accelerates uniformly from rest to 20 m/s in 5 s. Find its acceleration.', 'Sketch a velocity–time graph for a body moving with uniform acceleration.', 'What does the area under a velocity–time graph represent?'],
  geo: ['Differentiate between weather and climate.', 'Name the instrument used to measure relative humidity.', 'Explain two factors that influence the climate of Dar es Salaam.', 'Describe how a Stevenson screen is constructed.'],
};

export default function TeacherAI() {
  const [subject, setSubject] = useState('bio');
  const [form, setForm] = useState(2);
  const [gen, setGen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState('');
  const cur = SUBJECTS.find((s) => s[0] === subject)!;
  const approved = Object.values(ok).filter(Boolean).length;
  const reset = () => { setGen(false); setOk({}); setToast(''); };

  const draft = () => {
    setBusy(true);
    setOk({});
    setTimeout(() => { setBusy(false); setGen(true); }, 700);
  };

  return (
    <StaffShell kicker="BERMI AI · TEACHER COPILOT" title="Practice questions in NECTA style">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <section className={`${card} flex flex-col gap-4 p-5 lg:w-[360px] lg:flex-none`}>
          <div>
            <div className="mb-2 text-sm font-bold">Subject</div>
            <div className="flex flex-wrap gap-2">{SUBJECTS.map(([id, label]) => <Pill key={id} on={subject === id} onClick={() => { setSubject(id); reset(); }}>{label}</Pill>)}</div>
          </div>
          <div>
            <div className="mb-2 text-sm font-bold">Class</div>
            <div className="flex flex-wrap gap-2">{[1, 2, 3, 4].map((f) => <Pill key={f} on={form === f} onClick={() => { setForm(f); reset(); }}>Form {f}</Pill>)}</div>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-bold">
            Topic
            <input readOnly value={cur[2]} className="min-h-[44px] rounded-xl border border-line-2 bg-paper px-3 font-normal" />
          </label>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge tone="grey">Section A · objective</Badge>
            <Badge tone="grey">Section B · short answer</Badge>
          </div>
          <button type="button" onClick={draft} disabled={busy} className={btnPrimary + ' min-h-[48px]'}>
            <WandSparkles className={`h-[18px] w-[18px] ${busy ? 'animate-spin' : ''}`} aria-hidden="true" /> {busy ? 'Drafting…' : 'Draft questions'}
          </button>
          <div className="text-xs text-ink-3">Built on the national syllabus. No student data is sent to the AI. Demo questions are prepared samples.</div>
        </section>

        <section className={`${card} min-h-[420px] flex-1 p-5`}>
          {!gen ? (
            <div className="grid h-full min-h-[380px] place-items-center text-center">
              <div>
                <Sparkles className="mx-auto h-10 w-10 text-sky-600" aria-hidden="true" />
                <div className="mt-3 font-display text-xl font-extrabold">Pick a subject and class, then draft</div>
                <div className="mt-1 text-ink-3">You review, edit and approve every question before it reaches students.</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 animate-fadeUp">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-display text-lg font-extrabold">{cur[1]} · Form {form} · {cur[2]}</div>
                <Badge tone="gold">Draft · needs teacher review</Badge>
              </div>
              {toast && <Toast text={toast} />}
              {BANK[subject].map((q, i) => (
                <div key={q} className="flex items-start gap-3 rounded-xl border border-line p-3.5 animate-pop" style={{ animationDelay: `${i * 90}ms` }}>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-paper-2 text-sm font-bold">{i + 1}</span>
                  <p className="m-0 flex-1 pt-1 text-[15px] leading-relaxed">{q}</p>
                  <button type="button" onClick={() => setOk({ ...ok, [i]: !ok[i] })} aria-pressed={!!ok[i]} className={`inline-flex min-h-[40px] flex-none items-center gap-1.5 rounded-xl px-3 text-[13px] font-bold ${ok[i] ? 'border border-green-200 bg-green-100 text-green-600' : 'border border-line-2 bg-white'}`}>
                    {ok[i] && <CheckCircle2 className="h-4 w-4" />} {ok[i] ? 'Approved' : 'Approve'}
                  </button>
                </div>
              ))}
              <div className="mt-2 flex flex-wrap gap-2.5">
                <button type="button" disabled={!approved} onClick={() => setToast(`${approved} question(s) added to the Form ${form} ${cur[1]} test.`)} className={btnPrimary}>
                  <ClipboardList className="h-4 w-4" aria-hidden="true" /> Add {approved} approved to test
                </button>
                <button type="button" disabled={!approved} onClick={() => setToast('Word export is part of the full build.')} className={btnGhost}>
                  <FileDown className="h-4 w-4" aria-hidden="true" /> Export to Word
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </StaffShell>
  );
}
