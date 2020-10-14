import React, { useState, createContext, useEffect, useContext } from 'react'
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './auth';
export const ServiçosContext = createContext({});
export default function ServiçosProvider({ children }) {
  const [Serviços, setServiços] = useState(null);
  const { user } = useContext(AuthContext);
  function carregaServiços() {
    setServiços([])
    firebase.database().ref(`Serviços/${user.uid}`).once('value', (snapshot) => {
      snapshot.forEach((chilItem) => {
        let data = {
          key: chilItem.key,
          serviçoPrestado: chilItem.val().serviçoPrestado,
          Funcionario: chilItem.val().Funcionario,
          CpfdoCliente: chilItem.val().CpfdoCliente,
          TelefonedoCliente: chilItem.val().TelefonedoCliente,
          valor: chilItem.val().valor,
          pago: chilItem.val().pago,
          descricao: chilItem.val().descricao,
          NomedoCliente: chilItem.val().NomedoCliente
        };
        setServiços(oldarray => [...oldarray, data]);
      })
    })

  }

  function deletaServiço(data) {
    firebase.database().ref(`Serviços/${user.uid}/${data.key}`).remove();
    carregaServiços();
  }
  useEffect(() => {
    carregaServiços();
  }, []);


  function cadastraServiço(serviçoPrestado, funcionario, nomeCliente, cpfoucnpj, TelefonedoCliente, valor, pago, descricao) {
    let key = (firebase.database().ref(`Serviços/${user.uid}/${key}`).push()).key;
    firebase.database().ref(`Serviços/${user.uid}/${key}`).set({
      serviçoPrestado: serviçoPrestado,
      Funcionario: funcionario,
      NomedoCliente: nomeCliente,
      CpfdoCliente: cpfoucnpj,
      TelefonedoCliente: TelefonedoCliente,
      valor: valor,
      pago: pago,
      descricao: descricao
    })
    carregaServiços();
  }



  return (
    <ServiçosContext.Provider value={{ Serviços, carregaServiços, deletaServiço, cadastraServiço }}>
      {children}
    </ServiçosContext.Provider>
  );
}