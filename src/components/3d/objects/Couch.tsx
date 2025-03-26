import React from 'react';
import * as THREE from 'three';

interface CouchProps {
  isDarkMode: boolean;
}

const Couch: React.FC<CouchProps> = ({ isDarkMode }) => {
  const mainColor = isDarkMode ? "#2d2d2d" : "#6b4e37";
  const cushionColor = isDarkMode ? "#3a3a3a" : "#8b6d4b";
  const metalColor = isDarkMode ? "#191919" : "#454545";

  return (
    <group position={[4, -1, 0]} rotation={[0, -Math.PI / 2, 0]}>

      {/* Main couch frame (2 wide, 0.7 tall, 0.9 deep).
          We want its bottom flush at y=0, so place it at y=0.35. */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.7, 0.9]} />
        <meshStandardMaterial
          color={mainColor}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Seat cushions */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.475, 0.1]} // slight front offset so it looks right
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.25, 0.7]} />
          <meshStandardMaterial
            color={cushionColor}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Backrest (2 wide, 1 tall, 0.2 deep).
          Placing it above the couch frame: y=0.35 + half(1) = 0.85.
          Shift it back by half the couch’s depth (0.45). */}
      <mesh position={[0, 0.85, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 0.2]} />
        <meshStandardMaterial
          color={mainColor}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Back cushions (0.5 wide, 0.6 tall, 0.35 deep). 
          Put them in front of the backrest just a bit. */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.85, -0.3]}
          rotation={[0, 0, Math.PI * 0.05]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.6, 0.35]} />
          <meshStandardMaterial
            color={cushionColor}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Armrests. Bottom aligned with the main frame’s center at y=0.35. */}
      {[-1.05, 1.05].map((x, i) => (
        <group key={i} position={[x, 0.35, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.9, 0.9]} />
            <meshStandardMaterial
              color={mainColor}
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
          {/* Top padding for armrest */}
          <mesh position={[0, 0.45, 0.35]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial
              color={cushionColor}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* Legs: 0.2 tall, so put the center at y=0.1 so they rest on the floor at y=0 */}
      {[[-0.85, -0.4], [0.85, -0.4], [-0.85, 0.4], [0.85, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial
            color={metalColor}
            roughness={0.5}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Couch;