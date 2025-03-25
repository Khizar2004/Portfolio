import React from 'react';
import * as THREE from 'three';

const Plant: React.FC = () => {
  return (
    <group>
      {/* Plant pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#d35400" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Soil */}
      <mesh position={[0, 0.30, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
        <meshStandardMaterial color="#3e2723" roughness={0.9} metalness={0} />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.01, 0.3, 8]} />
        <meshStandardMaterial color="#33691e" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Leaves */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0.5 + Math.random() * 0.1;
        
        return (
          <mesh 
            key={i} 
            position={[x, y, z]} 
            rotation={[
              Math.random() * 0.5 - 0.25,
              Math.random() * Math.PI * 2,
              Math.random() * 0.5 - 0.25
            ]}
            castShadow
          >
            <sphereGeometry args={[0.1, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
              color={['#388e3c', '#43a047', '#66bb6a'][Math.floor(Math.random() * 3)]} 
              side={THREE.DoubleSide}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Plant; 