<template>
  <div>
    <b-button v-b-modal.add-receipt-modal class="ml-4 mt-3 mb-n2 addRcpt"><b-icon-plus class="add-receipt" title="add receipt"> </b-icon-plus></b-button>
    <b-modal
      id="add-receipt-modal"
      ref="modal"
      title="Add new receipt"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :level="level"
    >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Receipt name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
              placeholder="yummy food name"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            label="Ingredients"
            label-for="ingredient-input"
            :invalid-feedback="ingredientsFeedback"
            :state="ingredientsState"
          >
            <!--
            <b-form-input
              id="ingredient-input"
              v-model="ingredients"
              :state="ingredientsState"
              placeholder="chicken:200g water:100ml cheese:500g"
              required
            />
            -->

            <b-row
              v-for="ingredient in ingredientsList"
              class="mb-1"
            >
              <b-col> <b-input v-model="ingredient.name" placeholder="ingredient"/></b-col>
              <b-col> <b-input v-model="ingredient.amount" placeholder="amount"/></b-col>
              <b-col> <b-form-select v-model="ingredient.unit" :options="options"/></b-col>
            </b-row>
          </b-form-group>
          <b-button class="mr-1" @click="addIngredient">+</b-button>
          <b-button @click="deleteIngredient">-</b-button>

          <b-form-group
            label="Instruction"
          >
            <b-form-textarea v-model="instruction" placeholder="tell me how... :)" rows="3"/>
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group
                label="Level"
              >
                <b-form-select
                    v-model="level"
                    :options="levelOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  label="Time"

              >
                <b-form-input
                    v-model="time"
                    placeholder="1h 30min"
                />

              </b-form-group>
            </b-col>
          </b-row>
          <b-form-file v-model="img" accept=".jpg, .png, .gif"></b-form-file>
        </form>
     </b-modal>
  </div>

</template>

<script>

export default {
  name: 'addReceipt',
  data() {
    return {
      name: '',
      nameState: null,
      instruction: '',
      instructionState: null,
      level: null,
      levelState: null,
      time: '',
      timeState: null,
      ingredients: '',
      ingredientsState: null,
      ingredientsFeedback:"",
      levels: ["easy","middle","hard"],
      img: null,
      ingredientsList: [{
        name: "",
        amount: "",
        unit: null
      }],
      selected:null,
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
        {value:"none",text:"none"}
      ],
      levelOptions:[
        {value:null, text:"switch me", disabled:true},
        {value:"easy", text:"easy"},
        {value:"middle", text:"middle"},
        {value:"hard", text:"hard"},
      ]
    }
  },
  methods: {
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.instruction = "";
      this.instructionState = null;
      this.level = null;
      this.levelState = null;
      this.time = "";
      this.timeState = null;
      this.ingredients = '';
      this.ingredientsState = null;
      this.ingredientsList = [{
        name:"",
        amount:"",
        unit:null
      }]
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      this.handleSubmit();
    },
    checkFormValidity(){
      if(this.name == "") this.nameState = false
      else this.nameState = true
      if(this.ingredientsList.length == 1 && this.ingredientsList[0].name == "" && this.ingredientsList[0].amount == "" && this.ingredientsList[0].unit == null){
        this.ingredientsState = false
        this.ingredientsFeedback = "Food without ingredients? :("
      }
      else
        this.ingredientsState = true

      if(this.nameState == true && this.ingredientsState == true) return true
      else return false;
    },
    handleSubmit() {
      if(this.checkFormValidity()) {
        console.log("ok")
        let newreceipt = {
          name: this.name,
          instruction: this.instruction,
          time: this.time,
          level: this.level,
          rating: "0",
          ingredients: this.ingredientsList
        }

        console.log("submit ",newreceipt)
        this.$emit('add-event',newreceipt)
        this.$nextTick(() => {
          this.$bvModal.hide('add-receipt-modal')
        })
      }

    },
    extractIngredients(){

    },
    addIngredient() {
      if(this.ingredientsList[this.ingredientsList.length - 1].name != "" && this.ingredientsList[this.ingredientsList.length - 1].amount != "" && this.ingredientsList[this.ingredientsList.length - 1].unit != null){
        this.ingredientsList.push({name: '', amount: '', unit: null})
        this.ingredientsState = true
      }
      else {
        this.ingredientsFeedback = "Please complete the last ingredient"
        this.ingredientsState = false
      }
    },
    deleteIngredient(){
      if(this.ingredientsList.length == 1){
        this.ingredientsFeedback = "Food without ingredients? :("
        this.ingredientsState = false
      }
      else{
        this.ingredientsList.pop()
        this.ingredientsState = true
      }

    }
  }

}
</script>

<style>
.add-receipt {
  cursor: pointer;
  font-size: 2em;

}

.addRcpt {
  position: fixed;
  z-index: 9999;
  bottom: 1em;
  right: 1.5em;
  background-color: black !important;
}

</style>