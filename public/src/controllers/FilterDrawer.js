import DataStore from '@/stores/DataStore'
export default {
  name: "FilterDrawer",
  data(){
    return {
      category: "",
      categories: DataStore.data.categories,
      price_filter: [1, 5000],
      max: 5000,
      min: 1,
      length: 5,
      rating: 0
    };
  },
  watch:{
    category: function() {
      this.$emit("category", this.category);
    },
    price_filter: function() {
      this.$emit("price", this.price_filter);
    },
    rating: function() {
      this.$emit("rating", this.rating);
    }
  }
};
