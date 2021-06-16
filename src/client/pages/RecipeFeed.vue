<template>
  <div>
    <div id="main" class="main-container">
      <div id="feed">
        <h3 class="title pl-4 pt-2 pb-1"> Recipe Feed</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <div class="search-container">
          <input v-model="toSearch" class="search-field" placeholder="search a recipe name..." />
          <b-button @click="search" class="search-btn mr-1 mb-1 mt-1"> search </b-button>
        </div>
        <div style="width:100%; border-top: 1px solid black"/>

        <div class="receipt-container">
          <Recipe
              v-for="receipt in recipes"
              :name="receipt.name"
              :level="receipt.level"
              :rating="receipt.rating"
              :instruction="receipt.instruction"
              :time="receipt.time"
              :ingredients="receipt.ingredients"
              :on-feed="true"
          >

          </Recipe>
        </div>
        <br>
        <br>

      </div>
      <div id="infos">
        <h3 style="text-align: center; margin-top: 17% !important">Check mal die nächsten MeetUps!</h3>
        <div class="meetup-container">
          <div class="meetup m-3 p-2"><router-link to="meetups">meetup</router-link></div>
          <div class="meetup m-3 p-2"><router-link to="meetups">meetup</router-link></div>
          <div class="meetup m-3 p-2"><router-link to="meetups">meetup</router-link></div>
          <div class="meetup m-3 p-2"><router-link to="meetups">meetup</router-link></div>
          <div class="meetup m-3 p-2"><router-link to="meetups">meetup</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Recipe from "@client/components/Recipe";
export default {
  name: 'ReceiptFeed',
  components: {
    Recipe,
  },
  data() {
    return {
      toSearch:"",
      recipes: [
        {
          id:0,
          author:"Lucy",
          createdAt: "1623585305680",
          updatedAt: "1623585305680",
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
          createdAt: "1623585305680",
          updatedAt: "1623585305680",
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
    onResize(){
      document.getElementById('main').style.marginLeft = '250px'

      console.log("onResize - ReceiptFeed")
      if(window.innerWidth < 1000)
        document.getElementById('main').style.marginLeft = '51px'

      if(window.innerWidth < 476)
        document.getElementById('main').style.marginLeft = '0px'

    },
    search(){
      console.log("search: ",this.toSearch)
    }
  },
  created(){
    window.addEventListener('resize',this.onResize)
    console.log("listener added - ReceiptFeed")
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.onResize);
    console.log("listener removed - ReceiptFeed")
  }
}

</script>

<style scoped>
.main-container {
  margin-left: 250px;
  background-color: #E6FFC7;
  display:flex;
  flex-wrap: nowrap;
  transition: margin 325ms;
}

#feed {
  width: 75%;
  border-right: 1px solid black
}

#infos {
  width: 25%;
  background-color: #E6FFC7;
}

.title {
  font-weight: bold
}

.search-field {
  width: 85%;
  background-color: #2a2a2e;
  color: white;
  padding: .75em;
  outline: none;
  border: 1px solid #2a2a2e;
  border-radius: 5px
}

.search-container {
  margin: .5em;
  border-radius: 5px;
  display: flex;
  background-color: #2a2a2e;
  justify-content: space-between;
}

.search-btn {
  background-color: #2a2a2e;
}

.receipt-container {
  background-color: #E6FFC7;
}

.meetup {
  background-color: #2a2a2e;
  color: white;
  border-radius: 5px;
}


@media (max-width: 476px) {
  .main-container {
    width: 100%;
    margin-left: 0px;
  }
}

@media (max-width: 800px) {
  #infos {
    display: none !important;
  }
  #feed {
    width: 100%
  }
}
</style>