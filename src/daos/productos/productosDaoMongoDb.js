import { Contenedor } from "../../Contenedor/contenedorMongoDb.js";

class ProductosDaoMemoria extends Contenedor {
    constructor() {
        super('productos', {
            title: { type: String, require: true },
            price: { type: Number, require: true },
            thumbnail: { type: String, require: true }
        });
    }
}

export default ProductosDaoMemoria;