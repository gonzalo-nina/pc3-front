import React, { useState, useEffect } from 'react';
import { Embarcacion } from '../types';

interface EmbarcacionFormProps {
    onSubmit: (embarcacion: Omit<Embarcacion, 'id'>) => void;
    initialData?: Embarcacion;
    onCancel: () => void;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const initialFormState = {
        nombre: '',
        capacidad: 1,
        descripcion: '',
        fechaProgramada: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const [errors, setErrors] = useState({
        nombre: '',
        capacidad: '',
        fechaProgramada: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                capacidad: initialData.capacidad,
                descripcion: initialData.descripcion,
                fechaProgramada: initialData.fechaProgramada
            });
        }
    }, [initialData]);

    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({
            nombre: '',
            capacidad: '',
            fechaProgramada: ''
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nombre: '',
            capacidad: '',
            fechaProgramada: ''
        };

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
            isValid = false;
        }

        // Modify the capacity validation check
        if (!formData.capacidad || formData.capacidad <= 0) {
            newErrors.capacidad = 'La capacidad debe ser mayor a 0';
            isValid = false;
        }

        if (!formData.fechaProgramada) {
            newErrors.fechaProgramada = 'La fecha es requerida';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            resetForm();
        }
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-2">Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
            </div>

            <div>
                <label className="block mb-2">Capacidad:</label>
                <input
                    type="number"
                    name="capacidad"
                    value={formData.capacidad}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.capacidad && <span className="text-red-500">{errors.capacidad}</span>}
            </div>

            <div>
                <label className="block mb-2">Descripción:</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-2">Fecha Programada:</label>
                <input
                    type="date"
                    name="fechaProgramada"
                    value={formData.fechaProgramada}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.fechaProgramada && <span className="text-red-500">{errors.fechaProgramada}</span>}
            </div>

            <div className="button-group">
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {initialData ? 'Actualizar' : 'Crear'}
                </button>
                <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EmbarcacionForm;