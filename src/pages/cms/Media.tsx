import { useMemo, useState } from 'react';
import { CheckCircle2, CloudUpload, Play, TriangleAlert } from 'lucide-react';
import StaffShell, { btnPrimary, card } from '../../components/StaffShell';
import { Field, Toast, inputCls } from '../../components/ui';
import { fromSource, img, poster, thumb } from '../../lib/media';
import { albums, posts, videos } from '../../content/site';
import { db, useDb } from '../../data/db';

export default function Media() {
  const albumList = useMemo(() => {
    const list: { label: string; items: string[] }[] = [
      { label: 'Campus', items: fromSource('facilities') },
      ...posts.filter((p) => p.images.length > 4).map((p) => ({ label: p.title.replace(/^Green Acres (Schools )?/, '').slice(0, 34), items: p.images })),
      ...albums.map((a) => ({ label: a.title.split(/! |, /)[0].slice(0, 34), items: a.images })),
      { label: 'Alumni', items: fromSource('alumni') },
    ];
    return [{ label: 'All', items: Array.from(new Set(list.flatMap((a) => a.items))) }, ...list];
  }, []);
  const [album, setAlbum] = useState('All');
  const [sel, setSel] = useState(albumList[0].items[0]);
  const alts = useDb((t) => t.mediaAlt);
  const setAlts = (next: Record<string, string>) => db.setAlt(sel, next[sel] ?? '');
  const [extra, setExtra] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const items = (albumList.find((a) => a.label === album)?.items ?? []).slice(0, 60);
  const alt = alts[sel] ?? '';
  const missing = !alt.trim();

  return (
    <StaffShell kicker="WEBSITE · GALLERY & IMAGES" title="Media library" actions={
      <div role="group" aria-label="Media type" className="flex gap-1 rounded-full bg-white p-1 shadow-sm">
        {(['photos', 'videos'] as const).map((t) => <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)} className={`min-h-[36px] rounded-full px-4 text-sm font-semibold capitalize ${tab === t ? 'bg-green-600 text-white' : ''}`}>{t}</button>)}
      </div>
    }>
      {toast && <div className="mb-4"><Toast text={toast} /></div>}
      {tab === 'videos' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <div key={v.id} className={`${card} overflow-hidden`}>
              <div className="relative aspect-video bg-green-900"><img src={poster(v.id)} alt="" className="h-full w-full object-cover" loading="lazy" /><Play className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 fill-white text-white" /></div>
              <div className="p-3 text-sm font-semibold">{v.en}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[220px_1fr_320px]">
          <section aria-label="Albums" className={`${card} no-scrollbar flex gap-1 overflow-x-auto p-2 xl:max-h-[720px] xl:flex-col xl:overflow-y-auto`}>
            {albumList.map((a) => (
              <button key={a.label} type="button" aria-pressed={album === a.label} onClick={() => setAlbum(a.label)} className={`flex min-h-[40px] flex-none items-center justify-between gap-2 rounded-lg px-3 text-left text-sm ${album === a.label ? 'bg-green-50 font-bold text-green-600' : 'hover:bg-paper'}`}>
                <span className="truncate">{a.label}</span><span className="text-xs text-ink-3">{a.items.length + (a.label === 'All' ? extra.length : 0)}</span>
              </button>
            ))}
          </section>

          <section className="flex flex-col gap-3">
            <label className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-line-2 bg-white px-4 py-6 text-center hover:border-green-600">
              <CloudUpload className="h-7 w-7 text-green-600" aria-hidden="true" />
              <span className="font-bold">Drop photos here or click to upload</span>
              <span className="text-xs text-ink-3">Photos are resized and compressed to WebP so pages load fast on mobile data. In this demo they stay in your browser.</span>
              <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (!files.length) return;
                const urls = files.map((f) => URL.createObjectURL(f));
                setExtra([...urls, ...extra]);
                setAlbum('All');
                setSel(urls[0]);
                setToast(`${files.length} photo(s) added. Add alt text to publish.`);
              }} />
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {(album === 'All' ? [...extra, ...items] : items).map((n) => {
                const has = !!alts[n]?.trim();
                const src = n.startsWith('blob:') ? n : thumb(n);
                return (
                  <button key={n} type="button" onClick={() => setSel(n)} aria-pressed={sel === n} className={`group relative overflow-hidden rounded-xl bg-white ${sel === n ? 'ring-[3px] ring-green-600' : ''}`}>
                    <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                    <span className={`absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${has ? 'bg-green-600 text-white' : 'bg-white/90 text-gold-700'}`}>{has ? 'Alt ✓' : 'Needs alt'}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-ink-3">{albumList[0].items.length} photos imported from greenacres.ac.tz, showing up to 60 per album.</div>
          </section>

          <aside className={`${card} flex flex-col gap-3 p-4 xl:sticky xl:top-4 xl:self-start`}>
            <img src={sel.startsWith('blob:') ? sel : img(sel)} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
            <div className="truncate text-sm font-bold">{sel.startsWith('blob:') ? 'New upload' : sel + '.webp'}</div>
            <Field label="Alt text (required)">
              <input value={alt} onChange={(e) => setAlts({ ...alts, [sel]: e.target.value })} className={inputCls} placeholder="Describe the photo for screen readers and Google" />
            </Field>
            {missing ? (
              <div className="flex gap-2 rounded-xl bg-gold-50 p-3 text-xs text-gold-700"><TriangleAlert className="h-4 w-4 flex-none" />Add alt text before this photo can appear on the website.</div>
            ) : (
              <div className="flex gap-2 rounded-xl bg-green-50 p-3 text-xs text-green-600"><CheckCircle2 className="h-4 w-4 flex-none" />Ready to publish.</div>
            )}
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 accent-green-600" />Show in public gallery</label>
            <button type="button" disabled={missing} onClick={() => setToast('Saved. Photo is live in the gallery.')} className={btnPrimary}>Save</button>
          </aside>
        </div>
      )}
    </StaffShell>
  );
}
