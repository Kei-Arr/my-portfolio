import './App.css'
import { ReactLenis } from 'lenis/react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from './components/hero/hero'
import AboutMeSection from './components/about/about'
import MyProjects from './components/projects/projects'
import Graph from './components/github/contributions'
import ContactSection from './components/contact/contact';

gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook to avoid React version discrepancies

function App() {

  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up') as Element[];

    elements.forEach((element, index) => {
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
        duration: 2.5,
        delay: index * 0.15,
        ease: 'power3.out'
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
        <ContactSection/>
      </ReactLenis>
    </>
  )
}

export default App