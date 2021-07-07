<template>
  <div>
    <!-- Receipt Card -->
    <div v-if="!editing && !onFeed" class="mt-3 mx-3 card-container">

      <b-card class="m-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
        <template #header>
          <b-icon-trash class="mt-1 edit-button" title="edit" @click="deleteRecipe"></b-icon-trash>
          <b-icon-pencil-fill class="mt-1 edit-button" title="edit" @click="editClicked"></b-icon-pencil-fill>
          <h4 class="mb-0">{{ name }}</h4>
        </template>
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

        <b-input-group style="width: 65%" size="sm" :append="rating.toString()">
          <b-form-rating readonly v-model="rating" variant="warning" class="mb-2"></b-form-rating>
        </b-input-group>

        <b-card-text class="mt-3">
          <div v-if="this.level" class="receipt-attribute"> {{level}} </div>
          <div v-if="this.time" class="receipt-attribute"> {{time}} </div>

        </b-card-text>
      </b-card>
    </div>
    <!-- Editing Card -->
    <div v-if="editing" class="mt-3 mx-3 card-container">

      <b-card  class="m-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
        <template #header>
          <b-icon-trash class="mt-1 edit-button" title="edit" @click="deleteRecipe"></b-icon-trash>
          <b-icon-pencil-fill class="mt-1 edit-button" title="edit" @click="editClicked"></b-icon-pencil-fill>
          <b-input style="width:35%;font-weight:500; font-size: 1.5em; color: black" class="ml-n2" v-model="name"/>
        </template>

        <b-card-text class="ingredients-container">
          <h5>Ingredients</h5>
          <b-list-group-item
              v-for="ingredient in ingredients"
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
              v-model="instruction"
              rows="10"
          >
          </b-form-textarea>
        </b-card-text>

        <b-input-group style="width:50%" size="sm" :append="rating.toString()">
          <b-form-rating readonly v-model="rating" variant="warning" class="mb-2"></b-form-rating>
        </b-input-group>

        <b-card-text class="mt-3">
          <div @click="levelClicked" class="receipt-attribute" style="cursor: pointer"> {{level ? level : "level"}} </div>
          <input @click="timeClicked" placeholder="-h -min" class="receipt-attribute" style="cursor: pointer;outline:none; border:1px solid black" v-model="time">
        </b-card-text>

        <b-button class="mr-3" @click="editClicked">Save</b-button>
        <b-button @click="editCancel">Cancel</b-button>
      </b-card>
    </div>

    <!-- ReceiptFeedCard -->

    <div v-if="onFeed" class="feed-receipt-container">
      <div class="mt-4 mx-3 feed-user-top" style="display: flex">
        <b-avatar class="mt-2" size="3rem"/>

        <div class="mx-3" style="width: 100%">
          <b-icon-three-dots v-if="!showOptions" class="icon" style="float: right" @click="feedOptions"></b-icon-three-dots>

          <!-- TODO -->
          <div v-if="showOptions" style="float: right; background-color: #2a2a2e; color: white; font-size: medium">
            <b-icon-x style="float: right; cursor: pointer; margin: 5px" @click="() => this.showOptions = !this.showOptions"/>

            <div class="feedOption">
              <div>save <small>(soon)</small></div>
              <div @click="notInteressted">not interessted</div>
            </div>
          </div>

          <div> {{ author }}</div>

          <div class="feed-user-top-info" style="position: absolute"> posted at {{ createdAt.split("T")[1].substring(0,5) }}</div>
        </div>

      </div>

      <div class="mt-3 mx-3 card-container">
        <b-card class="m-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
          <template #header>
            <h4 class="mb-0">{{ name }}</h4>
          </template>

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
          <b-input-group style="width:50%" size="sm" :append="rating.toString()">
            <b-form-rating readonly v-model="rating" variant="warning" class="mb-2"></b-form-rating>
          </b-input-group>

          <b-card-text class="mt-3">
            <div v-if="this.level" class="receipt-attribute"> {{level}} </div>
            <div v-if="this.time" class="receipt-attribute"> {{time}} </div>
            <div v-if="this.instruction">
              <b-icon-arrow-down-circle-fill class="icon h3" v-if="collapsedFeed" style="float: right" @click="collapsing"/>
              <b-icon-arrow-up-circle-fill class="icon h3" v-else style="float: right" @click="collapsing"/>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>

  </div>

</template>

<script>

import BackEndRouter from "@client/utils/http";

export default {
  name: 'Receipt',
  data() {
    return {
      editing: false,
      levels: ["hard","middle","easy"],
      value: '',
      backup: {
        name: "",
        level: "",
        instruction: "",
        rating: "",
        time: "",
        ingredients: "",
        done: false,
      },
      collapsedFeed: true,
      showOptions: false,
      options:[
        {value:"null",text:"unit",disabled:true},
        {value:"kg",text:"kg"},
        {value:"g",text:"g"},
        {value:"l",text:"l"},
        {value:"ml",text:"ml"},
        {value:"tsp",text:"tsp"},
        {value:"tbsp",text:"tbsp"},
        {value:"handful",text:"handful"},
        {value:"pinch of",text:"pinch of"},
        {value:"none",text:"none"}
      ]
    }
  },

  props: {
    id: String,
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
      type: Number,
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

  },
  methods: {
    collapsing() {
      this.collapsedFeed = !this.collapsedFeed
      console.log("now: " + this.collapsedFeed)
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
      this.editing = !this.editing;
      if(!this.backup.done){
        this.backup.name = this.name;
        this.backup.instruction = this.instruction;
        this.backup.time = this.time;
        this.backup.level = this.level;
        this.backup.rating = this.rating;
        this.backup.ingredients = JSON.parse(JSON.stringify(this.ingredients));
        //console.log(this.backup.ingredients)
        this.backup.done = true;
        console.log("backup finished")
      }
      if(!this.editing){
        this.backup.done = false;
        console.log("submit changes to server")
        let editObj = {
          name: this.name,
          instruction: this.instruction,
          time: this.time,
          rating: this.rating,
          ingredients: this.ingredients,
          author: this.author,
          isPrivate: this.isPrivate
        }
        console.log(this.id)
        console.log(editObj)
        BackEndRouter.RequestRouter.EndPoints.UPDATE("/recipes/" + this.id, editObj)
            .then(res => {
              console.log("submit done");

            })
            .catch(err => {
              console.log(err);
              this.editCancel();
            })
      }
    },
    editCancel() {
      this.name = this.backup.name
      this.instruction = this.backup.instruction
      this.level = this.backup.level
      this.time = this.backup.time
      this.rating = this.backup.rating
      this.ingredients = this.backup.ingredients
      this.editing = false;
      this.backup.done = false;
      console.log("backup reset")
    },
    levelClicked() {
      if (this.levels.indexOf(this.level) == this.levels.length - 1)
        this.level = this.levels[0]
      else
        this.level = this.levels[this.levels.indexOf(this.level) + 1]
    },
    timeClicked() {

    },
    addIngredient() {
      if(this.ingredients[this.ingredients.length - 1].name != "" && this.ingredients[this.ingredients.length - 1].amount != "" && this.ingredients[this.ingredients.length - 1].unit != null){

        this.ingredients.push({name: '', amount: '', unit: null})
      }
      else {
        alert("Please complete the last recipe")
      }
    },
    deleteIngredient(){
      if(this.ingredients.length == 1){
        alert("You need minimum 1 ingredient")
      }
      else{
        this.ingredients.pop()
      }

    },
    notInteressted() {
      this.$emit('not-interessted',this.$props.id)
      this.showOptions = false
      console.log("first")
    }
  }
}
</script>
<style>
.receipt-container {

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
  margin-right: 2%
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