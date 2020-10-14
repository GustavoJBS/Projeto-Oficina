import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ClientesContext } from '../../contexts/Clientes';
import ComponenteListaClientes from '../../components/ClienteComponent'
export default function Clientes() {
  const navigation = useNavigation();
  const { clientes, carregaCliente, deletaCliente } = useContext(ClientesContext)
  function menu() {
    navigation.openDrawer()
  }
  useEffect(() => {
    carregaCliente()
  }, [])
  function deletar(data) {
    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir o cliente com cpf: ${data.cpf}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => deletesucess(data)
        }
      ]
    )
  }

  function deletesucess(data) {
    deletaCliente(data);
  }


  return (
    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bar}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={menu}>
            <Icon name="menu" color="#825845" size={40} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Lista de Clientes</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="table-account" color="#825845" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={clientes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <ComponenteListaClientes data={item} deletar={deletar} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6a28e'
  },

  bar: {
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },

})