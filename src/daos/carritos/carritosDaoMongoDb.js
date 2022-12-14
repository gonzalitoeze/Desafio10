import { Contenedor } from "../../Contenedor/contenedorMongoDb.js";

class CarritosDaoMongoDb extends Contenedor {
    constructor() {
        super('carritos', {
            productos: {type: [], require: true},
            timestamp: {type: String, require: true}
        });
    }
}

export default CarritosDaoMongoDb;