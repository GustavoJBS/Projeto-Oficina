import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../../contexts/auth';
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const { SignIn, loadingAuth } = useContext(AuthContext);
  function Login() {
    SignIn(email, password)
  }

  function cadastrar() {
    navigation.navigate('Cadastro')
  }
  return (
    <ScrollView style={{ backgroundColor: '#b6a28e' }}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../assets/Logo.png')} />
        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Email</Text>
          <TextInput keyboardType="default"
            value={email}
            onChangeText={(val) => { setEmail(val) }} style={styles.Input} placeholder="Escreva seu Email" />
        </View>
        <View style={styles.caixaInput}>
          <Text style={styles.tituloInput}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={(val) => { setPassword(val) }}
            secureTextEntry={true} keyboardType="default" style={styles.Input} placeholder="Escreva sua Senha" />
        </View>

      </View>


      <View style={styles.areabtns}>
        <TouchableOpacity style={styles.btn} onPress={Login} >
          <Text style={styles.btntext}> {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : "Login"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={cadastrar} >
          <Text style={styles.btntext}>Cadastrar</Text>
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
  titulo: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  img: {
    resizeMode: "contain",
    width: 300,
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