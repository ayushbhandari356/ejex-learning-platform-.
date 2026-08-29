import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

type IconName = "arrow" | "bell" | "chart" | "clock" | "document" | "search" | "star";

const courses = [
  { name: "Next.js for Production", description: "Build scalable, high-performance web applications with Next.js.", level: "Intermediate", duration: "18h 24m", modules: "12 modules", logo: "next" },
  { name: "Docker Essentials", description: "Containerize applications and streamline your development workflow.", level: "Beginner", duration: "10h 12m", modules: "8 modules", logo: "docker" },
  { name: "TypeScript Deep Dive", description: "Go beyond the basics and write safer, more expressive code.", level: "Intermediate", duration: "14h 36m", modules: "10 modules", logo: "typescript" },
] as const;

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const props = { className: `vertex-icon ${className}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 22h4" /></>,
    chart: <><path d="M3 20h18" /><path d="M6 17v-3m4 3V9m4 8v-5m4 5V5" /></>,
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    document: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    star: <path d="m12 3 2.5 6 6.5.5-5 4.2 1.5 6.3-5.5-3.4-5.5 3.4 1.5-6.3-5-4.2L9.5 9z" />,
  };
  return <svg {...props}>{paths[name]}</svg>;
}

function VertexMark() { return <svg className="vertex-mark" viewBox="0 0 38 34" aria-hidden="true"><path d="M1.5 2h12.8L19 12.2 23.7 2h12.8L19 32zM12.8 8.4 19 22.1l6.2-13.7h-5.4L19 11l-1.1-2.6z" /></svg>; }

function CourseLogo({ logo }: { logo: (typeof courses)[number]["logo"] }) {
  if (logo === "next") return <div className="course-logo next-logo" aria-label="Next.js"><span>N</span></div>;
  if (logo === "typescript") return <div className="course-logo typescript-logo" aria-label="TypeScript"><span>TS</span></div>;
  return <div className="course-logo docker-logo" aria-label="Docker"><svg viewBox="0 0 100 72" aria-hidden="true"><path d="M21 37h43c3 0 6-2 8-5 3 1 7 1 11-1-2 8-10 14-18 14H58c-3 11-11 17-20 17-10 0-19-7-21-18H9c-2 0-3-2-3-4s1-3 3-3h12z" fill="#2e89e6" stroke="#101e36" strokeWidth="2" /><path d="M23 34V25h8v9m2 0V19h8v15m2 0V13h8v21m2 0V20h8v14m2 0v-8h8v8m-53-11v-8h8v8m2-4v-8h8v8" fill="#49a8ff" stroke="#101e36" strokeWidth="2" /><path d="M74 23c1-6 5-8 9-7" stroke="#101e36" strokeWidth="2" /></svg></div>;
}

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  return <article className="course-card"><CourseLogo logo={course.logo} /><h3>{course.name}</h3><p>{course.description}</p><footer className="course-meta"><span><Icon name="chart" />{course.level}</span><span><Icon name="clock" />{course.duration}</span><span><Icon name="document" />{course.modules}</span></footer></article>;
}

function DecorativeBars() { return <div className="bar-illustration" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>; }

export default function Home() {
  return <main className="vertex-page"><div className="vertex-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Vertex home"><VertexMark /><span>Vertex</span></a><nav className="primary-nav" aria-label="Primary navigation"><a href="#courses">Courses</a><a href="#courses">My Learning</a></nav><div className="header-actions"><button className="icon-button" type="button" aria-label="Notifications"><Icon name="bell" /></button><Show when="signed-out"><SignInButton><button className="auth-button auth-ghost" type="button">Sign in</button></SignInButton><SignUpButton><button className="auth-button auth-primary" type="button">Sign up</button></SignUpButton></Show><Show when="signed-in"><UserButton /></Show></div></header>
    <section className="hero" id="top" aria-labelledby="hero-title"><p className="hero-label">Intelligent learning</p><h1 id="hero-title">Search your learning<br />in plain English.</h1><p className="hero-copy">Vertex understands what you want to learn and<br className="desktop-break" /> finds the exact lessons across all your courses.</p><a className="hero-cta" href="#courses">Explore Courses <Icon name="arrow" /></a><form className="learning-search" role="search"><Icon name="search" /><label className="sr-only" htmlFor="learning-query">Search your learning</label><input id="learning-query" type="search" placeholder="Ask anything about your learning..." /><kbd>⌘ K</kbd></form></section>
    <section className="courses-section" id="courses" aria-labelledby="courses-title"><div className="section-heading"><h2 id="courses-title">All Courses</h2><a href="#courses">View all courses <Icon name="arrow" /></a></div><div className="course-grid">{courses.map((course) => <CourseCard key={course.name} course={course} />)}</div><div className="new-content"><span /><p><Icon name="star" />New courses and lessons added every week.</p><span /></div><DecorativeBars /></section>
  </div></main>;
}
