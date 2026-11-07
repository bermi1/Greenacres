import postsJson from './generated/posts.json';
import albumsJson from './generated/albums.json';
import type { Album, Post } from './types';

/* Everything on this page comes from greenacres.ac.tz (pages, posts and media),
   rewritten for clarity. Where the old site had no fact, we say so instead of inventing one. */

export const school = {
  name: 'Green Acres Schools',
  long: 'Green Acres Schools Tanzania',
  founded: 2000,
  email: 'info@greenacres.ac.tz',
  phoneMain: '+255 739 222 237',
  whatsapp: '255739222237',
  social: {
    instagram: 'https://instagram.com/greenacresschools',
    facebook: 'https://facebook.com/greenacresdsm',
    x: 'https://twitter.com/AcresSchools',
  },
};

export const campuses = [
  {
    id: 'dsm',
    name: 'Dar es Salaam',
    area: 'Mbezi Beach, Salasala',
    address: 'Mbezi Beach, Salasala, Dar es Salaam',
    phones: ['+255 782 128 633', '+255 747 128 633'],
    email: 'info@greenacres.ac.tz',
    hours: { en: 'Mon to Sat · 8:30 AM to 5:00 PM', sw: 'Jumatatu hadi Jumamosi · saa 2:30 asubuhi hadi saa 11 jioni' },
    levels: { en: 'Nursery to A-Level · day and boarding', sw: 'Awali hadi A-Level · kutwa na bweni' },
    photo: '2-2',
    map: 'https://maps.google.com/maps?q=green%20acres%20secondary%20school&t=m&z=16&output=embed',
  },
  {
    id: 'bunazi',
    name: 'Bunazi',
    area: 'Missenyi District, Kagera',
    address: 'Bunazi, Missenyi District, Kagera Region',
    phones: ['+255 687 392 000'],
    email: 'bunazi@greenacres.ac.tz',
    hours: { en: 'Mon to Sat · 8:30 AM to 5:00 PM', sw: 'Jumatatu hadi Jumamosi · saa 2:30 asubuhi hadi saa 11 jioni' },
    levels: { en: 'Nursery and Primary · top Standard Seven school in Missenyi, 2025', sw: 'Awali na Msingi · shule bora ya Darasa la Saba Missenyi, 2025' },
    photo: 'mpendwa-mheshimiwa-mkuu-wa-mkoa-kagera',
    map: '',
  },
];

export const nav = [
  { to: '/', en: 'Home', sw: 'Nyumbani' },
  { to: '/about', en: 'About', sw: 'Kuhusu' },
  { to: '/academics', en: 'Academics', sw: 'Taaluma' },
  { to: '/admissions', en: 'Admissions', sw: 'Udahili' },
  { to: '/facilities', en: 'Facilities', sw: 'Miundombinu' },
  { to: '/results', en: 'Results', sw: 'Matokeo' },
  { to: '/news', en: 'News', sw: 'Habari' },
  { to: '/gallery', en: 'Gallery', sw: 'Picha' },
  { to: '/alumni', en: 'Alumni', sw: 'Wahitimu' },
  { to: '/contact', en: 'Contact', sw: 'Mawasiliano' },
];

export const levels = [
  {
    id: 'nur', n: '01', en: 'Nursery', sw: 'Awali', ageEn: 'FROM AGE 3', ageSw: 'KUANZIA MIAKA 3', photo: 'learning-beyond-the-classroom-our-primar-3',
    textEn: 'A safe, joyful and stimulating place where children learn through play, creativity and exploration: early literacy, numeracy, social skills and curiosity.',
    textSw: 'Mazingira salama na ya furaha ambapo watoto hujifunza kwa michezo, ubunifu na udadisi: kusoma, kuhesabu, stadi za kijamii na udadisi.',
    pointsEn: ['Learning through play', 'Early literacy and numeracy', 'Social skills and curiosity'],
    pointsSw: ['Kujifunza kwa michezo', 'Kusoma na kuhesabu mapema', 'Stadi za kijamii na udadisi'],
  },
  {
    id: 'pri', n: '02', en: 'Primary', sw: 'Msingi', ageEn: 'STANDARD 1–7', ageSw: 'DARASA 1–7', photo: '1',
    textEn: 'The national curriculum taught in English, enriched with ICT, arts, music, sports and values education, building strong skills, critical thinking and discipline.',
    textSw: 'Mtaala wa taifa unafundishwa kwa Kiingereza, pamoja na TEHAMA, sanaa, muziki, michezo na elimu ya maadili, kujenga ujuzi, fikra na nidhamu.',
    pointsEn: ['Core subjects taught in English', 'ICT, arts and music', 'Sports and values education'],
    pointsSw: ['Masomo ya msingi kwa Kiingereza', 'TEHAMA, sanaa na muziki', 'Michezo na elimu ya maadili'],
  },
  {
    id: 'ol', n: '03', en: 'O-Level', sw: 'Kidato I–IV', ageEn: 'FORM I–IV', ageSw: 'KIDATO I–IV', photo: 'a-week-back-in-the-groove-at-green-acres-2',
    textEn: 'A rigorous programme for national examinations and life beyond the classroom, with expert subject teachers, modern science and computer labs, and structured mentorship.',
    textSw: 'Programu madhubuti ya mitihani ya taifa na maisha nje ya darasa, walimu mahiri, maabara za kisasa za sayansi na kompyuta, na ushauri maalum.',
    pointsEn: ['Physics, Chemistry and Biology labs', 'Computer lab with high-speed internet', 'Day and boarding'],
    pointsSw: ['Maabara za Fizikia, Kemia na Biolojia', 'Maabara ya kompyuta yenye intaneti ya kasi', 'Kutwa na bweni'],
  },
  {
    id: 'al', n: '04', en: 'A-Level', sw: 'Kidato V–VI', ageEn: 'FORM V–VI', ageSw: 'KIDATO V–VI', photo: '4',
    textEn: 'Specialised combinations in Science, Business or Arts, with leadership training, career guidance and university preparation for confident, ethical graduates.',
    textSw: 'Michepuo ya Sayansi, Biashara au Sanaa, pamoja na mafunzo ya uongozi, ushauri wa taaluma na maandalizi ya chuo kikuu.',
    pointsEn: ['Science, Business and Arts combinations', 'Career guidance', 'University preparation'],
    pointsSw: ['Michepuo ya Sayansi, Biashara na Sanaa', 'Ushauri wa taaluma', 'Maandalizi ya chuo kikuu'],
  },
];

export const activities = [
  { photo: 'act-competitions', en: 'Academic competitions', sw: 'Mashindano ya kitaaluma', dEn: 'Encouraging intellectual challenge and innovation.', dSw: 'Kuchochea changamoto za kiakili na ubunifu.' },
  { photo: 'act-clubs', en: 'Clubs', sw: 'Klabu', dEn: 'From debate to science, drama to environmental action.', dSw: 'Kuanzia mdahalo hadi sayansi, maigizo hadi mazingira.' },
  { photo: 'act-scouting', en: 'Scouting and sports', sw: 'Skauti na michezo', dEn: 'Discipline, resilience and service, plus football, athletics and team games.', dSw: 'Nidhamu, ustahimilivu na huduma, pamoja na mpira, riadha na michezo ya timu.' },
  { photo: 'act-culture', en: 'Cultural celebrations', sw: 'Sherehe za utamaduni', dEn: 'Showcasing Tanzania’s rich heritage and diversity.', dSw: 'Kuonyesha urithi na utofauti wa Tanzania.' },
];

export const clubs = [
  ['Debate', 'Mdahalo', 'Confidence and critical thinking.', 'Kujiamini na kufikiri kwa kina.'],
  ['Science club', 'Klabu ya sayansi', 'Experiments and innovation.', 'Majaribio na ubunifu.'],
  ['Drama', 'Maigizo', 'Performance and self-expression.', 'Sanaa na kujieleza.'],
  ['Environmental action', 'Mazingira', 'Caring for our environment.', 'Kutunza mazingira yetu.'],
  ['Scouting', 'Skauti', 'Discipline and community service.', 'Nidhamu na huduma kwa jamii.'],
  ['Sports', 'Michezo', 'Football, athletics and more.', 'Mpira wa miguu, riadha na zaidi.'],
  ['Cultural celebrations', 'Utamaduni', 'Tanzania’s heritage and diversity.', 'Kusherehekea urithi wa Tanzania.'],
  ['Immigration Club', 'Klabu ya Uhamiaji', 'First school club of its kind in Dar es Salaam (2026).', 'Ya kwanza ya aina hii jijini Dar es Salaam (2026).'],
] as const;

export const facilities = [
  { id: 'class', photo: 'learning-in-motion-our-green-acres-teach-2', en: 'Modern classrooms', sw: 'Madarasa ya kisasa',
    dEn: 'Spacious, well-lit rooms with modern teaching aids that support focus, creativity and interactive learning.',
    dSw: 'Madarasa mapana yenye mwanga na vifaa vya kisasa vya kufundishia vinavyochochea umakini na ubunifu.' },
  { id: 'lab', photo: 'lab-3', gallery: ['lab', 'lab-2', 'lab-3', 'lab-4', 'science-club', '3'], en: 'Science laboratories', sw: 'Maabara za sayansi',
    dEn: 'Hands-on Physics, Chemistry and Biology, designed for safety and innovation so learners experiment, observe and apply.',
    dSw: 'Fizikia, Kemia na Biolojia kwa vitendo, zimeundwa kwa usalama ili wanafunzi wajaribu, waone na watumie maarifa.' },
  { id: 'dorm', photo: 'domitory', video: 'dormitory-life', en: 'Dormitories', sw: 'Mabweni',
    dEn: 'Comfortable, secure boarding supervised by caring staff, a homely place that supports study and personal growth.',
    dSw: 'Mabweni salama yanayosimamiwa na walezi, mazingira ya nyumbani yanayosaidia masomo na ukuaji.' },
  { id: 'ict', photo: 'computer-lab', en: 'Computer lab', sw: 'Maabara ya kompyuta',
    dEn: 'Up-to-date technology and high-speed internet, from basic computer literacy to advanced research projects.',
    dSw: 'Teknolojia ya kisasa na intaneti ya kasi, kuanzia stadi za msingi za kompyuta hadi miradi ya utafiti.' },
  { id: 'play', photo: 'student-preschool', gallery: ['5-2', '4-2', '3-2', '2-2', '1-3', 'student-preschool'], en: 'Playground and sports field', sw: 'Uwanja wa michezo',
    dEn: 'A spacious, secure playground and a green pitch where children explore, make friends and stay active.',
    dSw: 'Uwanja mpana na salama pamoja na kiwanja cha kijani ambapo watoto hucheza, hujenga urafiki na kuwa na afya.' },
  { id: 'clinic', photo: 'dispensary', video: 'school-nurse', en: 'School dispensary', sw: 'Zahanati ya shule',
    dEn: 'Qualified medical staff on campus for first aid, minor illness and routine checks, giving parents peace of mind.',
    dSw: 'Wahudumu wa afya waliohitimu kwa huduma ya kwanza, magonjwa madogo na uchunguzi wa kawaida.' },
];

export const joiningDocs = [
  { en: 'Nursery', sw: 'Awali', file: '2027-KUJIUNGA-AWALI.pdf' },
  { en: 'Primary · Grades 1, 2 & 3', sw: 'Msingi · Darasa 1, 2 na 3', file: '2027-KUJIUNGA-DARASA-1-2-3-.pdf' },
  { en: 'Primary · Grades 4 & 5', sw: 'Msingi · Darasa 4 na 5', file: '2027-KUJIUNGA-DARASA-45.pdf' },
  { en: 'Primary · Grades 6 & 7', sw: 'Msingi · Darasa 6 na 7', file: '2027-KUJIUNGA-DARASA-67.pdf' },
  { en: 'Secondary · Boarding', sw: 'Sekondari · Bweni', file: '2027-SEKONDARI-BWENI.pdf' },
  { en: 'Secondary · Day', sw: 'Sekondari · Kutwa', file: '2027-SEKONDARI-KUTWA.pdf' },
];

/** The eight question cards published by the school (in Kiswahili) on the old admissions page. */
export const faqCards = ['1-2', '2-1', '3-1', '4-1', '5-1', '6', '7', '8'];

export const faqs = [
  ['How do I apply?', 'Ninaombaje?',
    'Fill in the admission form online (student and parent details), or visit the admissions office. Download the joining instructions for your child’s level below.',
    'Jaza fomu ya maombi mtandaoni (taarifa za mwanafunzi na mzazi), au tembelea ofisi ya udahili. Pakua maelekezo ya kujiunga ya darasa husika hapa chini.'],
  ['Which levels accept applications?', 'Ngazi zipi zinapokea maombi?',
    'Nursery, Primary, Pre-Form 1, Secondary (Form I–IV), Pre-Form 5 and High School (A-Level). Form One 2027 admission is open now.',
    'Awali, Msingi, Pre-Form 1, Sekondari (Kidato I–IV), Pre-Form 5 na A-Level. Udahili wa Kidato cha Kwanza 2027 uko wazi sasa.'],
  ['Do you offer boarding?', 'Mna huduma ya bweni?',
    'Yes. Secondary students can board in supervised dormitories at the Dar es Salaam campus. Day places are also available.',
    'Ndiyo. Wanafunzi wa sekondari wanaweza kukaa bweni linalosimamiwa katika kampasi ya Dar es Salaam. Nafasi za kutwa pia zipo.'],
  ['Where do I find fees and requirements?', 'Ada na mahitaji nayapata wapi?',
    'Fees, uniform and the full list of requirements are in the joining instructions for each level. Download the right PDF below or call the office.',
    'Ada, sare na orodha kamili ya mahitaji iko kwenye maelekezo ya kujiunga ya kila darasa. Pakua PDF husika hapa chini au piga ofisini.'],
  ['Who do I call with questions?', 'Nimpigie nani nikiwa na swali?',
    'Dar es Salaam: +255 782 128 633 or +255 747 128 633. Bunazi: +255 687 392 000. Office hours are Monday to Saturday, 8:30 AM to 5:00 PM.',
    'Dar es Salaam: +255 782 128 633 au +255 747 128 633. Bunazi: +255 687 392 000. Ofisi iko wazi Jumatatu hadi Jumamosi, saa 2:30 asubuhi hadi saa 11 jioni.'],
] as const;

/** Events listed on the old News & Events page. The page gave days and venues but no year. */
export const events = [
  { d: '11', mEn: 'May', mSw: 'Mei', en: '25 Years Anniversary', sw: 'Maadhimisho ya miaka 25', venue: 'Mlimani City', time: '10:00 AM' },
  { d: '15', mEn: 'Jun', mSw: 'Jun', en: 'Alumni get-together', sw: 'Mkusanyiko wa wahitimu', venue: 'Giraffe Hotel', time: '10:00 AM – 5:00 PM' },
  { d: '24', mEn: 'Jul', mSw: 'Jul', en: 'Career building in Artificial Intelligence', sw: 'Taaluma katika Akili Bandia (AI)', venue: 'Urayana Hall', time: '10:00 AM' },
  { d: '11', mEn: 'Aug', mSw: 'Ago', en: 'Innovation in arts and culture', sw: 'Ubunifu katika sanaa na utamaduni', venue: 'Urayana Hall', time: '10:00 AM' },
];

export const alumniVoices = [
  { photo: '1-5', name: 'John Mwakalinga', roleEn: 'University student', roleSw: 'Mwanafunzi wa chuo kikuu', quoteEn: 'Green Acres gave me the knowledge, discipline and confidence to pursue my ambitions.', quoteSw: 'Green Acres ilinipa maarifa, nidhamu na ujasiri wa kufuata ndoto zangu.' },
  { photo: '2-4', name: 'Neema Joseph', roleEn: 'Entrepreneur', roleSw: 'Mjasiriamali', quoteEn: 'My education at Green Acres taught me leadership, responsibility and the value of hard work.', quoteSw: 'Elimu yangu Green Acres ilinifundisha uongozi, uwajibikaji na thamani ya bidii.' },
  { photo: '3-4', name: 'Emmanuel Peter', roleEn: 'IT professional', roleSw: 'Mtaalamu wa TEHAMA', quoteEn: 'The foundation I received at Green Acres continues to inspire my personal and professional growth.', quoteSw: 'Msingi niliopata Green Acres unaendelea kunichochea katika maisha na kazi.' },
  { photo: '44', name: 'Amina Hassan', roleEn: 'Medical student', roleSw: 'Mwanafunzi wa udaktari', quoteEn: 'Green Acres equipped me with the academic foundation and determination I need to pursue my dreams.', quoteSw: 'Green Acres ilinipa msingi wa kitaaluma na dhamira ninayohitaji kufikia ndoto zangu.' },
  { photo: '5', name: 'David Michael', roleEn: 'Business professional', roleSw: 'Mfanyabiashara', quoteEn: 'Green Acres taught me discipline, teamwork and perseverance, values that continue to shape my success.', quoteSw: 'Green Acres ilinifundisha nidhamu, ushirikiano na uvumilivu, tunu zinazoendelea kujenga mafanikio yangu.' },
];

export const videos = [
  { id: 'parent-testimonial', en: 'Why this parent chose Green Acres', sw: 'Kwa nini mzazi huyu alichagua Green Acres' },
  { id: 'dormitory-life', en: 'A day in the dormitory, with our matron', sw: 'Siku moja bwenini, pamoja na mlezi wetu' },
  { id: 'school-nurse', en: 'Meet our school nurse, Ms Aneth', sw: 'Mfahamu muuguzi wetu, Bi. Aneth' },
  { id: 'graduation-form6', en: 'Form Six graduation', sw: 'Mahafali ya Kidato cha Sita' },
  { id: 'crdb-visit', en: 'Students visit CRDB Bank HQ', sw: 'Wanafunzi watembelea makao makuu ya CRDB' },
  { id: 'mwananyamala-visit', en: '25 years of caring: Mwananyamala Hospital', sw: 'Miaka 25 ya kujali: Hospitali ya Mwananyamala' },
  { id: 'sunday-service', en: 'Thanksgiving at KKKT Mbezi Beach', sw: 'Ibada ya shukrani KKKT Mbezi Beach' },
  { id: 'graduation-25th', en: '25th graduation ceremony', sw: 'Mahafali ya 25' },
];

/* ---------- news ---------- */

const HIDE = new Set([
  // the same Standard Seven post published twice, and a graduation post with no media
  'matokeo-ya-mtihani-wa-taifa-darasa-la-7-mwaka-2025',
  'green-acres-25th-pre-unit-class-7-form-4-graduation-ceremony',
]);
const SW_TITLES: Record<string, string> = {
  'uzinduzi-wa-klabu-ya-uhamiaji': 'Uzinduzi wa Klabu ya Uhamiaji',
  'form-four-examination-results-2025': 'Matokeo ya Kidato cha Nne 2025',
  'form-two-national-assessment-results-2025': 'Matokeo ya Upimaji wa Kidato cha Pili 2025',
  'commendable-performance-dsm-green-acres-grade-four-2025': 'Matokeo mazuri: DSM Green Acres, Darasa la Nne 2025',
  'outstanding-performance-bunazi-green-acres-top-school-in-missenyi-grade-four-2025': 'Bunazi Green Acres yaongoza Missenyi, Darasa la Nne 2025',
  'psle-results-2025': 'Matokeo ya Darasa la Saba (PSLE) 2025',
  'national-examination-results-for-standard-seven-2025': 'Matokeo ya Taifa ya Darasa la Saba 2025',
  'green-acres-schools-honored-for-compassionate-contribution-at-upendo-wa-yatima-kwa-mama-event': 'Green Acres yatunukiwa katika tukio la “Upendo wa Yatima kwa Mama”',
  'cultural-day-at-green-acres-fashion-dance-food-25-years-of-legacy': 'Siku ya Utamaduni: mitindo, ngoma, vyakula na miaka 25',
  'green-acres-25th-graduation-ceremony-celebration': 'Sherehe ya mahafali ya 25',
  'green-acres-career-day-august-2025-inspiring-dreams-shaping-futures': 'Siku ya Taaluma, Agosti 2025',
  'green-acres-schools-25-years-anniversary': 'Maadhimisho ya miaka 25 ya Green Acres',
};
const POST_VIDEO: Record<string, string> = {
  'green-acres-25th-graduation-ceremony-celebration': 'graduation-25th',
};

function tidyTitle(t: string) {
  // the old site shouted some titles in capitals
  if (t === t.toUpperCase()) return t.charAt(0) + t.slice(1).toLowerCase().replace(/\b(form|standard|grade|four|seven|two|green acres|dsm|bunazi|missenyi|psle)\b/g, (w) => w.replace(/\b\w/g, (c) => c.toUpperCase()));
  return t;
}

export const posts: (Post & { titleSw: string; video?: string })[] = (postsJson as Post[])
  .filter((p) => !HIDE.has(p.slug))
  .map((p) => ({ ...p, title: tidyTitle(p.title), titleSw: SW_TITLES[p.slug] ?? p.title, video: POST_VIDEO[p.slug] }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const albums = albumsJson as Album[];

/* ---------- results (figures published by the school in its posts) ---------- */

export const results = [
  {
    id: 'psle', en: 'Standard Seven 2025', sw: 'Darasa la Saba 2025', k: 'PSLE 2025', post: 'psle-results-2025',
    noteEn: 'Bunazi Green Acres was the top school in Missenyi District. Every one of its 77 pupils scored Grade A.',
    noteSw: 'Bunazi Green Acres ilikuwa shule ya kwanza Wilaya ya Missenyi. Wanafunzi wote 77 walipata daraja A.',
    stats: [
      { en: 'Bunazi pupils', sw: 'Wanafunzi Bunazi', v: '77' },
      { en: 'Grade A', sw: 'Daraja A', v: '77 / 77' },
      { en: 'School average', sw: 'Wastani wa shule', v: '289.57' },
      { en: 'District rank', sw: 'Nafasi wilayani', v: '1st' },
    ],
    rows: [{ a: 'Bunazi Green Acres', b: '77 pupils', c: 'All Grade A · average 289.57' }, { a: 'DSM Green Acres', b: '—', c: 'Outstanding performance (see the full post)' }],
  },
  {
    id: 'sfna', en: 'Grade Four 2025', sw: 'Darasa la Nne 2025', k: 'SFNA 2025', post: 'outstanding-performance-bunazi-green-acres-top-school-in-missenyi-grade-four-2025',
    noteEn: 'Bunazi: all 93 pupils scored Grade A, top school in Missenyi District. DSM: 35 pupils, school average 225.17.',
    noteSw: 'Bunazi: wanafunzi wote 93 walipata daraja A, shule ya kwanza Missenyi. DSM: wanafunzi 35, wastani 225.17.',
    stats: [
      { en: 'Bunazi Grade A', sw: 'Bunazi daraja A', v: '93 / 93' },
      { en: 'Bunazi average', sw: 'Wastani Bunazi', v: '277.24' },
      { en: 'DSM Grade A', sw: 'DSM daraja A', v: '13 / 35' },
      { en: 'DSM average', sw: 'Wastani DSM', v: '225.17' },
    ],
    rows: [
      { a: 'DSM · Grade A', b: '13', c: '37%' },
      { a: 'DSM · Grade B', b: '18', c: '51%' },
      { a: 'DSM · Grade C', b: '4', c: '11%' },
      { a: 'Bunazi · Grade A', b: '93', c: '100%' },
    ],
  },
  {
    id: 'ftna', en: 'Form Two 2025', sw: 'Kidato cha Pili 2025', k: 'FTNA 2025', post: 'form-two-national-assessment-results-2025',
    noteEn: 'Form Two National Assessment, 2025. 32 candidates, with more than half in Division I.',
    noteSw: 'Upimaji wa Taifa wa Kidato cha Pili, 2025. Watahiniwa 32, zaidi ya nusu daraja la kwanza.',
    stats: [
      { en: 'Candidates', sw: 'Watahiniwa', v: '32' },
      { en: 'Division I', sw: 'Daraja I', v: '17' },
      { en: 'Division I–II', sw: 'Daraja I–II', v: '66%' },
      { en: 'Division I–III', sw: 'Daraja I–III', v: '88%' },
    ],
    rows: [
      { a: 'Division I', b: '17', c: '53%' },
      { a: 'Division II', b: '4', c: '13%' },
      { a: 'Division III', b: '7', c: '22%' },
      { a: 'Division IV', b: '4', c: '13%' },
    ],
  },
  {
    id: 'csee', en: 'Form Four 2025', sw: 'Kidato cha Nne 2025', k: 'CSEE 2025', post: 'form-four-examination-results-2025',
    noteEn: 'The school published the Form Four results as an image. The breakdown will be typed in from the CMS so every parent can read it on any phone.',
    noteSw: 'Shule ilichapisha matokeo ya Kidato cha Nne kama picha. Uchambuzi utaingizwa kupitia CMS ili kila mzazi ausome kwa simu yoyote.',
    stats: [],
    rows: [],
  },
];
