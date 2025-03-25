import React from 'react';

const Headphones: React.FC = () => {
  return (
    <group>
      {/* Headphone band */}
      <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial 
          color="#222222" 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Left ear cup */}
      <mesh position={[0, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 32]} />
        <meshStandardMaterial 
          color="#444444" 
          roughness={0.2} 
          metalness={0.6}
        />
      </mesh>
      
      {/* Right ear cup */}
      <mesh position={[0, 0.05, 0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 32]} />
        <meshStandardMaterial 
          color="#444444" 
          roughness={0.2} 
          metalness={0.6}
        />
      </mesh>
      
      {/* Left ear pad */}
      <mesh position={[0.01, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.025, 32]} />
        <meshStandardMaterial 
          color="#111111" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Right ear pad */}
      <mesh position={[0.01, 0.05, 0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.025, 32]} />
        <meshStandardMaterial 
          color="#111111" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Left support */}
      <mesh position={[-0.01, 0.07, -0.1]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[0.01, 0.1, 0.01]} />
        <meshStandardMaterial 
          color="#222222" 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Right support */}
      <mesh position={[-0.01, 0.07, 0.1]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[0.01, 0.1, 0.01]} />
        <meshStandardMaterial 
          color="#222222" 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Cable */}
      <mesh position={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

export default Headphones; 