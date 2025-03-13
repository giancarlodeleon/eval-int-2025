import axios from "./axios";

export const getPuestosRequest = () => axios.get('/puestos')

export const getPuestoRequest = (id) => axios.get(`/puestos/${id}`)

export const createPuestoRequest = (puesto) => axios.post('/puestos',puesto)

export const updatePuestoRequest = (id, puesto) => axios.put(`/puestos/${id}`,puesto)

export const deletePuestoRequest = (id) => axios.delete(`/puestos/${id}`)