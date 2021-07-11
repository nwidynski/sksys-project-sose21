<template>
    <div id="main" style="background-color: #E6FFC7">
        <h3 class="title pl-4 pt-2 pb-1">Settings</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <b-container fluid style="margin: 0px">
            <b-row>
                <b-col  class="my-2" cols="8" lg="6">
                    <!-- user data -->
                    <div class="mb-5">
                        <p>email: {{userData.email}}</p>
                        <p>firstname: {{userData.firstname}}</p>
                        <p>surname: {{userData.surname}}</p>
                        <p>created: {{userData.createdAt}}</p>
                        <p>updated: {{userData.updatedAt}}</p>
                    </div>
                </b-col>
                <b-col class="my-2" cols="8" lg="6">
                    <!-- change email input -->
                    <div>
                        <label for="input-newEmail">Change email:</label>
                        <b-form-input id="input-newEmail" v-model="email.newEmail" placeholder="new email"></b-form-input>
                        <b-form-input id="input-pwEmail" v-model="email.pwEmail" placeholder="password" class="mt-1"></b-form-input>
                        <b-button pill class="mb-4 mt-2" @click="changeEmail">change</b-button>
                    </div>
                </b-col>
                <b-col class="my-2" cols="8" lg="6">
                    <!-- change name -->
                    <div>
                        <label for="input-newFirstName">Change firstname:</label>
                        <b-form-input id="input-newFirstName" v-model="name.newFirstname"></b-form-input>
                    
                        <label for="input-newSurname">Change surname:</label>
                        <b-form-input id="input-newSurname" v-model="name.newSurname"></b-form-input>
                        <b-button pill class="mb-4 mt-2" @click="changeName">change</b-button>
                    </div>
                </b-col>
                <b-col class="my-2" cols="8" lg="6">
                    <!-- change password -->
                    <div>
                        <label for="input-oldPassword">Change password:</label>
                        <b-form-input id="input-oldPassword" v-model="password.oldPassword" placeholder="old password..." class="mb-1"></b-form-input>
                        <b-form-input id="input-newPassword" v-model="password.newPassword" placeholder="new password..."></b-form-input>
                        <b-button pill class="mb-4 mt-2" @click="changePassword">change</b-button>
                    </div>
                </b-col>
                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import BackEndRouter from '@client/utils/http'
import UserStorage from '@client/utils/userStorage'
export default {
    components: {},

    data() {
        return {
            userData: {
                email: "",
                firstname: "",
                surname: "",
                createdAt: "",
                updatedAt: ""
            },
            email: {
                newEmail: "",
                pwEmail: ""
            },
            name: {
                newFirstName: "",
                newSurname: ""
            },
            password: {
                newPassword: "",
                oldPassword: ""
            }
        }
    },
    methods: {
        changeEmail() {
            let email = {
                email: this.email.newEmail,
                password: this.email.pwEmail
            }
            console.log(email)
            BackEndRouter.RequestRouter.EndPoints.UPDATE("/user/updateEmail", email)
                .then(res => {
                    console.log("worked");
                    UserStorage.writeObj("user", res)
                    this.getUserData()
                })
                .catch(err => console.log(err))
        },
        changeName() {
            let name = {
                firstname: this.name.newFirstname,
                surname: this.name.newSurname
            }

            //check if only one name changed
            if(name.firstname === "") {
                name.firstname = UserStorage.readObj("user").firstname;
            }
            if(name.surname === "") {
                name.surname = UserStorage.readObj("user").surname;
            }

            console.log(name)
            BackEndRouter.RequestRouter.EndPoints.UPDATE("/user/updateName", name)
                .then(res => {
                    UserStorage.writeObj("user", res)
                    this.getUserData()
                })
                .catch(err => console.log(err))
        },
        changePassword() {
            let password = {
                oldPassword: this.password.oldPassword,
                newPassword: this.password.newPassword
            }
            console.log(password)
            BackEndRouter.RequestRouter.EndPoints.UPDATE("/user/updatePassword", password)
                .then(res => {
                    console.log("worked")
                    console.log(res)
                })
                .catch(err => console.log(err))
        },
        getUserData() {
            this.userData = UserStorage.readObj("user");
        }
    },
    mounted() {
        this.getUserData();
    }
}
</script>

<style scoped>
    #main {
        margin-left: 250px;
        height: 100vh;
    }
    @media (max-width: 476px) {
        #main {
            width: 100%;
            margin-left: 0px;
        }
    }
    @media (max-width: 1000px) and (min-width: 477px) {
      #main {
        margin-left: 51px
      }
    }
</style>