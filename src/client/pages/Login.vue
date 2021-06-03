<template>
 <div style="background-color: #E6FFC7">
    <b-container fluid>
        <b-row class="vh-100" align-h="center" align-v="center">
            <b-col sm="8" cols="10" md="6" lg="4" xl="3">
                <div class="text-center">
                    <!-- input elements -->
                    <b-form-input v-model="user.email" placeholder="email" class="my-2"></b-form-input>
                    <b-form-input v-model="user.password" placeholder="password" class="my-2" type="password" :state="pwState" ></b-form-input>
                    <b-form-input v-if="!isLogin" v-model="user.secPassword" placeholder="repeat password" class="my-2" type="password" :state="pwState"></b-form-input>
                    <!-- buttons -->
                    <b-button v-if="isLogin" @click="logIn" pill>Log In</b-button>
                    <b-button v-else @click="signUp" pill>Sign Up</b-button>
                    <!-- text below  -->
                    <p v-if="isLogin" class="my-4"><a href="#" @click="toggleIsLogin" class="font-weight-bold">Sign Up</a> for a new account</p>
                    <p v-else class="my-4" @click="toggleIsLogin"><a href="#" @click="toggleIsLogin" class="font-weight-bold">Log In</a></p>
                </div>
            </b-col>
        </b-row>
    </b-container>
 </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: "",
                password: "",
                secPassword: ""
            },
            isLogin: true,
            pwState: null
        }
    },
    methods: {
        toggleIsLogin() {
            this.isLogin = !this.isLogin;
        },
        logIn() {
            //login request
        },
        signUp() {
            this.passwordState();
            //signup request
        },
        passwordState() {
            if(this.user.password != this.user.secPassword) {
                this.pwState = false;
            } else {
                this.pwState = true;
            }
        }
    },
}
</script>