const experts = [
    // 1️⃣ ENGLISH – JOHNNY
    {
        id: 1,
        name: "Johnny W",
        price: 70,
        avatar: "https://i.pravatar.cc/150?img=32",
        title: "English Specialist (Language and Literature)",
        experience: 6,
        qualified: true,
        dbsChecked: true,

        summary:
            "Johnny is a qualified Teacher with an Enhanced DBS, specialising in English, Geography, and History. He offers a highly personal approach to tutoring, tailoring lessons to each student’s needs.",

        about: `Tutor of English Language and Literature - KS3, KS4, GCSE, IGCSE, A-Level.
Private tutor with 8 years of experience.
Highly adaptable to online teaching.`,

        availability: [
            { date: "10 Jun", available: true },
            { date: "11 Jun", available: false },
            { date: "12 Jun", available: true },
            { date: "13 Jun", available: true },
            { date: "14 Jun", available: false }
        ],

        subjects: [
            { subject: "English", level: "Primary", rate: "£70/hr" },
            { subject: "English", level: "GCSE", rate: "£70/hr" },
            { subject: "English", level: "A-Level", rate: "£70/hr" }
        ]
    },

    // 2️⃣ PROGRAMMING – SARAH
    {
        id: 2,
        name: "Sarah L",
        price: 60,
        avatar: "https://i.pravatar.cc/150?img=47",
        title: "Frontend & Fullstack Developer",
        experience: 5,
        qualified: true,
        dbsChecked: false,

        summary:
            "Sarah is a professional frontend and fullstack developer specialising in React, Node.js, and UI/UX design. She focuses on practical, project-based learning.",

        about: `5 years working as a Fullstack Developer.
Mentor for React, JavaScript, and real-world projects.
Strong focus on clean UI and scalable code.`,

        availability: [
            { date: "10 Jun", available: true },
            { date: "11 Jun", available: true },
            { date: "12 Jun", available: false },
            { date: "13 Jun", available: true }
        ],

        subjects: [
            { subject: "JavaScript", level: "Beginner", rate: "£50/hr" },
            { subject: "React", level: "Intermediate", rate: "£60/hr" },
            { subject: "Fullstack", level: "Advanced", rate: "£70/hr" }
        ]
    },

    // 3️⃣ DATA SCIENCE – MICHAEL
    {
        id: 3,
        name: "Michael K",
        price: 80,
        avatar: "https://i.pravatar.cc/150?img=12",
        title: "Data Scientist & AI Engineer",
        experience: 7,
        qualified: true,
        dbsChecked: false,

        summary:
            "Michael is an experienced Data Scientist with a strong background in Machine Learning, Python, and AI systems.",

        about: `Worked on multiple AI and data-driven products.
Expert in Python, Pandas, Scikit-learn, and Deep Learning.
Helps students understand both theory and practice.`,

        availability: [
            { date: "10 Jun", available: false },
            { date: "11 Jun", available: true },
            { date: "12 Jun", available: true },
            { date: "13 Jun", available: false }
        ],

        subjects: [
            { subject: "Python", level: "Intermediate", rate: "£70/hr" },
            { subject: "Machine Learning", level: "Advanced", rate: "£80/hr" },
            { subject: "Data Science", level: "Advanced", rate: "£80/hr" }
        ]
    },

    // 4️⃣ DESIGN – EMMA
    {
        id: 4,
        name: "Emma R",
        price: 55,
        avatar: "https://i.pravatar.cc/150?img=56",
        title: "UI/UX Designer",
        experience: 4,
        qualified: true,
        dbsChecked: false,

        summary:
            "Emma is a creative UI/UX designer helping students design modern, user-friendly interfaces.",

        about: `UI/UX Designer with experience in Figma and Design Systems.
Focus on real-world design thinking and portfolio building.`,

        availability: [
            { date: "10 Jun", available: true },
            { date: "11 Jun", available: true },
            { date: "12 Jun", available: true }
        ],

        subjects: [
            { subject: "UI Design", level: "Beginner", rate: "£50/hr" },
            { subject: "UX Research", level: "Intermediate", rate: "£55/hr" },
            { subject: "Figma", level: "Intermediate", rate: "£55/hr" }
        ]
    },

    // 5️⃣ CHESS – ALEX
    {
        id: 5,
        name: "Alex P",
        price: 40,
        avatar: "https://i.pravatar.cc/150?img=22",
        title: "Chess Coach (Strategy & Tactics)",
        experience: 10,
        qualified: true,
        dbsChecked: false,

        summary:
            "Alex is a professional chess coach helping students improve strategic thinking and problem-solving skills.",

        about: `10 years coaching chess for students of all levels.
Focus on strategy, tactics, and tournament preparation.`,

        availability: [
            { date: "10 Jun", available: false },
            { date: "11 Jun", available: true },
            { date: "12 Jun", available: true },
            { date: "13 Jun", available: true }
        ],

        subjects: [
            { subject: "Chess", level: "Beginner", rate: "£40/hr" },
            { subject: "Chess", level: "Intermediate", rate: "£45/hr" },
            { subject: "Chess", level: "Advanced", rate: "£50/hr" }
        ]
    }
];

export default experts;
