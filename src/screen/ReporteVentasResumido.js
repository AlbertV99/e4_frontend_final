import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { Controlador } from '../core/intermediario'
import { Boton,CampoSubTitulo,CampoTitulo, CampoItem, CampoTexto, Tabla } from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';


export default function ReporteVentasResumido({navigation}) {
    
    const [form,setForm] = useState(false);
    const [editar,setEditar] = useState(false);
    const [tabla,setTabla] = useState(false);
    const [datosTabla,setDatosTabla] = useState([]);
    const [value, setValue] = useState('');

    const mostrarTabla = (valor)=>{ setTabla(valor); if (form && valor ){setForm(false)};if (editar && valor){setEditar(false)}};

    let tablaControlador;
    useEffect(()=>{
        //tabla.nuevoRegistro({"codigo":"a51","nombre":"martillo","precio_venta":"55000","existencia":"10"});
        tablaControlador=new Controlador("vta_cabecera");
        cargarTabla();

    },[])
    async function cargarTabla(){
        await tablaControlador.obtenerTabla();
        let temp = [ ] ;
        tablaControlador.temporal.map((reg)=> { temp.push(Object.values(reg))})
        setDatosTabla(temp);
    }
    const retControlador= () => {
        return tablaControlador;
    }

    const boton = (valor)=>{
        if(valor == "panel"){
            mostrarTabla(!tabla);
        }else if(valor == "editar"){
            mostrarEditar(!editar);
        }else if(valor == "volver"){
            navigation.reset({ index: 0, routes: [{ name: 'Home' }], });
        }
    }

    return (
        <View style={{flex:1, backgroundColor: tema.fondo.color}}>
            <Text/>
            <Text/>
            <CampoTitulo valor="REPORTE VENTAS RESUMIDO"/>
            <Text/>
            <View style={styles.button}>
                <SegmentedButtons
                    value={value}

                    onValueChange={boton}
                    buttons={[
                        {
                            value: 'panel',
                            label: 'Lista',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                        {
                            value: 'volver',
                            label: 'Volver',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                    ]}
                    />
            </View>
            <Text></Text>
            <ScrollView>
                {tabla && <TablaReporteResumido  />}
            </ScrollView>

        </View>
    );
}



 function TablaReporteResumido(){

    const [datosTabla,setDatosTabla] = useState([]);
    var tablaControlador;

    useEffect(()=>{
        tablaControlador=new Controlador("vta_cabecera");
        cargarTabla();
    },[])
   async function cargarTabla(){
       await tablaControlador.obtenerTabla();
       let temp = [ ] ;
       console.log(tablaControlador.temporal[0])
       tablaControlador.temporal.map((reg)=> {
           let tempReg = {
               "fecha":reg.cabecera.fecha,
               "factura":reg.cabecera.numeroFactura,
               "cliente":reg.cabecera.cliente.nombre,
               "ruc":reg.cabecera.cliente.ruc,
               "total":reg.cabecera.total,
           };
           console.log(tempReg,"Test")
           temp.push(Object.values(tempReg));
       })
       setDatosTabla(temp);
   }
 
   const cabecera = ["Cliente","Fecha","Total Venta","Factura"];
   const [visibleFiltro, setVisibleFiltro] = useState(false);
    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="TABLA REPORTE VENTAS RESUMIDO"/>
            <Boton mode="contained" onPress={()=>setVisibleFiltro(!visibleFiltro)}>
                Filtrar           
            </Boton>
            <Text/>
            {visibleFiltro && <View onDismiss={()=>{setVisibleFiltro(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 20,position:'absolute',top:0}}>
                <CampoItem valor="Cliente"/>
                <CampoTexto etiqueta="ingrese el cliente" />
                <Text/>
                <CampoItem valor="Fecha Desde"/>
                <CampoTexto etiqueta='Ingrese la fecha desde' />
                <Text/>
                <CampoItem valor="Fecha Hasta"/>
                <CampoTexto etiqueta='Ingrese la fecha hasta' />
                <Text/>
                <Boton mode="contained" >
                    Guardar
                </Boton>
            </View>}  
            <Tabla cabecera={cabecera} datos={datosTabla}/>
        </View>
    );
 }


const styles = StyleSheet.create({
    container:{
        paddingLeft: 10,
    },
    observacion: {
        height: 50,
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button:{
        flexDirection: 'column',
        alignItems: 'center'
    },
});
