import React from 'react';

interface WindowProps {
  isDarkMode: boolean;
}

const Window: React.FC<WindowProps> = ({ isDarkMode }) => {
  return (
    <group>
      {/* Window */}
      <mesh position={[-4.95, 1.2, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#1a1a1a" : "#a0d8ef"} 
          roughness={0.2} 
          metalness={0.8}
          emissive={isDarkMode ? "#101030" : "#a0c8ef"} 
          emissiveIntensity={isDarkMode ? 0.2 : 0.3}
        />
      </mesh>
      
      {/* Window frame */}
      <mesh position={[-4.9, 1.2, -1]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.6, 2.1, 0.02]} />
        <meshStandardMaterial color={isDarkMode ? "#444444" : "#ffffff"} />
      </mesh>
      
      {/* Window light */}
      <spotLight
        position={[-4, 1.2, -1]}
        angle={0.6}
        penumbra={0.5}
        intensity={isDarkMode ? 0.3 : 1}
        color={isDarkMode ? "#8090ff" : "#ffffff"}
        distance={8}
        castShadow
      />
    </group>
  );
};

export default Window; 