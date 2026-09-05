export const GITHUB = "https://github.com/Marco-Mina-Moris";

export interface ProjectItem {
    slug: string;
    name: string;
    color: string;
    year: string;
    description: string;
    tech: string[];
    coverImage: string;
    isFreelance?: boolean;
    tag?: string;
    link?: string;
    github?: string;
    objectPosition?: string;
    featured?: boolean;
}

export interface ProjectData extends ProjectItem {
    meshColors: [string, string, string];
    label: string;
    longDescription: string;
    github: string;
    features: string[];
    screenshots: string[];
    featured: boolean;
    isPrivate?: boolean;
}

export const projects: ProjectData[] = [
    {
        slug: "do-cafe",
        name: "Do. Cafe (DOgo)",
        coverImage: "/images/projects/dogo-banner.png",
        screenshots: ["/images/projects/dogo-banner.png"],
        meshColors: ["rgba(245,158,11,0.8)", "rgba(56,32,8,0.6)", "rgba(245,158,11,0.4)"],
        color: "#F59E0B",
        label: "Food & Beverage · Cafe Ordering",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Do-Cafe",
        objectPosition: "top",
        description: 'Cafe ordering app for "Do. Cafe - Coffee & More" with Takeaway, Dine-in, and Delivery flows, real Laravel/Sanctum backend, wishlist, saved addresses, and Paymob in-app payment.',
        longDescription: 'Do. Cafe (DOgo) is a flagship mobile ordering application built for "Do. Cafe - Coffee & More", providing a complete digital cafe experience with dedicated Takeaway, Dine-in, and Delivery flows. Engineered with Flutter and Riverpod following Clean Architecture, the app interfaces with a custom Laravel backend secured via Laravel Sanctum. Customers can customize drink sizes, roast types, and add-ons in real time, save favorite items to their wishlist, manage multiple delivery addresses with GPS location selection, and pay seamlessly via integrated Paymob payment gateway (credit card and mobile wallets). The app features instant order tracking with live status updates, digital receipt generation, and promotional voucher redemption.',
        tech: ["Flutter", "Riverpod", "Laravel API", "Paymob", "Clean Architecture"],
        features: [
            "Multi-fulfillment ordering: Takeaway, Dine-in table ordering, and doorstep Delivery flows",
            "Custom product builder for size variations, milk choices, sweetness levels, and add-ons",
            "Full payment processing via Paymob gateway supporting cards and local mobile wallets",
            "Clean Architecture with Riverpod state management, repository pattern, and immutable models",
            "Address book management with interactive map picker, wishlist, and real-time order history tracking",
        ],
    },
    {
        slug: "acta-chemical",
        name: "Acta Chemical",
        coverImage: "/images/projects/acta-chemical-banner.png",
        screenshots: ["/images/projects/acta-chemical-banner.png"],
        meshColors: ["rgba(0,180,171,0.8)", "rgba(11,46,43,0.6)", "rgba(0,180,171,0.4)"],
        color: "#00B4AB",
        label: "B2B / B2C E-Commerce · Chemicals",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Acta-Chemical",
        objectPosition: "top",
        description: "E-commerce app for a chemicals company with 4 product sections (cosmetics, detergents, raw materials, specialty serums), real Laravel/Sanctum backend, multiple payment methods, downloadable product booklets.",
        longDescription: "Acta Chemical is an enterprise-grade mobile e-commerce application developed for a chemical manufacturing and distribution company. The platform organizes hundreds of chemical formulations into four distinct product divisions: cosmetics, industrial & home detergents, raw chemical materials, and specialty active serums. Built using Flutter and structured with Clean Architecture, the app connects to a RESTful Laravel API with Sanctum token authentication. Users and businesses can explore chemical specs, download official technical data sheets and product booklets (PDFs) with in-app preview, select bulk packaging options, and complete checkout through multiple payment gateways. Advanced multi-criteria search and category filtering allow clients to locate specialized chemical compounds rapidly.",
        tech: ["Flutter", "Laravel API", "E-commerce", "Clean Architecture"],
        features: [
            "Structured catalog across 4 specialized product divisions with technical specs and safety sheets",
            "Built-in PDF viewer and downloader for official product booklets and certificate of analysis files",
            "Multiple payment methods and flexible checkout workflows accommodating wholesale and retail orders",
            "Clean Architecture separation: data sources, repositories, use cases, and reactive presentation layer",
            "Real-time catalog synchronization with Laravel backend, automated cart recalculations, and order dispatch alerts",
        ],
    },
    {
        slug: "bright-star",
        name: "Bright Star",
        coverImage: "/images/projects/brightstar-banner.png",
        screenshots: ["/images/projects/brightstar-banner.png"],
        meshColors: ["rgba(14,165,233,0.8)", "rgba(8,47,73,0.6)", "rgba(14,165,233,0.4)"],
        color: "#0EA5E9",
        label: "Medical Supplies & Equipment",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Bright-Star",
        objectPosition: "top",
        description: "Medical equipment & supplies e-commerce app replicating client branding, Riverpod state management, repository-pattern architecture, WhatsApp-based ordering.",
        longDescription: "Bright Star is a modern medical supplies and clinical equipment e-commerce application designed to streamline procurement for clinics, hospitals, and healthcare professionals. Faithfully reflecting the client's corporate visual identity, the app features an intuitive medical catalog with high-resolution imagery, technical parameters, and inventory availability indicators. Built using Flutter and Riverpod with the repository pattern, the application provides instantaneous UI responsiveness and reliable offline caching. To align with localized medical sales workflows in Egypt and the MENA region, the app integrates direct WhatsApp-based automated quotation and ordering, generating pre-filled, itemized purchase orders sent directly to sales representatives for rapid fulfillment.",
        tech: ["Flutter", "Riverpod", "Repository Pattern", "WhatsApp"],
        features: [
            "Comprehensive medical equipment catalog with categories, search, and detailed technical specifications",
            "Automated WhatsApp ordering system creating formatted itemized orders with direct rep dispatch",
            "Scalable Riverpod state management implementing repository pattern for robust data flow",
            "Client branding replication with medical-grade UI, micro-animations, and responsive layouts",
            "Local persistence for cart items, search history, and recently viewed medical equipment",
        ],
    },
    {
        slug: "daniella",
        name: "Daniella",
        coverImage: "/images/projects/daniella-banner.png",
        screenshots: ["/images/projects/daniella-banner.png"],
        meshColors: ["rgba(251,113,133,0.8)", "rgba(63,14,30,0.6)", "rgba(251,113,133,0.4)"],
        color: "#FB7185",
        label: "Luxury Fashion · E-Commerce",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Daniella",
        objectPosition: "top",
        description: "Luxury swimwear/beach fashion e-commerce app, bilingual AR/EN, native-app-feel UI with polished navigation and motion.",
        longDescription: "Daniella is an elegant, high-fashion mobile shopping application crafted for a luxury swimwear and resort beachwear brand. Designed to deliver an editorial, magazine-like experience, the app emphasizes fluid motion, hero visual storytelling, and bespoke transitions that rival top native fashion apps. It provides full bilingual support in Arabic and English with seamless, real-time RTL/LTR layout mirroring and custom typography. Shoppers can explore curated seasonal lookbooks, filter by fabric, size, and silhouette, view high-definition product galleries with pinch-to-zoom, and save items to customized moodboards. Built with Flutter, Daniella demonstrates top-tier craftsmanship in UI Polish, micro-interactions, and visual elegance.",
        tech: ["Flutter", "E-commerce", "Bilingual", "UI Polish"],
        features: [
            "Full Arabic and English bilingual interface with bidirectional layout adaptation (RTL/LTR)",
            "Editorial fashion UI with curated lookbooks, high-res galleries, and immersive animations",
            "Dynamic size and color variation selector with real-time stock feedback and size charts",
            "Wishlist and personalized look saving with instant shareable deep links",
            "Silky-smooth navigation flow with custom page route transitions and interactive micro-interactions",
        ],
    },
    {
        slug: "tarwiqa",
        name: "ترويقة (Tarwiqa)",
        coverImage: "/images/projects/tarwiqa-banner.png",
        screenshots: ["/images/projects/tarwiqa-banner.png"],
        meshColors: ["rgba(16,185,129,0.8)", "rgba(6,78,59,0.6)", "rgba(16,185,129,0.4)"],
        color: "#10B981",
        label: "On-Demand Services · Booking",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Tarwiqa",
        objectPosition: "top",
        description: "Home cleaning service booking app for Alexandria (Arabic RTL), built from 20+ UI mockups, real Laravel API for auth/catalog/orders.",
        longDescription: "ترويقة (Tarwiqa) is an on-demand residential and commercial cleaning service booking application tailor-made for the Alexandria market. Built with an Arabic-first mindset and native RTL layout fidelity, the app was translated into pixel-perfect Flutter code from over 20 detailed UI/UX mockups. Connected to a production Laravel REST API, Tarwiqa handles complete customer authentication, dynamic service catalog browsing (hourly cleaning, deep cleaning, post-renovation, and recurring subscriptions), interactive date/time slot reservation, and customized service requirements (room count, cleaning supplies, specialized equipment). Customers receive live order tracking with status updates from booking confirmation to cleaner arrival and job completion.",
        tech: ["Flutter", "Laravel API", "RTL", "Booking"],
        features: [
            "Native Arabic RTL interface engineered with pixel-perfect accuracy from 20+ design mockups",
            "Comprehensive booking engine supporting hourly, deep cleaning, and recurring maintenance visits",
            "Real Laravel REST API integration for user auth, service catalogs, address geocoding, and order lifecycle",
            "Interactive date & time slot booking calendar with automated availability validation",
            "Live service order tracking with milestone progress and customer service direct chat",
        ],
    },
    {
        slug: "easy-math",
        name: "Easy Math for Kids",
        coverImage: "/images/projects/easymath-banner.png",
        screenshots: ["/images/projects/easymath-banner.png"],
        meshColors: ["rgba(168,85,247,0.8)", "rgba(46,16,101,0.6)", "rgba(168,85,247,0.4)"],
        color: "#A855F7",
        label: "EdTech · Mental Math & Soroban",
        year: "2026",
        tag: "Marketopia",
        isPrivate: true,
        featured: false,
        github: "https://github.com/Marco-Mina-Moris/Easy-Math",
        objectPosition: "top",
        description: "Kids' mental math/abacus learning app with interactive Soroban widget, Flash Anzan drills, gamification, parent analytics dashboard, bilingual AR/EN.",
        longDescription: "Easy Math for Kids is an interactive mental arithmetic and Japanese Soroban abacus learning platform designed to make math intuitive and thrilling for young learners. Featuring a custom-built, physics-responsive virtual Soroban abacus widget, children learn calculation techniques through tactile bead manipulation, audio-visual feedback, and step-by-step interactive tutorials. The application includes Flash Anzan speed training modules that flash numbers at customizable intervals to build mental visualization prowess. Built with Flutter, Riverpod, and Hive for high-speed local data persistence, the platform incorporates a gamification system with experience points, reward badges, unlockable avatars, and streak tracking. Parents and educators have access to a dedicated analytics dashboard visualizing accuracy trends, calculation speed, and mastery milestones.",
        tech: ["Flutter", "Riverpod", "Hive", "Gamification", "Bilingual"],
        features: [
            "Custom interactive virtual Soroban abacus widget with realistic touch and haptic feedback",
            "Flash Anzan mental math training drills with customizable digit counts and speed intervals",
            "Comprehensive gamification system with XP progression, milestone badges, and streak mechanics",
            "Parent & educator analytics dashboard tracking accuracy curves, speed metrics, and problem areas",
            "Bilingual AR/EN support with voiced prompts, child-friendly audio cues, and offline progress sync with Hive",
        ],
    },
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

export const clientProjects: ProjectData[] = projects.filter(p => p.tag === "Marketopia");

