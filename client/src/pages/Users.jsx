import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useEmpleados } from "../context/EmpleadoContext";


function Users() {
  const { getUsers, users, deleteUser } = useUsers();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const [selectedRole, setSelectedRole] = useState("");
  const usersPerPage = 10;
  const { getEmpleado, updateEmpleado, createEmpleado, getEmpleados, empleado } =
    useEmpleados();

  useEffect(() => {
    getUsers();
    getEmpleados();
  }, []);

  const handleDeleteClick = (userId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (confirmDelete) {
      if (user.id === userId) {
        const date = new Date();
       
        deleteUser(userId);
        setTimeout(() => {
          navigate("/");
          logout();
        }, 1000);
      }
      const date = new Date();
    
      deleteUser(userId);
    }
  };

  const getEmpleadoByUserId = (userId) => {
    return empleado.find((empleado) => empleado.usuario === userId);
  };


  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedStatus || user.estado === selectedStatus) &&
      (!selectedRole ||
        user.rol.toLowerCase().includes(selectedRole.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const roles = [...new Set(users.map((user) => user.rol))];

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Usuarios
          <Link
            to="/register"
            className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        {/* Campos de búsqueda */}
        <div className="p-4 flex justify-between">
          <input
            type="text"
            placeholder="Buscar por username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg mr-2"
          />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-1/3 px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
          >
            <option value="">Ningun Rol...</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            {/* Encabezado de la tabla */}
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Apellido</th>
                <th className="py-2 text-center">Rol</th>
                <th className="py-2 text-center">Correo</th>
                <th className="py-2 text-center">Telefono</th>
                <th className="py-2 text-center">Procesos</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla */}
            <tbody>
              {currentUsers.map((place) => {
                const empleado = getEmpleadoByUserId(place.username); // Obtener el empleado relacionado
                return (
                  <tr key={place._id}>
                    <td className="text-center border border-blue-100">
                      {empleado ? empleado.nombre : "Sin datos"}
                    </td>
                    <td className="text-center border border-blue-100">
                      {empleado ? empleado.apellido : "Sin datos"}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.rol}
                    </td>
                    <td className="text-center border border-blue-100">
                    {place.email}
                    </td>
                    <td className="text-center border border-blue-100">
                      {empleado ? empleado.telefono : "Sin datos"}
                    </td>
                    <td className="flex justify-center items-center border border-blue-100">
                      <Link
                        to={`/users/${place._id}`}
                        className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Editar
                      </Link>
                      <button
                        className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                        onClick={() =>
                          handleDeleteClick(place._id, place.username)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Controles de paginación */}
          <div className="flex justify-center mt-4">
            {/* Botón para ir a la página anterior */}
            {currentPage !== 1 && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {/* Botón para ir a la página siguiente */}
            {indexOfLastUser < filteredUsers.length && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
          {/* Mostrar el total de páginas */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Página {currentPage} de {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Users;
