import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { Boton,CampoSubTitulo,CampoTitulo, CampoItem, CampoTexto, Tabla } from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';


export default function ReporteVentasDetallado({navigation}) {
    
    const [form,setForm] = useState(false);
    const [editar,setEditar] = useState(false);
    const [tabla,setTabla] = useState(false);
    const [datosTabla,setDatosTabla] = useState([]);
    const [value, setValue] = useState('');

    const mostrarTabla = (valor)=>{ setTabla(valor); if (form && valor ){setForm(false)};if (editar && valor){setEditar(false)}};

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
            <CampoTitulo valor="REPORTE VENTAS DETALLADO"/>
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
                {tabla && <TablaReporteDetallado  datos={datosTabla}/>}
            </ScrollView>

        </View>
    );
}



 function TablaReporteDetallado({datos}){

    var tablaControlador;
    const [datosForm,setDatosForm]= useState({});
    const [datosTabla,setDatosTabla] = useState([]);
    const [visibleFiltro, setVisibleFiltro] = useState(false);
    const cabecera = ["Cliente","Fecha","Producto","Cantidad", "Total Detalle", "Id"];

    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor
        setDatosForm({...temp ,...datosForm})
    }

    async function cargarTabla(){
        await tablaControlador.obtenerTabla();
        let temp = [ ] ;

        tablaControlador.temporal.map((reg)=> { 
            if(datosForm.producto !=  reg.nombre){
                return ''
            }else if((datosForm.fecha_desde > reg.fecha) &&( datosForm.fecha_hasta < reg.fecha)){
                return ''
            }
            temp.push(Object.values(reg))})
            setDatosTabla(temp);
    }



    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="TABLA REPORTE VENTAS DETALLADO"/>
            <Boton mode="contained" onPress={()=>setVisibleFiltro(!visibleFiltro)}>
                Filtrar           
            </Boton>
            <Text/>
            {visibleFiltro && <View onDismiss={()=>{setVisibleFiltro(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 20,position:'absolute',top:0}}>
                <CampoItem valor="Producto"/>
                <CampoTexto etiqueta="ingrese el Producto" valor={datosForm.producto} eventoChange={(valor)=>guardarDatos("producto",valor)}/>
                <Text/>
                <CampoItem valor="Fecha Desde"/>
                <CampoTexto etiqueta='Ingrese la fecha desde' valor={datosForm.fecha_desde} eventoChange={(valor)=>guardarDatos("fecha_desde",valor)}/>
                <Text/>
                <CampoItem valor="Fecha Hasta"/>
                <CampoTexto etiqueta='Ingrese la fecha hasta' valor={datosForm.fecha_hasta} eventoChange={(valor)=>guardarDatos("fecha_hasta",valor)}/>
                <Text/>
                <Boton mode="contained" onPress={() =>{cargarTabla()}} >
                    Enviar
                </Boton>
            </View>}
            <Text/>
            <Tabla cabecera={cabecera} datos={datos}/>
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
