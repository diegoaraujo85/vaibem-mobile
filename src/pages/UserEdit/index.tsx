
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  EditForm,
  Title,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';
import Header from '../../components/Header';

interface FormData {
  name: string;
  email: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface RouteParams {
  user: IUser;
}

const UserEdit: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUser>();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const { goBack, navigate } = useNavigation();

  const route = useRoute();

  const { user } = route.params as RouteParams;

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, name } = data;

        const formData = {
          email,
          name,
        };
        // console.log(formData)

        api.put(`/users/${user.id}`, formData);
        Alert.alert('Usuário atualizado.\nPara atualizar,\npuxe a tela para baixo.')
        // navigate('User');
        goBack();

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
          'Erro na atualização',
          'Ocorreu um erro ao atualizar os dados, verifique as informações e tente novamente.',
        );
        return;
      } finally {
        setLoading(false);
      }
    },
    [],
  );


  useEffect(() => {
    setUserData(user);

    // formRef.current?.setData(user);
    setLoading(false);

  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Header>Usuários</Header>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <View>
            <Title>Editar usuário</Title>
          </View>

          <EditForm
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={userData}
          >
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
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
              Salvar
            </Button>

            <Button onPress={() => goBack()}>
              Cancelar
            </Button>
          </EditForm>

        </Container>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserEdit;
