import { createContext, useContext, useState } from "react";
import {
  createPuestoRequest,
  getPuestosRequest,
  deletePuestoRequest,
  getPuestoRequest,
  updatePuestoRequest,
} from "../api/puesto";

const PuestoContext = createContext();

export const usePuestos = () => {
  const context = useContext(PuestoContext);

  if (!context) {
    throw new Error("usePuesto must be usted within a PuestoProvider");
  }
  return context;
};

export function PuestoProvider({ children }) {
  const [puesto, setPuestos] = useState([]);

  const getPuestos = async () => {
    try {
      const res = await getPuestosRequest();
      setPuestos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPuesto = async (puesto) => {
    const res = await createPuestoRequest(puesto);
    console.log(res);
  };

  const deletePuesto = async (id) => {
    try {
      const res = await deletePuestoRequest(id);
      if (res.status == 204)
        setPuestos(puesto.filter((puesto) => puesto._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getPuesto = async (id) => {
    try {
      const res = await getPuestoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePuesto = async (id, puesto) => {
    try {
      await updatePuestoRequest(id, puesto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PuestoContext.Provider
      value={{
        puesto,
        createPuesto,
        getPuestos,
        deletePuesto,
        getPuesto,
        updatePuesto,
      }}
    >
      {children}
    </PuestoContext.Provider>
  );
}