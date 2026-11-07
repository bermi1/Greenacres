import { useState, type FormEvent } from 'react';
import { HandHeart, Network, PartyPopper, Quote, Send, Users } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { fromSource, thumb } from '../../lib/media';
import { alumniVoices } from '../../content/site';
import { db } from '../../data/db';
import { Field, PageHero, Photo, Reveal, SectionHead, inputCls, useLightbox } from '../../components/ui';

const YEARS = Array.from({ length: 2026 - 2000 + 1 }, (_, i) => String(2026 - i));
const LEVELS = ['DSM Nursery', 'DSM Primary', 'DSM O-Level', 'DSM A-Level', 'Bunazi Nursery', 'Bunazi Primary'];

export default function Alumni() {
  const { tr } = useLang();
  const lb = useLightbox();
  const photos = fromSource('alumni');
  const [f, setF] = useState({ name: '', year: '2015', level: 'DSM O-Level', work: '', phone: '', email: '' });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const perks = [
    { icon: Users, h: tr('Stay connected', 'Endelea kuunganika'), p: tr('Reconnect with classmates and the teachers who shaped you.', 'Ungana tena na wanafunzi wenzako na walimu waliokujenga.') },
    { icon: HandHeart, h: tr('Give back', 'Rudisha fadhila'), p: tr('Mentor students, support projects or offer career guidance.', 'Washauri wanafunzi, saidia miradi au toa ushauri wa taaluma.') },
    { icon: Network, h: tr('Grow your network', 'Panua mtandao'), p: tr('Meet professionals and entrepreneurs from every field.', 'Kutana na wataalamu na wajasiriamali wa kila fani.') },
    { icon: PartyPopper, h: tr('Celebrate', 'Sherehekea'), p: tr('Share your milestones and career growth with the family.', 'Shiriki mafanikio yako na familia ya Green Acres.') },
  ];

  const [done, setDone] = useState(false);
  const register = (e: FormEvent) => {
    e.preventDefault();
    db.registerAlumnus(f);
    setDone(true);
  };

  return (
    <>
      <PageHero
        page="alumni"
        kicker={tr('ALUMNI', 'WAHITIMU')}
        title={tr('Once Green Acres, always family.', 'Mara moja Green Acres, daima familia.')}
        lead={tr('Since 2000 we have nurtured thousands of learners who now lead, build and serve across Tanzania and the world.', 'Tangu 2000 tumelea maelfu ya wanafunzi ambao sasa wanaongoza, wanajenga na kuhudumia Tanzania na dunia.')}
        photo="get"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, k) => (
            <Reveal key={p.h} delay={k * 70} className="rounded-2xl border border-line bg-white p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green-600"><p.icon className="h-5 w-5" aria-hidden="true" /></div>
              <div className="mt-4 font-display text-lg font-extrabold">{p.h}</div>
              <p className="mb-0 mt-1 text-sm text-ink-3">{p.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHead kicker={tr('ALUMNI VOICES', 'SAUTI ZA WAHITIMU')} title={tr('Where Green Acres took them', 'Green Acres iliwafikisha wapi')} />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {alumniVoices.map((a) => (
              <figure key={a.name} className="m-0 flex w-[82%] flex-none snap-start flex-col rounded-2xl border border-line bg-paper p-6 sm:w-auto">
                <Quote className="h-7 w-7 text-gold-400" aria-hidden="true" />
                <blockquote className="m-0 mt-3 flex-1 text-[15px] leading-relaxed">{tr(a.quoteEn, a.quoteSw)}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img src={thumb(a.photo)} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                  <span>
                    <span className="block font-bold">{a.name}</span>
                    <span className="block text-sm text-ink-3">{tr(a.roleEn, a.roleSw)}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHead kicker={tr('ALUMNI GET-TOGETHER', 'MKUSANYIKO WA WAHITIMU')} title={tr('Reconnect. Share. Inspire.', 'Ungana. Shiriki. Hamasisha.')}>
            {tr('Our alumni meet at Giraffe Hotel each June. Register below to be invited and to hear about mentoring days.', 'Wahitimu wetu hukutana Giraffe Hotel kila Juni. Jisajili hapa chini kupata mwaliko na taarifa za siku za ushauri.')}
          </SectionHead>
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map((n, k) => (
              <button key={n} type="button" onClick={() => lb.open(photos.map((x) => ({ kind: 'image' as const, name: x })), k)} className="group overflow-hidden rounded-xl" aria-label={tr('Open photo', 'Fungua picha')}>
                <Photo name={n} alt="" className="aspect-square w-full transition duration-500 group-hover:scale-105" sizes="200px" />
              </button>
            ))}
          </div>
        </div>
        {done ? (
          <div className="flex flex-col justify-center rounded-[32px] bg-green-900 p-10 text-white animate-fadeUp">
            <div className="font-display text-5xl">{tr('Karibu tena,', 'Karibu tena,')} <em className="text-gold-400">{f.name.split(' ')[0]}.</em></div>
            <p className="text-lg text-white/75">{tr('You are on the alumni list. Invitations and news will reach you by SMS and email.', 'Uko kwenye orodha ya wahitimu. Mialiko na habari zitakufikia kwa SMS na barua pepe.')}</p>
          </div>
        ) : (
        <form onSubmit={register} className="rounded-[32px] bg-white p-6 shadow-card sm:p-10">
          <h2 className="mb-5 mt-0 font-display text-2xl font-extrabold">{tr('Join the alumni network', 'Jiunge na mtandao wa wahitimu')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr('Full name', 'Jina kamili')} className="sm:col-span-2"><input required value={f.name} onChange={set('name')} className={inputCls} autoComplete="name" /></Field>
            <Field label={tr('Year you finished', 'Mwaka uliohitimu')}><select value={f.year} onChange={set('year')} className={inputCls}>{YEARS.map((y) => <option key={y}>{y}</option>)}</select></Field>
            <Field label={tr('Level attended', 'Ngazi uliyosoma')}><select value={f.level} onChange={set('level')} className={inputCls}>{LEVELS.map((y) => <option key={y}>{y}</option>)}</select></Field>
            <Field label={tr('Profession', 'Kazi')}><input value={f.work} onChange={set('work')} className={inputCls} /></Field>
            <Field label={tr('Phone', 'Simu')}><input type="tel" value={f.phone} onChange={set('phone')} className={inputCls} placeholder="+255" autoComplete="tel" /></Field>
            <Field label={tr('Email', 'Barua pepe')} className="sm:col-span-2"><input type="email" required value={f.email} onChange={set('email')} className={inputCls} autoComplete="email" /></Field>
          </div>
          <button type="submit" className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-bold text-white hover:bg-green-700">
            <Send className="h-4 w-4" aria-hidden="true" /> {tr('Register', 'Jisajili')}
          </button>
        </form>
        )}
      </section>
      {lb.node}
    </>
  );
}
