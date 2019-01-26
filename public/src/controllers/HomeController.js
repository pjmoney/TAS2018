import Navbar from "@/components/Navbar"

export default {
  name: "Home",
  components: {
    Navbar
  },
  methods: {
    logout: function() {
      this.$router.push({ name: "signin" });
    }
  }
};
