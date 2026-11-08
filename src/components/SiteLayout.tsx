import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Facebook, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Send, Twitter, X } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { brand } from '../lib/media';
import { campuses, school } from '../content/site';
import { db } from '../data/db';

export function Crest({ className = 'h-11 w-11' }: { className?: string }) {
  return <img src={brand('crest-192.png')} alt="" className={`${className} flex-none rounded-xl bg-white object-contain p-0.5`} />;
}

export function LangToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language / Lugha" className={`flex rounded-full p-[3px] ${dark ? 'bg-white/15' : 'bg-paper-2'}`}>
      {(['en', 'sw'] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`min-h-[30px] w-10 rounded-full text-xs font-semibold transition ${lang === l ? 'bg-gold-400 text-ink' : dark ? 'text-white' : 'text-ink-2'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const LEFT = [
  { to: '/', en: 'Home', sw: 'Nyumbani' },
  { to: '/about', en: 'About', sw: 'Kuhusu' },
  { to: '/academics', en: 'Academics', sw: 'Taaluma' },
  { to: '/admissions', en: 'Admissions', sw: 'Udahili' },
  { to: '/facilities', en: 'Facilities', sw: 'Miundombinu' },
];
const RIGHT = [
  { to: '/results', en: 'Results', sw: 'Matokeo' },
  { to: '/news', en: 'News & events', sw: 'Habari' },
  { to: '/gallery', en: 'Gallery', sw: 'Picha' },
  { to: '/alumni', en: 'Alumni', sw: 'Wahitimu' },
  { to: '/contact', en: 'Contact', sw: 'Mawasiliano' },
];

function TopBar() {
  const { tr } = useLang();
  return (
    <div className="bg-green-800 text-[13px] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8">
        <span className="hidden items-center gap-1.5 md:flex">
          <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
          Mbezi Beach, Salasala, Dar es Salaam · Bunazi, Kagera
        </span>
        <span className="flex items-center gap-4">
          <a href="tel:+255739222237" className="flex items-center gap-1.5 text-white no-underline hover:underline">
            <Phone className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            {school.phoneMain}
          </a>
          <a href={`mailto:${school.email}`} className="hidden items-center gap-1.5 text-white no-underline hover:underline sm:flex">
            <Mail className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            {school.email}
          </a>
        </span>
        <span className="flex items-center gap-3">
          <LangToggle dark />
          <Link to="/apply" className="hidden rounded-full bg-gold-400 px-4 py-1.5 font-semibold text-ink no-underline hover:bg-gold-300 sm:inline-block">
            {tr('Apply 2027', 'Omba 2027')}
          </Link>
        </span>
      </div>
    </div>
  );
}

function NavItem({ to, en, sw }: { to: string; en: string; sw: string }) {
  const { tr } = useLang();
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative whitespace-nowrap px-2.5 py-2 text-[15px] font-medium no-underline transition-colors after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-gold-400 after:transition-transform ${isActive ? 'text-white after:scale-x-100' : 'text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100'}`
      }
    >
      {tr(en, sw)}
    </NavLink>
  );
}

function Header() {
  const { tr } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-green-600 shadow-[0_2px_12px_rgba(20,51,34,.18)]">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* desktop: menu split around the centred crest, as on the school's current site */}
        <nav aria-label="Main" className="hidden flex-1 items-center justify-end gap-1 pr-24 xl:flex">
          {LEFT.map((n) => <NavItem key={n.to} {...n} />)}
        </nav>
        <Link to="/" aria-label="Green Acres Schools, home" className="absolute left-1/2 top-0 hidden -translate-x-1/2 xl:block">
          <span className="flex h-[96px] w-[112px] items-center justify-center rounded-b-[28px] bg-green-600 shadow-[0_6px_14px_rgba(20,51,34,.22)]">
            <img src={brand('logo-white.png')} alt="Green Acres Schools" className="h-[78px] w-auto" />
          </span>
        </Link>
        <nav aria-label="More" className="hidden flex-1 items-center gap-1 pl-24 xl:flex">
          {RIGHT.map((n) => <NavItem key={n.to} {...n} />)}
        </nav>

        {/* phones and tablets */}
        <Link to="/" className="flex items-center gap-3 text-white no-underline xl:hidden">
          <img src={brand('logo-white.png')} alt="" className="h-12 w-auto" />
          <span className="font-display text-lg font-bold leading-tight">Green Acres Schools</span>
        </Link>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={tr('Menu', 'Menyu')} className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white xl:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-white xl:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-4 py-2">
            {[...LEFT, ...RIGHT].map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `flex items-center justify-between border-b border-line py-4 text-lg no-underline ${isActive ? 'font-semibold text-green-600' : 'text-ink'}`}>
                {tr(n.en, n.sw)}
                <ArrowRight className="h-5 w-5 text-green-600" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-wrap gap-3 px-4 py-6">
            <Link to="/apply" className="rounded-xl bg-gold-400 px-5 py-3 font-semibold text-ink no-underline">{tr('Apply for 2027', 'Omba nafasi 2027')}</Link>
            <Link to="/parent" className="rounded-xl border border-line-2 px-5 py-3 font-semibold text-ink no-underline">Parent Hub</Link>
          </div>
        </div>
      )}
    </header>
  );
}

/** Green call-to-action band, as on the current site: one message, phone and Apply. */
export function ApplyBanner() {
  const { tr } = useLang();
  return (
    <section className="bg-green-600 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-8">
        <h2 className="m-0 max-w-xl font-display text-[28px] font-bold leading-tight sm:text-[32px]">
          {tr('Preparing tomorrow’s leaders through knowledge, character and excellence', 'Tunaandaa viongozi wa kesho kwa maarifa, tabia njema na ubora')}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <a href="tel:+255739222237" className="inline-flex min-h-[52px] items-center gap-2 rounded-xl border-2 border-white/40 px-5 font-semibold text-white no-underline hover:bg-white/10">
            <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" /> +255 739 222 237
          </a>
          <Link to="/apply" className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-gold-400 px-6 font-semibold text-ink no-underline transition hover:bg-gold-300">
            {tr('Apply for admission', 'Omba kujiunga')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { tr } = useLang();
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);
  const join = (e: FormEvent) => {
    e.preventDefault();
    db.subscribe(contact.trim());
    setDone(true);
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/15 pb-10">
      <div className="flex max-w-lg items-start gap-4">
        <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-gold-400 text-ink"><Send className="h-6 w-6" aria-hidden="true" /></span>
        <div>
          <h2 className="m-0 font-display text-2xl font-bold">{tr('Subscribe to our newsletter', 'Jiunge na jarida letu')}</h2>
          <p className="m-0 mt-1 text-[15px] text-white/80">{tr('Announcements, events and term dates by SMS or email.', 'Matangazo, matukio na tarehe za muhula kwa SMS au barua pepe.')}</p>
        </div>
      </div>
      {done ? (
        <p className="m-0 flex items-center gap-2 rounded-xl bg-white/10 px-5 py-4 font-semibold"><Check className="h-5 w-5 text-gold-400" />{tr('Subscribed. Asante!', 'Umejisajili. Asante!')}</p>
      ) : (
        <form onSubmit={join} className="flex w-full max-w-md gap-2">
          <label htmlFor="ft-sub" className="sr-only">{tr('Phone or email', 'Simu au barua pepe')}</label>
          <input id="ft-sub" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder={tr('Phone number or email', 'Namba ya simu au barua pepe')} className="min-h-[52px] min-w-0 flex-1 rounded-xl border-0 bg-white px-4 text-[15px] text-ink outline-none focus:ring-2 focus:ring-gold-400" />
          <button type="submit" className="min-h-[52px] rounded-xl bg-gold-400 px-5 font-semibold text-ink hover:bg-gold-300">{tr('Subscribe', 'Jisajili')}</button>
        </form>
      )}
    </div>
  );
}

function Footer() {
  const { tr } = useLang();
  const link = 'block py-1 text-[15px] text-white/80 no-underline hover:text-white';
  return (
    <footer className="bg-green-700 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-8">
        <Newsletter />
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={brand('logo-white.png')} alt="Green Acres Schools, Quality Education" className="h-24 w-auto" />
            <p className="mt-4 text-[15px] leading-relaxed text-white/80">{tr('Nursery to A-Level since 2000. Strong academics, discipline and Tanzanian values on two campuses.', 'Awali hadi A-Level tangu 2000. Taaluma imara, nidhamu na maadili ya Kitanzania katika kampasi mbili.')}</p>
            <div className="mt-4 flex gap-2">
              <a href={school.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-gold-400 hover:text-ink"><Instagram className="h-5 w-5" /></a>
              <a href={school.social.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-gold-400 hover:text-ink"><Facebook className="h-5 w-5" /></a>
              <a href={school.social.x} aria-label="X (Twitter)" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-gold-400 hover:text-ink"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="m-0 mb-3 font-display text-lg font-semibold text-gold-400">{tr('Quick links', 'Viungo')}</h3>
            {[...LEFT.slice(1), ...RIGHT].map((n) => <Link key={n.to} to={n.to} className={link}>{tr(n.en, n.sw)}</Link>)}
          </div>
          {campuses.map((c) => (
            <div key={c.id}>
              <h3 className="m-0 mb-3 font-display text-lg font-semibold text-gold-400">{c.name}</h3>
              <p className="m-0 text-[15px] text-white/80">{c.address}</p>
              {c.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={link}>{p}</a>)}
              <a href={`mailto:${c.email}`} className={link}>{c.email}</a>
              <p className="m-0 mt-1 text-[15px] text-white/80">{tr(c.hours.en, c.hours.sw)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-green-800">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-4 text-[13px] text-white/75 sm:px-8">
          <span>© {new Date().getFullYear()} Green Acres Schools Tanzania. All rights reserved.</span>
          <span className="flex gap-4">
            <Link to="/akili" className="text-white/75 no-underline hover:text-white">Akili Learn</Link>
            <Link to="/parent" className="text-white/75 no-underline hover:text-white">Parent Hub</Link>
            <Link to="/cms" className="text-white/75 no-underline hover:text-white">{tr('Staff sign in', 'Ingia (watumishi)')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const { tr } = useLang();
  return (
    <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer" aria-label={tr('Chat with us on WhatsApp', 'Ongea nasi WhatsApp')} className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#1FAF5A] text-sm font-semibold text-white no-underline shadow-lg hover:brightness-95 sm:h-auto sm:w-auto sm:py-3 sm:pl-4 sm:pr-5">
      <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" /><span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // braces matter: newer browsers return a Promise from scrollTo, which React would treat as a cleanup
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <TopBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
