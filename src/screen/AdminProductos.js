import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { Controlador } from '../core/intermediario'
import { Boton,CampoSubTitulo,CampoTitulo, CampoItem, CampoTexto, Tabla } from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';


export default function AdminProductos({navigation}) {
    const [form,setForm] = useState(false);
    const [editar,setEditar] = useState(false);
    const [tabla,setTabla] = useState(false);
    const [datosTabla,setDatosTabla] = useState([]);
    
    const mostrarForm = (valor)=>{ setForm(valor); if (tabla && valor){setTabla(false)};if (editar && valor){setEditar(false)}};
    const mostrarEditar = (valor)=>{ setEditar(valor); if (tabla && valor){setTabla(false)};if (form && valor ){setForm(false)}};
    const mostrarTabla = (valor)=>{ setTabla(valor); if (form && valor ){setForm(false)};if (editar && valor){setEditar(false)}};
    const [value, setValue] = useState('');
    
    
    /*CONTROLADOR */
    let tablaControlador;
    useEffect(()=>{
        //tabla.nuevoRegistro({"codigo":"a51","nombre":"martillo","precio_venta":"55000","existencia":"10"});
        tablaControlador=new Controlador("producto");
        cargarTabla();

    },[])
    async function cargarTabla(){
        await tablaControlador.obtenerTabla();
        let temp = [ ] ;
        tablaControlador.temporal.map((reg)=> { temp.push(Object.values(reg))})
        setDatosTabla(temp);
    }

    const boton = (valor)=>{
        if(valor == "nuevo"){
            mostrarForm(!form);
        }else if(valor == "panel"){
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
            <CampoTitulo valor="ADMINISTRADOR DE PRODUCTOS"/>
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
                            
                            value: 'nuevo',
                            label: 'Nuevo',
                            style:{backgroundColor:tema.colors.primario,borderColor:"white"}
                        },
                        {
                            value: 'editar',
                            label: 'Editar',
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
                {form && <FormularioAdminProductos ></FormularioAdminProductos>}
                {tabla && <TablaAdminProductos datos={datosTabla}/>}
                {editar && <Editar/>}
            </ScrollView>

        </View>
    );
}

 function FormularioAdminProductos(){
    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="FORMULARIO ADMINISTRADOR DE PRODUCTOS"/>
            <Text/>
            <CampoItem valor="Codigo"/>
            <CampoTexto etiqueta='Ingrese el codigo' />
            <Text/>
            <CampoItem valor="Nombre"/>
            <CampoTexto etiqueta='Ingrese el nombre'></CampoTexto>
            <Text/>
            <CampoItem valor="Precio de venta"/>
            <CampoTexto etiqueta='Ingrese el precio de venta '></CampoTexto>
            <Text/>
            <CampoItem valor="Existencia"/>
            <CampoTexto etiqueta='Ingrese S: si existe y N: si no existe'></CampoTexto>
            <Text/>

        </View>
    );
 }

 function TablaAdminProductos({datos}){
    const cabecera = ["Codigo","Nombre","Precio Venta","Existencia"];
    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="TABLA ADMINISTRADOR DE PRODUCTOS"/>
            <Tabla cabecera={cabecera} datos={datos}/>

        </View>
    );
 }

 function Editar(){
   
    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="EDITAR ADMINISTRADOR DE PRODUCTOS"/>

            

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
