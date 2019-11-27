import { verify as jwtVerify } from 'jsonwebtoken';

export default (globalAppState) => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken) {
    try {
      const data = jwtVerify(jwtToken, process.env.REACT_APP_JWT_SECRET).payload;
      globalAppState.userDetails = { name: data.name, id: data._id };
      globalAppState.userAuthenticated = true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        localStorage.removeItem('jwtToken');
        // TODO: work on showing toast when expired
        globalAppState.toastDetails = {
          text: 'Your session has expired, please log in again.',
          button: 'CLOSE',
          variant: 'error'
        };
        globalAppState.showToast = true;
      } else {
        console.log(error);
      }
    }
  }
}