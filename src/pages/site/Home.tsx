import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, CalendarDays, Clock, Compass, Download, Eye, GraduationCap, MapPin, Medal, Palette, Play, Quote, School, Target, Tent, Trophy, Users } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { doc, img, thumb } from '../../lib/media';
import { niceDate } from '../../lib/format';
import { activities, alumniVoices, events, joiningDocs, levels, posts, videos } from '../../content/site';
import { useDb } from '../../data/db';
import { CountUp, Photo, Reveal, SectionHead, useLightbox } from '../../components/ui';
import { ApplyBanner } from '../../components/SiteLayout';

const HERO = ['learning-in-motion-our-green-acres-teach-2', 'lab-3', '4', 'a-week-back-in-the-groove-at-green-acres'];
const wrap = 'mx-auto max-w-7xl px-4 sm:px-8';

/* 1. Hero and admission ribbon */
function Hero() {
  const { tr, lang } = useLang();
  const saved = useDb((t) => t.pages.home?.[lang]);
  const live = saved?.status === 'Published' ? saved : null;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % HERO.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-green-950 text-white">
        {HERO.map((n, k) => (
          <img key={n} src={img(n)} alt="" aria-hidden="true" loading={k === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1500ms] ${k === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-950/90 via-green-950/65 to-green-950/10" />
        <div className={`${wrap} flex min-h-[560px] items-center py-20 sm:min-h-[600px]`}>
          <div className="max-w-2xl animate-fadeUp">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[.14em] text-gold-400">{tr('Welcome to Green Acres Schools', 'Karibu Green Acres Schools')}</p>
            <h1 className="m-0 mt-4 font-display text-[40px] font-bold leading-[1.08] sm:text-[60px]">
              {live?.heading ?? (
                <>
                  {tr('Where young minds grow, and ', 'Mahali akili changa hukua, na ')}
                  <span className="relative inline-block">
                    {tr('leaders', 'viongozi')}
                    <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-gold-400" aria-hidden="true" />
                  </span>
                  {tr(' are made', ' huandaliwa')}
                </>
              )}
            </h1>
            <p className="mb-0 mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              {live?.intro ?? tr('From Nursery to A-Level, we provide a caring and disciplined learning environment that inspires academic excellence, character and Tanzanian values.', 'Kuanzia Awali hadi A-Level, tunatoa mazingira ya upendo na nidhamu yanayochochea ubora wa kitaaluma, tabia njema na maadili ya Kitanzania.')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply" className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-gold-400 px-6 font-semibold text-ink no-underline transition hover:bg-gold-300">
                {live?.cta ?? tr('Apply for 2027', 'Omba nafasi 2027')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/about" className="inline-flex min-h-[52px] items-center rounded-xl bg-green-600 px-6 font-semibold text-white no-underline transition hover:bg-green-500">
                {tr('Know us', 'Tufahamu')}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 hidden gap-2 sm:flex" role="group" aria-label={tr('Hero photos', 'Picha kuu')}>
          {HERO.map((n, k) => (
            <button key={n} type="button" onClick={() => setI(k)} aria-label={tr(`Show photo ${k + 1}`, `Onyesha picha ${k + 1}`)} aria-pressed={k === i} className={`h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/60'}`} />
          ))}
        </div>
      </section>
      <Link to="/apply" className="block bg-green-600 text-white no-underline hover:bg-green-500">
        <div className={`${wrap} flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3.5 text-center`}>
          <span className="font-display text-lg font-semibold">{tr('Form One admission for 2027 is now open. Apply today.', 'Udahili wa Kidato cha Kwanza 2027 uko wazi. Omba leo.')}</span>
          <span className="rounded-full bg-gold-400 px-4 py-1 text-sm font-semibold text-ink">{tr('Apply now', 'Omba sasa')}</span>
        </div>
      </Link>
    </>
  );
}

/* 2. About */
function About() {
  const { tr } = useLang();
  return (
    <section className={`${wrap} grid items-center gap-12 py-20 lg:grid-cols-2`}>
      <Reveal className="grid grid-cols-2 gap-3">
        {['learning-in-motion-our-green-acres-teach-2', '4', '3', 'a-week-back-in-the-groove-at-green-acres-2'].map((n) => (
          <Photo key={n} name={n} alt="" className="aspect-[4/3] w-full rounded-xl" sizes="(min-width:1024px) 25vw, 50vw" />
        ))}
      </Reveal>
      <div>
        <SectionHead kicker={tr('About Green Acres Schools', 'Kuhusu Green Acres Schools')} title={tr('Inspiring excellence, shaping Tanzania’s future', 'Kuchochea ubora, kujenga mustakabali wa Tanzania')}>
          <p className="m-0">{tr('Since 2000, Green Acres Schools has provided quality education that shapes bright minds and strong, principled leaders. From our early learners in Bunazi to our A-Level students in Dar es Salaam, every child learns in a safe, disciplined and values-driven place.', 'Tangu 2000, Green Acres Schools imetoa elimu bora inayojenga akili angavu na viongozi wenye misingi. Kuanzia wanafunzi wadogo Bunazi hadi A-Level Dar es Salaam, kila mtoto anajifunza katika mazingira salama, yenye nidhamu na maadili.')}</p>
        </SectionHead>
        <Link to="/about" className="-mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gold-400 px-6 font-semibold text-ink no-underline hover:bg-gold-300">
          {tr('Learn more about us', 'Fahamu zaidi kuhusu sisi')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/* 3. Mission and vision, in the photo grid the current site uses */
function MissionVision() {
  const { tr } = useLang();
  return (
    <section className={`${wrap} pb-20`}>
      <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
        <Photo name="1212" alt={tr('Smiling nursery pupils', 'Wanafunzi wa awali wakitabasamu')} className="h-72 w-full rounded-xl md:row-span-2 md:h-full" />
        <Photo name="2-2" alt={tr('Pupils playing football on the school field', 'Wanafunzi wakicheza mpira uwanjani')} className="h-56 w-full rounded-xl md:h-full" />
        <Reveal className="flex flex-col justify-center gap-3 rounded-xl bg-paper-2 p-8">
          <Target className="h-9 w-9 text-gold-500" aria-hidden="true" />
          <h3 className="m-0 font-display text-2xl font-bold text-green-600">{tr('Our mission', 'Dhamira yetu')}</h3>
          <p className="m-0 text-[16px] leading-relaxed text-ink-3">{tr('To provide a supportive learning environment that fosters academic excellence, creative thinking and moral integrity, preparing students for a rapidly changing world.', 'Kutoa mazingira ya kujifunzia yanayokuza ubora wa kitaaluma, fikra bunifu na uadilifu, kuwaandaa wanafunzi kwa dunia inayobadilika haraka.')}</p>
        </Reveal>
        <Reveal className="flex flex-col justify-center gap-3 rounded-xl bg-green-600 p-8 text-white">
          <Eye className="h-9 w-9 text-gold-400" aria-hidden="true" />
          <h3 className="m-0 font-display text-2xl font-bold">{tr('Our vision', 'Dira yetu')}</h3>
          <p className="m-0 text-[16px] leading-relaxed text-white/90">{tr('To be a leading institution that nurtures holistic development, producing globally competent and ethical citizens.', 'Kuwa taasisi inayoongoza katika kukuza maendeleo kamili, ikizalisha raia wenye uwezo wa kimataifa na maadili.')}</p>
        </Reveal>
        <Photo name="a-week-back-in-the-groove-at-green-acres" alt={tr('A student writing in class', 'Mwanafunzi akiandika darasani')} className="h-56 w-full rounded-xl md:h-full" />
      </div>
    </section>
  );
}

/* 4. Impact numbers as colour blocks (St Jude style), using the figures the school publishes */
function Impact() {
  const { tr } = useLang();
  const blocks = [
    { icon: Clock, v: <CountUp to={25} suffix="+" />, h: tr('years', 'miaka'), p: tr('of quality education since 2000', 'ya elimu bora tangu 2000'), c: 'bg-green-600 text-white', s: 'text-white/85' },
    { icon: GraduationCap, v: <CountUp to={20} suffix="K+" />, h: tr('graduates', 'wahitimu'), p: tr('leading in Tanzania and beyond', 'wanaoongoza Tanzania na nje'), c: 'bg-gold-400 text-ink', s: 'text-ink-2' },
    { icon: Users, v: <CountUp to={50} suffix="+" />, h: tr('teachers', 'walimu'), p: tr('mentors and role models', 'walezi na mifano bora'), c: 'bg-green-950 text-white', s: 'text-white/85' },
    { icon: School, v: <CountUp to={2} />, h: tr('campuses', 'kampasi'), p: tr('Dar es Salaam and Bunazi, Kagera', 'Dar es Salaam na Bunazi, Kagera'), c: 'bg-green-100 text-ink', s: 'text-ink-3' },
  ];
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4">
      {blocks.map((b, k) => (
        <Reveal key={k} delay={k * 80} className={`flex flex-col gap-2 px-8 py-10 ${b.c}`}>
          <b.icon className="h-9 w-9 opacity-90" aria-hidden="true" />
          <div className="mt-2 flex items-baseline gap-2 font-display">
            <span className="text-[52px] font-bold leading-none tabular-nums">{b.v}</span>
            <span className="text-2xl font-semibold">{b.h}</span>
          </div>
          <p className={`m-0 text-[15px] ${b.s}`}>{b.p}</p>
        </Reveal>
      ))}
    </section>
  );
}

/* 5. Co-curricular activities: photo with an overlapping card, as on the current site */
const ACT_ICONS = [Trophy, Compass, Tent, Palette];
function CoCurricular() {
  const { tr } = useLang();
  return (
    <section className="bg-paper-2 py-20">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionHead kicker={tr('Why choose Green Acres', 'Kwa nini Green Acres')} title={tr('Co-curricular activities', 'Shughuli za ziada')} />
          <p className="m-0 mb-10 text-[17px] leading-relaxed text-ink-3">{tr('Learning goes beyond the classroom. We nurture every child’s talents through activities that build confidence, teamwork and leadership.', 'Kujifunza hakuishii darasani. Tunakuza vipaji vya kila mtoto kupitia shughuli zinazojenga kujiamini, ushirikiano na uongozi.')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, k) => {
            const Icon = ACT_ICONS[k];
            return (
              <Reveal key={a.photo} delay={k * 80}>
                <Link to="/academics" className="group block text-ink no-underline">
                  <div className="overflow-hidden rounded-xl">
                    <Photo name={a.photo} alt="" className="h-60 w-full transition duration-500 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                  </div>
                  <div className={`relative mx-4 -mt-12 rounded-xl p-6 text-center shadow-card transition group-hover:-translate-y-1 ${k === 1 ? 'bg-green-600 text-white' : 'bg-white'}`}>
                    <Icon className={`mx-auto h-9 w-9 ${k === 1 ? 'text-gold-400' : 'text-gold-500'}`} aria-hidden="true" />
                    <h3 className={`m-0 mt-3 font-display text-xl font-bold ${k === 1 ? 'text-white' : 'text-green-600'}`}>{tr(a.en, a.sw)}</h3>
                    <p className={`m-0 mt-2 text-[15px] leading-relaxed ${k === 1 ? 'text-white/90' : 'text-ink-3'}`}>{tr(a.dEn, a.dSw)}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 6. Academic journey: the green band with the four levels */
function Journey() {
  const { tr } = useLang();
  return (
    <section className="bg-green-600 py-20 text-white">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]`}>
        <div>
          <SectionHead dark kicker={tr('Academics', 'Taaluma')} title={tr('A complete learning journey, from first steps to future leaders', 'Safari kamili ya kujifunza, kutoka hatua za kwanza hadi viongozi wa kesho')}>
            {tr('We guide learners through every stage, from their first classroom to university preparation.', 'Tunawaongoza wanafunzi katika kila hatua, kutoka darasa la kwanza hadi maandalizi ya chuo kikuu.')}
          </SectionHead>
          <Link to="/admissions" className="-mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gold-400 px-6 font-semibold text-ink no-underline hover:bg-gold-300">
            {tr('Apply now', 'Omba sasa')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {levels.map((l, k) => (
            <Reveal key={l.id} delay={k * 80}>
              <Link to={`/academics#${l.id}`} className={`group flex items-center gap-4 rounded-xl p-4 no-underline transition hover:-translate-y-1 ${k === 3 ? 'bg-gold-400 text-ink' : k === 0 ? 'bg-white text-ink' : 'border-2 border-white/40 text-white hover:bg-white/10'}`}>
                <img src={thumb(l.photo)} alt="" className="h-20 w-20 flex-none rounded-lg object-cover" loading="lazy" />
                <span className="flex-1">
                  <span className="block font-display text-xl font-bold">{tr(l.en, l.sw)}</span>
                  <span className={`block text-sm ${k === 3 || k === 0 ? 'text-ink-3' : 'text-white/80'}`}>{tr(l.ageEn, l.ageSw).toLowerCase()}</span>
                </span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7. Results and the class finder */
const AGE_RULES = [
  { min: 3, max: 5, id: 'nur', en: 'Nursery', sw: 'Awali', doc: 0 },
  { min: 6, max: 8, id: 'pri', en: 'Primary, Grades 1 to 3', sw: 'Msingi, Darasa 1 hadi 3', doc: 1 },
  { min: 9, max: 10, id: 'pri', en: 'Primary, Grades 4 and 5', sw: 'Msingi, Darasa 4 na 5', doc: 2 },
  { min: 11, max: 12, id: 'pri', en: 'Primary, Grades 6 and 7', sw: 'Msingi, Darasa 6 na 7', doc: 3 },
  { min: 13, max: 14, id: 'f1', en: 'Form One (or Pre-Form 1)', sw: 'Kidato cha Kwanza (au Pre-Form 1)', doc: 4 },
  { min: 15, max: 16, id: 'f1', en: 'Secondary transfer, Form Two to Four', sw: 'Uhamisho wa sekondari, Kidato cha 2 hadi 4', doc: 4 },
  { min: 17, max: 19, id: 'f5', en: 'Form Five, A-Level (or Pre-Form 5)', sw: 'Kidato cha Tano, A-Level (au Pre-Form 5)', doc: 4 },
];

function ResultsAndFinder() {
  const { tr } = useLang();
  const [year, setYear] = useState(2014);
  const [mode, setMode] = useState<'board' | 'day'>('board');
  const age = 2027 - year;
  const rule = AGE_RULES.find((r) => age >= r.min && age <= r.max);
  const d = rule ? joiningDocs[rule.doc === 4 ? (mode === 'board' ? 4 : 5) : rule.doc] : undefined;
  const wins = [
    { v: '77/77', p: tr('Grade A in Standard Seven 2025, Bunazi', 'Daraja A, Darasa la Saba 2025, Bunazi') },
    { v: '93/93', p: tr('Grade A in Grade Four 2025, Bunazi', 'Daraja A, Darasa la Nne 2025, Bunazi') },
    { v: '1st', p: tr('Top school in Missenyi District', 'Shule ya kwanza Wilaya ya Missenyi') },
  ];
  return (
    <section className={`${wrap} grid gap-10 py-20 lg:grid-cols-2`}>
      <div>
        <SectionHead kicker={tr('Results 2025', 'Matokeo 2025')} title={tr('Results that speak for our pupils', 'Matokeo yanayozungumza kwa ajili ya wanafunzi wetu')} />
        <div className="flex flex-col gap-3">
          {wins.map((w) => (
            <Reveal key={w.v} className="flex items-center gap-5 rounded-xl border border-line p-5">
              <Award className="h-9 w-9 flex-none text-gold-500" aria-hidden="true" />
              <span className="w-28 flex-none font-display text-[34px] font-bold text-green-600">{w.v}</span>
              <span className="text-[16px] text-ink-2">{w.p}</span>
            </Reveal>
          ))}
        </div>
        <Link to="/results" className="mt-6 inline-flex items-center gap-2 font-semibold text-green-600 no-underline hover:underline">
          {tr('See all results', 'Angalia matokeo yote')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <Reveal className="rounded-2xl bg-paper-2 p-8">
        <div className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[.12em] text-green-600"><span className="h-[3px] w-8 rounded-full bg-gold-400" />{tr('Plan ahead', 'Panga mapema')}</div>
        <h3 className="m-0 mt-3 font-display text-[28px] font-bold leading-tight">{tr('Which class for your child in 2027?', 'Darasa gani kwa mtoto wako mwaka 2027?')}</h3>
        <label htmlFor="yob" className="mt-6 flex items-baseline justify-between text-[15px] font-medium text-ink-2">
          {tr('Year of birth', 'Mwaka wa kuzaliwa')}
          <span className="font-display text-4xl font-bold text-ink">{year}</span>
        </label>
        <input id="yob" type="range" min={2007} max={2024} value={year} onChange={(e) => setYear(Number(e.target.value))} className="mt-3 w-full accent-green-600" />
        <div className="mt-4 inline-flex rounded-full bg-white p-1">
          {(['board', 'day'] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={`min-h-[40px] rounded-full px-5 text-sm font-medium ${mode === m ? 'bg-green-600 text-white' : 'text-ink-2'}`}>
              {m === 'board' ? tr('Boarding', 'Bweni') : tr('Day', 'Kutwa')}
            </button>
          ))}
        </div>
        <div key={(rule?.en ?? 'none') + mode} className="mt-6 rounded-xl bg-white p-5 animate-pop">
          <p className="m-0 text-sm text-ink-3">{tr(`Age ${age} in 2027`, `Umri ${age} mwaka 2027`)}</p>
          <p className="m-0 mt-1 font-display text-2xl font-bold text-green-600">{rule ? tr(rule.en, rule.sw) : tr('Please call our office', 'Tafadhali piga ofisini')}</p>
          <p className="m-0 mt-1 text-sm text-ink-3">{rule ? tr('A guide only. The admissions office confirms placement.', 'Ni mwongozo tu. Ofisi ya udahili inathibitisha.') : '+255 782 128 633'}</p>
        </div>
        {rule && d && (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/apply?level=${rule.id}&mode=${mode}`} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gold-400 px-5 font-semibold text-ink no-underline hover:bg-gold-300">{tr('Start this application', 'Anza maombi haya')} <ArrowRight className="h-4 w-4" /></Link>
            <a href={doc(d.file)} target="_blank" rel="noreferrer" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-line-2 bg-white px-5 font-semibold text-ink no-underline hover:border-green-600"><Download className="h-4 w-4 text-green-600" />{tr('Joining instructions', 'Maelekezo ya kujiunga')}</a>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* 8. Events */
function Events() {
  const { tr } = useLang();
  const [first, ...rest] = events;
  return (
    <section className="bg-paper-2 py-20">
      <div className={wrap}>
        <SectionHead center kicker={tr('Our events', 'Matukio yetu')} title={tr('Announcements and school events', 'Matangazo na matukio ya shule')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="relative min-h-[360px] overflow-hidden rounded-xl text-white">
            <Photo name="dsc2070-2" alt="" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/30 to-transparent" />
            <div className="absolute left-6 top-6 rounded-lg bg-white px-4 py-2 text-center text-green-600">
              <span className="block font-display text-3xl font-bold leading-none">{first.d}</span>
              <span className="text-sm font-semibold text-gold-500">{tr(first.mEn, first.mSw)}</span>
            </div>
            <div className="absolute inset-x-6 bottom-6">
              <p className="m-0 flex gap-4 text-sm text-white/85"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-gold-400" />{first.venue}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4 text-gold-400" />{first.time}</span></p>
              <h3 className="m-0 mt-2 font-display text-2xl font-bold">{tr(first.en, first.sw)}</h3>
            </div>
          </Reveal>
          <div className="flex flex-col gap-4">
            {rest.map((e, k) => (
              <Reveal key={e.en} delay={k * 80} className="flex items-center gap-5 rounded-xl bg-white p-4">
                <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-lg bg-green-600 text-white">
                  <span className="font-display text-3xl font-bold leading-none">{e.d}</span>
                  <span className="text-sm">{tr(e.mEn, e.mSw)}</span>
                </div>
                <div>
                  <p className="m-0 flex flex-wrap gap-x-4 text-sm text-ink-3"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-gold-500" />{e.venue}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4 text-gold-500" />{e.time}</span></p>
                  <h3 className="m-0 mt-1 font-display text-lg font-bold text-green-600">{tr(e.en, e.sw)}</h3>
                </div>
              </Reveal>
            ))}
            <p className="m-0 flex items-center gap-2 text-sm text-ink-3"><CalendarDays className="h-4 w-4" />{tr('Dates as published by the school. Call the office to confirm this year’s calendar.', 'Tarehe kama zilivyotangazwa na shule. Piga ofisini kuthibitisha kalenda ya mwaka huu.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 9. Education for every stage: the mosaic with colour panels */
function Mosaic() {
  const { tr } = useLang();
  return (
    <section className="grid md:grid-cols-4 md:grid-rows-2">
      <div className="relative min-h-[320px] md:col-span-2 md:row-span-2">
        <Photo name="learning-in-motion-our-green-acres-teach" alt={tr('A teacher helping a pupil with his book', 'Mwalimu akimsaidia mwanafunzi')} className="absolute inset-0 h-full w-full" />
        <Link to="/academics" className="absolute bottom-0 left-0 flex max-w-sm items-center gap-4 bg-green-600 p-6 text-white no-underline hover:bg-green-500">
          <GraduationCap className="h-10 w-10 flex-none text-gold-400" aria-hidden="true" />
          <span><span className="block font-display text-xl font-bold">{tr('Education for every stage', 'Elimu kwa kila hatua')}</span><span className="text-[15px] text-white/85">{tr('We walk with each student, every step of the way.', 'Tunatembea na kila mwanafunzi, kila hatua.')}</span></span>
        </Link>
      </div>
      <Link to="/about" className="flex flex-col justify-center gap-2 bg-gold-400 p-8 text-ink no-underline hover:bg-gold-300">
        <span className="font-display text-xl font-bold">{tr('Nurturing minds, building leaders', 'Kulea akili, kujenga viongozi')}</span>
        <span className="text-[15px] text-ink-2">{tr('Since 2000, from first classroom to university readiness.', 'Tangu 2000, kutoka darasa la kwanza hadi chuo kikuu.')}</span>
      </Link>
      <Photo name="p1336273-1" alt={tr('Pupils on Cultural Day', 'Wanafunzi Siku ya Utamaduni')} className="h-64 w-full md:h-full" />
      <Photo name="graduation" alt={tr('A graduate receives his certificate', 'Mhitimu akipokea cheti')} className="h-64 w-full md:h-full" />
      <Link to="/news" className="flex flex-col justify-center gap-2 bg-green-600 p-8 text-white no-underline hover:bg-green-500">
        <span className="font-display text-xl font-bold">{tr('Empowering students, enriching communities', 'Kuwawezesha wanafunzi, kuimarisha jamii')}</span>
        <span className="text-[15px] text-white/85">{tr('Quality teaching, modern facilities and Tanzanian values.', 'Ufundishaji bora, miundombinu ya kisasa na maadili ya Kitanzania.')}</span>
      </Link>
    </section>
  );
}

/* 10. Teachers */
function Teachers() {
  const { tr } = useLang();
  const lb = useLightbox();
  const v = videos.find((x) => x.id === 'school-nurse')!;
  return (
    <section className={`${wrap} grid items-center gap-12 py-20 lg:grid-cols-2`}>
      <SectionHead kicker={tr('Our teachers', 'Walimu wetu')} title={tr('The heart of Green Acres Schools', 'Moyo wa Green Acres Schools')}>
        <p className="m-0">{tr('Our teachers are more than educators. They are mentors, role models and lifelong learners who make every student feel valued, challenged and inspired.', 'Walimu wetu ni zaidi ya wakufunzi. Ni walezi, mifano bora na wanafunzi wa maisha yote wanaomfanya kila mwanafunzi ajisikie wa thamani na mwenye hamasa.')}</p>
      </SectionHead>
      <div className="grid grid-cols-2 gap-4">
        <Photo name="teacher" alt={tr('A Green Acres teacher', 'Mwalimu wa Green Acres')} className="aspect-[4/5] w-full rounded-xl" sizes="(min-width:1024px) 25vw, 50vw" />
        <button type="button" onClick={() => lb.open([{ kind: 'video', name: v.id, caption: tr(v.en, v.sw) }])} className="group relative overflow-hidden rounded-xl text-left">
          <Photo name="learning-in-motion-our-green-acres-teach-3" alt="" className="aspect-[4/5] w-full transition duration-500 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
          <span className="absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-ink"><Play className="ml-0.5 h-6 w-6 fill-current" /></span>
          <span className="absolute inset-x-4 bottom-4 text-sm font-semibold text-white">{tr(v.en, v.sw)}</span>
        </button>
      </div>
      {lb.node}
    </section>
  );
}

/* 11. Photo strip */
function PhotoStrip() {
  const { tr } = useLang();
  const pics = ['mpendwa-mheshimiwa-mkuu-wa-mkoa-kagera', 'act-culture', 'kwa-niaba-ya-waziri-wa-elimu-prof-nkenda-6', '2-2', 'skonga', 'lab-2'];
  return (
    <section aria-label={tr('Photos from school life', 'Picha za maisha ya shule')} className="grid grid-cols-3 lg:grid-cols-6">
      {pics.map((n) => (
        <Link key={n} to="/gallery" className="group block overflow-hidden" aria-label={tr('Open the gallery', 'Fungua picha')}>
          <img src={thumb(n)} alt="" loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
      ))}
    </section>
  );
}

/* 12. News */
function News() {
  const { tr, lang } = useLang();
  const status = useDb((t) => t.postStatus);
  const latest = useMemo(() => posts.filter((p) => (status[p.slug] ?? 'Published') === 'Published').slice(0, 3), [status]);
  return (
    <section className={`${wrap} py-20`}>
      <SectionHead center kicker={tr('Our blog', 'Habari')} title={tr('Latest news and articles', 'Habari na makala za karibuni')} />
      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((p, k) => (
          <Reveal key={p.slug} delay={k * 80}>
            <Link to={`/news/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white text-ink no-underline transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-52 overflow-hidden bg-green-50">
                {p.cover && <Photo name={p.cover} alt="" className="h-full w-full transition duration-500 group-hover:scale-105" sizes="(min-width:768px) 33vw, 100vw" />}
                <span className="absolute bottom-3 left-3 rounded-md bg-gold-400 px-2.5 py-1 text-xs font-semibold text-ink">{p.category === 'Results' ? tr('Results', 'Matokeo') : tr('News', 'Habari')}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="m-0 text-sm text-ink-3">{niceDate(p.date, lang)}</p>
                <h3 className="m-0 mt-2 flex-1 font-display text-xl font-bold leading-snug text-green-600">{tr(p.title, p.titleSw)}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">{tr('Read more', 'Soma zaidi')} <ArrowRight className="h-4 w-4 text-gold-500 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/news" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gold-400 px-6 font-semibold text-ink no-underline hover:bg-gold-300">{tr('More news', 'Habari zaidi')} <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

/* 13. Alumni voices */
function Voices() {
  const { tr } = useLang();
  return (
    <section className="bg-paper-2 py-20">
      <div className={wrap}>
        <SectionHead center kicker={tr('Alumni', 'Wahitimu')} title={tr('What our graduates say', 'Wahitimu wetu wanasema')} />
        <div className="grid gap-6 md:grid-cols-3">
          {alumniVoices.slice(0, 3).map((a, k) => (
            <Reveal key={a.name} delay={k * 80} className="flex flex-col rounded-xl bg-white p-7">
              <Quote className="h-8 w-8 text-gold-400" aria-hidden="true" />
              <p className="m-0 mt-3 flex-1 text-[16px] leading-relaxed text-ink-2">{tr(a.quoteEn, a.quoteSw)}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <img src={thumb(a.photo)} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="m-0 font-display font-bold">{a.name}</p>
                  <p className="m-0 text-sm text-ink-3">{tr(a.roleEn, a.roleSw)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/alumni" className="inline-flex items-center gap-2 font-semibold text-green-600 no-underline hover:underline"><Medal className="h-4 w-4" />{tr('Join the alumni network', 'Jiunge na mtandao wa wahitimu')}</Link>
        </div>
      </div>
    </section>
  );
}

function WidePhoto() {
  const { tr } = useLang();
  return (
    <section className="relative h-[360px] overflow-hidden sm:h-[460px]">
      <Photo name="a8a9051" alt={tr('Green Acres students at the Immigration Club launch', 'Wanafunzi wa Green Acres katika uzinduzi wa Klabu ya Uhamiaji')} className="absolute inset-0 h-full w-full" large />
      <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent" />
      <div className={`${wrap} relative flex h-full items-end pb-8`}>
        <p className="m-0 flex items-center gap-2 font-display text-2xl font-bold text-white sm:text-3xl"><BookOpen className="h-7 w-7 text-gold-400" aria-hidden="true" />{tr('Karibu Green Acres. Quality Education.', 'Karibu Green Acres. Elimu Bora.')}</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MissionVision />
      <Impact />
      <CoCurricular />
      <WidePhoto />
      <Journey />
      <ResultsAndFinder />
      <Events />
      <Mosaic />
      <Teachers />
      <PhotoStrip />
      <ApplyBanner />
      <News />
      <Voices />
    </>
  );
}
