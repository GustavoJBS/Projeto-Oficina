import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import api from '../../api/api';
import { AuthContext } from '../../contexts/auth';

export default function Cadastro() {

  const [nomeOficina, setNomeOficina] = useState('')
  const [cep, setCep] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setPassword] = useState('');
  const [confirmsenha, setPassword2] = useState('');
  const [endereco, setendereco] = useState('')
  const navigation = useNavigation();
  const { SignUp, loadingAuth } = useContext(AuthContext);

  async function buscacep(val) {
    setCep(val);
    if (val.length == 8) {
      try {
        const response = await api.get(`/${val}/json`);
        setendereco(response.data.logradouro)
      } catch (error) {
        alert('Esse Cep não existe')
      }

    } else {
      setendereco()
    }

  }

  function login() {
    navigation.goBack()
  }

  function cadastrar() {
    SignUp(email, nomeOficina, senha, confirmsenha, endereco, cep)
  }
  return (
    <ScrollView style={{ backgroundColor: '#b6a28e' }}>
      <View style={styles.container}>
        <View style={{ width: '90%', justifyContent: 'center' }}>
          <TouchableOpacity onPress={login} >
            <Icon name="arrow-undo-sharp" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Nome da Oficina</Text>
          <TextInput keyboardType="default"
            value={nomeOficina}
            onChangeText={(val) => { setNomeOficina(val) }} style={styles.Input} placeholder="Escreva o Nome da Oficina" />
        </View>

        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Email</Text>
          <TextInput keyboardType="default"
            value={email}
            onChangeText={(val) => { setEmail(val) }} style={styles.Input} placeholder="Escreva seu Email" />
        </View>

        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Senha</Text>
          <TextInput value={senha}
            onChangeText={(val) => { setPassword(val) }}
            secureTextEntry={true} keyboardType="default" style={styles.Input} placeholder="Escreva sua Senha" />
        </View>

        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Confirmar Senha</Text>
          <TextInput value={confirmsenha}
            onChangeText={(val) => { setPassword2(val) }}
            secureTextEntry={true} keyboardType="default" style={styles.Input} placeholder="Escreva sua Senha Novamente" />
        </View>

        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>CEP</Text>
          <TextInput keyboardType="default"
            value={cep}
            onChangeText={(val) => { buscacep(val) }} style={styles.Input} placeholder="Escreva seu CEP" />
        </View>

        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Endereço</Text>
          <TextInput keyboardType="default"
            value={endereco}
            editable={false}
            style={styles.Input}
          />
        </View>

      </View>

      <View style={styles.areabtns}>
        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
          <Text style={styles.btntext}> {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : "Cadastrar"}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
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


  caixaInput: {
    flexDirection: 'column',
    width: '90%',
    padding: 10
  },
  tituloInput: {
    fontSize: 18,
    fontWeight: "bold"
  },
  Input: {
    borderBottomWidth: 1,
    color: '#000'
  },
  btn: {
    backgroundColor: '#825845',
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '100%',
    margin: 15
  },
  btntext: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"

  },
  areabtns: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})