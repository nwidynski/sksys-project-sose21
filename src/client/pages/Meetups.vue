<template>
    <div id="main" style="background-color: #E6FFC7">
        <b-container>
            <b-row>
                <b-col v-for="obj in meetupArray" :key="obj.id" cols="12" md="6">
                    <Meetup :meetObj="obj"></Meetup>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Meetup from '../components/Meetup.vue'

export default {
  components: { Meetup },
  
  data() {
      return {
          meetupArray: [
              {
                 id: 0, 
                 author: "David",
                 location: "Berlin",
                 date: "2021-21-06",
                 maxMember: 5,
                 receipt: "Pizza",
                 member: [
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
                 id: 0, 
                 author: "David",
                 location: "Berlin",
                 date: "2021-21-06",
                 maxMember: 5,
                 receipt: "Pizza",
                 member: [
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
                 id: 0, 
                 author: "David",
                 location: "Berlin",
                 date: "2021-21-06",
                 maxMember: 5,
                 receipt: "Pizza",
                 member: [
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
          ]
      }
  }
}
</script>

<style scoped>
    #main {
        margin-left: 250px;
    }
    @media (max-width: 476px) {
        #main {
            width: 100%;
            margin-left: 0px;
        }
    }
</style>

