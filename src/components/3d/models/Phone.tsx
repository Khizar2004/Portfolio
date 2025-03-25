import React from 'react';

const Phone: React.FC = () => {
  return (
    <group>
      {/* Phone body */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.7} />
      </mesh>
      
      {/* Phone screen */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.19, 0.005, 0.38]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#3498db" 
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      
      {/* Phone frame */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.4]} />
        <meshStandardMaterial 
          color="#2c2c2c" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>
      
      {/* Camera */}
      <mesh position={[0, 0.03, -0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Home button */}
      <mesh position={[0, 0.025, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
};

export default Phone; 