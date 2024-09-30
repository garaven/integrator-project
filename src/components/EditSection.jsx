import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";

const EditSection = ({ negocio, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    hora_apertura: '',
    hora_cierre: '',
    categorias: '',
  });

  useEffect(() => {
    if (negocio) {
      setFormData({
        nombre: negocio.nombre,
        descripcion: negocio.descripcion,
        whatsapp: negocio.whatsapp,
        instagram: negocio.instagram,
        facebook: negocio.facebook,
        hora_apertura: negocio.hora_apertura,
        hora_cierre: negocio.hora_cierre,
        categorias: negocio.categorias,
      });
    }
  }, [negocio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("negocios").update({
      ...formData,
    }).eq('id', negocio.id);

    if (error) {
      console.log(error);
      return;
    }

    console.log("Formulario enviado");
    onClose(); // Cierra el panel de edición
  };

  return (
    <aside className="p-6 bg-white rounded-lg border max-h-screen overflow-y-scroll">
      <h1 className="mb-6 text-3xl font-bold text-center">Editar negocio</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="text"
        />

        <label className="block mb-2 font-medium" htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          cols="30"
          rows="5"
        ></textarea>

        <label className="block mb-2 font-medium" htmlFor="whatsapp">WhatsApp</label>
        <input
          id="whatsapp"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="tel"
        />

        <label className="block mb-2 font-medium" htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
        />

        <label className="block mb-2 font-medium" htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          value={formData.facebook}
          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
        />

        <div className="flex gap-4 items-end mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium" htmlFor="hora-apertura">Hora de apertura</label>
            <input
              id="hora-apertura"
              value={formData.hora_apertura}
              onChange={(e) => setFormData({ ...formData, hora_apertura: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium" htmlFor="hora-cierre">Hora de cierre</label>
            <input
              id="hora-cierre"
              value={formData.hora_cierre}
              onChange={(e) => setFormData({ ...formData, hora_cierre: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
            />
          </div>
        </div>

        <label className="block mb-2 font-medium" htmlFor="categorias">Categorías</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4', 'Categoría 5', 'Categoría 6', 'Categoría 7', 'Categoría 8'].map((categoria, index) => (
            <span key={index} className="text-sm border border-gray-300 py-1 px-2 rounded-md inline-block">
              {categoria}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">
            Modificar
          </button>
        </div>
      </form>
    </aside>
  );
};

export default EditSection;
