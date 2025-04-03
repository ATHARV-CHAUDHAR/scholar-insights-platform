
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const EducationIcon = ({ position, color, speed = 1, size = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * speed) * 0.5;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.8} />
      </mesh>
    </Float>
  );
};

const LoginAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
        
        {/* Educational themed floating icons */}
        <EducationIcon position={[-4, 2, -5]} color="#4A6FFF" speed={0.8} size={0.8} />
        <EducationIcon position={[4, -2, -5]} color="#38B2AC" speed={1.2} size={0.7} />
        <EducationIcon position={[-2, -3, -3]} color="#6875F5" speed={1.0} size={0.6} />
        <EducationIcon position={[3, 3, -4]} color="#F59E0B" speed={0.9} size={0.5} />
        <EducationIcon position={[0, 0, -8]} color="#F05252" speed={0.7} size={1.2} />
        
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
