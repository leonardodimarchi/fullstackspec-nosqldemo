import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { Student } from './student.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "POSTGRADUATION_CLASS"
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

app.post('/students', async (req, res) => {
    try {
        const { nome, idade, curso, notas } = req.body;

        const newStudent = await Student.create({ nome, idade, curso, notas });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(400).json({ error: 'Failed to create student', details: error.message });
    }
});

app.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, curso, notas } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        if (nome === undefined || idade === undefined || curso === undefined || notas === undefined) {
            return res.status(400).json({
                error: 'PUT requires all fields: nome, idade, curso, notas'
            });
        }

        const updatedStudent = await Student.findOneAndReplace(
            { _id: id },
            { nome, idade, curso, notas },
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ error: 'Failed to update student', details: error.message });
    }
});

app.patch('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ error: 'Failed to update student', details: error.message });
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(400).json({ error: 'Failed to delete student', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});