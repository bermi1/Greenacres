import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Award, BookOpen, Download, FlaskConical, GraduationCap, HeartHandshake, Play, Quote, Sparkle, Star } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { doc, img, poster, thumb, video } from '../../lib/media';
import { niceDate } from '../../lib/format';
import { alumniVoices, joiningDocs, levels, posts } from '../../content/site';
import { useDb } from '../../data/db';
import { CountUp, Photo, Reveal, SectionHead, useLightbox } from '../../components/ui';
import { Magnetic, Marquee, Spotlight, Tilt } from '../../components/fx';
import { ApplyBanner } from '../../components/SiteLayout';

const HERO_BG = ['4', 'a-week-back-in-the-groove-at-green-acres', 'lab-3', '1'];

/* ---------------- hero ---------------- */

function Hero() {
  const { tr, lang } = useLang();
  const lb = useLightbox();
  const saved = useDb((t) => t.pages.home?.[lang]);
  const live = saved?.status === 'Published' ? saved : null;
  const [bg, setBg] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 18 });
  const px = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 120, damping: 18 });
  const py = useSpring(useTransform(my, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setBg((x) => (x + 1) % HERO_BG.length), 6000);
    return () => clearInterval(t);
  }, []);

  const heading = live?.heading;
  const lead = live?.intro || tr('From Nursery to A-Level, a caring and disciplined place that inspires academic excellence, character and Tanzanian values. Two campuses, one family, since 2000.', 'Kuanzia Awali hadi A-Level, mahali pa upendo na nidhamu panapochochea ubora wa kitaaluma, tabia njema na maadili ya Kitanzania. Kampasi mbili, familia moja, tangu 2000.');

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-green-950 text-white"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20" aria-hidden="true">
        <AnimatePresence>
          <motion.img key={HERO_BG[bg]} src={img(HERO_BG[bg])} alt="" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 0.38, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1.6 }, scale: { duration: 7, ease: 'easeOut' } }} className="absolute inset-0 h-[120%] w-full object-cover" />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_20%,rgba(245,196,0,.20),transparent_60%),linear-gradient(100deg,#04190C_15%,rgba(7,43,21,.85)_55%,rgba(7,43,21,.4))]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pt-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-4 text-[13px] font-semibold backdrop-blur">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inset-0 animate-pulseRing rounded-full bg-gold-400" /><span className="relative h-2.5 w-2.5 rounded-full bg-gold-400" /></span>
            {tr('Form One 2027 admission is open', 'Udahili wa Kidato cha Kwanza 2027 uko wazi')}
          </motion.div>

          <h1 className="mt-7 font-display text-[50px] leading-[0.98] tracking-tight sm:text-[84px] text-balance">
            {heading ? (
              heading
            ) : (
              <>
                {[tr('Where young minds', 'Mahali akili changa')].map((w) => (
                  <motion.span key={w} className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
                ))}
                <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
                  <em className="shine animate-shimmer">{tr('grow', 'hukua')}</em>{tr(', and leaders', ', na viongozi')}
                </motion.span>
                <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
                  {tr('are ', '')}<em className="text-gold-400">{tr('made.', 'huandaliwa.')}</em>
                </motion.span>
              </>
            )}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{lead}</motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link to="/apply" className="group inline-flex items-center gap-3 rounded-full bg-gold-400 py-2.5 pl-7 pr-2.5 text-[16px] font-bold text-ink no-underline shadow-glow">
                {live?.cta || tr('Apply for 2027', 'Omba nafasi 2027')}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-400 transition duration-300 group-hover:rotate-[-45deg]"><ArrowRight className="h-5 w-5" /></span>
              </Link>
            </Magnetic>
            <Magnetic>
              <button type="button" onClick={() => lb.open([{ kind: 'video', name: 'parent-testimonial', caption: tr('Why this parent chose Green Acres', 'Kwa nini mzazi huyu alichagua Green Acres') }])} className="group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 font-semibold text-white">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:scale-110 group-hover:bg-white group-hover:text-ink"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
                {tr('Hear from a parent', 'Msikie mzazi')}
              </button>
            </Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {alumniVoices.slice(0, 4).map((a) => <img key={a.photo} src={thumb(a.photo)} alt="" className="h-11 w-11 rounded-full border-2 border-green-950 object-cover" />)}
            </div>
            <div className="text-sm leading-snug text-white/70">
              <div className="flex text-gold-400">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
              {tr('Thousands of graduates since 2000', 'Maelfu ya wahitimu tangu 2000')}
            </div>
          </motion.div>
        </div>

        {/* 3D collage */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="relative mx-auto hidden aspect-[4/5] w-full max-w-[480px] md:block">
          <div className="absolute inset-[8%_14%_6%_6%] overflow-hidden rounded-[32px] shadow-deep ring-1 ring-white/20">
            <img src={img('learning-in-motion-our-green-acres-teach-3')} alt={tr('A Green Acres teacher in class', 'Mwalimu wa Green Acres darasani')} className="h-full w-full object-cover" />
          </div>
          <motion.div style={{ x: px, y: py }} className="absolute right-0 top-0 w-[46%] overflow-hidden rounded-3xl border-4 border-green-950 shadow-deep">
            <img src={thumb('lab-2')} alt="" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <motion.div style={{ x: useTransform(px, (v) => -v), y: useTransform(py, (v) => -v) }} className="absolute -left-6 bottom-[14%] w-[44%] overflow-hidden rounded-3xl border-4 border-green-950 shadow-deep">
            <img src={thumb('act-culture')} alt="" className="aspect-square w-full object-cover" />
          </motion.div>
          <motion.div style={{ x: px }} className="absolute -right-4 bottom-[4%] flex animate-floaty items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 text-ink shadow-deep motion-reduce:animate-none">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400"><Award className="h-6 w-6" /></span>
            <span><span className="block font-display text-2xl leading-none">77/77</span><span className="text-xs text-ink-3">{tr('Grade A · PSLE 2025, Bunazi', 'Daraja A · PSLE 2025, Bunazi')}</span></span>
          </motion.div>
          <motion.div style={{ y: py }} className="absolute -left-3 top-[10%] rounded-2xl bg-green-600/90 px-4 py-3 text-white shadow-deep backdrop-blur [animation-delay:1.5s] animate-floaty motion-reduce:animate-none">
            <div className="font-display text-3xl leading-none">25<span className="text-gold-400">+</span></div>
            <div className="text-xs text-white/80">{tr('years of excellence', 'miaka ya ubora')}</div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold tracking-[.2em] text-white/60 no-underline sm:flex">
        {tr('SCROLL', 'SHUKA')}
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2"><motion.span animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-2 w-1 rounded-full bg-gold-400" /></span>
      </motion.a>
      {lb.node}
    </section>
  );
}

/* ---------------- values band ---------------- */

function ValuesBand() {
  const { tr } = useLang();
  const words = tr('Discipline|Excellence|Integrity|Leadership|Compassion|Tanzanian values|Curiosity', 'Nidhamu|Ubora|Uadilifu|Uongozi|Huruma|Maadili ya Kitanzania|Udadisi').split('|');
  return (
    <div className="overflow-hidden py-3"><div className="-mx-4 -rotate-1 bg-gold-400 py-5 text-ink shadow-lg">
      <Marquee speed={35}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl italic sm:text-4xl">
            {w}
            <Sparkle className="h-6 w-6 fill-current" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div></div>
  );
}

/* ---------------- sticky journey ---------------- */

function JourneyStep({ i, onActive, children }: { i: number; onActive: (i: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return <div ref={ref}>{children}</div>;
}

function Journey() {
  const { tr, lang } = useLang();
  const [active, setActive] = useState(0);
  const l = levels[active];
  return (
    <section id="journey" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-8 sm:py-32">
      <SectionHead kicker={tr('ONE JOURNEY', 'SAFARI MOJA')} title={<>{tr('From first steps', 'Kutoka hatua za kwanza')} <em className="text-green-600">{tr('to future leaders.', 'hadi viongozi wa kesho.')}</em></>}>
        {tr('We walk with every child from Nursery to A-Level, on one campus family.', 'Tunatembea na kila mtoto kutoka Awali hadi A-Level, ndani ya familia moja.')}
      </SectionHead>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="sticky top-28 h-[560px] overflow-hidden rounded-[36px] shadow-deep">
            <AnimatePresence mode="popLayout">
              <motion.img key={l.photo} src={img(l.photo)} alt="" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <AnimatePresence mode="wait">
                <motion.div key={l.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <div className="text-xs font-bold tracking-[.2em] text-gold-400">{tr(l.ageEn, l.ageSw)}</div>
                  <div className="font-display text-4xl">{tr(l.en, l.sw)}</div>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-1.5">{levels.map((x, k) => <span key={x.id} className={`h-1.5 rounded-full transition-all duration-500 ${k === active ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/50'}`} />)}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:gap-[30vh] lg:py-[12vh]">
          {levels.map((x, k) => (
            <JourneyStep key={x.id} i={k} onActive={setActive}>
              <div className={`rounded-[32px] border p-7 transition-all duration-500 sm:p-9 ${k === active ? 'border-green-600/30 bg-white shadow-card' : 'border-line bg-white/50 lg:opacity-50'}`}>
                <img src={thumb(x.photo)} alt="" className="mb-6 aspect-video w-full rounded-2xl object-cover lg:hidden" loading="lazy" />
                <div className="flex items-center gap-4">
                  <span className="font-display text-6xl leading-none text-green-600/20">{x.n}</span>
                  <div>
                    <div className="text-xs font-bold tracking-[.2em] text-clay-500">{tr(x.ageEn, x.ageSw)}</div>
                    <h3 className="m-0 font-display text-3xl">{tr(x.en, x.sw)}</h3>
                  </div>
                </div>
                <p className="mb-0 mt-5 text-lg leading-relaxed text-ink-2">{tr(x.textEn, x.textSw)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(lang === 'sw' ? x.pointsSw : x.pointsEn).map((p) => <span key={p} className="rounded-full bg-paper-2 px-3.5 py-1.5 text-sm font-medium">{p}</span>)}
                </div>
                <Link to={`/academics#${x.id}`} className="mt-6 inline-flex items-center gap-1.5 font-bold text-green-700 no-underline hover:gap-3 transition-all">{tr('Explore', 'Gundua')} {tr(x.en, x.sw)} <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </JourneyStep>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- stats ---------------- */

function Stats() {
  const { tr } = useLang();
  const items = [
    { v: <span>2000</span>, l: tr('Founded in Dar es Salaam', 'Ilianzishwa Dar es Salaam') },
    { v: <CountUp to={2} />, l: tr('Campuses, Salasala and Bunazi', 'Kampasi, Salasala na Bunazi') },
    { v: <CountUp to={93} suffix="/93" />, l: tr('Grade A in Grade Four, Bunazi 2025', 'Daraja A Darasa la Nne, Bunazi 2025') },
    { v: <CountUp to={1} suffix="st" />, l: tr('Top school in Missenyi District', 'Shule ya kwanza Wilaya ya Missenyi') },
  ];
  return (
    <Spotlight className="grain overflow-hidden bg-green-900 text-white">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-px px-4 sm:px-8 lg:grid-cols-4">
        {items.map((s, k) => (
          <Reveal key={k} delay={k * 90} className="border-white/10 py-12 lg:border-l lg:px-8 lg:first:border-l-0">
            <div className="font-display text-6xl text-gold-400 sm:text-7xl">{s.v}</div>
            <div className="mt-3 max-w-[220px] text-white/70">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </Spotlight>
  );
}

/* ---------------- level finder (working tool) ---------------- */

const AGE_RULES: { min: number; max: number; id: string; en: string; sw: string; doc?: number }[] = [
  { min: 3, max: 5, id: 'nur', en: 'Nursery', sw: 'Awali', doc: 0 },
  { min: 6, max: 8, id: 'pri', en: 'Primary, Grades 1 to 3', sw: 'Msingi, Darasa 1 hadi 3', doc: 1 },
  { min: 9, max: 10, id: 'pri', en: 'Primary, Grades 4 and 5', sw: 'Msingi, Darasa 4 na 5', doc: 2 },
  { min: 11, max: 12, id: 'pri', en: 'Primary, Grades 6 and 7', sw: 'Msingi, Darasa 6 na 7', doc: 3 },
  { min: 13, max: 14, id: 'f1', en: 'Form One (or Pre-Form 1)', sw: 'Kidato cha Kwanza (au Pre-Form 1)', doc: 4 },
  { min: 15, max: 16, id: 'f1', en: 'Secondary transfer (Form Two to Four)', sw: 'Uhamisho wa sekondari (Kidato cha 2 hadi 4)', doc: 4 },
  { min: 17, max: 19, id: 'f5', en: 'Form Five, A-Level (or Pre-Form 5)', sw: 'Kidato cha Tano, A-Level (au Pre-Form 5)', doc: 4 },
];

function LevelFinder() {
  const { tr } = useLang();
  const [year, setYear] = useState(2014);
  const [mode, setMode] = useState<'board' | 'day'>('board');
  const age = 2027 - year;
  const rule = AGE_RULES.find((r) => age >= r.min && age <= r.max);
  const docIdx = rule?.doc === 4 ? (mode === 'board' ? 4 : 5) : rule?.doc;
  const d = docIdx !== undefined ? joiningDocs[docIdx] : undefined;
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <div className="grid overflow-hidden rounded-[40px] bg-white shadow-card lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <SectionHead kicker={tr('PLAN AHEAD', 'PANGA MAPEMA')} title={<>{tr('Which class for', 'Darasa gani kwa')} <em className="text-green-600">{tr('your child?', 'mtoto wako?')}</em></>}>
            {tr('Slide to your child’s year of birth. We will suggest the level for the 2027 school year and the right joining instructions.', 'Telezesha hadi mwaka wa kuzaliwa wa mtoto. Tutapendekeza darasa la mwaka 2027 na maelekezo sahihi ya kujiunga.')}
          </SectionHead>
          <label htmlFor="yob" className="flex items-baseline justify-between text-sm font-bold text-ink-2">
            {tr('Year of birth', 'Mwaka wa kuzaliwa')}
            <span className="font-display text-5xl text-ink">{year}</span>
          </label>
          <input id="yob" type="range" min={2007} max={2024} value={year} onChange={(e) => setYear(Number(e.target.value))} className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-2 accent-green-600" />
          <div className="mt-2 flex justify-between text-xs text-ink-3"><span>2007</span><span>2024</span></div>
          <div className="mt-6 inline-flex rounded-full bg-paper-2 p-1">
            {(['board', 'day'] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={`relative min-h-[40px] rounded-full px-5 text-sm font-semibold ${mode === m ? 'text-white' : 'text-ink-2'}`}>
                {mode === m && <motion.span layoutId="mode-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" />}
                <span className="relative">{m === 'board' ? tr('Boarding', 'Bweni') : tr('Day', 'Kutwa')}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grain relative flex flex-col justify-between bg-green-800 p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/25 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={(rule?.en ?? 'none') + mode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative">
              <div className="text-xs font-bold tracking-[.2em] text-gold-400">{tr(`AGE ${age} IN 2027`, `UMRI ${age} MWAKA 2027`)}</div>
              <div className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{rule ? tr(rule.en, rule.sw) : age < 3 ? tr('A little early, see you soon', 'Bado mapema kidogo') : tr('Talk to our office', 'Ongea na ofisi yetu')}</div>
              <p className="mt-4 text-white/70">{rule ? tr('A guide only. The admissions office confirms placement after the interview.', 'Ni mwongozo tu. Ofisi ya udahili inathibitisha baada ya usaili.') : tr('Call +255 782 128 633 and we will guide you.', 'Piga +255 782 128 633 tutakuongoza.')}</p>
            </motion.div>
          </AnimatePresence>
          <div className="relative mt-8 flex flex-col gap-3">
            {d && (
              <a href={doc(d.file)} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white no-underline ring-1 ring-white/15 transition hover:bg-white/15">
                <Download className="h-5 w-5 text-gold-400" />
                <span className="flex-1"><span className="block text-xs text-white/60">{tr('Joining instructions 2027', 'Maelekezo ya kujiunga 2027')}</span><span className="font-semibold">{tr(d.en, d.sw)}</span></span>
                <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
              </a>
            )}
            {rule && (
              <Link to={`/apply?level=${rule.id}&mode=${mode}`} className="group inline-flex items-center justify-between rounded-2xl bg-gold-400 p-4 font-bold text-ink no-underline">
                {tr('Start this application', 'Anza maombi haya')} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- bento with hover video ---------------- */

function VideoBento({ id, title, className }: { id: string; title: string; className: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const lb = useLightbox();
  return (
    <>
      <button type="button" onClick={() => lb.open([{ kind: 'video', name: id, caption: title }])} onMouseEnter={() => void v.current?.play().catch(() => {})} onMouseLeave={() => v.current?.pause()} className={`group relative overflow-hidden rounded-[28px] bg-green-950 text-left ${className}`}>
        <video ref={v} src={video(id)} poster={poster(id)} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink transition group-hover:scale-110 group-hover:bg-gold-400"><Play className="ml-0.5 h-5 w-5 fill-current" /></span>
        <span className="absolute bottom-5 left-5 right-5 font-display text-2xl text-white">{title}</span>
      </button>
      {lb.node}
    </>
  );
}

function Life() {
  const { tr } = useLang();
  const tile = 'group relative overflow-hidden rounded-[28px] text-white no-underline';
  const cap = (k: string, t: string) => (
    <span className="absolute bottom-5 left-5 right-5">
      <span className="block text-xs font-bold tracking-[.2em] text-gold-400">{k}</span>
      <span className="mt-1 flex items-center justify-between font-display text-2xl">{t}<ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" /></span>
    </span>
  );
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <SectionHead kicker={tr('LIFE AT GREEN ACRES', 'MAISHA YA GREEN ACRES')} title={<>{tr('Learning goes', 'Kujifunza')} <em className="text-green-600">{tr('far beyond', 'kunavuka')}</em> {tr('the classroom.', 'darasa.')}</>} />
      <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <VideoBento id="dormitory-life" title={tr('A day in the dormitory', 'Siku moja bwenini')} className="sm:col-span-2 sm:row-span-2" />
        <Link to="/gallery" className={`${tile} lg:row-span-2`}>
          <Photo name="act-culture" alt="" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-green-950/85 to-transparent" />
          {cap(tr('CULTURE', 'UTAMADUNI'), tr('Cultural Day', 'Siku ya Utamaduni'))}
        </Link>
        <Link to="/facilities" className={tile}>
          <Photo name="lab" alt="" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-green-950/85 to-transparent" />
          {cap(tr('SCIENCE', 'SAYANSI'), tr('Hands-on labs', 'Maabara kwa vitendo'))}
        </Link>
        <Link to="/academics" className={tile}>
          <Photo name="act-scouting" alt="" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-green-950/85 to-transparent" />
          {cap(tr('CLUBS', 'KLABU'), tr('Scouting and sport', 'Skauti na michezo'))}
        </Link>
        <Link to="/gallery" className={`${tile} sm:col-span-2`}>
          <Photo name="dsc2070-2" alt="" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-green-950/85 to-transparent" />
          {cap(tr('CAREER DAY 2025', 'SIKU YA TAALUMA 2025'), tr('Dreaming out loud', 'Ndoto kwa sauti'))}
        </Link>
        <VideoBento id="school-nurse" title={tr('Our school nurse', 'Muuguzi wetu')} className="" />
        <div className="flex flex-col justify-between rounded-[28px] bg-gold-400 p-6">
          <HeartHandshake className="h-8 w-8" />
          <div>
            <div className="font-display text-2xl leading-tight">{tr('Sponsoring four students fully', 'Tunafadhili wanafunzi wanne kikamilifu')}</div>
            <Link to="/news/green-acres-schools-honored-for-compassionate-contribution-at-upendo-wa-yatima-kwa-mama-event" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-ink no-underline">{tr('Read the story', 'Soma habari')} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- results ---------------- */

function ResultsBlock() {
  const { tr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const bars = [['Division I', 17], ['Division II', 4], ['Division III', 7], ['Division IV', 4]] as const;
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead kicker={tr('RESULTS 2025', 'MATOKEO 2025')} title={<>{tr('Results that', 'Matokeo yanayo')} <em className="text-green-600">{tr('speak for us.', 'tusemea.')}</em></>}>
            {tr('Every Bunazi pupil scored Grade A in Standard Seven and Grade Four, making it the top school in Missenyi District. In Dar es Salaam, more than half of Form Two reached Division I.', 'Kila mwanafunzi wa Bunazi alipata daraja A Darasa la Saba na la Nne, na kuifanya shule ya kwanza Wilaya ya Missenyi. Dar es Salaam, zaidi ya nusu ya Kidato cha Pili walipata daraja la kwanza.')}
          </SectionHead>
          <Link to="/results" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2.5 pl-6 pr-2.5 font-bold text-white no-underline">
            {tr('All results', 'Matokeo yote')}<span className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-ink transition group-hover:rotate-[-45deg]"><ArrowRight className="h-5 w-5" /></span>
          </Link>
        </div>
        <div ref={ref} className="rounded-[36px] bg-white p-8 shadow-card sm:p-10">
          <div className="flex items-baseline justify-between">
            <div className="font-display text-2xl">{tr('Form Two, 2025', 'Kidato cha Pili, 2025')}</div>
            <div className="text-sm text-ink-3">{tr('32 candidates', 'Watahiniwa 32')}</div>
          </div>
          <div className="mt-8 flex flex-col gap-5">
            {bars.map(([label, n], k) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm font-semibold"><span>{label}</span><span className="tabular-nums">{n}</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-paper-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: seen ? `${(n / 17) * 100}%` : 0 }} transition={{ delay: k * 0.12, duration: 1, ease: [0.2, 0.7, 0.2, 1] }} className={`h-full rounded-full ${k === 0 ? 'bg-gradient-to-r from-green-600 to-green-400' : 'bg-green-200'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gold-50 p-4"><div className="font-display text-4xl">77/77</div><div className="text-xs text-ink-3">{tr('Grade A · Standard Seven, Bunazi', 'Daraja A · Darasa la Saba, Bunazi')}</div></div>
            <div className="rounded-2xl bg-green-50 p-4"><div className="font-display text-4xl">289.57</div><div className="text-xs text-ink-3">{tr('Bunazi school average, PSLE', 'Wastani wa Bunazi, PSLE')}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- testimonials (drag) ---------------- */

function Voices() {
  const { tr } = useLang();
  const track = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const on = () => track.current && setWidth(Math.max(0, track.current.scrollWidth - track.current.offsetWidth));
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return (
    <section className="overflow-hidden bg-paper-2 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker={tr('ALUMNI VOICES', 'SAUTI ZA WAHITIMU')} title={<>{tr('Once Green Acres,', 'Mara moja Green Acres,')} <em className="text-green-600">{tr('always family.', 'daima familia.')}</em></>} />
          <div className="mb-10 hidden items-center gap-2 text-sm font-semibold text-ink-3 sm:flex">{tr('Drag to explore', 'Buruta kuona zaidi')} <ArrowRight className="h-4 w-4" /></div>
        </div>
        <div ref={track} className="cursor-grab active:cursor-grabbing">
          <motion.div drag="x" dragConstraints={{ left: -width, right: 0 }} dragElastic={0.08} className="flex gap-5">
            {alumniVoices.map((a, k) => (
              <motion.figure key={a.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.08 }} className={`m-0 flex w-[300px] flex-none select-none flex-col rounded-[32px] p-8 sm:w-[380px] ${k % 2 ? 'bg-green-900 text-white' : 'bg-white'}`}>
                <Quote className={`h-9 w-9 ${k % 2 ? 'text-gold-400' : 'text-clay-500'}`} />
                <blockquote className="m-0 mt-5 flex-1 font-display text-[22px] leading-snug">{tr(a.quoteEn, a.quoteSw)}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <img src={thumb(a.photo)} alt="" draggable={false} className="h-14 w-14 rounded-full object-cover" />
                  <span><span className="block font-bold">{a.name}</span><span className={`text-sm ${k % 2 ? 'text-white/60' : 'text-ink-3'}`}>{tr(a.roleEn, a.roleSw)}</span></span>
                </figcaption>
              </motion.figure>
            ))}
            <Link to="/alumni" className="flex w-[260px] flex-none flex-col justify-between rounded-[32px] bg-gold-400 p-8 text-ink no-underline">
              <GraduationCap className="h-10 w-10" />
              <span className="font-display text-3xl leading-tight">{tr('Join the alumni network', 'Jiunge na mtandao wa wahitimu')} <ArrowUpRight className="inline h-7 w-7" /></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- news ---------------- */

function News() {
  const { tr, lang } = useLang();
  const status = useDb((t) => t.postStatus);
  const latest = useMemo(() => posts.filter((p) => (status[p.slug] ?? 'Published') === 'Published').slice(0, 3), [status]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHead kicker={tr('NEWS', 'HABARI')} title={<>{tr('Latest from', 'Habari kutoka')} <em className="text-green-600">{tr('our campuses.', 'kampasi zetu.')}</em></>} />
        <Link to="/news" className="mb-10 inline-flex items-center gap-1.5 font-bold text-green-700 no-underline">{tr('All news', 'Habari zote')} <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((p, k) => (
          <Reveal key={p.slug} delay={k * 100}>
            <Tilt max={6} className="h-full rounded-[28px]">
              <Link to={`/news/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white text-ink no-underline shadow-card">
                <div className="relative h-60 overflow-hidden">
                  {p.cover && <Photo name={p.cover} alt="" className="h-full w-full transition duration-700 group-hover:scale-110" sizes="(min-width:768px) 33vw, 100vw" />}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold backdrop-blur">{p.category === 'Results' ? tr('Results', 'Matokeo') : tr('News', 'Habari')}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs font-semibold text-ink-3">{niceDate(p.date, lang)}</div>
                  <div className="mt-2 flex-1 font-display text-2xl leading-snug">{tr(p.title, p.titleSw)}</div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-green-700 transition-all group-hover:gap-3">{tr('Read story', 'Soma habari')} <ArrowRight className="h-4 w-4" /></div>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- why ---------------- */

function Pillars() {
  const { tr } = useLang();
  const items = [
    { icon: BookOpen, h: tr('A reading culture', 'Utamaduni wa kusoma'), p: tr('Libraries, literature talks and mentorship build lifelong readers.', 'Maktaba, mazungumzo ya fasihi na ushauri hujenga wasomaji wa maisha.'), photo: 'act-competitions' },
    { icon: FlaskConical, h: tr('Hands-on science', 'Sayansi kwa vitendo'), p: tr('Physics, Chemistry and Biology labs and a fast computer lab.', 'Maabara za Fizikia, Kemia, Biolojia na ya kompyuta yenye kasi.'), photo: 'lab-4' },
    { icon: HeartHandshake, h: tr('Safe and cared for', 'Salama na kutunzwa'), p: tr('Supervised boarding and an on-campus dispensary.', 'Bweni linalosimamiwa na zahanati ndani ya shule.'), photo: 'domitory' },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it, k) => (
          <Reveal key={it.h} delay={k * 100}>
            <Tilt max={8} className="rounded-[32px]">
              <div className="group relative h-[320px] overflow-hidden rounded-[32px] bg-green-900 text-white md:h-[420px]">
                <Photo name={it.photo} alt="" className="absolute inset-0 h-full w-full opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7" style={{ transform: 'translateZ(40px)' }}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-ink"><it.icon className="h-6 w-6" /></span>
                  <div className="mt-5 font-display text-3xl">{it.h}</div>
                  <p className="mb-0 mt-2 overflow-hidden text-white/75 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100">{it.p}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesBand />
      <Pillars />
      <Journey />
      <Stats />
      <LevelFinder />
      <Life />
      <ResultsBlock />
      <Voices />
      <News />
      <ApplyBanner />
    </>
  );
}
