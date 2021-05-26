import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import presetColors from '../../../assets/styles/colors';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(50)}px;
  background: ${presetColors.primary};
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(8)}px;

  justify-content: center;
  align-items: center;
  padding: 0 ${RFValue(16)}px;
`;

export const ButtonText = styled.Text`
  color: ${presetColors.white};
  font-size: ${RFValue(20)}px;
`;
