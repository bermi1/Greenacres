import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BarChart3, ClipboardCheck, ExternalLink, FileText, Image, LayoutDashboard, MessageSquare, Newspaper, Send, Settings, Sparkles, Users } from 'lucide-react';
import { Crest } from './SiteLayout';

const MODULES = [
  { to: '/cms', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/cms/pages', label: 'Website pages', icon: FileText },
  { to: '/cms/news', label: 'News & events', icon: Newspaper },
  { to: '/cms/staff', label: 'Staff', icon: Users },
  { to: '/cms/media', label: 'Media library', icon: Image },
  { to: '/cms/sms', label: 'Bulk SMS', icon: Send },
  { to: '/cms/results', label: 'Results', icon: BarChart3 },
  { to: '/cms/settings', label: 'Settings', icon: Settings },
];
const OFFICE = [
  { to: '/office/admissions', label: 'Admissions', icon: ClipboardCheck },
  { to: '/office/messages', label: 'Send notices', icon: MessageSquare },
  { to: '/office/teacher-ai', label: 'Teacher AI', icon: Sparkles },
];

function Item({ to, label, icon: Icon, end }: { to: string; label: string; icon: typeof Users; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-none items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm no-underline transition ${isActive ? 'bg-white/15 font-semibold text-white' : 'text-[#CFE6D5] hover:bg-white/5 hover:text-white'}`
      }
    >
      <Icon className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
      {label}
    </NavLink>
  );
}

export default function StaffShell({ kicker, title, actions, children }: { kicker: string; title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-3 font-sans text-ink lg:flex">
      <nav aria-label="Modules" className="flex flex-col bg-green-800 text-white lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:flex-none lg:overflow-y-auto">
        <Link to="/cms" className="flex items-center gap-2.5 px-4 pb-2 pt-4 text-white no-underline lg:px-5 lg:pb-5 lg:pt-6">
          <Crest className="h-9 w-9" />
          <span className="font-display font-extrabold leading-tight">
            Control Centre
            <span className="block text-[11px] font-semibold text-[#9FC2AA]">Green Acres Schools</span>
          </span>
        </Link>
        <div className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
          {MODULES.map((m) => <Item key={m.to} {...m} />)}
          <div className="hidden px-3 pb-1 pt-4 text-[11px] font-bold tracking-wider text-[#9FC2AA] lg:block">SCHOOL OFFICE</div>
          {OFFICE.map((m) => <Item key={m.to} {...m} />)}
          <a href="/" className="flex flex-none items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm text-[#CFE6D5] no-underline hover:text-white">
            <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" /> View website
          </a>
        </div>
        <div className="mt-auto hidden px-5 py-5 text-xs leading-relaxed text-[#9FC2AA] lg:block">
          Smart School System by Bermi Techs
          <br />
          Concept prototype · sample data
        </div>
      </nav>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-wider text-ink-3">{kicker}</div>
            <h1 className="m-0 mt-1 font-display text-[28px] font-extrabold sm:text-3xl">{title}</h1>
          </div>
          {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
        </div>
        <div className="mt-5">{children}</div>
      </main>
    </div>
  );
}

export const btnPrimary = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-bold text-white no-underline transition hover:bg-green-700 disabled:opacity-50';
export const btnGold = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 text-sm font-bold text-ink no-underline transition hover:brightness-95';
export const btnGhost = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-line-2 bg-white px-4 text-sm font-semibold text-ink no-underline transition hover:border-green-600';
export const card = 'rounded-2xl border border-line bg-white';

export function Badge({ tone, children }: { tone: 'green' | 'gold' | 'grey' | 'blue' | 'red'; children: ReactNode }) {
  const t = { green: 'bg-green-100 text-green-600', gold: 'bg-gold-50 text-gold-700', grey: 'bg-paper-2 text-ink-2', blue: 'bg-sky-50 text-sky-800', red: 'bg-red-50 text-red-700' }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${t}`}>{children}</span>;
}
