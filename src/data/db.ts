import { useSyncExternalStore } from 'react';

/* ------------------------------------------------------------------
   One data layer for the whole site and system.

   - No VITE_API_URL: records live in this browser (localStorage), so
     every screen works end to end today.
   - VITE_API_URL set: the same calls are sent to the school's API
     (contract in docs/API.md, tables in db/schema.sql). The UI does
     not change; only the storage does.
------------------------------------------------------------------- */

export type Stage = 0 | 1 | 2 | 3 | 4;
export const STAGES = ['Applied', 'Interview', 'Offered', 'Fee paid', 'Enrolled'] as const;

export type Application = {
  id: string; ref: string; createdAt: string; sample?: boolean;
  student: { name: string; dob: string; gender: string; prevSchool: string };
  level: string; mode: string;
  parent: { name: string; relation: string; phone: string; email: string; address: string; channel: string; consent: boolean };
  docs: { birth: string; report: string; photo: string };
  payMethod: string; stage: Stage;
};
export type Message = { id: string; createdAt: string; campus: string; topic: string; name: string; phone: string; email: string; body: string; read: boolean };
export type Subscriber = { id: string; createdAt: string; contact: string };
export type Alumnus = { id: string; createdAt: string; name: string; year: string; level: string; work: string; phone: string; email: string };
export type PageCopy = { heading: string; intro: string; cta: string; status: 'Published' | 'Draft'; updatedAt: string };
export type Campaign = { id: string; createdAt: string; name: string; lang: string; audience: string; sent: number; delivered: number };
export type Tables = {
  applications: Application[];
  messages: Message[];
  subscribers: Subscriber[];
  alumni: Alumnus[];
  pages: Record<string, Partial<Record<'en' | 'sw', PageCopy>>>;
  postStatus: Record<string, 'Published' | 'Draft' | 'Scheduled'>;
  staffOnWebsite: Record<string, boolean>;
  mediaAlt: Record<string, string>;
  campaigns: Campaign[];
  roles: number[][] | null;
  audit: { at: string; who: string; what: string }[];
};

const KEY = 'ga-db-v1';
const API = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');
export const storageMode: 'local' | 'remote' = API ? 'remote' : 'local';

const now = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

function sampleApps(): Application[] {
  const rows: [string, string, string, Stage, number, string][] = [
    ['Neema J. Mushi', 'Form One', 'Boarding', 0, 2, '+255 7•• ••• 412'],
    ['Baraka S. Mwita', 'Form One', 'Day', 0, 3, '+255 6•• ••• 088'],
    ['Rehema A. Kimaro', 'Form Five (A-Level)', 'Boarding', 1, 3, '+255 7•• ••• 251'],
    ['Ibrahim K. Said', 'Primary', 'Day', 1, 1, '+255 7•• ••• 930'],
    ['Grace P. Lyimo', 'Form One', 'Boarding', 2, 3, '+255 6•• ••• 517'],
    ['Joseph M. Massawe', 'Pre-Form 1', 'Day', 3, 3, '+255 7•• ••• 664'],
    ['Amina H. Bakari', 'Nursery', 'Day', 4, 3, '+255 7•• ••• 302'],
  ];
  return rows.map(([name, level, mode, stage, docs, phone], i) => ({
    id: 's' + i, ref: `GA-27-0${141 + i}`, createdAt: now(), sample: true,
    student: { name, dob: '', gender: '', prevSchool: '' }, level, mode,
    parent: { name: 'Parent of ' + name.split(' ')[0], relation: 'Parent', phone, email: '', address: '', channel: 'SMS', consent: true },
    docs: { birth: 'birth.jpg', report: docs > 1 ? 'report.jpg' : '', photo: docs > 2 ? 'photo.jpg' : '' },
    payMethod: 'mpesa', stage,
  }));
}

function seed(): Tables {
  return {
    applications: sampleApps(), messages: [], subscribers: [], alumni: [], pages: {}, postStatus: {}, staffOnWebsite: { 0: true, 1: true } as unknown as Record<string, boolean>, mediaAlt: {},
    campaigns: [
      ['Mid-term results out', 'Kiswahili', 'All parents', 1200, 1176], ['Fee reminder, term 1', 'Kiswahili', 'Fees outstanding', 95, 93], ['Form One interview invite', 'Bilingual', '2027 applicants', 180, 178], ['Visiting day', 'Kiswahili', 'Boarding parents', 420, 411], ['Cultural Day', 'English', 'All parents', 1200, 1181],
    ].map(([name, lang, audience, sent, delivered], i) => ({ id: 'c' + i, createdAt: now(), name: name as string, lang: lang as string, audience: audience as string, sent: sent as number, delivered: delivered as number })),
    roles: null, audit: [],
  };
}

function load(): Tables {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch {
    /* storage blocked: run in memory */
  }
  return seed();
}

let state: Tables = load();
const listeners = new Set<() => void>();

function commit(next: Tables) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* in-memory only */
  }
  listeners.forEach((l) => l());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

async function remote(path: string, method: string, body?: unknown) {
  if (!API) return;
  try {
    await fetch(`${API}${path}`, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, credentials: 'include' });
  } catch {
    /* the local copy stays; a sync job can retry */
  }
}

/** Pull the server's copy once on start when an API is configured. */
export async function hydrate() {
  if (!API) return;
  try {
    const r = await fetch(`${API}/snapshot`, { credentials: 'include' });
    if (r.ok) commit({ ...state, ...(await r.json()) });
  } catch {
    /* offline: keep local */
  }
}

export function useDb<T>(pick: (t: Tables) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => pick(state),
    () => pick(state),
  );
}
export const snapshot = () => state;

const log = (what: string, who = 'You') => ({ at: now(), who, what });

export const db = {
  submitApplication(a: Omit<Application, 'id' | 'ref' | 'createdAt' | 'stage'>) {
    const n = 141 + state.applications.length;
    const row: Application = { ...a, id: uid(), ref: `GA-27-${String(n).padStart(4, '0')}`, createdAt: now(), stage: 0 };
    commit({ ...state, applications: [row, ...state.applications] });
    void remote('/applications', 'POST', row);
    return row;
  },
  moveApplication(id: string, stage: Stage) {
    const a = state.applications.find((x) => x.id === id);
    commit({ ...state, applications: state.applications.map((x) => (x.id === id ? { ...x, stage } : x)), audit: [log(`Moved ${a?.ref} to ${STAGES[stage]}`), ...state.audit].slice(0, 50) });
    void remote(`/applications/${id}`, 'PATCH', { stage });
  },
  sendMessage(m: Omit<Message, 'id' | 'createdAt' | 'read'>) {
    const row = { ...m, id: uid(), createdAt: now(), read: false };
    commit({ ...state, messages: [row, ...state.messages] });
    void remote('/messages', 'POST', row);
    return row;
  },
  markRead(id: string) {
    commit({ ...state, messages: state.messages.map((m) => (m.id === id ? { ...m, read: true } : m)) });
    void remote(`/messages/${id}`, 'PATCH', { read: true });
  },
  subscribe(contact: string) {
    if (state.subscribers.some((s) => s.contact === contact)) return;
    const row = { id: uid(), createdAt: now(), contact };
    commit({ ...state, subscribers: [row, ...state.subscribers] });
    void remote('/subscribers', 'POST', row);
  },
  registerAlumnus(a: Omit<Alumnus, 'id' | 'createdAt'>) {
    const row = { ...a, id: uid(), createdAt: now() };
    commit({ ...state, alumni: [row, ...state.alumni] });
    void remote('/alumni', 'POST', row);
  },
  savePage(page: string, lang: 'en' | 'sw', copy: Omit<PageCopy, 'updatedAt'>) {
    const pages = { ...state.pages, [page]: { ...state.pages[page], [lang]: { ...copy, updatedAt: now() } } };
    commit({ ...state, pages, audit: [log(`${copy.status === 'Published' ? 'Published' : 'Saved draft of'} ${page} page (${lang.toUpperCase()})`), ...state.audit].slice(0, 50) });
    void remote(`/pages/${page}/${lang}`, 'PUT', copy);
  },
  setPostStatus(slug: string, status: 'Published' | 'Draft' | 'Scheduled') {
    commit({ ...state, postStatus: { ...state.postStatus, [slug]: status }, audit: [log(`${status} post "${slug.slice(0, 40)}"`), ...state.audit].slice(0, 50) });
    void remote(`/posts/${slug}`, 'PATCH', { status });
  },
  setStaffOnWebsite(key: string, on: boolean) {
    commit({ ...state, staffOnWebsite: { ...state.staffOnWebsite, [key]: on } });
    void remote(`/staff/${key}`, 'PATCH', { onWebsite: on });
  },
  setAlt(name: string, alt: string) {
    commit({ ...state, mediaAlt: { ...state.mediaAlt, [name]: alt } });
    void remote(`/media/${name}`, 'PATCH', { alt });
  },
  sendCampaign(c: Omit<Campaign, 'id' | 'createdAt' | 'delivered'>) {
    const row = { ...c, id: uid(), createdAt: now(), delivered: c.sent };
    commit({ ...state, campaigns: [row, ...state.campaigns], audit: [log(`Sent "${c.name}" to ${c.sent.toLocaleString('en-US')} parents`), ...state.audit].slice(0, 50) });
    void remote('/sms/campaigns', 'POST', row);
  },
  saveRoles(grid: number[][]) {
    commit({ ...state, roles: grid, audit: [log('Updated role permissions'), ...state.audit].slice(0, 50) });
    void remote('/settings/roles', 'PUT', grid);
  },
  reset() {
    commit(seed());
  },
};
