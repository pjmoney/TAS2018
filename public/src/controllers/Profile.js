import UserStore from "@/stores/UserStore";
import UserService from "@/services/UserService";
import DataStore from "../stores/DataStore";
import VeeValidate from "vee-validate";
import Vue from "vue";

Vue.use(VeeValidate);

export default {
  data() {
    return {
      user: UserStore.data,
      username: "",
      email: "",
      isEdit: false,
      countries: DataStore.methods.getCountries(),
      dictionary: {
        custom: {
          email: {
            required: () => "E-mail is required",
            email: "E-mail is incorrect"
          },
          username: {
            required: () => "Password is required"
          }
        }
      }
    }
  },
  methods: {
    update: function() {
      UserService.updateUser(this.user, localStorage.userId).then(good => {
        this.isEdit = !this.isEdit;
      }).catch(error => {
        if (error.response.status == 402) {
          this.$validator.errors.add({
            field: "username",
            msg: "Given username is already in use"
          })
        }
        if (error.response.status == 403) {
          this.$validator.errors.add({
            field: "email",
            msg: "Given email is already in use"
          })
        }
      });
      
    },
    editProfile: function() {
      if (this.isEdit) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.update();
    
          }
        }).catch(error => {
          if (error.response.status == 402) {
            this.$validator.errors.add({
              field: "username",
              msg: "Given username is already in use"
            })
          }
          if (error.response.status == 403) {
            this.$validator.errors.add({
              field: "email",
              msg: "Given email is already in use"
            })
          }
          
        });
      } else {
        this.isEdit = !this.isEdit;
      }
    }
  },
  mounted(){
    UserService.getUserById(localStorage.userId)
      .then(res => {
        UserStore.data.username = res.data.username;
        UserStore.data.country = res.data.country;
        UserStore.data.email = res.data.email;
      })
      .catch(err => {
        console.log(err);
      });
    this.$validator.localize("pl", this.dictionary);
  }
}