const express= require('express');
const route=express.Router();

const libros=require('../data/data')
const joi=require('joi');

const libroSchema=joi.object({
    titulo: joi.string().required().label('Titulo'),
    autor: joi.string().required().label('Autor')
});

//* RUTA A: get libros, devuelve lista completa de libros
route.get('/',(req,res)=>{
    try{
        res.json(libros);
    }catch (err){
        next(err);
    }
    
})

//* RUTA B: get libros/:id, devuelve libro por el id
route.get('/:id',(req, res)=>{
    try{
        const id=parseInt(req.params.id);
        const LibroId=libros.find((p)=> p.id===id);

        if(!LibroId){
            res.status(404).json({error: "No se ha encontrado el libro"});
        }else{
            res.json(LibroId);
        };
    }catch(err){
        next(err);
    }
    
})

//* POST , creacion de libro con informacion proporcionada
route.post('/',(req,res)=>{
    try{
        //* se extraer parametros del body
        const {nombre, precio}=req.body;
        
        if(!nombre || !precio){ //* condicion para verificar que nombre y precio no sean undefined
            res.status(404).json({error:"Faltas datos por enviar"});
        }else{ //* sino son undefined se realizan las insersiones de datos
                    
            const id=libros.length+1;

            const nuevoLibro={
                id,
                nombre,
                precio
            };
            //* se pushean los valores dentro del objeto de libros
            libros.push(nuevoLibro);
            res.status(201).json({libros});
        }
    }catch(err){
        next(err);
    };
})

//*PUT, actualizacion de informacion de un libro segun un id
route.put('/:id',(req,res)=>{
    try{
            const id=parseInt(req.params.id);

        const idLibro=libros.find((p)=>p.id==id)

        if(!idLibro){
            res.status(404).json({error:"no se encontro Libro con esa id"});
        }else{
            const {nombre, precio}=req.body;
            //* actualizo los valores por los nuevos enviados
            idLibro.nombre=nombre || idLibro.nombre;
            idLibro.precio=precio || idLibro.precio;

            //* envio la respuesta
            res.json(libros);
        }
    }catch(err){
        next(err);
    }
    
});

//*DELETE ,libros/id, eliminar un libro especifico segun su id
route.delete('/:id',(req,res)=>{
    try{
            const id=parseInt(req.params.id);

        const libro=libros.findIndex((p)=>p.id===id)

        if(!libro){
            res.status(404).json({error: "no se encontro el libro, y no se ha eliminado"});
        }else{
            const productoEliminado=libros.splice(libro,1)
                res.json(productoEliminado[0]);
        }
    }catch(err){
        next(err);
    };
})

module.exports=route

