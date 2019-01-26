export default {
  name: "Navbar",
  data(){
    return {
      drawer: false,
      links: [
          { icon:'search', text: 'Search', route: '/' },
          { icon:'folder', text: 'My products', route: '/products' },
          { icon:'settings', text: 'Settings', route: '/settings' }
      ]
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push({ name: "signin" });
    }
  }
};
