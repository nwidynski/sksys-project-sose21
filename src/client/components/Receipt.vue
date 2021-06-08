<template>
  <div>

      <b-card v-if="!editing" class="mt-4 mx-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
        <template #header>
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
              <span class="col-6">{{ ingredient.amount}}</span>
          </b-list-group-item>
        </b-card-text>

        <b-card-text>
          {{ description }}
        </b-card-text>

        <b-input-group style="width:50%" size="sm" :append="rating">
          <b-form-rating readonly v-model="rating" variant="warning" class="mb-2"></b-form-rating>
        </b-input-group>

        <b-card-text class="mt-3">
          <div class="receipt-attribute"> {{level}} </div>
          <div class="receipt-attribute"> {{time}} </div>

        </b-card-text>
      </b-card>

    <b-card v-else class="mt-4 mx-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
      <template #header>
        <b-icon-pencil-fill class="mt-1 edit-button" title="edit" @click="editClicked"></b-icon-pencil-fill>
        <b-input style="width:35%;font-weight:500; font-size: 1.5em; color: black" class="ml-n2" v-model="name"/>
      </template>

      <b-card-text class="ingredients-container">
        <h5>Ingredients</h5>
        <b-list-group-item
            v-for="ingredient in ingredients"
            class="list-item"
        >
          <div style="width:50%; display:inline-block">
            <input class="input-ingredient" v-model="ingredient.name"/>
          </div>
          <span>
              <input class="input-ingredient" v-model="ingredient.amount"/>
          </span>
        </b-list-group-item>
      </b-card-text>

      <b-card-text >
        <b-form-textarea
            v-model="description"
            rows="10"
        >
        </b-form-textarea>
      </b-card-text>

      <b-input-group style="width:50%" size="sm" :append="rating">
        <b-form-rating readonly v-model="rating" variant="warning" class="mb-2"></b-form-rating>
      </b-input-group>

      <b-card-text class="mt-3">
        <div @click="levelClicked" class="receipt-attribute" style="cursor: pointer"> {{level}} </div>
          <input @click="timeClicked" placeholder="HH:MM" class="receipt-attribute" style="cursor: pointer;outline:none; border:1px solid black" v-model="time">
      </b-card-text>

      <b-button class="mr-3" @click="editClicked">Save</b-button>
      <b-button @click="editCancel">Cancel</b-button>
    </b-card>
  </div>

</template>

<script>

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
        description: "",
        rating: "",
        time: "",
        ingredients: "",
        done: false
      }
    }
  },

  props: {
    name: String,
    level: String,
    description: String,
    rating: String,
    time: String,
    ingredients: Array

  },
  methods: {
    editClicked() {
      this.editing = !this.editing;
      if(!this.backup.done){
        this.backup.name = this.name;
        this.backup.description = this.description;
        this.backup.time = this.time;
        this.backup.level = this.level;
        this.backup.rating = this.rating;
        this.backup.ingredients = JSON.parse(JSON.stringify(this.ingredients));
        this.backup.done = true;
        console.log("backup finished")
      }
      if(!this.editing){
        this.backup.done = false;
        console.log("submit changes to server")
      }
    },
    editCancel() {
      this.name = this.backup.name
      this.description = this.backup.description
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
  width: 10%;
  text-align: center;
  margin-right: 2%;
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

.edit-button {
  margin-right:10px;
  float:right;
  cursor: pointer
}

.timepicker {
  background-color: yellow;

  position: absolute;
}

@media only screen and (max-width: 950px) {
  .receipt-attribute {
    width: 100px
  }
}


</style>