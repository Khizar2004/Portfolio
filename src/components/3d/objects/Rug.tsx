import React from 'react';
import * as THREE from 'three';

interface RugProps {
  isDarkMode: boolean;
}

const Rug: React.FC<RugProps> = ({ isDarkMode }) => {
  // Warm colors for the rug
  const rugBaseColor = isDarkMode ? "#3c2a2a" : "#d9a066";
  const rugPatternColor = isDarkMode ? "#302222" : "#b58451";
  const rugHighlightColor = isDarkMode ? "#483333" : "#e6c9a8";
  
  // Create a more sophisticated texture for the rug
  const createRugTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base color
      ctx.fillStyle = rugBaseColor;
      ctx.fillRect(0, 0, 512, 512);
      
      // Border pattern
      ctx.strokeStyle = rugPatternColor;
      ctx.lineWidth = 15;
      ctx.strokeRect(20, 20, 472, 472);
      
      // Inner border
      ctx.strokeStyle = rugHighlightColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(45, 45, 422, 422);
      
      // Create a Persian-inspired pattern
      const drawPattern = (x: number, y: number, size: number) => {
        // Outer diamond
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x + size/2, y);
        ctx.lineTo(x, y + size/2);
        ctx.lineTo(x - size/2, y);
        ctx.closePath();
        ctx.fillStyle = rugPatternColor;
        ctx.fill();
        
        // Inner diamond
        ctx.beginPath();
        ctx.moveTo(x, y - size/3);
        ctx.lineTo(x + size/3, y);
        ctx.lineTo(x, y + size/3);
        ctx.lineTo(x - size/3, y);
        ctx.closePath();
        ctx.fillStyle = rugHighlightColor;
        ctx.fill();
        
        // Center
        ctx.beginPath();
        ctx.arc(x, y, size/8, 0, Math.PI * 2);
        ctx.fillStyle = rugBaseColor;
        ctx.fill();
      };
      
      // Draw a grid of patterns
      const patternSize = 70;
      for (let x = 80; x < 450; x += patternSize) {
        for (let y = 80; y < 450; y += patternSize) {
          drawPattern(x, y, patternSize * 0.7);
        }
      }
      
      // Add subtle texture
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 512; i += 4) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
      }
      
      // Connect patterns with subtle lines
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      for (let x = 80; x < 450; x += patternSize) {
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, 430);
        ctx.strokeStyle = rugHighlightColor;
        ctx.stroke();
      }
      
      for (let y = 80; y < 450; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(80, y);
        ctx.lineTo(430, y);
        ctx.strokeStyle = rugHighlightColor;
        ctx.stroke();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };
  
  return (
    <mesh
      position={[0, -1.09, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[6, 4]} />
      <meshStandardMaterial
        color={rugBaseColor}
        roughness={0.9}
        metalness={0.1}
        map={createRugTexture()}
        bumpScale={0.01}
      />
    </mesh>
  );
};

export default Rug; 