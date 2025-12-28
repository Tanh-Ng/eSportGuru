const experts = [
  {
    id: "694bb3cf06b4a62f2730c3b3",
    name: "Johnny W",
    category: "english",
    levels: ["beginner", "intermediate", "advanced"],
    budget: "40-80",

    price: 70,
    avatar: "https://i.pravatar.cc/150?img=32",
    title: "English Specialist (Language and Literature)",
    experience: 6,
    qualified: true,
    dbsChecked: true,

    summary:
      "Johnny is a qualified Teacher with an Enhanced DBS, specialising in English, Geography, and History.",

    about: `Tutor of English Language and Literature - KS3, KS4, GCSE, IGCSE, A-Level.`,

    availability: {
      workingDays: [1, 3, 5], // Thứ 2, 4, 6
      busyDates: ["2025-06-14", "2025-06-20"], // ngày nghỉ đột xuất
    },
    pricing: [
      { duration: 60, price: 300000 },
      { duration: 90, price: 420000 },
      { duration: 120, price: 520000 },
    ],

    subjects: [
      { subject: "English", level: "Beginner", rate: "£70/hr" },
      { subject: "English", level: "Intermediate", rate: "£70/hr" },
      { subject: "English", level: "Advanced", rate: "£70/hr" },
    ],
  },

  {
    id: 2,
    name: "Sarah L",
    category: "programming",
    levels: ["beginner", "intermediate", "advanced"],
    budget: "40-80",

    price: 60,
    avatar: "https://i.pravatar.cc/150?img=47",
    title: "Frontend & Fullstack Developer",
    experience: 5,
    qualified: true,

    summary:
      "Sarah is a professional frontend and fullstack developer specialising in React and Node.js.",

    about: `Mentor for React, JavaScript, and real-world projects.`,

    availability: {
      workingDays: [2, 4, 6], // Tue Thu Sat
      busyDates: []
    },

    subjects: [
      { subject: "JavaScript", level: "Beginner", rate: "£50/hr" },
      { subject: "React", level: "Intermediate", rate: "£60/hr" },
      { subject: "Fullstack", level: "Advanced", rate: "£70/hr" },
    ],
  },

  {
    id: 3,
    name: "Michael K",
    category: "programming",
    levels: ["intermediate", "advanced"],
    budget: "40-80",

    price: 80,
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Data Scientist & AI Engineer",
    experience: 7,

    summary:
      "Experienced Data Scientist with strong Machine Learning background.",

    about: `Expert in Python, Pandas, Scikit-learn, and Deep Learning.`,

    availability: [
      { date: "11 Jun", available: true },
      { date: "12 Jun", available: true },
    ],

    subjects: [
      { subject: "Python", level: "Intermediate", rate: "£70/hr" },
      { subject: "Machine Learning", level: "Advanced", rate: "£80/hr" },
    ],
  },

  {
    id: 4,
    name: "Emma R",
    category: "design",
    levels: ["beginner", "intermediate"],
    budget: "20-40",

    price: 55,
    avatar: "https://i.pravatar.cc/150?img=56",
    title: "UI/UX Designer",
    experience: 4,

    summary:
      "Creative UI/UX designer helping students build real-world portfolios.",

    about: `Experienced in Figma and Design Systems.`,

    availability: [
      { date: "10 Jun", available: true },
      { date: "11 Jun", available: true },
    ],

    subjects: [
      { subject: "UI Design", level: "Beginner", rate: "£50/hr" },
      { subject: "UX Research", level: "Intermediate", rate: "£55/hr" },
    ],
  },

  {
    id: 5,
    name: "Alex P",
    category: "chess",
    levels: ["beginner", "intermediate", "advanced"],
    budget: "20-40",

    price: 40,
    avatar: "https://i.pravatar.cc/150?img=22",
    title: "Chess Coach (Strategy & Tactics)",
    experience: 10,

    summary:
      "Professional chess coach focusing on strategy and tactics.",

    about: `10 years coaching chess for students of all levels.`,

    availability: [
      { date: "11 Jun", available: true },
      { date: "12 Jun", available: true },
    ],

    subjects: [
      { subject: "Chess", level: "Beginner", rate: "£40/hr" },
      { subject: "Chess", level: "Intermediate", rate: "£45/hr" },
      { subject: "Chess", level: "Advanced", rate: "£50/hr" },
    ],
  },
];

export default experts;
