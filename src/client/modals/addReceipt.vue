<template>
  <div>
    <b-button v-b-modal.add-receipt-modal class="ml-4 mt-3 mb-n2"><b-icon-plus-circle class="add-receipt" title="add receipt"> </b-icon-plus-circle></b-button>
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
            <b-form-input
              id="ingredient-input"
              v-model="ingredients"
              :state="ingredientsState"
              placeholder="chicken:200g water:100ml cheese:500g"
              required
            />

          </b-form-group>
          <b-form-group
            label="Instruction"
          >
            <b-form-textarea placeholder="tell me how... :)" rows="3"/>
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group
                label="Level"
              >
                <b-form-select
                    v-model="level"
                >
                  <b-form-select-option :value="level">switch me</b-form-select-option>
                  <b-form-select-option :value="level">easy</b-form-select-option>
                  <b-form-select-option :value="level">middle</b-form-select-option>
                  <b-form-select-option :value="level">hard</b-form-select-option>

                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  label="Time"

              >
                <b-form-input
                    v-model="time"
                    placeholder="HH:MM"
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
      description: '',
      descriptionState: null,
      level: null,
      levelState: null,
      time: '',
      timeState: null,
      ingredients: '',
      ingredientsState: null,
      ingredientsFeedback:"",
      levels: ["easy","middle","hard"],
      img: null
    }
  },
  methods: {
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.description = "";
      this.descriptionState = null;
      this.level = "";
      this.levelState = null;
      this.time = "";
      this.timeState = null;
      this.ingredients = '';
      this.ingredientsState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      this.handleSubmit();
    },
    checkFormValidity(){
      if(this.name == "") this.nameState = false
      else this.nameState = true

      if(this.ingredients == "") {
        this.ingredientsState = false
        this.ingredientsFeedback = "Food without ingredients? :("
      }else this.ingredientsState = true

      if(this.nameState == true && this.ingredientsState == true) return true
      else return false;
    },
    handleSubmit() {
      if(this.checkFormValidity()) {
        console.log("ok")
        let newreceipt = {
          name: this.name,
          description: this.description,
          time: this.time,
          level: this.level,
          rating: 0,
          ingredients: this.extractIngredients()
        }
        console.log("submit ",newreceipt)
        this.$nextTick(() => {
          this.$bvModal.hide('add-receipt-modal')
        })
      }

    },
    extractIngredients(){

    }
  }

}
</script>

<style>
.add-receipt {
  cursor: pointer;
  font-size: 2em;

}

</style>