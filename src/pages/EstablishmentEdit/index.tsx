
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
  city: string;
  state: string;
}

export interface IEstablishment {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface RouteParams {
  establishment: IEstablishment;
}

const EstablishmentEdit: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [establishmentData, setUserData] = useState<IEstablishment>();

  const formRef = useRef<FormHandles>(null);
  const cityInputRef = useRef<TextInput>(null);
  const stateInputRef = useRef<TextInput>(null);

  const { goBack } = useNavigation();

  const route = useRoute();

  const { establishment } = route.params as RouteParams;

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          state: Yup.string().required('Estado obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { city, name, state } = data;

        const formData = {
          name,
          city,
          state,
        };
        console.log("formData", formData)

        api.put(`/establishments/${establishment.id}`, formData);
        Alert.alert('Estabelecimento atualizado.\nPara atualizar,\npuxe a tela para baixo.')
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
    setUserData(establishment);

    // formRef.current?.setData(establishment);
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
      <Header>Estabelecimentos</Header>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>

          <View>
            <Title>Editar estabelecimento</Title>
          </View>

          <EditForm
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={establishmentData}
          >
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="name"
              icon="home"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                cityInputRef.current?.focus();
              }}
            />

            <Input
              ref={cityInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              name="city"
              icon="map-pin"
              placeholder="Cidade"
              returnKeyType="next"
              onSubmitEditing={() => {
                stateInputRef.current?.focus();
              }}
            />

            <Input
              ref={stateInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              name="state"
              icon="map"
              placeholder="Estado"
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

export default EstablishmentEdit;
