import { useState } from 'react';
import { CheckCircle2, Clock, FileSpreadsheet } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnPrimary, card } from '../../components/StaffShell';
import { Pill } from '../../components/ui';

const EXAMS: [string, string][] = [['mid', 'Mid-term test (internal)'], ['term', 'End of term (internal)'], ['necta', 'NECTA summary (public)']];
const TARGETS: [string, string, string][] = [['web', 'Website results page', 'Public summary only (divisions and pass rate), never individual names.'], ['hub', 'Parent Hub', "Each parent sees only their own child's results."], ['sms', 'SMS summary to parents', 'One SMS per parent with division and points. About TZS 18 each.']];
const ROWS = [['Sample Student 1', 'Form 4A', 'I', '9'], ['Sample Student 2', 'Form 4A', 'II', '18'], ['Sample Student 3', 'Form 4B', 'I', '12'], ['Sample Student 4', 'Form 4B', 'III', '23'], ['Sample Student 5', 'Form 4C', 'I', '11']];

export default function Results() {
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState('mid');
  const [targets, setTargets] = useState<Record<string, boolean>>({ web: false, hub: true, sms: true });
  const [approved, setApproved] = useState(false);
  const [file, setFile] = useState('');
  const examLabel = EXAMS.find((e) => e[0] === exam)![1];
  const list = TARGETS.filter((t) => targets[t[0]]).map((t) => t[1]).join(', ') || 'nothing selected';

  return (
    <StaffShell kicker="ACADEMICS · RESULTS PUBLISHING" title="Publish results">
      <ol className="m-0 mb-5 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
        {['Upload', 'Preview', 'Publish to', 'Approval'].map((l, i) => (
          <li key={l} aria-current={step === i ? 'step' : undefined} className={`rounded-xl px-4 py-3 ${step === i ? 'bg-green-600 text-white' : step > i ? 'bg-green-100 text-green-600' : 'bg-white text-ink-3'}`}>
            <div className="text-[11px] font-bold tracking-wider opacity-80">STEP {i + 1}</div>
            <div className="font-bold">{l}</div>
          </li>
        ))}
      </ol>
      <div key={step} className={`${card} p-5 animate-fadeUp`}>
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">{EXAMS.map(([id, l]) => <Pill key={id} on={exam === id} onClick={() => setExam(id)}>{l}</Pill>)}</div>
            <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-line-2 px-4 py-10 text-center hover:border-green-600">
              <FileSpreadsheet className="h-9 w-9 text-green-600" aria-hidden="true" />
              <span className="font-bold">Upload results file (CSV or Excel)</span>
              <span className="text-sm text-ink-3">Or use the export from ForShule. Columns are matched automatically. In this demo the file is not read.</span>
              <input type="file" accept=".csv,.xlsx,.xls" className="sr-only" onChange={(e) => { if (e.target.files?.[0]) { setFile(e.target.files[0].name); setStep(1); } }} />
            </label>
            <button type="button" className={btnGhost + ' self-start'} onClick={() => { setFile(`results_${exam}.xlsx`); setStep(1); }}>Use the sample file</button>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-bold">{file} · 5 rows shown</div><Badge tone="green">All columns matched</Badge></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-line text-[11px] tracking-wider text-ink-3">{['STUDENT', 'CLASS', 'DIVISION', 'POINTS', 'PARENT PHONE'].map((h) => <th key={h} className="py-2.5 pr-3 font-bold">{h}</th>)}</tr></thead>
                <tbody>{ROWS.map((r) => <tr key={r[0]} className="border-b border-paper-2">{r.map((c, k) => <td key={k} className="py-2.5 pr-3">{c}</td>)}<td className="py-2.5">+255 7•• ••• •••</td></tr>)}</tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-ink-3">Sample rows.</div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <div className="font-bold">Where should these results go?</div>
            {TARGETS.map(([id, l, d]) => (
              <label key={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4">
                <input type="checkbox" checked={!!targets[id]} onChange={() => setTargets({ ...targets, [id]: !targets[id] })} className="mt-0.5 h-5 w-5 accent-green-600" />
                <span><span className="block font-bold">{l}</span><span className="block text-sm text-ink-3">{d}</span></span>
              </label>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-full ${approved ? 'bg-green-600 text-white' : 'bg-gold-50 text-gold-700'}`}>{approved ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}</span>
              <div>
                <div className="font-display text-lg font-extrabold">{approved ? 'Approved and published' : 'Waiting for Head of Academics'}</div>
                <div className="text-sm text-ink-3">{approved ? 'Results are live on the selected channels. SMS delivery report is in Bulk SMS.' : 'Nothing goes out until a second person approves.'}</div>
              </div>
            </div>
            <div className="rounded-xl bg-paper p-4 text-sm">Exam: <strong>{examLabel}</strong><br />Publishing to: <strong>{list}</strong></div>
            {!approved && <button type="button" className={btnPrimary + ' self-start'} onClick={() => setApproved(true)}>Approve as Head of Academics</button>}
          </div>
        )}
        <div className="mt-6 flex justify-between border-t border-line pt-4">
          <button type="button" className={btnGhost + (step === 0 ? ' invisible' : '')} onClick={() => { setStep(step - 1); setApproved(false); }}>Back</button>
          {step > 0 && step < 3 && <button type="button" className={btnPrimary} onClick={() => setStep(step + 1)}>{step === 2 ? 'Send for approval' : 'Continue'}</button>}
        </div>
      </div>
    </StaffShell>
  );
}
