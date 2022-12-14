import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { tema } from '../tema/tema'
import { Controlador } from '../core/intermediario'
import { Boton,CampoSubTitulo,CampoTitulo, CampoItem, CampoTexto, Tabla } from '../componentes';
import { TextInput, SegmentedButtons,  Modal, Portal, Button, Provider, Checkbox} from 'react-native-paper';


export default function VtaProductos({navigation}) {

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
            <CampoTitulo valor="ADMINISTRADOR DE VENTAS"/>
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
                {form && <FormularioAdminProductos controlador={retControlador}></FormularioAdminProductos>}
                {tabla && <TablaAdminProductos datos={datosTabla}/>}
                {editar && <Editar/>}
            </ScrollView>

        </View>
    );
}

 function FormularioAdminProductos(){
    let controlador ={};

    const [listas,setListas] = useState({'cliente':[],'producto':[]})
    const [factura,setFactura] = useState({
        "cabecera":{
            "cliente":{},
            "fecha":"",
            "total":0
        },
        "detalle":[],
    });
    const [datosForm,setDatosForm]= useState({})
    const guardarDatos = (indice,valor)=>{
        let temp = datosForm;
        temp[indice]=valor;
        setDatosForm({...temp ,...datosForm})
    }

    const obtenerDatos= async ()=>{
        controlador =  {'cliente':new Controlador("cliente"),'producto':new Controlador("producto")};
        await controlador.cliente.obtenerTabla();
        await controlador.producto.obtenerTabla();
        setListas({'cliente':controlador.cliente.temporal,'producto':controlador.producto.temporal})
    }

    useEffect(()=>{
        obtenerDatos();
    },[])
    const enviarForm = async ()=>{
        let tempFact = factura
        var tablaControlador = new Controlador('vta_cabecera');
        await tablaControlador.obtenerTabla();
        console.log("Error asincronia");
        let clienteTemp = listas.cliente.find((registro)=>{console.log(registro.ruc,datosForm.ruc);return (registro.ruc == datosForm.ruc)})
        if(typeof clienteTemp == 'undefined'){ return "";}
        tempFact.cabecera.cliente = clienteTemp
        tempFact.cabecera.fecha = new Date();
        tempFact.cabecera.numeroFactura = datosForm.nFact;

        console.log(tempFact);
        await tablaControlador.nuevoRegistro(tempFact);
        console.log(tablaControlador.temporal)
    }
    const agregarDetalle = ()=>{
        let tempFact = factura
        let producto = listas.producto.find(
            (registro)=>{
                console.log(registro.codigo,datosForm.codigo);return (registro.codigo === datosForm.codigo)
        })
        if(typeof producto == 'undefined'){ return "";}
        tempFact.cabecera.total+=producto.precio_venta*datosForm.cantidad;
        console.log(tempFact.detalle)
        tempFact.detalle.push({"producto":producto,"cantidad":datosForm.cantidad, "total":producto.precio_venta*datosForm.cantidad});
        console.log(tempFact);
        setFactura(tempFact);
        guardarDatos("codigo","")
        guardarDatos("cantidad","")
    }

    return(
        <View style={styles.container}>
            <Text/>
            <CampoSubTitulo valor="FORMULARIO ADMINISTRADOR DE PRODUCTOS"/>
            <Text/>
            <CampoItem valor="Cliente" />
            <CampoTexto etiqueta='Ingrese el ruc del cliente' valor={datosForm.ruc} eventoChange={(valor)=>guardarDatos("ruc",valor)}/>
            <Text/>
            <CampoItem valor="N. Factura"/>
            <CampoTexto etiqueta='Ingrese el N. Fact' valor={datosForm.nFact} eventoChange={(valor)=>guardarDatos("nFact",valor)}></CampoTexto>
            <Text/>
            <Text/>
            <CampoItem valor="Producto"/>
            <CampoTexto etiqueta='Ingrese el codigo del producto ' valor={datosForm.codigo} eventoChange={(valor)=>guardarDatos("codigo",valor)}></CampoTexto>
            <Text/>
            <CampoItem valor="Cantidad"/>
            <CampoTexto etiqueta='Cantidad de productos' valor={datosForm.cantidad} eventoChange={(valor)=>guardarDatos("cantidad",valor)}></CampoTexto>
            <Text/>
            <Boton mode="contained" onPress={() =>{agregarDetalle()}} >Agregar Detalle </Boton>

            <Boton mode="contained" onPress={() =>{enviarForm()}} >Guardar</Boton>
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
