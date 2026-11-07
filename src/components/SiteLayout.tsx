import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Twitter, X, ArrowRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { campuses, nav, school } from '../content/site';

export function Crest({ className = 'h-11 w-11' }: { className?: string }) {
  return <img src="/brand/crest-192.png" alt="" className={`${className} flex-none rounded-xl bg-white object-contain p-0.5`} />;
}

export function LangToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  const btn = (l: 'en' | 'sw', label: string) => (
    <button
      type="button"
      aria-pressed={lang === l}
      onClick={() => setLang(l)}
      className={`min-h-[32px] rounded-full px-3 text-xs font-bold transition ${lang === l ? 'bg-green-600 text-white' : dark ? 'text-white/80 hover:text-white' : 'text-ink-2 hover:text-ink'}`}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Language / Lugha" className={`flex gap-0.5 rounded-full p-[3px] ${dark ? 'bg-white/10' : 'bg-paper-2'}`}>
      {btn('en', 'EN')}
      {btn('sw', 'SW')}
    </div>
  );
}

function Header() {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition ${scrolled ? 'border-line bg-white/90 shadow-sm backdrop-blur-md' : 'border-line bg-white'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        <Link to="/" className="flex flex-none items-center gap-2.5 whitespace-nowrap text-ink no-underline">
          <Crest />
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-extrabold">Green Acres Schools</span>
            <span className="block text-[11px] font-semibold tracking-wide text-ink-3">{tr('NURSERY TO A-LEVEL · SINCE 2000', 'AWALI HADI A-LEVEL · TANGU 2000')}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:flex xl:gap-0">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => `whitespace-nowrap rounded-lg px-2 py-2 text-[13.5px] no-underline transition ${isActive ? 'bg-green-50 font-bold text-green-600' : 'font-medium text-ink-2 hover:bg-green-50 hover:text-ink'}`}
            >
              {tr(n.en, n.sw)}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <Link to="/parent" className="hidden whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-green-600 no-underline hover:bg-green-50 lg:block xl:hidden 2xl:block">
            Parent Hub
          </Link>
          <Link to="/apply" className="hidden whitespace-nowrap rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-bold text-ink no-underline transition hover:-translate-y-0.5 hover:shadow-md sm:inline-flex">
            {tr('Apply now', 'Omba sasa')}
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={tr('Menu', 'Menyu')} className="grid h-11 w-11 place-items-center rounded-xl text-ink hover:bg-paper-2 xl:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white xl:hidden animate-pop">
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3 sm:px-8">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => `rounded-xl px-3 py-3 text-[15px] no-underline ${isActive ? 'bg-green-50 font-bold text-green-600' : 'font-medium text-ink-2'}`}
              >
                {tr(n.en, n.sw)}
              </NavLink>
            ))}
          </nav>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 border-t border-line px-4 py-3 sm:px-8">
            <LangToggle />
            <Link to="/parent" className="rounded-xl border border-line-2 px-4 py-2.5 text-sm font-semibold text-ink no-underline">
              Parent Hub
            </Link>
            <Link to="/apply" className="rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-bold text-ink no-underline">
              {tr('Apply now', 'Omba sasa')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function TopBar() {
  const { tr } = useLang();
  return (
    <div className="bg-green-800 text-[13px] text-[#CFE6D5]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 sm:px-8">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Mbezi Beach, Salasala · Bunazi, Missenyi
        </span>
        <span className="flex flex-wrap items-center gap-x-4">
          <a href="tel:+255739222237" className="flex items-center gap-1.5 text-[#CFE6D5] no-underline hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {school.phoneMain}
          </a>
          <a href={`mailto:${school.email}`} className="hidden items-center gap-1.5 text-[#CFE6D5] no-underline hover:text-white sm:flex">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {school.email}
          </a>
          <Link to="/parent" className="hidden font-semibold text-white no-underline hover:underline xl:inline 2xl:hidden">Parent Hub</Link>
          <span className="hidden font-semibold text-[#FFE27A] md:inline">{tr('Form One 2027 admission is open', 'Udahili wa Kidato cha Kwanza 2027 uko wazi')}</span>
        </span>
      </div>
    </div>
  );
}

function Footer() {
  const { tr } = useLang();
  const link = 'text-[#CFE6D5] no-underline hover:text-white';
  return (
    <footer className="bg-green-800 text-[#CFE6D5]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-14 text-sm leading-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <img src="/brand/logo-white.png" alt="Green Acres Schools" className="mb-3 h-20 w-auto" />
          <p className="m-0">{tr('Nursery to A-Level since 2000. Where young minds grow, and leaders are made.', 'Awali hadi A-Level tangu 2000. Mahali akili changa hukua, na viongozi huandaliwa.')}</p>
        </div>
        {campuses.map((c) => (
          <div key={c.id}>
            <div className="mb-2 font-bold text-white">{c.name}</div>
            <div>{c.address}</div>
            {c.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={`block ${link}`}>
                {p}
              </a>
            ))}
            <a href={`mailto:${c.email}`} className={`block ${link}`}>
              {c.email}
            </a>
          </div>
        ))}
        <div>
          <div className="mb-2 font-bold text-white">{tr('Quick links', 'Viungo')}</div>
          <Link to="/admissions" className={`block ${link}`}>{tr('Admissions 2027', 'Udahili 2027')}</Link>
          <Link to="/results" className={`block ${link}`}>{tr('Results', 'Matokeo')}</Link>
          <Link to="/news" className={`block ${link}`}>{tr('News and events', 'Habari na matukio')}</Link>
          <Link to="/parent" className={`block ${link}`}>Parent Hub</Link>
          <Link to="/cms" className={`block ${link}`}>{tr('Staff sign in', 'Ingia (watumishi)')}</Link>
          <div className="mt-3 flex gap-2">
            <a href={school.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Instagram className="h-5 w-5" /></a>
            <a href={school.social.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Facebook className="h-5 w-5" /></a>
            <a href={school.social.x} aria-label="X (Twitter)" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-4 py-5 text-xs sm:px-8">
        <span>© {new Date().getFullYear()} Green Acres Schools Tanzania</span>
        <Link to="/system" className="text-[#CFE6D5] no-underline hover:text-white">
          {tr('Smart School System · by Bermi Techs', 'Mfumo wa Shule Janja · na Bermi Techs')}
        </Link>
      </div>
    </footer>
  );
}

export function ApplyBanner() {
  const { tr } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gold-400 p-8 sm:p-11">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/25" aria-hidden="true" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="m-0 font-display text-3xl font-extrabold sm:text-4xl">{tr('Form One 2027 admission is open', 'Udahili wa Kidato cha Kwanza 2027 uko wazi')}</h2>
            <p className="mb-0 mt-2 text-[17px] text-[#3D3A1F]">{tr('Apply online in about 10 minutes and follow every step by SMS. Or call us on +255 739 222 237.', 'Omba mtandaoni kwa dakika 10 na ufuatilie kila hatua kwa SMS. Au tupigie +255 739 222 237.')}</p>
          </div>
          <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-green-800 px-6 py-4 font-extrabold text-white no-underline transition hover:-translate-y-0.5 hover:shadow-lg">
            {tr('Apply for 2027', 'Omba nafasi 2027')} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // braces matter: newer browsers return a Promise from scrollTo, which React would treat as a cleanup
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
