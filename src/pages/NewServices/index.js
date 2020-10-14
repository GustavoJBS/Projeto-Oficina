import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Picker, FlatList, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ServiçosContext } from '../../contexts/Serviços';
import { ClientesContext } from '../../contexts/Clientes';
import firebase from '../../services/firebaseConnection'
import { List } from 'react-native-paper';
import { AuthContext } from '../../contexts/auth';
console.disableYellowBox = true
export default function NewServices() {
  const [serviçoPrestado, setServiçoPrestado] = useState('')
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfoucnpj, setCpfouCnpj] = useState('');
  const [PlacadoCarro, setPlacadoCarro] = useState('');
  const [TelefonedoCliente, setTelefonedoCliente] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pago, setPago] = useState(true)
  const [valor, setValor] = useState('');
  const { user } = useContext(AuthContext);
  const { cadastraServiço } = useContext(ServiçosContext);

  const { clientes, carregaCliente } = useContext(ClientesContext)


  const navigation = useNavigation();
  function menu() {
    navigation.openDrawer()
  }
  useEffect(() => {
    carregaCliente();
  }, [])
  function cadastrar() {
    try {
      cadastraServiço(serviçoPrestado, funcionario, nomeCliente, cpfoucnpj, TelefonedoCliente, valor, pago, descricao);
      setServiçoPrestado('')
      setNomeCliente('')
      setCpfouCnpj('')
      setPlacadoCarro('')
      setTelefonedoCliente('')
      setFuncionario('')
      setValor('')
      setDescricao('')
      setPago(false)

    } catch (error) {

    }

  }





  useEffect(() => {
    if (cpfoucnpj.length >= 11) {

      firebase.database().ref(`Clientes/${user.uid}/${cpfoucnpj}`).once('value', (snapshot) => {
        try {
          setNomeCliente(snapshot.val().nomeCliente);
          setTelefonedoCliente(snapshot.val().telefoneCliente)
        } catch (error) {
          Alert.alert(
            'Cliente ainda não Cadastrado',
            `Você deseja cadastrar? `,
            [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              {
                text: 'Continuar',
                onPress: () => cadastracliente()
              }
            ]
          )
        }


      })

      function cadastracliente() {
        navigation.navigate('CadastroClientes')
      }


    } else {
      setNomeCliente('');
      setTelefonedoCliente('')
    }
  }, [cpfoucnpj])

  return (


    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bar}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={menu}>
            <Icon name="menu" color="#825845" size={40} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Cadastro de Serviços</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="briefcase-variant" color="#825845" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Serviço Prestado: </Text>
            <TextInput multiline={true} keyboardType="default"
              value={serviçoPrestado}
              onChangeText={(val) => { setServiçoPrestado(val) }} style={styles.Input} placeholder="Escreva os Serviços Prestados" />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Descreva o Serviço executado: </Text>
            <TextInput multiline={true}
              keyboardType="default"
              value={descricao}
              onChangeText={(val) => { setDescricao(val) }} style={styles.Input} placeholder="Escreva os Serviços Prestados" />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Nome do Funcionário</Text>
            <TextInput multiline={true} keyboardType="default"
              value={funcionario}
              onChangeText={(val) => { setFuncionario(val) }} style={styles.Input} placeholder="Escreva o nome do Funcionário" />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>CPF ou CNPJ do Cliente</Text>
            <TextInput multiline={true} keyboardType="default"
              maxLength={11}
              value={cpfoucnpj}
              onChangeText={(val) => { setCpfouCnpj(val) }} style={styles.Input} placeholder="Escreva o CPF ou CNPJ do Cliente" />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Nome do Cliente</Text>
            <TextInput multiline={true} keyboardType="default"
              value={nomeCliente}
              onChangeText={(val) => { setNomeCliente(val) }} style={styles.Input} placeholder="Escreva o Cpf ou CNPJ para Obter" editable={false} />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Telefone do Cliente </Text>
            <TextInput multiline={true} keyboardType="default"
              value={TelefonedoCliente}
              onChangeText={(val) => { setTelefonedoCliente(val) }} style={styles.Input} editable={false} placeholder="Escreva o Cpf ou CNPJ para Obter" />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Placa do Carro </Text>
            <TextInput multiline={true} keyboardType="default"
              value={PlacadoCarro}
              onChangeText={(val) => { setPlacadoCarro(val) }} style={styles.Input} placeholder="Escreva o Telefone do Cliente" />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Valor do Serviço</Text>
            <TextInput multiline={true} keyboardType="default"
              value={valor}
              onChangeText={(val) => { setValor(val) }} style={styles.Input} placeholder="Escreva o Valor do Serviço" />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Está Pago? </Text>

          </View>
          <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Switch style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }} value={pago} onValueChange={() => setPago(!pago)} />
          </View>

          <TouchableOpacity style={styles.btn} onPress={cadastrar}>
            <Text style={styles.btntext}>Cadastrar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View >
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
  caixaInput: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  tituloInput: {
    fontSize: 18,
    fontWeight: "bold"
  },
  Input: {
    borderBottomWidth: 1,
    color: '#000'
  },
  Inputlista: {
    borderBottomWidth: 1,
    color: '#000',
    height: 120
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

})