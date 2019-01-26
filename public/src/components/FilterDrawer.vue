<template>
   <v-card class="pa-3" flat>
      <v-card-title primary-title>
            <div class="body-2 grey--text">Category</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-select
          :items="categories"
          v-model="category"
          :menu-props="{ maxHeight: '400' }"
          hint="Pick category"
          persistent-hint
          clearable
        ></v-select>
        <v-card-title primary-title>
            <div class="body-2 grey--text">Price</div>
      </v-card-title>
      <v-divider></v-divider>
       <v-card-text>
      <v-layout row>
        <v-flex xs12 md6
        >
          <v-text-field
            v-model="price_filter[0]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md6
        >
          <v-text-field
            v-model="price_filter[1]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="px-3">
          <v-range-slider
            v-model="price_filter"
            :max="max"
            :min="min"
          ></v-range-slider>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-title primary-title>
            <div class="body-2 grey--text">Rating</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12 md12>
            <v-rating
            v-model="rating"
            :length="length"
            empty-icon="star_border"
            full-icon="star"
            half-icon="star_half"
            half-increments
            hover
            clearable
            color="red lighten-1"
            background-color="grey lighten-1"
          ></v-rating>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

   </v-card>
</template>

<script src="@/controllers/FilterDrawer"></script>