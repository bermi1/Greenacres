import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Sparkles, Upload } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnGold, btnPrimary, card } from '../../components/StaffShell';
import { Toast } from '../../components/ui';
import { fmt, SMS_RATE } from '../../lib/format';

const TABS = [['campaigns', 'Campaigns'], ['groups', 'Contact groups'], ['templates', 'Templates'], ['sender', 'Sender ID'], ['credits', 'Credits'], ['replies', 'Replies inbox']] as const;
const CAMPAIGNS: [string, string, string, number, number][] = [['Mid-term results out', 'Kiswahili', 'All parents', 1200, 1176], ['Fee reminder, term 1', 'Kiswahili', 'Fees outstanding', 95, 93], ['Form One interview invite', 'Bilingual', '2027 applicants', 180, 178], ['Visiting day', 'Kiswahili', 'Boarding parents', 420, 411], ['Cultural Day', 'English', 'All parents', 1200, 1181]];
const GROUPS: [string, number, string, string][] = [['All parents', 1200, 'ForShule export', 'synced daily'], ['2027 applicants', 180, 'Admissions', 'live'], ['Boarding parents', 420, 'ForShule export', 'synced daily'], ['A-Level parents', 260, 'ForShule export', 'synced daily'], ['Bunazi campus', 310, 'ForShule export', 'synced daily'], ['Alumni', 0, 'Manual', 'CSV import']];
const TEMPLATES = [
  { name: 'Results released', sw: 'Green Acres: Matokeo ya {mtihani} yametolewa. Angalia Parent Hub.', en: 'Green Acres: {exam} results are out. Check the Parent Hub.' },
  { name: 'Fee reminder', sw: 'Green Acres: Kumbusho la ada ya {muhula}. Tumia namba yako ya malipo.', en: 'Green Acres: Reminder for {term} fees. Use your control number.' },
  { name: 'Interview invite', sw: 'Green Acres: Usaili wa {jina} ni {tarehe} saa {saa}. Jibu NDIYO kuthibitisha.', en: "Green Acres: {name}'s interview is on {date} at {time}. Reply YES to confirm." },
  { name: 'School closure', sw: 'Green Acres: Shule itafungwa {tarehe}. Wanafunzi wa bweni wachukuliwe saa {saa}.', en: 'Green Acres: School closes on {date}. Boarders to be collected at {time}.' },
];
const MONTHS: [string, number][] = [['Jun', 2400], ['Jul', 3100], ['Aug', 1800], ['Sep', 4200], ['Oct', 3600], ['Nov', 2900]];
const PACKS: [string, number][] = [['Starter', 500], ['Term pack', 2000], ['Year pack', 10000]];
const REPLIES = [
  { from: 'Parent · +255 7•• ••• 412', text: 'NDIYO, tutafika Jumamosi.', suggest: 'Asante! Tunakusubiri Jumamosi saa 3 asubuhi, Salasala.' },
  { from: 'Parent · +255 6•• ••• 088', text: 'Naomba namba ya malipo tena.', suggest: 'Namba yako ya malipo ipo kwenye Parent Hub, kichupo cha Ada. Tumeituma pia kwa SMS.' },
  { from: 'Parent · +255 7•• ••• 930', text: 'Siku ya kutembelea ni lini?', suggest: 'Siku ya kutembelea ni Jumapili hii, saa 4 asubuhi hadi saa 10 jioni.' },
];

export default function BulkSMS() {
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('campaigns');
  const [reply, setReply] = useState(0);
  const [toast, setToast] = useState('');
  const cur = REPLIES[reply];
  const max = Math.max(...MONTHS.map((m) => m[1]));

  return (
    <StaffShell kicker="POWERED BY BERMI CONNECT · SENDER ID GREENACRES" title="Bulk SMS" actions={<Link to="/office/messages" className={btnGold}>+ New campaign</Link>}>
      <div role="tablist" aria-label="Bulk SMS sections" className="no-scrollbar mb-4 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setToast(''); }} className={`min-h-[44px] flex-none border-b-2 px-3.5 text-sm font-semibold ${tab === id ? 'border-green-600 text-green-600' : 'border-transparent text-ink-3 hover:text-ink'}`}>{label}</button>
        ))}
      </div>
      {toast && <div className="mb-4"><Toast text={toast} /></div>}

      <div key={tab} className="animate-fadeUp">
        {tab === 'campaigns' && (
          <div className={`${card} overflow-x-auto`}>
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-line text-[11px] tracking-wider text-ink-3">{['CAMPAIGN', 'AUDIENCE', 'SENT', 'DELIVERED', 'FAILED', 'COST (TZS)'].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
              <tbody>
                {CAMPAIGNS.map(([name, lang, aud, sent, del]) => (
                  <tr key={name} className="border-b border-paper-2">
                    <td className="px-4 py-3"><div className="font-bold">{name}</div><div className="text-xs text-ink-3">{lang}</div></td>
                    <td className="px-4 py-3">{aud}</td>
                    <td className="px-4 py-3 tabular-nums">{fmt(sent)}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-20 rounded-full bg-paper-2"><div className="h-1.5 rounded-full bg-green-600" style={{ width: `${Math.round((del / sent) * 100)}%` }} /></div><span className="tabular-nums">{fmt(del)}</span></div></td>
                    <td className="px-4 py-3 tabular-nums">{fmt(sent - del)}</td>
                    <td className="px-4 py-3 tabular-nums">{fmt(sent * SMS_RATE)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 text-xs text-ink-3">Sample campaign history. Cost = SMS sent × TZS {SMS_RATE}.</div>
          </div>
        )}

        {tab === 'groups' && (
          <div className="flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GROUPS.map(([name, n, src, sync]) => (
                <div key={name} className={`${card} p-4`}>
                  <div className="flex items-center justify-between gap-2"><span className="font-bold">{name}</span><Badge tone={src === 'Manual' ? 'grey' : 'green'}>{src}</Badge></div>
                  <div className="mt-1 text-sm text-ink-3">{n ? fmt(n) : '[COUNT]'} contacts · {sync}</div>
                </div>
              ))}
            </div>
            <button type="button" className={btnGhost + ' self-start'} onClick={() => setToast('CSV checked: numbers formatted to +255, duplicates merged.')}><Upload className="h-4 w-4" />Import contacts from CSV or Excel</button>
            <div className="text-xs text-ink-3">Sample counts. Auto-synced groups update from Admissions and the ForShule export; duplicates are merged by phone number.</div>
          </div>
        )}

        {tab === 'templates' && (
          <div className="grid gap-3 md:grid-cols-2">
            {TEMPLATES.map((t) => (
              <div key={t.name} className={`${card} p-4`}>
                <div className="font-bold">{t.name}</div>
                <div className="mt-3 text-[11px] font-bold tracking-wider text-ink-3">KISWAHILI</div>
                <div className="mt-1 rounded-lg bg-paper p-2.5 text-sm">{t.sw}</div>
                <div className="mt-3 text-[11px] font-bold tracking-wider text-ink-3">ENGLISH</div>
                <div className="mt-1 rounded-lg bg-paper p-2.5 text-sm">{t.en}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'sender' && (
          <div className={`${card} max-w-2xl p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-100 text-green-600"><BadgeCheck className="h-6 w-6" /></span>
              <div><div className="font-display text-xl font-extrabold">GREENACRES</div><div className="text-sm text-ink-3">Sender ID · shown as approved in this concept</div></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[['Requested', '[DATE]'], ['Networks', 'All Tanzanian networks'], ['Use', 'School notices only']].map(([k, v]) => <div key={k} className="rounded-xl bg-paper p-3"><div className="text-xs text-ink-3">{k}</div><div className="text-sm font-bold">{v}</div></div>)}
            </div>
            <div className="mt-4 text-sm text-ink-3">Steps: school letter of authorisation, then Bermi Connect submits the request to the networks, then they approve. Approval time to be confirmed.</div>
          </div>
        )}

        {tab === 'credits' && (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-green-600 p-5 text-white">
              <div className="text-sm text-[#CFE6D5]">SMS credit balance</div>
              <div className="font-display text-3xl font-extrabold">[BALANCE]</div>
              <div className="mt-1 text-sm text-[#CFE6D5]">Rate: TZS {SMS_RATE} per SMS</div>
            </div>
            <div className={`${card} p-5 lg:col-span-2`}>
              <div className="text-sm font-bold">SMS sent per month · sample</div>
              <div className="mt-4 flex h-[150px] items-end gap-3">
                {MONTHS.map(([m, v]) => (
                  <div key={m} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[11px] tabular-nums text-ink-3">{fmt(v)}</span>
                    <div className={`w-full rounded-t-lg ${m === 'Nov' ? 'bg-gold-400' : 'bg-green-600'}`} style={{ height: `${Math.round((v / max) * 110)}px` }} />
                    <span className="text-xs text-ink-3">{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {PACKS.map(([name, n]) => (
              <div key={name} className={`${card} p-5`}>
                <div className="font-bold">{name}</div>
                <div className="mt-1 text-sm text-ink-3">{fmt(n)} SMS · TZS {fmt(n * SMS_RATE)}</div>
                <button type="button" className={btnPrimary + ' mt-3 w-full'} onClick={() => setToast(`${name}: payment prompt sent to your phone.`)}>Top up by mobile money</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'replies' && (
          <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
            <div className="flex flex-col gap-2">
              {REPLIES.map((r, i) => (
                <button key={r.from} type="button" aria-pressed={reply === i} onClick={() => setReply(i)} className={`flex flex-col gap-0.5 rounded-xl bg-white p-3 text-left ${reply === i ? 'border-2 border-green-600' : 'border border-line'}`}>
                  <span className="text-xs text-ink-3">{r.from}</span><span className="text-sm font-semibold">{r.text}</span>
                </button>
              ))}
            </div>
            <div className={`${card} flex flex-col gap-3 p-5`}>
              <div className="text-xs text-ink-3">{cur.from}</div>
              <div className="self-start rounded-2xl rounded-bl-md bg-[#F2F3F5] px-3.5 py-2.5 text-sm">{cur.text}</div>
              <div className="flex gap-2 rounded-xl bg-sky-50 p-3 text-sm text-sky-800"><Sparkles className="h-4 w-4 flex-none" />Suggested reply: {cur.suggest}</div>
              <button type="button" className={btnPrimary + ' self-start'} onClick={() => setToast('Reply sent from GREENACRES.')}>Send suggested reply</button>
              <div className="text-xs text-ink-3">Sample messages. Staff review every reply before it is sent.</div>
            </div>
          </div>
        )}
      </div>
    </StaffShell>
  );
}
