<template>
    <v-dialog max-width="600" v-model="dialog" persistent>
        <v-btn fixed class="mb-5" slot="activator" dark fab bottom right  color="red">
        <v-icon>add</v-icon>
        </v-btn>
        
        <v-card>
            <v-card-title>
                <h2>Add product</h2>
            </v-card-title>
            <v-card-text>
                <v-alert
                :value=exists
                color="error"
                icon="warning"
                outline
                >
                Product with given name exists!
                </v-alert>
                <v-form class="pa-4">
                    <v-flex xs12 md12>
                    <v-text-field v-validate="'required|max:25'" :counter="25" :error-messages="errors.collect('name')" data-vv-name="name" required label="Name" v-model="name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                    <v-textarea height='100' no-resize v-validate="'required|max:100|min:10'" :counter="100"
      :error-messages="errors.collect('description')" data-vv-name="description"
      required label="Description" v-model="description"></v-textarea>
                    </v-flex>
                    <v-flex xs6 md5>
                        <v-select v-validate="'required'" :error-messages="errors.collect('category')"  data-vv-name="category"
      required
                        :items="categories"
                        v-model="category"
                        :menu-props="{ maxHeight: '400' }"
                        label="Category"
                        persistent-hint
                        >
                        </v-select>
                    </v-flex>
                    <v-flex xs6 md5>
                        <v-text-field v-validate="'required|decimal:2|min_value:0.01'" :error-messages="errors.collect('price')" data-vv-name="price"
      required
                            v-model="price"
                            label="Price"
                            type="number">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6 md5>
                        <v-btn flat class="success mx-0" @click="submit">Add product</v-btn>
                    </v-flex>
                     <v-flex xs6 md5>
                        <v-btn flat class="warning mx-0" @click="dialog=!dialog">Dismiss</v-btn>
                    </v-flex>
                    
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script src="@/controllers/AddProductPopup"></script>