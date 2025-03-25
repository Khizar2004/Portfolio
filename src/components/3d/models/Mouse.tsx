import React from 'react';

const Mouse: React.FC = () => {
  return (
    <group>
      {/* Mouse body as a curved ellipsoid */}
      <mesh position={[0, 0.015, 0]} castShadow scale={[1, 0.6, 1.8]}>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Left Mouse Button */}
      <mesh position={[-0.015, 0.03, -0.01]} castShadow>
        <boxGeometry args={[0.015, 0.005, 0.04]} />
        <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.4} />
      </mesh>
      
      {/* Right Mouse Button */}
      <mesh position={[0.015, 0.03, -0.01]} castShadow>
        <boxGeometry args={[0.015, 0.005, 0.04]} />
        <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.4} />
      </mesh>
      
      {/* Scroll wheel */}
      <mesh position={[0, 0.035, -0.005]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.02, 16]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Optical sensor */}
      <mesh position={[0, 0.005, 0.045]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.003, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};

export default Mouse; 