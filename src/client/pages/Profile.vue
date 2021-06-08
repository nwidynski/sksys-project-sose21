<template>
  <div class="wrapper">

  <div class="main-container">
    <div class="profile-container">
        <div class="user-data px-5 pt-2 pb-2 mb-3">
            <h4> Username </h4>
             0 receips
        </div>
        <div class="user-cover mx-3"> </div>
      <b-button class="profile-btn mx-4 mt-2" pill variant="outline-dark"> <b>Set Up</b> </b-button>

        <div class="user-container">
          <div class="user-photo rounded-circle"></div>
          <div class="user-data mt-3">
            <h4> Username </h4>
            <div class="ml-1" style="font-size: smaller">since April 2019</div>
            <div class="user-stats mt-5">
                <span class="stat mr-4"> <b>0</b> Following </span>
                <span class="stat"> <b>0</b> Followers </span>
            </div>
          </div>

        </div>

    </div>
    <div class="content-container">
      <div class="profile-menu">
        <span v-on:click="paginate" style="cursor: pointer"> recipes </span>
        <div v-if="recipesMenu"  class="recipes"></div>
      </div>

      <hr style="border-top: 1px solid black; margin: 0;">

      <add-receipt
      />

      <div class="receipt-container">
        <Receipt
          v-for="receipt in recipes"
          :name="receipt.name"
          :level="receipt.level"
          :rating="receipt.rating"
          :description="receipt.description"
          :time="receipt.time"
          :ingredients="receipt.ingredients"
        >

        </Receipt>
      </div>
    </div>
  </div>
  </div>

</template>

<script>

import Receipt from "@client/components/Receipt";
import addReceipt from "@client/modals/addReceipt";

export default {
  name: 'Profile',
  components: {
  Receipt,
  addReceipt
  },
  data() {
    return {
      recipesMenu: true,
      recipes: [
        {
          id:0,
          name: "Pizza",
          time: "3h",
          description: "Zunächst für den Pizzateig Mehl, Grieß und Salz gründlich vermengen. Die Hefe im warmen Wasser auflösen, 5 Minuten ruhen lassen und dann zur Mehlmischung geben. Die Zutaten so lange mit dem Knethaken des Handrührers, in der Küchenmaschine oder von Hand kneten, bis ein elastischer Teig entsteht, das dauert ungefähr 10 Minuten. Falls der Teig zu fest sein sollte einfach noch etwas warmes Wasser zugeben, wenn der Teig zu flüssig ist, etwas Mehl hinzugeben. Erst dann das Olivenöl unterkneten.\n" +
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
              amount: "500g"
            },
            {
              name: "Salz",
              amount: "1 TL"
            },
            {
              name: "Zucker",
              amount: "200g"
            },
            {
              name: "Tomaten",
              amount: "1 Packung"
            },
            {
              name: "Käse",
              amount: "infinity"
            }
          ]
        },
        {
          id:1,
          name: "Cake",
          time: "50min",
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          level: "middle",
          rating: "4",
          ingredients: [
            {
            name: "Mehl",
            amount: "500g"
            },
            {
            name: "Eier",
            amount: "3"
            },
            {
            name: "Zucker",
            amount: "200g"
            },
            {
            name: "Walnüsse",
            amount: "1 Packung"
            },
            {
            name: "Gelatine",
            amount: "1"
            }
          ]
        }
      ]
    }
  },
  methods: {
    paginate: function() {
      console.log("paginate")
    },
    addReceipt: function() {
      console.log("test")
    },
  }
}
</script>
<style scoped>
.wrapper {
  background-color: #E6FFC7;
}
.main-container {
  background-color: #E6FFC7;
  width: 65%;
  margin: auto;
  border-left: 1px solid black;
  border-right: 1px solid black
}

.profile-container {
  background-color: #E6FFC7;
  height: 65vh;
}
.content-container {
  background-color: #E6FFC7;

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
  width: 70%
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
  background-image: url(../assets/coverimg.png);
  background-size: cover;
  background-position: center;
}

.profile-btn {
  float: right;
  width: 15%;
  padding: 0;
}

.profile-menu {
  margin-left: 10%
}

.recipes {
  border-bottom: 4px solid black;
  width: 2.5em;
  position: relative;
  left: 0.5%
}



@media (max-width: 800px) {
  .main-container {
    width: 100%
  }
}

</style>