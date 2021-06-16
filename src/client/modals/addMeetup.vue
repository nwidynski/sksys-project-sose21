<template>
    <div>
        <!-- Button -->
        <b-button v-b-modal.add-meetup-modal class="ml-4 mt-3 mb-n2 posMeetup">
            <b-icon-plus class="add-meetup" title="add meetup"></b-icon-plus>
        </b-button>

        <!-- Modal -->
        <b-modal
            id="add-meetup-modal"
            ref="modal"
            title="Add new meetup"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <!-- place -->
            <label for="input-place">Place</label>
            <b-form-input id="input-place" v-model="newMeetup.place"></b-form-input>

            <!-- date -->
            <label for="input-date">Date</label>
            <b-form-input id="input-date" v-model="newMeetup.date"></b-form-input>

            <!-- maxguests -->
            <label for="input-maxguests">Max. guests</label>
            <b-form-input id="input-maxguests" v-model="newMeetup.maxGuests"></b-form-input>

            <!-- receipt -->
            <label for="input-receipeId">Recipe</label>
            <b-form-select id="input-receipeId" v-model="newMeetup.recipeId" :options="receiptOptions"></b-form-select>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMeetup: {
                place: "",
                date: "",
                maxGuests: 0,
                recipeId: null,
                hostId: null //set with user object
            }
        }
    },
    props: {
        receiptOptions: {
            required: true
        }
    },
    methods: {
        resetModal() {
            this.newMeetup.place = "";
            this.newMeetup.date = "";
            this.newMeetup.maxGuests = "";
            this.newMeetup.recipeId = null;
        },
        handleOk() {
            //TODO
        }
    }
}
</script>

<style scoped>
.add-meetup {
  cursor: pointer;
  font-size: 2em;
}

.posMeetup {
  position: fixed;
  z-index: 9999;
  bottom: 1em;
  right: 1.5em;
  background-color: black !important;
}
</style>