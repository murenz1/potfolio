"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Box, MeshDistortMaterial, OrbitControls, Text3D, Float, Torus, RoundedBox } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from "three"

// Floating spheres background
function FloatingSpheres() {
  const spheres = Array.from({ length: 20 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10],
    scale: Math.random() * 0.4 + 0.1,
    speed: Math.random() * 0.2 + 0.1,
  }))

  return (
    <group>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={sphere.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere position={sphere.position as [number, number, number]} args={[sphere.scale, 16, 16]}>
            <meshStandardMaterial color="white" opacity={0.1} transparent roughness={0.4} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// Animated wireframe cube
function WireframeCube() {
  const cubeRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      cubeRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Box ref={cubeRef} args={[3, 3, 3]} position={[0, 0, 0]}>
      <meshBasicMaterial color="white" wireframe opacity={0.3} transparent />
    </Box>
  )
}

// Animated torus
function AnimatedTorus() {
  const torusRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Torus ref={torusRef} args={[4, 0.5, 16, 50]} position={[0, 0, -5]}>
      <meshStandardMaterial color="white" opacity={0.2} transparent roughness={0.3} />
    </Torus>
  )
}

// Floating text
function FloatingText() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D font="/fonts/Inter_Bold.json" size={1.5} height={0.2} curveSegments={12} position={[-5, 3, 0]}>
        LUMION
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </Text3D>
    </Float>
  )
}

// Grid floor
function GridFloor() {
  const gridSize = 20
  const gridDivisions = 20

  return (
    <group position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[gridSize, gridDivisions, "white", "white"]} />
      <mesh>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial color="black" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Particles system
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null!)
  const count = 1000
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 25
    positions[i3 + 1] = (Math.random() - 0.5) * 25
    positions[i3 + 2] = (Math.random() - 0.5) * 25
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" opacity={0.6} transparent sizeAttenuation />
    </points>
  )
}

// Distorted sphere
function DistortedSphere() {
  return (
    <Sphere args={[2, 64, 64]} position={[6, 0, 0]}>
      <MeshDistortMaterial color="white" opacity={0.2} transparent distort={0.4} speed={2} roughness={0.5} />
    </Sphere>
  )
}

// Rounded boxes
function FloatingBoxes() {
  const boxes = Array.from({ length: 10 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10],
    scale: Math.random() * 0.8 + 0.2,
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    speed: Math.random() * 0.5 + 0.1,
  }))

  return (
    <group>
      {boxes.map((box, i) => (
        <Float key={i} speed={box.speed} rotationIntensity={0.2} floatIntensity={0.5}>
          <RoundedBox
            position={box.position as [number, number, number]}
            args={[box.scale, box.scale, box.scale]}
            radius={0.1}
            rotation={box.rotation as [number, number, number]}
          >
            <meshStandardMaterial color="white" opacity={0.15} transparent wireframe />
          </RoundedBox>
        </Float>
      ))}
    </group>
  )
}

// Scene 1: Minimal wireframe
export function MinimalWireframeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Suspense fallback={null}>
        <WireframeCube />
        <GridFloor />
        <ParticleSystem />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

// Scene 2: Floating elements
export function FloatingElementsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Suspense fallback={null}>
        <FloatingSpheres />
        <FloatingText />
        <DistortedSphere />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

// Scene 3: Abstract geometry
export function AbstractGeometryScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedTorus />
        <FloatingBoxes />
        <ParticleSystem />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  )
}

// Main component that switches between scenes
export default function ThreeDBackgrounds({ sceneIndex = 0 }: { sceneIndex?: number }) {
  const scenes = [
    <MinimalWireframeScene key="wireframe" />,
    <FloatingElementsScene key="floating" />,
    <AbstractGeometryScene key="abstract" />,
  ]

  return <div className="fixed inset-0 -z-10">{scenes[sceneIndex % scenes.length]}</div>
}

