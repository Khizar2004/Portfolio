import React from 'react';
import * as THREE from 'three';

interface WallDecorProps {
  isDarkMode: boolean;
}

const WallDecor: React.FC<WallDecorProps> = ({ isDarkMode }) => {
  // Colors based on theme
  const frameColor = isDarkMode ? "#3a3a3a" : "#a87d2e";
  const innerColor = isDarkMode ? "#222222" : "#f8f8f8";
  
  return (
    <group>
      {/* First wall art - group of three simple paintings */}
      <group position={[-4.95, 1.2, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Picture frame 1 */}
        <group position={[0, 0.4, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.7, 0.05]} />
            <meshStandardMaterial 
              color={frameColor} 
              roughness={0.7} 
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.45, 0.65, 0.01]} />
            <meshStandardMaterial 
              color={innerColor} 
              roughness={0.9} 
              metalness={0.1}
              map={
                (() => {
                  const canvas = document.createElement('canvas');
                  canvas.width = 256;
                  canvas.height = 256;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    // Create abstract painting
                    ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#f5f5f5';
                    ctx.fillRect(0, 0, 256, 256);
                    
                    // Add abstract mountain shapes
                    ctx.fillStyle = isDarkMode ? '#3a5d7a' : '#7ca1bf';
                    ctx.beginPath();
                    ctx.moveTo(0, 180);
                    ctx.lineTo(90, 120);
                    ctx.lineTo(150, 150);
                    ctx.lineTo(256, 100);
                    ctx.lineTo(256, 256);
                    ctx.lineTo(0, 256);
                    ctx.fill();
                    
                    // Add second shape
                    ctx.fillStyle = isDarkMode ? '#2c3e50' : '#34495e';
                    ctx.beginPath();
                    ctx.moveTo(0, 220);
                    ctx.lineTo(80, 180);
                    ctx.lineTo(120, 200);
                    ctx.lineTo(200, 170);
                    ctx.lineTo(256, 195);
                    ctx.lineTo(256, 256);
                    ctx.lineTo(0, 256);
                    ctx.fill();
                  }
                  const texture = new THREE.CanvasTexture(canvas);
                  return texture;
                })()
              }
            />
          </mesh>
        </group>
        
        {/* Picture frame 2 */}
        <group position={[0, -0.4, 0.02]} rotation={[0, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.7, 0.05]} />
            <meshStandardMaterial 
              color={frameColor} 
              roughness={0.7} 
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.45, 0.65, 0.01]} />
            <meshStandardMaterial 
              color={innerColor} 
              roughness={0.9} 
              metalness={0.1}
              map={
                (() => {
                  const canvas = document.createElement('canvas');
                  canvas.width = 256;
                  canvas.height = 256;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    // Create abstract painting
                    ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#f5f5f5';
                    ctx.fillRect(0, 0, 256, 256);
                    
                    // Draw a simple circle
                    ctx.fillStyle = isDarkMode ? '#d35400' : '#e67e22';
                    ctx.beginPath();
                    ctx.arc(128, 128, 80, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw a smaller circle
                    ctx.fillStyle = isDarkMode ? '#e74c3c' : '#f39c12';
                    ctx.beginPath();
                    ctx.arc(128, 128, 50, 0, Math.PI * 2);
                    ctx.fill();
                  }
                  const texture = new THREE.CanvasTexture(canvas);
                  return texture;
                })()
              }
            />
          </mesh>
        </group>
      </group>
      
      {/* Second wall art - larger feature painting */}
      <group position={[0, 1.5, -1.45]} rotation={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial 
            color={frameColor} 
            roughness={0.7} 
            metalness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.15, 0.75, 0.01]} />
          <meshStandardMaterial 
            color={innerColor} 
            roughness={0.9} 
            metalness={0.1}
            map={
              (() => {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  // Create abstract landscape painting
                  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                  if (isDarkMode) {
                    gradient.addColorStop(0, '#0f2027');
                    gradient.addColorStop(0.5, '#203a43');
                    gradient.addColorStop(1, '#2c5364');
                  } else {
                    gradient.addColorStop(0, '#2980b9');
                    gradient.addColorStop(0.5, '#6dd5fa');
                    gradient.addColorStop(1, '#ffffff');
                  }
                  ctx.fillStyle = gradient;
                  ctx.fillRect(0, 0, 512, 256);
                  
                  // Draw mountains
                  ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#333333';
                  ctx.beginPath();
                  ctx.moveTo(0, 256);
                  ctx.lineTo(0, 180);
                  ctx.lineTo(100, 140);
                  ctx.lineTo(200, 190);
                  ctx.lineTo(300, 120);
                  ctx.lineTo(400, 150);
                  ctx.lineTo(512, 180);
                  ctx.lineTo(512, 256);
                  ctx.fill();
                  
                  // Draw foreground
                  ctx.fillStyle = isDarkMode ? '#0a0a0a' : '#222222';
                  ctx.beginPath();
                  ctx.moveTo(0, 256);
                  ctx.lineTo(0, 220);
                  ctx.lineTo(150, 210);
                  ctx.lineTo(300, 220);
                  ctx.lineTo(512, 210);
                  ctx.lineTo(512, 256);
                  ctx.fill();
                }
                const texture = new THREE.CanvasTexture(canvas);
                return texture;
              })()
            }
          />
        </mesh>
      </group>
      
      {/* Wall hanging macrame */}
      <group position={[4.95, 1.5, -0.3]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 1.2, 0.02]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#413c3c" : "#e5e2d9"} 
            roughness={0.9} 
            metalness={0.1}
            map={
              (() => {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 384;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  // Create macrame texture
                  ctx.fillStyle = isDarkMode ? '#333333' : '#f9f5ed';
                  ctx.fillRect(0, 0, 256, 384);
                  
                  // Draw the pattern
                  const ropeColor = isDarkMode ? '#555555' : '#d8d0c5';
                  ctx.strokeStyle = ropeColor;
                  ctx.lineWidth = 3;
                  
                  // Horizontal lines
                  for (let y = 20; y < 384; y += 40) {
                    ctx.beginPath();
                    ctx.moveTo(20, y);
                    ctx.lineTo(236, y);
                    ctx.stroke();
                  }
                  
                  // Vertical lines with pattern
                  for (let x = 20; x < 256; x += 40) {
                    ctx.beginPath();
                    ctx.moveTo(x, 20);
                    
                    let prevY = 20;
                    for (let y = 60; y < 384; y += 40) {
                      // Create zigzag patterns
                      if ((x / 40) % 2 === 0) {
                        ctx.lineTo(x + 15, prevY + 20);
                        ctx.lineTo(x, y);
                      } else {
                        ctx.lineTo(x - 15, prevY + 20);
                        ctx.lineTo(x, y);
                      }
                      prevY = y;
                    }
                    ctx.stroke();
                  }
                }
                const texture = new THREE.CanvasTexture(canvas);
                return texture;
              })()
            }
          />
        </mesh>
        
        {/* Wood hanger for macrame */}
        <mesh position={[0, 0.65, -0.03]} castShadow>
          <boxGeometry args={[0.9, 0.04, 0.04]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#3a2817" : "#8b5a2b"} 
            roughness={0.9} 
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

export default WallDecor; 