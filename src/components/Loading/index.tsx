import React from 'react';

import image256 from '../../../assets/images/loading256.gif';
import { Container, LoadingImage, ContainerText } from './styles';

interface LoadingProps {
  children?: string;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  return (
    <Container>
      {/* <ActivityIndicator size="large" color={presetColors.icon_color} /> */}
      <LoadingImage source={image256} />
      <ContainerText>
        {!children ? 'Carregando, aguarde...' : children}
      </ContainerText>
    </Container>
  );
};

export default Loading;
