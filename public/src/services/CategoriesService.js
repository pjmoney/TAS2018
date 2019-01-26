import axios from "axios";

const api = "http://localhost:3000/products/cat/";

const CategoriesService = {
  getProductsByCategory: function(category){
    return axios.get(api + category)
  }
}

export default CategoriesService