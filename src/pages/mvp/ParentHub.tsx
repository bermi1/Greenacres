import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Home, MessageCircle, Sparkles, Wallet } from 'lucide-react';
import { Crest } from '../../components/SiteLayout';

/* The Parent Hub mock-up is Swahili-first, as in the design. Sample data only. */

const QA = [
  { q: 'Muhula unaanza lini?', a: 'Kwa wanafunzi wapya wa 2027, tarehe ya kuripoti imeandikwa kwenye maelekezo ya kujiunga ya darasa husika. Ofisi itathibitisha kwa SMS wiki moja kabla.', source: 'Maelekezo ya kujiunga 2027' },
  { q: 'Mahitaji ya bweni ni yapi?', a: 'Orodha kamili ya mahitaji ya bweni (sare, vifaa vya kulala na vya shule) iko kwenye fomu ya SEKONDARI-BWENI. Naweza kukutumia PDF hiyo kwa SMS.', source: '2027-SEKONDARI-BWENI.pdf' },
  { q: 'Nalipaje ada?', a: 'Tumia namba ya malipo (control number) iliyo kwenye kichupo cha Ada. Unaweza kulipa benki, kwa wakala au kwa simu. Risiti inakuja kwa SMS.', source: 'Sera ya ada ya shule' },
  { q: 'Siku ya kutembelea ni lini?', a: 'Sina tarehe iliyothibitishwa bado. Nimetuma swali lako kwa ofisi ya mkuu wa bweni, utajibiwa kwa SMS.', source: '' },
];
const TABS = [
  { id: 'home', label: 'Nyumbani', icon: Home, title: 'Karibu, Mama Rehema' },
  { id: 'results', label: 'Matokeo', icon: BarChart3, title: 'Matokeo' },
  { id: 'fees', label: 'Ada', icon: Wallet, title: 'Ada na malipo' },
  { id: 'ask', label: 'Uliza', icon: MessageCircle, title: 'Msaidizi' },
] as const;

export default function ParentHub() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('home');
  const [chat, setChat] = useState<{ me: boolean; text: string; source?: string }[]>([]);
  const [shared, setShared] = useState(-1);
  const t = TABS.find((x) => x.id === tab)!;

  return (
    <div className="min-h-screen bg-[#DCE5DE] font-sans text-ink sm:py-8">
      <div className="mx-auto flex min-h-screen max-w-[390px] flex-col overflow-hidden bg-paper sm:min-h-[844px] sm:rounded-[36px] sm:shadow-2xl">
        <div className="bg-green-600 px-4 pb-4 pt-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Crest className="h-9 w-9" />
              <div>
                <div className="text-xs text-[#CFE6D5]">Parent Hub</div>
                <div className="font-display text-lg font-extrabold">{t.title}</div>
              </div>
            </div>
            <Link to="/system" aria-label="Rudi kwenye muhtasari" className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-3.5 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 font-display font-extrabold text-green-800">RK</div>
            <div className="flex-1">
              <div className="font-bold">Rehema Kimaro</div>
              <div className="text-xs text-[#CFE6D5]">Kidato cha 5 · PCB · Bweni</div>
            </div>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">Mfano</span>
          </div>
        </div>

        <div key={tab} className="flex-1 overflow-y-auto p-4 animate-fadeUp">
          {tab === 'home' && (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-[11px] font-bold tracking-wider text-gold-700">MAOMBI · GA-27-0148</div>
                <div className="mt-1 font-bold">Maombi ya mdogo wake: usaili umepangwa</div>
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {[1, 1, 0, 0, 0].map((on, k) => <span key={k} className={`h-1.5 flex-1 rounded-full ${on ? 'bg-green-600' : 'bg-paper-2'}`} />)}
                </div>
                <div className="mt-2 text-xs text-ink-3">Imepokelewa → Usaili → Nafasi → Malipo → Usajili</div>
              </div>
              <div className="mt-1 text-sm font-bold text-ink-2">Taarifa za shule</div>
              {[
                ['Matokeo ya katikati ya muhula yametolewa', 'Angalia kichupo cha Matokeo. Muhtasari umeidhinishwa na mwalimu.', 'SMS + App · leo', 'bg-green-600'],
                ['Kumbusho la ada', 'Tafadhali kamilisha malipo ya muhula kabla ya tarehe ya mwisho.', 'SMS · jana', 'bg-gold-400'],
                ['Siku ya Utamaduni', 'Wazazi wanakaribishwa. Ratiba kamili itatumwa kwa SMS.', 'App · wiki hii', 'bg-sky-600'],
              ].map(([h, b, m, dot]) => (
                <div key={h} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span className={`mt-1.5 h-2.5 w-2.5 flex-none rounded-full ${dot}`} />
                  <div>
                    <div className="font-bold leading-snug">{h}</div>
                    <div className="mt-0.5 text-sm text-ink-3">{b}</div>
                    <div className="mt-1 text-xs text-ink-3">{m}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'results' && (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-green-600 p-4 text-white">
                <div className="text-xs text-[#CFE6D5]">Mtihani wa katikati ya muhula · mfano</div>
                <div className="mt-1 font-display text-2xl font-extrabold">Daraja la I · Pointi 7</div>
                <div className="mt-1 text-xs text-[#CFE6D5]">Imesawazishwa kutoka ForShule</div>
              </div>
              {[['Fizikia', 'C', 55], ['Kemia', 'A', 88], ['Biolojia', 'B', 72], ['General Studies', 'B', 70]].map(([n, g, v]) => (
                <div key={n as string} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex justify-between font-semibold"><span>{n}</span><span className="font-display font-extrabold text-green-600">{g}</span></div>
                  <div className="mt-2 h-1.5 rounded-full bg-paper-2"><div className="h-1.5 rounded-full bg-green-600 transition-all duration-700" style={{ width: `${v}%` }} /></div>
                </div>
              ))}
              <div className="flex gap-2.5 rounded-2xl bg-sky-50 p-3.5 text-sm text-sky-800">
                <Sparkles className="h-4 w-4 flex-none" aria-hidden="true" />
                Muhtasari: Rehema amepanda katika Kemia. Fizikia inahitaji mazoezi zaidi ya hesabu. Mwalimu wa darasa amethibitisha muhtasari huu.
              </div>
            </div>
          )}

          {tab === 'fees' && (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-xs text-ink-3">Salio la ada · Muhula wa 1</div>
                <div className="mt-1 font-display text-2xl font-extrabold">TZS [SALIO]</div>
                <div className="text-xs text-ink-3">Mwisho wa kulipa: [TAREHE]</div>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-4">
                <div className="text-xs text-ink-3">Namba ya malipo (control number)</div>
                <div className="mt-1 font-display text-xl font-extrabold tracking-wider">99 [XXXX XXXX]</div>
                <div className="mt-1 text-xs text-ink-3">Lipa benki, wakala au kwa simu. Risiti inakuja kwa SMS.</div>
              </div>
              <div className="mt-1 text-sm font-bold text-ink-2">Malipo yaliyopita</div>
              {[['Ada · Muhula wa 3', 'Imelipwa · Benki'], ['Fedha ya matumizi', 'Imelipwa · Simu']].map(([l, m], k) => (
                <div key={l} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div><div className="font-semibold">{l}</div><div className="text-xs text-ink-3">{m}</div></div>
                  <button type="button" onClick={() => setShared(k)} className={`min-h-[40px] rounded-xl px-3 text-sm font-semibold ${shared === k ? 'bg-green-100 text-green-600' : 'border border-line-2'}`}>{shared === k ? 'Imetumwa' : 'Risiti'}</button>
                </div>
              ))}
              <div className="text-xs text-ink-3">Taarifa za ada zinatoka ForShule. Parent Hub inaonyesha tu.</div>
            </div>
          )}

          {tab === 'ask' && (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white p-3.5 text-sm text-ink-3 shadow-sm">Msaidizi wa Green Acres anajibu kutoka kwenye taarifa zilizoidhinishwa na shule tu. Swali asiloweza kujibu linatumwa ofisini.</div>
              {chat.map((m, k) => (
                <div key={k} className={`max-w-[85%] animate-pop ${m.me ? 'self-end' : 'self-start'}`}>
                  <div className={`px-3 py-2.5 text-sm leading-relaxed ${m.me ? 'rounded-2xl rounded-br-md bg-green-600 text-white' : 'rounded-2xl rounded-bl-md border border-line bg-white'}`}>{m.text}</div>
                  {m.source && <div className="mt-1 text-[11px] text-ink-3">Chanzo: {m.source}</div>}
                </div>
              ))}
              <div className="mt-1 text-sm font-bold text-ink-2">Uliza:</div>
              <div className="flex flex-wrap gap-2">
                {QA.map((x) => (
                  <button key={x.q} type="button" onClick={() => setChat([...chat, { me: true, text: x.q }, { me: false, text: x.a, source: x.source }])} className="min-h-[40px] rounded-full border border-line-2 bg-white px-3.5 text-sm font-semibold hover:border-green-600">
                    {x.q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <nav aria-label="Vichupo" className="grid grid-cols-4 border-t border-line bg-white">
          {TABS.map((x) => (
            <button key={x.id} type="button" aria-current={tab === x.id ? 'page' : undefined} onClick={() => setTab(x.id)} className={`flex min-h-[60px] flex-col items-center justify-center gap-1 text-xs font-semibold ${tab === x.id ? 'text-green-600' : 'text-ink-3'}`}>
              <x.icon className="h-5 w-5" aria-hidden="true" />
              {x.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
