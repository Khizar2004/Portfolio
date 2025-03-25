import React from 'react';

const Book: React.FC = () => {
  return (
    <group>
      {/* Book cover */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.6, 0.03, 0.4]} />
        <meshStandardMaterial 
          color="#513578" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Book pages */}
      <mesh position={[0, 0.04, 0.01]}>
        <boxGeometry args={[0.57, 0.025, 0.37]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          roughness={0.9} 
          metalness={0}
        />
      </mesh>
      
      {/* Book spine detail */}
      <mesh position={[-0.29, 0.04, 0]}>
        <boxGeometry args={[0.02, 0.032, 0.41]} />
        <meshStandardMaterial 
          color="#3b2559" 
          roughness={0.5} 
          metalness={0.15}
        />
      </mesh>
      
      {/* Book title emboss */}
      <mesh position={[-0.29, 0.04, -0.1]}>
        <boxGeometry args={[0.01, 0.04, 0.2]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.7} 
          roughness={0.2} 
          emissive="#d4af37" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Page edges */}
      <mesh position={[0.15, 0.04, 0]}>
        <boxGeometry args={[0.28, 0.076, 0.39]} />
        <meshStandardMaterial 
          color="#e8e4d8" 
          roughness={0.95} 
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export default Book; 