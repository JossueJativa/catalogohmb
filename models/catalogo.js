class Catalogo {
    constructor(id, nombre, descripcion, precio, stock, imagen, id_ingredientes) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.id_ingredientes = id_ingredientes;
    }
}

module.exports = Catalogo;