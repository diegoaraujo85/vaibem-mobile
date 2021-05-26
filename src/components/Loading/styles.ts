// import { Image } from 'react-native-expo-image-cache';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import presetColors from '../../../assets/styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center; 
  align-items: center;
  background: ${presetColors.primary};
`;

export const ContainerText = styled.Text`
  color: ${presetColors.text_white}; 
  font-size: 20px;
`;

export const LoadingImage = styled.Image`
  height: ${RFValue(256)}px;
  width: ${RFValue(256)}px;
  margin-bottom: ${RFValue(30)}px;
`;
