export const TOKEN_KEY = "token";
export const USER = "usuario";
export const EMPRESA = "empresa";
export const FOTO = "foto";
export const IDUSER = 'id_user';
export const SETOR = 'setor';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER);
export const getIdUser = () => localStorage.getItem(IDUSER);
export const getEmpresa = () => localStorage.getItem(EMPRESA);
export const getFoto = () => localStorage.getItem(FOTO);
export const getSetor = () => localStorage.getItem(SETOR);

export const login = token => {localStorage.setItem(TOKEN_KEY, token);};
export const usuario = usuario =>{localStorage.setItem(USER, usuario);};
export const idusuario = idusuario =>{localStorage.setItem(IDUSER, idusuario);};
export const empresa = empresa =>{localStorage.setItem(EMPRESA, empresa);};
export const foto = foto =>{localStorage.setItem(FOTO, foto);};
export const setor = setor => {localStorage.setItem(SETOR, setor);};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
  localStorage.removeItem(IDUSER);
  localStorage.removeItem(EMPRESA);
  localStorage.removeItem(FOTO);
  localStorage.removeItem(SETOR);
  localStorage.clear();
};