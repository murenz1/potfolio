"use client"

import { useState } from "react"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { useSpring, animated } from "@react-spring/three"
import { useScroll } from "framer-motion"

// Animated particle field that responds to scroll
function ParticleField({ count = 5000, pattern = "sphere" }) {
  const points = useRef<THREE.Points>(null!)
  const { viewport, size } = useThree()
  const { scrollYProgress } = useScroll()

  // Create particles in different patterns
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)

    if (pattern === "sphere") {
      // Sphere pattern (like in your images)
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const radius = Math.random() * 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        temp[i3] = radius * Math.sin(phi) * Math.cos(theta)
        temp[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        temp[i3 + 2] = radius * Math.cos(phi)
      }
    } else if (pattern === "plane") {
      // Scattered plane (like in your third image)
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        temp[i3] = (Math.random() - 0.5) * 10
        temp[i3 + 1] = (Math.random() - 0.5) * 10
        temp[i3 + 2] = (Math.random() - 0.5) * 0.5
      }
    } else if (pattern === "equation") {
      // Equation-like pattern (inspired by 51+11=63)
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const segment = Math.floor(Math.random() * 3)

        if (segment === 0) {
          // 5 and 1
          temp[i3] = (Math.random() - 0.8) * 3
          temp[i3 + 1] = (Math.random() - 0.5) * 3
        } else if (segment === 1) {
          // 1 and 1
          temp[i3] = (Math.random() + 0.2) * 3
          temp[i3 + 1] = (Math.random() - 0.5) * 3
        } else {
          // 6 and 3
          temp[i3] = (Math.random() + 1.2) * 3
          temp[i3 + 1] = (Math.random() - 0.5) * 3
        }
        temp[i3 + 2] = (Math.random() - 0.5) * 0.5
      }
    } else {
      // Default scattered pattern
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        temp[i3] = (Math.random() - 0.5) * 10
        temp[i3 + 1] = (Math.random() - 0.5) * 10
        temp[i3 + 2] = (Math.random() - 0.5) * 10
      }
    }

    return temp
  }, [count, pattern])

  // Animation based on scroll
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075

      // Scale based on scroll position
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = scrollY / maxScroll

      // Pulse effect
      const pulse = Math.sin(state.clock.getElapsedTime()) * 0.05 + 1
      points.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// Interactive sphere that follows mouse
function InteractiveSphere({ position = [0, 0, 0] }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: { tension: 300, friction: 10 },
  })

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <animated.mesh
      position={position}
      ref={mesh}
      scale={scale}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
    </animated.mesh>
  )
}

// Main component with different background patterns
export default function EnhancedParticleBackground({ pattern = "sphere" }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField pattern={pattern} />
        <InteractiveSphere position={[2, -1, 0]} />
        <InteractiveSphere position={[-2, 1, 0]} />
      </Canvas>
    </div>
  )
}

