import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../pages/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerCustom from '../components/DrawerCustom';
import NewServices from '../pages/NewServices';
import ServiçosProvider from '../contexts/Serviços';
import CadastroClientes from '../pages/CadastroClientes';
import ClientesProvider from '../contexts/Clientes';
import Clientes from '../pages/Clientes';
import { createStackNavigator } from '@react-navigation/stack';
import Serviço from '../pages/Serviço';

export default function AppRoutes() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator()

  function DrawerMenu() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerCustom {...props} />}
        drawerContentOptions={{
          style: {

          },
          activeTintColor: '#825845',

        }}>
        <Drawer.Screen name="Serviços" component={Home}
          options={{
            title: "Serviços Prestados"
          }}
        />

        <Drawer.Screen name="novosserviços" component={NewServices}
          options={{
            title: "Cadastrar Serviços",
          }} />

        <Drawer.Screen name="CadastroClientes" component={CadastroClientes}
          options={{
            title: "Cadastro de Clientes",
          }} />
        <Drawer.Screen name="Clientes" component={Clientes}
          options={{
            title: "Lista de Clientes",
          }} />


      </Drawer.Navigator>
    )
  }
  return (
    <ServiçosProvider>
      <ClientesProvider>
        <Stack.Navigator>
          <Stack.Screen name="Serviços" component={DrawerMenu} options={{
            headerShown: false
          }} />
          <Stack.Screen name="novosserviços" component={DrawerMenu} options={{
            headerShown: false
          }} />
          <Stack.Screen name="CadastroClientes" component={DrawerMenu} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Clientes" component={DrawerMenu} options={{
            headerShown: false
          }} />
          <Stack.Screen name="PaginaServiço" component={Serviço} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </ClientesProvider>
    </ServiçosProvider>
  );

}

