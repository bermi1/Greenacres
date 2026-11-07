import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ClipboardCheck, FileText, Image, LogOut, Newspaper, Send, Settings, ShieldCheck, Users } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnGold, btnPrimary, card } from '../../components/StaffShell';
import { Crest } from '../../components/SiteLayout';
import { img, mediaCount } from '../../lib/media';
import { posts } from '../../content/site';
import { inputCls } from '../../components/ui';

function readSignedIn() {
  try {
    return sessionStorage.getItem('ga-cms') === '1';
  } catch {
    return false;
  }
}

const TILES = [
  { to: '/cms/pages', label: 'Website pages', desc: 'Edit every page in English and Kiswahili.', icon: FileText, c: 'bg-green-50 text-green-600' },
  { to: '/cms/news', label: 'News & events', desc: 'Post news, events and results announcements.', icon: Newspaper, c: 'bg-gold-50 text-gold-700' },
  { to: '/cms/staff', label: 'Staff', desc: 'Directory, roles and who appears on the website.', icon: Users, c: 'bg-sky-50 text-sky-600' },
  { to: '/cms/media', label: 'Media library', desc: 'Photos, albums and videos for the gallery.', icon: Image, c: 'bg-green-50 text-green-600' },
  { to: '/cms/sms', label: 'Bulk SMS', desc: 'Campaigns, groups, templates and credits.', icon: Send, c: 'bg-gold-50 text-gold-700' },
  { to: '/cms/results', label: 'Results', desc: 'Publish results to the website and parents.', icon: BarChart3, c: 'bg-sky-50 text-sky-600' },
  { to: '/cms/settings', label: 'Settings', desc: 'Users, roles, integrations, data protection.', icon: Settings, c: 'bg-paper-2 text-ink-2' },
  { to: '/office/admissions', label: 'Admissions', desc: 'Applications from apply to enrolled.', icon: ClipboardCheck, c: 'bg-green-50 text-green-600' },
];

export default function Dashboard() {
  const [signed, setSigned] = useState(readSignedIn);
  const [done, setDone] = useState<Record<number, boolean>>({ 1: true });
  const setSession = (v: boolean) => {
    setSigned(v);
    try {
      if (v) sessionStorage.setItem('ga-cms', '1');
      else sessionStorage.removeItem('ga-cms');
    } catch {
      /* ignore */
    }
  };

  if (!signed) {
    return (
      <div className="grid min-h-screen font-sans text-ink lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-green-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <img src={img('lab-3')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="relative flex items-center gap-3"><Crest /><span className="font-display text-lg font-extrabold">Green Acres Control Centre</span></div>
          <div className="relative max-w-md">
            <h1 className="font-display text-4xl font-extrabold leading-tight">One place to run the website, admissions and parent communication.</h1>
            <p className="text-[#CFE6D5]">Staff sign in once. What each person sees depends on their role.</p>
          </div>
          <div className="relative text-sm text-[#9FC2AA]">Built by Bermi Techs · concept prototype</div>
        </div>
        <div className="grid place-items-center bg-paper px-4 py-12">
          <form onSubmit={(e) => { e.preventDefault(); setSession(true); }} className={`${card} w-full max-w-md p-7`}>
            <div className="mb-5 flex items-center gap-3 lg:hidden"><Crest /><span className="font-display font-extrabold">Green Acres Control Centre</span></div>
            <h2 className="m-0 font-display text-2xl font-extrabold">Staff sign in</h2>
            <p className="mb-5 mt-1 text-sm text-ink-3">Demo: any email and password will open the dashboard.</p>
            <label className="mb-4 flex flex-col gap-1.5 text-sm font-semibold">Work email<input type="email" required placeholder="name@greenacres.ac.tz" className={inputCls} autoComplete="username" /></label>
            <label className="mb-4 flex flex-col gap-1.5 text-sm font-semibold">Password<input type="password" required placeholder="••••••••" className={inputCls} autoComplete="current-password" /></label>
            <label className="mb-5 flex items-center gap-2.5 text-sm"><input type="checkbox" className="h-4 w-4 accent-green-600" />Keep me signed in on this device</label>
            <button type="submit" className={btnPrimary + ' min-h-[48px] w-full'}>Sign in</button>
            <div className="mt-4 flex justify-between text-sm"><a href="mailto:info@greenacres.ac.tz">Forgot password?</a><span className="inline-flex items-center gap-1 text-ink-3"><ShieldCheck className="h-4 w-4" />Two-step code by SMS</span></div>
            <Link to="/" className="mt-6 block text-center text-sm">Back to the website</Link>
          </form>
        </div>
      </div>
    );
  }

  const tasks = [['Approve 2 draft pages (Admissions, Facilities)', 'Pages'], ['Reply to parent questions in SMS inbox', 'Bulk SMS'], ['Schedule Form One interview reminders', 'Bulk SMS'], ['Add alt text to 6 new gallery photos', 'Media']];
  const count = Object.values(done).filter(Boolean).length;

  return (
    <StaffShell
      kicker="GOOD MORNING · ROLE: ADMIN"
      title="Green Acres Control Centre"
      actions={
        <>
          <Link to="/cms/news" className={btnPrimary}>New post</Link>
          <Link to="/office/messages" className={btnGold}>Send SMS</Link>
          <button type="button" onClick={() => setSession(false)} className={btnGhost}><LogOut className="h-4 w-4" /> Sign out</button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Applications (2027)', '7', 'Sample, from Admissions'], ['SMS rate', 'TZS 18', 'per SMS via Bermi Connect'], ['Website pages live', '10', `${posts.length} news posts`], ['Media library', String(mediaCount), 'photos imported']].map(([k, v, s]) => (
          <div key={k} className={`${card} p-4`}>
            <div className="text-[13px] text-ink-3">{k}</div>
            <div className="font-display text-2xl font-extrabold">{v}</div>
            <div className="text-xs text-ink-3">{s}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-7 font-display text-xl font-extrabold">Modules</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {TILES.map((t) => (
          <Link key={t.to} to={t.to} className={`${card} group flex flex-col gap-2 p-4 text-ink no-underline transition hover:-translate-y-0.5 hover:shadow-lift`}>
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${t.c}`}><t.icon className="h-5 w-5" aria-hidden="true" /></span>
            <span className="font-bold">{t.label}</span>
            <span className="text-sm text-ink-3">{t.desc}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className={`${card} p-5`}>
          <div className="mb-3 flex items-center justify-between"><h2 className="m-0 font-display text-lg font-extrabold">Today's tasks</h2><span className="text-sm text-ink-3">{count} of {tasks.length} done</span></div>
          <div className="flex flex-col gap-2">
            {tasks.map(([text, mod], i) => (
              <label key={text} className={`flex min-h-[48px] items-center gap-3 rounded-xl border border-line px-3 ${done[i] ? 'bg-paper text-ink-3 line-through' : ''}`}>
                <input type="checkbox" checked={!!done[i]} onChange={() => setDone({ ...done, [i]: !done[i] })} className="h-5 w-5 accent-green-600" />
                <span className="flex-1 text-sm">{text}</span>
                <Badge tone="grey">{mod}</Badge>
              </label>
            ))}
          </div>
        </section>
        <section className={`${card} p-5`}>
          <h2 className="mb-3 mt-0 font-display text-lg font-extrabold">Recent website edits</h2>
          <div className="flex flex-col gap-2">
            {[['JR', 'Home · hero text updated (SW)', 'Published'], ['AM', 'Admissions · 2027 joining instructions', 'Draft'], ['SK', 'News · Cultural Day photos', 'Published'], ['AM', 'Facilities · new labs gallery', 'Draft']].map(([who, what, st]) => (
              <div key={what} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-600">{who}</span>
                <span className="flex-1 text-sm">{what}</span>
                <Badge tone={st === 'Published' ? 'green' : 'gold'}>{st}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-ink-3">Sample activity</div>
        </section>
      </div>
    </StaffShell>
  );
}
