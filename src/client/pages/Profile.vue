<template>
  <div class="wrapper">
  <div id="main" class="main-container">
    <div class="profile-container">
        <div class="user-data px-5 pt-2 pb-2 mb-3">
            <h4> {{user.name}} </h4>
             6 recipes
        </div>
        <div class="user-cover mx-3"> </div>
      <b-button class="profile-btn mx-4 mt-2" pill variant="outline-dark"> <b>Set Up</b> </b-button>

        <div class="user-container">
          <div class="user-photo rounded-circle"></div>
          <div class="user-data mt-3">
            <h4> {{ user.name }} </h4>
            <div class="ml-1" style="font-size: smaller">since April 2019</div>
            <div class="user-stats mt-5">
                <span class="stat mr-4"> <b>0</b> Following </span>
                <span class="stat"> <b>0</b> Followers </span>
            </div>
          </div>

        </div>

    </div>
    <div class="content-container">
      <div class="profile-menu">
        <span v-on:click="paginate" style="cursor: pointer"> recipes </span>
        <div v-if="recipesMenu"  class="recipes"></div>
      </div>

      <hr style="border-top: 1px solid black; margin: 0;">

      <add-recipe
          @add-event="addRecipe"
      />

      <div class="receipt-container">
        <Recipe
          v-for="receipt in recipes"
          :name="receipt.name"
          :level="receipt.level"
          :rating="receipt.rating"
          :instruction="receipt.instruction"
          :time="receipt.time"
          :ingredients="receipt.ingredients"
        >

        </Recipe>
      </div>
    </div>
  </div>
  </div>

</template>

<script>

import Recipe from "@client/components/Recipe";
import addRecipe from "@client/modals/addRecipe";
import BackEndRouter from "@client/utils/http";

export default {
  name: 'Profile',
  components: {
  Recipe,
  addRecipe
  },
  data() {
    return {
      user: this.$root.user,
      recipesMenu: true,
      menuCollapsed: false,
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
          instruction: "easy peasy instruction",
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
        }
      ]
    }
  },
  methods: {
    paginate: function() {
      console.log("paginate")
    },
    addRecipe: function(newRecipe) {
      console.log("test")
      this.recipes.push(newRecipe)
    },
    getRecipes: function() {
      BackEndRouter.RequestRouter.EndPoints.LIST("/recipes")
          .then(res => {
            this.recipes = res;
          })
          .catch(err => console.log("error"))
    }
  },
  mounted() {
    //Backend requests for meetups
    this.getRecipes()
  }
}
</script>
<style scoped>
.wrapper {
  background-color: #E6FFC7;
}
.main-container {
  background-color: #E6FFC7;
  margin-left: 250px;
  transition: margin 325ms
}

.profile-container {
  background-color: #E6FFC7;
  height: 65vh;
}
.content-container {
  background-color: #E6FFC7;

}

.receipt-container {
}

.user-data {
  line-height: .5em;
}

.user-container {
  position: relative;
  left: 10%;
  bottom: 105px;
  width: 70%
}

.user-photo {
  background-color: gray;
  width: 200px;
  height: 200px;
  background-image: url(../assets/profileimg.png);
  background-size: cover;
  background-position: center;
}

.user-cover {
  background-color: white;
  border: solid 1px black;
  height: 27vh;
  background-image: url(../assets/coverimg.png);
  background-size: cover;
  background-position: center;
}

.profile-btn {
  float: right;
  width: 15%;
  padding: 0;
}

.profile-menu {
  margin-left: 10%
}

.recipes {
  border-bottom: 4px solid black;
  width: 2.5em;
  position: relative;
  left: 0.5%
}



@media (max-width: 476px) {
  .main-container {
    width: 100%;
    margin-left: 0px;
  }

}

@media (max-width: 1000px) and (min-width: 477px) {
  .main-container {
    margin-left: 51px
  }

}

</style>