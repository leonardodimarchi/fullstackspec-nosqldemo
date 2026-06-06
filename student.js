import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true, minlength: 2 },
    idade: { type: Number, required: true, min: 0, max: 120 },
    curso: { type: String, required: true, trim: true },
    notas: { type: [Number], default: [], validate: v => v.every(n => n >= 0 && n <= 10) }
}, { collection: 'Alunos', timestamps: true });

export const Student = mongoose.model('Aluno', studentSchema, 'Alunos');