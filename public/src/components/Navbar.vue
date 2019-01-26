<template>

        <v-toolbar flat app color="grey lighten-4">
            <v-toolbar-title class="grey--text">
                <span class="font-weight-light text-uppercase">REVIEW.io</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn small slot="activator" fab flat color="primary" label="My account">
                    <v-avatar size="30">
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn flat color="grey" @click="logout">
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

</template>

<script src="@/controllers/Navbar" />