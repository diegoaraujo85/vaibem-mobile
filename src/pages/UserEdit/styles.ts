import { Image, Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import presetColors from '../../../assets/styles/colors';

import { Form } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(30)}px ${RFValue(30)}px
    ${Platform.OS === 'android' ? RFValue(120) : RFValue(20)}px;
`;

export const Logo = styled(Image)`
  width: ${RFPercentage(50)}px;
  height: ${RFValue(120)}px;
  border-radius: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${presetColors.primary};
  margin: ${RFValue(24)}px 0 ${RFValue(24)}px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: ${RFValue(24)}px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: ${RFValue(16)}px;
`;

export const EditForm = styled(Form)`
  width: 100%;
`;

export const VersionButton = styled.TouchableOpacity``;

export const VersionText = styled.Text`
  color: #f4ede8;
  font-size: ${RFValue(12)}px;
  margin-left: auto;
  margin-right: 4px;
  margin-bottom: 4px;
`;
