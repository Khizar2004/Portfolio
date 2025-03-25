import React from 'react';
import * as THREE from 'three';

interface BookcaseShelfProps {
  isDarkMode: boolean;
}

const BookcaseShelf: React.FC<BookcaseShelfProps> = ({ isDarkMode }) => {
  // Define a set of colors for the books
  const bookColors = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', 
    '#1abc9c', '#d35400', '#c0392b', '#16a085', '#8e44ad',
    '#27ae60', '#2980b9', '#e67e22'
  ];
  
  // Function to generate random book dimensions
  const generateBookDimensions = (index: number) => ({
    width: 0.04 + Math.random() * 0.06,
    height: 0.15 + Math.random() * 0.05,
    depth: 0.08 + Math.random() * 0.03,
    color: bookColors[index % bookColors.length],
    rotation: Math.random() * 0.05 - 0.025,
  });
  
  // Generate a set of books for the shelf
  const shelfBooks = Array.from({ length: 12 }, (_, i) => generateBookDimensions(i));
  
  return (
    <group position={[-4.71, 0.5, -0.7]} rotation={[0, Math.PI / 2, 0]}>
      {/* Bookshelf structure */}
      <mesh position={[0, 0, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.2, 0.02]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Bookshelf sides */}
      {[[-0.49, 0, 0], [0.49, 0, 0]].map((pos, idx) => (
        <mesh key={`side-${idx}`} position={new THREE.Vector3(pos[0], pos[1], pos[2])} castShadow receiveShadow>
          <boxGeometry args={[0.02, 1.2, 0.3]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
            roughness={0.8} 
            metalness={0.2}
          />
        </mesh>
      ))}
      
      {/* Bookshelf shelves */}
      {[-0.58, -0.18, 0.22, 0.62].map((yPos, idx) => (
        <mesh key={`shelf-${idx}`} position={[0, yPos, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.02, 0.3]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
            roughness={0.8} 
            metalness={0.2}
          />
        </mesh>
      ))}
      
      {/* Books on shelves */}
      <group position={[-0.45, -0.48, 0]}>
        {shelfBooks.slice(0, 5).map((book, idx) => {
          const offset = shelfBooks.slice(0, idx).reduce((sum, b) => sum + b.width, 0);
          return (
            <mesh 
              key={`book1-${idx}`} 
              position={[offset + book.width/2, book.height/2, 0]} 
              rotation={[0, 0, book.rotation]}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[book.width, book.height, book.depth]} />
              <meshStandardMaterial color={book.color} roughness={0.8} metalness={0.2} />
            </mesh>
          );
        })}
      </group>
      
      <group position={[-0.45, -0.08, 0]}>
        {shelfBooks.slice(5, 8).map((book, idx) => {
          const offset = shelfBooks.slice(5, 5 + idx).reduce((sum, b) => sum + b.width, 0);
          return (
            <mesh 
              key={`book2-${idx}`} 
              position={[offset + book.width/2, book.height/2, 0]} 
              rotation={[0, 0, book.rotation]}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[book.width, book.height, book.depth]} />
              <meshStandardMaterial color={book.color} roughness={0.8} metalness={0.2} />
            </mesh>
          );
        })}
        <mesh position={[0.3, 0.05, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#cccccc" : "#f0f0f0"} 
            roughness={0.2} 
            metalness={0.8}
          />
        </mesh>
      </group>
      
      <group position={[-0.35, 0.32, 0]}>
        {shelfBooks.slice(8, 10).map((book, idx) => {
          const offset = shelfBooks.slice(8, 8 + idx).reduce((sum, b) => sum + b.width, 0);
          return (
            <mesh 
              key={`book3-${idx}`} 
              position={[offset + book.width/2, book.height/2, 0]} 
              rotation={[0, 0, book.rotation]}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[book.width, book.height, book.depth]} />
              <meshStandardMaterial color={book.color} roughness={0.8} metalness={0.2} />
            </mesh>
          );
        })}
        <group position={[0.25, 0.08, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.15, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#444444" : "#dddddd"} 
              roughness={0.5} 
              metalness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.006]} castShadow receiveShadow>
            <boxGeometry args={[0.13, 0.13, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#777777" : "#f8f8f8"} 
              roughness={0.2} 
              metalness={0.1}
            />
          </mesh>
        </group>
      </group>
      
      {/* Grounded top decorations */}
      <group position={[0, 0.63, 0]}>
        <group position={[-0.3, 0, 0]}>
          <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.06, 16]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#222222" : "#964B00"} 
              roughness={0.8} 
              metalness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#2ecc71" roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
        <group position={[0.2, 0, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.04, 16]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#333333" : "#111111"} 
              roughness={0.3} 
              metalness={0.5}
            />
          </mesh>
          <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0, 0.03, 0.08, 16]} />
            <meshStandardMaterial color="#f1c40f" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default BookcaseShelf;