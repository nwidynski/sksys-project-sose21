<template>
 <div style="background-color: #E6FFC7">
    <b-container fluid>
        <b-row class="vh-100" align-h="center" align-v="center">
            <b-col sm="8" cols="10" md="6" lg="4" xl="3">
                <div class="text-center mb-5">
                    <b-button @click="switchToFeed" pill>Go to public feed</b-button>
                </div>
                <b-img fluid :src="require('@/client/assets/logo.png')" ></b-img>
                <div class="text-center">
                    <!-- input elements -->
                    <b-form-input v-if="!isLogin" v-model="user.firstname" placeholder="firstname" class="my-2"></b-form-input>
                    <b-form-input v-if="!isLogin" v-model="user.surname" placeholder="surname" class="my-2"></b-form-input>
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
import BackendRouter from '@client/utils/http'
import UserStorage from '@client/utils/userStorage'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: "",
                password: "",
                secPassword: "",
                firstname: "",
                surname: ""
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
            //this.$root.user = {
            //    email: "test@gmail.com",
            //    name: "testname",
            //    secondName: "testsecond"
            //}
            let user = {
                email: this.user.email,
                password: this.user.password
            }
            if(user.email == "demo") {
                this.$root.user = user;
                this.$router.push({path: "private"})
                return;
            }

            BackendRouter.RequestRouter.EndPoints.CREATE('/login', user)
                .then(res => {
                    this.$root.user = res;
                    UserStorage.writeObj("user", res)
                    this.$router.push({path: "private/profile/" + res.id})
                })
                .catch(err => console.log(err))
        },
        signUp() {
            //check input
            //this.checkInput();
            //signup request
            let newUser = {
                email: this.user.email,
                firstname: this.user.firstname,
                surname: this.user.surname,
                password: this.user.password
            }

            BackendRouter.RequestRouter.EndPoints.CREATE('/signup', newUser)
                .then(res => {
                    this.$root.user = res;
                    this.$router.push({path: "private"})
                })
                .catch(err => console.log("something went wrong"))
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
        },
        switchToFeed() {
            this.$router.push({path: 'feed'});
        }
    },
}
</script>