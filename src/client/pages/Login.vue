<template>
 <div style="background-color: #E6FFC7">
    <b-container fluid>
        <b-row class="vh-100" align-h="center" align-v="center">
            <b-col sm="8" cols="10" md="6" lg="4" xl="3">
                <div class="text-center">
                    <!-- input elements -->
                    <b-form-input v-if="!isLogin" v-model="user.name" placeholder="username" class="my-2"></b-form-input>
                    <b-form-input v-model="user.email" placeholder="email" class="my-2" autofocus></b-form-input>
                    <b-form-input v-model="user.password" placeholder="password" class="my-2" type="password" :state="pwState"></b-form-input>
                        <!-- invalid feedback-->
                        <b-form-invalid-feedback v-if="inputWarning.showLength" class="text-left">Enter at least 6 characters</b-form-invalid-feedback>
                    <b-form-input v-if="!isLogin" v-model="user.secPassword" placeholder="repeat password" class="my-2" type="password" :state="pwState"></b-form-input>
                        <b-form-invalid-feedback v-if="inputWarning.showSame" class="text-left">Both passwords should be the same</b-form-invalid-feedback>
                    <!-- buttons -->
                    <b-button v-if="isLogin" @click="logIn" pill>Log In</b-button>
                    <b-button v-else @click="signUp" pill>Sign Up</b-button>
                    <!-- wrong credentials alert (TODO)-->
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
                secPassword: "",
                name: ""
            },
            isLogin: true,
            pwState: null,
            inputWarning: {
                showLength: false,
                showSame: false
            }
        }
    },
    computed: {
        pwLength() {
            return this.user.password.length >= 6
        },
        pwSameInput() {
            if(this.user.password != this.user.secPassword) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        toggleIsLogin() {
            this.isLogin = !this.isLogin;
        },
        logIn() {
            //login request (sets user object in this.$root.user)
            //dev object
            this.$root.user = {
                email: "test@gmail.com",
                name: "testname",
                secondName: "testsecond"
            }
            //access control
            if(this.$root.user !== undefined) {
                console.log(this.$root.user)
                this.$router.push({path: "profile"})
            }
        },
        signUp() {
            //check input
            this.checkInput();
            //signup request
            //TODO
        },
        checkInput() {
            if(this.pwLength === false) {
                this.pwState = false;
                this.inputWarning.showLength = true;
                return;
            }
            this.inputWarning.showLength = false;
            if(this.pwSameInput === false) {
                this.pwState = false;
                this.inputWarning.showSame = true;
                return;
            }
            this.inputWarning.showSame = false;
            this.pwState = true;
        }
    },
}
</script>