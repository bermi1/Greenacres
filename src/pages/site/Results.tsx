import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, FileImage } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { niceDate } from '../../lib/format';
import { posts, results } from '../../content/site';
import { PageHero, Photo, Pill, Reveal, SectionHead, useLightbox } from '../../components/ui';

export default function Results() {
  const { tr, lang } = useLang();
  const lb = useLightbox();
  const [exam, setExam] = useState(results[0].id);
  const ex = results.find((r) => r.id === exam) ?? results[0];
  const source = posts.find((p) => p.slug === ex.post);
  const resultPosts = posts.filter((p) => p.category === 'Results');

  return (
    <>
      <PageHero
        kicker={tr('RESULTS & PUBLICATIONS', 'MATOKEO NA MACHAPISHO')}
        title={tr('Our results, readable on any phone.', 'Matokeo yetu, yanasomeka kwa simu yoyote.')}
        lead={tr('National examination results as real text and numbers, not just pictures, so every parent can read and search them.', 'Matokeo ya mitihani ya taifa kama maandishi na namba halisi, si picha pekee, ili kila mzazi ayasome na kuyatafuta.')}
        photo="graduation"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div role="tablist" aria-label={tr('Examinations', 'Mitihani')} className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {results.map((r) => (
            <Pill key={r.id} on={exam === r.id} onClick={() => setExam(r.id)} className="flex-none">
              {tr(r.en, r.sw)}
            </Pill>
          ))}
        </div>

        <div key={ex.id} className="overflow-hidden rounded-3xl border border-line bg-white animate-fadeUp">
          <div className="flex flex-wrap items-start justify-between gap-4 p-6 sm:p-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold tracking-wider text-gold-700">{ex.k}</div>
              <h2 className="mb-2 mt-1 font-display text-3xl font-extrabold">{tr(ex.en, ex.sw)}</h2>
              <p className="m-0 leading-relaxed text-ink-2">{tr(ex.noteEn, ex.noteSw)}</p>
            </div>
            <a href="https://www.necta.go.tz" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-line-2 px-4 py-2.5 text-sm font-bold no-underline">
              {tr('Official results on NECTA', 'Matokeo rasmi NECTA')} <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {ex.stats.length > 0 && (
            <div className="grid grid-cols-2 border-y border-line md:grid-cols-4">
              {ex.stats.map((s, k) => (
                <div key={s.en} className={`p-5 sm:p-6 ${k % 2 === 0 ? 'border-r' : ''} ${k < 2 ? 'border-b md:border-b-0' : ''} border-line md:border-r md:last:border-r-0`}>
                  <div className="text-sm text-ink-3">{tr(s.en, s.sw)}</div>
                  <div className="font-display text-3xl font-extrabold text-green-600">{s.v}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
            {ex.rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b border-line text-xs tracking-wider text-ink-3">
                      <th className="py-3 pr-3 font-bold">{tr('SCHOOL · GRADE', 'SHULE · DARAJA')}</th>
                      <th className="py-3 pr-3 font-bold">{tr('PUPILS', 'WANAFUNZI')}</th>
                      <th className="py-3 font-bold">{tr('SHARE', 'ASILIMIA')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ex.rows.map((r) => (
                      <tr key={r.a} className="border-b border-paper-2">
                        <td className="py-3 pr-3 font-semibold">{r.a}</td>
                        <td className="py-3 pr-3 tabular-nums">{r.b}</td>
                        <td className="py-3">
                          {/%$/.test(r.c) ? (
                            <span className="flex items-center gap-2">
                              <span className="h-2 flex-1 rounded-full bg-paper-2"><span className="block h-2 rounded-full bg-green-600" style={{ width: r.c }} /></span>
                              <span className="w-10 text-right tabular-nums">{r.c}</span>
                            </span>
                          ) : (
                            r.c
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl bg-gold-50 p-5 text-sm leading-relaxed text-ink-2">
                <FileImage className="mb-2 h-6 w-6 text-gold-700" aria-hidden="true" />
                {tr('The breakdown for this exam is only available as the image the school published. Tap it to view it full size.', 'Uchambuzi wa mtihani huu upo kama picha iliyochapishwa na shule pekee. Gusa picha kuiona kubwa.')}
              </div>
            )}
            {source?.cover && (
              <button type="button" onClick={() => lb.open([{ kind: 'image', name: source.cover!, caption: tr(source.title, source.titleSw) }])} className="group overflow-hidden rounded-2xl border border-line bg-paper text-left">
                <Photo name={source.cover} alt={tr('Results as published by the school', 'Matokeo kama yalivyochapishwa na shule')} className="max-h-72 w-full object-contain transition group-hover:scale-[1.02]" />
                <span className="block px-4 py-3 text-sm font-semibold text-green-600">{tr('View the published results', 'Angalia matokeo yaliyochapishwa')}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <SectionHead kicker={tr('PUBLICATIONS', 'MACHAPISHO')} title={tr('Results announcements', 'Matangazo ya matokeo')} />
        <div className="grid gap-3 md:grid-cols-2">
          {resultPosts.map((p, k) => (
            <Reveal key={p.slug} delay={(k % 2) * 80}>
              <Link to={`/news/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-3 pr-5 text-ink no-underline transition hover:border-green-600 hover:shadow-lift">
                <div className="h-20 w-28 flex-none overflow-hidden rounded-xl bg-green-50">{p.cover && <Photo name={p.cover} alt="" className="h-full w-full" sizes="120px" />}</div>
                <div className="flex-1">
                  <div className="text-xs text-ink-3">{niceDate(p.date, lang)}</div>
                  <div className="font-bold leading-snug">{tr(p.title, p.titleSw)}</div>
                </div>
                <ArrowRight className="h-5 w-5 flex-none text-green-600 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      {lb.node}
    </>
  );
}
