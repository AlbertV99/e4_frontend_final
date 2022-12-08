import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen,
  AdminProductos,
    AdminClientes,
    ReporteVentasResumido,
    ReporteVentasDetallado
} from './src/screen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AdminProductos" component={AdminProductos} options={{headerShown: false}} />
        <Stack.Screen name="AdminClientes" component={AdminClientes} options={{headerShown: false}} />
        <Stack.Screen name="ReporteVentasResumido" component={ReporteVentasResumido} options={{headerShown: false}} />
        <Stack.Screen name="ReporteVentasDetallado" component={ReporteVentasDetallado} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
