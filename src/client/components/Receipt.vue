<template>
  <div>

      <b-card class="mt-4 mx-3" :img-src="require('@/client/assets/foodimg2.png')" img-alt="Card image" img-top>
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
  </div>

</template>

<script>

export default {
  name: 'Receipt',
  data() {
    return {
    }
  },

  props: {
    name: String,
    level: String,
    description: String,
    rating: String,
    time: String,
    ingredients: Array

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
  width: 15%;
  text-align: center;
  margin-right: 2%
}



</style>