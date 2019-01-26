import dataStore from "../stores/DataStore.js";
import Router from "../router";
import Vue from "vue";
import VeeValidate from "vee-validate";
import userService from "../services/UserService.js";

Vue.use(VeeValidate);

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        country: "",
      },
      countries: [],
      /**
       * Validation schema
       */
      dictionary: {
        custom: {
          username: {
            required: () => "Nazwa użytkownika jest wymagana",
            min: "Nazwa użytkownika musi zawierać min. 4 znaki"
          },
          email: {
            required: () => "E-mail jest wymagany",
            email: "E-mail jest niepoprawny"
          },
          password: {
            required: () => "Hasło jest wymagane",
            min: "Hasło musi zawierać min. 6 znaków"
          },
          country: {
            required: () => "Kraj jest wymagany"
          }
        }
      }
    }
},

  methods: {
    /**
     * Signup user
    */
    signUp: function () {
      this.$validator.errors.clear()
      this.$validator.validateAll().then(result => {
        if (result) {
          userService
            .addUser(this.user)
            .then(res => {
              Router.push({ name: "signin" });
            })
            .catch(error => {
              if (error.response.status == 403) {
                this.$validator.errors.add({
                  field: "email",
                  msg: "E-mail jest używany"
                })
              }
            })
        }
      })
    }
},

  mounted(){
    this.countries = dataStore.methods.getCountries();
    this.$validator.localize("pl", this.dictionary);
  }
};