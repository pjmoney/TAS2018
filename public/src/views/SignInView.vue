<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md7>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
								<v-toolbar-items>
									<v-btn flat to="/signup">Register</v-btn>
								</v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
										v-model="user.email"
                    v-validate="'required|email'"
                    data-vv-name="email"
                    :error-messages="errors.collect('email')"
                    
                    label="E-mail"
                    prepend-icon="email">
									</v-text-field>
                  <v-text-field
										v-model="user.password"
                    v-validate="'required'"
                    data-vv-name="password"
                    @click="errors.clear()"
                    :error-messages="errors.collect('password')"
                    label="Password"
                    prepend-icon="lock"
										type="password">
									</v-text-field>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="primary" @click.native="signIn">Zaloguj</v-btn>
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

<script src="../controllers/SignInController.js"></script>
