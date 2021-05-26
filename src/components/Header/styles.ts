import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import presetColors from '../../../assets/styles/colors';

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px;
  padding-top: ${getStatusBarHeight() + RFValue(12)}px;
  background: ${presetColors.primary};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderView = styled.View`
  max-width: ${RFValue(300)}px;
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${presetColors.text_white};
  line-height: ${RFValue(20)}px;
  margin-left: ${RFValue(16)}px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${presetColors.secondary};
  /*margin: 24px 0 24px;*/
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProfileButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${presetColors.text_white};
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ExitButton = styled.TouchableOpacity`
  margin-left: 32px;
  /* align-items: center; */
`;
