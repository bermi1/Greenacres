import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import StaffShell, { card } from '../../components/StaffShell';
import { Toast } from '../../components/ui';
import { fmt, smsParts, SMS_RATE } from '../../lib/format';

const AUD: [string, string, number][] = [['all', 'All parents', 1200], ['f1', 'Form One 2027 applicants', 180], ['board', 'Boarding parents', 420], ['alevel', 'A-Level parents', 260], ['bunazi', 'Bunazi campus', 310], ['unpaid', 'Fees outstanding', 95]];
const TPL: Record<string, { label: string; sw: string; en: string }> = {
  results: { label: 'Results out', sw: 'Green Acres: Matokeo ya katikati ya muhula yametolewa. Angalia Parent Hub au jibu MATOKEO kupata muhtasari kwa SMS.', en: 'Green Acres: Mid-term results are out. Open the Parent Hub or reply RESULTS for an SMS summary.' },
  fees: { label: 'Fee reminder', sw: 'Green Acres: Kumbusho la ada ya muhula. Tumia namba yako ya malipo. Risiti itatumwa kwa SMS. Maswali: +255 739 222 237.', en: "Green Acres: Reminder to complete this term's fees using your control number. Receipt follows by SMS. Questions: +255 739 222 237." },
  visit: { label: 'Visiting day', sw: 'Green Acres: Siku ya kutembelea wanafunzi wa bweni ni Jumapili hii, saa 4 asubuhi hadi saa 10 jioni. Karibuni.', en: 'Green Acres: Boarding visiting day is this Sunday, 10:00 to 16:00. You are welcome.' },
  interview: { label: 'Interview invite', sw: 'Green Acres: Usaili wa Kidato cha Kwanza 2027 ni Jumamosi saa 3 asubuhi, Salasala. Njoo na ripoti ya mwisho. Jibu NDIYO kuthibitisha.', en: 'Green Acres: Form One 2027 interviews are on Saturday at 09:00, Salasala. Bring the latest report. Reply YES to confirm.' },
};
const SHORT = { sw: 'Green Acres: Matokeo yametolewa. Angalia Parent Hub.', en: 'Green Acres: Results are out. Check the Parent Hub.' };

export default function Messaging() {
  const [aud, setAud] = useState('f1');
  const [lang, setLang] = useState<'sw' | 'en'>('sw');
  const [tpl, setTpl] = useState('results');
  const [custom, setCustom] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const msg = custom ?? TPL[tpl][lang];
  const n = AUD.find((a) => a[0] === aud)![2];
  const parts = smsParts(msg.length);
  const total = n * parts;
  const nonAscii = /[^\x20-\x7E\n]/.test(msg);

  const tog = (on: boolean) => `min-h-[36px] rounded-full px-3.5 text-[13px] font-semibold ${on ? 'bg-green-600 text-white' : 'text-ink-2'}`;

  return (
    <StaffShell kicker="SENDER ID · GREENACRES · POWERED BY BERMI CONNECT" title="Send a notice to parents">
      {sent && <div className="mb-4"><Toast text={`Sent to ${fmt(n)} parents from GREENACRES. Delivery report is updating live.`} /></div>}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section className={`${card} p-5`}>
            <div className="mb-3 font-bold">1. Who receives it</div>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {AUD.map(([id, label, c]) => (
                <button key={id} type="button" aria-pressed={aud === id} onClick={() => { setAud(id); setSent(false); }} className={`flex flex-col items-start gap-0.5 rounded-xl px-3.5 py-3 text-left ${aud === id ? 'border-2 border-green-600 bg-green-50' : 'border border-line-2 bg-white'}`}>
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-xs text-ink-3">{fmt(c)} parents</span>
                </button>
              ))}
            </div>
          </section>

          <section className={`${card} p-5`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="font-bold">2. Message</div>
              <div role="group" aria-label="Language" className="flex gap-1 rounded-full bg-paper-2 p-1">
                <button type="button" onClick={() => { setLang('sw'); setCustom(null); }} className={tog(lang === 'sw')}>Kiswahili</button>
                <button type="button" onClick={() => { setLang('en'); setCustom(null); }} className={tog(lang === 'en')}>English</button>
              </div>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {Object.entries(TPL).map(([id, t]) => (
                <button key={id} type="button" onClick={() => { setTpl(id); setCustom(null); setSent(false); }} className={`min-h-[38px] rounded-full border px-3.5 text-[13px] font-semibold ${tpl === id && custom === null ? 'border-green-600 bg-green-600 text-white' : 'border-line-2 bg-white'}`}>{t.label}</button>
              ))}
              <button type="button" onClick={() => setCustom(tpl === 'results' ? SHORT[lang] : msg.split('.').slice(0, 2).join('.') + '.')} className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#C9D9F2] bg-sky-50 px-3.5 text-[13px] font-bold text-sky-800">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> AI: rewrite shorter
              </button>
            </div>
            <label htmlFor="msg" className="mb-1.5 block text-[13px] text-ink-3">Text</label>
            <textarea id="msg" rows={5} value={msg} onChange={(e) => { setCustom(e.target.value); setSent(false); }} className="w-full resize-y rounded-xl border border-line-2 p-3.5 text-[15px] leading-relaxed outline-none focus:border-green-600" />
            <div className="mt-2 flex flex-wrap justify-between gap-2 text-[13px] text-ink-3">
              <span>{msg.length} characters · {parts} SMS part(s) per parent</span>
              {nonAscii && <span className="font-semibold text-gold-700">Contains special characters (e.g. curly quotes). Use plain letters to avoid extra cost.</span>}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-4 xl:w-[340px] xl:flex-none">
          <div className="mx-auto w-full max-w-[320px] rounded-[34px] bg-ink p-3">
            <div className="flex min-h-[240px] flex-col gap-2 rounded-3xl bg-[#F2F3F5] px-3 py-4">
              <div className="text-center text-xs font-semibold text-ink-3">GREENACRES</div>
              <div key={msg} className="whitespace-pre-wrap rounded-2xl rounded-bl-md bg-white p-3 text-sm leading-relaxed shadow-sm animate-pop">{msg}</div>
            </div>
          </div>
          <div className={`${card} flex flex-col gap-2.5 p-5`}>
            {[['Recipients', fmt(n)], ['SMS parts', fmt(total)], ['Rate', `TZS ${SMS_RATE} / SMS`]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm"><span className="text-ink-3">{k}</span><strong>{v}</strong></div>
            ))}
            <div className="h-px bg-line" />
            <div className="flex items-baseline justify-between"><span className="font-bold">Cost</span><span className="font-display text-2xl font-extrabold">TZS {fmt(total * SMS_RATE)}</span></div>
            <button type="button" onClick={() => setSent(true)} className="mt-1 min-h-[50px] rounded-xl bg-gold-400 text-[15px] font-extrabold text-ink">Send now</button>
            <div className="text-xs text-ink-3">Delivery report and replies appear in Bulk SMS. Recipient counts are sample figures; nothing is sent in this demo.</div>
          </div>
        </aside>
      </div>
    </StaffShell>
  );
}
