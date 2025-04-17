import React, { useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ResumePaperProps {
  isDarkMode: boolean;
}

const ResumePaper: React.FC<ResumePaperProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      ref={modelRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Paper base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.35, 0.01]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Header area */}
      <mesh position={[0, 0.14, 0.006]}>
        <planeGeometry args={[0.2, 0.04]} />
        <meshBasicMaterial color={isDarkMode ? "#4a80c5" : "#2e5ea6"} />
      </mesh>
      
      {/* Resume preview content */}
      <mesh position={[0, 0.05, 0.006]}>
        <planeGeometry args={[0.18, 0.05]} />
        <meshBasicMaterial color="#f2f2f2" />
      </mesh>
      
      {/* Name text simulation */}
      <mesh position={[0, 0.14, 0.007]} scale={[0.18, 0.02, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="white" />
      </mesh>
      
      {/* Add lines to simulate text */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 0.08 - i * 0.024, 0.006]} scale={[0.2, 0.004, 1]}>
          <planeGeometry />
          <meshBasicMaterial color={isDarkMode ? "#cccccc" : "#555555"} />
        </mesh>
      ))}
      
      {/* Pin on top */}
      <mesh position={[0, 0.16, 0.02]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.03, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      {/* Tooltip */}
      {hovered && (
        <Html position={[0, -0.25, 0]} center>
          <div style={{
            background: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.9)',
            color: isDarkMode ? 'white' : 'black',
            padding: '6px 12px',
            borderRadius: '12px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transform: 'translateY(10px)',
            border: isDarkMode ? '1px solid #444' : '1px solid #ddd'
          }}>
            Click to view resume
          </div>
        </Html>
      )}
    </group>
  );
};

export default ResumePaper; 