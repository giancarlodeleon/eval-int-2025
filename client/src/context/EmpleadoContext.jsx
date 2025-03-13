import { createContext, useContext, useState } from "react";
import {
  createEmpleadoRequest,
  getEmpleadosRequest,
  deleteEmpleadoRequest,
  getEmpleadoRequest,
  updateEmpleadoRequest,
} from "../api/empleado";

const EmpleadoContext = createContext();

export const useEmpleados = () => {
  const context = useContext(EmpleadoContext);

  if (!context) {
    throw new Error("useEmpleado must be usted within a EmpleadoProvider");
  }
  return context;
};

export function EmpleadoProvider({ children }) {
  const [empleado, setEmpleados] = useState([]);

  const getEmpleados = async () => {
    try {
      const res = await getEmpleadosRequest();
      setEmpleados(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEmpleado = async (empleado) => {
    const res = await createEmpleadoRequest(empleado);
    console.log(res);
  };

  const deleteEmpleado = async (id) => {
    try {
      const res = await deleteEmpleadoRequest(id);
      if (res.status == 204)
        setEmpleados(empleado.filter((empleado) => empleado._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getEmpleado = async (id) => {
    try {
      const res = await getEmpleadoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmpleado = async (id, empleado) => {
    try {
      await updateEmpleadoRequest(id, empleado);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmpleadoContext.Provider
      value={{
        empleado,
        createEmpleado,
        getEmpleados,
        deleteEmpleado,
        getEmpleado,
        updateEmpleado,
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  );
}