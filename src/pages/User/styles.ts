import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import presetColors from '../../../assets/styles/colors'

import { Form } from '@unform/mobile';

import { IUser } from './index';

export const Container = styled.View`
  flex: 1;
  background: ${presetColors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${presetColors.primary};
  margin-bottom: ${RFValue(16)}px;
`;

export const UserView = styled.View``;

export const UserList = styled(FlatList as new () => FlatList<IUser>)`
  padding: ${RFValue(32)}px ${RFValue(24)}px;
`;

export const UserContainer = styled(RectButton)`
  background: ${presetColors.input_background_color};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(20)}px;
  margin-bottom: ${RFValue(16)}px;

  flex-direction: row;
  align-items: center;
`;

export const UserIcon = styled(Icon)`
  color: ${presetColors.icon_color};
`;

export const UserInfo = styled.View`
  margin-left: ${RFValue(16)}px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${presetColors.text_white};
`;

export const UserEmail = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${presetColors.text_white};
`;

export const FilterForm = styled(Form)`
  width: ${RFPercentage(37.5)}px;
  flex-direction: row;
  margin-left: ${RFValue(4)}px;
`;
