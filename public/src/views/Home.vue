<template>
  <div id="app">
    <v-container fluid>
      <Navbar></Navbar>
    </v-container>
    <div id="content">
      <router-view/>
    </div>
    <v-footer fixed class="pa-3">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </div>
</template>

<script src="../controllers/HomeController.js"></script>