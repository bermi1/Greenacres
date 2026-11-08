import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/site/Home';

const About = lazy(() => import('./pages/site/About'));
const Academics = lazy(() => import('./pages/site/Academics'));
const Admissions = lazy(() => import('./pages/site/Admissions'));
const Facilities = lazy(() => import('./pages/site/Facilities'));
const Results = lazy(() => import('./pages/site/Results'));
const News = lazy(() => import('./pages/site/News'));
const NewsPost = lazy(() => import('./pages/site/NewsPost'));
const Gallery = lazy(() => import('./pages/site/Gallery'));
const Alumni = lazy(() => import('./pages/site/Alumni'));
const Contact = lazy(() => import('./pages/site/Contact'));
const NotFound = lazy(() => import('./pages/site/NotFound'));

const Overview = lazy(() => import('./pages/mvp/Overview'));
const Apply = lazy(() => import('./pages/mvp/Apply'));
const ParentHub = lazy(() => import('./pages/mvp/ParentHub'));
const Pipeline = lazy(() => import('./pages/mvp/Pipeline'));
const Messaging = lazy(() => import('./pages/mvp/Messaging'));
const TeacherAI = lazy(() => import('./pages/mvp/TeacherAI'));

const CmsDashboard = lazy(() => import('./pages/cms/Dashboard'));
const CmsPages = lazy(() => import('./pages/cms/Pages'));
const CmsNews = lazy(() => import('./pages/cms/News'));
const CmsStaff = lazy(() => import('./pages/cms/Staff'));
const CmsMedia = lazy(() => import('./pages/cms/Media'));
const CmsSms = lazy(() => import('./pages/cms/BulkSMS'));
const CmsResults = lazy(() => import('./pages/cms/Results'));
const CmsSettings = lazy(() => import('./pages/cms/Settings'));
const CmsInbox = lazy(() => import('./pages/cms/Inbox'));
const AkiliLearn = lazy(() => import('./pages/akili/Learn'));
const AkiliStudio = lazy(() => import('./pages/akili/Studio'));

function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-green-200 border-t-green-600" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="results" element={<Results />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsPost />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="alumni" element={<Alumni />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="system" element={<Overview />} />
        <Route path="apply" element={<Apply />} />
        <Route path="parent" element={<ParentHub />} />
        <Route path="office/admissions" element={<Pipeline />} />
        <Route path="office/messages" element={<Messaging />} />
        <Route path="office/teacher-ai" element={<TeacherAI />} />
        <Route path="office/akili" element={<AkiliStudio />} />
        <Route path="akili" element={<AkiliLearn />} />

        <Route path="cms" element={<CmsDashboard />} />
        <Route path="cms/pages" element={<CmsPages />} />
        <Route path="cms/news" element={<CmsNews />} />
        <Route path="cms/staff" element={<CmsStaff />} />
        <Route path="cms/media" element={<CmsMedia />} />
        <Route path="cms/sms" element={<CmsSms />} />
        <Route path="cms/results" element={<CmsResults />} />
        <Route path="cms/settings" element={<CmsSettings />} />
        <Route path="cms/inbox" element={<CmsInbox />} />
      </Routes>
    </Suspense>
  );
}
