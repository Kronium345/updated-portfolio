import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const lerpEuler = (cur, target, t) => {
  cur.x = THREE.MathUtils.lerp(cur.x, target.x, t)
  cur.y = THREE.MathUtils.lerp(cur.y, target.y, t)
  cur.z = THREE.MathUtils.lerp(cur.z, target.z, t)
}

const poseFor = (name) => {
  switch (name) {
    case 'salute':
      return {
        right: new THREE.Euler(-0.12, 0.28, -2.05),
        left: new THREE.Euler(0.1, 0, -0.1),
      }
    case 'clapping':
      return {
        right: new THREE.Euler(-0.95, 0.18, -0.32),
        left: new THREE.Euler(-0.95, -0.18, 0.32),
      }
    case 'victory':
      return {
        right: new THREE.Euler(-0.18, 0.12, -2.25),
        left: new THREE.Euler(-0.18, -0.12, 2.25),
      }
    default:
      return {
        right: new THREE.Euler(0.06, 0, 0.05),
        left: new THREE.Euler(0.06, 0, -0.05),
      }
  }
}

const Developer = ({ animationName = 'idle', ...props }) => {
  const bobRef = useRef()
  const haloRef = useRef()
  const rightShoulder = useRef()
  const leftShoulder = useRef()
  const targetRight = useRef(new THREE.Euler())
  const targetLeft = useRef(new THREE.Euler())
  const curRight = useRef(new THREE.Euler(0.06, 0, 0.05))
  const curLeft = useRef(new THREE.Euler(0.06, 0, -0.05))

  useEffect(() => {
    const pose = poseFor(animationName)
    targetRight.current.copy(pose.right)
    targetLeft.current.copy(pose.left)
  }, [animationName])

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: '#5c6a8a',
        metalness: 0.55,
        roughness: 0.38,
        flatShading: true,
      }),
      shellMid: new THREE.MeshStandardMaterial({
        color: '#6a7a9e',
        metalness: 0.5,
        roughness: 0.4,
        flatShading: true,
      }),
      joint: new THREE.MeshStandardMaterial({
        color: '#4a556e',
        metalness: 0.5,
        roughness: 0.42,
        flatShading: true,
      }),
      cyanStrip: new THREE.MeshStandardMaterial({
        color: '#7aefff',
        metalness: 0.28,
        roughness: 0.32,
        emissive: '#40d4e8',
        emissiveIntensity: 0.75,
      }),
      magentaStrip: new THREE.MeshStandardMaterial({
        color: '#ff7eb3',
        metalness: 0.25,
        roughness: 0.36,
        emissive: '#e85a9a',
        emissiveIntensity: 0.4,
      }),
      visor: new THREE.MeshStandardMaterial({
        color: '#b8f8ff',
        metalness: 0.15,
        roughness: 0.18,
        emissive: '#5cd4ff',
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.94,
      }),
      pad: new THREE.MeshStandardMaterial({
        color: '#4a5568',
        metalness: 0.45,
        roughness: 0.48,
        emissive: '#2a8090',
        emissiveIntensity: 0.22,
      }),
    }),
    [],
  )

  useEffect(
    () => () => {
      Object.values(materials).forEach((m) => m.dispose())
    },
    [materials],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const k = 1 - Math.exp(-delta * 9)

    lerpEuler(curRight.current, targetRight.current, k)
    lerpEuler(curLeft.current, targetLeft.current, k)

    let rx = curRight.current.x
    let ry = curRight.current.y
    let rz = curRight.current.z
    let lx = curLeft.current.x
    let ly = curLeft.current.y
    let lz = curLeft.current.z

    if (animationName === 'clapping') {
      const w = Math.sin(t * 11) * 0.22
      rx += w * 0.35
      lx += w * 0.35
      rz += w * 0.12
      lz -= w * 0.12
    }

    rightShoulder.current?.rotation.set(rx, ry, rz)
    leftShoulder.current?.rotation.set(lx, ly, lz)

    const bob = animationName === 'idle' ? Math.sin(t * 1.6) * 0.028 : Math.sin(t * 2.2) * 0.014
    if (bobRef.current) bobRef.current.position.y = bob
    if (haloRef.current) haloRef.current.rotation.y = t * 0.35
  })

  const y = {
    pad: -1.14,
    boot: -0.92,
    knee: -0.58,
    hip: -0.28,
    pelvis: -0.08,
    torsoLo: 0.22,
    torsoHi: 0.58,
    neck: 0.66,
    helmLo: 0.74,
    helmHi: 1.05,
    crown: 1.22,
    shoulder: 0.48,
  }

  return (
    <group {...props}>
      <group ref={bobRef}>
        <group ref={haloRef} position={[0, y.pad + 0.02, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.cyanStrip}>
            <torusGeometry args={[0.52, 0.018, 8, 48]} />
          </mesh>
        </group>
        <mesh castShadow position={[0, y.pad, 0]} material={materials.pad}>
          <cylinderGeometry args={[0.48, 0.52, 0.08, 10]} />
        </mesh>

        <mesh castShadow position={[0.22, y.boot, 0]} material={materials.shell}>
          <boxGeometry args={[0.2, 0.52, 0.22]} />
        </mesh>
        <mesh castShadow position={[-0.22, y.boot, 0]} material={materials.shell}>
          <boxGeometry args={[0.2, 0.52, 0.22]} />
        </mesh>
        <mesh position={[0.22, y.knee, 0.06]} material={materials.cyanStrip}>
          <boxGeometry args={[0.16, 0.08, 0.06]} />
        </mesh>
        <mesh position={[-0.22, y.knee, 0.06]} material={materials.cyanStrip}>
          <boxGeometry args={[0.16, 0.08, 0.06]} />
        </mesh>

        <mesh castShadow position={[0, y.hip, 0]} material={materials.shellMid}>
          <cylinderGeometry args={[0.26, 0.32, 0.36, 8]} />
        </mesh>
        <mesh castShadow position={[0, y.pelvis, 0]} material={materials.joint}>
          <boxGeometry args={[0.56, 0.22, 0.34]} />
        </mesh>

        <mesh castShadow position={[0, y.torsoLo, 0]} material={materials.shell}>
          <cylinderGeometry args={[0.34, 0.4, 0.52, 8]} />
        </mesh>
        <mesh castShadow position={[0, y.torsoHi, 0]} material={materials.shellMid}>
          <cylinderGeometry args={[0.4, 0.36, 0.42, 8]} />
        </mesh>
        <mesh position={[0, y.torsoHi + 0.02, 0.22]} material={materials.cyanStrip}>
          <boxGeometry args={[0.52, 0.06, 0.04]} />
        </mesh>
        <mesh position={[0, y.torsoLo - 0.08, -0.2]} material={materials.magentaStrip}>
          <boxGeometry args={[0.06, 0.55, 0.12]} />
        </mesh>

        <mesh castShadow position={[0, y.neck, 0]} material={materials.joint}>
          <cylinderGeometry args={[0.22, 0.2, 0.12, 8]} />
        </mesh>

        <mesh castShadow position={[0, (y.helmLo + y.helmHi) / 2, 0]} material={materials.shell}>
          <cylinderGeometry args={[0.34, 0.26, 0.62, 8]} />
        </mesh>
        <mesh position={[0, y.helmHi - 0.06, 0.2]} material={materials.visor}>
          <boxGeometry args={[0.44, 0.1, 0.08]} />
        </mesh>
        <mesh position={[0, y.helmHi + 0.04, -0.18]} material={materials.cyanStrip}>
          <boxGeometry args={[0.12, 0.2, 0.06]} />
        </mesh>

        <mesh castShadow position={[0, y.crown, 0]} material={materials.shellMid}>
          <coneGeometry args={[0.14, 0.28, 6]} />
        </mesh>
        <mesh position={[0, y.crown + 0.2, 0]} material={materials.cyanStrip}>
          <sphereGeometry args={[0.06, 10, 10]} />
        </mesh>

        <group ref={rightShoulder} position={[0.48, y.shoulder, 0.02]}>
          <mesh castShadow position={[0.08, -0.22, 0]} material={materials.joint}>
            <boxGeometry args={[0.15, 0.46, 0.15]} />
          </mesh>
          <mesh position={[0.1, -0.46, 0.04]} material={materials.shell}>
            <boxGeometry args={[0.13, 0.36, 0.13]} />
          </mesh>
          <mesh position={[0.1, -0.68, 0.06]} material={materials.cyanStrip}>
            <boxGeometry args={[0.11, 0.12, 0.1]} />
          </mesh>
        </group>

        <group ref={leftShoulder} position={[-0.48, y.shoulder, 0.02]}>
          <mesh castShadow position={[-0.08, -0.22, 0]} material={materials.joint}>
            <boxGeometry args={[0.15, 0.46, 0.15]} />
          </mesh>
          <mesh position={[-0.1, -0.46, 0.04]} material={materials.shell}>
            <boxGeometry args={[0.13, 0.36, 0.13]} />
          </mesh>
          <mesh position={[-0.1, -0.68, 0.06]} material={materials.cyanStrip}>
            <boxGeometry args={[0.11, 0.12, 0.1]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

export default Developer
