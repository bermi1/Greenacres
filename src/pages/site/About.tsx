import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { thumb } from '../../lib/media';
import { campuses } from '../../content/site';
import { PageHero, Photo, Reveal, SectionHead, useLightbox } from '../../components/ui';
import { ApplyBanner } from '../../components/SiteLayout';

const MOMENTS = ['kwa-niaba-ya-waziri-wa-elimu-prof-nkenda-6', 'graduation', 'a-week-back-in-the-groove-at-green-acres-4', '1-1', '3', '4', 'skonga', 'mpendwa-mheshimiwa-mkuu-wa-mkoa-kagera'];

export default function About() {
  const { tr } = useLang();
  const lb = useLightbox();
  const values = tr('Discipline|Tanzanian cultural values|Academic excellence|Moral integrity|Responsibility|Compassion|Principled leadership', 'Nidhamu|Maadili ya Kitanzania|Ubora wa kitaaluma|Uadilifu|Uwajibikaji|Huruma|Uongozi wenye misingi').split('|');
  const timeline = [
    { y: '2000', e: tr('Green Acres Schools is founded by Dr Juliani Rushaigo Bujugo.', 'Green Acres Schools inaanzishwa na Dkt. Juliani Rushaigo Bujugo.') },
    { y: '2025', e: tr('25 years: anniversary dinner, Cultural Day, Career Day and the 25th graduation ceremony.', 'Miaka 25: chakula cha jioni cha maadhimisho, Siku ya Utamaduni, Siku ya Taaluma na mahafali ya 25.') },
    { y: '2025', e: tr('Bunazi Green Acres is the top school in Missenyi District for Standard Seven and Grade Four.', 'Bunazi Green Acres inaongoza Wilaya ya Missenyi kwa Darasa la Saba na Darasa la Nne.') },
    { y: '2026', e: tr('First school in Dar es Salaam to launch an Immigration Club.', 'Shule ya kwanza Dar es Salaam kuzindua Klabu ya Uhamiaji.') },
    { y: '2027', e: tr('Form One admission opens online, with SMS updates for every family.', 'Udahili wa Kidato cha Kwanza mtandaoni, na taarifa kwa SMS kwa kila familia.') },
  ];

  return (
    <>
      <PageHero
        page="about"
        kicker={tr('ABOUT US', 'KUHUSU SISI')}
        title={tr('Twenty-five years of shaping Tanzania’s future.', 'Miaka ishirini na tano ya kujenga mustakabali wa Tanzania.')}
        lead={tr('Since 2000, Green Acres Schools has provided quality education that shapes bright minds and strong, principled leaders.', 'Tangu 2000, Green Acres Schools imetoa elimu bora inayojenga akili angavu na viongozi wenye misingi imara.')}
        photo="kwa-niaba-ya-waziri-wa-elimu-prof-nkenda-6"
      />

      {/* director */}
      <section className="mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-8">
        <Reveal className="grid items-center gap-10 lg:grid-cols-5">
          <div className="relative mx-auto w-[calc(100%-24px)] max-w-sm lg:col-span-2">
            <div className="absolute -inset-3 -rotate-3 rounded-[28px] bg-gold-400" aria-hidden="true" />
            <Photo name="jacklyne-siima-rushaigo" alt="Jacklyne Siima Rushaigo, Managing Director" className="relative aspect-[4/5] w-full rounded-3xl" />
          </div>
          <div className="lg:col-span-3">
            <div className="text-xs font-bold tracking-[.08em] text-gold-700">{tr('FROM THE DIRECTOR’S DESK', 'KUTOKA KWA MKURUGENZI')}</div>
            <Quote className="mt-4 h-9 w-9 text-green-600" aria-hidden="true" />
            <p className="mt-3 font-display text-2xl font-bold leading-snug sm:text-[28px]">
              {tr('We believe in education that transforms lives, not just minds.', 'Tunaamini katika elimu inayobadilisha maisha, si akili pekee.')}
            </p>
            <div className="mt-4 space-y-3 leading-relaxed text-ink-2">
              <p className="m-0">{tr('Since our founding in 2000, we have remained true to our mission: to nurture each child’s potential while grounding them in Tanzanian values that shape strong, principled leaders.', 'Tangu tulipoanzishwa mwaka 2000, tumebaki waaminifu kwa dhamira yetu: kukuza uwezo wa kila mtoto huku tukimjenga katika maadili ya Kitanzania yanayozalisha viongozi imara.')}</p>
              <p className="m-0">{tr('From our early learners in Bunazi to our Form VI students in Dar es Salaam, we are proud to offer a caring, disciplined and future-focused learning experience. Thank you for choosing to grow with us.', 'Kuanzia wanafunzi wadogo Bunazi hadi wanafunzi wa Kidato cha Sita Dar es Salaam, tunajivunia kutoa elimu yenye upendo, nidhamu na mtazamo wa baadaye. Asante kwa kuchagua kukua nasi.')}</p>
            </div>
            <div className="mt-5">
              <div className="font-bold">Jacklyne Siima Rushaigo, MSc</div>
              <div className="text-sm text-ink-3">{tr('Managing Director, Green Acres Schools Tanzania', 'Mkurugenzi Mtendaji, Green Acres Schools Tanzania')}</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* story */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHead kicker={tr('OUR STORY', 'HISTORIA YETU')} title={tr('A founder’s vision, two campuses', 'Ndoto ya mwanzilishi, kampasi mbili')} />
            <div className="space-y-4 leading-relaxed text-ink-2">
              <p className="m-0">{tr('Dr Juliani Rushaigo Bujugo was a visionary educator and community leader whose passion for quality learning laid the foundation of Green Acres Schools in 2000. He believed every child deserves a safe, disciplined and values-driven place to thrive.', 'Dkt. Juliani Rushaigo Bujugo alikuwa mwalimu na kiongozi wa jamii mwenye maono, ambaye shauku yake kwa elimu bora iliweka msingi wa Green Acres Schools mwaka 2000. Aliamini kila mtoto anastahili mazingira salama, yenye nidhamu na maadili.')}</p>
              <p className="m-0">{tr('His legacy lives on. We integrate technology, arts, sports and leadership training to raise well-rounded young people ready to contribute to Tanzania and the world.', 'Urithi wake unaendelea. Tunaunganisha teknolojia, sanaa, michezo na mafunzo ya uongozi kulea vijana kamili walio tayari kuchangia Tanzania na dunia.')}</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex items-center gap-5 rounded-3xl bg-paper p-5">
            <Photo name="there-was-a-time-when-the-late-father-mr" alt="Dr Juliani Rushaigo Bujugo" className="aspect-[4/5] w-40 flex-none rounded-2xl sm:w-52" />
            <div>
              <div className="font-display text-xl font-extrabold">Dr Juliani Rushaigo Bujugo</div>
              <div className="text-sm text-ink-3">{tr('Co-Founder, Green Acres Schools', 'Mwanzilishi mwenza, Green Acres Schools')}</div>
              <img src={thumb('25-years')} alt={tr('25th anniversary emblem', 'Nembo ya miaka 25')} className="mt-4 h-20 w-auto" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* mission & values */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-green-600 p-8 text-white">
            <div className="text-xs font-bold tracking-wider text-[#FFE27A]">{tr('MISSION', 'DHAMIRA')}</div>
            <p className="mb-0 mt-3 text-xl leading-relaxed">{tr('To provide a supportive learning environment that fosters academic excellence, creative thinking and moral integrity, preparing students for a rapidly evolving world.', 'Kutoa mazingira ya kujifunzia yanayokuza ubora wa kitaaluma, fikra bunifu na uadilifu, kuwaandaa wanafunzi kwa dunia inayobadilika haraka.')}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl bg-gold-400 p-8">
            <div className="text-xs font-bold tracking-wider text-gold-700">{tr('VISION', 'DIRA')}</div>
            <p className="mb-0 mt-3 text-xl leading-relaxed">{tr('To be a leading institution that nurtures holistic development, producing globally competent and ethical citizens.', 'Kuwa taasisi inayoongoza katika kukuza maendeleo kamili, ikizalisha raia wenye uwezo wa kimataifa na maadili.')}</p>
          </Reveal>
        </div>
        <h2 className="mb-4 mt-12 font-display text-2xl font-extrabold">{tr('What we stand for', 'Tunachosimamia')}</h2>
        <div className="flex flex-wrap gap-2.5">
          {values.map((v) => (
            <span key={v} className="rounded-full border border-line bg-white px-4 py-2.5 font-semibold">{v}</span>
          ))}
        </div>
      </section>

      {/* campuses */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <SectionHead kicker={tr('CAMPUSES', 'KAMPASI')} title={tr('Two campuses, one family', 'Kampasi mbili, familia moja')} />
        <div className="grid gap-4 md:grid-cols-2">
          {campuses.map((c, k) => (
            <Reveal key={c.id} delay={k * 100} className="overflow-hidden rounded-3xl border border-line bg-white">
              <Photo name={c.photo} alt={`${c.name} campus`} className="h-60 w-full" />
              <div className="p-6">
                <div className="font-display text-xl font-extrabold">{c.name} · {c.area}</div>
                <div className="mt-1 text-ink-3">{tr(c.levels.en, c.levels.sw)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHead kicker={tr('MILESTONES', 'HATUA MUHIMU')} title={tr('Our journey so far', 'Safari yetu hadi sasa')} />
          <ol className="relative m-0 grid list-none gap-4 p-0 md:grid-cols-5">
            {timeline.map((m, k) => (
              <Reveal as="li" key={k} delay={k * 80} className="relative rounded-2xl border border-line bg-paper p-5">
                <div className="font-display text-2xl font-extrabold text-green-600">{m.y}</div>
                <p className="mb-0 mt-2 text-sm leading-relaxed text-ink-2">{m.e}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* moments */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker={tr('MOMENTS', 'MATUKIO')} title={tr('Life at Green Acres', 'Maisha ya Green Acres')} />
          <Link to="/gallery" className="mb-8 inline-flex items-center gap-1 font-bold text-green-600 no-underline hover:underline">
            {tr('Full gallery', 'Picha zote')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {MOMENTS.map((n, k) => (
            <button key={n} type="button" onClick={() => lb.open(MOMENTS.map((x) => ({ kind: 'image' as const, name: x })), k)} className={`group overflow-hidden rounded-2xl ${k === 0 ? 'col-span-2 row-span-2' : ''}`} aria-label={tr('Open photo', 'Fungua picha')}>
              <Photo name={n} alt="" className={`w-full transition duration-700 group-hover:scale-105 ${k === 0 ? 'h-full min-h-[240px]' : 'h-40 sm:h-48'}`} sizes="(min-width:768px) 25vw, 50vw" />
            </button>
          ))}
        </div>
      </section>

      <ApplyBanner />
      {lb.node}
    </>
  );
}
