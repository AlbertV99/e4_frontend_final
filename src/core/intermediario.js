import { Storage } from 'expo-storage'
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
    "cliente":"",
    "total":"",
    "detalle":[]
}

const VTA_CABECERA = "vta_detalle"
const detalle = {
    "producto":"",
    "cantidad":"",
    "total":""
}

let Tabla = (tabla)=>{
    const clave = tabla;
    let temporal = [];
    const obtenerTabla = ()=>{
        temporal = JSON.parse(await Storage.getItem({ tabla:`${clave}`}))
    }

    const guardarTabla = () =>{
        await Storage.setItem({tabla: `${clave}`, value:JSON.stringify(temporal)})
    }

    const nuevoRegistro = (datos) => {
        datos.id=uuidv4();
        temporal.push(datos);
        this.guardarTabla();
    }
    const eliminarRegistro = (id) => {
        temporal = temporal.filter((registro)=>{ registro.id !== id })
        this.guardarTabla();
    }
    const obtenerRegistroUnico = (id)=> {
        registro = temporal.find((registro)=> { registro.id === id});
        return registro;

    }
    const actualizarRegistro = (id,dato)=>{
        registro = temporal.find((registro)=> { registro.id === id});
        return registro;

    }



}
