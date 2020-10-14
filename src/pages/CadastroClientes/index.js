import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text'
import { ClientesContext } from '../../contexts/Clientes';
export default function CadastroClientes() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [pessoafisica, setPessoaFisica] = useState(true);
  const [cpfcnpj, setcpfcnpj] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('')
  const { CadastraCliente } = useContext(ClientesContext)
  const navigation = useNavigation();
  function menu() {
    navigation.openDrawer()
  }
  function cadastrarcliente() {
    try {
      CadastraCliente(nomeCliente, cpfcnpj, telefoneCliente)
      setNomeCliente('')
      setcpfcnpj('')
      setTelefoneCliente('')
    } catch (error) {
      
    }


  }

  useEffect(() => {
    setcpfcnpj('')
  }, [pessoafisica]);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bar}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={menu}>
            <Icon name="menu" color="#825845" size={40} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Cadastro de Clientes</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="smart-card" color="#825845" size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Nome do Cliente </Text>
            <TextInput multiline={true} keyboardType="default"
              value={nomeCliente}
              onChangeText={(val) => { setNomeCliente(val) }} style={styles.Input} placeholder="Escreva o Nome do Cliente" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Switch value={pessoafisica == true ? true : false} onValueChange={() => setPessoaFisica(!pessoafisica)} />
              <Text>Pessoa Fisica</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Switch value={pessoafisica == false ? true : false} onValueChange={() => setPessoaFisica(!pessoafisica)} />
              <Text>Pessoa Juridica</Text>
            </View>
          </View>
          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Digite o {pessoafisica == true ? 'Cpf' : 'Cnpj'} do cliente</Text>
            <TextInputMask
              style={styles.Input}
              placeholder={pessoafisica == true ? '999.999.999-99' : '99.999.999/9999-99'}
              type={`${pessoafisica == true ? 'cpf' : 'cnpj'}`}
              value={cpfcnpj}
              onChangeText={(val) => { setcpfcnpj(val) }}

            />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Telefone do Cliente </Text>
            <TextInputMask
              placeholder="(99) 99999-9999"
              type={"cel-phone"}
              value={telefoneCliente}
              onChangeText={(val) => { setTelefoneCliente(val) }} style={styles.Input} />
          </View>


          <TouchableOpacity style={styles.btn} onPress={cadastrarcliente}>
            <Text style={styles.btntext}>Cadastrar</Text>
          </TouchableOpacity>

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
  caixaInput: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    marginTop: 15,
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
})