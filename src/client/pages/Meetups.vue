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
        <add-meetup :receiptOptions="receiptOptions"></add-meetup>
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
          receiptOptions: [{value: 0, text: "pizza"}, {value: 1, text: "pasta"}]
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
    passMeetup() {
        return this.meetupArray.filter(ele => ele.id == id);
    },
    requestMeetups() {
        BackEndRouter.RequestRouter.EndPoints.LIST("/meetups")
            .then(res => {
                this.meetupArray = res;
            })
            .catch(err => console.log("error"))
    }
  },
  mounted() {
      //access control
      //Backend requests for meetups
      this.requestMeetups()
      //Backend reqeuest for receiptsOptions (receipts -> [{value: id, text: receipt.name}])
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

