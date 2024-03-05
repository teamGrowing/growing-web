/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Html, useProgress } from '@react-three/drei';
import { FallbackProps } from 'react-error-boundary';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import store from 'stores/RootStore';
import { useCoupleData, usePetData } from 'hooks/queries';
import Icon from 'components/common/Icon/Icon';

interface Props {
  url?: string;
}

export const PetModel = observer(({ url }: Props) => {
  const { userStore } = store;

  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId || '',
    options: {
      enabled: !!userStore.user?.coupleId,
    },
  });

  const { data: pet } = usePetData({
    coupleId: couple?.coupleId || '',
    petId: couple?.petId || '',
    options: {
      enabled: !!couple,
    },
  });

  const gltf = useLoader(GLTFLoader, url || (pet?.imageUrl ?? ''));

  const [scale, setScale] = useState<number>(0.45);
  const [position, setPosition] = useState([0, -3.2, 0]);

  useEffect(() => {
    // TODO: 나중에 크기 맞춰달라고 요청
    if (!pet?.imageUrl) return;
    const petType = pet?.imageUrl.split('/')[3];
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
  }, [pet?.imageUrl]);

  return (
    <mesh rotation-x={0.4}>
      <primitive object={gltf.scene} scale={scale} position={position} />
    </mesh>
  );
});

export const PetModelLoading = () => {
  const { progress } = useProgress();
  return (
    <Html
      center
      style={{ fontSize: '8px', color: '#00000050', width: 'max-content' }}
    >
      {Math.floor(progress * 100) / 100} %{' '}
    </Html>
  );
};

export const PetModelError = ({ resetErrorBoundary }: FallbackProps) => {
  return <Icon icon="IconRefresh" onClick={resetErrorBoundary} />;
};
