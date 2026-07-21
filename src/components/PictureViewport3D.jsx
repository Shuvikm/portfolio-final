import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, ContactShadows, Environment } from '@react-three/drei';

function ImageBlock() {
  const texture = useTexture('/assets/images/shuvik-photo.jpg');
  const meshRef = useRef(null);

  // Subtle floating animation
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      {/* 4:5 aspect ratio, with 0.2 depth to make it a true 3D block */}
      <boxGeometry args={[2.8, 3.5, 0.2]} />
      {/* 
        Box faces array order: right, left, top, bottom, front, back
        We want the picture on the front (index 4) and back (index 5),
        and solid black/dark for the sides.
      */}
      <meshStandardMaterial attach="material-0" color="#111111" />
      <meshStandardMaterial attach="material-1" color="#111111" />
      <meshStandardMaterial attach="material-2" color="#111111" />
      <meshStandardMaterial attach="material-3" color="#111111" />
      <meshStandardMaterial attach="material-4" map={texture} roughness={0.3} metalness={0.1} />
      <meshStandardMaterial attach="material-5" map={texture} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export default function PictureViewport3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', cursor: 'grab', background: 'var(--color-bg)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <ImageBlock />
          {/* Futuristic environment lighting */}
          <Environment preset="city" />
          {/* Subtle contact shadow below the image */}
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
