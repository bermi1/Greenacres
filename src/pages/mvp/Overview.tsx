import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, MessageSquare, RefreshCw, ShieldCheck, Smartphone, Sparkles, Languages } from 'lucide-react';
import { Crest } from '../../components/SiteLayout';
import { img } from '../../lib/media';

const TILES = [
  { to: '/apply', n: '01 · PARENT', h: 'Apply online', p: 'Bilingual form, document upload, mobile money fee, instant reference number.', c: 'text-green-600' },
  { to: '/office/admissions', n: '02 · SCHOOL OFFICE', h: 'Admissions pipeline', p: 'Every applicant from applied to enrolled, with one-click SMS and ForShule export.', c: 'text-green-600' },
  { to: '/parent', n: '03 · PARENT', h: 'Parent Hub', p: 'Notices, results, fees and an assistant that answers in Kiswahili.', c: 'text-green-600' },
  { to: '/office/messages', n: '04 · SCHOOL OFFICE', h: 'Send notices', p: 'Target any group of parents by SMS, with the live cost before you send.', c: 'text-gold-700' },
  { to: '/office/teacher-ai', n: '05 · TEACHER', h: 'Teacher copilot', p: 'NECTA-style practice questions drafted in seconds, always teacher-approved.', c: 'text-sky-600' },
  { to: '/akili', n: '06 · STUDENT', h: 'Akili Learn', p: 'Adaptive learning from the teacher’s own notes, with hints and Kiswahili explanations.', c: 'text-green-600' },
  { to: '/office/akili', n: '07 · ACADEMIC OFFICE', h: 'Akili Studio', p: 'Results insights, notes to lessons and parent summaries.', c: 'text-green-600' },
  { to: '/cms', n: '08 · STAFF', h: 'Control Centre (CMS)', p: 'Edit the website in English and Kiswahili, publish news, results and photos.', c: 'text-sky-600' },
];

export default function Overview() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="bg-green-600 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-white no-underline">
            <Crest />
            <div>
              <div className="font-display text-lg font-extrabold">Green Acres Smart School</div>
              <div className="text-[13px] text-[#CFE6D5]">Admissions · Parents · Learning: one connected system</div>
            </div>
          </Link>
          <div className="rounded-full border border-white/35 px-3.5 py-2 text-[13px]">Concept MVP · prepared by Bermi Techs</div>
        </div>
      </header>

      <section className="bg-green-600 pb-12">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 pt-12 sm:px-8 lg:grid-cols-2">
          <div className="pb-4 text-white animate-fadeUp lg:pb-14">
            <div className="inline-flex rounded-full bg-gold-400/15 px-3 py-1.5 text-[13px] font-semibold text-[#FFE27A]">25 years of Green Acres · the next 25 go digital</div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] sm:text-[52px]">From application to graduation, every family connected.</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#DCEFE1]">A modern layer on top of what the school already runs: digital admissions, Swahili-first parent communication and AI built for Tanzanian classrooms.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3.5 font-bold text-ink no-underline transition hover:-translate-y-0.5">
                Try the admission demo <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
              <Link to="/parent" className="rounded-xl border border-white/35 bg-white/10 px-5 py-3.5 font-semibold text-white no-underline hover:bg-white/15">
                Open the parent app
              </Link>
            </div>
          </div>
          <div className="relative rounded-[22px] bg-white p-6 shadow-[0_30px_60px_rgba(10,40,20,.18)]">
            <img src={img('4')} alt="" className="absolute -right-3 -top-10 hidden h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-lg sm:block" />
            <div className="text-[13px] font-semibold uppercase tracking-wider text-ink-3">How it fits together</div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { icon: LayoutGrid, bg: 'bg-green-50', ic: 'bg-green-600 text-white', h: 'Operations', p: 'Admissions pipeline, enrolment, results view' },
                { icon: MessageSquare, bg: 'bg-gold-50', ic: 'bg-gold-400 text-ink', h: 'Communication', p: 'SMS from sender ID GREENACRES, powered by Bermi Connect' },
                { icon: Sparkles, bg: 'bg-sky-50', ic: 'bg-sky-600 text-white', h: 'Intelligence', p: 'Swahili parent assistant, teacher copilot' },
              ].map((r) => (
                <div key={r.h} className={`flex items-center gap-3.5 rounded-2xl p-3.5 ${r.bg}`}>
                  <div className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${r.ic}`}><r.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div>
                    <div className="font-bold">{r.h}</div>
                    <div className="text-sm text-ink-3">{r.p}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2.5 rounded-2xl border border-dashed border-[#B9C7BD] px-3.5 py-3 text-sm text-ink-2">
                <RefreshCw className="h-[18px] w-[18px] flex-none text-green-600" aria-hidden="true" />
                Syncs with ForShule: fees, payroll and NECTA CA stay where they are.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-8">
        <h2 className="m-0 font-display text-3xl font-extrabold">Click through the MVP</h2>
        <p className="mb-6 mt-1.5 text-ink-3">Six screens, each working on sample data. Nothing is sent or charged.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <Link key={t.to} to={t.to} className="group flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-5 text-ink no-underline transition hover:-translate-y-1 hover:shadow-lift">
              <div className={`text-xs font-bold ${t.c}`}>{t.n}</div>
              <div className="flex items-center justify-between font-display text-[19px] font-extrabold">
                {t.h}
                <ArrowRight className="h-5 w-5 text-green-600 transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <div className="text-sm leading-relaxed text-ink-3">{t.p}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Languages, h: 'Swahili-first', p: 'Joining instructions are already in Kiswahili. Every parent-facing screen and message works in both languages.' },
            { icon: Smartphone, h: 'No app required', p: 'Every update also reaches parents by SMS, so families in Bunazi or on basic phones are never left out.' },
            { icon: ShieldCheck, h: 'Protected data', p: 'Built for the Personal Data Protection Act: consent, role-based access, and a human approves every AI output.' },
          ].map((c) => (
            <div key={c.h} className="rounded-[18px] border border-line bg-white p-5">
              <c.icon className="h-6 w-6 text-green-600" aria-hidden="true" />
              <div className="mb-1.5 mt-3 font-bold">{c.h}</div>
              <div className="text-sm leading-relaxed text-ink-3">{c.p}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2 text-[13px] text-ink-3">
          <span>Concept prototype for Green Acres Schools Tanzania · sample data only</span>
          <Link to="/" className="font-semibold">Back to the website</Link>
        </div>
      </section>
    </div>
  );
}
