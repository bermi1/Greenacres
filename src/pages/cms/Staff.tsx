import { useState } from 'react';
import { X } from 'lucide-react';
import StaffShell, { Badge, btnPrimary, card } from '../../components/StaffShell';
import { Field, Pill, Switch, Toast, inputCls } from '../../components/ui';
import { thumb } from '../../lib/media';

const PEOPLE: [string, string, string, string, string, string, string?][] = [
  ['Jacklyne Siima Rushaigo', 'Managing Director', 'Administration', 'Salasala', 'Admin', 'From current website', 'jacklyne-siima-rushaigo'],
  ['Dr Juliani Rushaigo Bujugo', 'Co-Founder', 'Administration', 'Salasala', 'Head of School', 'From current website', 'there-was-a-time-when-the-late-father-mr'],
  ['Ms Aneth', 'School nurse', 'Health', 'Salasala', 'Teacher', 'From school video'],
  ['Sample: Teacher A', 'Head of Academics', 'Academics', 'Salasala', 'Head of School', 'Sample'],
  ['Sample: Teacher B', 'Physics teacher', 'Academics', 'Salasala', 'Teacher', 'Sample'],
  ['Sample: Officer C', 'Admissions officer', 'Administration', 'Salasala', 'Admissions officer', 'Sample'],
  ['Sample: Matron D', 'Boarding matron', 'Boarding', 'Salasala', 'Teacher', 'Sample'],
  ['Sample: Teacher E', 'Head teacher, primary', 'Academics', 'Bunazi', 'Head of School', 'Sample'],
];

export default function Staff() {
  const [dept, setDept] = useState('All');
  const [campus, setCampus] = useState('All');
  const [web, setWeb] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState('');
  const rows = PEOPLE.map((p, i) => ({ p, i })).filter(({ p }) => (dept === 'All' || p[2] === dept) && (campus === 'All' || p[3] === campus));
  const leaders = PEOPLE.map((p, i) => ({ p, i })).filter(({ i }) => web[i]);

  return (
    <StaffShell kicker="PEOPLE · SALASALA & BUNAZI" title="Staff" actions={<button type="button" className={btnPrimary} onClick={() => setDrawer(true)}>+ Add staff member</button>}>
      {toast && <div className="mb-4"><Toast text={toast} /></div>}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-ink-3">Department</span>
        {['All', 'Academics', 'Administration', 'Boarding', 'Health'].map((d) => <Pill key={d} on={dept === d} onClick={() => setDept(d)}>{d}</Pill>)}
        <span className="ml-2 text-sm font-semibold text-ink-3">Campus</span>
        {['All', 'Salasala', 'Bunazi'].map((d) => <Pill key={d} on={campus === d} onClick={() => setCampus(d)}>{d}</Pill>)}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <section className={`${card} overflow-x-auto`}>
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-line text-[11px] tracking-wider text-ink-3">{['NAME', 'ROLE', 'DEPARTMENT', 'CAMPUS', 'PORTAL ROLE', 'ON WEBSITE'].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(({ p, i }) => (
                <tr key={p[0]} className="border-b border-paper-2">
                  <td className="px-4 py-3"><div className="font-bold">{p[0]}</div><div className="text-xs text-ink-3">{p[5]}</div></td>
                  <td className="px-4 py-3">{p[1]}</td>
                  <td className="px-4 py-3">{p[2]}</td>
                  <td className="px-4 py-3">{p[3]}</td>
                  <td className="px-4 py-3"><Badge tone="blue">{p[4]}</Badge></td>
                  <td className="px-4 py-3"><Switch on={!!web[i]} onChange={() => setWeb({ ...web, [i]: !web[i] })} label={`Show ${p[0]} on website`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs text-ink-3">Leadership names come from the current website. Rows marked Sample are placeholders.</div>
        </section>

        {drawer ? (
          <aside aria-label="Add staff" className={`${card} flex flex-col gap-3 p-5 animate-pop`}>
            <div className="flex items-center justify-between"><div className="font-bold">New staff member</div><button type="button" aria-label="Close" onClick={() => setDrawer(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-paper"><X className="h-5 w-5" /></button></div>
            <Field label="Full name"><input className={inputCls} /></Field>
            <Field label="Role / title"><input className={inputCls} placeholder="e.g. Physics teacher" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Department"><select className={inputCls}><option>Academics</option><option>Administration</option><option>Boarding</option><option>Health</option></select></Field>
              <Field label="Campus"><select className={inputCls}><option>Salasala</option><option>Bunazi</option></select></Field>
            </div>
            <Field label="Phone"><input type="tel" className={inputCls} placeholder="+255" /></Field>
            <Field label="Work email"><input type="email" className={inputCls} placeholder="name@greenacres.ac.tz" /></Field>
            <Field label="Portal access role"><select className={inputCls}><option>Teacher</option><option>Admissions officer</option><option>Communications</option><option>Accountant</option><option>Head of School</option><option>Admin</option></select></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-green-600" />Show on website (About page)</label>
            <button type="button" className={btnPrimary} onClick={() => { setDrawer(false); setToast('Staff member saved. Login details sent by SMS.'); }}>Save and send login by SMS</button>
          </aside>
        ) : (
          <aside aria-label="Website preview" className={`${card} p-5`}>
            <div className="text-xs font-bold tracking-wider text-ink-3">PREVIEW · ABOUT PAGE · LEADERSHIP</div>
            <div className="mt-3 flex flex-col gap-2.5">
              {leaders.map(({ p }) => (
                <div key={p[0]} className="flex items-center gap-3 rounded-xl bg-paper p-2.5 animate-pop">
                  {p[6] ? <img src={thumb(p[6])} alt="" className="h-11 w-11 rounded-full object-cover" /> : <span className="grid h-11 w-11 place-items-center rounded-full bg-green-100 text-sm font-bold text-green-600">{p[0].replace(/^(Dr|Ms|Sample:) /, '').split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>}
                  <div><div className="text-sm font-bold">{p[0]}</div><div className="text-xs text-ink-3">{p[1]}</div></div>
                </div>
              ))}
              {!leaders.length && <div className="text-sm text-ink-3">No one is shown on the website.</div>}
            </div>
            <div className="mt-3 text-xs text-ink-3">Updates the website when you flip “On website”.</div>
          </aside>
        )}
      </div>
    </StaffShell>
  );
}
