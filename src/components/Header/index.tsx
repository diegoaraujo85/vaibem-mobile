import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import {
  BackButton,
  Container,
  ExitButton,
  HeaderTitle,
  HeaderView,
  ProfileButton,
  UserAvatar,
  UserName
} from './styles';

interface HeaderProps {
  children?: string;
}

const Header: React.FC<HeaderProps> = ({ children, ...rest }) => {
  const { user, signOut } = useAuth();
  const { navigate, goBack } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Settings');
  }, [navigate]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container {...rest}>
      <HeaderView>
        {!children ? (
          <HeaderTitle>
            Bem Vindo,{'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
        ) : (
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
            <HeaderTitle>{children}</HeaderTitle>
          </BackButton>
        )}
      </HeaderView>

      <ProfileButton onPress={navigateToProfile}>
        {user.avatar ? (
          <UserAvatar
            source={{
              uri: `data:image/gif;base64,${user.avatar}`,
            }}
          />
        ) : (
          <Icon name="camera-off" size={32} color="#999591" />
        )}
      </ProfileButton>
      <ExitButton onPress={signOut}>
        <Icon name="log-out" size={24} color="#999591" />
      </ExitButton>
    </Container>
  );
};

export default Header;
