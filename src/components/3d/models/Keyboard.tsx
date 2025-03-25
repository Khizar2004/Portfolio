import React from 'react';

const Keyboard: React.FC = () => {
  return (
    <group rotation={[-0.1, 0, 0]}>
      {/* Keyboard base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.2]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Grid of keycaps */}
      {[...Array(4)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -0.26 + col * 0.06,
              0.045,
              -0.075 + row * 0.05,
            ]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.015, 0.05]} />
            <meshStandardMaterial color="#303030" roughness={0.5} metalness={0.3} />
          </mesh>
        ))
      )}

      {/* Spacebar */}
      <mesh position={[0, 0.045, 0.1]} castShadow>
        <boxGeometry args={[0.25, 0.015, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
};

export default Keyboard; 