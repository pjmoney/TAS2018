<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar gray>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editProfile">
            <v-icon v-show="!isEdit">edit</v-icon>
            <v-icon v-show="isEdit">done</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form>
          <v-list two-line subheader>
            <v-subheader>Personal details
            </v-subheader>
      
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                <v-divider></v-divider>                           
                <v-list-tile-title v-show="!isEdit">{{user.username}}</v-list-tile-title>
                <v-text-field style="margin-bottom: 60px;"
                  v-model.trim="user.username"
                  v-validate="'required'"
                  data-vv-name="username"
                  v-show="isEdit"
                  :error-messages="errors.collect('username')"
                  persistent-hint
                ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>E-mail</v-list-tile-sub-title>
                <v-list-tile-title v-show="!isEdit">{{user.email}}</v-list-tile-title>
                <v-text-field style="margin-bottom: 60px;"
                  v-model.trim="user.email"
                  v-show="isEdit"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  :error-messages="errors.collect('email')"
                  
                ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>Country</v-list-tile-sub-title>
                <v-list-tile-title v-show="!isEdit">{{user.country}}</v-list-tile-title>
                <v-select
                    :items="countries"
                    v-model="user.country"
                    menu-props="auto"
                    hide-details
                    single-line
                    v-show="isEdit"
                  ></v-select>
              </v-list-tile-content> 
            </v-list-tile>
          </v-list>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="@/controllers/Profile" />