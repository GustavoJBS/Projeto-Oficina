import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ComponenteListaClientes({ data, deletar }) {
  return (

    <View style={styles.areaserviço}>
      <TouchableOpacity onLongPress={() => deletar(data)}>
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textoServiço}> Nome:{data.nome}</Text>
            <Text style={styles.textoServiço}> Cpf:{data.cpf}</Text>
          </View>
          <Text style={styles.textofuncionario}> Telefone:{data.telefone}</Text>
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
  }
})

