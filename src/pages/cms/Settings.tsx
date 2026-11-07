import { useState } from 'react';
import StaffShell, { Badge, btnPrimary, card } from '../../components/StaffShell';
import { Field, Switch, Toast, inputCls } from '../../components/ui';
import { db, useDb } from '../../data/db';

const TABS = [['roles', 'Users & roles'], ['profile', 'School profile'], ['integrations', 'Integrations'], ['privacy', 'Data protection']] as const;
const PERMS = ['Website', 'News', 'Admissions', 'Bulk SMS', 'Results', 'Staff', 'Settings'];
const ROLES = ['Admin', 'Head of School', 'Admissions officer', 'Teacher', 'Accountant', 'Communications'];
const DEF = [[1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0, 0]];
const INTEG: [string, string, string][] = [['forshule', 'ForShule export', 'Send enrolled students to ForShule and pull parent groups for SMS. Fees, payroll and NECTA CA stay in ForShule.'], ['momo', 'Mobile money', 'Application fees and SMS top-ups by M-Pesa, Airtel Money and Mixx by Yas.'], ['sms', 'Bermi Connect SMS', 'Sender ID GREENACRES, delivery reports and parent replies.'], ['ga', 'Google Analytics', 'Visits, admissions page conversions and top pages.']];

export default function Settings() {
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('roles');
  const savedRoles = useDb((t) => t.roles);
  const audit = useDb((t) => t.audit);
  const [grid, setGrid] = useState(savedRoles ?? DEF);
  const [integ, setInteg] = useState<Record<string, boolean>>({ forshule: true, momo: true, sms: true, ga: true });
  const [toast, setToast] = useState('');

  return (
    <StaffShell kicker="ADMIN ONLY" title="Settings">
      <div role="tablist" aria-label="Settings sections" className="no-scrollbar mb-4 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map(([id, l]) => <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setToast(''); }} className={`min-h-[44px] flex-none border-b-2 px-3.5 text-sm font-semibold ${tab === id ? 'border-green-600 text-green-600' : 'border-transparent text-ink-3'}`}>{l}</button>)}
      </div>
      {toast && <div className="mb-4"><Toast text={toast} /></div>}
      <div key={tab} className="animate-fadeUp">
        {tab === 'roles' && (
          <div className={`${card} overflow-x-auto`}>
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-line text-[11px] tracking-wider text-ink-3"><th className="px-4 py-3 font-bold">ROLE</th>{PERMS.map((p) => <th key={p} className="px-3 py-3 font-bold">{p.toUpperCase()}</th>)}</tr></thead>
              <tbody>
                {ROLES.map((r, ri) => (
                  <tr key={r} className="border-b border-paper-2">
                    <td className="px-4 py-3 font-bold">{r}</td>
                    {PERMS.map((p, ci) => (
                      <td key={p} className="px-3 py-3"><Switch on={!!grid[ri][ci]} label={`${r} can manage ${p}`} onChange={() => setGrid(grid.map((row, i) => (i === ri ? row.map((v, j) => (j === ci ? (v ? 0 : 1) : v)) : row)))} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"><span className="text-xs text-ink-3">Every change is written to the audit log.</span><button type="button" className={btnPrimary} onClick={() => { db.saveRoles(grid); setToast('Permissions saved and logged.'); }}>Save permissions</button></div>
          </div>
        )}
        {tab === 'profile' && (
          <div className={`${card} grid gap-4 p-5 sm:grid-cols-2`}>
            {[['School name', 'Green Acres Schools Tanzania'], ['Founded', '2000'], ['Main campus', 'Mbezi Beach, Salasala, Dar es Salaam'], ['Second campus', 'Bunazi, Missenyi District, Kagera'], ['Dar es Salaam phones', '+255 782 128 633 · +255 747 128 633'], ['Bunazi phone', '+255 687 392 000'], ['Main line / WhatsApp', '+255 739 222 237'], ['Email', 'info@greenacres.ac.tz · bunazi@greenacres.ac.tz'], ['Office hours', 'Mon to Sat, 8:30 AM to 5:00 PM'], ['Levels', 'Nursery, Primary, O-Level, A-Level']].map(([k, v]) => (
              <Field key={k} label={k}><input readOnly value={v} className={inputCls + ' bg-paper'} /></Field>
            ))}
          </div>
        )}
        {tab === 'integrations' && (
          <div className="grid gap-3 md:grid-cols-2">
            {INTEG.map(([id, name, desc]) => {
              const on = !!integ[id];
              return (
                <div key={id} className={`${card} p-5`}>
                  <div className="flex items-center justify-between gap-3"><span className="font-bold">{name}</span><Switch on={on} label={name} onChange={() => { setInteg({ ...integ, [id]: !on }); setToast(name + (on ? ' turned off.' : ' connected.')); }} /></div>
                  <p className="mb-3 mt-1.5 text-sm text-ink-3">{desc}</p>
                  <Badge tone={on ? 'green' : 'grey'}>{on ? 'Connected' : 'Off'}</Badge>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'privacy' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <section className={`${card} flex flex-col gap-3 p-5`}>
              <div className="font-bold">Personal Data Protection Act</div>
              <Field label="PDPC registration status"><select className={inputCls}><option>[TO CONFIRM]</option><option>Registered</option><option>Application submitted</option><option>Not registered</option></select></Field>
              <Field label="Certificate number"><input className={inputCls} placeholder="[CERTIFICATE NO.]" /></Field>
              <Field label="Data Protection Officer"><input className={inputCls} placeholder="[NAME]" /></Field>
              <Field label="Keep unsuccessful applications for"><select className={inputCls}><option>12 months, then delete</option><option>6 months</option><option>24 months</option></select></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 accent-green-600" />Ask for parent consent on every form</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 accent-green-600" />Never send student data to AI tools</label>
              <button type="button" className={btnPrimary + ' self-start'} onClick={() => setToast('Data protection settings saved.')}>Save</button>
            </section>
            <section className="flex flex-col gap-4">
              <div className={`${card} p-5`}>
                <div className="mb-2 font-bold">Consent log</div>
                {[['Parent of GA-27-0148', 'Admission form · SMS'], ['Parent of GA-27-0141', 'Admission form · email'], ['Parent of GA-27-0142', 'Withdrew SMS consent']].map(([w, x]) => <div key={w} className="flex justify-between border-b border-paper-2 py-2 text-sm"><span>{w}</span><span className="text-ink-3">{x}</span></div>)}
              </div>
              <div className={`${card} p-5`}>
                <div className="mb-2 font-bold">Audit log</div>
                {(audit.length ? audit.slice(0, 8).map((a) => [a.who, a.what, new Date(a.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })]) : [['', 'Nothing logged yet.', '']]).map(([w, x, t]) => <div key={x} className="flex gap-3 border-b border-paper-2 py-2 text-sm"><span className="font-bold">{w}</span><span className="flex-1">{x}</span><span className="text-ink-3">{t}</span></div>)}
                <button type="button" className="mt-3 text-xs font-semibold text-clay-500" onClick={() => { if (confirm('Clear all saved data in this browser and restore the starting sample data?')) db.reset(); }}>Reset data in this browser</button>
              </div>
            </section>
          </div>
        )}
      </div>
    </StaffShell>
  );
}
