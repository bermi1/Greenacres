import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Facebook, Instagram, Menu, MessageCircle, Twitter, X } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { thumb } from '../lib/media';
import { campuses, school } from '../content/site';
import { db } from '../data/db';

export function Crest({ className = 'h-11 w-11' }: { className?: string }) {
  return <img src="/brand/crest-192.png" alt="" className={`${className} flex-none rounded-xl bg-white object-contain p-0.5`} />;
}

export function LangToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language / Lugha" className={`relative flex rounded-full p-[3px] ${dark ? 'bg-white/10 ring-1 ring-white/20' : 'bg-paper-2'}`}>
      {(['en', 'sw'] as const).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={`relative z-10 min-h-[32px] w-10 rounded-full text-xs font-bold transition-colors ${lang === l ? 'text-ink' : dark ? 'text-white/80' : 'text-ink-2'}`}>
          {lang === l && <motion.span layoutId={dark ? 'lang-d' : 'lang-l'} className="absolute inset-0 -z-10 rounded-full bg-gold-400" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

type Item = { to: string; en: string; sw: string; dEn?: string; dSw?: string; photo?: string };
type Group = { en: string; sw: string; to?: string; items?: Item[] };

const MENU: Group[] = [
  { en: 'About', sw: 'Kuhusu', items: [
    { to: '/about', en: 'Our story', sw: 'Historia yetu', dEn: '25 years, two campuses, one family', dSw: 'Miaka 25, kampasi mbili, familia moja', photo: 'jacklyne-siima-rushaigo' },
    { to: '/facilities', en: 'Facilities', sw: 'Miundombinu', dEn: 'Labs, boarding, dispensary, sports', dSw: 'Maabara, bweni, zahanati, michezo', photo: 'lab-3' },
    { to: '/alumni', en: 'Alumni', sw: 'Wahitimu', dEn: 'Once Green Acres, always family', dSw: 'Daima familia ya Green Acres', photo: 'get' },
  ] },
  { en: 'Learning', sw: 'Taaluma', items: [
    { to: '/academics', en: 'Academics', sw: 'Taaluma', dEn: 'Nursery to A-Level', dSw: 'Awali hadi A-Level', photo: 'learning-in-motion-our-green-acres-teach' },
    { to: '/results', en: 'Results', sw: 'Matokeo', dEn: 'National examination results', dSw: 'Matokeo ya mitihani ya taifa', photo: 'graduation' },
  ] },
  { en: 'Admissions', sw: 'Udahili', to: '/admissions' },
  { en: 'School life', sw: 'Maisha shuleni', items: [
    { to: '/news', en: 'News and events', sw: 'Habari na matukio', dEn: 'Stories from our campuses', dSw: 'Habari kutoka kampasi zetu', photo: 'p1336273-1' },
    { to: '/gallery', en: 'Gallery', sw: 'Picha', dEn: 'Photos and videos', dSw: 'Picha na video', photo: 'dsc2070-2' },
  ] },
  { en: 'Contact', sw: 'Mawasiliano', to: '/contact' },
];
const MOBILE: Item[] = [{ to: '/', en: 'Home', sw: 'Nyumbani' }, ...MENU.flatMap((g) => g.items ?? [{ to: g.to!, en: g.en, sw: g.sw }])];
const HERO_ROUTES = /^\/($|about|academics|admissions|facilities|results|news|gallery|alumni|contact)/;

function Dropdown({ g, light }: { g: Group; light: boolean }) {
  const { tr } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const t = useRef<number>();
  const active = g.items ? g.items.some((i) => pathname.startsWith(i.to)) : pathname === g.to;
  const cls = `relative inline-flex min-h-[44px] items-center gap-1 rounded-full px-3.5 text-[14px] font-semibold no-underline transition-colors ${light ? (active ? 'text-white' : 'text-white/85 hover:text-white') : active ? 'text-green-700' : 'text-ink-2 hover:text-ink'}`;
  const dot = active && <motion.span layoutId="nav-dot" className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${light ? 'bg-gold-400' : 'bg-green-600'}`} />;
  if (!g.items) return <NavLink to={g.to!} className={cls}>{tr(g.en, g.sw)}{dot}</NavLink>;
  return (
    <div className="relative" onMouseEnter={() => { clearTimeout(t.current); setOpen(true); }} onMouseLeave={() => { t.current = window.setTimeout(() => setOpen(false), 120); }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className={cls}>
        {tr(g.en, g.sw)} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />{dot}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute left-1/2 top-full z-50 w-[min(560px,90vw)] -translate-x-1/2 pt-3">
            <div className="grid gap-1.5 rounded-3xl border border-line bg-white/95 p-2.5 shadow-deep backdrop-blur-xl" style={{ gridTemplateColumns: `repeat(${Math.min(g.items.length, 3)}, minmax(0, 1fr))` }}>
              {g.items.map((i) => (
                <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="group rounded-2xl p-2 text-ink no-underline transition hover:bg-paper">
                  <div className="h-24 overflow-hidden rounded-xl"><img src={thumb(i.photo!)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /></div>
                  <div className="mt-2.5 flex items-center justify-between px-1 font-bold">{tr(i.en, i.sw)}<ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" /></div>
                  <div className="px-1 pb-1 text-xs text-ink-3">{tr(i.dEn!, i.dSw!)}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const { tr } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  const light = HERO_ROUTES.test(pathname) && !scrolled && !open;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${light ? 'bg-transparent' : 'border-b border-line/70 bg-paper/85 shadow-[0_8px_30px_-12px_rgba(4,25,12,.25)] backdrop-blur-xl'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className={`flex flex-none items-center gap-3 whitespace-nowrap no-underline ${light ? 'text-white' : 'text-ink'}`}>
            <Crest className="h-11 w-11 shadow-sm" />
            <span className="leading-none">
              <span className="block font-display text-[21px] font-semibold">Green Acres</span>
              <span className={`mt-1 block text-[10.5px] font-bold tracking-[.2em] ${light ? 'text-white/70' : 'text-ink-3'}`}>SCHOOLS · TANZANIA</span>
            </span>
          </Link>
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {MENU.map((g) => <Dropdown key={g.en} g={g} light={light} />)}
          </nav>
          <div className="flex flex-none items-center gap-2">
            <div className="hidden sm:block"><LangToggle dark={light} /></div>
            <Link to="/apply" className="group hidden items-center gap-2 rounded-full bg-gold-400 py-2 pl-5 pr-2 text-sm font-bold text-ink no-underline shadow-glow transition hover:-translate-y-0.5 sm:inline-flex">
              {tr('Apply 2027', 'Omba 2027')}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-gold-400 transition group-hover:rotate-[-45deg]"><ArrowRight className="h-4 w-4" /></span>
            </Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={tr('Menu', 'Menyu')} className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${light ? 'bg-white/15 text-white backdrop-blur' : 'bg-ink text-white'}`}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" initial={{ clipPath: 'circle(0% at 92% 4%)' }} animate={{ clipPath: 'circle(150% at 92% 4%)' }} exit={{ clipPath: 'circle(0% at 92% 4%)' }} transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }} className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-green-900 px-6 pb-8 pt-24 text-white lg:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {MOBILE.map((n, k) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.04 }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex items-center justify-between border-b border-white/10 py-3.5 font-display text-[28px] no-underline ${isActive ? 'text-gold-400' : 'text-white'}`}>
                    {tr(n.en, n.sw)} <ArrowUpRight className="h-5 w-5 opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LangToggle dark />
              <Link to="/apply" className="rounded-full bg-gold-400 px-5 py-3 text-sm font-bold text-ink no-underline">{tr('Apply for 2027', 'Omba nafasi 2027')}</Link>
              <Link to="/parent" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white no-underline">Parent Hub</Link>
            </div>
            <a href="tel:+255739222237" className="mt-auto pt-10 text-white/70 no-underline">{school.phoneMain}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ApplyBanner() {
  const { tr } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
      <div className="grain relative overflow-hidden rounded-[36px] bg-green-900 px-7 py-12 text-white sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-400/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-green-500/40 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[.2em] text-gold-400">{tr('ADMISSIONS 2027 · NOW OPEN', 'UDAHILI 2027 · UKO WAZI')}</div>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl text-balance">{tr('Give your child a place to', 'Mpe mtoto wako mahali pa')} <em className="text-gold-400">{tr('grow and lead.', 'kukua na kuongoza.')}</em></h2>
            <p className="mb-0 mt-4 text-lg text-white/75">{tr('Apply online in about ten minutes and follow every step by SMS. Or call us on +255 739 222 237.', 'Omba mtandaoni kwa takribani dakika kumi na ufuatilie kila hatua kwa SMS. Au tupigie +255 739 222 237.')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/apply" className="group inline-flex items-center gap-3 rounded-full bg-gold-400 py-2.5 pl-6 pr-2.5 font-bold text-ink no-underline shadow-glow transition hover:-translate-y-0.5">
              {tr('Start application', 'Anza maombi')}<span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-gold-400 transition group-hover:rotate-[-45deg]"><ArrowRight className="h-5 w-5" /></span>
            </Link>
            <Link to="/contact" className="inline-flex items-center rounded-full border border-white/30 px-6 font-semibold text-white no-underline hover:bg-white/10">{tr('Book a visit', 'Panga ziara')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { tr } = useLang();
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);
  const join = (e: FormEvent) => {
    e.preventDefault();
    db.subscribe(contact.trim());
    setDone(true);
  };
  const link = 'block py-1 text-white/70 no-underline transition hover:translate-x-1 hover:text-white';
  return (
    <footer className="grain relative overflow-hidden bg-green-950 text-white">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <img src="/brand/logo-white.png" alt="Green Acres Schools" className="h-20 w-auto" />
            <p className="mt-4 max-w-sm text-white/70">{tr('Nursery to A-Level since 2000. Where young minds grow, and leaders are made.', 'Awali hadi A-Level tangu 2000. Mahali akili changa hukua, na viongozi huandaliwa.')}</p>
            <form onSubmit={join} className="mt-6 max-w-sm">
              <label htmlFor="ft-sub" className="text-sm font-bold">{tr('School news by SMS or email', 'Habari za shule kwa SMS au barua pepe')}</label>
              {done ? (
                <div className="mt-2 flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm"><Check className="h-4 w-4 text-gold-400" />{tr('You are subscribed. Asante!', 'Umejisajili. Asante!')}</div>
              ) : (
                <div className="mt-2 flex rounded-full bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-gold-400">
                  <input id="ft-sub" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder={tr('Phone or email', 'Simu au barua pepe')} className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/50" />
                  <button type="submit" className="rounded-full bg-gold-400 px-4 py-2.5 text-sm font-bold text-ink">{tr('Subscribe', 'Jisajili')}</button>
                </div>
              )}
            </form>
          </div>
          {campuses.map((c) => (
            <div key={c.id}>
              <div className="text-xs font-bold tracking-[.2em] text-gold-400">{c.name.toUpperCase()}</div>
              <div className="mt-3 text-white/70">{c.address}</div>
              {c.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={link}>{p}</a>)}
              <a href={`mailto:${c.email}`} className={link}>{c.email}</a>
            </div>
          ))}
          <div>
            <div className="text-xs font-bold tracking-[.2em] text-gold-400">{tr('EXPLORE', 'GUNDUA')}</div>
            <div className="mt-2">
              <Link to="/admissions" className={link}>{tr('Admissions 2027', 'Udahili 2027')}</Link>
              <Link to="/results" className={link}>{tr('Results', 'Matokeo')}</Link>
              <Link to="/news" className={link}>{tr('News and events', 'Habari na matukio')}</Link>
              <Link to="/parent" className={link}>Parent Hub</Link>
              <Link to="/cms" className={link}>{tr('Staff sign in', 'Ingia (watumishi)')}</Link>
            </div>
            <div className="mt-4 flex gap-2">
              {[[school.social.instagram, Instagram, 'Instagram'], [school.social.facebook, Facebook, 'Facebook'], [school.social.x, Twitter, 'X']].map(([href, Icon, label]) => {
                const I = Icon as typeof Instagram;
                return <a key={label as string} href={href as string} aria-label={label as string} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-gold-400 hover:text-ink"><I className="h-5 w-5" /></a>;
              })}
            </div>
          </div>
        </div>
        <div className="select-none py-6 text-center font-display text-[18vw] leading-[0.8] text-white/[.06] lg:text-[200px]" aria-hidden="true">Green Acres</div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Green Acres Schools Tanzania</span>
          <Link to="/system" className="text-white/60 no-underline hover:text-white">{tr('Smart School System by Bermi Techs', 'Mfumo wa Shule Janja na Bermi Techs')}</Link>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  const { tr } = useLang();
  return (
    <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer" aria-label={tr('Chat with us on WhatsApp', 'Ongea nasi WhatsApp')} className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1FAF5A] text-white shadow-deep">
      <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#1FAF5A] motion-reduce:hidden" aria-hidden="true" />
      <MessageCircle className="relative h-6 w-6" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 sm:block">{tr('Questions? Chat with us', 'Maswali? Ongea nasi')}</span>
    </a>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useEffect(() => {
    // braces matter: newer browsers return a Promise from scrollTo, which React would treat as a cleanup
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-clay-400" aria-hidden="true" />
      <Header />
      <main id="main" className={HERO_ROUTES.test(pathname) ? '' : 'pt-20'}>
        <motion.div key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}>
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
