import { Link } from 'react-router-dom';
import { ArrowRight, Images, Play } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { facilities } from '../../content/site';
import { PageHero, Photo, Reveal, useLightbox } from '../../components/ui';

export default function Facilities() {
  const { tr } = useLang();
  const lb = useLightbox();

  return (
    <>
      <PageHero
        kicker={tr('FACILITIES', 'MIUNDOMBINU')}
        title={tr('Spaces built for learning, living and growing.', 'Mazingira ya kujifunza, kuishi na kukua.')}
        lead={tr('Modern labs, a connected computer lab, safe boarding, a green sports field and a dispensary on campus.', 'Maabara za kisasa, maabara ya kompyuta, bweni salama, uwanja wa kijani na zahanati ndani ya shule.')}
        photo="2-2"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="flex flex-col gap-6">
          {facilities.map((f, k) => {
            const pics = f.gallery ?? [f.photo];
            return (
              <Reveal key={f.id} className={`grid items-center overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2`}>
                <div className={`relative h-72 lg:h-full lg:min-h-[340px] ${k % 2 ? 'lg:order-2' : ''}`}>
                  <Photo name={f.photo} alt={tr(f.en, f.sw)} className="absolute inset-0 h-full w-full" />
                </div>
                <div className="p-6 sm:p-10">
                  <div className="text-xs font-bold tracking-wider text-gold-700">0{k + 1}</div>
                  <h2 className="mb-3 mt-1 font-display text-2xl font-extrabold sm:text-3xl">{tr(f.en, f.sw)}</h2>
                  <p className="m-0 leading-relaxed text-ink-2">{tr(f.dEn, f.dSw)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pics.length > 1 && (
                      <button type="button" onClick={() => lb.open(pics.map((n) => ({ kind: 'image' as const, name: n, caption: tr(f.en, f.sw) })))} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line-2 px-4 font-semibold hover:border-green-600">
                        <Images className="h-4 w-4 text-green-600" aria-hidden="true" /> {tr(`${pics.length} photos`, `Picha ${pics.length}`)}
                      </button>
                    )}
                    {f.video && (
                      <button type="button" onClick={() => lb.open([{ kind: 'video', name: f.video!, caption: tr(f.en, f.sw) }])} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-green-600 px-4 font-semibold text-white hover:bg-green-700">
                        <Play className="h-4 w-4 fill-current" aria-hidden="true" /> {tr('Watch the video', 'Tazama video')}
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-green-800 p-8 text-white sm:p-11">
          <div className="max-w-xl">
            <h2 className="m-0 font-display text-3xl font-extrabold">{tr('See it for yourself', 'Njoo ujionee')}</h2>
            <p className="mb-0 mt-2 text-[#CFE6D5]">{tr('Book a campus visit and meet our teachers. Visits are arranged with the admissions office, Monday to Saturday.', 'Panga ziara ya kampasi na ukutane na walimu wetu. Ziara hupangwa na ofisi ya udahili, Jumatatu hadi Jumamosi.')}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-4 font-extrabold text-ink no-underline">
            {tr('Book a visit', 'Panga ziara')} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
      {lb.node}
    </>
  );
}
