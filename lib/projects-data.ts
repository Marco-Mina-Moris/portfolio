export const GITHUB = "https://github.com/Marco-Mina-Moris";

export interface ProjectData {
    slug: string;
    meshColors: [string, string, string];
    color: string;
    label: string;
    year: string;
    name: string;
    description: string;
    longDescription: string;
    tech: string[];
    featured: boolean;
    github: string;
    features: string[];
    coverImage: string;
    screenshots: string[];
    isFreelance?: boolean;
    objectPosition?: string;
}

export const projects: ProjectData[] = [
    {
        slug: "murshid",
        coverImage: "/images/projects/murshid.png",
        screenshots: [
            "/images/projects/screenshots/murshid.png",
        ],
        meshColors: ["rgba(37,99,235,0.8)", "rgba(11,30,60,0.6)", "rgba(59,130,246,0.4)"],
        color: "#2563EB", label: "Education & Scheduling", year: "2026", name: "Murshid (مُرشد)",
        isFreelance: true,
        objectPosition: "top",
        description: "University scheduling & guidance app with bilingual AR/EN support, real-time professor alerts, Supabase backend, and MVVM architecture using Flutter & GetX.",
        longDescription: "Murshid (مُرشد) is a comprehensive university scheduling and guidance application built with Flutter, designed to streamline academic life for both students and professors. The app features a robust bilingual (Arabic/English) interface with full RTL support, real-time push notifications scoped to enrolled courses via Supabase Realtime, and a clean MVVM architecture with GetX for state management. Students can view their weekly schedules, receive course-specific alerts from professors, and manage their enrolled courses. Professors can broadcast targeted notifications to their students and manage lecture schedules. The app uses Hive for local caching and SharedPreferences for persistent language settings.",
        tech: ["Flutter", "GetX", "Supabase", "Hive", "MVVM", "Localization"],
        featured: true, github: GITHUB,
        features: [
            "Full Arabic/English bilingual interface with dynamic RTL/LTR switching",
            "Real-time course-specific notifications from professors to enrolled students only",
            "Student & Professor role-based authentication with Supabase Auth",
            "Weekly schedule view with day-based tabs and room/time details",
            "MVVM feature-based architecture with GetX state management",
        ],
    },
    {
        slug: "scorepulse",
        coverImage: "/images/projects/scorepulse.png",
        screenshots: [
            "/images/projects/screenshots/scorepulse.png",
        ],
        meshColors: ["rgba(0,168,255,0.8)", "rgba(30,58,95,0.6)", "rgba(0,168,255,0.4)"],
        color: "#00A8FF", label: "Sports & Live Scores", year: "2026", name: "ScorePulse",
        description: "Real-time football scores app with dual-API architecture (365Scores + API-Football). Features live scores, match details, and standings with smooth UI.",
        longDescription: "ScorePulse is a real-time football scores application built with Flutter, featuring a sophisticated dual-API architecture that combines 365Scores and API-Football for comprehensive coverage. The app delivers live scores, detailed match information, league standings, and team statistics with a buttery-smooth UI. Built following Clean Architecture principles with GetX for state management and Dio for efficient network requests, ScorePulse provides football fans with an immersive, real-time experience.",
        tech: ["Flutter", "REST API", "Cubit", "Dio", "Clean Architecture"],
        featured: true, github: GITHUB,
        features: [
            "Real-time live scores with auto-refresh and push notifications",
            "Dual-API architecture (365Scores + API-Football) for comprehensive data coverage",
            "Detailed match view with lineups, statistics, and events timeline",
            "League standings with full season statistics and team rankings",
            "Smooth animations and transitions for premium user experience",
        ],
    },
    {
        slug: "food-delivery",
        coverImage: "/images/projects/food-delivery.png",
        screenshots: [
            "/images/projects/screenshots/food-delivery.png",
        ],
        meshColors: ["rgba(255,107,53,0.8)", "rgba(74,30,0,0.6)", "rgba(255,107,53,0.4)"],
        color: "#FF6B35", label: "Food & Delivery", year: "2025", name: "Food Delivery App",
        description: "Flutter food delivery app with Firebase Auth (Email, Google, Facebook), Google Maps live tracking, and online payment gateway. Built with MVVM & Dio.",
        longDescription: "A comprehensive food delivery application built with Flutter that provides a seamless ordering experience from browsing restaurants to live delivery tracking. The app features multi-provider Firebase Authentication (Email, Google, Facebook), real-time GPS tracking via Google Maps, and a secure online payment gateway. Following the MVVM architectural pattern with Dio for API communication, the app ensures clean code separation and maintainability.",
        tech: ["Flutter", "Firebase", "Google Maps", "Dio", "Cubit", "MVVM"],
        featured: false, github: GITHUB,
        features: [
            "Multi-provider authentication with Email, Google, and Facebook sign-in",
            "Real-time delivery tracking with Google Maps integration",
            "Secure online payment gateway with multiple payment methods",
            "Restaurant browsing with categories, search, and filtering",
            "Order history and real-time order status updates",
        ],
    },
    {
        slug: "shoply",
        coverImage: "/images/projects/shoply.png",
        screenshots: [
            "/images/projects/screenshots/shoply.png",
        ],
        meshColors: ["rgba(255,140,0,0.8)", "rgba(61,34,0,0.6)", "rgba(255,140,0,0.4)"],
        color: "#FF8C00", label: "E-Commerce", year: "2025", name: "Shoply",
        description: "Full-featured e-commerce app with REST API, BLoC/Cubit state management, and Clean Architecture for high maintainability and scalability.",
        longDescription: "Shoply is a full-featured e-commerce application built with Flutter, implementing a professional-grade architecture that prioritizes maintainability and scalability. The app utilizes BLoC and Cubit patterns for predictable state management, communicates with a REST API backend, and follows Clean Architecture principles with clearly separated data, domain, and presentation layers. The result is a polished shopping experience with smooth performance.",
        tech: ["Flutter", "REST API", "BLoC", "Cubit", "Clean Architecture"],
        featured: false, github: GITHUB,
        features: [
            "Product catalog with categories, search, and advanced filtering",
            "Shopping cart with quantity management and price calculation",
            "User authentication and profile management",
            "Order placement and tracking with status updates",
            "Clean Architecture with BLoC/Cubit state management",
        ],
    },
    {
        slug: "evently",
        coverImage: "/images/projects/evently.png",
        screenshots: [
            "/images/projects/screenshots/evently.png",
        ],
        meshColors: ["rgba(74,123,247,0.8)", "rgba(26,43,95,0.6)", "rgba(74,123,247,0.4)"],
        color: "#4A7BF7", label: "Productivity", year: "2025", name: "Evently Planning",
        description: "Event/task scheduler with Firebase, Arabic/English localization, light/dark modes, calendar view, and task completion tracking.",
        longDescription: "Evently Planning is a productivity-focused event and task scheduling application built with Flutter and Firebase. The app offers a rich calendar view for managing events, supports full Arabic/English localization for a bilingual user experience, and includes both light and dark theme modes. With Firebase as the backend, users can sync their events across devices, track task completion, and receive timely reminders.",
        tech: ["Flutter", "Firebase", "Provider", "Localization"],
        featured: false, github: GITHUB,
        features: [
            "Interactive calendar view with day, week, and month layouts",
            "Full Arabic/English localization with RTL support",
            "Light and dark theme modes with smooth transitions",
            "Firebase cloud sync for cross-device event management",
            "Task completion tracking with progress indicators",
        ],
    },
    {
        slug: "news",
        coverImage: "/images/projects/news.png",
        screenshots: [
            "/images/projects/screenshots/news.png",
        ],
        meshColors: ["rgba(124,58,237,0.8)", "rgba(30,20,60,0.6)", "rgba(167,139,250,0.4)"],
        color: "#A78BFA", label: "News", year: "2025", name: "News App",
        description: "Global news app built with Flutter & Dart, using HTTP package to fetch news via API and open articles directly in a web browser.",
        longDescription: "A clean and efficient global news application built with Flutter and Dart that aggregates news from multiple sources via REST API. The app uses the HTTP package for network communication and allows users to browse headlines by category, read article summaries, and open full articles directly in their web browser. The minimalist design focuses on readability and quick access to the latest news.",
        tech: ["Flutter", "Dart", "HTTP", "REST API"],
        featured: false, github: "https://github.com/Marco-Mina-Moris/News.git",
        features: [
            "News aggregation from multiple global sources via REST API",
            "Category-based browsing for personalized news feeds",
            "In-app article preview with web browser integration",
            "Clean, distraction-free reading experience",
            "Pull-to-refresh for latest headlines",
        ],
    },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
    return projects.find(p => p.slug === slug);
}

export function getOtherProjects(slug: string): ProjectData[] {
    return projects.filter(p => p.slug !== slug);
}
