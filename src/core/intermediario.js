import { Storage } from 'expo-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

//PLANTILLAS
const TBL_PRODUCTO = "producto"
const producto = {
    "codigo":"",
    "nombre":"",
    "precio_venta":"",
    "existencia":""
}

const TBL_CLIENTE = "cliente"
const cliente = {
    "ruc":"",
    "nombre":"",
    "email":""
}

const VTA_CABECERA = "vta_cabecera"
const vtaProductos = {
    "id":"",
    "fecha":"",
    "numeroFactura":"",
    "cliente":{"id":"","ruc":"","nombre":"","email":""},
    "total":"",
    "detalle":[]
}

const VTA_DETALLE = "vta_detalle"
const detalle = {
    "producto":{"codigo":"","nombre":"","precio_venta":"","existencia":""},
    "cantidad":"",
    "total":""
}
export function Controlador(tabla){
    this.clave = tabla;
    this.temporal = [];
    this.obtenerTabla = async ()=>{
        console.log(this.clave)
        let temp  = JSON.parse(await Storage.getItem({ key:`${this.clave}`}))
        this.temporal = (temp != null && temp.length > 0)? temp : [];
    }
    this.guardarTabla = async () =>{
        await Storage.setItem({key: `${this.clave}`, value:JSON.stringify(this.temporal)})
    }

    this.nuevoRegistro = (datos) => {
        datos.id=uuidv4();
        this.temporal.push(datos);
        this.guardarTabla();
    }
    this.eliminarRegistro = (id) => {
        this.temporal = temporal.filter((registro)=>{ registro.id !== id })
        this.guardarTabla();
    }

    this.obtenerRegistroUnico = (id)=> {
        registro = this.temporal.find((registro)=> { registro.id === id});
        return registro;

    }
    this.actualizarRegistro = (id,dato)=>{
        registro = this.temporal.find((registro)=> { registro.id === id});
        return registro;

    }

}
