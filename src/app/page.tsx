import Hero from "@/components/Hero/Hero";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Education from "@/components/Education/Education";
import Projects from "@/components/Projects/Projects";
import Blog from "@/components/Blog/Blog";
import Contact from "@/components/Contact/Contact";
import LastRun from "@/components/Strava/LastRun";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <LastRun />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
