import DataStore from '@/stores/DataStore'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import ProductsService from '@/services/ProductsService'
Vue.use(VeeValidate)

export default {
  $_veeValidate: {
    validator: 'new'
  },
    name: "FilterDrawer",
    data(){
      return {
          name: '',
          description:'',
          categories: DataStore.data.categories,
          category:'',
          price: '',
          dialog: false,
          exists: false,
          dictionary: {
            custom: {
              name: {
                  required: () => 'Name cannot be empty',
                  max: 'Maximum name length is 25'
                  // custom messages
              },
              description: {
                  required: () => 'Description cannot be empty',
                  max: 'Maximum description length is 100',
                  min: 'Min. description length is 10'
              },
              category: {
                  required: 'Category is required'
              },
              price: {
                  required: () => 'Price is required',
                  min_value: 'Min. price is 0.01',
                  decimal: 'Invalid price format'
              }
          }
      }
    }},
    methods: {
      submit () {
        this.$validator.errors.clear()
      this.$validator.validateAll().then(result => {
        if (result) {
            ProductsService.addProduct(this.name, this.description, this.category, this.price)
            .then(() => {
              this.$parent.added = true
              this.exists = false
              this.dialog = false
              this.$parent.snackbar = true
            }).catch(err =>{
              if(err.response.status === 403){
                this.exists = true
            }
        })}
      })
      },
      clear () {
        this.name = ''
        this.description = ''
        this.category = null
        this.price = ''
        this.$validator.reset()
      }
    },
    mounted () {
    this.$validator.localize('pl', this.dictionary)
  },
  }