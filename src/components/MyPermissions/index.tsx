import React, { useEffect } from 'react';
import { PermissionsAndroid, View } from 'react-native';

const MyPermissions: React.FC = () => {
  // pede permissão para ler e escrever no dispositivo
  useEffect(() => {
    async function requestPermissions(): Promise<void> {
      try {

        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        granted['android.permission.READ_EXTERNAL_STORAGE']
          ? console.log('permitido ler')
          : console.log('não permitido ler');
        granted['android.permission.WRITE_EXTERNAL_STORAGE']
          ? console.log('permitido escrever')
          : console.log('não permitido escrever');

      } catch (err) {
        console.warn(err);
      }
    }

    requestPermissions();
  }, []);
  return <View />;
};

export default MyPermissions;
