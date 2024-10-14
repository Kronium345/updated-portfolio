import React, { useState } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button'


const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText('awolowodaniel@yahoo.ie');
    setHasCopied(true);
    setTimeout(() => {setHasCopied(false)

    }, 2000);
  }

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
            <div className="grid-container">
                <img src="/assets/gridA.jpg" alt="grid-A" className="w-full sm:h-[276px] h-fit object-contain" />
                <div>
                    <p className="grid-headtext">Hi, again! I'm Daniel</p>
                    <p className="grid-subtext">With a wealth of experience over the year gained, I have honed my skills in frontend, backend and mobile development, with a focus on React, NodeJS, React Native & Python.</p>
                </div>
            </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
            <div className="grid-container">
                <img src="/assets/grid2A.png" alt="grid-2A" className="w-full sm:w-[276px] h-fit object-contain" />

                <div>
                  <p className="grid-headtext">Tech Stack</p>
                  <p className="grid-subtext">I specialise in JavaScript/TypeScript with a strong focus on React and Next.js</p>
                </div>
            </div>
        </div>
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe 
              height={326} 
              width={326} 
              backgroundColor='rgba(0, 0, 0, 0)' 
              backgroundImageOpacity={0.5} 
              showAtmosphere 
              showGraticules
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              />
            </div>
              <div>
                <p className="grid-headtext">I can work remotely, hybrid or on-site.</p>
                <p className="grid-subtext">I am based in South-East London.</p>
                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
              </div>
          </div>

        </div>

        <div className="xl:col-span-2 xl:row-span-3">
            <div className="grid-container">
              <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
              <div>
                <p className="grid-headtext">My passion for coding</p>
                <p className="grid-subtext">I have a great passion for problem-solving and building different solutions. I take great joy in being part of a cohesive unit to solve an overall situation.</p>
              </div>
            </div>
          </div>
          <div className="xl:col-span-1 xl:row-span-2">
            <div className="grid-container">
              <img src="/assets/grid4.png" alt="grid-4" className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top" />
              <div className="space-y-2">
                <p className="grid-subtext text-center">Contact Me</p>
                <div className="copy-container" onClick={handleCopy}>
                  <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                  <p className="lg:text-xl md:text-xl font-medium text-gray_gradient text-white">awolowodaniel@yahoo.ie</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default About
