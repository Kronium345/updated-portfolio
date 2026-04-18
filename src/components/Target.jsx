import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DoubleSide } from 'three'

const bullseyeRed = '#c41e3a'
const bullseyeWhite = '#f4f4f4'
const standWood = '#5c3a21'

const Target = (props) => {
  const targetRef = useRef()

  useGSAP(() => {
    if (!targetRef.current) return
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    })
  })

  const ringRadii = [0.42, 0.34, 0.26, 0.18, 0.1]

  return (
    <group {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <mesh position={[0, -0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 1.15, 0.1]} />
        <meshStandardMaterial color={standWood} roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.38, 0]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.95, 0.07]} />
        <meshStandardMaterial color={standWood} roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.38, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.95, 0.07]} />
        <meshStandardMaterial color={standWood} roughness={0.85} />
      </mesh>

      <group position={[0, 0.12, 0]}>
        {ringRadii.map((radius, i) => (
          <mesh key={radius} position={[0, 0, -i * 0.004]} castShadow receiveShadow>
            <circleGeometry args={[radius, 48]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? bullseyeRed : bullseyeWhite}
              roughness={0.55}
              side={DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default Target
