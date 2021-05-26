import { Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import presetColors from '../../../assets/styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  /* width: 100%; */
  /* align-items: center; */
  padding: 0 ${RFValue(30)}px;
  /* ${Platform.OS === 'android' ? RFValue(120) : RFValue(20)}px; */
`;

export const BackButton = styled.TouchableOpacity`
  /* position: absolute;
  left: 24px;
  top: 64px; */
  margin-top: ${RFValue(24)}px;
  /* margin-bottom: 64px; */
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${presetColors.secondary};
  margin: ${RFValue(16)}px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: ${RFValue(16)}px;
  /* margin-top: ${RFValue(64)}px; */
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(156)}px;
  height: ${RFValue(156)}px;
  border-radius: ${RFValue(78)}px;
  align-self: center;
`;

export const NoUserAvatar = styled.View`
  width: ${RFValue(156)}px;
  height: ${RFValue(156)}px;
  border-radius: ${RFValue(78)}px;
  align-self: center;
  /* background: #f00; */
  justify-content: center;
  align-items: center;
`;

export const CameraIcon = styled(Icon)`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  color: ${presetColors.text_white};
`;

export const SettingsForm = styled(Form)`
  width: 100%;
  /* padding: 0 ${RFValue(24)}px; */
`;
