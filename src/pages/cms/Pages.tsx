import { useState } from 'react';
import { Eye, EyeOff, ImageIcon, Plus } from 'lucide-react';
import StaffShell, { Badge, btnGhost, btnPrimary, card } from '../../components/StaffShell';
import { Field, Toast, inputCls } from '../../components/ui';
import { img } from '../../lib/media';

const PAGES: [string, string, string][] = [['home', 'Home', '4'], ['about', 'About', 'kwa-niaba-ya-waziri-wa-elimu-prof-nkenda-6'], ['academics', 'Academics', 'learning-in-motion-our-green-acres-teach'], ['admissions', 'Admissions', 'a-week-back-in-the-groove-at-green-acres'], ['facilities', 'Facilities', '2-2'], ['alumni', 'Alumni', 'get'], ['gallery', 'Gallery', 'p1336293-7'], ['news', 'News & events', 'p1336273-1'], ['results', 'Results', 'graduation'], ['contact', 'Contact', 'skonga']];
const DRAFTS = new Set(['admissions', 'facilities']);
const DEFAULTS: Record<string, Record<'en' | 'sw', [string, string, string]>> = {
  home: { en: ['Where young minds grow, and leaders are made', 'From Nursery to A-Level, a caring and disciplined environment that inspires excellence, character and Tanzanian values.', 'Apply for 2027'], sw: ['Mahali akili changa hukua, na viongozi huandaliwa', 'Kuanzia Awali hadi Kidato cha Sita, mazingira ya upendo na nidhamu yanayochochea ubora, maadili na tunu za Kitanzania.', 'Omba nafasi 2027'] },
  about: { en: ['Twenty-five years of shaping Tanzania’s future', 'Founded in 2000, Green Acres Schools serves learners from Bunazi to Dar es Salaam.', 'Meet our leadership'], sw: ['Miaka 25 ya kujenga Tanzania ya kesho', 'Ilianzishwa mwaka 2000, Green Acres inahudumia wanafunzi kutoka Bunazi hadi Dar es Salaam.', 'Fahamu uongozi wetu'] },
  admissions: { en: ['Join the Green Acres family', 'Apply online in about 10 minutes and track every step by SMS.', 'Start application'], sw: ['Jiunge na familia ya Green Acres', 'Omba mtandaoni kwa dakika 10 na ufuatilie kila hatua kwa SMS.', 'Anza maombi'] },
};

export default function Pages() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [content, setContent] = useState<Record<string, [string, string, string]>>({});
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('Published');
  const [toast, setToast] = useState('');
  const def = PAGES.find((p) => p[0] === page)!;
  const key = `${page}:${lang}`;
  const c = content[key] ?? DEFAULTS[page]?.[lang] ?? [def[1], lang === 'en' ? 'Introduction text for this page.' : 'Maelezo ya utangulizi wa ukurasa huu.', lang === 'en' ? 'Learn more' : 'Soma zaidi'];
  const setField = (i: 0 | 1 | 2) => (e: { target: { value: string } }) => {
    const next = [...c] as [string, string, string];
    next[i] = e.target.value;
    setContent({ ...content, [key]: next });
    setStatus('Unsaved changes');
  };
  const blocks: [string, string][] = [['TEXT', 'Our story / introduction'], ['CARDS', 'Highlight cards'], ['GALLERY', 'Photo strip'], ['CTA', 'Apply or contact banner']];
  const tog = (on: boolean) => `min-h-[34px] rounded-full px-3 text-[13px] font-semibold ${on ? 'bg-green-600 text-white' : 'text-ink-2'}`;

  return (
    <StaffShell
      kicker="WEBSITE · GREENACRES.AC.TZ"
      title="Website pages"
      actions={
        <>
          <Badge tone={status === 'Published' ? 'green' : status === 'Draft' ? 'gold' : 'red'}>{status}</Badge>
          <button type="button" className={btnGhost} onClick={() => { setStatus('Draft'); setToast('Draft saved. Only staff can see it.'); }}>Save draft</button>
          <button type="button" className={btnPrimary} onClick={() => { setStatus('Published'); setToast(`${def[1]} is live in English and Kiswahili.`); }}>Publish</button>
        </>
      }
    >
      {toast && <div className="mb-4"><Toast text={toast} /></div>}
      <div className="grid gap-4 xl:grid-cols-[200px_1fr_1fr]">
        <section aria-label="Pages" className={`${card} no-scrollbar flex gap-1 overflow-x-auto p-2 xl:flex-col`}>
          {PAGES.map(([id, label]) => (
            <button key={id} type="button" onClick={() => { setPage(id); setStatus(DRAFTS.has(id) ? 'Draft' : 'Published'); setToast(''); }} aria-pressed={page === id} className={`flex min-h-[40px] flex-none items-center gap-2 rounded-lg px-3 text-left text-sm ${page === id ? 'bg-green-50 font-bold text-green-600' : 'hover:bg-paper'}`}>
              <span className={`h-2 w-2 rounded-full ${DRAFTS.has(id) ? 'bg-gold-500' : 'bg-green-600'}`} />
              {label}
            </button>
          ))}
        </section>

        <section className={`${card} flex flex-col gap-4 p-5`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-bold">{def[1]} · sections</div>
            <div role="group" aria-label="Content language" className="flex gap-1 rounded-full bg-paper-2 p-1">
              <button type="button" onClick={() => setLang('en')} className={tog(lang === 'en')}>English</button>
              <button type="button" onClick={() => setLang('sw')} className={tog(lang === 'sw')}>Kiswahili</button>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border-2 border-green-200 p-4">
            <Badge tone="green">HERO</Badge>
            <Field label="Heading"><input value={c[0]} onChange={setField(0)} className={inputCls} /></Field>
            <Field label="Intro text"><textarea rows={3} value={c[1]} onChange={setField(1)} className={inputCls} /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Button label"><input value={c[2]} onChange={setField(2)} className={inputCls} /></Field>
              <Field label="Button link"><input readOnly value="/apply" className={inputCls + ' bg-paper'} /></Field>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-paper p-2">
              <img src={img(def[2])} alt="" className="h-12 w-16 rounded-lg object-cover" />
              <span className="flex items-center gap-1.5 text-sm text-ink-3"><ImageIcon className="h-4 w-4" />Hero image · from the Media library</span>
            </div>
          </div>
          {blocks.map(([type, title], i) => {
            const h = !!hidden[page + i];
            return (
              <div key={type} className={`flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 ${h ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-2"><Badge tone="grey">{type}</Badge><span className="text-sm font-semibold">{title}</span></div>
                <button type="button" onClick={() => { setHidden({ ...hidden, [page + i]: !h }); setStatus('Unsaved changes'); }} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-line-2 px-3 text-xs font-semibold">
                  {h ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />} {h ? 'Hidden' : 'Visible'}
                </button>
              </div>
            );
          })}
          <button type="button" className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-line-2 text-sm font-semibold text-ink-3"><Plus className="h-4 w-4" />Add section (text, cards, gallery, CTA, FAQ)</button>
        </section>

        <section aria-label="Live preview" className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-ink-3">
            <span>Live preview · {lang === 'en' ? 'English' : 'Kiswahili'}</span>
            <span>greenacres.ac.tz{page === 'home' ? '/' : '/' + page}</span>
          </div>
          <div className="relative overflow-hidden px-5 py-10 text-white">
            <img src={img(def[2])} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/95 to-green-600/60" />
            <div className="relative">
              <div className="text-[11px] font-bold tracking-wider text-[#FFE27A]">GREEN ACRES SCHOOLS</div>
              <div className="mt-2 font-display text-2xl font-extrabold leading-tight">{c[0]}</div>
              <div className="mt-2 text-sm text-[#DCEFE1]">{c[1]}</div>
              <span className="mt-4 inline-block rounded-lg bg-gold-400 px-3 py-2 text-sm font-bold text-ink">{c[2]}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {blocks.filter((_, i) => !hidden[page + i]).map(([, title]) => (
              <div key={title} className="rounded-lg bg-paper px-3 py-3 text-sm"><strong>{title}</strong></div>
            ))}
          </div>
        </section>
      </div>
    </StaffShell>
  );
}
