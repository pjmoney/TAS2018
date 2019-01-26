import AddProductPopup from '@/components/AddProductPopup.vue'
import ProductsService from '@/services/ProductsService'
import moment from 'moment'

export default {
  components: {
    AddProductPopup
  },
  data(){
    return{
      moment:moment,
      items: [],
      snackbar: false,
      added: false,
      bread:[
        {
          text: 'My products',
          disabled: true,
          href: 'Products'
        },
      ]
    }
  },
  watch:{
    added(newVal){
      if(newVal == true){
        this.getUserProducts()
      }
      this.added = false
    }
  },
  methods: {
    getUserProducts: function() {
      this.items = ProductsService.getUserProducts()
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted(){
    this.getUserProducts();
  }
};
