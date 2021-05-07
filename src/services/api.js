import axios from 'axios';
import { getToken, getUser, getEmpresa, getFoto, getIdUser,getSetor } from "./auth";
const api = axios.create({
    // baseURL: 'https://portalt2c.azurewebsites.net/',
    baseURL: 'http://localhost:3333/',
    
  
});

api.interceptors.request.use(async config => {
  const token = getToken();
  const usuario = getUser();
  const empresa = getEmpresa();
  const foto = getFoto();
  const idusuario = getIdUser();
  const setor = getSetor();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (usuario) {
    config.headers.Usuario = `Bearer ${usuario}`;
  }
  if (empresa) {
    config.headers.Empresa = `Bearer ${empresa}`;
  }
  if (foto) {
    config.headers.Foto = `Bearer ${foto}`;
  }
  if (idusuario) {
    config.headers.IdUsuario = `Bearer ${idusuario}`;
  }
  if(setor){
    config.headers.setor = `Bearer ${setor}`;
  }
  return config;
});

export default api;