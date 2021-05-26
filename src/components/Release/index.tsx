import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

let myRelease: string;

const Release: React.FC = () => {
  const [release, setRelease] = useState('');
  useEffect(() => {
    const { releaseChannel } = Constants.manifest;

    if (releaseChannel === undefined) {
      setRelease('Dev');
    }
    if (releaseChannel) {
      if (releaseChannel.indexOf('default') !== -1) {
        // setRelease('PRODUCTION');
        setRelease('Beta');
      }
      if (releaseChannel.indexOf('test') !== -1) {
        setRelease('Test');
      }
    }
    myRelease = release;
  }, [release]);
  return <View />;
};

export { Release, myRelease };
