"use client"

import { useRef, useEffect, useState } from "react"
import { useThree, Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import { usePathname } from "next/navigation"
import type * as THREE from "three"

function AnimatedSphere() {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.y += 0.01
      ref.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
    }
  })

  return (
    <Sphere
      ref={ref}
      args={[1, 64, 64]}
      scale={clicked ? 1.2 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? "#ffffff" : "#cccccc"}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.5}
      />
    </Sphere>
  )
}

function FloatingParticles() {
  const { viewport } = useThree()
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  const particles = Array.from({ length: 20 }, (_, i) => {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 10
    const size = Math.random() * 0.2 + 0.05
    return { id: i, position: [x, y, z], size }
  })

  return (
    <group ref={group}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position as [number, number, number]}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedSphere />
      <FloatingParticles />
    </>
  )
}

export default function ThreeDBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on the landing page
  if (!mounted || pathname === "/") return null

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

