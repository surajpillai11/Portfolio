import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function createResume() {
  const doc = await PDFDocument.create();
  
  // US Letter size
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  
  const primaryColor = rgb(0.08, 0.1, 0.15); // near-black #141a26
  const mutedColor = rgb(0.25, 0.3, 0.38); // dark slate #404d61
  const linkColor = rgb(0.12, 0.35, 0.75); // elegant royal blue #1e5abf
  const dividerColor = rgb(0.8, 0.82, 0.85); // soft light border
  
  const leftMargin = 42;
  const rightMargin = 42;
  const contentWidth = width - leftMargin - rightMargin;
  
  let y = height - 38;
  
  // Helper for drawing links
  const links = [];
  function addLink(x, y, w, h, url) {
    links.push({ x, y, w, h, url });
  }

  // Helper: Section title with divider
  function drawSectionTitle(title) {
    y -= 14;
    page.drawText(title, {
      x: leftMargin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: primaryColor,
    });
    y -= 3;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - rightMargin, y },
      thickness: 0.75,
      color: dividerColor,
    });
    y -= 8;
  }

  // --- HEADER ---
  const name = "Suraj Pillai";
  const nameWidth = fontBold.widthOfTextAtSize(name, 19);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y: y,
    size: 19,
    font: fontBold,
    color: primaryColor,
  });
  y -= 15;

  // Subheader contact info
  const contactTextParts = [
    { text: "Pune, Maharashtra", isLink: false },
    { text: " | ", isLink: false },
    { text: "pillai.suraj004@gmail.com", isLink: true, url: "mailto:pillai.suraj004@gmail.com" },
    { text: " | ", isLink: false },
    { text: "9834992377", isLink: true, url: "tel:+919834992377" },
    { text: " | ", isLink: false },
    { text: "LinkedIn", isLink: true, url: "https://www.linkedin.com/in/suraj-pillai-placeholder" },
    { text: " | ", isLink: false },
    { text: "GitHub", isLink: true, url: "https://github.com/surajpillai11" },
  ];

  const totalContactWidth = contactTextParts.reduce((acc, p) => acc + fontRegular.widthOfTextAtSize(p.text, 8.5), 0);
  let curX = (width - totalContactWidth) / 2;
  for (const part of contactTextParts) {
    const w = fontRegular.widthOfTextAtSize(part.text, 8.5);
    page.drawText(part.text, {
      x: curX,
      y: y,
      size: 8.5,
      font: part.isLink ? fontRegular : fontRegular,
      color: part.isLink ? linkColor : mutedColor,
    });
    if (part.isLink) {
      addLink(curX, y - 1, w, 10, part.url);
    }
    curX += w;
  }
  y -= 4;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionTitle("Professional Summary");
  const summaryText = "B.E. Computer Science student with hands-on experience building full-stack web applications and REST APIs. Proficient in Java, JavaScript, Node.js, and Spring Boot, with a strong foundation in Data Structures and Algorithms. Seeking an SDE role to contribute to scalable, real-world systems.";
  
  // Word wrap helper
  function drawParagraph(text, font, size, color, indent = 0) {
    const words = text.split(" ");
    let line = "";
    const maxW = contentWidth - indent;
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(testLine, size) > maxW) {
        page.drawText(line, { x: leftMargin + indent, y, size, font, color });
        y -= (size + 3);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: leftMargin + indent, y, size, font, color });
      y -= (size + 3);
    }
  }

  drawParagraph(summaryText, fontRegular, 8.5, mutedColor);

  // --- TECHNICAL SKILLS ---
  drawSectionTitle("Technical Skills");

  const skillCategories = [
    { label: "Programming Languages: ", items: "Java, JavaScript, C++, Python, SQL" },
    { label: "Backend & Frameworks: ", items: "Spring Boot, Spring Security, Node.js, Express.js" },
    { label: "Frontend: ", items: "React, JavaScript, EJS" },
    { label: "Databases: ", items: "MySQL, MongoDB, Mongoose" },
    { label: "Developer Tools & Platforms: ", items: "Git, GitHub, Docker, Postman, IntelliJ IDEA, Eclipse, Vercel, Render" },
    { label: "Core Concepts: ", items: "REST APIs, CRUD Operations, JWT Authentication & Authorization, Role-Based Access Control, Object-Oriented Programming, Data Structures & Algorithms" },
  ];

  for (const cat of skillCategories) {
    const bullet = "• ";
    const bulletW = fontBold.widthOfTextAtSize(bullet, 8.5);
    const labelW = fontBold.widthOfTextAtSize(cat.label, 8.5);

    page.drawText(bullet, { x: leftMargin, y, size: 8.5, font: fontBold, color: primaryColor });
    page.drawText(cat.label, { x: leftMargin + bulletW, y, size: 8.5, font: fontBold, color: primaryColor });
    
    // Draw items with wrapping if necessary
    const remainingW = contentWidth - bulletW - labelW;
    const words = cat.items.split(" ");
    let firstLine = true;
    let line = "";
    let startX = leftMargin + bulletW + labelW;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const currentMaxW = firstLine ? remainingW : (contentWidth - bulletW);
      if (fontRegular.widthOfTextAtSize(testLine, 8.5) > currentMaxW) {
        page.drawText(line, { x: startX, y, size: 8.5, font: fontRegular, color: mutedColor });
        y -= 11;
        firstLine = false;
        startX = leftMargin + bulletW;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: startX, y, size: 8.5, font: fontRegular, color: mutedColor });
      y -= 11;
    }
  }

  // --- PROJECTS ---
  drawSectionTitle("Projects");

  const projects = [
    {
      title: "AI Report Analyzer — RAG-Based Document Intelligence Platform",
      date: "Jul 2026",
      tech: "Java, Spring Boot, React, MySQL, ChromaDB, Gemini",
      links: [
        { label: "GitHub", url: "https://github.com/surajpillai11/ai-report-analyzer" }
      ],
      bullets: [
        "Developed a Retrieval-Augmented Generation (RAG) platform enabling document upload, AI-powered summarization, and conversational Q&A over user documents.",
        "Built the document-processing pipeline using Apache Tika for text extraction, Gemini embeddings, and ChromaDB for semantic vector search, returning cited, source-grounded answers.",
        "Implemented JWT authentication with per-user document isolation and secure access control, and containerized the full stack with Docker for reproducible deployment."
      ]
    },
    {
      title: "AI Discipline Tracking System",
      date: "Feb 2026",
      tech: "React.js, Node.js, Express.js, MongoDB, Gemini API",
      links: [
        { label: "Live Demo", url: "https://ai-discipline-tracking-system.vercel.app/login" }
      ],
      bullets: [
        "Developed a MERN-stack habit-tracking application with secure authentication, full CRUD operations, real-time streak analytics, and GitHub-style activity heatmaps.",
        "Built gamification features including a friend leaderboard, scheduled email notifications via cron jobs, a responsive PWA, and a role-based admin dashboard."
      ]
    },
    {
      title: "Attendance Management System",
      date: "Jun 2025",
      tech: "Node.js, Express.js, MongoDB, HTML, CSS, JavaScript",
      links: [
        { label: "Live Demo", url: "https://attendance-management-systems.onrender.com/" }
      ],
      bullets: [
        "Built a full-stack attendance management system with role-based access control supporting distinct teacher and student workflows.",
        "Implemented JWT-based authentication, real-time attendance tracking, and automated report generation to reduce manual record-keeping."
      ]
    }
  ];

  for (const proj of projects) {
    // Project Title & Date
    page.drawText(proj.title, {
      x: leftMargin,
      y,
      size: 9,
      font: fontBold,
      color: linkColor,
    });
    
    const dateW = fontRegular.widthOfTextAtSize(proj.date, 8.5);
    page.drawText(proj.date, {
      x: width - rightMargin - dateW,
      y,
      size: 8.5,
      font: fontOblique,
      color: mutedColor,
    });
    y -= 11;

    // Tech stack and links
    page.drawText(proj.tech, {
      x: leftMargin,
      y,
      size: 8,
      font: fontOblique,
      color: mutedColor,
    });
    let projX = leftMargin + fontOblique.widthOfTextAtSize(proj.tech, 8);
    
    for (const l of proj.links) {
      page.drawText(" | ", { x: projX, y, size: 8, font: fontRegular, color: mutedColor });
      projX += fontRegular.widthOfTextAtSize(" | ", 8);
      
      page.drawText(l.label, { x: projX, y, size: 8, font: fontRegular, color: linkColor });
      const lw = fontRegular.widthOfTextAtSize(l.label, 8);
      addLink(projX, y - 1, lw, 9, l.url);
      projX += lw;
    }
    y -= 10;

    // Bullet points
    for (const b of proj.bullets) {
      const dash = "– ";
      const dashW = fontRegular.widthOfTextAtSize(dash, 8);
      page.drawText(dash, { x: leftMargin + 4, y, size: 8, font: fontRegular, color: mutedColor });
      
      const words = b.split(" ");
      let line = "";
      const bMaxW = contentWidth - 14;
      let firstLine = true;

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (fontRegular.widthOfTextAtSize(testLine, 8) > bMaxW) {
          page.drawText(line, {
            x: leftMargin + 14,
            y,
            size: 8,
            font: fontRegular,
            color: mutedColor,
          });
          y -= 10;
          line = word;
          firstLine = false;
        } else {
          line = testLine;
        }
      }
      if (line) {
        page.drawText(line, {
          x: leftMargin + 14,
          y,
          size: 8,
          font: fontRegular,
          color: mutedColor,
        });
        y -= 10;
      }
    }
    y -= 2;
  }

  // --- EDUCATION ---
  drawSectionTitle("Education");

  page.drawText("B.E. in Computer Science and Engineering", {
    x: leftMargin,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });

  const eduDate = "Aug 2023 – Jun 2027";
  const eduDateW = fontRegular.widthOfTextAtSize(eduDate, 8.5);
  page.drawText(eduDate, {
    x: width - rightMargin - eduDateW,
    y,
    size: 8.5,
    font: fontOblique,
    color: mutedColor,
  });
  y -= 11;

  page.drawText("Pune, Maharashtra | Current CGPA: 8.2 / 10", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });
  y -= 5;

  // --- CERTIFICATIONS & ACHIEVEMENTS ---
  drawSectionTitle("Certifications & Achievements");

  const certs = [
    { label: "Java (Basic) Certificate — HackerRank: ", text: "Java fundamentals including OOP, data types, control flow, and exception handling." },
    { label: "DSA in Java: ", text: "Certified in Data Structures, Algorithms, and Problem Solving using Java." },
    { label: "Full Stack Web Development: ", text: "Certified in front-end and back-end integration (HTML, CSS, JavaScript, Node.js, MongoDB)." },
    { label: "Smart India Hackathon (SIH) 2024: ", text: "Selected for and participated in the internal round, demonstrating problem-solving and team collaboration." }
  ];

  for (const c of certs) {
    const dash = "– ";
    const dashW = fontRegular.widthOfTextAtSize(dash, 8);
    page.drawText(dash, { x: leftMargin + 4, y, size: 8, font: fontRegular, color: mutedColor });
    
    const combined = `${c.label}${c.text}`;
    const words = combined.split(" ");
    let line = "";
    const cMaxW = contentWidth - 14;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (fontRegular.widthOfTextAtSize(testLine, 8) > cMaxW) {
        page.drawText(line, {
          x: leftMargin + 14,
          y,
          size: 8,
          font: fontRegular,
          color: mutedColor,
        });
        y -= 10;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: leftMargin + 14,
        y,
        size: 8,
        font: fontRegular,
        color: mutedColor,
      });
      y -= 10;
    }
  }

  // Add Annotations for clickable links
  for (const l of links) {
    const linkAnnotation = doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [l.x, l.y, l.x + l.w, l.y + l.h],
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: doc.context.obj(l.url),
      },
    });
    
    // Add annotation ref to page
    const annotsKey = doc.context.obj('Annots');
    let annots = page.node.lookup(annotsKey);
    if (!annots) {
      annots = doc.context.obj([]);
      page.node.set(annotsKey, annots);
    }
    annots.push(linkAnnotation);
  }

  const pdfBytes = await doc.save();
  const outputPath = path.resolve('public', 'resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume generated successfully at ${outputPath} (${pdfBytes.length} bytes)`);
}

createResume().catch(console.error);
