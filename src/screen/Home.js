import * as React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { tema } from '../tema/tema'
import { Boton,CampoTitulo } from '../componentes';

export default function HomeScreen({navigation}) {

    return (
        <View style={{flex:1, backgroundColor: tema.fondo.color}}>
            <Text/>
            <Text/>
            <Text style={styles.titulo}>EXAMEN FINAL</Text>
            <View  style={styles.container}>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'AdminPacientes' }],})} > Administracion de productos</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'AdminClientes' }],})} > Administracion de clientes</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'AdminPacientes' }],})} > Registro de ventas de productos</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'ReporteVentasResumido' }],})} > Reporte de ventas resumido</Boton>
                <Boton mode="contained" onPress={() =>navigation.reset({index: 0,routes: [{ name: 'ReporteVentasDetallado' }],})} > Reporte de ventas detallado</Boton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 100,
        marginTop: 8,
    },
  });
