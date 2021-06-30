<template>
    <div id="main" style="background-color: #E6FFC7">
        <h3 class="title pl-4 pt-2 pb-1">Meetups</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <b-container fluid style="margin: 0px">
            <b-row>
                <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" cols="12" lg="6">
                    <Meetup :meetObj="obj" @join-event="joinMeetup" @edit-event="editMeetup"></Meetup>
                </b-col>
            </b-row>
        </b-container>
        <add-meetup :recipeOptions="recipeOptions" @created-meetup="pushNewMeetup"></add-meetup>
    </div>
</template>

<script>
import BackEndRouter from '@client/utils/http'
import Meetup from '../components/Meetup.vue'
import addMeetup from '../modals/addMeetup.vue'

export default {
  components: { Meetup, addMeetup },
  
  data() {
      return {
          meetupArray: [],
          recipeOptions: []
      }
  },
  methods: {
    joinMeetup(id) {
      //TODO Backend request
      console.log(id);
    },
    editMeetup(id) {
        console.log("edit " + id);
    },
    pushNewMeetup(newMeetup) {
        console.log(newMeetup);
        this.meetupArray.push(newMeetup);
    },
    passMeetup() {
        return this.meetupArray.filter(ele => ele.id == id);
    },
    getMeetups() {
        BackEndRouter.RequestRouter.EndPoints.LIST("/meetups")
            .then(res => {
                this.meetupArray = res;
            })
            .catch(err => console.log("error"))
    },
    setRecipeOptions() {
        let self = this;
        BackEndRouter.RequestRouter.EndPoints.LIST("/recipes")
            .then(res => {
                let newArr = res.map(ele => {
                    delete ele.createdAt;
                    delete ele.updatedAt;
                    delete ele.isPrivate;
                    delete ele.rating;
                    delete ele.userId;
                    return ele;
                });
                newArr.forEach(ele => {
                    delete Object.assign(ele, {value: ele["id"] })["id"];
                    delete Object.assign(ele, {text: ele["name"] })["name"];
                })
                self.recipeOptions = newArr;
            })
            .catch(err => console.log(err))
    }
  },
  mounted() {
      //access control
      //Backend requests for meetups
      this.getMeetups()
      //Backend reqeuest for recipesOptions (recipes -> [{value: id, text: recipe.name}])
      this.setRecipeOptions();
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

