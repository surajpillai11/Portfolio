export interface Project {
  id: string;
  title: string;
  date: string;
  badge: string;
  tagline: string;
  description: string;
  bullets: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  hasArchitectureDiagram?: boolean;
  architectureSteps?: {
    step: number;
    title: string;
    description: string;
    tech: string;
  }[];
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  description: string;
  credentialUrl?: string;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export const portfolioData = {
  personal: {
    name: "Suraj Pillai",
    title: "Software Engineer & Student",
    roleCategories: [
      "Full-Stack Developer",
      "Spring Boot Engineer",
      "Backend Developer",
      "Java Developer",
    ],
    tagline: "Building clean web apps, Spring Boot services, and practical AI tools.",
    shortIntro:
      "I'm a 3rd-year Computer Science student from Pune who enjoys writing backend APIs and full-stack projects. I work mainly with Java, Spring Boot, React, and Node.js, and I'm currently looking for an SDE role.",
    location: "Pune, Maharashtra, India",
    email: "pillai.suraj004@gmail.com",
    phone: "9834992377",
    githubUrl: "https://github.com/surajpillai11",
    linkedinUrl: "https://www.linkedin.com/in/suraj-pillai-placeholder",
    resumeUrl: "/resume.pdf",
    availability: "Available for SDE Roles",
  },

  stats: [
    {
      value: "8.2",
      suffix: " / 10",
      numericTarget: 8.2,
      isDecimal: true,
      label: "Current CGPA",
      sublabel: "B.E. Computer Science, Pune",
    },
    {
      value: "3+",
      suffix: "+",
      numericTarget: 3,
      isDecimal: false,
      label: "Main Projects",
      sublabel: "Spring Boot, Node & React",
    },
    {
      value: "3",
      suffix: "",
      numericTarget: 3,
      isDecimal: false,
      label: "Certifications",
      sublabel: "Java, DSA & Full-Stack",
    },
    {
      value: "2024",
      suffix: "",
      numericTarget: 2024,
      isDecimal: false,
      label: "SIH Participant",
      sublabel: "Smart India Hackathon (Internal)",
    },
  ],

  education: {
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science and Engineering",
    institution: "Pune University Affiliated College",
    location: "Pune, Maharashtra, India",
    period: "Aug 2023 - Jun 2027",
    cgpa: "8.2 / 10",
    highlights: [
      "Core courses in Data Structures & Algorithms, Object-Oriented Programming, and Database Systems.",
      "Building practical full-stack projects using Java, Spring Boot, and Node.js alongside academics.",
      "Participated in the internal round of Smart India Hackathon (SIH) 2024.",
    ],
  } as Education,

  skillsCategories: [
    {
      category: "Languages",
      iconName: "Code2",
      description: "Programming languages I use for coding and building software.",
      skills: ["Java", "JavaScript", "C++", "Python", "SQL"],
    },
    {
      category: "Backend",
      iconName: "Server",
      description: "Frameworks and libraries for building REST APIs and server logic.",
      skills: ["Spring Boot", "Spring Security", "Node.js", "Express.js", "REST APIs", "JWT Auth"],
    },
    {
      category: "Frontend",
      iconName: "Layout",
      description: "Tools I use to create responsive and interactive user interfaces.",
      skills: ["React", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "EJS"],
    },
    {
      category: "Databases",
      iconName: "Database",
      description: "Databases I use for storing, querying, and indexing data.",
      skills: ["MySQL", "MongoDB", "Mongoose", "ChromaDB"],
    },
    {
      category: "Tools & DevOps",
      iconName: "Wrench",
      description: "Development tools and platforms I use daily in my workflow.",
      skills: ["Docker", "Git", "GitHub", "Postman", "IntelliJ IDEA", "Eclipse", "Vercel", "Render"],
    },
    {
      category: "Core Concepts",
      iconName: "Layers",
      description: "Engineering concepts I rely on when designing applications.",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Role-Based Access Control (RBAC)",
        "RAG Architecture",
        "CRUD Design",
      ],
    },
  ] as SkillCategory[],

  marqueeSkills: [
    { name: "Java", category: "Language" },
    { name: "Spring Boot", category: "Backend" },
    { name: "React", category: "Frontend" },
    { name: "Docker", category: "Tools" },
    { name: "MySQL", category: "Database" },
    { name: "ChromaDB", category: "Vector DB" },
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "Spring Security", category: "Backend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "JWT Auth", category: "Security" },
    { name: "REST APIs", category: "Backend" },
    { name: "Git", category: "Tools" },
    { name: "IntelliJ IDEA", category: "Tools" },
  ],

  projects: [
    {
      id: "ai-report-analyzer",
      title: "AI Report Analyzer",
      date: "Jul 2026",
      badge: "RAG Document Q&A",
      tagline: "Upload PDFs or documents and ask questions with cited answers",
      description:
        "A document search and Q&A system built with Spring Boot, React, ChromaDB, and the Gemini API. Users upload PDF or text files, the app extracts text using Apache Tika, embeds chunks with Gemini, and uses ChromaDB for semantic search. When answering, it references the source excerpts so you can verify the information. Includes JWT auth with per-user document isolation and runs in Docker.",
      bullets: [
        "Extracted text from uploaded PDFs and documents into clean chunks using Apache Tika.",
        "Created embeddings with Gemini and saved them into ChromaDB for fast similarity lookup.",
        "Added JWT authentication so each user can only access and query their own files.",
        "Packaged the Spring Boot backend and dependencies into Docker containers for easy deployment.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "React",
        "MySQL",
        "ChromaDB",
        "Gemini API",
        "Apache Tika",
        "Docker",
        "JWT",
      ],
      liveUrl: "https://ai-report-analyzer-demo.vercel.app",
      githubUrl: "https://github.com/surajpillai11/ai-report-analyzer",
      featured: true,
      hasArchitectureDiagram: true,
      architectureSteps: [
        {
          step: 1,
          title: "File Upload & Text Extraction",
          description: "User uploads a PDF or DOCX file. Apache Tika extracts the text and splits it into smaller chunks.",
          tech: "Apache Tika / Spring Boot",
        },
        {
          step: 2,
          title: "Creating Embeddings",
          description: "Text chunks are converted into vector embeddings using the Gemini Embedding API.",
          tech: "Gemini Text Embeddings",
        },
        {
          step: 3,
          title: "Searching ChromaDB",
          description: "When a user asks a question, ChromaDB compares the query against stored vectors to find the most relevant chunks.",
          tech: "ChromaDB / Cosine Similarity",
        },
        {
          step: 4,
          title: "Grounded Answer Generation",
          description: "Gemini generates an answer strictly using the retrieved excerpts and cites the relevant sections.",
          tech: "Gemini 1.5 Pro / Prompt Rules",
        },
      ],
      metrics: [
        { label: "Search Speed", value: "< 140ms" },
        { label: "Extraction", value: "High Precision" },
        { label: "Data Security", value: "Per-User Isolation" },
      ],
    },
    {
      id: "ai-discipline-tracker",
      title: "AI Discipline Tracking System",
      date: "Feb 2026",
      badge: "Habit Tracker",
      tagline: "Track daily habits with streak analytics, heatmaps, and AI coaching",
      description:
        "A full-stack habit tracking web application built with React, Node.js, Express, and MongoDB. Helps users stay consistent with streak counters, a 365-day activity heatmap similar to GitHub, and automated email reminders using node-cron. Also uses the Gemini API to analyze weekly completion habits and suggest practical improvements.",
      bullets: [
        "Built REST APIs for habit creation, streak tracking, and user auth using Node.js & MongoDB.",
        "Implemented an interactive GitHub-style contribution heatmap to visualize daily activity.",
        "Set up automated email reminders via node-cron so users remember to log their daily habits.",
        "Integrated the Gemini API to give personalized tips based on user completion trends.",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini API",
        "PWA",
        "Node-Cron",
        "JWT",
      ],
      liveUrl: "https://ai-discipline-tracking-system.vercel.app/login",
      githubUrl: "https://github.com/surajpillai11/ai-discipline-tracker",
      featured: true,
      metrics: [
        { label: "Streak Tracker", value: "Realtime" },
        { label: "Activity View", value: "365 Days" },
        { label: "Reminders", value: "Automated Cron" },
      ],
    },
    {
      id: "attendance-management-system",
      title: "Attendance Management System",
      date: "Jun 2025",
      badge: "College Management",
      tagline: "Attendance portal with distinct teacher and student workflows",
      description:
        "A web portal built to replace manual paper attendance registers in colleges. Faculty can take and update daily attendance quickly, while students can log in to view their monthly attendance percentage and check if they meet exam criteria.",
      bullets: [
        "Created role-based accounts with JWT auth so teachers can mark attendance and students can view it.",
        "Automated monthly percentage calculations with clear alerts for attendance below requirements.",
        "Built dashboards to view attendance history by subject and date.",
        "Added CSV export so faculty can easily download attendance summaries.",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "HTML5 / CSS3",
        "JavaScript",
        "JWT",
      ],
      liveUrl: "https://attendance-management-systems.onrender.com/",
      githubUrl: "https://github.com/surajpillai11/attendance-management-system",
      featured: true,
      metrics: [
        { label: "User Roles", value: "Teacher & Student" },
        { label: "Export Option", value: "CSV Reports" },
        { label: "Auth Method", value: "JWT Tokens" },
      ],
    },
  ] as Project[],

  certifications: [
    {
      id: "cert-hackerrank-java",
      title: "HackerRank Java (Basic) Certificate",
      issuer: "HackerRank",
      date: "2024",
      badge: "Verified Skill",
      description:
        "Certified in fundamental Java concepts including OOP principles, exception handling, data types, and collections.",
      credentialUrl: "https://www.hackerrank.com/certificates/placeholder-java",
    },
    {
      id: "cert-dsa-java",
      title: "Data Structures & Algorithms in Java",
      issuer: "Coding Ninjas",
      date: "2024",
      badge: "Course Completed",
      description:
        "Practiced problem solving with arrays, linked lists, stacks, queues, trees, recursion, graphs, and dynamic programming.",
      credentialUrl: "https://certificates.placeholder.com/dsa-java",
    },
    {
      id: "cert-fullstack",
      title: "Full Stack Web Development",
      issuer: "Online Certification",
      date: "2024",
      badge: "Course Completed",
      description:
        "Built full-stack applications with JavaScript, React, Node.js, Express, and MongoDB, including REST API design and deployment.",
      credentialUrl: "https://certificates.placeholder.com/fullstack-web",
    },
    {
      id: "cert-sih-2024",
      title: "Smart India Hackathon (SIH) 2024",
      issuer: "College Internal Round",
      date: "2024",
      badge: "Hackathon Participant",
      description:
        "Selected and participated in the internal college round of SIH 2024, building digital solutions for real problem statements.",
      credentialUrl: "https://sih.gov.in/",
    },
  ] as Certification[],

  github: {
    username: "surajpillai11",
    profileUrl: "https://github.com/surajpillai11",
    fallbackRepos: [
      {
        name: "ai-report-analyzer",
        description: "RAG document Q&A platform built with Java, Spring Boot, ChromaDB, and Gemini.",
        language: "Java",
        languageColor: "#b07219",
        stars: 12,
        forks: 3,
        url: "https://github.com/surajpillai11/ai-report-analyzer",
      },
      {
        name: "ai-discipline-tracker",
        description: "Habit tracker with streak analytics, heatmaps, and Gemini AI tips.",
        language: "JavaScript",
        languageColor: "#f1e05a",
        stars: 8,
        forks: 2,
        url: "https://github.com/surajpillai11/ai-discipline-tracker",
      },
      {
        name: "attendance-management-system",
        description: "College attendance management web portal with separate teacher and student portals.",
        language: "JavaScript",
        languageColor: "#f1e05a",
        stars: 6,
        forks: 1,
        url: "https://github.com/surajpillai11/attendance-management-system",
      },
      {
        name: "dsa-java-solutions",
        description: "Collection of solved Data Structures and Algorithms problems in Java.",
        language: "Java",
        languageColor: "#b07219",
        stars: 15,
        forks: 5,
        url: "https://github.com/surajpillai11/dsa-java-solutions",
      },
    ],
  },
};
