export const config = {
  paths: {
    root: '/',
    dashboard: '/',
    books: '/books',
    users: '/users',
    userDetail: '/detail',
    login: '/auth/login',
    bookDetail: '/bookDetail',
    borrowedBooks: '/borrowedBooks'
  },
  colorTags: {
    success: 'Tag__success',
    info: 'Tag__info',
    warning: 'Tag__warning',
    alert: 'Tag__alert'
  },
  strapi: {
    path: 'http://localhost:1337'
  },
  toastMessage: {
    getUsersError: `No se ha podido establecer conexión con la BBDD correctamente \n`,
    getUserByIDError: `No se ha podido recuperar al información del usuario \n`,
    userRegistered: `El usuario ya está registrado, \n`,
    userRegisterSuccess: `El usuario se ha registrado correctamente \n`,
    userRegisterError: `No se ha podido registrar el usuario: \n`,
    userDeleteSuccess: `El usuario se ha eliminado correctamente \n`,
    userDeleteError: `El usuario no se ha podido eliminar \n`,
    userUpdateError: `No se ha podido actualizar la información del usuario \n`,
    userUpdateSuccess: `La información se ha actualizado correctamente \n`,
    getBooksErrors: `No hemos podido conectar con la BBDD de los libros \n`,
    loginError: `Usuario y/o contraseña incorrectos \n`,
    loginSuccess: `Usuario logado correctamente \n`,
    loginLogout: `Se ha cerrado la sesión correctamente \n`,
    saveBookSuccess: `Se ha guardado el libro correctamente \n`,
    saveBookError: `Se ha producido un error \n`,
    isbnNeeded: `Debes introducir un ISBN \n`,
    isbnNotFound: `ISBN no encontrado. Introduce los datos en el formulario \n`,
  }
};
