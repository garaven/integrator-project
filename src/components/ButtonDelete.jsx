import ModalDelete from "./ModalDelete";
import { useState } from "react";
// import { supabase } from "../lib/supabase";

export function ButtonDelete(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    const { data: negocio, error } = await supabase
      .from("negocios")
      .select("*")
    
    console.log(negocio);
    if (error) {
      console.error("Error deleting negocio:", error);
      alert(error.message);
    } else {
      console.log("Negocio deleted successfully");
      setModalOpen(false); // Cierra el modal después de eliminar
    }
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert("Eliminar")}
      >
        Delete
      </button>
      <ModalDelete
        isOpen={isModalOpen}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </>
  );
}