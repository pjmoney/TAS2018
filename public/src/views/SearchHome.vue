<template>
  <div class="search-home">
    <h1 class="subheading grey--text">Search</h1>
    <v-container class="my-5" grid-list-lg>
      <v-layout row wrap justify-center fixed>
        <v-flex xs12 md6>
          <v-text-field color="primary"
            label="What are you looking for?"
            v-model.trim="filters.search"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md3 lg3>
          <filter-drawer @category="categoryFromChild" @price="priceFromChild" @rating="ratingFromChild" />
        </v-flex>
        <v-flex xs12 md9 lg9 class="mt-2">    
        <v-card class="mb-3 " flat v-for="item in sortedItems" :key="item.name" :to="`/product/${item._id}`">
          <v-layout row wrap :class="`pa-3 product`">
            <v-flex xs4 sm1 md1>
              <v-avatar>
                <img src="http://www.slingshot.pl/shops_plugin/img/nis.jpg">
              </v-avatar>
            </v-flex>
            <v-flex xs8 sm3 md3>
              <div class="caption grey--text">Name</div>
              <div>{{ item.name }}</div>
            </v-flex>
            <v-flex xs5 sm4 md3>
              <div class="caption grey--text">Rate</div>
              <v-rating
                  small
                  v-model="item.rate"
                  :length="5"
                  empty-icon="star_border"
                  full-icon="star"
                  half-icon="star_half"
                  half-increments
                  readonly
                  color="red lighten-1"
                  background-color="grey lighten-1"
                ></v-rating>
            </v-flex>
            <v-flex xs4 sm2 md3>
              <div class="caption grey--text">Price</div>
              <div>{{ item.price }}</div>
            </v-flex>
            <v-flex xs3 sm2 md2>
              <div class="caption grey--text">Added</div>
              <div>{{ moment(item.added).format("Do MMMM YYYY") }}</div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
        <v-layout justify-center>
          <v-pagination
            v-model="filters.page"
            :length="pages"
          ></v-pagination>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script src="@/controllers/SearchHome"/>
