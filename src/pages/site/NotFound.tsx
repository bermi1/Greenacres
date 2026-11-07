import { Link } from 'react-router-dom';
import { useLang } from '../../lib/i18n';

export default function NotFound() {
  const { tr } = useLang();
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="font-display text-7xl font-extrabold text-green-600">404</div>
      <h1 className="mt-2 font-display text-3xl font-extrabold">{tr('This page has moved', 'Ukurasa huu umehamishwa')}</h1>
      <p className="text-ink-3">{tr('The new Green Acres website is organised a little differently. Try one of these:', 'Tovuti mpya ya Green Acres imepangwa tofauti kidogo. Jaribu hizi:')}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link to="/" className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white no-underline">{tr('Home', 'Nyumbani')}</Link>
        <Link to="/admissions" className="rounded-xl border border-line-2 px-5 py-3 font-bold no-underline">{tr('Admissions', 'Udahili')}</Link>
        <Link to="/news" className="rounded-xl border border-line-2 px-5 py-3 font-bold no-underline">{tr('News', 'Habari')}</Link>
      </div>
    </section>
  );
}
