import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const response = await signin(data); // Llamamos a signin y esperamos la respuesta

  if (response?.includes("No es Administrador")) {
    navigate("/home"); // Redirige si el usuario no es Administrador
  }
});

  useEffect(()=>{
    if(isAuthenticated) navigate("/users")
  },[isAuthenticated])


  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-blue-900 max-w-md w-full p-10 rounded-md">
      {signinErrors.map((error, i) => (
        <div className="bg-red-500 p-2 my-1 text-white rounded-md text-center" key={i}>
          {error}
        </div>
      ))}
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo Electronico"
            
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contrasena"
             style={{ color: "white", '::placeholder': { color: 'white' } }}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button type="submit" className="text-white bg-blue-600 px-3 py-1 hover:bg-blue-500">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;