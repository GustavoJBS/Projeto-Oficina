import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../contexts/auth';
export default function DrawerCustom(props) {
  const Drawer = createDrawerNavigator();
  const { SignOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ width: '100%', height: 110, alignItems: "center", justifyContent: 'center', marginTop: 15 }}>
        <Image source={require('../../assets/Logo.png')} style={{ width: 170, height: 85, resizeMode: "contain" }} />

      </View>
      <DrawerItemList  {...props} />
      <DrawerItem {...props} label="Sair da Conta" labelStyle={{ color: 'red' }} icon={() => <Icon name="log-out" size={23} color={'red'} />} onPress={() => SignOut()} />

    </DrawerContentScrollView>
  );
}