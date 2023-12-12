const express=require('express');

const app=express();

app.use(express.json());

const route=require('./routes/libros');

const errorHandler=require('./middlewares/errorHandler')

app.use('/libros',route);

app.use(errorHandler);

const port=3000;

app.listen(port ,()=>{
    console.log(`Servidor Online en puerto ${port}`);
})
