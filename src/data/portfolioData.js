// ─────────────────────────────────────────────────────────────────────────────
// portfolioData.js
// PRIMARY FACTUAL CONTENT SOURCE — resume of Shuvik M
// CGPA correction: 7.77 → 7.81 (intentional, confirmed by user)
// ─────────────────────────────────────────────────────────────────────────────

// ── Identity ─────────────────────────────────────────────────────────────────
export const profile = {
  name:      'SHUVIK M',
  nameFirst: 'SHUVIK',
  nameLast:  'M',

  role: 'SOFTWARE DEVELOPER',

  heroIdentities: [
    'FULL STACK DEVELOPER',
    'CREATIVE CODER',
    'SYSTEM BUILDER',
  ],

  bio:
    "I'M A SOFTWARE DEVELOPER FOCUSED ON BUILDING PRACTICAL DIGITAL SYSTEMS.",
  bioDetail:
    'As a dedicated and highly motivated professional, I am continuously seeking to enhance my skills and contribute effectively in a dynamic, collaborative environment. I pride myself on my attention to detail, strong problem-solving abilities and commitment to excellence. I am passionate about leveraging my strengths to drive success and achieve outstanding results.',

  areasOfInterest: [
    'Database Management Systems',
    'Computer Networks',
    'Agile',
  ],

  softSkills: [
    'Leadership',
    'Time Management',
    'Adaptability',
    'Problem Solving',
  ],
};

// ── Resume ────────────────────────────────────────────────────────────────────
// Place the PDF at: public/assets/resume/shuvik-resume.pdf
export const resume = {
  path:     '/assets/resume/shuvik-resume.pdf',
  filename: 'Shuvik-M-Resume.pdf', // used as the download filename
};

// ── Education ─────────────────────────────────────────────────────────────────
export const education = [
  {
    id:          'edu-college',
    institution: 'Kongu Engineering College, Erode',
    degree:      'B.E. Computer Science and Engineering',
    duration:    '2023 — 2027',
  },
  {
    id:          'edu-school',
    institution: 'Bharathi Vidya Bhavan',
    degree:      'Higher Secondary Education',
    duration:    '2022 — 2023',
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────
export const skillCategories = [
  { category: 'Languages',        items: ['C', 'Java', 'JavaScript'] },
  { category: 'Frontend',         items: ['HTML', 'CSS', 'React'] },
  { category: 'Backend',          items: ['Node.js', 'Express.js'] },
  { category: 'Database',         items: ['MongoDB'] },
  { category: 'Development',      items: ['MERN'] },
  { category: 'Machine Learning', items: ['Python', 'Scikit-learn', 'XGBoost'] },
];

export const tools = ['Figma', 'Canva', 'Github', 'Postman'];

// ── Projects ─────────────────────────────────────────────────────────────────
// HorizontalScrollSection owns the track transform.
// ProjectCard must never modify its root transform.
export const projects = [
  {
    id:             'ai-mentoring-platform',
    number:         '01',
    title:          'AI-Powered Study Mentor',
    date:           'September 2025',
    classification: 'AI PLATFORM',
    buildYear:      '2025',
    description:
      'Developed an AI-based mentoring platform providing personalised learning paths for students.',
    highlight:
      'Implemented automatic quiz generation from PDFs to support student self-assessment.',
    stack:     ['React', 'Node.js', 'MongoDB', 'Python'],
    image:     null,
    liveUrl:   null,
    githubUrl: 'https://github.com/Shuvikm/ai-mentoring-platform',
    featured:  true,
  },
  {
    id:             'lost-found-web-application',
    number:         '02',
    title:          'Lost & Found Web Application',
    date:           'July 2024',
    classification: 'FULL STACK',
    buildYear:      '2024',
    description:
      'Designed and developed a full-stack web application for reporting and claiming lost items.',
    highlight:
      'Enabled image uploads to improve lost-item identification.',
    stack:     ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
    image:     null,
    liveUrl:   null,
    githubUrl: 'https://github.com/Shuvikm/lost-found-web-application',
    featured:  true,
  },
  {
    id:             'flight-delay-prediction',
    number:         '03',
    title:          'Flight Delay & Prediction',
    date:           'December 2024',
    classification: 'MACHINE LEARNING',
    buildYear:      '2024',
    description:
      'Built a machine learning model to predict flight delays using historical and weather data.',
    highlight:
      'Trained and evaluated Logistic Regression, Random Forest, and XGBoost models.',
    stack:     ['Python', 'Scikit-learn', 'XGBoost'],
    image:     null,
    liveUrl:   null,
    githubUrl: 'https://github.com/Shuvikm/flight-delay-prediction',
    featured:  false,
  },
  {
    id:             'currency-converter',
    number:         '04',
    title:          'Currency Converter',
    date:           'October 2025',
    classification: 'MOBILE APP',
    buildYear:      '2025',
    description:
      'Developed a currency converter using Flutter and Dart for dynamic USD-to-INR conversion.',
    highlight:
      'Implemented state management and user input handling for real-time UI updates.',
    stack:     ['Flutter', 'Dart', 'Material Design'],
    image:     null,
    liveUrl:   null,
    githubUrl: null,
    featured:  false,
  },
];

// ── Certifications ────────────────────────────────────────────────────────────
// Place images at: public/assets/images/certs/
//
//   mongodb-certificate.pdf    ← MongoDB Certified Associate Developer
//   oracle-score-report.pdf   ← Oracle Testing Score Report (Java SE 17)
//   oracle-certificate.pdf    ← Oracle Certified Professional certificate
export const certifications = [
  {
    id:          'cert-mongodb',
    title:       'MongoDB Certified Associate Developer',
    issuer:      'MongoDB',
    date:        'March 2025',
    proofImages: [
      {
        src:   '/assets/images/certs/mongodb-certificate.pdf',
        alt:   'MongoDB Certified Associate Developer certificate for Shuvik M',
        label: 'Certificate',
      },
    ],
  },
  {
    id:          'cert-java',
    title:       'Java SE 17 Developer',
    issuer:      'Oracle',
    date:        'February 2026',
    proofImages: [
      {
        src:   '/assets/images/certs/oracle-score-report.pdf',
        alt:   'Oracle Java SE 17 Examination Score Report for Shuvik M',
        label: 'Score Report',
      },
      {
        src:   '/assets/images/certs/oracle-certificate.pdf',
        alt:   'Oracle Certified Professional certificate for Shuvik M',
        label: 'Certificate',
      },
    ],
  },
];

// ── Achievements ──────────────────────────────────────────────────────────────
// HorizontalScrollSection owns the track transform.
// AchievementCard must never modify its root transform.
// proofImage — optional; when null the card renders as a typography panel.
// Place images at: public/assets/images/achievements/
//
//   blood-donation.pdf   ← Certificate of Appreciation, Lions Club of Erode
export const achievements = [
  {
    id:           'ach-01',
    number:       '01',
    type:         'AWARD',
    title:        'Paper Presentation — 1st Place',
    organization: 'Kongu Engineering College',
    description:  null,
    date:         'August 2025',
    proofImage:   null,
    link:         null,
  },
  {
    id:           'ach-02',
    number:       '02',
    type:         'AWARD',
    title:        'Web Designing — 2nd Place',
    organization: 'Kongu Engineering College',
    description:  null,
    date:         'July 2025',
    proofImage:   null,
    link:         null,
  },
  {
    id:           'ach-03',
    number:       '03',
    type:         'SPORTS',
    title:        'WINNER - 2nd place in Centies Handball',
    organization: 'Centies',
    description:  null,
    date:         'January 2024',
    proofImage:   null,
    link:         null,
  },
  {
    id:           'ach-04',
    number:       '04',
    type:         'SPORTS',
    title:        'WINNER - 4th place in Handball Interzone',
    organization: 'State Level',
    description:  null,
    date:         'April 2025',
    proofImage:   null,
    link:         null,
  },
];

// ── Contact ───────────────────────────────────────────────────────────────────
export const contact = {
  phone: '+91 9345802029',
  email: 'mshuvik@gmail.com',
};

export const socials = {
  linkedin: 'https://www.linkedin.com/in/shuvikm',
  github:   'https://github.com/Shuvikm',
  leetcode: 'https://www.leetcode.com/u/Shuvik_M/',
};

// ── Navigation ────────────────────────────────────────────────────────────────
export const navigation = [
  { id: 'projects', label: 'WORK',    href: '#projects' },
  { id: 'about',    label: 'ABOUT',   href: '#about'    },
  { id: 'skills',   label: 'SKILLS',  href: '#skills'   },
  { id: 'contact',  label: 'CONTACT', href: '#contact'  },
];

// ── Velocity Tape ─────────────────────────────────────────────────────────────
export const velocityTape = {
  items: [
    'SHUVIK M',
    'SOFTWARE DEVELOPER',
    'REACT',
    'NODE.JS',
    'MONGODB',
    'EXPRESS.JS',
    'MACHINE LEARNING',
    'FULL STACK',
    'OPEN TO WORK',
  ],
};

