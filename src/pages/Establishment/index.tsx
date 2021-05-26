import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

// import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import api from '../../services/api';
import {
  Container,
  FilterForm,
  EstablishmentContainer,
  EstablishmentIcon,
  EstablishmentInfo,
  EstablishmentList,
  EstablishmentName,
  EstablishmentText,
  Title
} from './styles';
import { useNavigation } from '@react-navigation/core';

export interface IEstablishment {
  id: string;
  name: string;
  city: string;
  state: string;
}

const Establishment: React.FC = () => {
  const [establishments, setEstablishments] = useState<IEstablishment[]>([]);
  const [establishmentsList, setEstablishmentsList] = useState<IEstablishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const filterInputRef = useRef<TextInput>(null);
  const [filterText, setFilterText] = useState('');

  const { navigate } = useNavigation();

  const filterEstablishments = useCallback(
    text => {
      setFilterText(text);

      const filteredEstablishments = establishments.filter(establishment => {
        if (
          establishment.name.toLocaleUpperCase().search(text.toLocaleUpperCase()) >= 0 ||
          establishment.city.toLocaleUpperCase().search(text.toLocaleUpperCase()) >= 0 ||
          establishment.state.toLocaleUpperCase().search(text.toLocaleUpperCase()) >= 0
        ) {
          return establishment;
        }
      });
      setEstablishmentsList(filteredEstablishments);
    },
    [establishments],
  );

  const clearFilter = useCallback(() => {
    setEstablishmentsList(establishments);
    setFilterText('');
  }, [establishments]);

  const navigateToEdit = useCallback(
    (establishment: IEstablishment) => {
      navigate('EstablishmentEdit', { establishment });
    },
    [navigate],
  );

  const loadEstablishments = useCallback(
    async () => {
      setLoading(true);

      const response = await api.get(`/establishments`);
      setEstablishments(response.data);
      setEstablishmentsList(response.data);
      // console.log('retorno api: ', response.data);

      setLoading(false);
    },
    [],
  );

  async function refreshList(): Promise<void> {

    setRefreshing(true);

    await loadEstablishments();

    setRefreshing(false);
  }

  useEffect(() => {



    loadEstablishments();

    return function cleanup() {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />

      <EstablishmentList
        onRefresh={() => refreshList()}
        refreshing={refreshing}
        ListHeaderComponent={<Title>Estabelecimentos:</Title>}
        data={establishmentsList}
        keyExtractor={(establishment: IEstablishment) => establishment.id}
        renderItem={({ item: establishment }: { item: IEstablishment }) => (
          <EstablishmentContainer
            onPress={() => navigateToEdit(establishment)}
          >
            <EstablishmentIcon name="business" size={RFValue(24)} color="#8c837c" />
            <EstablishmentInfo>
              <EstablishmentName>{establishment.name}</EstablishmentName>
              <EstablishmentText>{establishment.city} - {establishment.state}</EstablishmentText>
            </EstablishmentInfo>
          </EstablishmentContainer>
        )}
      />
      <FilterForm
        ref={formRef}
        onSubmit={() => console.log('submit')}>
        <Input
          ref={filterInputRef}
          autoCorrect={false}
          autoCapitalize="none"
          name="filter"
          icon="filter"
          placeholder="Filtrar"
          returnKeyType="search"
          onChangeText={text => filterEstablishments(text)}
          value={filterText}
        />
        <Button
          style={{ width: 'auto', marginTop: 0, marginLeft: 4 }}
          onPress={clearFilter}
        >
          Limpar
        </Button>
      </FilterForm>
    </Container>
  );
};

export default Establishment;
