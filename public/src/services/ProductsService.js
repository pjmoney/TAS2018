import axios from "axios";

const api = "http://localhost:3000/products/";

const ProductsService = {
  getById: function(id) {
    return axios.get(api + `${id}`);
  },
  getByName: function(name) {
    return axios.get(api + "name/" + name);
  },
  getUserProducts: function() {
    let userId = localStorage.getItem('userId')
    return axios.post(api + `user/${userId}`)
  },
  getAll: function(filters) {
    return axios.get(api, {
      params: {
        filters: filters,
        perPage: 10
      }
    });
  },
  getProductReviews: function(productId) {
    return axios.get(api + '/rew/' + productId)
  },
  addProduct: function(name, description, category, price) {
    let userId = localStorage.getItem('userId')
    return axios.post(api, {
      name,
      description,
      category,
      price,
      userId
    })
  },
  addProductReview: function(description, rate, productId){
    let user_id = localStorage.getItem('userId')
    return axios.post(api + '/' +productId,{
      description,
      rate,
      user_id
    })
  }
}

export default ProductsService;
