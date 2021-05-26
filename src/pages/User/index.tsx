import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import api from '../../services/api';
import {
  Container,
  FilterForm,
  UserEmail,
  UserContainer,
  UserIcon,
  UserInfo,
  UserList,
  UserName,
  Title
} from './styles';
import Header from '../../components/Header';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const filterInputRef = useRef<TextInput>(null);

  const [filterText, setFilterText] = useState('');

  const { navigate } = useNavigation();

  const filterUsers = useCallback(
    text => {
      setFilterText(text);
      const filteredUsers = users.filter(user => {
        if (
          user.name.toLocaleUpperCase().search(text.toLocaleUpperCase()) >= 0 ||
          user.email.toLocaleUpperCase().search(text.toLocaleUpperCase()) >= 0
        ) {
          return user;
        }
      });
      setUsersList(filteredUsers);
    },
    [users],
  );

  const clearFilter = useCallback(() => {
    setUsersList(users);
    setFilterText('');
  }, [users]);

  const navigateToUserDetail = useCallback(
    (user: IUser) => {
      navigate('UserEdit', { user });
    },
    [navigate],
  );

  const loadUsers = useCallback(
    async () => {
      setLoading(true);

      const response = await api.get(`/users`);
      setUsers(response.data);
      setUsersList(response.data);
      // console.log('retorno api: ', response.data);

      setLoading(false);
    },
    [],
  );

  async function refreshList(): Promise<void> {

    setRefreshing(true);

    await loadUsers();

    setRefreshing(false);
  }

  // useEffect(() => {
  //   const unsubscribe = addListener('focus', refreshList);
  //   return unsubscribe;
  // }, []);

  useEffect(() => {

    loadUsers();

  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />

      <UserList
        onRefresh={() => refreshList()}
        refreshing={refreshing}
        ListHeaderComponent={<Title>Usuários:</Title>}
        data={usersList}
        keyExtractor={(user: IUser) => user.id}
        renderItem={({ item: user }: { item: IUser }) => (
          <UserContainer onPress={() => navigateToUserDetail(user)}>
            <UserIcon name="user" size={24} />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfo>
          </UserContainer>
        )}
      />
      <FilterForm ref={formRef} onSubmit={() => console.log('submit')}>
        <Input
          ref={filterInputRef}
          autoCorrect={false}
          autoCapitalize="none"
          name="filter"
          icon="filter"
          placeholder="Filtrar"
          returnKeyType="next"
          onChangeText={text => filterUsers(text)}
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

export default User;
