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
                  <Meetup :meetObj="obj" @join-event="switchToLogin"></Meetup>
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
                  :imgLink="objR.imgLink"
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
            recipeArray: [{
              id:"0",
              author:"Lucy",
              createdAt: "2021-07-14T20:24:29.547",
              imgLink: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"1",
                author:"John",
                createdAt: "2021-07-13T20:24:29.547",
                imgLink: "https://images.pexels.com/photos/3913295/pexels-photo-3913295.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"2",
                author: "Christian",
                createdAt: "2021-07-13T15:24:29.547",
                name: "Chocolate Cake",
                imgLink: "https://images.pexels.com/photos/4987182/pexels-photo-4987182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"3",
                author: "Lara",
                name: "Spaghetti Bolognese",
                time:"2h",
                imgLink: "https://images.pexels.com/photos/4987182/pexels-photo-4987182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"4",
                author: "Thomas",
                name: "Spaghetti Carbonara",
                time:"2h",
                imgLink: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"5",
                author: "Sophie",
                createdAt: "2021-07-15T12:10:29.547",
                name: "Bio Vegan Bolognese",
                time:"2h",
                imgLink: "https://images.pexels.com/photos/262905/pexels-photo-262905.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
                id:"6",
                author: "Emily",
                createdAt: "2021-07-13T16:32:29.547",
                name: "Chocolate Brownie",
                imgLink: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
              }]
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
                //this.recipeArray = res[1];
            })
            .catch(err => console.log("error"))
        }
    },
    mounted() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.getFeed();
    }
}
</script>