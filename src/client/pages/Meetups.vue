<template>
    <div id="main" style="background-color: #E6FFC7">
        <h3 class="title pl-4 pt-2 pb-1">Meetups</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <b-container fluid style="margin: 0px">
            <b-row>
                <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" cols="12" lg="6">
                    <Meetup :meetObj="obj" @join-event="joinMeetup"></Meetup>
                </b-col>
            </b-row>
        </b-container>
        <add-meetup :receiptOptions="receiptOptions"></add-meetup>
    </div>
</template>

<script>
import Meetup from '../components/Meetup.vue'
import addMeetup from '../modals/addMeetup.vue'

export default {
  components: { Meetup, addMeetup },
  
  data() {
      return {
          meetupArray: [
              {
                 id: 0, 
                 host: {firstname: "David"},
                 place: "Berlin",
                 date: "2021-21-06",
                 maxGuests: 5,
                 receipt: "Pizza",
                 guests: [
                     {
                        id: 0, 
                        name: "Sven"
                     },
                     {
                        id: 1,
                        name: "Tom"
                     }
                 ] 
              },
              {
                 id: 1, 
                 host: {firstname: "David"},
                 place: "Berlin",
                 date: "2021-21-06",
                 maxGuests: 5,
                 receipt: "Pizza",
                 guests: [
                     {
                        id: 0, 
                        name: "Sven"
                     },
                     {
                        id: 1,
                        name: "Tom"
                     }
                 ] 
              },
              {
                 id: 2, 
                 host: {firstname: "David"},
                 place: "Berlin",
                 date: "2021-21-06",
                 maxGuests: 5,
                 receipt: "Pizza",
                 guests: [
                     {
                        id: 0, 
                        name: "Sven"
                     },
                     {
                        id: 1,
                        name: "Tom"
                     }
                 ] 
              }
          ],
          receiptOptions: [{value: 0, text: "pizza"}, {value: 1, text: "pasta"}]
      }
  },
  methods: {
    joinMeetup(id) {
      //TODO Backend request
      console.log(id);
    }
  },
  mounted() {
      //access control
      //Backend requests for meetups
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

