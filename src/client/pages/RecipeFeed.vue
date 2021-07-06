<template>
  <div>
    <div id="main" class="main-container">
      <div id="feed">
        <h3 class="title pl-4 pt-2 pb-1"> Recipe Feed</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <div class="search-container">
          <input v-model="toSearch" class="search-field" type="black" placeholder="search a recipe name..." />
          <b-button @click="search" class="search-btn mr-1 mb-1 mt-1"> search </b-button>
        </div>
        <div style="width:100%; border-top: 1px solid black"/>



        <div class="receipt-container">
<!--          <div v-if="this.loading" style="text-align: center" class="mt-4">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
          </div>-->
          <div style="height: 100vh" v-if="recipes.length == 0"></div>
          <Recipe
              v-for="receipt in recipes"
              :id="receipt.id"
              :name="receipt.name"
              :level="receipt.level"
              :rating="receipt.rating"
              :instruction="receipt.instruction"
              :time="receipt.time"
              :ingredients="receipt.ingredients"
              :on-feed="true"
              :author="receipt.author"
              :isPrivate="receipt.isPrivate"
          >

          </Recipe>
          <br>
          <br>          <br>
          <br>          <br>
          <br>          <br>
        </div>




      </div>
      <div id="infos">
        <h3 style="text-align: center; margin-top: 17% !important">Check mal die nächsten MeetUps!</h3>
        <div class="meetup-container" v-for="meetup in meetups.slice(0,6)">
          <div class="meetup m-3 p-2"> <router-link style="color: snow; font-weight: 500" to="meetups">{{ meetup.recipeName + " - by " + meetup.hostName + " - in " + meetup.place }} <b-icon-arrow-right-square style="float: right; margin-top: 2px"></b-icon-arrow-right-square></router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Recipe from "@client/components/Recipe";
import BackEndRouter from "@client/utils/http";
export default {
  name: 'ReceiptFeed',
  components: {
    Recipe,
  },
  data() {
    return {
      toSearch:"",
      loading: false,
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
        },
        {
          id:2,
          author: "Christian",
          name: "Chocolate Cake",
          time:"30min",
          instruction: "Den Backofen auf 160 °C Umluft (180 °C Ober-/Unterhitze) vorheizen. Den Boden von zwei Springformen ca. 15 cm (oder alternativ einer 22 cm Springform) mit Backpapier auslegen. Den Formrand fetten und mit Mehl bestäuben.\n" +
              "\n" +
              "Die Schokolade in grobe Stücke brechen und zusammen mit der Butter vorsichtig schmelzen. Abkühlen lassen.\n" +
              "\n" +
              "Eier und Zucker mit dem Schneebesen in ca. 5 Minuten schaumig schlagen. Die abgekühlte Butter-Schokoladenmischung dazugeben und leicht unterrühren. Mehl mit Kakaopulver, Backpulver und Salz in einer Schüssel mischen. Die Mehlmischung auf die Schaummasse sieben und im Wechsel mit der Buttermilch vorsichtig mit dem Teigschaber unterheben.",
          level: "easy",
          rating: "5",
          ingredients: [
            {
              name: "sugar",
              amount: "200",
              unit:"g"
            },
            {
              name:"chocolate",
              amount: "250",
              unit: "g"
            },
            {
              name:"eggs",
              amount:"3",
              unit:"none"
            }
          ]
        },
        {
          id:3,
          author: "Lara",
          name: "Spaghetti Bolognese",
          time:"2h",
          instruction: "Zwiebeln in Scheiben schneiden, in eine Pfanne geben, salzen und in Öl glasig schmoren. Tomaten vom Strunk befreien und in Scheiben schneiden. Zu den Zwiebeln geben. Einmal durchrühren und dann einen Teller drüberlegen, sodass der gesamte Inhalt der Pfanne unter dem Teller verborgen ist, und ca. 15 Minuten bei geringer Hitze schmoren lassen.",
          level: "middle",
          rating: "3",
          ingredients: [
            {
              name: "onions",
              amount: "2",
              unit:"none"
            },
            {
              name:"beef",
              amount: "250",
              unit: "g"
            },
            {
              name:"olive oil",
              amount:"50",
              unit:"ml"
            },
            {
              name:"oregano",
              amount:"2",
              unit:"tsp"
            },
            {
              name:"spaghetti",
              amount:"500",
              unit:"g"
            }
          ]
        },
        {
          id:4,
          author: "Thomas",
          name: "Spaghetti Carbonara",
          time:"2h",
          instruction: "Die Pasta in reichlich Salzwasser bissfest kochen. Den Schinken in Würfel schneiden und in wenig Butter anbraten.\n" +
              "\n" +
              "Eigelb in einer großen Schüssel mit Salz, Pfeffer und Muskat verquirlen. Die Butter schaumig rühren und gut unter das Eigelb mischen. Die Schinkenwürfel und den geriebenen Käse gründlich unterrühren.",
          level: "middle",
          rating: "3",
          ingredients: [
            {
              name: "ham",
              amount: "225",
              unit:"g"
            },
            {
              name:"butter",
              amount: "25",
              unit: "g"
            },
            {
              name:"oil",
              amount:"50",
              unit:"ml"
            },
            {
              name:"parmesan",
              amount:"50",
              unit:"g"
            },
            {
              name:"pepper",
              amount:"1",
              unit:"tsp"
            }
          ]
        },
        {
          id:5,
          author: "Sophie",
          name: "Bio Vegan Bolognese",
          time:"2h",
          instruction: "Zwiebeln in Scheiben schneiden, in eine Pfanne geben, salzen und in Öl glasig schmoren. Tomaten vom Strunk befreien und in Scheiben schneiden. Zu den Zwiebeln geben. Einmal durchrühren und dann einen Teller drüberlegen, sodass der gesamte Inhalt der Pfanne unter dem Teller verborgen ist, und ca. 15 Minuten bei geringer Hitze schmoren lassen.",
          level: "middle",
          rating: "3",
          ingredients: [
            {
              name: "onions",
              amount: "2",
              unit:"none"
            },
            {
              name:"soja",
              amount: "250",
              unit: "g"
            },
            {
              name:"olive oil",
              amount:"50",
              unit:"ml"
            },
            {
              name:"oregano",
              amount:"2",
              unit:"tsp"
            },
            {
              name:"spaghetti",
              amount:"500",
              unit:"g"
            },
            {
              name:"tomatoes",
              amount:"335",
              unit:"g"
            }
          ]
        },
        {
          id:2,
          author: "Emily",
          name: "Chocolate Brownie",
          time:"30min",
          instruction: "Eine ca. 20 x 20 bzw. 28 x 15 cm große Form einfetten und kalt stellen. Die Bitterschokolade im Wasserbad schmelzen, die Butter unterrühren. Die Vollmilch- und die weiße Schokolade hacken.\n" +
              "Den Ofen inzwischen auf 200 °C Ober-/Unterhitze vorheizen.\n" +
              "\n" +
              "Die Eier schaumig schlagen, den Zucker einrieseln lassen und weiterschlagen, bis die Masse cremig wird. Das Aroma unterrühren. Mehl und Kakao mischen, mit der Sahne unterrühren, die geschmolzene Schokolade und die Schokostücke unterheben. In die vorbereitete Form füllen und im vorgeheizten Ofen etwa 25 min backen, sodass ein Stäbchen bei der Stäbchenprobe noch leicht feucht herauskommt. In der Form auskühlen lassen.",
          level: "easy",
          rating: "5",
          ingredients: [
            {
              name: "sugar",
              amount: "200",
              unit:"g"
            },
            {
              name:"chocolate",
              amount: "250",
              unit: "g"
            },
            {
              name:"eggs",
              amount:"3",
              unit:"none"
            }
          ]
        },
      ],
      meetups: []
    }
  },
  methods: {
    onResize(){


    },
    search(){
      if (this.toSearch != "") {
        console.log("search: ",this.toSearch)
        this.loading = true
        BackEndRouter.RequestRouter.EndPoints.LIST("/recipes?search=" + this.toSearch)
            .then(res => {
              this.recipes = res;
              console.log(res)
              this.loading = false
            })
            .catch(err => console.log("error"))
        console.log("test")
      }

    },
    getRecipes: function() {
      BackEndRouter.RequestRouter.EndPoints.LIST("/recipes")
          .then(res => {
            this.recipes = res;
          })
          .catch(err => console.log("error"))
    },
    getMeetups() {
      BackEndRouter.RequestRouter.EndPoints.LIST("/meetups")
          .then(res => {
            this.meetups = res;
            console.log(this.meetups)
          })
          .catch(err => console.log("error"))
    }
  },
  computed: {
    filteredRecipes() {
      let filtered = this.recipes.filter(recipe => {
        let searchString = this.toSearch.toLowerCase().trim()
        if(recipe.name.toLowerCase().includes(searchString) && searchString.length >=4) return true;
        else return false
      });
      if(filtered.length == 0) {
        return this.recipes
      }
      return filtered;
    }
  },
  mounted() {
    //Backend requests for meetups
    this.getRecipes()
    this.getMeetups()
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
  font-size: 14px
}

.meetup:hover {
  color: green
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

@media (max-width: 1000px) and (min-width: 477px) {
  .main-container {
    margin-left: 51px
  }

}
</style>