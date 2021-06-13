<template>
  <div>
    <div id="main" class="main-container">
      <div id="feed">
        <h3 class="title pl-4 pt-2 pb-1"> Receipt Feed</h3>
        <div style="width:100%; border-top: 1px solid black"/>

        <div class="search-container">
          <input v-model="toSearch" class="search-field" />
          <b-button @click="search" class="search-btn mr-1 mb-1 mt-1"> search </b-button>
        </div>
        <div style="width:100%; border-top: 1px solid black"/>

      </div>
      <div id="infos">
        news
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiptFeed',
  data() {
    return {
      toSearch:""
    }
  },
  methods: {
    onResize(){
      document.getElementById('main').style.marginLeft = '250px'

      if(window.innerWidth < 1000)
        document.getElementById('main').style.marginLeft = '51px'
      if(window.innerWidth < 476)
        document.getElementById('main').style.marginLeft = '0px'

    },
    search(){
      console.log("search: ",this.toSearch)
    }
  },
  created(){
    window.addEventListener('resize',this.onResize)
    console.log("listener added")
  },
}

</script>

<style scoped>
.main-container {
  margin-left: 250px;
  background-color: #E6FFC7;
  height: 100vh;
  display:flex;
  flex-wrap: nowrap;
}

#feed {
  width: 75%;
  border-right: 1px solid black
}

#infos {
  width: 25%;
  background-color: lightgray;
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



@media (max-width: 476px) {
  .main-container {
    width: 100%;
    margin-left: 0px;
  }

}
</style>