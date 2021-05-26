import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// import Loading from '../Loading';

// import { Container } from './styles';

const AutoUpdate: React.FC = () => {
  // const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  /** Auto Update */
  useEffect(() => {
    async function updateApp(): Promise<void> {
      setMessage('Verificando atualizações, aguarde.');
      try {
        if (!__DEV__) {
          const { isAvailable } = await Updates.checkForUpdateAsync();
          if (isAvailable) {
            setMessage('Baixando nova atualização.');

            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        }
      } catch (error) {
        setMessage('Erro ao baixar atualização');
        console.log('Erro de atualização automática: ', error);
      }
      // setLoading(false);
    }

    updateApp();
  });

  // if (loading) {
  //   return <Loading>{message}</Loading>;
  // }

  return <View />;
};

export default AutoUpdate;
