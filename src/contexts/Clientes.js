
import React, { useState, createContext, useEffect, useContext } from 'react'
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './auth';
export const ClientesContext = createContext({});
export default function ClientesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  function CadastraCliente(nomeCliente, cpfcnpj, telefoneCliente) {
    var cpfoucnpj = cpfcnpj.replace(/([^\d])+/gim, '');
    var telefone = telefoneCliente.replace(/([^\d])+/gim, '')
    firebase.database().ref(`Clientes/${user.uid}/${cpfoucnpj}`).update({
      nomeCliente: nomeCliente,
      telefoneCliente: telefone
    }).catch(() => {
      alert('Esse Cep já existe')
    })
    carregaCliente();
  }
  function carregaCliente() {
    firebase.database().ref(`Clientes/${user.uid}`).once('value', (snapshot) => {
      setClientes([]);
      snapshot.forEach((chilItem) => {
        let data = {
          cpf: chilItem.key,
          nome: chilItem.val().nomeCliente,
          telefone: chilItem.val().telefoneCliente
        };
        setClientes(oldarray => [...oldarray, data])
      })
    })
  }


  function deletaCliente(data) {
    firebase.database().ref(`Clientes/${user.uid}/${data.cpf}`).remove()
    carregaCliente();
  }
  return (
    <ClientesContext.Provider value={{ CadastraCliente, carregaCliente, clientes, deletaCliente }}>
      {children}
    </ClientesContext.Provider>
  );
}