import Router from "../router";
import Vue from "vue";
import VeeValidate from "vee-validate";
import UserService from "../services/UserService";

Vue.use(VeeValidate);

export default {
  data(){
    return {
      user: {
        email: "",
        password: ""
      },
      /**
       * Validation schema
       */
      dictionary: {
        custom: {
          email: {
            required: () => "E-mail jest wymagany",
            email: "E-mail jest niepoprawny"
          },
          password: {
            required: () => "Hasło jest wymagane"
          }
        }
      }
    }
  },

  methods: {
    /**
     * If username and password are correct sign in
     */
    signIn: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          UserService.signIn(this.user)
            .then(res => {
              localStorage.token = res.data.token;
              localStorage.userId = res.data.userId;
              localStorage.created = new Date().getTime();
              Router.push({ name: "search" });
            })
            .catch(error => {
              if (error.response.status == 401) {
                this.$validator.errors.add({
                  field: "password",
                  msg: "Incorrect email or password"
                });
                this.$validator.errors.add({
                  field: "email",
                  msg: "Incorrect email or password"
                });
              }
              if (error.response.status == 403) {
                this.$validator.errors.add({
                  field: "email",
                  msg: "Incorrect email or password"
                });
                this.$validator.errors.add({
                  field: "password",
                  msg: "Incorrect email or password"
                });
              }
            });
        }
      });
    }
  },
  mounted() {
    this.$validator.localize("pl", this.dictionary);
  },
  beforeCreate() {
    localStorage.removeItem("created");
    localStorage.removeItem("current");
  }
};
