import axios from "./axios";

export const getEmpleadosRequest = () => axios.get('/empleados')

export const getEmpleadoRequest = (id) => axios.get(`/empleados/${id}`)

export const createEmpleadoRequest = (empleado) => axios.post('/empleados',empleado)

export const updateEmpleadoRequest = (id, empleado) => axios.put(`/empleados/${id}`,empleado)

export const deleteEmpleadoRequest = (id) => axios.delete(`/empleados/${id}`)