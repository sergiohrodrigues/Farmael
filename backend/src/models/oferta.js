import mongoose from "mongoose";

const ofertaSchema = new mongoose.Schema({
    fileNameImage: { type: String, require: true, unique: true},
    id: { type: String, require: true, unique: true},
    titulo: { type: String, require: true },
    descricao: { type: String, require: true },
    valor: { type: Number, require: true },
    categoria: { type: String, require: true }
})

export default mongoose.models.Oferta || mongoose.model('Oferta', ofertaSchema)