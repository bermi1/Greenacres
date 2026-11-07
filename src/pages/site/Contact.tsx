import { useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { db } from '../../data/db';
import { useLang } from '../../lib/i18n';
import { campuses, school } from '../../content/site';
import { Field, PageHero, Pill, Reveal, inputCls } from '../../components/ui';

export default function Contact() {
  const { tr } = useLang();
  const [campus, setCampus] = useState(campuses[0].id);
  const [f, setF] = useState({ name: '', phone: '', email: '', topic: '', msg: '' });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const topics = tr('Admissions|Fees and payments|Results|Boarding|Book a visit|Other', 'Udahili|Ada na malipo|Matokeo|Bweni|Kupanga ziara|Mengineyo').split('|');

  const [sent, setSent] = useState('');
  const save = (e: FormEvent) => {
    e.preventDefault();
    const c = campuses.find((x) => x.id === campus)!;
    db.sendMessage({ campus: c.name, topic: f.topic || topics[0], name: f.name, phone: f.phone, email: f.email, body: f.msg });
    setSent(f.name.split(' ')[0]);
  };
  const viaWhatsApp = () => {
    const c = campuses.find((x) => x.id === campus)!;
    const text = `${f.topic || topics[0]} · ${c.name}\n${f.msg}\n\n${f.name}${f.phone ? ' · ' + f.phone : ''}${f.email ? ' · ' + f.email : ''}`;
    window.open(`https://wa.me/${school.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };
  const viaEmail = () => {
    const c = campuses.find((x) => x.id === campus)!;
    const body = `${f.msg}\n\n${f.name}\n${f.phone}\n${f.email}`;
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(f.topic || topics[0])}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHero
        page="contact"
        kicker={tr('CONTACT US', 'MAWASILIANO')}
        title={tr('We would love to hear from you.', 'Tungependa kusikia kutoka kwako.')}
        lead={tr('Call, WhatsApp, email or send a message. Our offices are open Monday to Saturday, 8:30 AM to 5:00 PM.', 'Piga simu, WhatsApp, barua pepe au tuma ujumbe. Ofisi zetu ziko wazi Jumatatu hadi Jumamosi, saa 2:30 asubuhi hadi saa 11 jioni.')}
        photo="skonga"
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {campuses.map((c, k) => (
            <Reveal key={c.id} delay={k * 80} className="rounded-3xl border border-line bg-white p-6">
              <div className="text-xs font-bold tracking-wider text-gold-700">{c.area.toUpperCase()}</div>
              <h2 className="mb-3 mt-1 font-display text-2xl font-extrabold">{c.name}</h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
                <li className="flex gap-2.5"><MapPin className="mt-0.5 h-5 w-5 flex-none text-green-600" aria-hidden="true" />{c.address}</li>
                {c.phones.map((p) => (
                  <li key={p} className="flex gap-2.5"><Phone className="mt-0.5 h-5 w-5 flex-none text-green-600" aria-hidden="true" /><a href={`tel:${p.replace(/\s/g, '')}`} className="font-semibold">{p}</a></li>
                ))}
                <li className="flex gap-2.5"><Mail className="mt-0.5 h-5 w-5 flex-none text-green-600" aria-hidden="true" /><a href={`mailto:${c.email}`}>{c.email}</a></li>
                <li className="flex gap-2.5 text-ink-3"><Clock className="mt-0.5 h-5 w-5 flex-none text-green-600" aria-hidden="true" />{tr(c.hours.en, c.hours.sw)}</li>
              </ul>
            </Reveal>
          ))}
          <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#1FAF5A] font-bold text-white no-underline hover:brightness-95">
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> {tr('Chat on WhatsApp', 'Ongea nasi WhatsApp')} · {school.phoneMain}
          </a>
        </div>

        {sent ? (
          <div className="flex flex-col items-start justify-center rounded-[32px] bg-white p-8 shadow-card sm:p-12 lg:col-span-3 animate-fadeUp">
            <CheckCircle2 className="h-14 w-14 text-green-600" />
            <h2 className="mb-2 mt-5 font-display text-4xl">{tr(`Asante, ${sent}.`, `Asante, ${sent}.`)}</h2>
            <p className="m-0 text-lg text-ink-2">{tr('Your message is in the school office inbox. The right office replies within one working day.', 'Ujumbe wako umefika kwenye ofisi ya shule. Ofisi husika itakujibu ndani ya siku moja ya kazi.')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={viaWhatsApp} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1FAF5A] px-6 font-bold text-white"><MessageCircle className="h-4 w-4" />{tr('Need it faster? WhatsApp us', 'Unahitaji haraka? Tuandikie WhatsApp')}</button>
              <button type="button" onClick={() => { setSent(''); setF({ name: '', phone: '', email: '', topic: '', msg: '' }); }} className="min-h-[48px] rounded-full border border-line-2 px-6 font-semibold">{tr('Send another', 'Tuma mwingine')}</button>
            </div>
          </div>
        ) : (
        <form onSubmit={save} className="rounded-[32px] bg-white p-6 shadow-card sm:p-10 lg:col-span-3">
          <h2 className="mb-1 mt-0 font-display text-2xl font-extrabold">{tr('Send us a message', 'Tutumie ujumbe')}</h2>
          <p className="mb-5 mt-0 text-sm text-ink-3">{tr('Messages go straight to the school office inbox.', 'Ujumbe unakwenda moja kwa moja kwenye ofisi ya shule.')}</p>
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={tr('Campus', 'Kampasi')}>
            {campuses.map((c) => (
              <Pill key={c.id} on={campus === c.id} onClick={() => setCampus(c.id)}>{c.name}</Pill>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr('Your name', 'Jina lako')}><input required value={f.name} onChange={set('name')} className={inputCls} autoComplete="name" /></Field>
            <Field label={tr('Phone', 'Simu')}><input type="tel" value={f.phone} onChange={set('phone')} className={inputCls} placeholder="+255" autoComplete="tel" /></Field>
            <Field label={tr('Email', 'Barua pepe')}><input type="email" value={f.email} onChange={set('email')} className={inputCls} autoComplete="email" /></Field>
            <Field label={tr('Topic', 'Mada')}><select value={f.topic} onChange={set('topic')} className={inputCls}>{topics.map((t) => <option key={t}>{t}</option>)}</select></Field>
            <Field label={tr('Message', 'Ujumbe')} className="sm:col-span-2"><textarea required rows={5} value={f.msg} onChange={set('msg')} className={inputCls} /></Field>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 font-bold text-white hover:bg-green-700">
              <Send className="h-4 w-4" aria-hidden="true" /> {tr('Send message', 'Tuma ujumbe')}
            </button>
            <button type="button" onClick={viaEmail} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line-2 px-5 font-bold hover:border-green-600">
              <Mail className="h-4 w-4" aria-hidden="true" /> {tr('Use my email app', 'Tumia barua pepe yangu')}
            </button>
          </div>
        </form>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <iframe title={tr('Map: Green Acres, Mbezi Beach, Salasala', 'Ramani: Green Acres, Mbezi Beach, Salasala')} src={campuses[0].map} className="block h-[380px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
