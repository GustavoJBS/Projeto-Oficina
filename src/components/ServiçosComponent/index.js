import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection'

export default function ComponenteServiço({ data, deletar }) {

  const [pago, setpago] = useState(false)
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    setpago(data.pago)
  }, [])
  {/*Inserir Na página do Serviço
     useEffect(() => {
    firebase.database().ref(`Serviços/${user.uid}/${data.key}`).update({
      pago: pago
    })
  }, [pago])
  */}

  function Serviço() {
    navigation.navigate("PaginaServiço", { data: data })
  }

  return (
    <View style={styles.areaserviço}>
      <TouchableOpacity style={{ width: '100%' }} onPress={() => Serviço()} onLongPress={() => deletar(data)}>
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textoServiço}> {data.serviçoPrestado}</Text>
            <Text style={styles.textoServiço}> R${data.valor}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.textofuncionario}> Funcionario:{data.Funcionario}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 10
  },
  areaserviço: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  textoServiço: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 45
  },
  textofuncionario: {
    fontSize: 16,
    fontWeight: '600',
    height: 45
  },
})