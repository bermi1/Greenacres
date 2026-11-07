import { useState } from 'react';
import { db, STAGES, useDb, type Application, type Stage } from '../../data/db';
import { Sparkles } from 'lucide-react';
import StaffShell, { btnGhost, btnPrimary, card } from '../../components/StaffShell';
import { Toast } from '../../components/ui';

const COLORS = ['text-ink-3', 'text-sky-600', 'text-gold-700', 'text-green-600', 'text-green-800'];
type App = { id: string; ref: string; name: string; level: string; mode: string; stage: Stage; docs: number; phone: string; isNew: boolean };
const toView = (a: Application): App => ({ id: a.id, ref: a.ref, name: a.student.name || 'Unnamed', level: a.level, mode: a.mode, stage: a.stage, docs: [a.docs.birth, a.docs.report, a.docs.photo].filter(Boolean).length, phone: a.parent.phone, isNew: !a.sample });

const smsFor = (a: App) => {
  const f = a.name.split(' ')[0];
  return [
    `Green Acres: Habari, tumepokea maombi ya ${f}. Usaili ni Jumamosi saa 3 asubuhi, Salasala. Jibu NDIYO kuthibitisha.`,
    `Green Acres: Hongera! ${f} amepewa nafasi ${a.level} 2027. Barua ya nafasi na maelekezo ya malipo yametumwa.`,
    'Green Acres: Tafadhali lipa ada ya kujiunga kupitia namba ya malipo uliyotumiwa ili kuhakikisha nafasi.',
    'Green Acres: Malipo yamepokelewa. Karibu Green Acres! Maelekezo ya kujiunga yako kwenye Parent Hub.',
    `Green Acres: ${f} amesajiliwa. Taarifa zake zimehamishiwa kwenye mfumo wa shule.`,
  ][a.stage];
};
const aiFor = (a: App) =>
  a.docs < 3
    ? `${3 - a.docs} document(s) missing. Suggest an SMS reminder with an upload link before the interview.`
    : a.stage === 1
      ? 'Documents complete. Previous report shows strong science results; consider the PCB interview panel.'
      : a.stage >= 3
        ? 'Ready to sync to ForShule. No duplicate record found.'
        : 'Documents complete and readable. No issues found.';

export default function Pipeline() {
  const raw = useDb((t) => t.applications);
  const apps = raw.map(toView);
  const [sel, setSel] = useState(apps[0]?.id ?? '');
  const [toast, setToast] = useState('');
  const a = apps.find((x) => x.id === sel) ?? apps[0];
  const done = a.stage >= 4;
  const initials = a.name.split(' ').filter((_, i, arr) => i === 0 || i === arr.length - 1).map((w) => w[0]).join('');

  const advance = () => {
    if (done) return;
    db.moveApplication(a.id, (a.stage + 1) as Stage);
    setToast(`Moved ${a.name} to ${STAGES[a.stage + 1]}. SMS sent from GREENACRES.`);
  };

  return (
    <StaffShell
      kicker="2027 INTAKE · SALASALA & BUNAZI"
      title="Admissions pipeline"
      actions={
        <>
          <button type="button" className={btnGhost} onClick={() => setToast(`Reminder SMS sent to ${apps.filter((x) => x.docs < 3).length} parent(s) with a secure upload link.`)}>SMS: remind missing documents</button>
          <button type="button" className={btnPrimary} onClick={() => setToast(`${apps.filter((x) => x.stage >= 3).length} student record(s) exported to ForShule. No double entry needed.`)}>Export enrolled to ForShule</button>
        </>
      }
    >
      <Toast text={toast} />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STAGES.map((s, i) => (
          <div key={s} className={`${card} px-4 py-3`}>
            <div className="text-[13px] text-ink-3">{s}</div>
            <div className={`font-display text-2xl font-extrabold ${COLORS[i]}`}>{apps.filter((x) => x.stage === i).length}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 overflow-x-auto pb-2">
          <div className="grid min-w-[780px] grid-cols-5 gap-3">
            {STAGES.map((s, i) => {
              const items = apps.filter((x) => x.stage === i);
              return (
                <div key={s} className="flex min-h-[360px] flex-col gap-2 rounded-2xl bg-[#E9EEEA] p-2.5">
                  <div className="flex items-center justify-between px-1.5 py-1">
                    <span className="text-sm font-bold">{s}</span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold">{items.length}</span>
                  </div>
                  {items.map((x) => (
                    <button key={x.id} type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className={`flex flex-col gap-1.5 rounded-xl bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md animate-pop ${sel === x.id ? 'border-2 border-green-600' : 'border border-line'}`}>
                      <span className="flex items-center gap-1.5 text-sm font-bold">{x.name}{x.isNew && <span className="rounded-full bg-gold-400 px-1.5 text-[10px] font-bold text-ink">NEW</span>}</span>
                      <span className="text-xs text-ink-3">{x.level} · {x.mode}</span>
                      <span className={`self-start rounded-full px-2 py-0.5 text-[11px] font-bold ${x.docs < 3 ? 'bg-[#FFF1D6] text-[#8A4B00]' : 'bg-green-100 text-green-600'}`}>{x.docs < 3 ? `${3 - x.docs} doc missing` : 'Docs complete'}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <aside className={`${card} flex flex-col gap-3.5 p-5 xl:w-[340px] xl:flex-none`}>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 font-display font-extrabold text-green-600">{initials}</div>
            <div>
              <div className="font-display text-lg font-extrabold">{a.name}</div>
              <div className="text-[13px] text-ink-3">{a.ref} · {a.level} · {a.mode}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-[13px]">
            {[['Stage', STAGES[a.stage]], ['Parent phone', a.phone], ['Documents', `${a.docs} of 3`], ['Fee', a.stage >= 3 ? 'Paid' : 'Pending']].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-paper p-2.5"><div className="text-ink-3">{k}</div><div className="font-bold">{v}</div></div>
            ))}
          </div>
          <div className="flex gap-2.5 rounded-xl bg-sky-50 p-3 text-[13px] leading-relaxed text-sky-800">
            <Sparkles className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
            <span><strong>AI summary:</strong> {aiFor(a)}</span>
          </div>
          <div className="text-[13px] text-ink-3">Next SMS to parent</div>
          <div className="rounded-2xl rounded-bl-md bg-[#F2F3F5] p-3 text-[13px] leading-relaxed">{smsFor(a)}</div>
          <button type="button" onClick={advance} disabled={done} className={done ? 'min-h-[48px] rounded-xl bg-green-100 text-sm font-bold text-green-600' : btnGold + ' min-h-[48px]'}>
            {done ? 'Enrolled · synced to ForShule' : `Move to ${STAGES[a.stage + 1]} and send SMS`}
          </button>
          <div className="text-xs text-ink-3">Moving a stage sends the SMS above. Staff can edit it first. Applications from the website appear here marked NEW.</div>
        </aside>
      </div>
    </StaffShell>
  );
}

const btnGold = 'inline-flex items-center justify-center rounded-xl bg-gold-400 px-4 text-sm font-bold text-ink';
