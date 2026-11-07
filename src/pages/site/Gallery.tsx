import { useMemo, useState } from 'react';
import { Images, Play } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { fromSource, thumb } from '../../lib/media';
import { albums, posts, videos } from '../../content/site';
import { PageHero, Photo, Pill, Reveal, VideoTile, useLightbox } from '../../components/ui';

type Group = { id: string; title: string; text: string; images: string[]; video: string | null; tag: 'events' | 'trips' | 'campus' | 'culture' };

const SW: Record<string, string> = {
  '25 Years Anniversary': 'Maadhimisho ya miaka 25',
  'Maulid Day, A Celebration of Faith & Unity': 'Siku ya Maulid',
  'Bujugo Day': 'Siku ya Bujugo',
  'Bukoba Airport School Trip': 'Ziara ya Uwanja wa Ndege Bukoba',
  'School Tour to Kagera Sugar Industry': 'Ziara ya Kiwanda cha Sukari Kagera',
  'School Tour to Kaole Historical Site, Bagamoyo': 'Ziara ya Magofu ya Kaole, Bagamoyo',
  'Form VI Graduation Day, Celebrating Success & New Beginnings': 'Mahafali ya Kidato cha Sita',
  'Skonga TV Visits Green Acres Schools': 'Skonga TV yatembelea Green Acres',
};

function tagFor(title: string): Group['tag'] {
  if (/Tour|Trip|CRDB|Hospital|Skonga/i.test(title)) return 'trips';
  if (/Cultural|Maulid|Sunday/i.test(title)) return 'culture';
  return 'events';
}

export default function Gallery() {
  const { tr } = useLang();
  const lb = useLightbox();
  const [filter, setFilter] = useState<'all' | Group['tag'] | 'video'>('all');

  const groups = useMemo<Group[]>(() => {
    const fromPosts = ['cultural-day-at-green-acres-fashion-dance-food-25-years-of-legacy', 'green-acres-career-day-august-2025-inspiring-dreams-shaping-futures', 'uzinduzi-wa-klabu-ya-uhamiaji', 'green-acres-schools-honored-for-compassionate-contribution-at-upendo-wa-yatima-kwa-mama-event']
      .map((slug) => posts.find((p) => p.slug === slug)!)
      .filter(Boolean)
      .map((p) => ({ id: p.slug, title: tr(p.title, p.titleSw), text: p.excerpt, images: p.images, video: null, tag: tagFor(p.title) }));
    const fromAlbums = albums.map((a, k) => ({ id: 'a' + k, title: tr(a.title.split(/! |, /)[0], SW[a.title] ?? a.title), text: a.text, images: a.images, video: a.video, tag: tagFor(a.title) }));
    const campus = { id: 'campus', title: tr('Our campus and facilities', 'Kampasi na miundombinu'), text: '', images: [...fromSource('facilities'), ...fromSource('home').slice(0, 6)].filter((v, i, arr) => arr.indexOf(v) === i), video: null, tag: 'campus' as const };
    const alumni = { id: 'alumni', title: tr('Alumni gathering', 'Mkusanyiko wa wahitimu'), text: '', images: fromSource('alumni'), video: null, tag: 'events' as const };
    return [...fromPosts, ...fromAlbums, campus, alumni].filter((g) => g.images.length);
  }, [tr]);

  const shown = filter === 'all' || filter === 'video' ? groups : groups.filter((g) => g.tag === filter);
  const total = groups.reduce((n, g) => n + g.images.length, 0);
  const openGroup = (g: Group, k = 0) => lb.open(g.images.map((n) => ({ kind: 'image' as const, name: n, caption: g.title })), k);

  return (
    <>
      <PageHero
        page="gallery"
        kicker={tr('GALLERY', 'PICHA')}
        title={tr('Snapshots of success.', 'Picha za mafanikio.')}
        lead={tr(`${total} photos and ${videos.length} videos of classrooms, labs, sports, culture, trips and celebrations across our campuses.`, `Picha ${total} na video ${videos.length} za madarasa, maabara, michezo, utamaduni, ziara na sherehe.`)}
        photo="p1336293-7"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label={tr('Filter albums', 'Chuja albamu')}>
          {[
            ['all', tr('All albums', 'Albamu zote')],
            ['events', tr('Events', 'Matukio')],
            ['culture', tr('Culture and faith', 'Utamaduni na imani')],
            ['trips', tr('Trips and visits', 'Ziara')],
            ['campus', tr('Campus', 'Kampasi')],
            ['video', tr('Videos', 'Video')],
          ].map(([id, label]) => (
            <Pill key={id} on={filter === id} onClick={() => setFilter(id as typeof filter)} className="flex-none">
              {label}
            </Pill>
          ))}
        </div>

        {filter === 'video' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, k) => (
              <Reveal key={v.id} delay={(k % 3) * 70}>
                <VideoTile id={v.id} title={tr(v.en, v.sw)} onOpen={() => lb.open(videos.map((x) => ({ kind: 'video' as const, name: x.id, caption: tr(x.en, x.sw) })), k)} className="aspect-video w-full" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {shown.map((g) => (
              <Reveal key={g.id} as="section">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div className="max-w-3xl">
                    <h2 className="m-0 font-display text-2xl font-extrabold">{g.title}</h2>
                    {g.text && <p className="mb-0 mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-3">{g.text}</p>}
                  </div>
                  <div className="flex gap-2">
                    {g.video && (
                      <button type="button" onClick={() => lb.open([{ kind: 'video', name: g.video!, caption: g.title }])} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-green-600 px-4 text-sm font-semibold text-white">
                        <Play className="h-3.5 w-3.5 fill-current" /> Video
                      </button>
                    )}
                    <button type="button" onClick={() => openGroup(g)} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line-2 bg-white px-4 text-sm font-semibold">
                      <Images className="h-4 w-4 text-green-600" /> {g.images.length}
                    </button>
                  </div>
                </div>
                <div className="grid auto-rows-[120px] grid-cols-3 gap-2 sm:auto-rows-[150px] sm:grid-cols-4 lg:grid-cols-6">
                  {g.images.slice(0, 8).map((n, k) => {
                    const big = k === 0;
                    const more = k === 7 && g.images.length > 8;
                    return (
                      <button key={n} type="button" onClick={() => openGroup(g, k)} className={`group relative overflow-hidden rounded-xl ${big ? 'col-span-2 row-span-2' : ''} ${k >= 4 ? 'hidden sm:block' : ''} ${k >= 6 ? 'sm:hidden lg:block' : ''}`} aria-label={tr(`Open photo ${k + 1} of ${g.title}`, `Fungua picha ${k + 1}`)}>
                        {big ? <Photo name={n} alt="" className="h-full w-full transition duration-500 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 66vw" /> : <img src={thumb(n)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                        {more && <span className="absolute inset-0 grid place-items-center bg-green-900/70 font-display text-2xl font-extrabold text-white">+{g.images.length - 8}</span>}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
      {lb.node}
    </>
  );
}
