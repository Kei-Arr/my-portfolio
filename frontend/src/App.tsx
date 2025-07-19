import './App.css'
import ReactLenis from "lenis/react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import HeroSection from './components/hero/hero'
import AboutMeSection from './components/about/about'
import MyProjects from './components/projects/projects'
import Graph from './components/github/contributions'
import ContactSection from './components/contact/contact';

gsap.registerPlugin(ScrollTrigger);

function App() {

  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up') as Element[];

    elements.forEach((element, index) => {
      // Set initial state 
      gsap.set(element, {
        opacity: 0,
        y: 30,
        visibility: 'hidden'
      });

      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-150 bottom',
          end: 'bottom 60%',
          scrub: true,
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1.5,
        delay: index * 0.05,
        ease: 'power2.out'
      })
    });
  })
  return (
    <>
      <ReactLenis root>
        <HeroSection />
        <AboutMeSection />
        <MyProjects />
        <Graph />
        <ContactSection />
      </ReactLenis>
    </>
  )
}

export default App