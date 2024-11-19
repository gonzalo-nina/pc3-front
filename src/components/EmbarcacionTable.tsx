import React from 'react';
import { Embarcacion } from '../types';

interface EmbarcacionTableProps {
    embarcaciones: Embarcacion[];
    onEdit: (embarcacion: Embarcacion) => void;
    onDelete: (id: number) => void;
}

const EmbarcacionTable: React.FC<EmbarcacionTableProps> = ({
    embarcaciones,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 border-b">ID</th>
                        <th className="px-6 py-3 border-b">Nombre</th>
                        <th className="px-6 py-3 border-b">Capacidad</th>
                        <th className="px-6 py-3 border-b">Descripción</th>
                        <th className="px-6 py-3 border-b">Fecha Programada</th>
                        <th className="px-6 py-3 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {embarcaciones.map((embarcacion) => (
                        <tr key={embarcacion.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{embarcacion.id}</td>
                            <td className="px-6 py-4 border-b">
                                {embarcacion.nombre || 'Sin nombre'}
                            </td>
                            <td className="px-6 py-4 border-b">
                                {embarcacion.capacidad || 'No especificada'}
                            </td>
                            <td className="px-6 py-4 border-b">
                                {embarcacion.descripcion || 'Sin descripción'}
                            </td>
                            <td className="px-6 py-4 border-b">
                                {embarcacion.fechaProgramada ? 
                                    new Date(embarcacion.fechaProgramada).toLocaleDateString('es-ES') : 
                                    'Fecha no programada'
                                }
                            </td>
                            <td className="px-6 py-4 border-b">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(embarcacion)}
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(embarcacion.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {embarcaciones.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                No hay embarcaciones disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmbarcacionTable;