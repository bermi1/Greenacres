import { useState } from 'react';
import StaffShell, { Badge, btnGhost, btnGold, btnPrimary, card } from '../../components/StaffShell';
import { Field, Switch, Toast, inputCls } from '../../components/ui';
import { posts } from '../../content/site';
import { thumb } from '../../lib/media';
import { fmt, niceDate, SMS_RATE } from '../../lib/format';
import { db, useDb } from '../../data/db';

const AUD: [string, string, number][] = [['all', 'All parents', 1200], ['board', 'Boarding', 420], ['f4', 'Form Four', 150], ['bunazi', 'Bunazi', 310]];

export default function News() {
  const [sel, setSel] = useState(0);
  const [filter, setFilter] = useState('All');
  const status = useDb((t) => t.postStatus);
  const [sms, setSms] = useState(true);
  const [aud, setAud] = useState('all');
  const [toast, setToast] = useState('');
  const all = posts.map((p, i) => ({ ...p, i, status: status[p.slug] ?? 'Published' }));
  const shown = all.filter((p) => filter === 'All' || p.status === filter);
  const c = all[sel];
  const n = AUD.find((a) => a[0] === aud)![2];
  const tone = (s: string) => (s === 'Published' ? 'green' : s === 'Scheduled' ? 'blue' : 'gold') as 'green' | 'blue' | 'gold';
  const setSt = (st: 'Published' | 'Draft' | 'Scheduled', msg: string) => { db.setPostStatus(c.slug, st); setToast(msg); };
  const smsText = `Green Acres: ${c.title.slice(0, 80)}. Soma zaidi: greenacres.ac.tz/news`;

  return (
    <StaffShell
      kicker="WEBSITE · NEWS, EVENTS, RESULTS"
      title="News & events"
      actions={
        <div role="group" aria-label="Filter" className="flex flex-wrap gap-1.5">
          {['All', 'Published', 'Scheduled', 'Draft'].map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-[38px] rounded-full border px-3.5 text-[13px] font-semibold ${filter === f ? 'border-green-600 bg-green-600 text-white' : 'border-line-2 bg-white'}`}>{f}</button>
          ))}
        </div>
      }
    >
      {toast && <div className="mb-4"><Toast text={toast} /></div>}
      <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <section aria-label="Posts" className="flex max-h-[760px] flex-col gap-2 overflow-y-auto">
          {shown.map((p) => (
            <button key={p.slug} type="button" onClick={() => { setSel(p.i); setToast(''); }} aria-pressed={sel === p.i} className={`flex gap-3 rounded-xl bg-white p-2.5 text-left ${sel === p.i ? 'border-2 border-green-600' : 'border border-line'}`}>
              <span className="h-16 w-20 flex-none overflow-hidden rounded-lg bg-green-50">{p.cover && <img src={thumb(p.cover)} alt="" className="h-full w-full object-cover" loading="lazy" />}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap gap-1.5"><Badge tone="grey">{p.category}</Badge><Badge tone={tone(p.status)}>{p.status}</Badge></span>
                <span className="mt-1 line-clamp-2 block text-sm font-bold leading-snug">{p.title}</span>
                <span className="block text-xs text-ink-3">{niceDate(p.date)}</span>
              </span>
            </button>
          ))}
          <div className="text-xs text-ink-3">{posts.length} posts. Drafts and scheduled posts are hidden from the public website.</div>
        </section>

        <section className={`${card} flex flex-col gap-4 p-5`}>
          <div className="flex items-center justify-between"><div className="font-bold">Edit post</div><Badge tone={tone(c.status)}>{c.status}</Badge></div>
          <Field label="Title"><input key={c.slug} defaultValue={c.title} className={inputCls} /></Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Category"><select key={c.slug} defaultValue={c.category} className={inputCls}><option>News</option><option>Blog</option><option>Results</option><option>Event</option></select></Field>
            <Field label="Publish date"><input key={c.slug} type="date" defaultValue={c.date} className={inputCls} /></Field>
            <Field label="Language"><select className={inputCls}><option>English + Kiswahili</option><option>English</option><option>Kiswahili</option></select></Field>
          </div>
          {c.cover && (
            <div className="flex items-center gap-3 rounded-xl bg-paper p-2">
              <img src={thumb(c.cover)} alt="" className="h-14 w-20 rounded-lg object-cover" />
              <span className="text-sm text-ink-3">Cover photo · {c.images.length} photos in this post</span>
            </div>
          )}
          <Field label="Body"><textarea key={c.slug} rows={6} defaultValue={c.blocks.map((b) => b.text).join('\n\n')} className={inputCls} /></Field>

          <div className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <span><span className="block text-sm font-bold">Also send as SMS to parents</span><span className="block text-xs text-ink-3">A short summary with a link to the post</span></span>
              <Switch on={sms} onChange={() => setSms(!sms)} label="Send as SMS" />
            </div>
            {sms && (
              <div className="mt-3 flex flex-col gap-3 animate-pop">
                <div className="flex flex-wrap gap-2">
                  {AUD.map(([id, label, k]) => (
                    <button key={id} type="button" aria-pressed={aud === id} onClick={() => setAud(id)} className={`min-h-[36px] rounded-full border px-3 text-[13px] font-semibold ${aud === id ? 'border-green-600 bg-green-50 text-green-600' : 'border-line-2'}`}>{label} · {fmt(k)}</button>
                  ))}
                </div>
                <div className="rounded-xl rounded-bl-sm bg-[#F2F3F5] p-3 text-sm">{smsText}</div>
                <div className="flex justify-between text-sm"><span className="text-ink-3">{fmt(n)} parents × 1 SMS × TZS {SMS_RATE}</span><strong>TZS {fmt(n * SMS_RATE)}</strong></div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-2.5">
            <button type="button" className={btnGhost} onClick={() => setSt('Draft', 'Draft saved.')}>Save draft</button>
            <button type="button" className={btnGold} onClick={() => setSt('Scheduled', `Scheduled. It will go live on the chosen date${sms ? ', with the SMS.' : '.'}`)}>Schedule</button>
            <button type="button" className={btnPrimary} onClick={() => setSt('Published', `Published to the website${sms ? ` and SMS queued to ${fmt(n)} parents.` : '.'}`)}>Publish now</button>
          </div>
        </section>
      </div>
    </StaffShell>
  );
}
