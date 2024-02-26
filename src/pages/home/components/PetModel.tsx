/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

export function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html
      center
      style={{ fontSize: '8px', color: '#00000050', width: 'max-content' }}
    >
      {Math.floor(progress * 100) / 100} %{' '}
    </Html>
  );
}

export const PetModel = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url);

  const [scale, setScale] = useState<number>(0.45);
  const [position, setPosition] = useState([0, -3.2, 0]);

  useEffect(() => {
    // TODO: 나중에 크기 맞춰달라고 요청
    if (!url) return;
    const petType = url.split('/')[3];
    switch (petType) {
      case 'bear':
        setScale(0.45);
        setPosition([0, -3.2, 0]);
        break;
      case 'cat':
        setScale(0.8);
        setPosition([0, -3.5, 0]);
        break;
      case 'rabbit':
      default:
        setScale(0.7);
        setPosition([0, -4.25, 0]);
        break;
    }
  }, [url]);

  if (!url) return null;

  return (
    <mesh rotation-x={0.4}>
      <primitive object={gltf.scene} scale={scale} position={position} />
    </mesh>
  );
};
