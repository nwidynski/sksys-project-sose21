<template>
 <div id="main" class="feed-container">
   Receipt Feed

 </div>
</template>

<script>
export default {
  name: 'ReceiptFeed',
  data() {
    return {

    }
  },
  methods: {
    onResize(){
      document.getElementById('main').style.marginLeft = '250px'

      if(window.innerWidth < 1000)
        document.getElementById('main').style.marginLeft = '51px'
      if(window.innerWidth < 476)
        document.getElementById('main').style.marginLeft = '0px'

    }
  },
  created(){
    window.addEventListener('resize',this.onResize)
    console.log("listener added")
  },
}

</script>

<style>
.feed-container {
  margin-left: 250px;
}

@media (max-width: 476px) {
  .feed-container {
    width: 100%;
    margin-left: 0px;
  }

}
</style>