import axios from "axios";

const api = "http://localhost:3000/users/";

const UserService = {
  async getUsernameById(id){
    return await axios.get(api+id);
  },
  addUser(user) {
    return axios.post(api + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
      country: user.country
    });
  },

  signIn(user) {
    return axios.post(api + "signin", {
      email: user.email,
      password: user.password
    });
  },
  async getUserById(id) {
    return await axios.get(api + id);
  },
  updateUser(user, id) {
    return axios.put(api + id, user);
  }
}



export default UserService;