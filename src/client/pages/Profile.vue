<template>
  <div class="wrapper" >
    <div id="main" class="main-container">
      <div class="profile-container">
        <div class="user-data px-5 pt-2 pb-2 mb-3">
          <h4> {{ this.firstname + " " + this.surname }} </h4>
          {{ this.recipes.length }} recipes
        </div>
        <div class="user-cover mx-3" :style="{'background-image': 'url(' + this.userCover +')'}">
        </div>
<!--        :style="{'background-image': s'url(' + require('./assets/media/img.jpg') + ')'}"-->
<!--        <b-button class="profile-btn mx-4 mt-2" pill variant="outline-dark"> <b>Set Up</b> </b-button>-->
        <div class="user-container">
<!--          <div class="user-photo rounded-circle"></div>-->
          <b-avatar src="https://images.pexels.com/photos/7120688/pexels-photo-7120688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" size="13rem"></b-avatar>
          <div class="user-data mt-3">
            <h4> {{ this.firstname }} </h4>
            <div class="" style="font-size: smaller">since {{ this.createdAt.split("T")[0] }}</div>
            <div class="user-stats mt-5">
              <span class="stat mr-4" style="border: 2px solid black; padding: 4px; position: relative; bottom: 15px"> <b>{{ this.recipes.length }}</b> Recipes </span>
<!--              <span class="stat"> <b>0</b> Followers </span>-->
              <span class="stat mr-4" style="border: 2px solid black; padding: 4px; position: relative; bottom: 15px"> <b>{{ this.hostedMeetUpsLength }}</b> MeetUps </span>

            </div>
          </div>

        </div>

      </div>
      <div class="content-container mt-5">
        <div class="profile-menu">
          <div style="display: flex">
            <div class="menuEntry">
              <span v-on:click="paginate('recipes')" style="cursor: pointer"> recipes </span>
              <div :class="{menuShower: recipesMenu}"></div>
            </div>

            <div class="menuEntry">
              <span v-on:click="paginate('meetups')" style="cursor: pointer"> meetups </span>
              <div   :class="{ menuShower: meetupsMenu}"></div>
            </div>
            <div class="menuEntry">
              <span v-on:click="paginate('saved')" style="cursor: pointer"> saved </span>
              <div   :class="{ menuShower: savedMenu}"></div>
            </div>
          </div>
        </div>

        <hr style="border-top: 1px solid black; margin: 0;">

        <add-recipe v-if="recipesMenu"
            @add-event="addRecipe"
        />

        <div v-if="recipesMenu" class="receipt-container">
          <Recipe
              v-for="receipt in recipes"
              :id="receipt.id"
              :name="receipt.name"
              :level="receipt.level"
              :rating="receipt.rating"
              :instruction="receipt.instruction"
              :time="receipt.time"
              :ingredients="receipt.ingredients"
              :isPrivate="receipt.isPrivate"
              :userId="receipt.userId"
              :profileId="id"
              :imgLink="receipt.imgLink"
              @refresh="refresh"
          >
          </Recipe>
          <br>
          <br>
        </div>
        <div v-if="meetupsMenu">
          <div class="m-5">
            <b-row>
              <b-col v-for="obj in meetupArray" :key="obj.id" class="my-2" cols="12" lg="6">
                <Meetup :meetObj="obj" @delete-event="deleteMeetup" @edit-event="editMeetup" @join-event="joinMeetup"></Meetup>
              </b-col>
            </b-row>
          </div>
        </div>
        <div v-if="savedMenu">
          <Recipe
              v-for="receipt in savedRecipes"
              :id="receipt.id"
              :name="receipt.name"
              :level="receipt.level"
              :rating="receipt.rating"
              :instruction="receipt.instruction"
              :time="receipt.time"
              :ingredients="receipt.ingredients"
              :isPrivate="receipt.isPrivate"
              @refresh="refresh"
              :saved="true"
              :userId="receipt.userId"
              :profileId="id"
              :imgLink="receipt.imgLink"
              @unsave-recipe="unsaveRecipe"
          >
          </Recipe>
          <br>
          <br>
        </div>
      </div>
    </div>
    <edit-meetup :recipeOptions="recipeOptions" :meetupsValues="toBeEdited" @edit-meetup="pushEditMeetup"></edit-meetup>
  </div>

</template>

<script>

import Recipe from "@client/components/Recipe";
import Meetup from "@client/components/Meetup";
import addRecipe from "@client/modals/addRecipe";
import BackEndRouter from "@client/utils/http";
import UserStorage from '@client/utils/userStorage'
import EditMeetup from '@client/modals/editMeetup.vue';

export default {
  name: 'Profile',
  components: {
    Recipe,
    addRecipe,
    Meetup,
    EditMeetup
  },
  data() {
    return {
      loggedInUser: UserStorage.readObj("user"),
      firstname: "",
      surname: "",
      createdAt: "",
      recipesMenu: true,
      meetupsMenu: false,
      savedMenu: false,
      menuCollapsed: false,
      userCover: 'https://picsum.photos/1024/400/?image=' + this.getRandomIntInclusive(1,1084).toString(),
      hostedMeetUpsLength: 0,
      savedRecipes: [],
      recipes: [
        /*{
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
        }*/
      ],
      meetupArray: [],
      toBeEdited: undefined,
      recipeOptions: []
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    paginate: function(page) {
      console.log("paginate")
      this.recipesMenu = false
      this.meetupsMenu = false
      this.savedMenu = false
      switch (page) {
        case "recipes":
          this.recipesMenu = true
          break
        case "meetups":
          this.meetupsMenu = true
          break
        case "saved":
          this.savedMenu = true
          break
      }
    },
    addRecipe: function(newRecipe) {
      BackEndRouter.RequestRouter.EndPoints.CREATE('/recipes', newRecipe)
          .then(res => {
            this.recipes.push(res);
          })
          .catch(err => console.log("something went wrong"))

      //this.recipes.push(newRecipe)
    },
    refresh(){
      this.getData()
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
    },
    getData() {
      BackEndRouter.RequestRouter.EndPoints.LIST("/user/" + this.id)
          .then(res => {
            let hostedMeetUps = res.hostedMeetUps;
            this.hostedMeetUpsLength = hostedMeetUps.length;
            let otherMeetUps = res.MeetUps;
            this.meetupArray = otherMeetUps.concat(hostedMeetUps);
            this.recipes = res.Recipes;
            this.savedRecipes = res.savedRecipes;
            this.firstname = res.firstname;
            this.surname = res.surname;
            this.createdAt = res.createdAt;
          })
          .catch(err => console.log("error"))
    },
    unsaveRecipe(id){
      console.log("unsave recipe with id: " + id)
      BackEndRouter.RequestRouter.EndPoints.UPDATE("/recipes/" + id + "/remove")
          .then(res => {
            console.log(res)
            this.refresh()
          })
          .catch(err => console.log("error"))
    },
    deleteMeetup(id) {
        // hostid of meetup
        let hostId = this.meetupArray.filter(ele => ele.id==id)[0].hostId;
        
        // only delete own
        if(hostId !== UserStorage.readObj("user").id) {
            //TODO
            console.log("you can only delete your own meetups!")
            return;
        }

        //Backend request
        BackEndRouter.RequestRouter.EndPoints.DELETE("/meetups/" + id)
            .then(res => {
                this.getData()})
            .catch(err => console.log(err))
    },
    editMeetup(id) {
        this.toBeEdited = this.meetupArray.filter(ele => ele.id==id)[0];

        // only edit own meetup
        if(this.toBeEdited.hostId !== UserStorage.readObj("user").id) {
            //TODO
            console.log("you can only edit your own meetups!")
            return;
        }

        this.$bvModal.show("edit-meetup");
    },
    joinMeetup(id) {
        // hostid of meetup
        let hostId = this.meetupArray.filter(ele => ele.id==id)[0].hostId;

        // not own meetup
        if(hostId === UserStorage.readObj("user").id) {
            //TODO
            console.log("you can not join your own meetups!")
            return;
        }

        //TODO Backend request
        BackEndRouter.RequestRouter.EndPoints.UPDATE("/meetups/" + id + "/addGuest")
            .then(res => this.getData())
            .catch(err => console.log(err))
    },
    setRecipeOptions() {
        let self = this;
        BackEndRouter.RequestRouter.EndPoints.LIST("/recipes")
            .then(res => {
                let newArr = res.map(ele => {
                    delete ele.createdAt;
                    delete ele.updatedAt;
                    delete ele.isPrivate;
                    delete ele.rating;
                    delete ele.userId;
                    return ele;
                });
                newArr.forEach(ele => {
                    delete Object.assign(ele, {value: ele["id"] })["id"];
                    delete Object.assign(ele, {text: ele["name"] })["name"];
                })
                self.recipeOptions = newArr;
            })
            .catch(err => console.log(err))
    },
    pushEditMeetup(editMeetup) {
        this.getData();
    }

  },
  mounted() {
    //get user data (use this id for backend request)
    console.log("profile of: " + this.id);
    console.log("user loged in: " + this.loggedInUser.id)
    //Backend requests for meetups
    this.getData()
    //Backend reqeuest for recipesOptions (recipes -> [{value: id, text: recipe.name}])
    this.setRecipeOptions()
  }
}
</script>
<style scoped>
.wrapper {
  background-color: #E6FFC7;
}
.main-container {
  margin-left: 250px;
  transition: margin 325ms;
}

.profile-container {
  height: 65vh;
}
.content-container {
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
  width: 70%;
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
  overflow: hidden;
  background-image: url(../assets/coverimg.png);
  /*background-image: url(https://picsum.photos/1024/400/?image=41);*/
  background-size: cover;
  background-position: center;

}

.child {
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;

}

.profile-btn {
  float: right;
  width: 15%;
  padding: 0;
}

.profile-menu {
  margin-left: 10%;

}

.menuShower {
  border-bottom: 4px solid black;
  width: 2.5em;
  position: relative;
  left: 0.5%
}

.menuEntry {
  margin-right: 5em
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