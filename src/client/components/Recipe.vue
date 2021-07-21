<template>
  <div>
    <!-- Receipt Card -->
    <div v-if="!editing && !onFeed">

      <b-card class="m-3" style="border-radius: 10px; border: 1px solid black">
        <div class="card-body-container">

          <div class="img-container">
            <b-card-img :src="this.imgLink" ></b-card-img>
          </div>
          <div class="card-body-header">
            <span v-if="saved && profileOwner" id="unsave-button" @click="unsaveRecipe" style="float:right; font-weight: lighter; cursor: pointer"> unsave </span>
            <b-icon-trash v-if="recipeOwner && profileOwner" class="mt-1 edit-button" title="edit" @click="deleteRecipe"></b-icon-trash>
            <b-icon-pencil-fill v-if="recipeOwner && profileOwner" class="mt-1 edit-button" title="edit" @click="editClicked"></b-icon-pencil-fill>
            <h4 class="mb-0">{{ name }}</h4>
          </div>
          <div class="m-3">

            <b-card-text class="ingredients-container">
              <h5>Ingredients</h5>
              <b-list-group-item
                  v-for="ingredient in ingredients"
                  class="list-item"
              >
                <div class="col-6" style="display:inline-block; width:50%">{{ingredient.name}}</div>
                <span class="col-6">{{ ingredient.amount }} {{ingredient.unit == "none" ? "" : ingredient.unit}}</span>
              </b-list-group-item>
            </b-card-text>

            <b-card-text v-if="this.instruction">
              {{ instruction }}
            </b-card-text>

            <b-input-group style="width: 65%" size="sm">
              <b-form-rating show-value show-value-max :readonly="recipeOwner" @change="submitNewRating" v-model="newRating" variant="warning" class="mb-2"></b-form-rating>
            </b-input-group>

            <b-card-text class="mt-3">
              <div v-if="this.level" class="receipt-attribute"> {{level}} </div>
              <div v-if="this.time" class="receipt-attribute"> {{time}} </div>

            </b-card-text>
          </div>

        </div>

      </b-card>
    </div>
    <!-- Editing Card -->
    <div v-if="editing" >

      <b-card class="m-3" style="border-radius: 10px; border: 1px solid black">
        <div class="card-body-container">

          <div class="img-container">
            <b-card-img :src="this.imgLink"></b-card-img>
          </div>
          <div class="card-body-header">
            <b-icon-trash class="mt-1 edit-button" title="edit" @click="deleteRecipe"></b-icon-trash>
            <b-icon-pencil-fill class="mt-1 edit-button" title="edit" @click="editClicked"></b-icon-pencil-fill>
            <b-input style="width:35%;font-weight:500; font-size: 1.5em; color: black" class="ml-n2" v-model="editRecipe.name"/>
          </div>
          <div class="m-3">

            <b-card-text class="ingredients-container">
              <h5>Ingredients</h5>
              <b-list-group-item
                  v-for="ingredient in editRecipe.ingredients"
                  class="list-item"
              >
                <b-row>
                  <b-col> <b-input v-model="ingredient.name" placeholder="ingredient"/></b-col>
                  <b-col> <b-input v-model="ingredient.amount" placeholder="amount"/></b-col>
                  <b-col> <b-form-select v-model="ingredient.unit" :options="options"/></b-col>
                </b-row>
              </b-list-group-item>
              <b-button class="mr-1 mt-2" @click="addIngredient">+</b-button>
              <b-button class="mt-2" @click="deleteIngredient">-</b-button>

            </b-card-text>

            <b-card-text >
              <h5>Instruction</h5>

              <b-form-textarea
                  v-model="editRecipe.instruction"
                  rows="10"
              >
              </b-form-textarea>
            </b-card-text>

            <b-form-group>
              <b-form-checkbox
                  id="checkbox-1"
                  v-model="editRecipe.isPrivate"
                  name="checkbox-1"
              >
                private recipe
              </b-form-checkbox>
            </b-form-group>

            <b-input-group style="width:50%" size="sm">
              <b-form-rating show-value show-value-max readonly @change="submitNewRating" v-model="newRating" variant="warning" class="mb-2"></b-form-rating>
            </b-input-group>

            <b-card-text class="mt-3">
              <div @click="levelClicked" class="receipt-attribute" style="cursor: pointer"> {{this.editRecipe.level ? this.editRecipe.level : "level"}} </div>
              <input @click="timeClicked" placeholder="-h -min" class="receipt-attribute" style="cursor: pointer;outline:none; border:1px solid black" v-model="editRecipe.time">
            </b-card-text>
            <b-form-file class="mb-3" v-model="img" accept=".jpg, .png, .gif"></b-form-file>

            <b-button class="mr-3" @click="editClicked">Save</b-button>
            <b-button @click="editCancel">Cancel</b-button>
          </div>
        </div>
      </b-card>
    </div>

    <!-- ReceiptFeedCard -->

    <div v-if="onFeed" class="feed-receipt-container">
      <div class="mt-4 mx-3 feed-user-top" style="display: flex">
        <span @click="goToProfile">
        <b-avatar class="mt-2 avatar" style="cursor: pointer" :title="this.author" size="3rem"/>
          </span>
        <div class="mx-3" style="width: 100%">
          <b-icon-three-dots v-if="!showOptions && this.loggedInUser" class="icon" style="float: right" @click="feedOptions"></b-icon-three-dots>

          <!-- TODO -->
          <div v-if="showOptions" style="float: right; background-color: #2a2a2e; color: white; font-size: medium">
            <b-icon-x style="float: right; cursor: pointer; margin: 5px" @click="() => this.showOptions = !this.showOptions"/>

            <div class="feedOption">
              <div @click="saveRecipe">save</div>
              <div @click="notInteressted">not interessted</div>
              <div v-if="recipeOwner" @click="editClicked"> edit </div>
            </div>
          </div>

          <span class="author" @click="goToProfile" style="cursor: pointer">
            ClickMe Test {{ author }}
          </span>

          <div class="feed-user-top-info" style="position: absolute"> posted {{ createdAt.split("T")[1].substring(0,5) + ", " + createdAt.split("T")[0]  }}</div>
        </div>

      </div>

        <b-card body-class="" class="m-3" style="border-radius: 10px; border: 1px solid black">
          <div class="card-body-container">
            <div class="img-container">
            <b-card-img :src="this.imgLink"></b-card-img>
            </div>
            <div class="card-body-header">
              <h4 class="mb-0">{{ name }}</h4>
            </div>
            <div class="m-3">
              <b-card-text class="ingredients-container">
                <h5>Ingredients</h5>
                <b-list-group-item
                    v-for="ingredient in ingredients"
                    class="list-item"
                >
                  <div class="col-6" style="display:inline-block; width:50%">{{ingredient.name}}</div>
                  <span class="col-6">{{ ingredient.amount }} {{ingredient.unit == "none" ? "" : ingredient.unit}}</span>
                </b-list-group-item>
              </b-card-text>
              <div v-if="this.instruction">
                <div v-if="!collapsedFeed" class="mb-3">
                  <b-card-text>
                    {{ instruction }}
                  </b-card-text>
                </div>
                <div v-else class="mb-3"> {{ instruction.substring(0,200) + "..." }} </div>
              </div>
              <b-input-group style="width:50%" size="sm">
                <b-form-rating show-value show-value-max :readonly="recipeOwner" @change="submitNewRating" v-model="newRating" variant="warning" class="mb-2"></b-form-rating>
              </b-input-group>

              <b-card-text class="mt-3">
                <div v-if="this.level" class="receipt-attribute"> {{level}} </div>
                <div v-if="this.time" class="receipt-attribute"> {{time}} </div>
                <div v-if="this.instruction">
                  <b-icon-arrow-down-circle-fill class="icon h3" v-if="collapsedFeed" style="float: right" @click="collapsing"/>
                  <b-icon-arrow-up-circle-fill class="icon h3" v-else style="float: right" @click="collapsing"/>
                </div>
              </b-card-text>
            </div>
          </div>
        </b-card>
    </div>

  </div>

</template>

<script>

import BackEndRouter from "@client/utils/http";
import UserStorage from "@client/utils/userStorage";

export default {
  name: 'Receipt',
  data() {
    return {
      img: null,
      loggedInUser: UserStorage.readObj("user"),
      recipeOwner: false,
      profileOwner: false,
      editing: false,
      levels: ["hard","middle","easy"],
      value: '',
      editRecipe: {
        name: "",
        level: "",
        instruction: "",
        rating: "",
        time: "",
        ingredients: "",
        isPrivate:"",
        done: false,
      },
      newRating:0,
      collapsedFeed: true,
      showOptions: false,
      options:[
        {value:null,text:"unit",disabled:true},
        {value:"kg",text:"kg"},
        {value:"g",text:"g"},
        {value:"l",text:"l"},
        {value:"ml",text:"ml"},
        {value:"tsp",text:"tsp"},
        {value:"tbsp",text:"tbsp"},
        {value:"handful",text:"handful"},
        {value:"pinch of",text:"pinch of"},
        {value:null,text:"none"}
      ]
    }
  },

  props: {
    id: String,
    profileId: String,
    userId: String,
    name: {
      type: String,
      default: ""
    },
    level: {
      type: String,
      default: ""
    },
    instruction: {
      type: String,
      default: ""
    },
    rating: {
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    ingredients: Array,
    onFeed: {
      type: Boolean,
      default: false
    },
    author: String,
    isPrivate: Boolean,
    createdAt: String,
    saved: Boolean,
    imgLink: {
      type: String,
      default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
    }

  },
  methods: {

    goToProfile() {
      if(this.loggedInUser) {
        this.$router.push({path: '/private/profile/' + this.userId})
      }
    },
    submitNewRating() {
      BackEndRouter.RequestRouter.EndPoints.UPDATE("/recipes/" + this.id + "/rate",{rating: this.newRating})
          .then(res => {
              console.log(res);
              this.newRating = res.rating
              this.$emit('refresh')
          })
          .catch(err => {
            this.newRating = this.rating
            console.log(err)
          })
    },
    collapsing() {
      this.collapsedFeed = !this.collapsedFeed
    },
    feedOptions() {
      this.showOptions = !this.showOptions
    },
    deleteRecipe() {
      BackEndRouter.RequestRouter.EndPoints.DELETE("/recipes/" + this.id)
          .then(res => {
            {
              console.log(res);
              this.$emit('refresh')
            };
            })
          .catch(err => console.log(err))

    },
    editClicked() {
      console.log("editClicked")
      this.editing = !this.editing;
      this.showOptions = false
      if(!this.editRecipe.done){
        this.editRecipe.name = this.name;
        this.editRecipe.instruction = this.instruction;
        this.editRecipe.time = this.time;
        this.editRecipe.level = this.level;
        this.editRecipe.rating = this.rating;
        this.editRecipe.isPrivate = this.isPrivate;
        this.editRecipe.ingredients = this.ingredients //JSON.parse(JSON.stringify(this.ingredients));
        //console.log(this.editRecipe.ingredients)
        this.editRecipe.done = true;
        console.log("backup finished")
      }
      if(!this.editing){
        this.editRecipe.done = false;
        console.log("submit changes to server")
        let editObj = {
          name: this.editRecipe.name,
          instruction: this.editRecipe.instruction,
          time: this.editRecipe.time,
          rating: this.editRecipe.rating,
          ingredients: this.editRecipe.ingredients,
          author: this.editRecipe.author,
          isPrivate: this.editRecipe.isPrivate,
          img: this.img
        }
        BackEndRouter.RequestRouter.EndPoints.UPDATE("/recipes/" + this.id, editObj)
            .then(res => {
              console.log("submit done");
              this.$emit('refresh')
            })
            .catch(err => {
              console.log(err);
              this.editCancel();
            })
      }
    },
    editCancel() {
      this.editing = false;
      this.editRecipe.done = false;
      let ingredients = this.editRecipe.ingredients
      let last = ingredients.length - 1

      if(ingredients[last].name == "" && ingredients[last].amount == ""){
        ingredients.pop()
      }
      console.log("backup reset")
    },
    levelClicked() {
      if (this.levels.indexOf(this.editRecipe.level) == this.levels.length - 1)
        this.editRecipe.level = this.levels[0]
      else
        this.editRecipe.level = this.levels[this.levels.indexOf(this.editRecipe.level) + 1]
    },
    timeClicked() {

    },
    addIngredient() {
      let ingredients = this.editRecipe.ingredients
      let last = ingredients.length - 1
      if(ingredients[last].name != "" && ingredients[last].amount != ""){
        ingredients.push({name: '', amount: '', unit: null})
      }
      else {
        alert("Please complete the last recipe")
      }
    },
    deleteIngredient(){
      if(this.editRecipe.ingredients.length == 1){
        alert("You need minimum 1 ingredient")
      }
      else{
        this.editRecipe.ingredients.pop()
      }

    },
    notInteressted() {
      this.$emit('not-interessted',this.$props.id)
      this.showOptions = false
    },
    saveRecipe() {
      this.$emit('save-recipe',this.$props.id)
      this.showOptions = false
    },
    unsaveRecipe() {
      this.$emit('unsave-recipe',this.$props.id)
    }
/*    getOwnerBoolean(){
      let owner = false
      if(this.loggedInUser.id == this.userId) {
        owner = true
      }
      consoler.log("asdkaslödkasöldkölaskdölsakdölk")
      console.log(owner)
      return owner
    }*/
  },
  mounted() {
    //console.log("recipeID: " + this.$props.id)

    //console.log(this.loggedInUser.id == this.$props.userId)
    if(this.loggedInUser) {
      console.log("userLoggedIn: " + this.loggedInUser.id)
      console.log("userID: " + this.$props.userId)
      console.log("profileID: " + this.$props.profileId)
      this.recipeOwner = this.loggedInUser.id == this.$props.userId
      this.profileOwner = this.loggedInUser.id == this.$props.profileId
      console.log("recipeOwner: " + this.recipeOwner)
      console.log("profileOwner: " + this.profileOwner)
    }

    //UserStorage.checkIfOwner(this.$props.userId)
    this.newRating = this.rating

  }
}
</script>
<style>
.receipt-container {

}

.img-container {
  height: 250px;
  overflow: hidden
}

.author:hover{
  color: gray;
}
.card-body-container {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 10px
}

.card-body-header {
  background-color:rgba(0, 0, 0, 0.03);
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125)
}

.list-item:nth-child(even) {
  background-color: #ebebeb
}
.list-item:nth-child(odd) {
}

.list-item:hover{
  border: 1px solid black !important;
}

.receipt-attribute {
  border: 1px black solid;
  display: inline-block;
  border-radius: 50px;
  padding: 0 14px 0 14px;
  text-align: center;
  margin-right: 2%;
  width: 9em
}

.receipt-attribute:hover {
  background-color: gray;
  color: white
}

.input-ingredient {
  border: 1px solid lightgray;
  border-radius: 5px;
  line-height: 2em;
}

.icon {
  cursor: pointer
}

.edit-button {
  margin-right:10px;
  float:right;
  cursor: pointer
}

#unsave-button:hover {
  background-color: lightgray;
  border-radius: 4px;

}
.timepicker {
  background-color: yellow;

  position: absolute;
}

.card-container {
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
}

.feed-receipt-container {
}

.feed-user-top {
  font-weight: 500;
  font-size: x-large;
}

.feed-user-top-info {
  font-size: large;
  font-weight: 300;
}

@media only screen and (max-width: 950px) {
  .receipt-attribute {
  }
}

@media only screen and (max-width: 476px) {
  .img-container {
    height: auto !important
  }
}

.feedOption {
  margin: 1em
}

.feedOption > div{
  cursor: pointer
}
.feedOption > div:hover{
  color: lightgray
}

</style>