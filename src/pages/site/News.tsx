import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock, MapPin, MessageCircle, Play } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { niceDate } from '../../lib/format';
import { events, posts } from '../../content/site';
import { PageHero, Photo, Pill, Reveal, inputCls } from '../../components/ui';
import { db, useDb } from '../../data/db';

export default function News() {
  const { tr, lang } = useLang();
  const [tab, setTab] = useState<'all' | 'news' | 'results'>('all');
  const [phone, setPhone] = useState('');
  const [joined, setJoined] = useState(false);
  const status = useDb((t) => t.postStatus);
  const shown = posts.filter((p) => (status[p.slug] ?? 'Published') === 'Published').filter((p) => tab === 'all' || (tab === 'results' ? p.category === 'Results' : p.category !== 'Results'));
  const [first, ...rest] = shown;

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    db.subscribe(phone.trim());
    setJoined(true);
  };

  return (
    <>
      <PageHero
        page="news"
        kicker={tr('NEWS & EVENTS', 'HABARI NA MATUKIO')}
        title={tr('What is happening at Green Acres.', 'Kinachoendelea Green Acres.')}
        lead={tr('Results, clubs, celebrations and events from our campuses, always dated.', 'Matokeo, klabu, sherehe na matukio kutoka kampasi zetu, kila mara kwa tarehe.')}
        photo="p1336273-1"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div role="tablist" aria-label={tr('Filter', 'Chuja')} className="mb-6 flex flex-wrap gap-2">
          <Pill on={tab === 'all'} onClick={() => setTab('all')}>{tr('All', 'Zote')}</Pill>
          <Pill on={tab === 'news'} onClick={() => setTab('news')}>{tr('News', 'Habari')}</Pill>
          <Pill on={tab === 'results'} onClick={() => setTab('results')}>{tr('Results', 'Matokeo')}</Pill>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {first && (
              <Link key={first.slug} to={`/news/${first.slug}`} className="group overflow-hidden rounded-3xl border border-line bg-white text-ink no-underline transition hover:shadow-lift animate-fadeUp">
                <div className="relative h-64 overflow-hidden bg-green-50 sm:h-80">
                  {first.cover && <Photo name={first.cover} alt="" className="h-full w-full transition duration-700 group-hover:scale-105" large />}
                  {(first.hasVideo || first.video) && <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white"><Play className="h-3 w-3 fill-current" /> Video</span>}
                </div>
                <div className="p-6">
                  <Meta cat={first.category} date={niceDate(first.date, lang)} />
                  <h2 className="mb-2 mt-2 font-display text-2xl font-extrabold leading-snug">{tr(first.title, first.titleSw)}</h2>
                  <p className="m-0 text-ink-3">{first.excerpt}</p>
                </div>
              </Link>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((p, k) => (
                <Reveal key={p.slug} delay={(k % 2) * 80}>
                  <Link to={`/news/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink no-underline transition hover:-translate-y-1 hover:shadow-lift">
                    <div className="h-44 overflow-hidden bg-green-50">{p.cover && <Photo name={p.cover} alt="" className="h-full w-full transition duration-700 group-hover:scale-105" sizes="(min-width:640px) 33vw, 100vw" />}</div>
                    <div className="flex-1 p-5">
                      <Meta cat={p.category} date={niceDate(p.date, lang)} />
                      <div className="mt-2 font-display text-[17px] font-extrabold leading-snug">{tr(p.title, p.titleSw)}</div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-3xl border border-line bg-white p-6">
              <div className="flex items-center gap-2 font-display text-lg font-extrabold">
                <CalendarDays className="h-5 w-5 text-green-600" aria-hidden="true" /> {tr('School events', 'Matukio ya shule')}
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {events.map((e) => (
                  <div key={e.en} className="flex gap-3">
                    <div className="w-14 flex-none rounded-xl bg-green-600 py-2 text-center text-white">
                      <div className="font-display text-xl font-extrabold leading-none">{e.d}</div>
                      <div className="text-[11px] font-bold uppercase">{tr(e.mEn, e.mSw)}</div>
                    </div>
                    <div>
                      <div className="font-bold leading-snug">{tr(e.en, e.sw)}</div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink-3">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mb-0 mt-4 text-xs text-ink-3">{tr('Dates as listed by the school. Call the office to confirm this year’s calendar.', 'Tarehe kama zilivyotangazwa na shule. Piga ofisini kuthibitisha kalenda ya mwaka huu.')}</p>
            </div>

            <form onSubmit={subscribe} className="rounded-3xl bg-gold-400 p-6">
              <div className="font-display text-lg font-extrabold">{tr('Get updates', 'Pata taarifa')}</div>
              <p className="mb-3 mt-1 text-sm text-[#3D3A1F]">{tr('Announcements, events and term dates on WhatsApp or SMS.', 'Matangazo, matukio na tarehe za muhula kwa WhatsApp au SMS.')}</p>
              {joined ? <div className="rounded-2xl bg-white/70 p-4 font-semibold">{tr('Subscribed. Asante!', 'Umejisajili. Asante!')}</div> : <>
              <label className="sr-only" htmlFor="sub-phone">{tr('Phone number', 'Namba ya simu')}</label>
              <input id="sub-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+255 7__ ___ ___" className={inputCls} />
              <button type="submit" className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-green-800 font-bold text-white">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> {tr('Subscribe', 'Jisajili')}
              </button></>}
            </form>

            <Link to="/gallery" className="group relative block h-48 overflow-hidden rounded-3xl text-white no-underline">
              <Photo name="dsc2070-2" alt="" className="h-full w-full transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
              <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 font-display text-lg font-extrabold">{tr('Photo albums', 'Albamu za picha')} <ArrowRight className="h-5 w-5" /></span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function Meta({ cat, date }: { cat: string; date: string }) {
  const { tr } = useLang();
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`rounded-full px-2.5 py-1 font-bold ${cat === 'Results' ? 'bg-gold-50 text-gold-700' : 'bg-green-50 text-green-600'}`}>{cat === 'Results' ? tr('Results', 'Matokeo') : tr('News', 'Habari')}</span>
      <span className="text-ink-3">{date}</span>
    </div>
  );
}
