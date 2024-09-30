const ModalDelete = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded">
        <h2 className="text-lg">Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar esto?</p>
        <button onClick={onClose} className="mr-2">
          Cerrar
        </button>
        <button className="bg-red-500 text-white" onClick={() => { 
          alert("Eliminar");
          onClose();
        }}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
