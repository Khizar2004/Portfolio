import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WindowProps {
  isDarkMode: boolean;
}

const Window: React.FC<WindowProps> = ({ isDarkMode }) => {
  // Create a reference for animation
  const lightRef = useRef<THREE.SpotLight>(null);
  const windowLightIntensity = isDarkMode ? 0.5 : 1.2;
  
  // Create a gentle window light animation
  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Subtle flickering effect to simulate natural light
      const flicker = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      lightRef.current.intensity = windowLightIntensity + flicker;
    }
  });
  
  // Create a texture for the window view
  const createWindowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      if (isDarkMode) {
        // Night sky
        gradient.addColorStop(0, '#0a1a2a');
        gradient.addColorStop(0.7, '#1a3a5a');
        gradient.addColorStop(1, '#2c3e50');
      } else {
        // Day sky
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.7, '#b3e0ff');
        gradient.addColorStop(1, '#d6eaff');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      if (isDarkMode) {
        // Stars for night sky
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 300;
          const size = Math.random() * 2;
          ctx.globalAlpha = Math.random() * 0.8 + 0.2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Moon
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(400, 80, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#fffae0';
        ctx.fill();
      } else {
        // Sun or sunset glow
        const sunGradient = ctx.createRadialGradient(400, 80, 0, 400, 80, 60);
        sunGradient.addColorStop(0, '#ffe066');
        sunGradient.addColorStop(0.7, '#ffa94d');
        sunGradient.addColorStop(1, 'rgba(255, 160, 60, 0)');
        
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.fillStyle = sunGradient;
        ctx.fillRect(340, 20, 120, 120);
      }
      
      // Mountains/horizon
      ctx.globalAlpha = 1;
      ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#3a8c5f';
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(100, 280);
      ctx.lineTo(200, 320);
      ctx.lineTo(300, 250);
      ctx.lineTo(400, 300);
      ctx.lineTo(512, 280);
      ctx.lineTo(512, 512);
      ctx.lineTo(0, 512);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };
  
  // Create the curtain texture
  const createCurtainTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base curtain color
      const curtainColor = isDarkMode ? '#2e2e2e' : '#e1c78f';
      ctx.fillStyle = curtainColor;
      ctx.fillRect(0, 0, 256, 512);
      
      // Curtain folds
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = isDarkMode ? '#222222' : '#d1b77f';
      
      for (let x = 20; x < 256; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 20, 0);
        ctx.lineTo(x + 20, 512);
        ctx.lineTo(x, 512);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };
  
  return (
    <group>
      {/* Window frame */}
      <mesh position={[-4.95, 1.2, -1]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.6, 2.1, 0.15]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#333333" : "#d2b48c"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>

      {/* Window glass */}
      <mesh position={[-4.9, 1.2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.5, 2, 0.02]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#1a1a2a" : "#e0f2ff"} 
          roughness={0.1} 
          metalness={0.8}
          transparent={true}
          opacity={0.9}
          map={createWindowTexture()}
          emissive={isDarkMode ? "#1a3a5a" : "#d6eaff"}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Window light */}
      <spotLight
        ref={lightRef}
        position={[-4, 1.2, -1]}
        angle={0.6}
        penumbra={0.5}
        intensity={windowLightIntensity}
        color={isDarkMode ? "#4060ff" : "#fffaed"}
        distance={10}
        castShadow
      />
      
      {/* Window inner frame dividers */}
      <mesh position={[-4.88, 1.2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c2c2c" : "#c2a479"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      <mesh position={[-4.88, 1.2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c2c2c" : "#c2a479"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Window sill */}
      <mesh position={[-4.85, 0.1, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.7, 0.1, 0.3]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#333333" : "#d2b48c"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Left curtain */}
      <mesh position={[-4.85, 1.2, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.8, 2.2]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c2c2c" : "#e1c78f"} 
          roughness={0.9} 
          metalness={0.1}
          side={THREE.DoubleSide}
          map={createCurtainTexture()}
        />
      </mesh>
      
      {/* Right curtain */}
      <mesh position={[-4.85, 1.2, -1.8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.8, 2.2]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c2c2c" : "#e1c78f"} 
          roughness={0.9} 
          metalness={0.1}
          side={THREE.DoubleSide}
          map={createCurtainTexture()}
        />
      </mesh>
      
      {/* Curtain rod */}
      <mesh position={[-4.85, 2.3, -1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.9, 8]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#333333" : "#915814"} 
          roughness={0.6} 
          metalness={0.4}
        />
      </mesh>
      
      {/* Curtain rod ends */}
      {[-0.1, -1.9].map((z, idx) => (
        <mesh key={idx} position={[-4.85, 2.3, z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#444444" : "#a56814"} 
            roughness={0.6} 
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Window; 