import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Krithik",
  lastName: "Srinivas",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full Stack Developer (Backend & DevOps)",
  avatar: "/images/avatar.png",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Krithik-sri",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/krithik-srinivas/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:krithiksrinivas86@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Full Stack Developer</>,
  subline: (
    <>
      I'm Krithik, a Full Stack Developer, I craft robust
      <br /> backend. After hours, I build my own projects with a special enthusiasm for low level programming <InlineCode>Rust</InlineCode> (still exploring ofc).
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Full Stack Developer with hands-on experience across backend and DevOps. I design and build scalable APIs and services (Nest.js, Node.js) and ship production web apps (Next.js, React, TypeScript). Comfortable working with PostgreSQL and MongoDB, and deploying via Docker. Experienced with AWS/GCP and local cloud emulation using LocalStack to enable portable deployments.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "C1X",
        timeframe: "December 2025 - March 2026",
        role: "Software Engineer (Intern)",
        achievements: [
          <>Engineered end to end Microsoft ecosystem integration using OAuth 2.0 and webhook driven architecture.</>,
          <>Architected real time data synchronization pipelines, providing up to date data.</>,
          <>Authored comprehensive technical documentation and system flow diagrams, enhancing cross-team clarity and code maintainability.</>,
        ],
        images: [],
      },
      {
        company: "Authenta (Phosphene.ai)",
        timeframe: "March - December 2025",
        role: "Full Stack Developer Intern",
        achievements: [
          <>Built and scaled backend APIs using NestJS, applying modular architecture and dependency injection for maintainability.</>,
          <>Designed cloud-agnostic infrastructure using Docker + LocalStack, enabling AWS-compatible deployments without vendor lock-in.</>,
          <>Delivered portable environments that improved deployment consistency across heterogeneous client systems.</>,
        ],
        images: [],
      },
      {
        company: "Adrig AI Technologies",
        timeframe: "December 2024 - March 2025",
        role: "Full Stack Developer Intern",
        achievements: [
          <>Entrusted with significant responsibilities on production-level projects, mirroring the role of a full-time developer.</>,
          <>Developed and deployed full-stack solutions for various critical applications, notably contributing to a large-scale project for Southern Railways of India.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "St. Joseph's Institute of Technology Chennai",
        description: <>B.Tech Artificial Intelligence and Data Science — Expected June 2026</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Languages & Frameworks",
        description: <>JavaScript / TypeScript, Python, SQL / NoSQL, Nest.js, Next.js, React, Express.js, Node.js, Flask, FastAPI</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Backend & DevOps",
        description: <>Docker, AWS, GCP, PostgreSQL, MongoDB, MySQL, Git/Github, Postman</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
