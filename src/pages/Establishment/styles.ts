import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import presetColors from '../../../assets/styles/colors'

import { Form } from '@unform/mobile';

import { IEstablishment } from './index';

export const Container = styled.View`
  flex: 1;
  background: ${presetColors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${presetColors.primary};
  margin-bottom: ${RFValue(16)}px;
`;

export const EstablishmentList = styled(FlatList as new () => FlatList<IEstablishment>)`
  padding: ${RFValue(32)}px ${RFValue(24)}px;
  flex: 1;
`;

export const EstablishmentContainer = styled(RectButton)`
  background: ${presetColors.input_background_color};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(20)}px;
  margin-bottom: ${RFValue(16)}px;

  flex-direction: row;
  align-items: center;
`;

export const EstablishmentIcon = styled(Icon)`
  color: ${presetColors.icon_color};
`;

export const EstablishmentInfo = styled.View`
  margin-left: ${RFValue(16)}px;
`;

export const EstablishmentName = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${presetColors.text_white};
`;

export const EstablishmentText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${presetColors.text_white};
`;

export const FilterForm = styled(Form)`
  width: ${RFPercentage(37.5)}px;
  flex-direction: row;
  margin-left: ${RFValue(4)}px;
`;
