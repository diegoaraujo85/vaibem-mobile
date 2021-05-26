
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import * as app from '../../../app.json';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { myRelease, Release } from '../../components/Release';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Logo,
  SignInForm,
  Title,
  VersionButton,
  VersionText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { version } = app.expo;
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  // testa a API
  const getBaseUrl = useCallback(() => {
    api
      .get('/test')
      .then(response => {
        Alert.alert(
          'Info',
          `Conectado à:\n${response.config.baseURL}`,
        );
      })
      .catch(err => {
        Alert.alert('Erro ao conectar à API');
      });
  }, []);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        const formData = {
          email,
          password,
        };

        await signIn(formData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors); // passa os erros para o formulario (Unform)

          Object.values(errors).forEach(error => {
            Alert.alert('Erro', error);
          });
          return;
        }
        console.log(err);

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer logon, verifique as credenciais e tente novamente.',
        );
        return;
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

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
        <Release />
        <Container>
          <Logo source={logoImg} />

          <View>
            <Title>Faça seu logon</Title>
          </View>

          <SignInForm ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
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
              Entrar
            </Button>
          </SignInForm>

        </Container>
        <VersionButton
          onPress={() => {
            getBaseUrl();
          }}
        >
          <VersionText>{`${myRelease} release: ${version}`}</VersionText>
        </VersionButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
