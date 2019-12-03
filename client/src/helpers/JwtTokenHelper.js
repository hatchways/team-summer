import { verify as jwtVerify } from 'jsonwebtoken';

export default (globalAppState) => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken) {
    try {
      const data = jwtVerify(jwtToken, process.env.REACT_APP_JWT_SECRET).payload;
      globalAppState.userDetails = { name: data.name, id: data._id, avatar: data.profilePic, location: data.location, about: data.about };
      globalAppState.userAuthenticated = true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        localStorage.removeItem('jwtToken');
        // TODO: work on showing toast when expired
      } else {
        console.log(error);
      }
    }
  }
}