import express from 'express';
// import { Contenedor } from '../Contenedor/ContenedorFs.js';
import ContenedorProductos from '../daos/productos/productosDaoMongoDb.js'
import ContenedorCarritos from '../daos/carritos/carritosDaoMongoDb.js'
const rutaCarrito = express.Router();

const carts = new ContenedorCarritos('src/DB/carrito.txt');
const productos = new ContenedorProductos('src/DB/productos.txt');


rutaCarrito.get('/', async (req, res) => {
    const listaCarrito = await carts.getAll();
    res.json(listaCarrito); 
});

rutaCarrito.delete('/:id', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    await carts.deleteById(idCarrito);
    res.json({
        status: 'ok'
    });
});

rutaCarrito.get('/:id/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const listaProductos = await carts.getById(idCarrito);
    res.json(listaProductos.productos)
});

rutaCarrito.post('/', async (req, res) => {
    const carrito = {
        timestamp: Date.now(),
        productos: []
    };
    const id = await carts.save(carrito);
    res.json(id)
});

rutaCarrito.post('/:id/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = req.body.idProducto;
    const producto = await productos.getById(idProducto);
    const carrito = await carts.getById(idCarrito);
    carrito.productos.push(producto);
    await carts.update(idCarrito, carrito);
    res.json({
        status: 'ok'
    });
});

rutaCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    const carrito = await carts.deleteById(idCarrito);
    let indexToDelete = -1;
    carrito.productos.forEach((producto, index) => {
        if (producto.id == idProducto) {
            indexToDelete = index;
        };
    });
    if (indexToDelete => 0) {
        carrito.productos.splice(indexToDelete, 1);
    }
    await carts.update(idCarrito, carrito);
    res.json({
        status: 'ok'
    });
});

export { rutaCarrito };