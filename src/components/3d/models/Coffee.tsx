import React from 'react';
import * as THREE from 'three';

const Coffee: React.FC = () => {
  return (
    <group>
      {/* Saucer */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.01, 32]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>

      {/* Cup body */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.12, 32, 1, true]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup rim */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.051, 0.051, 0.005, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.01, 32]} />
        <meshStandardMaterial 
          color="#3c2f2f" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Handle */}
      <mesh
        position={[0.06, 0.06, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        castShadow
      >
        <torusGeometry args={[0.03, 0.01, 16, 32, Math.PI]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Coffee; 