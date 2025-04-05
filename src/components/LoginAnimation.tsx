
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, useTexture, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// Interactive educational-themed object with mouse follow
const EducationIcon = ({ position, color, speed = 1, size = 1, mousePosition }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  
  // Spring animation for hover effect
  const { scale, rotation, emissive } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    rotation: clicked ? [Math.PI, 0, 0] : [0, 0, 0],
    emissive: hovered ? 0.5 : 0,
    config: { mass: 2, tension: 170, friction: 26 }
  });
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Base rotation animation
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * speed) * 0.5;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.3;
      
      // Subtle mouse follow effect
      if (mousePosition.current) {
        const targetX = (mousePosition.current.x * 0.1) + position[0];
        const targetY = (mousePosition.current.y * -0.1) + position[1];
        mesh.current.position.x += (targetX - mesh.current.position.x) * 0.02;
        mesh.current.position.y += (targetY - mesh.current.position.y) * 0.02;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <animated.mesh 
        ref={mesh} 
        position={position}
        scale={scale}
        rotation={rotation}
        onClick={() => setClick(!clicked)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <dodecahedronGeometry args={[size, 0]} />
        <animated.meshStandardMaterial 
          color={color} 
          roughness={0.5} 
          metalness={0.8}
          emissiveIntensity={emissive}
          emissive={color}
        />
      </animated.mesh>
    </Float>
  );
};

// Particle system for background ambiance
const ParticleField = ({ count = 100 }) => {
  const particles = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (particles.current) {
      particles.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  const positions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    return positions;
  }, [count]);
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Shooting star effect
const ShootingStar = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const [startPos] = useState(() => [
    Math.random() * 20 - 10,
    Math.random() * 10 + 5,
    -10
  ]);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.x -= 0.1;
      mesh.current.position.y -= 0.05;
      mesh.current.position.z += 0.03;
      
      // Reset position when out of view
      if (mesh.current.position.x < -15) {
        mesh.current.position.set(
          Math.random() * 20 - 10,
          Math.random() * 10 + 5,
          -10
        );
      }
    }
  });
  
  return (
    <Trail
      width={0.2}
      color="#8B5CF6"
      length={6}
      decay={1}
      attenuation={(width) => width}
    >
      <mesh ref={mesh} position={startPos}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Trail>
  );
};

// Mouse tracker for interactive elements
const MousePositionTracker = ({ mousePosition }) => {
  const { viewport } = useThree();
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      if (mousePosition.current) {
        mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mousePosition, viewport]);
  
  return null;
};

// Main component with loading state
const LoginAnimation: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Mark as loaded after a short delay to ensure proper initialization
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-800"></div>;
  }

  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Optimize for performance and clarity
      >
        <MousePositionTracker mousePosition={mousePosition} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
        <ParticleField count={200} />
        
        {/* Educational themed floating icons that react to mouse movement */}
        <EducationIcon position={[-4, 2, -5]} color="#4A6FFF" speed={0.8} size={0.8} mousePosition={mousePosition} />
        <EducationIcon position={[4, -2, -5]} color="#38B2AC" speed={1.2} size={0.7} mousePosition={mousePosition} />
        <EducationIcon position={[-2, -3, -3]} color="#6875F5" speed={1.0} size={0.6} mousePosition={mousePosition} />
        <EducationIcon position={[3, 3, -4]} color="#F59E0B" speed={0.9} size={0.5} mousePosition={mousePosition} />
        <EducationIcon position={[0, 0, -8]} color="#F05252" speed={0.7} size={1.2} mousePosition={mousePosition} />
        
        {/* Add some shooting stars */}
        <ShootingStar />
        <ShootingStar />
        <ShootingStar />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Canvas>
    </div>
  );
};

export default LoginAnimation;
