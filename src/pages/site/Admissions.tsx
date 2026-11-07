import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, ClipboardList, Download, FileText, MessageSquare, Minus, Plus, Sun, Upload, Wallet } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { doc, thumb } from '../../lib/media';
import { faqCards, faqs, joiningDocs } from '../../content/site';
import { PageHero, Photo, Reveal, SectionHead, useLightbox } from '../../components/ui';

export default function Admissions() {
  const { tr } = useLang();
  const lb = useLightbox();
  const [open, setOpen] = useState(0);
  const levelsOpen = tr('Nursery|Primary|Pre-Form 1|Form One|Pre-Form 5|Form Five (A-Level)', 'Awali|Msingi|Pre-Form 1|Kidato cha 1|Pre-Form 5|Kidato cha 5 (A-Level)').split('|');
  const steps = [
    { icon: ClipboardList, h: tr('Fill the form', 'Jaza maombi'), p: tr('Online in English or Kiswahili, in about 10 minutes.', 'Mtandaoni kwa Kiingereza au Kiswahili, kwa takribani dakika 10.') },
    { icon: Upload, h: tr('Add documents', 'Ambatisha nyaraka'), p: tr('Birth certificate, latest report and a photo. A phone photo is fine.', 'Cheti cha kuzaliwa, ripoti ya mwisho na picha. Picha ya simu inatosha.') },
    { icon: Wallet, h: tr('Pay the application fee', 'Lipa ada ya maombi'), p: tr('By mobile money or bank. Amount as in the joining instructions.', 'Kwa simu au benki. Kiasi kiko kwenye maelekezo ya kujiunga.') },
    { icon: MessageSquare, h: tr('Interview and offer', 'Usaili na nafasi'), p: tr('Every update reaches you by SMS, right through to enrolment.', 'Kila taarifa inakufikia kwa SMS hadi usajili.') },
  ];

  return (
    <>
      <PageHero
        kicker={tr('ADMISSIONS 2027', 'UDAHILI 2027')}
        title={tr('Join the Green Acres family.', 'Jiunge na familia ya Green Acres.')}
        lead={tr('A simple, transparent and supportive admission process for every level, from Nursery to A-Level.', 'Mchakato rahisi, wa wazi na wenye msaada kwa kila ngazi, kuanzia Awali hadi A-Level.')}
        photo="a-week-back-in-the-groove-at-green-acres"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-4 font-extrabold text-ink no-underline transition hover:-translate-y-0.5">
            {tr('Apply online', 'Omba mtandaoni')} <ArrowRight className="h-5 w-5" />
          </Link>
          <a href="#joining" className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white no-underline hover:bg-white/10">
            {tr('Joining instructions', 'Maelekezo ya kujiunga')}
          </a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <Reveal className="grid gap-6 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-wider text-gold-700">{tr('NOW OPEN', 'IKO WAZI SASA')}</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold">{tr('Form One 2027 admission is open', 'Udahili wa Kidato cha Kwanza 2027 uko wazi')}</h2>
            <p className="leading-relaxed text-ink-2">{tr('We welcome students at every stage, from their first classroom experience to their final years of high school. Tell us about your child and we will guide you through each step.', 'Tunawakaribisha wanafunzi katika kila hatua, kuanzia darasa lao la kwanza hadi miaka ya mwisho ya sekondari. Tuambie kuhusu mtoto wako nasi tutakuongoza.')}</p>
            <Link to="/apply" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white no-underline hover:bg-green-700">
              {tr('Start an application', 'Anza maombi')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl bg-paper p-5">
            <div className="text-sm font-bold text-ink-2">{tr('Levels accepting applications', 'Ngazi zinazopokea maombi')}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {levelsOpen.map((l) => (
                <span key={l} className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold shadow-sm">{l}</span>
              ))}
            </div>
            <div className="mt-5 text-sm text-ink-3">
              {tr('Questions? Call', 'Maswali? Piga')} <a href="tel:+255782128633" className="font-bold">+255 782 128 633</a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <SectionHead kicker={tr('HOW TO APPLY', 'JINSI YA KUOMBA')} title={tr('Four simple steps', 'Hatua nne rahisi')} />
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, k) => (
            <Reveal as="li" key={s.h} delay={k * 80} className="relative rounded-2xl border border-line bg-white p-6">
              <div className="absolute right-5 top-5 font-display text-4xl font-extrabold text-paper-2">0{k + 1}</div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400 text-ink">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-4 font-display text-lg font-extrabold">{s.h}</div>
              <p className="mb-0 mt-1 text-sm leading-relaxed text-ink-3">{s.p}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHead kicker={tr('STUDY MODE', 'AINA YA MASOMO')} title={tr('Boarding or day', 'Bweni au kutwa')} />
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="overflow-hidden rounded-3xl border border-line">
              <Photo name="domitory" alt={tr('A dormitory at Green Acres', 'Bweni la Green Acres')} className="h-56 w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 font-display text-xl font-extrabold"><BedDouble className="h-5 w-5 text-green-600" aria-hidden="true" />{tr('Boarding', 'Bweni')}</div>
                <p className="mb-0 mt-2 text-ink-2">{tr('Supervised dormitories for secondary students who live far from campus, with caring staff, a structured routine and an on-campus dispensary.', 'Mabweni yanayosimamiwa kwa wanafunzi wa sekondari wanaoishi mbali, wakiwa na walezi, ratiba maalum na zahanati ya shule.')}</p>
              </div>
            </Reveal>
            <Reveal delay={100} className="overflow-hidden rounded-3xl border border-line">
              <Photo name="2-2" alt={tr('The Salasala campus', 'Kampasi ya Salasala')} className="h-56 w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 font-display text-xl font-extrabold"><Sun className="h-5 w-5 text-gold-500" aria-hidden="true" />{tr('Day', 'Kutwa')}</div>
                <p className="mb-0 mt-2 text-ink-2">{tr('For families near Salasala and Mbezi Beach, with full access to labs, library and every co-curricular activity.', 'Kwa familia zilizo karibu na Salasala na Mbezi Beach, wakifurahia maabara, maktaba na shughuli zote za ziada.')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="joining" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-8">
        <SectionHead kicker={tr('DOWNLOADS', 'VIPAKUZI')} title={tr('2027 joining instructions', 'Maelekezo ya kujiunga 2027')}>
          {tr('Fees, uniform and requirements for each level, as PDF (in Kiswahili).', 'Ada, sare na mahitaji kwa kila ngazi, kama PDF.')}
        </SectionHead>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {joiningDocs.map((d) => (
            <a key={d.file} href={doc(d.file)} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-ink no-underline transition hover:-translate-y-0.5 hover:border-green-600 hover:shadow-lift">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-red-50 text-red-700">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-bold">{tr(d.en, d.sw)}</span>
                <span className="block text-xs text-ink-3">PDF · 2027</span>
              </span>
              <Download className="h-5 w-5 text-green-600 transition group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHead kicker="FAQ" title={tr('Frequently asked questions', 'Maswali yanayoulizwa mara kwa mara')} />
            <div className="flex flex-col gap-2.5">
              {faqs.map(([qEn, qSw, aEn, aSw], k) => {
                const on = open === k;
                return (
                  <div key={qEn} className="rounded-2xl border border-line bg-paper">
                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : k)} className="flex min-h-[56px] w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold">
                      {tr(qEn, qSw)}
                      <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white text-green-600">{on ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
                    </button>
                    {on && <p className="m-0 px-5 pb-5 leading-relaxed text-ink-2 animate-pop">{tr(aEn, aSw)}</p>}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[.08em] text-gold-700">{tr('FROM THE SCHOOL', 'KUTOKA SHULENI')}</div>
            <h3 className="mb-4 mt-1.5 font-display text-2xl font-extrabold">{tr('Question cards (Kiswahili)', 'Kadi za maswali')}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {faqCards.map((n, k) => (
                <button key={n} type="button" onClick={() => lb.open(faqCards.map((x) => ({ kind: 'image' as const, name: x })), k)} className="overflow-hidden rounded-xl border border-line transition hover:-translate-y-0.5 hover:shadow-lift" aria-label={tr(`Open question card ${k + 1}`, `Fungua kadi ya swali ${k + 1}`)}>
                  <img src={thumb(n)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {lb.node}
    </>
  );
}
