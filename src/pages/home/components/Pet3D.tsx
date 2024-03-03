/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from 'react';
import { observer } from 'mobx-react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import { PetModel, PetModelError, PetModelLoading } from './PetModel';

interface Props {
  url?: string;
  size?: number;
  onClick?: () => void;
}

const Pet3D = ({ url, size, onClick }: Props) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  return (
    <Canvas
      ref={ref}
      style={{
        width: `${size ?? 200}px`,
        height: `${size ?? 200}px`,
      }}
      onClick={onClick}
    >
      <group dispose={null}>
        <ambientLight />
        <pointLight position={[10, 30, 40]} dispose={null} />
        <OrbitControls />
        <BlockErrorBoundary fallbackComponent={PetModelError}>
          <Suspense fallback={<PetModelLoading />}>
            <PetModel url={url} />
          </Suspense>
        </BlockErrorBoundary>
      </group>
    </Canvas>
  );
};

export default observer(Pet3D);
