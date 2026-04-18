import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { workExperiences } from '../constants';
import CanvasLoader from '../components/CanvasLoader'
import Developer from '../components/Developer';
import { OrbitControls } from '@react-three/drei';



const Experience = () => {
    const [animationName, setAnimationName] = useState('idle');
  return (
    <section className="c-space my-20" id="work">
        <div className="w-full text-white-600">
            <h3 className="head-text">My Work Experience</h3>
            <div className="work-container">
                <div className="work-canvas h-full min-h-[clamp(300px,48vh,720px)] w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:block">
                    <Canvas
                        className="h-full w-full"
                        gl={{ alpha: true, antialias: true }}
                        camera={{ position: [0, 0.08, 7.35], fov: 37, near: 0.1, far: 120 }}
                    >
                        <ambientLight intensity={0.48} />
                        <hemisphereLight intensity={0.62} color="#d8e4ff" groundColor="#2a3040" />
                        <spotLight position={[4, 8, 6]} angle={0.35} penumbra={0.85} intensity={1.05} color="#f5faff" />
                        <directionalLight position={[-6, 4, 4]} intensity={0.52} color="#a8b8e8" />
                        <pointLight position={[0, 1.2, 2.2]} intensity={0.42} color="#7ae8f5" distance={8} />
                        <OrbitControls
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={0.55}
                            target={[0, 0.05, 0]}
                        />
                        <Suspense fallback={<CanvasLoader />}>
                            <Developer position={[0, 0, 0]} scale={1.58} animationName={animationName} />
                        </Suspense>
                    </Canvas>
                </div>
                <div className="work-content">
                    <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                        {workExperiences.map(({id, name, pos, icon, duration, title, animation}) => (
                            <div key={id} 
                            className="work-content_container group" 
                            onClick={() => setAnimationName(animation.toLowerCase())} 
                            onPointerOver={() => setAnimationName(animation.toLowerCase())} 
                            onPointerOut={() => setAnimationName('idle')}
                            >
                                <div className="flex flex-col h-full justify-start items-center py-2">
                                    <div className="work-content_logo">
                                        <img src={icon} alt="logo" className="w-full h-full" />
                                    </div>
                                    <div className="work-content_bar" />
                                </div>
                                <div className="sm:p-5 px-2.5 py-5">
                                    <p className="font-bold text-white-800">{name}</p>
                                    <p className="text-sm mb-5">{pos} -- {duration}</p>
                                    <p className="group-hover:text-white transition ease-in-out duration-500">{title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Experience
