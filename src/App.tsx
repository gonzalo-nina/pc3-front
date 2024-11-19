import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmbarcacionForm from './components/EmbarcacionForm';
import EmbarcacionTable from './components/EmbarcacionTable';
import { Embarcacion } from './types';

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [editingEmbarcacion, setEditingEmbarcacion] = useState<Embarcacion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmbarcaciones = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/embarcaciones', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setEmbarcaciones(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar embarcaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmbarcaciones();
  }, []);

  const handleCreate = async (embarcacion: Omit<Embarcacion, 'id'>) => {
    try {
      setLoading(true);
      await axios.post('/api/embarcaciones', embarcacion);
      fetchEmbarcaciones();
      setError('');
    } catch (err) {
      setError('Error al crear embarcación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (embarcacion: Omit<Embarcacion, 'id'>) => {
    if (!editingEmbarcacion) return;
    try {
      setLoading(true);
      await axios.put(`/api/embarcaciones/${editingEmbarcacion.id}`, embarcacion);
      fetchEmbarcaciones();
      setEditingEmbarcacion(null);
      setError('');
    } catch (err) {
      setError('Error al actualizar embarcación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Está seguro de eliminar esta embarcación?')) return;
    try {
      setLoading(true);
      await axios.delete(`/api/embarcaciones/${id}`);
      fetchEmbarcaciones();
      setError('');
    } catch (err) {
      setError('Error al eliminar embarcación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (embarcacion: Embarcacion) => {
    setEditingEmbarcacion(embarcacion);
  };

  const handleCancel = () => {
    setEditingEmbarcacion(null);
    setError('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white" >Gestión de Embarcaciones</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingEmbarcacion ? 'Editar Embarcación' : 'Nueva Embarcación'}
        </h2>

        <EmbarcacionForm
          onSubmit={editingEmbarcacion ? handleUpdate : handleCreate}
          initialData={editingEmbarcacion || undefined} // Convertir null a undefined
          onCancel={handleCancel}
        />
      </div>

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <EmbarcacionTable
          embarcaciones={embarcaciones}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;