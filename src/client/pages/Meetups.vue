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
  },
  methods: {
    onResize(){
      document.getElementById('main').style.marginLeft = '250px'
      console.log("onResize - Meetups")
      if(window.innerWidth < 1000)
        document.getElementById('main').style.marginLeft = '51px'
      if(window.innerWidth < 476)
        document.getElementById('main').style.marginLeft = '0px'
    }
  },
  created(){
    window.addEventListener('resize',this.onResize)
    console.log("listener added - Meetups")
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.onResize)
    console.log("listener removed - Meetups")
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
</style>

