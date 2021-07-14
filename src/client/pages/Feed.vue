<template>
  <div id="main" style="background-color: #E6FFC7">
    <b-container fluid>
      <div class="text-center">
        <b-button @click="switchToLogin" pill>Go back to login</b-button>
      </div>
      <b-row  align-h="center" align-v="center">
        <b-col v-for="objR in recipeArray" :key="objR.id" class="my-2" cols="10" lg="5">
          <Recipe
              :name="objR.name"
              :level="objR.level"
              :rating="objR.rating"
              :instruction="objR.instruction"
              :time="objR.time"
              :ingredients="objR.ingredients"
              :on-feed="true"
              :author="objR.author"
              :createdAt="objR.createdAt"
          ></Recipe>
        </b-col>
        <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" ols="10" lg="5">
          <Meetup :meetObj="obj"></Meetup>
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
      recipeArray: [
        {
          id:0,
          author:"Lucy",
          createdAt: "2021-07-13T20:17:13.173",
          updatedAt: "2021-07-13T20:17:13.173",
          name: "Pizza",
          time: "3h 20min",
          instruction: "Zunächst für den Pizzateig Mehl, Grieß und Salz gründlich vermengen. Die Hefe im warmen Wasser auflösen, 5 Minuten ruhen lassen und dann zur Mehlmischung geben. Die Zutaten so lange mit dem Knethaken des Handrührers, in der Küchenmaschine oder von Hand kneten, bis ein elastischer Teig entsteht, das dauert ungefähr 10 Minuten. Falls der Teig zu fest sein sollte einfach noch etwas warmes Wasser zugeben, wenn der Teig zu flüssig ist, etwas Mehl hinzugeben. Erst dann das Olivenöl unterkneten.\n" +
              "\n" +
              "Den Teig in Frischhaltefolie wickeln oder unter einem Geschirrtuch mindestens 30 Minuten gehen lassen. Der Teig lässt sich ebenfalls hervorragend im Hefeteig-Programm eines Brotbackautomaten zubereiten.\n" +
              "\n" +
              "In der Zwischenzeit die Roma-Tomaten quer halbieren und über einer feinen Reibe bis auf die Schale abreiben. Das überschüssige Wasser aus den Tomaten durch ein feines Sieb abgießen, so dass nur der Tomatensaft und das Innere der Tomaten übrig bleiben. Diese Tomaten nach Geschmack mit etwas Salz würzen.\n" +
              "\n",
          level: "hard",
          rating: "2.5",
          ingredients: [
            {
              name: "Mehl",
              amount: "500",
              unit: "g"
            },
            {
              name: "Salz",
              amount: "1",
              unit:"tsp"
            },
            {
              name: "Zucker",
              amount: "200",
              unit:"g"
            },
            {
              name: "Tomaten",
              amount: "1",
              unit:"handful"
            },
            {
              name: "Käse",
              amount: "infinity",
              unit:""
            }
          ]
        },
        {
          id:1,
          author:"John",
          createdAt: "2021-07-13T20:17:13.173",
          updatedAt: "2021-07-13T20:17:13.173",
          name: "Cake",
          time: "50min",
          instruction: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          level: "middle",
          rating: "4",
          ingredients: [
            {
              name: "Mehl",
              amount: "500",
              unit:"g"
            },
            {
              name: "Eier",
              amount: "3",
              unit:"none"
            },
            {
              name: "Zucker",
              amount: "200",
              unit:"g"
            },
            {
              name: "Walnüsse",
              amount: "1",
              unit:"pinch of"
            },
            {
              name: "Gelatine",
              amount: "1",
              unit:"pinch of"
            }
          ]
        }
      ]
    }
  },
  methods: {
    switchToLogin() {
      this.$router.push({path: '/'})
    },
    getMeetups() {
      BackEndRouter.RequestRouter.EndPoints.LIST("/meetups")
          .then(res => {
            this.meetupArray = res;
          })
          .catch(err => console.log("error"))
    }
  },
  mounted() {
    this.getMeetups();
  }
}
</script>