import React from 'react';

interface WallPictureProps {
  isDarkMode: boolean;
}

const WallPicture: React.FC<WallPictureProps> = ({ isDarkMode }) => {
  return (
    <group>
      {/* Frame */}
      <mesh position={[1.2, 1.2, -1.45]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.05]} />
        <meshStandardMaterial color={isDarkMode ? "#444444" : "#8B4513"} />
      </mesh>
      
      {/* Picture */}
      <mesh position={[1.2, 1.2, -1.43]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.02]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#555555" : "#5588aa"}
        />
      </mesh>
    </group>
  );
};

export default WallPicture; 