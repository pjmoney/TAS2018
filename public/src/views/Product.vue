<template>
    <div class="product">
        <v-container class="my-5" grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 md12>
                   
                    <v-card class="mb-3 " flat>
                        <v-layout row wrap :class="`pa-3 product`">
                            <v-flex x12 md2>
                            <v-avatar>
                                <img src="http://www.slingshot.pl/shops_plugin/img/nis.jpg">
                            </v-avatar>
                            </v-flex>
                            <v-flex xs8 md3>
                                <div class="caption grey--text">Name</div>
                                <div>{{ item.name }}</div>
                            </v-flex>
                            <v-flex xs5 sm4 md3>
                            <div class="caption grey--text">Rate</div>
                                <v-rating
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
                            <v-flex xs4 sm4 md2>
                                <div class="caption grey--text">Price</div>
                                <div>{{ item.price }}$</div>
                            </v-flex>
                            <v-flex xs6 sm4 md2>
                                <div class="caption grey--text">Added</div>
                                <div>{{  moment(item.added).format("Do MMMM YYYY") }}</div>
                            </v-flex>
                            <v-flex xs12 md12>
                                <div class="caption grey--text">Description</div>
                                <div>{{ item.description }}</div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-card flat class="mb-3 pa-3" v-if="!isOwner" v-show="!commented" >
                        <v-card-title>
                            <div class="subheading grey--text">Add review</div>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 md12>
                                    <v-textarea
                                    :disabled="commented"
                                    v-model="review_description"
                                    v-validate="'required|max:100|min:12'" :counter="100"
                                    :error-messages="errors.collect('description')" data-vv-name="description"
                                     required
                                        outline
                                        flat
                                        no-resize
                                        label="Write your review..."
                                        ></v-textarea>
                                </v-flex>
                                <v-flex xs12 md10>
                                    <v-rating 
                                    :readonly="commented"
                                    v-model="review_rate"
                                    :length="5"
                                    empty-icon="star_border"
                                    full-icon="star"
                                    half-icon="star_half"
                                    half-increments
                                    hover
                                    color="red lighten-1"
                                    background-color="grey lighten-1"
                                    ></v-rating>
                                </v-flex>
                                <v-flex xs12 md2>
                                    <v-btn :disabled="commented" flat @click="addReview">
                                        Add review
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            
                        
                            
                        </v-card-text>
                    </v-card>
                                <v-flex xs12 md12 justify-start class="my-4">
                                    <div class="body-2 grey--text ">Reviews</div>
                                </v-flex>
                    
                        <v-card class="mb-3 pa-3 " flat v-for="review in sortedReviews " :key="review._id">
                             <v-layout  row wrap :class="`pa-3 review`">
                                <v-flex xs2 md1>
                                    <v-avatar size="30">
                                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png">
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs5 md9  >
                                    <div class="subheading">{{review.username}}</div>
                                </v-flex>
                                <v-flex xs4 md2 >
                                    <div>{{ moment(item.added).format("Do MMMM YYYY") }}</div>
                                </v-flex>
                                <v-flex xs12 md12>
                                    <div class="body-2 grey--text">{{review.name}}</div>
                                </v-flex>
                                <v-flex xs12 md12 align-center justify-start>
                                    <v-rating
                                        v-model="review.rate"
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
                                <v-flex xs12 md12 class="mt-3">
                                    <div class="body-2 grey--text">{{review.description}}</div>
                                </v-flex>
                             </v-layout>
                        </v-card>
                    
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar
      v-model="snackbar"
      bottom>
      Your review has been successfully added!
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
<script src="@/controllers/Product"/>