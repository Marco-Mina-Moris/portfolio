export const site = {
    name: "Marco Mina",
    fullName: "Marco Mina Moris",
    role: "Flutter Mobile Developer",
    url: "https://marco-mina-portfolio.vercel.app",
    email: "marcominamories@gmail.com",
    phone: "+201287035405",
    phoneDisplay: "+20 128 703 5405",
    location: "Banha, Qalyubia, Egypt",
    github: "https://github.com/Marco-Mina-Moris",
    githubHandle: "Marco-Mina-Moris",
    linkedin: "https://linkedin.com/in/Marco-Mina-Moris",
    cv: "/cv/Marco-Mina-Moris-CV.pdf",
    cvFileName: "Marco-Mina-Moris-CV.pdf",
    description:
        "Flutter developer building production-ready iOS & Android apps with Clean Architecture, BLoC/Riverpod, Firebase, and real REST backends.",
};

export const whatsappUrl = `https://wa.me/201287035405?text=${encodeURIComponent(
    "Hi Marco! I visited your portfolio and I'd like to discuss a project."
)}`;

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Toolkit", href: "#toolkit" },
    { label: "Experience", href: "#experience" },
    { label: "Courses", href: "#courses" },
    { label: "Contact", href: "#contact" },
];

export const techStack = [
    "Flutter",
    "Dart",
    "Firebase",
    "Supabase",
    "BLoC / Cubit",
    "Riverpod",
    "GetX",
    "Clean Architecture",
    "MVVM",
    "REST APIs",
    "Dio",
    "Laravel Sanctum",
    "Hive",
    "Google Maps",
    "Paymob",
    "Arabic RTL",
    "Git & CI/CD",
];

export type SkillIcon = "flutter" | "state" | "firebase" | "architecture" | "api" | "tools";

export interface Skill {
    icon: SkillIcon;
    name: string;
    description: string;
    tags: string[];
}

export const skills: Skill[] = [
    { icon: "flutter", name: "Flutter & Dart", description: "Custom widgets, animations, CustomPaint, and responsive layouts that feel native on both platforms.", tags: ["Widgets", "Animations", "Custom UI", "Flutter Web"] },
    { icon: "state", name: "State Management", description: "Predictable, testable app state with BLoC, Cubit, Riverpod, Provider, and GetX in production projects.", tags: ["BLoC", "Cubit", "Riverpod", "Provider", "GetX"] },
    { icon: "firebase", name: "Firebase & Supabase", description: "Auth, Firestore, realtime channels, Crashlytics monitoring, and FCM push notifications.", tags: ["Auth", "Firestore", "Realtime", "Crashlytics", "FCM"] },
    { icon: "architecture", name: "Architecture", description: "Clean Architecture, MVVM, SOLID, and the repository pattern for codebases that stay easy to change.", tags: ["Clean Architecture", "MVVM", "SOLID", "Repository"] },
    { icon: "api", name: "APIs & Storage", description: "REST integration with Dio & Retrofit against Laravel backends, plus offline caching with Hive and Sqflite.", tags: ["REST", "Dio", "Retrofit", "Hive", "Sqflite"] },
    { icon: "tools", name: "Tooling & Delivery", description: "Git workflows, Figma handoff, Postman, Fastlane, and CI/CD pipelines through to store release.", tags: ["Git", "Figma", "Postman", "Fastlane", "CI/CD"] },
];

export interface Experience {
    period: string;
    role: string;
    company: string;
    location: string;
    highlights: string[];
    tags: string[];
    current?: boolean;
}

export const experiences: Experience[] = [
    {
        period: "Sep 2026 — Present",
        role: "Mobile Application Developer",
        company: "Stitch for Technology Solutions",
        location: "Cairo, Egypt",
        highlights: [
            "Building, maintaining, and optimizing mobile applications for iOS and Android in collaboration with the engineering team.",
            "Integrating RESTful APIs, push notification services, and third-party mobile SDKs.",
            "Implementing chatbot and conversational interfaces within mobile apps with robust backend integration.",
            "Managing app builds and releases through CI/CD pipelines, submitting updates to Google Play and the Apple App Store.",
            "Collaborating with the Head of Technology, backend engineers, and QA to deliver features on schedule.",
        ],
        tags: ["Flutter", "REST APIs", "Push Notifications", "Chatbot UI", "CI/CD"],
        current: true,
    },
    {
        period: "Aug 2026 — Oct 2026",
        role: "Flutter Developer",
        company: "Marketopia",
        location: "Alexandria, Egypt",
        highlights: [
            "Developed cross-platform mobile applications using Flutter and Dart.",
            "Built responsive, user-friendly interfaces and implemented core application features.",
            "Applied Clean Architecture and state management practices to create maintainable applications.",
            "Integrated APIs and backend services to support real-world application functionality.",
            "Tested and debugged applications to ensure stability, performance, and a smooth user experience.",
            "Prepared applications for deployment on Google Play and the Apple App Store, currently in the testing phase.",
        ],
        tags: ["Flutter", "Clean Architecture", "Riverpod", "Laravel API", "Paymob"],
    },
    {
        period: "Jun 2026 — Sep 2026",
        role: "Part-Time Flutter Developer & Technical Instructor",
        company: "B-Developer",
        location: "Remote",
        highlights: [
            "Built and maintained cross-platform mobile applications using Flutter and Dart.",
            "Designed and delivered Flutter training sessions with hands-on, real-world projects.",
            "Mentored aspiring Flutter developers through code reviews, debugging, and technical guidance.",
            "Collaborated with the development team to implement scalable and maintainable features.",
            "Balanced software development responsibilities with technical instruction.",
        ],
        tags: ["Flutter", "Dart", "Mentoring", "Code Review"],
    },
    {
        period: "Nov 2025 — May 2026",
        role: "Cross-Platform Mobile App Developer",
        company: "Digital Egypt Pioneers Initiative (DEPI)",
        location: "Remote",
        highlights: [
            "Developed cross-platform mobile apps using Flutter & Dart following Clean Architecture.",
            "Implemented BLoC/Cubit state management and integrated REST APIs, Firebase, and Google Maps.",
            "Worked on real-world projects, enhancing problem-solving and teamwork skills.",
        ],
        tags: ["Flutter", "BLoC", "Firebase", "Google Maps"],
    },
    {
        period: "Jun 2025 — Aug 2025",
        role: "Mobile App Development Intern",
        company: "National Telecommunication Institute (NTI)",
        location: "Egypt",
        highlights: [
            "Participated in a 120-hour internship in mobile development with Flutter and Dart.",
            "Worked on practical app development projects with backend integration and real-time updates.",
            "Focused on Clean Architecture, state management (BLoC), and app deployment processes.",
        ],
        tags: ["Flutter", "BLoC", "Clean Architecture", "Deployment"],
    },
    {
        period: "Sep 2024 — Oct 2024",
        role: "Training Flutter Developer",
        company: "Information Technology Institute (ITI)",
        location: "Egypt",
        highlights: [
            "Attended a 60-hour intensive course focused on Flutter mobile app development.",
            "Learned Object-Oriented Programming, Dart, Flutter basics, and version control using Git.",
            "Delivered a complete app project as part of the training.",
        ],
        tags: ["Flutter", "Dart", "OOP", "Git"],
    },
];

export interface Certificate {
    /** Image under /public; shown only once the file exists. */
    src: string;
    issuer: string;
    date: string;
}

export interface Course {
    title: string;
    provider: string;
    date: string;
    description: string;
    tags: string[];
    credentialId?: string;
    certificates: Certificate[];
}

export const courses: Course[] = [
    {
        title: "Flutter App Creation: Google Maps Integration Guide",
        provider: "Tharwat Samy Academy",
        date: "2025",
        description: "Integrating Google Maps into Flutter apps — markers, user location, and route tracking.",
        tags: ["Google Maps", "Location", "Route Tracking"],
        credentialId: "acce804ccf2d3496",
        certificates: [
            { src: "/images/certificates/tharwat-samy-google-maps.jpg", issuer: "Tharwat Samy Academy", date: "2025" },
        ],
    },
    {
        title: "Flutter Development Diploma",
        provider: "Route IT Training Center",
        date: "2025",
        description: "Comprehensive Flutter diploma covering Dart, UI building, state management, Firebase, and REST APIs through hands-on apps — certified by Route and the Egyptian Engineers Syndicate.",
        tags: ["Flutter", "Dart", "Firebase", "REST APIs"],
        certificates: [
            { src: "/images/certificates/route-flutter-diploma.jpg", issuer: "Route IT Training Center", date: "Feb 2025" },
            { src: "/images/certificates/route-engineers-syndicate.jpg", issuer: "Egyptian Engineers Syndicate", date: "Apr 2025" },
        ],
    },
];
