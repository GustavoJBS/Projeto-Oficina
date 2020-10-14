import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../services/firebaseConnection'
import { AuthContext } from '../../contexts/auth';
import { ServiçosContext } from '../../contexts/Serviços';
export default function Serviço({ route }) {
  const [editando, seteditando] = useState(false);
  const [descricao, setdescricao] = useState('');
  const [Funcionario, setFuncionario] = useState('');
  const [cpfdoCliente, setCPFCliente] = useState('');
  const [NomedoCliente, setNomedoCliente] = useState('');
  const [TelefonedoCliente, setTelefonedoCliente] = useState('');
  const [ServiçoPrestado, setServiçoPrestado] = useState('');
  const [key, setKey] = useState('')
  const [valor, setValor] = useState('')
  const [pago, setPago] = useState(false)
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)
  const { carregaServiços } = useContext(ServiçosContext)
  function voltar() {
    navigation.goBack()
  }
  function SalvaEdição() {
    firebase.database().ref(`Serviços/${user.uid}/${key}`).update({
      CpfdoCliente: cpfdoCliente,
      Funcionario: Funcionario,
      NomedoCliente: NomedoCliente,
      TelefonedoCliente: TelefonedoCliente,
      descricao: descricao,
      pago: pago,
      valor: valor,
    })
    seteditando(false)
    carregaServiços()
  }

  useEffect(() => {
    setServiçoPrestado(route.params?.data.serviçoPrestado)
    setdescricao(route.params?.data.descricao)
    setFuncionario(route.params?.data.Funcionario)
    setCPFCliente(route.params?.data.CpfdoCliente)
    setNomedoCliente(route.params?.data.NomedoCliente)
    setTelefonedoCliente(route.params?.data.TelefonedoCliente)
    setKey(route.params?.data.key)
    setPago(route.params?.data.pago)
    setValor(route.params?.data.valor)

  }, [])
  /*key: chilItem.key,
            serviçoPrestado: chilItem.val().serviçoPrestado,
            Funcionario: chilItem.val().Funcionario,
            CpfdoCliente: chilItem.val().CpfdoCliente,
            TelefonedoCliente: chilItem.val().TelefonedoCliente,
            valor: chilItem.val().valor,
            pago: chilItem.val().pago,
            descricao: chilItem.val().descricao,
            NomedoCliente: chilItem.val().NomedoCliente
             */

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bar}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={voltar}>
            <Icon name="arrow-left" color="#825845" size={40} />
          </TouchableOpacity>
          <Text style={styles.titulo}>{ServiçoPrestado}</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="briefcase-variant" color="#825845" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Descrição do Serviço Prestado: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={descricao}
              onChangeText={(v) => setdescricao(v)} />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Funcionário que prestou o serviço: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={Funcionario}
              onChangeText={(v) => setFuncionario(v)} />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Valor do Serviço: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={`R$ ${parseFloat(valor).toFixed(2)}`}
            />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>CPF do Cliente: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={cpfdoCliente}
              onChangeText={(v) => setCPFCliente(v)}
            />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Nome do Cliente: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={cpfdoCliente}
              onChangeText={(v) => setCPFCliente(v)}
            />
          </View>

          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Telefone do Cliente: </Text>
            <TextInput multiline={true} keyboardType="default"
              editable={editando}
              style={styles.Input}
              placeholder="Escreva os Serviços Prestados"
              value={TelefonedoCliente}
              onChangeText={(v) => setTelefonedoCliente(v)} />
          </View>


          <View style={styles.caixaInput}>
            <Text style={styles.tituloInput}>Está Pago? </Text>
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Switch style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }} value={pago} onValueChange={() => setPago(!pago)} />
          </View>


          <TouchableOpacity style={styles.btn} onPress={() => seteditando(!editando)}>
            <Text style={styles.btntext}>Editar</Text>
          </TouchableOpacity>

          {editando && <TouchableOpacity style={styles.btn} onPress={SalvaEdição}  >
            <Text style={styles.btntext}>Salvar</Text>
          </TouchableOpacity>}

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
    color: '#000',
    fontStyle: "normal",
    padding: 15
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