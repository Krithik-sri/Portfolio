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
      I'm Krithik, I craft robust
      <br /> backends. After hours, I build my own projects with a special enthusiasm for low level programming <InlineCode>Rust</InlineCode> (still exploring ofc).
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
        company: "Authenta (Phosphene.ai)",
        timeframe: "March 2025 - Present",
        role: "Full Stack Developer Intern",
        achievements: [
          <>Primary focus on backend development using Nest.js with modular architecture and dependency injection to build scalable services.</>,
          <>Contributed to DevOps: authored Docker configurations and integrated LocalStack to emulate AWS, enabling portable, client-side deployments without cloud dependency.</>,
        ],
        images: [],
      },
      {
        company: "Adrig AI Technologies",
        timeframe: "December 2024 - March 2025",
        role: "Full Stack Developer Intern",
        achievements: [
          <>Worked on production-grade solutions, including a large-scale internal management system for Southern Railways of India to streamline operations, data, and workflows.</>,
          <>Built an AI chatbot deployment platform to train on customer-provided sources and embed into websites, improving engagement and support efficiency.</>,
        ],
        images: [],
      },
      {
        company: "Valeo",
        timeframe: "July - August 2024",
        role: "Summer Intern",
        achievements: [
          <>
            Worked with the SOC team to analyze and respond to cybersecurity threats, gaining hands-on experience in network security and threat detection.
          </>,
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
        name: "St. Joseph's Institute of Technology",
        description: <>B.Tech in Artificial Intelligence and Data Science — Expected August 2026</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Full Stack Development",
        description: <>Next.js, React, TypeScript, Node.js, Nest.js, Express, PostgreSQL, MongoDB — Built robust frontends, secure backends and high-performance APIs</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Cybersecurity & SOC",
        description: <>SOC analysis, threat detection, incident triage. Exposure to ticketing workflows and response processes.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Backend & DevOps",
        description: <>Docker, LocalStack, AWS, GCP — Containerized services and emulated cloud dependencies locally for portable deployments</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
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
