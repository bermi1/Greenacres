import { useState } from 'react';
import { Download, Mail, MessageCircle, Phone } from 'lucide-react';
import StaffShell, { Badge, btnGhost, card } from '../../components/StaffShell';
import { db, useDb } from '../../data/db';

const when = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
}
function download(name: string, rows: Record<string, unknown>[]) {
  const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Inbox() {
  const messages = useDb((t) => t.messages);
  const subscribers = useDb((t) => t.subscribers);
  const alumni = useDb((t) => t.alumni);
  const [tab, setTab] = useState<'messages' | 'subscribers' | 'alumni'>('messages');
  const [sel, setSel] = useState<string | null>(null);
  const m = messages.find((x) => x.id === sel) ?? messages[0];
  const unread = messages.filter((x) => !x.read).length;
  const tabs = [['messages', `Messages${unread ? ` (${unread})` : ''}`], ['subscribers', `Subscribers (${subscribers.length})`], ['alumni', `Alumni sign-ups (${alumni.length})`]] as const;

  return (
    <StaffShell
      kicker="FROM THE WEBSITE"
      title="Inbox"
      actions={
        <button type="button" className={btnGhost} onClick={() => download(`${tab}.csv`, (tab === 'messages' ? messages : tab === 'subscribers' ? subscribers : alumni) as unknown as Record<string, unknown>[])}>
          <Download className="h-4 w-4" /> Export CSV
        </button>
      }
    >
      <div role="tablist" className="no-scrollbar mb-4 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`min-h-[44px] flex-none border-b-2 px-3.5 text-sm font-semibold ${tab === id ? 'border-green-600 text-green-700' : 'border-transparent text-ink-3'}`}>{label}</button>
        ))}
      </div>

      {tab === 'messages' &&
        (messages.length === 0 ? (
          <Empty text="No messages yet. Messages sent from the Contact page land here." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
            <div className="flex flex-col gap-2">
              {messages.map((x) => (
                <button key={x.id} type="button" onClick={() => { setSel(x.id); db.markRead(x.id); }} className={`rounded-2xl bg-white p-4 text-left ${m?.id === x.id ? 'ring-2 ring-green-600' : 'border border-line'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold">{x.name}</span>
                    {!x.read && <span className="h-2.5 w-2.5 rounded-full bg-gold-400" aria-label="Unread" />}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-3">{x.topic} · {x.campus} · {when(x.createdAt)}</div>
                  <div className="mt-1 line-clamp-1 text-sm text-ink-2">{x.body}</div>
                </button>
              ))}
            </div>
            {m && (
              <div className={`${card} p-6`}>
                <div className="flex flex-wrap items-center gap-2"><Badge tone="green">{m.topic}</Badge><Badge tone="grey">{m.campus}</Badge><span className="text-xs text-ink-3">{when(m.createdAt)}</span></div>
                <h2 className="mb-1 mt-3 font-display text-2xl">{m.name}</h2>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-2">{m.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.phone && <a href={`https://wa.me/${m.phone.replace(/\D/g, '').replace(/^0/, '255')}`} target="_blank" rel="noreferrer" className={btnGhost}><MessageCircle className="h-4 w-4" />WhatsApp</a>}
                  {m.phone && <a href={`tel:${m.phone.replace(/\s/g, '')}`} className={btnGhost}><Phone className="h-4 w-4" />{m.phone}</a>}
                  {m.email && <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.topic)}`} className={btnGhost}><Mail className="h-4 w-4" />Reply by email</a>}
                </div>
              </div>
            )}
          </div>
        ))}

      {tab === 'subscribers' && (subscribers.length === 0 ? <Empty text="No subscribers yet. Sign-ups from the footer and News page land here." /> : (
        <Table head={['Phone or email', 'Joined']} rows={subscribers.map((s) => [s.contact, when(s.createdAt)])} />
      ))}
      {tab === 'alumni' && (alumni.length === 0 ? <Empty text="No alumni sign-ups yet. Registrations from the Alumni page land here." /> : (
        <Table head={['Name', 'Year', 'Level', 'Profession', 'Phone', 'Email']} rows={alumni.map((a) => [a.name, a.year, a.level, a.work, a.phone, a.email])} />
      ))}
    </StaffShell>
  );
}

function Empty({ text }: { text: string }) {
  return <div className={`${card} grid min-h-[220px] place-items-center p-8 text-center text-ink-3`}>{text}</div>;
}
function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className={`${card} overflow-x-auto`}>
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead><tr className="border-b border-line text-[11px] tracking-wider text-ink-3">{head.map((h) => <th key={h} className="px-4 py-3 font-bold">{h.toUpperCase()}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-b border-paper-2">{r.map((c, k) => <td key={k} className="px-4 py-3">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
