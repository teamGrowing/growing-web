/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url) as GLTF;
  const [scale, setScale] = useState<number>(0.45);
  const [position, setPosition] = useState([0, -3.2, 0]);

  useEffect(() => {
    // TODO: 나중에 크기 맞춰달라고 요청
    const petType = url.split('/')[3];
    switch (petType) {
      case 'rabbit':
        setScale(0.7);
        setPosition([0, -4.25, 0]);
        break;
      case 'cat':
        setScale(0.8);
        setPosition([0, -3.5, 0]);
        break;
      case 'bear':
      default:
        setScale(0.45);
        setPosition([0, -3.2, 0]);
        break;
    }
  }, [url]);

  return (
    <mesh rotation-x={0.4}>
      <primitive object={scene} scale={scale} position={position} />
    </mesh>
  );
}

const Pet3D = ({
  url,
  size,
  onClick,
}: {
  url: string;
  size?: number;
  onClick?: () => void;
}) => {
  return (
    <Canvas
      style={{
        width: `${size ?? 200}px`,
        height: `${size ?? 200}px`,
      }}
      onClick={onClick}
    >
      <ambientLight />
      <pointLight position={[10, 30, 40]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
    </Canvas>
  );
};

export default Pet3D;
