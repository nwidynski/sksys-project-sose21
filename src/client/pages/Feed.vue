<template>
    <div id="main" style="background-color: #E6FFC7">
        <b-container fluid>
        <div class="text-center">
            <b-button @click="switchToLogin" pill>Go back to login</b-button>
        </div>
        <b-row align-h="center">
          <b-col lg="5">
            <div>
              <b-row>
                <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" cols="12">
                  <Meetup :meetObj="obj"></Meetup>
                </b-col>
              </b-row>  
            </div>
          </b-col>
          <b-col lg="5">
            <div>
              <b-col v-for="objR in recipeArray" :key="objR.id" class="my-2" cols="12">
                <Recipe
                  :id="objR.id"
                  :name="objR.name"
                  :level="objR.level"
                  :rating="objR.rating"
                  :instruction="objR.instruction"
                  :time="objR.time"
                  :ingredients="objR.ingredients"
                  :on-feed="true"
                  :author="objR.author"
                  :isPrivate="objR.isPrivate"
                  :createdAt="objR.createdAt"
                  :userId="objR.userId"
                ></Recipe>
              </b-col>
            </div>
          </b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
import Meetup from '../components/Meetup.vue'
import Recipe from '../components/Recipe.vue'
import BackEndRouter from '@client/utils/http'
export default {
  components: { Meetup, Recipe },
    data() {
        return {
            meetupArray: [],
            recipeArray: []
        }
    },
    methods: {
        switchToLogin() {
            this.$router.push({path: '/'})
        },
        getFeed() {
          BackEndRouter.RequestRouter.EndPoints.LIST("/feed")
            .then(res => {
                this.meetupArray = res[0];
                this.recipeArray = res[1];
                console.log(res);
            })
            .catch(err => console.log("error"))
        }
    },
    mounted() {
        this.getFeed();
    }
}
</script>