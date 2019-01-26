<template>
  <div class="products">
    <v-breadcrumbs :items="bread">
      <v-icon slot="divider">chevron_right</v-icon>
    </v-breadcrumbs>
    <h1 class="subheading grey--text">Products</h1>
    <v-container class="my-5">
      <v-card flat v-for="item in items" :key="item.name" :to="`/product/${item._id}`">
        <v-layout row wrap :class="`pa-3 mt-2 product`">
          <v-flex xs12 md4 >
            <div class="caption grey--text">Name</div>
            <div>{{ item.name }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="caption grey--text">Rate</div>
            <v-rating
                                    v-model="item.rate"
                                    :length="5"
                                    small
                                    empty-icon="star_border"
                                    full-icon="star"
                                    half-icon="star_half"
                                    half-increments
                                    readonly
                                    color="red lighten-1"
                                    background-color="grey lighten-1"
                                    ></v-rating>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{ item.price }}</div>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Added</div>
            <div>{{ moment(item.added).format("Do MMMM YYYY") }}</div>
          </v-flex>
          
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <AddProductPopup/>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      bottom>
      Your product has been successfully added!
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script src="@/controllers/Products"/>