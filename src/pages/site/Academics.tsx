import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Atom, BookOpenText, Briefcase, CheckCircle2, Drama, Globe2, Leaf, Medal, Mic2, Palette, Shield, Trophy } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { activities, clubs, levels } from '../../content/site';
import { PageHero, Photo, Pill, Reveal, SectionHead, VideoTile, useLightbox } from '../../components/ui';
import { ApplyBanner } from '../../components/SiteLayout';

const CLUB_ICONS = [Mic2, Atom, Drama, Leaf, Shield, Trophy, Palette, Globe2];

export default function Academics() {
  const { tr, lang } = useLang();
  const { hash } = useLocation();
  const lb = useLightbox();
  const [level, setLevel] = useState(() => (levels.some((l) => '#' + l.id === hash) ? hash.slice(1) : 'ol'));
  useEffect(() => {
    if (levels.some((l) => '#' + l.id === hash)) setLevel(hash.slice(1));
  }, [hash]);
  const lvl = levels.find((l) => l.id === level) ?? levels[2];

  const combos = [
    { icon: Atom, name: tr('Science', 'Sayansi'), text: tr('For future doctors, engineers and technologists.', 'Kwa madaktari, wahandisi na wataalamu wa teknolojia wa baadaye.'), color: 'bg-green-600 text-white' },
    { icon: Briefcase, name: tr('Business', 'Biashara'), text: tr('Economics, commerce and accounting pathways.', 'Njia za uchumi, biashara na uhasibu.'), color: 'bg-gold-400 text-ink' },
    { icon: BookOpenText, name: tr('Arts', 'Sanaa'), text: tr('Languages, history, geography and law pathways.', 'Njia za lugha, historia, jiografia na sheria.'), color: 'bg-sky-600 text-white' },
  ];

  return (
    <>
      <PageHero
        page="academics"
        kicker={tr('ACADEMICS', 'TAALUMA')}
        title={tr('A complete journey, from Nursery to A-Level.', 'Safari kamili, kutoka Awali hadi A-Level.')}
        lead={tr('Strong academic foundations, values-based education and co-curricular enrichment, taught by dedicated teachers at every stage.', 'Misingi imara ya kitaaluma, elimu ya maadili na shughuli za ziada, zikifundishwa na walimu waliojitoa katika kila hatua.')}
        photo="learning-in-motion-our-green-acres-teach"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8" id="levels">
        <SectionHead kicker={tr('LEVELS', 'NGAZI')} title={tr('Explore each level', 'Chunguza kila ngazi')} />
        <div role="tablist" aria-label={tr('Levels', 'Ngazi')} className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {levels.map((l) => (
            <Pill key={l.id} on={level === l.id} onClick={() => setLevel(l.id)} className="flex-none">
              {tr(l.en, l.sw)}
            </Pill>
          ))}
        </div>
        <div key={lvl.id} className="grid items-stretch gap-6 overflow-hidden rounded-3xl border border-line bg-white animate-fadeUp lg:grid-cols-2" id={lvl.id}>
          <div className="p-6 sm:p-10">
            <div className="text-xs font-bold tracking-wider text-gold-700">{tr(lvl.ageEn, lvl.ageSw)}</div>
            <h3 className="mb-3 mt-2 font-display text-3xl font-extrabold">{tr(lvl.en, lvl.sw)}</h3>
            <p className="m-0 leading-relaxed text-ink-2">{tr(lvl.textEn, lvl.textSw)}</p>
            <ul className="mt-6 flex list-none flex-col gap-3 p-0">
              {(lang === 'sw' ? lvl.pointsSw : lvl.pointsEn).map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/admissions" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white no-underline hover:bg-green-700">
              {tr('How to apply', 'Jinsi ya kuomba')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Photo name={lvl.photo} alt="" className="h-72 w-full lg:h-full" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHead kicker="A-LEVEL" title={tr('Combinations in three streams', 'Michepuo katika mikondo mitatu')}>
            {tr('Ask the admissions office for the exact combinations offered this year.', 'Uliza ofisi ya udahili kuhusu michepuo inayotolewa mwaka huu.')}
          </SectionHead>
          <div className="grid gap-4 md:grid-cols-3">
            {combos.map((c, k) => (
              <Reveal key={c.name} delay={k * 80} className="rounded-3xl border border-line bg-paper p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${c.color}`}>
                  <c.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-4 font-display text-xl font-extrabold">{c.name}</div>
                <p className="mb-0 mt-1 text-ink-3">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <SectionHead kicker={tr('BEYOND THE CLASSROOM', 'NJE YA DARASA')} title={tr('Clubs, sport and culture', 'Klabu, michezo na utamaduni')} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map(([en, sw, dEn, dSw], k) => {
            const Icon = CLUB_ICONS[k] ?? Medal;
            return (
              <Reveal key={en} delay={(k % 4) * 60} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-green-50 text-green-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold">{tr(en, sw)}</div>
                  <div className="text-sm text-ink-3">{tr(dEn, dSw)}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {activities.map((a) => (
            <div key={a.photo} className="relative h-48 overflow-hidden rounded-2xl">
              <Photo name={a.photo} alt={tr(a.en, a.sw)} className="h-full w-full" sizes="25vw" />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold">{tr(a.en, a.sw)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-8">
        <div className="grid items-center gap-6 rounded-3xl bg-green-800 p-6 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-wider text-[#FFE27A]">{tr('PARENTS SAY', 'WAZAZI WANASEMA')}</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold">{tr('Why this parent chose Green Acres', 'Kwa nini mzazi huyu alichagua Green Acres')}</h2>
            <p className="text-[#CFE6D5]">{tr('Listen to a parent’s honest views and message to other families (in Kiswahili).', 'Sikiliza maoni ya dhati ya mzazi na ujumbe wake kwa wazazi wengine.')}</p>
            <Link to="/results" className="mt-2 inline-flex items-center gap-2 font-bold text-[#FFE27A] no-underline">
              {tr('Assessment and national results', 'Tathmini na matokeo ya taifa')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <VideoTile id="parent-testimonial" title={tr('Parent testimonial', 'Ushuhuda wa mzazi')} onOpen={() => lb.open([{ kind: 'video', name: 'parent-testimonial' }])} className="aspect-video" />
        </div>
      </section>

      <ApplyBanner />
      {lb.node}
    </>
  );
}
