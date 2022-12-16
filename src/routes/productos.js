import express from 'express';
// import { Contenedor } from '../Contenedor/ContenedorFs.js';
import Contenedor from '../daos/productos/productosDaoFs.js'
export const rutaProducto = express.Router();

const productos = new Contenedor('src/db/productos.txt');

const privilegio = (req, res, next) => {
    const administrador = req.headers.administrador;
    if (administrador == 'true') {
        next();
    } else {
        res.status(401).send({ error: -1, descr: `ruta ${req.url} no autorizada`});
    }
}

rutaProducto.get('/', async (req, res) => {
    const listaProductos = await productos.getAll();
    res.json(listaProductos);
});

rutaProducto.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    res.json(producto);
});

rutaProducto.post('/', privilegio, async (req, res) => {
    const data = req.body;
    const newProducto = await productos.save(data);
    res.json(data);
});

rutaProducto.put('/:id', privilegio, async (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = req.body;
    await productos.update(idProducto, producto);
    res.json(producto);
})

rutaProducto.delete('/:id', privilegio, async (req, res) => {
    const idProducto = parseInt(req.params.id);
    await productos.deleteById(idProducto)
    res.json({
        status: 'ok'
    });
});

/* export { rutaProducto }; */