import ProductsService from '@/services/ProductsService'
import UserService from '@/services/UserService'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueLodash from 'vue-lodash'
import _ from 'lodash';
import moment from 'moment'

Vue.use(VeeValidate)
const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional

export default {
    
    $_veeValidate: {
        validator: 'addReview'
      },
        name: "Product",
    data(){
        
      return{
        moment: moment,
        item:[],
        reviews: [],
        bread: [],
        isOwner: false,
        commented: false,
        review_description: '',
        review_rate: 5,
        added: false,
        snackbar: false,
        dictionary: {
            custom: {
                description: {
                    required: () => 'Description cannot be empty',
                    max: 'Maximum description length is 100',
                    min: 'Min. description length is 12'
                },
                rate: {
                    required: 'Rate is required'
                }
          }
      }
      }
    },
    props: {
        productId: {
            type: String
        }
    },
    computed: {
        sortedReviews: function () {
            return _.orderBy(this.reviews,'added','desc')
          }
      },
    watch: {
        added: function(){
            this.getItem()
            this.getReviews()
        }
    },
    methods: {
        
        getUsernameById: async function(id){
            return await UserService.getUsernameById(id)
                .then(res =>{
                    return res.data.username
                }).catch(err => {
                   return 'Anonim'
                })
        },
        getReviews: async function(){
            await ProductsService.getProductReviews(this.productId)
        .then(res => {
            this.reviews = res.data
            for(let i = 0; i < this.reviews.length; i++){
               this.getUsernameById(this.reviews[i].user_id).then(data=>{
                    this.$set(this.reviews[i], 'username',data)
                })
                
            }
            this.userHasReview(this.reviews)
            })
                    .catch(err => {
            console.log(err)
        })
        },
        getItem: function(){
            ProductsService.getById(this.productId)
            .then(res => {
                this.item = res.data
            }).catch (err => {
                console.log(err)
            })
        },
        addReview: function(){
            this.$validator.errors.clear()
            this.$validator.validateAll().then(result => {
             if (result) {
                    ProductsService.addProductReview(this.review_description, this.review_rate, this.productId)
                        .then(res => {
                            
                            this.review_description = ''
                            this.added = true
                            this.review_rate = 5
                            this.$validator.errors.clear()
                            this.snackbar = true
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })},
        userHasReview: function(reviews){
            reviews.filter((elem)=>{
                if(elem.user_id == localStorage.getItem('userId')) {
                    this.commented = true
                }})
        },
        userIsOwner: function(productId){
            ProductsService.getById(productId)
                .then(res => {
                    if(res.data.userId == localStorage.getItem('userId')){
                        this.isOwner = true
                    }
                }).catch(err => {
                    console.log('blad: ' + err)
                })
        }
           
    },
    mounted(){
        this.getItem()
        this.getReviews()
        this.userIsOwner(this.productId)
        
    },
    
        
    }
