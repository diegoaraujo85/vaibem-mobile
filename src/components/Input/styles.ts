import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

import presetColors from '../../../assets/styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${RFValue(50)}px;
  padding: 0 ${RFValue(16)}px; /* top, bottom = 0 - left, right = 16px */
  background: ${presetColors.input_background_color};
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(8)}px;

  border-width: ${RFValue(2.5)}px;
  border-color: ${presetColors.input_border_color};

  ${props =>
    props.isErrored &&
    css`
      border-color: ${presetColors.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${presetColors.secondary};
    `}

  flex-direction: row;
  align-items: center;
`;

export const CustomTextInput = styled.TextInput`
  flex: 1;
  color: ${presetColors.input_text_color};
  font-size: ${RFValue(18)}px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: ${RFValue(16)}px;
`;
