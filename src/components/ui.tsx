import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Play, X, CheckCircle2 } from 'lucide-react';
import { img, poster, thumb, video } from '../lib/media';
import { useInView } from '../lib/useReveal';

/* ---------- images ---------- */

type PhotoProps = {
  name: string;
  alt: string;
  className?: string;
  /** "large" loads the 1600px file directly, for heroes. */
  large?: boolean;
  sizes?: string;
  eager?: boolean;
};

export function Photo({ name, alt, className = '', large, sizes = '(min-width: 1024px) 50vw, 100vw', eager }: PhotoProps) {
  return (
    <img
      src={large ? img(name) : thumb(name)}
      srcSet={`${thumb(name)} 640w, ${img(name)} 1600w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- motion ---------- */

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' | 'article' }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'}`}
      style={{ transitionDelay: seen ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

/** Counts up to a number once it scrolls into view. */
export function CountUp({ to, suffix = '', className = '' }: { to: number; suffix?: string; className?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* ---------- lightbox ---------- */

export type LightItem = { kind: 'image'; name: string; caption?: string } | { kind: 'video'; name: string; caption?: string };

export function useLightbox() {
  const [state, setState] = useState<{ items: LightItem[]; index: number } | null>(null);
  const open = useCallback((items: LightItem[], index = 0) => setState({ items, index }), []);
  const node = state ? <Lightbox items={state.items} start={state.index} onClose={() => setState(null)} /> : null;
  return { open, node };
}

function Lightbox({ items, start, onClose }: { items: LightItem[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[i];
  const go = (d: number) => setI((x) => (x + d + items.length) % items.length);
  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((x) => (x + 1) % items.length);
      if (e.key === 'ArrowLeft') setI((x) => (x - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [items.length, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white animate-pop">
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="tabular-nums text-white/70">
          {i + 1} / {items.length}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-2 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {item.kind === 'image' ? (
          <img key={item.name} src={img(item.name)} alt={item.caption ?? ''} className="max-h-full max-w-full rounded-lg object-contain animate-pop" />
        ) : (
          <video key={item.name} src={video(item.name)} poster={poster(item.name)} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" />
        )}
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 sm:left-4">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 sm:right-4">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      {item.caption && <p className="px-4 pb-4 text-center text-sm text-white/80">{item.caption}</p>}
    </div>
  );
}

/** A video thumbnail with a play button. Opens the lightbox player. */
export function VideoTile({ id, title, onOpen, className = '' }: { id: string; title: string; onOpen: () => void; className?: string }) {
  return (
    <button type="button" onClick={onOpen} className={`group relative block overflow-hidden rounded-2xl bg-green-900 text-left ${className}`}>
      <img src={poster(id)} alt="" loading="lazy" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-ink shadow-lg transition group-hover:scale-110">
        <Play className="ml-0.5 h-6 w-6 fill-current" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{title}</span>
    </button>
  );
}

/* ---------- page parts ---------- */

export function PageHero({ kicker, title, lead, photo, children }: { kicker: string; title: string; lead: string; photo?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-green-600 text-white">
      {photo && (
        <>
          <img src={img(photo)} alt="" className="absolute inset-0 h-full w-full object-cover animate-kenburns motion-reduce:animate-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/95 via-green-700/85 to-green-600/50" />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl animate-fadeUp">
          <div className="inline-block rounded-full bg-gold-400/20 px-3 py-1.5 text-xs font-bold tracking-wider text-[#FFE27A]">{kicker}</div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#DCEFE1]">{lead}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ kicker, title, children, center }: { kicker?: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {kicker && <div className="text-xs font-bold tracking-[.08em] text-gold-700">{kicker}</div>}
      <h2 className="mt-1.5 font-display text-3xl font-extrabold sm:text-[38px] sm:leading-tight">{title}</h2>
      {children && <div className={`mt-3 text-ink-3 leading-relaxed ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{children}</div>}
    </div>
  );
}

export function Pill({ on, onClick, children, className = '' }: { on: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-[40px] rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? 'border-green-600 bg-green-600 text-white' : 'border-line-2 bg-white text-ink hover:border-green-600'} ${className}`}
    >
      {children}
    </button>
  );
}

export function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`inline-flex h-6 w-10 flex-none items-center rounded-full p-0.5 transition ${on ? 'bg-green-600' : 'bg-line-2'}`}
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow transition ${on ? 'translate-x-4' : ''}`} />
    </button>
  );
}

export function Toast({ text, dark = true }: { text: string; dark?: boolean }) {
  if (!text) return null;
  return (
    <div role="status" className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm animate-pop ${dark ? 'bg-ink text-white' : 'bg-green-50 text-green-700'}`}>
      <CheckCircle2 className="h-[18px] w-[18px] flex-none text-gold-400" aria-hidden="true" />
      {text}
    </div>
  );
}

export function Field({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold text-ink-2 ${className}`}>
      {label}
      {children}
    </label>
  );
}

export const inputCls = 'min-h-[44px] w-full rounded-xl border border-line-2 bg-white px-3.5 py-2.5 text-[15px] font-normal text-ink outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20';
