<template>
    <div id="main" style="background-color: #E6FFC7">
        <h3 class="title pl-4 pt-2 pb-1">Meetups</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <b-container fluid style="margin: 0px">
            <b-row>
                <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" cols="12" lg="6">
                    <Meetup :meetObj="obj" :userId="userId" @join-event="joinMeetup" @edit-event="editMeetup" @delete-event="deleteMeetup" @leave-event="leaveMeetup"></Meetup>
                </b-col>
            </b-row>
        </b-container>
        <add-meetup :recipeOptions="recipeOptions" @created-meetup="pushNewMeetup"></add-meetup>
        <edit-meetup :recipeOptions="recipeOptions" :meetupsValues="toBeEdited" @edit-meetup="pushEditMeetup"></edit-meetup>
    </div>
</template>

<script>
import BackEndRouter from '@client/utils/http'
import Meetup from '../components/Meetup.vue'
import addMeetup from '../modals/addMeetup.vue'
import EditMeetup from '@client/modals/editMeetup.vue'
import UserStorage from '@client/utils/userStorage'

export default {
  components: { Meetup, addMeetup, EditMeetup },
  
  data() {
      return {
          meetupArray: [],
          recipeOptions: [],
          toBeEdited: undefined,
          userId: UserStorage.readObj("user").id
      }
  },
  methods: {
    joinMeetup(id) {
        let self = this;

        // hostid of meetup
        let hostId = this.meetupArray.filter(ele => ele.id==id)[0].hostId;

        // not own meetup
        if(hostId === UserStorage.readObj("user").id) {
            //TODO
            console.log("you can not join your own meetups!")
            return;
        }

        //TODO Backend request
        BackEndRouter.RequestRouter.EndPoints.UPDATE("/meetups/" + id + "/addGuest")
            .then(res => self.getMeetups())
            .catch(err => console.log(err))
    },
    editMeetup(id) {
        this.toBeEdited = this.meetupArray.filter(ele => ele.id==id)[0];

        // only edit own meetup
        if(this.toBeEdited.hostId !== UserStorage.readObj("user").id) {
            //TODO
            console.log("you can only edit your own meetups!")
            return;
        }

        this.$bvModal.show("edit-meetup");
    },
    deleteMeetup(id) {
        let self = this;

        // hostid of meetup
        let hostId = this.meetupArray.filter(ele => ele.id==id)[0].hostId;
        
        // only delete own
        if(hostId !== UserStorage.readObj("user").id) {
            //TODO
            console.log("you can only delete your own meetups!")
            return;
        }

        //Backend request
        BackEndRouter.RequestRouter.EndPoints.DELETE("/meetups/" + id)
            .then(res => {
                console.log(res);
                self.getMeetups()})
            .catch(err => console.log(err))
    },
    leaveMeetup(id) {
        BackEndRouter.RequestRouter.EndPoints.UPDATE("/meetups/" + id + "/removeGuest")
            .then(res => {
                this.getMeetups();
            })
            .catch(err => console.log(err))
    },
    pushNewMeetup(newMeetup) {
        console.log(newMeetup);
        this.meetupArray.push(newMeetup);
    },
    pushEditMeetup(editMeetup) {
        //maybe change this
        this.getMeetups();
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
      document.body.scrollTop = document.documentElement.scrollTop = 0;
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

