import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

import presetColors from '../../../assets/styles/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  AvatarInput,
  BackButton,
  CameraIcon,
  Container,
  NoUserAvatar,
  SettingsForm,
  Title,
  UserAvatar,
  UserAvatarButton
} from './styles';

interface SettingsFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  // const docInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const newPasswordConfirmationInputRef = useRef<TextInput>(null);

  const { user, updateUser } = useAuth();

  const { goBack } = useNavigation();

  const handleSettings = useCallback(
    async (data: SettingsFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Confirmação incorreta'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { name, email, old_password, password } = data;

        const formData = {
          active: true,
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
            }
            : {}),
        };
        // console.log(formData);

        if (user.email !== email || user.name !== name || old_password) {
          const response = await api.put(`users/${user.id}`, formData);
          updateUser(response.data);
          Alert.alert('Perfil atualizado com sucesso.');

          goBack();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors); // passa os erros para o formulario (Unform)

          Object.values(errors).forEach(error => {
            Alert.alert('Erro', error);
          });

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar o perfil. Tente novamente.',
        );
        console.log(err);
      }

      setLoading(false);
    },
    [goBack, updateUser, user.email, user.id, user.name],
  );

  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await Permissions.getAsync(
  //         Permissions.MEDIA_LIBRARY,
  //       );
  //       if (status !== 'granted') {
  //         Alert.alert(
  //           'Sorry, we need camera roll permissions to make this work!',
  //         );
  //       }
  //     }
  //   })();
  // }, []);

  const handleUpdateAvatar = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      // const { uri } = result;

      try {
        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          uri: result.uri,
          name: `${user.id}.jpg`,
        });

        // data.append('name', 'Image Upload');
        // data.append('file_attachment', result.uri);

        console.log(data);

        await api.patch(`signed/avatar`, data).then(response => {
          updateUser(response.data);
          Alert.alert('Foto atualizada com sucesso.');
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors); // passa os erros para o formulario (Unform)

          Object.values(errors).forEach(error => {
            Alert.alert('Erro', error);
          });

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar o perfil. Tente novamente.',
        );
        console.log(err);
      }
    }
  }, [updateUser, user.id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <BackButton onPress={goBack}>
            <Icon
              name="chevron-left"
              size={24}
              color={presetColors.icon_color}
            />
          </BackButton>
          <UserAvatarButton onPress={handleUpdateAvatar}>
            {user.avatar ? (
              <UserAvatar
                source={{
                  // uri: user.avatar_url,
                  uri: `data:image/gif;base64,${user.avatar}`,
                }}
              />
            ) : (
              <NoUserAvatar>
                <Icon name="camera" size={60} color={presetColors.icon_color} />
              </NoUserAvatar>
            )}
          </UserAvatarButton>

          <Title>Meu perfil (ID: {user.doc})</Title>

          <SettingsForm
            initialData={user}
            ref={formRef}
            onSubmit={handleSettings}
          >
            <Input
              name="name"
              icon="user"
              placeholder="Nome de cliente"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
              editable={false}
            />
            {/* <Input
              ref={docInputRef}
              name="doc"
              icon="user-check"
              placeholder="Número de cliente"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
              // defaultValue={user.doc}
              editable={false}
            /> */}
            <Input
              ref={emailInputRef}
              // defaultValue={user.email}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              // onSubmitEditing={() => {
              //   passwordInputRef.current?.focus();
              // }}
              editable={false}
            />

            {/* <Input
              ref={passwordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                newPasswordInputRef.current?.focus();
              }}
            />
            <Input
              ref={newPasswordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordConfirmationInputRef.current?.focus();
              }}
            />
            <Input
              ref={newPasswordConfirmationInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button> */}
          </SettingsForm>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Settings;
