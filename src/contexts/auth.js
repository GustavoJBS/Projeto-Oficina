import React, { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  //Faz o carregamento para a verificação se já há um user logado no App
  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));

      }
      setLoading(false);
    }

    loadStorage();
  }, [])


  //Executa o login via email
  async function SignIn(email, password) {
    setLoadingAuth(true);
    if (email.length > 0 && password.length > 0) {
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
          let uid = value.user.uid;
          await firebase.database().ref('usuarios').child(uid).once('value')
            .then((snapshot) => {
              let data = {
                uid: uid,
                nomeOficina: snapshot.val().nomeOficina,
                email: snapshot.val().email,
                endereco: snapshot.val().endereco,
                cep: snapshot.val().cep



              };
              setUser(data);
              StorageUser(data);
              setLoadingAuth(false);
            })
        })
        .catch((error) => {
          alert(error.code);
          setLoadingAuth(false);
        })
    } else {
      setLoadingAuth(false);
      alert('Digite todos os campos');
    }

  }

  //Cadastra o Usuário

  async function SignUp(email, nomeOficina, senha, confirmsenha, endereco, cep) {
    setLoadingAuth(true);
    if (senha.length > 0 && confirmsenha.length > 0 && email.length > 0 && confirmsenha === senha && nomeOficina.length > 3) {
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async (value) => {
          let uid = value.user.uid;

          await firebase.database().ref('usuarios').child(uid).set({
            nomeOficina: nomeOficina,
            email: email,
            endereco: endereco,
            cep: cep
          })
            .then(() => {
              let data = {
                uid: uid,
                nomeOficina: nomeOficina,
                email: email,
                endereco: endereco,
                cep: cep
              }
              setUser(data);
              StorageUser(data);
              setLoadingAuth(false);
              alert('Usuario Cadastrado com sucesso');
            })

        })
    } else {
      alert('Preencha todos os campos corretamente');
      setLoadingAuth(false);
    }

  }



  //Desloga o Usuário
  async function SignOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }

  //Armazena os dados do usuário localmente na váriavel Auth_user
  async function StorageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  //Retorna os objetos e as funções ao AuthProvider, onde poderá ser requisitado em outras páginas futuramente.
  return (
    <AuthContext.Provider value={{ signed: !!user, user, SignIn, SignOut, SignUp, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;