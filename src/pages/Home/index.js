import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponenteServiço from '../../components/ServiçosComponent'
import { ServiçosContext } from '../../contexts/Serviços';
import { ClientesContext } from '../../contexts/Clientes';

export default function Home() {
  const navigation = useNavigation();
  const { Serviços, carregaServiços, deletaServiço } = useContext(ServiçosContext)
  function menu() {
    navigation.openDrawer()
  }
  {/*Deletar Serviço */ }
  function deletar(data) {
    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir ${data.serviçoPrestado}`,
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

  async function deletesucess(data) {
    deletaServiço(data)
  }




  return (
    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bar}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={menu}>
            <Icon name="menu" color="#825845" size={40} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Serviços Prestados</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="piston" color="#825845" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <FlatList
            scrollEnabled={true}
            style={{ width: '100%' }}
            data={Serviços}
            keyExtractor={(item) => item.telefone}
            renderItem={({ item }) => <ComponenteServiço data={item} deletar={deletar} />
            } />
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
  }
})