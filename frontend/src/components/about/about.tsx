import { Card, CardContent } from "@/components/ui/card";
import Balancer from 'react-wrap-balancer';
import regalImage from '@/assets/images/regal.png';
import gradImage from '@/assets/images/grad.png';

function AboutMeSection() {
  return (
    <section id="about" className="min-h-screen w-full relative overflow-hidden bg-dark-900 flex items-center justify-center py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex flex-col items-start gap-6 max-w-[494px] w-full lg:w-auto reveal-up">
            <header className="gap-2 self-stretch w-full flex flex-col items-start reveal-up">
              <h1 className="self-stretch font-semibold text-burgundy-500 text-3xl sm:text-4xl lg:text-[40px] tracking-[-0.80px] leading-tight lg:leading-[48px] font-kurye-italic reveal-up">
                About Me
              </h1>
              <p className="self-stretch font-normal text-cream-100 text-base leading-[19.2px] font-kurye reveal-up">
                React.js Developer | Full-Stack Enthusiast
              </p>
            </header>

            <Card className="border-0 shadow-none bg-transparent reveal-up w-full">
              <CardContent className="p-0">
                <p className="text-cream-50 font-kurye-italic text-base lg:text-lg leading-relaxed reveal-up">
                  A full-stack developer specializing in React.js and modern
                  web technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-transparent reveal-up w-full">
              <CardContent className="p-0">
                <p className="text-cream-50 font-kurye-italic text-base lg:text-lg leading-relaxed reveal-up">
                  <Balancer>
                    I enjoy exploring new technologies and figuring out how they
                    can solve real-world problems. I'm always excited to take on
                    new challenges and collaborate with others to create
                    something amazing. I believe great software comes from
                    understanding both the technical side and the human side of
                    problems.
                  </Balancer>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[380px] aspect-[4/5] reveal-up group cursor-pointer flex-shrink-0 animate-spin-slow">

            <img
              src={regalImage}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out group-hover:opacity-0 rounded-full border-4 border-burgundy-500"
            />

            <img
              src={gradImage}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 rounded-full border-4 border-burgundy-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMeSection;