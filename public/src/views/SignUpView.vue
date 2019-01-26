<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn flat to="/signin">Login</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model.trim="user.username"
                    v-validate="'required|min: 4'"
                    data-vv-name="username"
                    :error-messages="errors.collect('username')"
                    label="Username"
                    prepend-icon="person">
                  </v-text-field>

                  <v-text-field
                    v-model="user.email"
                    v-validate="'required|email'"
                    data-vv-name="email"
                    :error-messages="errors.collect('email')"
                    @="errors.clear()"
                    label="E-mail"
                    prepend-icon="email">
                  </v-text-field>

                  <v-text-field
                    v-model.trim="user.password"
                    :error-messages="errors.collect('password')"
                    v-validate="'required|min: 6'"
                    data-vv-name="password"
                    label="Password"
                    prepend-icon="lock"
                    type="password">
                  </v-text-field>

                  <v-select
                    v-model="user.country"
                    :items="countries"
                    :error-messages="errors.collect('country')"
                    v-validate="'required'"
                    data-vv-name="country"
                    label="Country"
                    prepend-icon="flag">
                  </v-select>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.native="signUp">Zarejestruj</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="../controllers/SignUpController.js"></script>
