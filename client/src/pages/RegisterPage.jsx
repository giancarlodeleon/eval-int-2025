import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useUsers } from "../context/UserContext";
import { useEmpleados } from "../context/EmpleadoContext";
import { usePuestos } from "../context/PuestoContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { getUser, updateUser, errors: UpdateErrors } = useUsers();
  const { getEmpleado, updateEmpleado, createEmpleado, getEmpleados, empleado } =
    useEmpleados();

  const { getPuestos, puesto } = usePuestos();

  const { signup, errors: RegisterErrors, user } = useAuth();

  const params = useParams();
  const navigate = useNavigate();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [updateRedirect, setUpdateRedirect] = useState(false);
  const { getRols, rol } = useRols();

  const password = watch("password", ""); // Observa el campo de contraseña

  useEffect(() => {
    getRols();
    getPuestos();
    getEmpleados();
  }, []);


  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
  
        if (user) {
          setValue("username", user.username);
          setValue("email", user.email);
          setValue("rol", user.rol);
          setValue("estado", user.estado);
        }

        const encontrado = empleado.find((encontrado) => encontrado.usuario === user.username);
        if (encontrado) {
          setValue("nombre", encontrado.nombre);
          setValue("apellido", encontrado.apellido);
          setValue("telefono", encontrado.telefono);
          setValue("puesto", encontrado.puesto);
          setValue("fecha_nac", encontrado.fecha_nac);
        }
      }
    }
    loadUser();
  }, [params.id]);

  useEffect(() => {
    if (redirectOnSuccess && RegisterErrors.length === 0) {
      const date = new Date();
      navigate("/users");
    }
  }, [redirectOnSuccess, RegisterErrors, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (params.id) {
        await updateUser(params.id, {
          username: values.username,
          email: values.email,
          password: values.password,
          rol: values.rol,
          estado: values.estado,
        });

        const encontrado = empleado.find((encontrado) => encontrado.usuario === user.username);
        console.log(encontrado._id)
  
        await updateEmpleado(encontrado._id, {
          nombre: values.nombre,
          apellido: values.apellido,
          telefono: values.telefono,
          puesto: values.puesto,
          fecha_nac: values.fecha_nac,
          usuario: values.username,
        });
  
        setUpdateRedirect(true);
        setTimeout(() => {
          setUpdateRedirect(false);
          navigate("/users"); 
        }, 4000);
      } else {
        await signup({
          username: values.username,
          email: values.email,
          password: values.password,
          rol: values.rol,
          estado: values.estado,
        });
  
        await createEmpleado({
          nombre: values.nombre,
          apellido: values.apellido,
          telefono: Number(values.telefono),
          puesto: values.puesto,
          fecha_nac: values.fecha_nac,
          usuario: values.username,
        });
        setRedirectOnSuccess(true);
        setTimeout(() => {
          setRedirectOnSuccess(false);
          navigate("/users");
        }, 4000);
      }
    } catch (error) {
      console.error("Error en el proceso de registro/actualización:", error);
    }
  });
  
  useEffect(() => {
    if (UpdateErrors.length === 0 && updateRedirect) {
      const date = new Date();
      navigate("/users");
    }
  }, [UpdateErrors, updateRedirect, navigate]);

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
        {UpdateErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}
        {RegisterErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}

        <h1 className="text-2xl text-white font-bold">Usuario</h1>
        <form onSubmit={onSubmit}>
          <label className="text-white">Username de usuario</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username de usuario"
          />
          {errors.username && (
            <p className="text-red-500">Username de usuario requerido</p>
          )}

          <label className="text-white">Nombre</label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.nombre && (
            <p className="text-red-500">Nombre de usuario requerido</p>
          )}

          <label className="text-white">Apellido</label>
          <input
            type="text"
            {...register("apellido", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Apellido de usuario"
          />
          {errors.apellido && (
            <p className="text-red-500">Apellido de usuario requerido</p>
          )}

          <label className="text-white">Telefono</label>
          <input
            type="number"
            {...register("telefono", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Telefono de usuario"
          />
          {errors.telefono && (
            <p className="text-red-500">Telefono de usuario requerido</p>
          )}

          <label className="text-white">Seleccione un Puesto</label>
          <select
            {...register("puesto", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione un puesto</option>
            {puesto.map((place, i) => (
              <option key={i} value={place.puesto}>
                {place.puesto}
              </option>
            ))}
          </select>
          {errors.puesto && (
            <p className="text-red-500">Debe seleccionar un Puesto</p>
          )}

          <label className="text-white">Fecha de nacimiento</label>
          <input
            type="date"
            {...register("fecha_nac", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Fecha de nacimiento"
          />
          {errors.fecha_nac && (
            <p className="text-red-500">
              Fecha de nacimiento de usuario requerido
            </p>
          )}

          <label className="text-white">Correo electronico</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electronico"
          />
          {errors.email && (
            <p className="text-red-500">Correo electronico requerido</p>
          )}

          <label className="text-white">Contrasena</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contrasena"
          />
          {errors.password && (
            <p className="text-red-500">Contrasena requerida</p>
          )}

          <label className="text-white">Confirmar Contrasena</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Confirmar Contrasena"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <label className="text-white">Seleccione un rol</label>
          <select
            {...register("rol", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione un rol</option>
            {rol.map((place, i) => (
              <option key={i} value={place.name}>
                {place.name}
              </option>
            ))}
          </select>
          {errors.rol && (
            <p className="text-red-500">Debe seleccionar un rol</p>
          )}

          <div className="flex items-center py-2">
            <label className="text-white">Estado</label>
            <input
              type="checkbox"
              {...register("estado", { value: true })}
              className="ml-2"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/users"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
