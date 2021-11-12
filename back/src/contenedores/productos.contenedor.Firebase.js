const admin = require('firebase-admin')
const { v4: uuid4 } = require('uuid')

const db = admin.firestore()

class ContenedorCarritosFirebase {
    constructor(nombreCollection) {
        this.collections = db.collection(nombreCollection)
    }

    async findAll() {
        try {

            const produts = (await this.collections.get()).docs
            const res = produts.map(prod => {
                return {
                    id: prod.id,
                    codigo: prod.data().codigo,
                    descripcion: prod.data().descripcion,
                    foto: prod.data().foto,
                    nombre: prod.data().nombre,
                    precio: prod.data().precio,
                    foto: prod.data().foto,
                    timestamp: prod.data().timestamp

                }
            })

            return res

        } catch (error) {
            console.log('error', error);
        }
    }

    async findOneId(id) {
        try {

            const oneProd = (await this.collections.doc(id).get()).data();
            return oneProd

        } catch (error) {
            console.log('error', error);
        }
    }

    async newProduct(body) {
        try {

            const obj = await this.collections.add(body)
            const newProd = {
                id: obj.id
            }

            return newProd

        } catch (error) {
            console.log('error', error);
        }
    }

    async ModifyOneProduct(id, body) {
        try {

            const modifyProd = await this.collections.doc(id).set(body);
            return modifyProd

        } catch (error) {
            console.log('error', error);
        }
    }

    async DeleteOneProduct(id) {
        try {

            const delProd = await this.collections.doc(id).delete();
            return delProd

        } catch (error) {
            console.log('error', error);
        }
    }

}

module.exports = ContenedorCarritosFirebase;
