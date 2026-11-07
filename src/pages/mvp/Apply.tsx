import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, FileText, Phone, Sparkles, Upload, X } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { Crest, LangToggle } from '../../components/SiteLayout';
import { Field, inputCls } from '../../components/ui';

type Docs = Record<'birth' | 'report' | 'photo', string>;

export default function Apply() {
  const { tr } = useLang();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState('f1');
  const [mode, setMode] = useState('board');
  const [pay, setPay] = useState('mpesa');
  const [student, setStudent] = useState({ name: '', dob: '', gender: 'girl', prev: '' });
  const [parent, setParent] = useState({ name: '', rel: 'mother', phone: '', email: '', address: '', channel: 'SMS', consent: true });
  const [docs, setDocs] = useState<Docs>({ birth: '', report: '', photo: '' });

  const levelDefs: [string, string, string][] = [['nur', 'Nursery', 'Awali'], ['pri', 'Primary', 'Msingi'], ['pf1', 'Pre-Form 1', 'Pre-Form 1'], ['f1', 'Form One', 'Kidato cha 1'], ['pf5', 'Pre-Form 5', 'Pre-Form 5'], ['f5', 'Form Five (A-Level)', 'Kidato cha 5 (A-Level)']];
  const modeDefs: [string, string, string][] = [['board', 'Boarding', 'Bweni'], ['day', 'Day', 'Kutwa']];
  const stepDefs = [[tr('Student', 'Mwanafunzi'), tr('Basic details', 'Taarifa za msingi')], [tr('Parent', 'Mzazi'), tr('Contact details', 'Mawasiliano')], [tr('Documents', 'Nyaraka'), tr('Certificate, report, photo', 'Cheti, ripoti, picha')], [tr('Payment', 'Malipo'), tr('Review and pay', 'Hakiki na ulipe')]];
  const docDefs: [keyof Docs, string, string][] = [['birth', 'Birth certificate', 'Cheti cha kuzaliwa'], ['report', 'Latest school report', 'Ripoti ya mwisho ya shule'], ['photo', 'Passport photo', 'Picha ya pasipoti']];
  const pays = [['mpesa', 'M-Pesa'], ['airtel', 'Airtel Money'], ['mixx', 'Mixx by Yas'], ['bank', tr('Bank control number', 'Namba ya malipo (benki)')]];

  const levelLabel = tr(...(levelDefs.find((l) => l[0] === level)!.slice(1) as [string, string]));
  const modeLabel = tr(...(modeDefs.find((m) => m[0] === mode)!.slice(1) as [string, string]));
  const missing = docDefs.filter(([id]) => !docs[id]).map(([, en, sw]) => tr(en, sw));
  const docCount = 3 - missing.length;
  const first = student.name.trim().split(/\s+/)[0] || tr('your child', 'mtoto wako');
  const sms = tr(
    `Green Acres: We received ${first}'s ${levelLabel} 2027 application. Ref: GA-27-0148. Your interview date will follow by SMS. Questions? Reply to this message.`,
    `Green Acres: Tumepokea maombi ya ${first} ${levelLabel} 2027. Namba ya kumbukumbu: GA-27-0148. Tarehe ya usaili itatumwa kwa SMS. Maswali? Jibu ujumbe huu.`,
  );
  const canNext = step === 0 ? student.name.trim().length > 2 : step === 1 ? parent.name.trim().length > 2 && parent.phone.replace(/\D/g, '').length >= 9 && parent.consent : true;
  const choice = (on: boolean) => `min-h-[44px] rounded-full border px-4 text-sm font-semibold transition ${on ? 'border-green-600 bg-green-600 text-white' : 'border-line-2 bg-white text-ink hover:border-green-600'}`;

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 text-ink no-underline">
            <Crest className="h-10 w-10" />
            <span className="font-display font-extrabold leading-tight">
              Green Acres Schools
              <span className="block text-xs font-semibold text-ink-3">{tr('Online admissions', 'Maombi ya kujiunga')}</span>
            </span>
          </Link>
          <LangToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[300px_1fr] lg:py-10">
        <aside className="flex min-w-0 flex-col gap-5">
          <div className="rounded-2xl bg-green-600 p-5 text-white">
            <div className="text-xs font-bold tracking-wider text-[#FFE27A]">{tr('2027 INTAKE', 'MAOMBI 2027')}</div>
            <div className="mt-1 font-display text-2xl font-extrabold">{tr('Join Green Acres', 'Jiunge na Green Acres')}</div>
            <p className="mb-0 mt-1.5 text-sm text-[#DCEFE1]">{tr('Apply in about 10 minutes. You get a reference number and SMS updates at every step.', 'Omba kwa dakika 10. Utapokea namba ya kumbukumbu na taarifa kwa SMS kila hatua.')}</p>
          </div>
          <nav aria-label={tr('Steps', 'Hatua')} className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col">
            {stepDefs.map(([label, hint], i) => {
              const done = step > i;
              const cur = step === i;
              return (
                <div key={label} aria-current={cur ? 'step' : undefined} className={`flex flex-none items-center gap-3 rounded-xl p-2.5 lg:p-3 ${cur ? 'bg-green-50' : ''}`}>
                  <span className={`grid h-8 w-8 flex-none place-items-center rounded-full text-sm font-bold ${done ? 'bg-green-600 text-white' : cur ? 'bg-gold-400 text-ink' : 'bg-paper-2 text-ink-3'}`}>{done ? <Check className="h-4 w-4" /> : i + 1}</span>
                  <span>
                    <span className="block text-sm font-bold">{label}</span>
                    <span className="hidden text-xs text-ink-3 lg:block">{hint}</span>
                  </span>
                </div>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 text-sm text-ink-3 lg:flex">
            <Phone className="h-4 w-4 text-green-600" aria-hidden="true" />
            {tr('Need help? Call', 'Unahitaji msaada? Piga')} <a href="tel:+255739222237" className="font-bold">+255 739 222 237</a>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
            {step === 0 && (
              <div key="s0" className="flex flex-col gap-5 animate-fadeUp">
                <div>
                  <h1 className="m-0 font-display text-2xl font-extrabold">{tr('Student details', 'Taarifa za mwanafunzi')}</h1>
                  <p className="m-0 mt-1 text-ink-3">{tr('Tell us about your child.', 'Tuambie kuhusu mtoto wako.')}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={tr('Student full name', 'Jina kamili la mwanafunzi')} className="sm:col-span-2"><input value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} className={inputCls} placeholder={tr('e.g. Neema Juma Mushi', 'mfano Neema Juma Mushi')} /></Field>
                  <Field label={tr('Date of birth', 'Tarehe ya kuzaliwa')}><input type="date" value={student.dob} onChange={(e) => setStudent({ ...student, dob: e.target.value })} className={inputCls} /></Field>
                  <Field label={tr('Gender', 'Jinsia')}>
                    <select value={student.gender} onChange={(e) => setStudent({ ...student, gender: e.target.value })} className={inputCls}>
                      <option value="girl">{tr('Girl', 'Msichana')}</option>
                      <option value="boy">{tr('Boy', 'Mvulana')}</option>
                    </select>
                  </Field>
                  <Field label={tr('Previous school', 'Shule aliyotoka')} className="sm:col-span-2"><input value={student.prev} onChange={(e) => setStudent({ ...student, prev: e.target.value })} className={inputCls} /></Field>
                </div>
                <fieldset className="m-0 border-0 p-0">
                  <legend className="mb-2 text-sm font-semibold text-ink-2">{tr('Level applying for', 'Darasa analoomba')}</legend>
                  <div className="flex flex-wrap gap-2">{levelDefs.map(([id, en, sw]) => <button key={id} type="button" aria-pressed={level === id} onClick={() => setLevel(id)} className={choice(level === id)}>{tr(en, sw)}</button>)}</div>
                </fieldset>
                <fieldset className="m-0 border-0 p-0">
                  <legend className="mb-2 text-sm font-semibold text-ink-2">{tr('Study mode', 'Aina ya masomo')}</legend>
                  <div className="flex flex-wrap gap-2">{modeDefs.map(([id, en, sw]) => <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={choice(mode === id)}>{tr(en, sw)}</button>)}</div>
                </fieldset>
              </div>
            )}

            {step === 1 && (
              <div key="s1" className="flex flex-col gap-5 animate-fadeUp">
                <div>
                  <h1 className="m-0 font-display text-2xl font-extrabold">{tr('Parent or guardian', 'Mzazi au mlezi')}</h1>
                  <p className="m-0 mt-1 text-ink-3">{tr('We will contact you on this number.', 'Tutawasiliana nawe kwa namba hii.')}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={tr('Parent/guardian name', 'Jina la mzazi/mlezi')}><input value={parent.name} onChange={(e) => setParent({ ...parent, name: e.target.value })} className={inputCls} autoComplete="name" /></Field>
                  <Field label={tr('Relationship', 'Uhusiano')}>
                    <select value={parent.rel} onChange={(e) => setParent({ ...parent, rel: e.target.value })} className={inputCls}>
                      <option value="mother">{tr('Mother', 'Mama')}</option>
                      <option value="father">{tr('Father', 'Baba')}</option>
                      <option value="guardian">{tr('Guardian', 'Mlezi')}</option>
                    </select>
                  </Field>
                  <Field label={tr('Phone number', 'Namba ya simu')}><input type="tel" value={parent.phone} onChange={(e) => setParent({ ...parent, phone: e.target.value })} className={inputCls} placeholder="+255 7__ ___ ___" autoComplete="tel" /></Field>
                  <Field label={tr('Email', 'Barua pepe')}><input type="email" value={parent.email} onChange={(e) => setParent({ ...parent, email: e.target.value })} className={inputCls} autoComplete="email" /></Field>
                  <Field label={tr('Home address', 'Makazi')}><input value={parent.address} onChange={(e) => setParent({ ...parent, address: e.target.value })} className={inputCls} /></Field>
                  <Field label={tr('Preferred updates', 'Njia ya kupokea taarifa')}>
                    <select value={parent.channel} onChange={(e) => setParent({ ...parent, channel: e.target.value })} className={inputCls}>
                      <option>SMS</option>
                      <option>Email</option>
                    </select>
                  </Field>
                </div>
                <label className="flex items-start gap-3 rounded-xl bg-paper p-4 text-sm leading-relaxed">
                  <input type="checkbox" checked={parent.consent} onChange={(e) => setParent({ ...parent, consent: e.target.checked })} className="mt-0.5 h-5 w-5 flex-none accent-green-600" />
                  {tr('I agree that Green Acres may store and use this information for this application, in line with the Personal Data Protection Act.', 'Ninakubali Green Acres kuhifadhi na kutumia taarifa hizi kwa ajili ya maombi haya, kwa mujibu wa Sheria ya Ulinzi wa Taarifa Binafsi.')}
                </label>
              </div>
            )}

            {step === 2 && (
              <div key="s2" className="flex flex-col gap-4 animate-fadeUp">
                <div>
                  <h1 className="m-0 font-display text-2xl font-extrabold">{tr('Documents', 'Nyaraka')}</h1>
                  <p className="m-0 mt-1 text-ink-3">{tr('Choose a photo or PDF. A phone photo is fine. In this demo files stay on your device.', 'Chagua picha au PDF. Picha ya simu inatosha. Katika onyesho hili faili zinabaki kwenye kifaa chako.')}</p>
                </div>
                {docDefs.map(([id, en, sw]) => {
                  const up = docs[id];
                  return (
                    <div key={id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-4">
                      <div className="flex items-center gap-3">
                        <span className={`grid h-11 w-11 place-items-center rounded-xl ${up ? 'bg-green-100 text-green-600' : 'bg-paper-2 text-ink-3'}`}>{up ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}</span>
                        <span>
                          <span className="block font-bold">{tr(en, sw)}</span>
                          <span className="block text-sm text-ink-3">{up ? tr('Added · ', 'Imeongezwa · ') + up : tr('Not added yet', 'Bado haijaongezwa')}</span>
                        </span>
                      </div>
                      {up ? (
                        <button type="button" onClick={() => setDocs({ ...docs, [id]: '' })} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line-2 px-4 text-sm font-semibold"><X className="h-4 w-4" />{tr('Remove', 'Ondoa')}</button>
                      ) : (
                        <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white focus-within:ring-2 focus-within:ring-gold-400">
                          <Upload className="h-4 w-4" /> {tr('Add file', 'Ongeza faili')}
                          <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && setDocs({ ...docs, [id]: e.target.files[0].name })} />
                        </label>
                      )}
                    </div>
                  );
                })}
                <div className="flex gap-2.5 rounded-xl bg-sky-50 p-3.5 text-sm text-sky-800">
                  <Sparkles className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
                  {missing.length
                    ? tr(`Check: still missing ${missing.join(', ')}. You can continue and add it later from the SMS link.`, `Ukaguzi: bado inakosekana ${missing.join(', ')}. Unaweza kuendelea na kuongeza baadaye kupitia kiungo cha SMS.`)
                    : tr('Check: all three documents are added.', 'Ukaguzi: nyaraka zote tatu zimeongezwa.')}
                </div>
              </div>
            )}

            {step === 3 && (
              <div key="s3" className="flex flex-col gap-5 animate-fadeUp">
                <div>
                  <h1 className="m-0 font-display text-2xl font-extrabold">{tr('Review and pay', 'Hakiki na ulipe')}</h1>
                  <p className="m-0 mt-1 text-ink-3">{tr('The application fee is paid once.', 'Ada ya maombi hulipwa mara moja tu.')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[[tr('Student', 'Mwanafunzi'), student.name || '—'], [tr('Level', 'Darasa'), levelLabel], [tr('Mode', 'Aina'), modeLabel], [tr('Documents', 'Nyaraka'), `${docCount} / 3`]].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-paper p-3.5">
                      <div className="text-xs text-ink-3">{k}</div>
                      <div className="font-bold">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-gold-50 p-3.5 text-sm text-gold-700">{tr('Application fee: as stated in the joining instructions for this level.', 'Ada ya maombi: kama ilivyoelezwa kwenye maelekezo ya kujiunga ya darasa hili.')}</div>
                <fieldset className="m-0 border-0 p-0">
                  <legend className="mb-2 text-sm font-semibold text-ink-2">{tr('Pay with', 'Lipa kwa')}</legend>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {pays.map(([id, label]) => (
                      <button key={id} type="button" aria-pressed={pay === id} onClick={() => setPay(id)} className={`flex min-h-[64px] flex-col items-start justify-center gap-0.5 rounded-2xl px-4 text-left ${pay === id ? 'border-2 border-green-600 bg-green-50' : 'border border-line-2 bg-white'}`}>
                        <span className="font-bold">{label}</span>
                        <span className="text-xs text-ink-3">{id === 'bank' ? tr('Pay at a bank or agent', 'Lipa benki au kwa wakala') : tr('Payment prompt on your phone', 'Ombi la malipo kwenye simu')}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 4 && (
              <div className="grid items-center gap-8 animate-fadeUp md:grid-cols-2">
                <div>
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-green-600 text-white"><Check className="h-7 w-7" /></div>
                  <h1 className="mb-2 mt-4 font-display text-3xl font-extrabold">{tr('Application received!', 'Maombi yamepokelewa!')}</h1>
                  <p className="m-0 leading-relaxed text-ink-2">{tr('We have sent an SMS with your reference number. Your interview date will follow within 3 working days.', 'Tumetuma SMS yenye namba yako ya kumbukumbu. Tarehe ya usaili itatumwa ndani ya siku 3 za kazi.')}</p>
                  <div className="mt-5 inline-flex items-center gap-3 rounded-xl bg-paper px-4 py-3">
                    <span className="text-sm text-ink-3">{tr('Reference', 'Namba ya kumbukumbu')}</span>
                    <span className="font-display text-lg font-extrabold">GA-27-0148</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/255739222237?text=${encodeURIComponent(`Maombi ya kujiunga 2027 / Admission application 2027\nMwanafunzi: ${student.name} (${student.dob || '-'})\nDarasa: ${levelLabel} · ${modeLabel}\nShule aliyotoka: ${student.prev || '-'}\nMzazi: ${parent.name} · ${parent.phone} · ${parent.email || '-'}\nMakazi: ${parent.address || '-'}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center rounded-xl bg-green-600 px-5 font-bold text-white no-underline"
                    >
                      {tr('Send to the admissions office (WhatsApp)', 'Tuma ofisi ya udahili (WhatsApp)')}
                    </a>
                    <Link to="/parent" className="inline-flex min-h-[44px] items-center rounded-xl border border-line-2 px-5 font-semibold no-underline">{tr('Track my application', 'Fuatilia maombi')}</Link>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-xs rounded-[34px] bg-ink p-3">
                  <div className="flex min-h-[260px] flex-col gap-2 rounded-3xl bg-[#F2F3F5] px-3 py-4">
                    <div className="text-center text-xs font-semibold text-ink-3">GREENACRES</div>
                    <div className="rounded-2xl rounded-bl-md bg-white p-3 text-sm leading-relaxed shadow-sm animate-pop">{sms}</div>
                    <div className="text-xs text-ink-3">SMS · {tr('just now', 'sasa hivi')}</div>
                  </div>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="mt-8 flex justify-between gap-3 border-t border-line pt-5">
                <button type="button" onClick={() => setStep(step - 1)} className={`min-h-[48px] rounded-xl border border-line-2 bg-white px-5 font-semibold ${step === 0 ? 'invisible' : ''}`}>{tr('Back', 'Rudi')}</button>
                <button type="button" disabled={!canNext} onClick={() => setStep(step + 1)} className="min-h-[48px] rounded-xl bg-gold-400 px-6 font-bold text-ink transition disabled:cursor-not-allowed disabled:opacity-50">
                  {step === 3 ? tr('Submit and pay', 'Wasilisha na ulipe') : tr('Continue', 'Endelea')}
                </button>
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-ink-3">{tr('Concept prototype by Bermi Techs · nothing is submitted or charged · to apply today, call +255 782 128 633', 'Onyesho la Bermi Techs · hakuna kinachotumwa wala kulipishwa · kuomba leo, piga +255 782 128 633')}</p>
        </main>
      </div>
    </div>
  );
}
