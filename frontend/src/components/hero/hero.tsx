import { useState, useEffect } from 'react';
import './hero.css';
import { Navbar, HeroContent } from '.';
import { client } from '@/lib/sanity';
import HeroSkeleton from './heroSkeleton';
import NavbarSkeleton from './NavbarSkeleton';

function HeroSection() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch(`*[_type == "hero"][0]{
          ...,
          backgroundImage{
            asset->
          },
          cvFile{
            asset->
          }
        }`);
        console.log('Fetched hero data:', data);
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  if (!heroData) {
    return (
      <section id="home" className="min-h-screen w-full relative overflow-hidden">
        <NavbarSkeleton />
        <HeroSkeleton />
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen w-full relative overflow-hidden">
      <Navbar />
      <HeroContent data={heroData} />
    </section>
  );
}

export default HeroSection;