// src/data/services.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  content: string;
  image: string;

  approach?: Array<{
    title: string;
    description: string;
  }>;

  features?: Array<{
    title: string;
    description: string;
  }>;

  benefits: string[];

  technologies?: string[];

  faq?: Array<{
    question: string;
    answer: string;
  }>;

  relatedProjects?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const servicesDetails: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom websites, web applications, and e-commerce platforms.",
    longDescription: "Modern, fast, and scalable web solutions tailored to your business needs.",
    content: "We build high-performance websites and web applications using the latest technologies. From sleek corporate sites to complex SaaS platforms and full-featured e-commerce stores, our web development services deliver exceptional user experiences and measurable business results.",

    image: "/assets/services/web.jpg",

    approach: [
      { title: "Discovery & Planning", description: "We start by understanding your goals, target audience, and technical requirements to create a comprehensive project roadmap." },
      { title: "Design & Prototyping", description: "Our designers create beautiful, user-friendly interfaces with interactive prototypes for your approval." },
      { title: "Development & Testing", description: "Clean, secure, and optimized code is developed with rigorous testing across all devices and browsers." },
      { title: "Launch & Support", description: "We deploy your solution and provide ongoing maintenance, updates, and performance monitoring." }
    ],

    features: [
      { title: "Responsive Design", description: "Fully optimized for desktops, tablets, and mobile devices." },
      { title: "Performance Optimized", description: "Lightning-fast loading speeds and excellent Core Web Vitals scores." },
      { title: "SEO Friendly", description: "Built with search engine optimization best practices from day one." },
      { title: "Scalable Architecture", description: "Designed to grow seamlessly as your business expands." }
    ],

    benefits: [
      "Increased online visibility and brand credibility",
      "Higher conversion rates and user engagement",
      "Reduced maintenance costs with modern tech stack",
      "Easy content management and future updates",
      "Secure and reliable platform you can trust"
    ],

    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Laravel", "PostgreSQL", "AWS"],

    faq: [
      { question: "How long does it take to build a website?", answer: "Timeline varies based on complexity. A standard business website usually takes 6–10 weeks, while complex web applications can take 3–6 months." },
      { question: "Do you provide ongoing maintenance?", answer: "Yes. We offer flexible maintenance packages that include security updates, performance monitoring, backups, and content updates." }
    ],

    relatedProjects: [
      { id: "project-1", title: "KampalaMart E-commerce", description: "Full-featured online marketplace for local businesses" },
      { id: "project-2", title: "Ndoto Banking Portal", description: "Secure online banking dashboard for a fintech client" }
    ]
  },

  {
    id: "app-development",
    title: "App Development",
    description: "Native and cross-platform mobile applications.",
    longDescription: "Powerful mobile apps that deliver exceptional user experiences on iOS and Android.",
    content: "From idea to App Store, we create beautiful and functional mobile applications that solve real business problems and engage your customers.",

    image: "/assets/services/app.png",

    approach: [
      { title: "Strategy & Research", description: "Market analysis and user research to define the perfect feature set." },
      { title: "UI/UX Design", description: "Pixel-perfect designs focused on usability and delight." },
      { title: "Development", description: "Clean, maintainable code using React Native or native technologies." },
      { title: "Testing & Launch", description: "Comprehensive testing followed by smooth deployment." }
    ],

    features: [
      { title: "Cross-Platform", description: "One codebase for both iOS and Android" },
      { title: "Offline Support", description: "Works seamlessly even without internet" },
      { title: "Push Notifications", description: "Keep users engaged with timely updates" },
      { title: "Secure Authentication", description: "Advanced security for user data" }
    ],

    benefits: [
      "Reach more customers on mobile",
      "Improve customer loyalty and retention",
      "Streamline internal operations",
      "Generate new revenue streams"
    ],

    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js"],

    faq: [
      { question: "Do you build native or cross-platform apps?", answer: "We recommend React Native or Flutter for most projects as they offer excellent performance while significantly reducing development time and cost." }
    ],

    relatedProjects: [
      { id: "project-3", title: "AgriLink Farmer App", description: "Mobile platform connecting farmers directly to buyers" }
    ]
  },

  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design solutions.",
    longDescription: "Beautiful interfaces that users love to use.",
    content: "We craft intuitive and visually stunning digital experiences that drive engagement and conversion through thoughtful research and pixel-perfect design.",

    image: "/assets/services/uiux.jpg",

    approach: [
      { title: "User Research", description: "Understanding user needs, behaviors, and pain points through interviews and testing." },
      { title: "Wireframing", description: "Creating low-fidelity layouts and user flows." },
      { title: "High-Fidelity Design", description: "Polished visual designs with attention to every detail." },
      { title: "Usability Testing", description: "Validating designs with real users before development." }
    ],

    features: [
      { title: "User Research", description: "In-depth interviews and usability testing" },
      { title: "Interactive Prototypes", description: "Clickable Figma prototypes for early feedback" },
      { title: "Design Systems", description: "Scalable and consistent component libraries" }
    ],

    benefits: [
      "Higher user satisfaction and retention",
      "Increased conversion rates",
      "Reduced development rework",
      "Stronger brand perception"
    ],

    technologies: ["Figma", "Adobe XD", "Framer", "Principle"],
  },

  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Strategic technology consulting services.",
    longDescription: "Expert guidance to align technology with your business goals.",
    content: "Our experienced consultants help organizations make smart technology decisions, optimize processes, and successfully implement digital transformation strategies across Uganda and East Africa.",

    image: "/assets/services/consulting.jpg",

    approach: [
      { title: "Assessment", description: "Thorough evaluation of current systems, infrastructure, and challenges." },
      { title: "Strategy Development", description: "Creating a clear, actionable technology roadmap aligned with business objectives." },
      { title: "Implementation Support", description: "Hands-on guidance during execution and change management." },
      { title: "Training & Handover", description: "Knowledge transfer and team empowerment for long-term success." }
    ],

    benefits: [
      "Informed and future-proof technology decisions",
      "Reduced operational costs and risks",
      "Improved efficiency and productivity",
      "Successful digital transformation",
      "Access to senior-level expertise without full-time cost"
    ],

    technologies: ["Enterprise Architecture", "Cloud Strategy", "Cybersecurity", "Digital Transformation", "IT Governance"],

    faq: [
      { question: "How do you charge for consulting?", answer: "We offer flexible models including project-based, retainer, and hourly consulting depending on your needs." }
    ],

    relatedProjects: []
  },

  {
    id: "database-management",
    title: "Database Management",
    description: "Comprehensive database solutions.",
    longDescription: "Reliable, secure, and high-performance database architecture and management.",
    content: "We design, implement, and manage robust database systems that ensure data integrity, security, and optimal performance for your applications and business intelligence needs.",

    image: "/assets/services/database.jpg",

    approach: [
      { title: "Requirements Analysis", description: "Understanding data structure, volume, and access patterns." },
      { title: "Database Design", description: "Creating normalized, scalable, and efficient schemas." },
      { title: "Implementation & Migration", description: "Secure data migration and system setup." },
      { title: "Optimization & Monitoring", description: "Continuous performance tuning and proactive monitoring." }
    ],

    features: [
      { title: "High Availability", description: "99.9% uptime with replication and failover" },
      { title: "Data Security", description: "Encryption, access control, and compliance" },
      { title: "Performance Tuning", description: "Query optimization and indexing strategies" },
      { title: "Cloud & On-Premise", description: "Flexible deployment options" }
    ],

    benefits: [
      "Faster data access and reporting",
      "Enhanced data security and compliance",
      "Reduced downtime and data loss risk",
      "Scalable infrastructure as your data grows"
    ],

    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS RDS", "Firebase", "SQL Server"],

    faq: [
      { question: "Can you migrate our existing database?", answer: "Yes, we have extensive experience migrating databases from legacy systems to modern, cloud-based solutions with zero or minimal downtime." }
    ]
  },

  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Turn raw data into valuable insights.",
    longDescription: "Transform your data into actionable business intelligence.",
    content: "We help businesses unlock the true value of their data through powerful analytics, dashboards, and predictive insights that drive smarter decision-making and competitive advantage.",

    image: "/assets/services/analytics.jpg",

    approach: [
      { title: "Data Assessment", description: "Evaluating available data sources and quality." },
      { title: "Analytics Strategy", description: "Defining key metrics and business questions to answer." },
      { title: "Visualization & Dashboards", description: "Creating intuitive and interactive reports." },
      { title: "Insights & Recommendations", description: "Delivering clear, actionable insights with strategic advice." }
    ],

    features: [
      { title: "Interactive Dashboards", description: "Real-time business intelligence dashboards" },
      { title: "Predictive Analytics", description: "Forecasting and trend analysis" },
      { title: "Data Warehousing", description: "Centralized and optimized data storage" },
      { title: "Automated Reporting", description: "Scheduled and on-demand reports" }
    ],

    benefits: [
      "Data-driven decision making",
      "Identification of new business opportunities",
      "Improved operational efficiency",
      "Better customer understanding and targeting",
      "Competitive advantage through insights"
    ],

    technologies: ["Power BI", "Tableau", "Python", "R", "Google Analytics", "Looker", "BigQuery", "Excel Advanced"],

    faq: [
      { question: "Do I need technical skills to use the dashboards?", answer: "No. We design user-friendly dashboards that are intuitive for non-technical stakeholders." }
    ],

    relatedProjects: [
      { id: "project-4", title: "Sales Performance Dashboard", description: "Real-time analytics platform for a leading Ugandan distributor" }
    ]
  }
];

// Lightweight version for Services listing page
export const servicesList = servicesDetails.map((service) => ({
  id: service.id,
  title: service.title,
  description: service.description,
  image: service.image,
  link: `/services/${service.id}`,
}));