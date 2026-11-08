import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Share2 } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { niceDate } from '../../lib/format';
import { img } from '../../lib/media';
import { posts, school } from '../../content/site';
import { Photo, Reveal, VideoTile, useLightbox } from '../../components/ui';
import NotFound from './NotFound';

export default function NewsPost() {
  const { slug } = useParams();
  const { tr, lang } = useLang();
  const lb = useLightbox();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return <NotFound />;
  const p = posts[i];
  const next = posts[(i + 1) % posts.length];
  const gallery = p.images.filter((n) => n !== p.cover);
  const share = `https://wa.me/?text=${encodeURIComponent(`${p.title} · Green Acres Schools ${window.location.origin}/news/${p.slug}`)}`;

  return (
    <article>
      <header className="relative overflow-hidden bg-green-800 text-white">
        {p.cover && <img src={img(p.cover)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 animate-kenburns motion-reduce:animate-none" />}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/70 to-green-800/30" />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-16 sm:px-8 sm:pt-24">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#CFE6D5] no-underline hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {tr('All news', 'Habari zote')}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#CFE6D5]">
            <span className="rounded-full bg-gold-400 px-2.5 py-1 text-xs font-bold text-ink">{p.category === 'Results' ? tr('Results', 'Matokeo') : tr('News', 'Habari')}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{niceDate(p.date, lang)}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl animate-fadeUp">{tr(p.title, p.titleSw)}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
        {p.cover && (
          <button type="button" onClick={() => lb.open([p.cover!, ...gallery].map((n) => ({ kind: 'image' as const, name: n })))} className="-mt-24 mb-10 block w-full overflow-hidden rounded-3xl border-4 border-white bg-white shadow-card sm:-mt-28">
            <Photo name={p.cover} alt="" className="max-h-[480px] w-full object-cover" large />
          </button>
        )}
        <div className="space-y-4 text-[17px] leading-relaxed text-ink-2">
          {lang === 'sw' && p.titleSw !== p.title && <p className="rounded-xl bg-gold-50 p-3 text-sm text-gold-700">Habari hii imeandikwa kwa lugha iliyotumiwa na shule.</p>}
          {p.blocks.map((b, k) =>
            b.type === 'h' ? (
              <h2 key={k} className="pt-4 font-display text-2xl font-extrabold text-ink">{b.text}</h2>
            ) : b.type === 'li' ? (
              <p key={k} className="m-0 flex gap-3 pl-1"><span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-green-600" />{b.text}</p>
            ) : (
              <p key={k} className="m-0 whitespace-pre-line">{b.text}</p>
            ),
          )}
        </div>

        {p.video && (
          <div className="mt-10">
            <VideoTile id={p.video} title={tr('Watch the video', 'Tazama video')} onOpen={() => lb.open([{ kind: 'video', name: p.video! }])} className="aspect-video w-full" />
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <a href={share} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-green-600 px-4 font-semibold text-white no-underline">
            <Share2 className="h-4 w-4" /> {tr('Share on WhatsApp', 'Shiriki WhatsApp')}
          </a>
          <a href={school.social.instagram} target="_blank" rel="noreferrer" className="text-sm font-semibold">
            {tr('More on Instagram', 'Zaidi Instagram')}
          </a>
        </div>
      </div>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-8">
          <h2 className="mb-4 font-display text-2xl font-extrabold">{tr(`Photos (${gallery.length})`, `Picha (${gallery.length})`)}</h2>
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
            {gallery.map((n, k) => (
              <Reveal key={n} delay={(k % 4) * 50}>
                <button type="button" onClick={() => lb.open(gallery.map((x) => ({ kind: 'image' as const, name: x })), k)} className="group block w-full overflow-hidden rounded-xl" aria-label={tr(`Open photo ${k + 1}`, `Fungua picha ${k + 1}`)}>
                  <Photo name={n} alt="" className="w-full transition duration-500 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <Link to={`/news/${next.slug}`} className="group flex items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 text-ink no-underline hover:shadow-lift">
          <div>
            <div className="text-xs font-bold tracking-wider text-gold-700">{tr('NEXT STORY', 'HABARI INAYOFUATA')}</div>
            <div className="mt-1 font-display text-xl font-extrabold">{tr(next.title, next.titleSw)}</div>
          </div>
          <ArrowRight className="h-6 w-6 flex-none text-green-600 transition group-hover:translate-x-1" />
        </Link>
      </section>
      {lb.node}
    </article>
  );
}
