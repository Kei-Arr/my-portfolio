import './App.css'
import { ReactLenis } from 'lenis/react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from './components/hero/hero'
import AboutMeSection from './components/about/about'

gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook to avoid React version discrepancies

function App() {

  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up') as Element[];

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger:{
          trigger: element,
          start:'-200 bottom',
          end:'bottom 80%',
          scrub: true,
        },
        y:0,
        opacity: 1,
        duration: 1,
        ease:'power2.out'
        
      })
    });
  })
  return (
  <>
    <ReactLenis root>
      <HeroSection />
      <AboutMeSection />

    </ReactLenis>
  </>
  )
}

export default App