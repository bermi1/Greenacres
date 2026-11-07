import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, FlaskConical, Home as HomeIcon, Quote, Trophy, Users } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { img, thumb } from '../../lib/media';
import { niceDate } from '../../lib/format';
import { activities, alumniVoices, levels, posts, videos } from '../../content/site';
import { CountUp, Photo, Reveal, SectionHead, VideoTile, useLightbox } from '../../components/ui';
import { ApplyBanner } from '../../components/SiteLayout';

const HERO = ['4', '1', 'a-week-back-in-the-groove-at-green-acres', 'learning-in-motion-our-green-acres-teach-3', 'lab-3'];
const STRIP = ['p1336273-1', 'dsc2070-2', 'tumebahatika-kushiriki-katika-tukio-la-u', 'a8a9051', 'graduation', 'lab-2', 'skonga', 'act-culture', '2-2', 'teacher', 'act-scouting', 'kwa-niaba-ya-waziri-wa-elimu-prof-nkenda-6'];

function HeroSlides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % HERO.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO.map((n, k) => (
        <img
          key={n}
          src={img(n)}
          alt=""
          loading={k === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${k === i ? 'opacity-100 animate-kenburns motion-reduce:animate-none' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { tr, lang } = useLang();
  const lb = useLightbox();
  const latest = posts.slice(0, 3);
  const why = [
    { icon: BookOpen, h: tr('A reading culture', 'Utamaduni wa kusoma'), p: tr('Libraries, literature talks and mentorship build lifelong readers and leaders.', 'Maktaba, mazungumzo ya fasihi na ushauri hujenga wasomaji na viongozi.') },
    { icon: HomeIcon, h: tr('Safe boarding', 'Bweni salama'), p: tr('Supervised dormitories and an on-campus dispensary with qualified staff.', 'Mabweni yanayosimamiwa na zahanati ya shule yenye wahudumu waliohitimu.') },
    { icon: FlaskConical, h: tr('Hands-on science', 'Sayansi kwa vitendo'), p: tr('Physics, Chemistry and Biology labs, and a computer lab with high-speed internet.', 'Maabara za Fizikia, Kemia na Biolojia, na maabara ya kompyuta yenye intaneti ya kasi.') },
    { icon: Users, h: tr('Tanzanian values', 'Maadili ya Kitanzania'), p: tr('Discipline, respect and service, celebrated on Cultural Day and every day.', 'Nidhamu, heshima na huduma, zikisherehekewa Siku ya Utamaduni na kila siku.') },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-green-800 text-white">
        <HeroSlides />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-green-700/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-green-900/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-4 py-20 sm:min-h-[640px] sm:px-8">
          <div className="max-w-2xl animate-fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3 py-1.5 text-[13px] font-bold text-[#FFE27A] backdrop-blur">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              {tr('25 years of quality education', 'Miaka 25 ya elimu bora')}
            </div>
            <h1 className="mt-5 font-display text-[42px] font-extrabold leading-[1.04] sm:text-6xl">{tr('Where young minds grow, and leaders are made.', 'Mahali akili changa hukua, na viongozi huandaliwa.')}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#DCEFE1]">
              {tr(
                'From Nursery to A-Level, we provide a caring and disciplined learning environment that inspires academic excellence, character and Tanzanian values.',
                'Kuanzia Awali hadi Kidato cha Sita, tunatoa mazingira ya upendo na nidhamu yanayochochea ubora wa kitaaluma, tabia njema na maadili ya Kitanzania.',
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-4 font-extrabold text-ink no-underline transition hover:-translate-y-0.5 hover:shadow-xl">
                {tr('Apply for 2027', 'Omba nafasi 2027')} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white no-underline backdrop-blur transition hover:bg-white/10">
                {tr('Discover Green Acres', 'Tufahamu zaidi')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="relative mx-auto -mt-12 max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-4">
          {[
            { v: <span>2000</span>, l: tr('Year founded', 'Mwaka tulioanzishwa') },
            { v: <CountUp to={2} />, l: tr('Campuses: Dar es Salaam and Bunazi', 'Kampasi: Dar es Salaam na Bunazi') },
            { v: <CountUp to={25} suffix="+" />, l: tr('Years of quality education', 'Miaka ya elimu bora') },
            { v: <CountUp to={77} suffix="/77" />, l: tr('Grade A, Standard Seven 2025 (Bunazi)', 'Daraja A, Darasa la Saba 2025 (Bunazi)') },
          ].map((s, k) => (
            <div key={k} className={`p-5 sm:p-6 ${k % 2 === 0 ? 'border-r' : ''} ${k < 2 ? 'border-b lg:border-b-0' : ''} border-paper-2 lg:border-r lg:last:border-r-0`}>
              <div className="font-display text-3xl font-extrabold text-green-600 sm:text-[34px]">{s.v}</div>
              <div className="mt-0.5 text-sm text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* levels */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker={tr('LEVELS', 'NGAZI ZA ELIMU')} title={tr('One journey, from Nursery to A-Level', 'Safari moja, kutoka Awali hadi A-Level')} />
          <Link to="/academics" className="mb-8 inline-flex items-center gap-1 font-bold text-green-600 no-underline hover:underline">
            {tr('All academics', 'Taaluma zote')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l, k) => (
            <Reveal key={l.id} delay={k * 80}>
              <Link to={`/academics#${l.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink no-underline transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-44 overflow-hidden">
                  <Photo name={l.photo} alt="" className="h-full w-full transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                  <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/95 font-display font-extrabold text-green-600">{l.n}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-xs font-bold tracking-wider text-gold-700">{tr(l.ageEn, l.ageSw)}</div>
                  <div className="font-display text-xl font-extrabold">{tr(l.en, l.sw)}</div>
                  <p className="m-0 text-sm leading-relaxed text-ink-3">{tr(l.textEn, l.textSw).split('. ')[0].replace(/\.$/, '')}.</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* why */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <Reveal className="grid items-center gap-10 overflow-hidden rounded-3xl border border-line bg-white p-5 sm:p-10 lg:grid-cols-2">
          <div className="relative grid h-full min-h-[340px] grid-cols-5 grid-rows-2 gap-3">
            <Photo name="learning-in-motion-our-green-acres-teach" alt={tr('A Green Acres teacher with pupils in class', 'Mwalimu wa Green Acres na wanafunzi darasani')} className="col-span-3 row-span-2 h-full w-full rounded-2xl" />
            <Photo name="lab" alt={tr('A pupil in the science lab', 'Mwanafunzi maabara ya sayansi')} className="col-span-2 h-full w-full rounded-2xl" />
            <Photo name="computer-lab" alt={tr('The computer lab', 'Maabara ya kompyuta')} className="col-span-2 h-full w-full rounded-2xl" />
          </div>
          <div>
            <SectionHead kicker={tr('WHY GREEN ACRES', 'KWA NINI GREEN ACRES')} title={tr('Academic excellence, discipline and values', 'Ubora wa kitaaluma, nidhamu na maadili')} />
            <div className="flex flex-col gap-4">
              {why.map((w) => (
                <div key={w.h} className="flex gap-3.5">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-green-50 text-green-600">
                    <w.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-bold">{w.h}</div>
                    <div className="text-sm leading-relaxed text-ink-3">{w.p}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-green-50 p-4">
                <div className="text-xs font-bold tracking-wider text-green-600">{tr('OUR VISION', 'DIRA YETU')}</div>
                <p className="mb-0 mt-1 text-sm leading-relaxed">{tr('To be a leading institution that nurtures holistic development, producing globally competent and ethical citizens.', 'Kuwa taasisi inayoongoza katika kukuza maendeleo kamili, ikizalisha raia wenye uwezo wa kimataifa na maadili.')}</p>
              </div>
              <div className="rounded-2xl bg-gold-50 p-4">
                <div className="text-xs font-bold tracking-wider text-gold-700">{tr('OUR MISSION', 'DHAMIRA YETU')}</div>
                <p className="mb-0 mt-1 text-sm leading-relaxed">{tr('A supportive learning environment that fosters academic excellence, creative thinking and moral integrity.', 'Mazingira ya kujifunzia yanayokuza ubora wa kitaaluma, fikra bunifu na uadilifu.')}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* beyond the classroom */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <SectionHead kicker={tr('CO-CURRICULAR', 'SHUGHULI ZA ZIADA')} title={tr('Learning goes beyond the classroom', 'Kujifunza hakuishii darasani')}>
          {tr('We nurture every child’s talents through activities that build confidence, teamwork and leadership.', 'Tunakuza vipaji vya kila mtoto kupitia shughuli zinazojenga kujiamini, ushirikiano na uongozi.')}
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, k) => (
            <Reveal key={a.photo} delay={k * 80}>
              <div className="group relative h-80 overflow-hidden rounded-2xl">
                <Photo name={a.photo} alt="" className="h-full w-full transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="font-display text-lg font-extrabold">{tr(a.en, a.sw)}</div>
                  <div className="mt-1 text-sm text-white/85">{tr(a.dEn, a.dSw)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* results highlight + video */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-5">
          <Reveal className="flex flex-col justify-between rounded-3xl bg-green-600 p-8 text-white lg:col-span-2">
            <div>
              <div className="text-xs font-bold tracking-wider text-[#FFE27A]">{tr('RESULTS 2025', 'MATOKEO 2025')}</div>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight">{tr('Top school in Missenyi District', 'Shule ya kwanza Wilaya ya Missenyi')}</h2>
              <p className="mt-3 text-[#DCEFE1]">{tr('Every Bunazi pupil scored Grade A in both Standard Seven (77 of 77) and Grade Four (93 of 93). In Dar es Salaam, 17 of 32 Form Two candidates reached Division I.', 'Kila mwanafunzi wa Bunazi alipata daraja A Darasa la Saba (77 kati ya 77) na Darasa la Nne (93 kati ya 93). Dar es Salaam, watahiniwa 17 kati ya 32 wa Kidato cha Pili walipata daraja la kwanza.')}</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[['77/77', 'PSLE'], ['93/93', 'SFNA'], ['17', 'Div I · F2']].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 px-2 py-3">
                  <div className="font-display text-xl font-extrabold">{v}</div>
                  <div className="text-xs text-white/75">{l}</div>
                </div>
              ))}
            </div>
            <Link to="/results" className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-gold-400 px-5 py-3 font-bold text-ink no-underline">
              {tr('See all results', 'Angalia matokeo yote')} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:col-span-3" delay={120}>
            <VideoTile id="parent-testimonial" title={tr(videos[0].en, videos[0].sw)} onOpen={() => lb.open([{ kind: 'video', name: 'parent-testimonial', caption: tr(videos[0].en, videos[0].sw) }])} className="aspect-video sm:col-span-2" />
            <VideoTile id="dormitory-life" title={tr(videos[1].en, videos[1].sw)} onOpen={() => lb.open([{ kind: 'video', name: 'dormitory-life', caption: tr(videos[1].en, videos[1].sw) }])} className="aspect-video" />
            <VideoTile id="school-nurse" title={tr(videos[2].en, videos[2].sw)} onOpen={() => lb.open([{ kind: 'video', name: 'school-nurse', caption: tr(videos[2].en, videos[2].sw) }])} className="aspect-video" />
          </Reveal>
        </div>
      </section>

      {/* news */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker={tr('NEWS & EVENTS', 'HABARI NA MATUKIO')} title={tr('Latest from our campuses', 'Habari za karibuni')} />
          <Link to="/news" className="mb-8 inline-flex items-center gap-1 font-bold text-green-600 no-underline hover:underline">
            {tr('All news', 'Habari zote')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((p, k) => (
            <Reveal key={p.slug} delay={k * 80}>
              <Link to={`/news/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink no-underline transition hover:-translate-y-1 hover:shadow-lift">
                <div className="h-48 overflow-hidden bg-green-50">{p.cover && <Photo name={p.cover} alt="" className="h-full w-full transition duration-700 group-hover:scale-105" sizes="(min-width:768px) 33vw, 100vw" />}</div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 font-bold text-green-600">{p.category === 'Results' ? tr('Results', 'Matokeo') : tr('News', 'Habari')}</span>
                    <span className="text-ink-3">{niceDate(p.date, lang)}</span>
                  </div>
                  <div className="font-display text-lg font-extrabold leading-snug">{tr(p.title, p.titleSw)}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* photo strip */}
      <section className="py-10" aria-label={tr('Photos from school life', 'Picha za maisha ya shule')}>
        <div className="group relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...STRIP, ...STRIP].map((n, k) => (
              <Link key={k} to="/gallery" tabIndex={k >= STRIP.length ? -1 : 0} aria-hidden={k >= STRIP.length} className="block h-48 w-64 flex-none overflow-hidden rounded-2xl sm:h-56 sm:w-80">
                <img src={thumb(n)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-1 font-bold text-green-600 no-underline hover:underline">
            {tr('Open the gallery', 'Fungua picha zote')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* alumni */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <SectionHead kicker={tr('ALUMNI', 'WAHITIMU')} title={tr('In their own words', 'Kwa maneno yao')} center />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alumniVoices.slice(0, 3).map((a, k) => (
            <Reveal key={a.name} delay={k * 80} className="flex flex-col rounded-2xl border border-line bg-white p-6">
              <Quote className="h-7 w-7 text-gold-400" aria-hidden="true" />
              <p className="mb-5 mt-3 flex-1 text-[15px] leading-relaxed">{tr(a.quoteEn, a.quoteSw)}</p>
              <div className="flex items-center gap-3">
                <img src={thumb(a.photo)} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-bold">{a.name}</div>
                  <div className="text-sm text-ink-3">{tr(a.roleEn, a.roleSw)} · {tr('Green Acres alumnus', 'Mhitimu wa Green Acres')}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-3">
          <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
          <Link to="/alumni" className="font-semibold text-green-600">{tr('Join the alumni network', 'Jiunge na mtandao wa wahitimu')}</Link>
        </div>
      </section>

      <ApplyBanner />
      {lb.node}
    </>
  );
}
