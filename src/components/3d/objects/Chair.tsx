import React from 'react';
import * as THREE from 'three';

interface ChairProps {
  isDarkMode: boolean;
}

const Chair: React.FC<ChairProps> = ({ isDarkMode }) => {
  return (
    <group position={[0, -1.02, 1.5]} rotation={[0, Math.PI, 0]} scale={[1.3, 1.3, 1.3]}>
      {/* Chair seat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Chair backrest */}
      <mesh position={[0, 0.85, -0.25]} rotation={[Math.PI * 0.05, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.6, 0.1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Chair legs */}
      {[[-0.22, 0.225, -0.22], [0.22, 0.225, -0.22], [-0.22, 0.225, 0.22], [0.22, 0.225, 0.22]].map((pos, idx) => (
        <mesh key={idx} position={pos as unknown as THREE.Vector3} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 8]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#1a1a1a" : "#3d2c1c"} 
            roughness={0.5} 
            metalness={0.7}
          />
        </mesh>
      ))}
      
      {/* Chair wheels base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#1a1a1a" : "#3d2c1c"} 
          roughness={0.5} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Chair wheels */}
      {[0, 72, 144, 216, 288].map((angle, idx) => {
        const wheelRadius = 0.23;
        const x = Math.cos((angle * Math.PI) / 180) * wheelRadius;
        const z = Math.sin((angle * Math.PI) / 180) * wheelRadius;
        
        return (
          <group key={idx} position={[x, -0.03, z]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.8} />
            </mesh>
          </group>
        );
      })}
      
      {/* Chair arm rests */}
      {[[-0.27, 0.7, 0], [0.27, 0.7, 0]].map((pos, idx) => (
        <group key={`armrest-${idx}`} position={pos as unknown as THREE.Vector3}>
          {/* Vertical part */}
          <mesh position={[0, -0.075, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#1a1a1a" : "#3d2c1c"} 
              roughness={0.5} 
              metalness={0.7}
            />
          </mesh>
          {/* Horizontal part */}
          <mesh position={[0, 0, 0.175]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#1a1a1a" : "#3d2c1c"} 
              roughness={0.5} 
              metalness={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Chair;