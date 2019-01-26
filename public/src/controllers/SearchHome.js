import FilterDrawer from "@/components/FilterDrawer.vue";
import ProductsService from "@/services/ProductsService";
import moment from 'moment'
import VueLodash from 'vue-lodash'
import _ from 'lodash';
import Vue from 'vue'

const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional

export default {
  name: "SearchHome",
  components: {
    FilterDrawer
  },
  data() {
    return {
      moment: moment,
      items: [],
      pages: 1,
      filters: {
        page: 1,
        rating: 0,
        category: null,
        price_filter: [1, 5000],
        search: ""
      }
    };
  },
  computed: {
    sortedItems: function () {
        return _.orderBy(this.items,'added','desc')
      }
  },
  watch: {
    filters: {
      handler: function() {
        this.allProducts();
      },
      deep: true
    }
  },
  methods: {
    allProducts: function() {
      ProductsService.getAll(this.filters)
        .then(res => {
          this.items = res.data.docs;
          this.pages = res.data.pages;
          if (this.filters.page > this.pages) this.filters.page = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchProducts: function() {
      if (!this.search == "") {
        ProductsService.getByName(this.search)
          .then(res => {
            this.items = res.data;
          })
          .catch(err => {
            console.log(err);
        });
      }
    },
    getProducts: function() {
      this.items = ProductsService.getAll()
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    },
    categoryFromChild: function(value) {
      this.filters.category = value;
    },
    priceFromChild: function(value) {
      this.filters.price_filter = value;
    },
    ratingFromChild: function(value) {
      this.filters.rating = value;
    }
  },
  mounted(){
    this.allProducts();
  }
}