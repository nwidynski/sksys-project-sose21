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
            <b-form-datepicker id="input-date" v-model="newMeetup.date"></b-form-datepicker>

            <!-- time -->
            <label for="input-time">Time</label>
            <b-form-timepicker id="input-time" v-model="newMeetup.time"></b-form-timepicker>

            <!-- maxguests -->
            <label for="input-maxguests">Max. guests</label>
            <b-form-input id="input-maxguests" type="number" v-model="newMeetup.maxGuests"></b-form-input>

            <!-- recipe -->
            <label for="input-receipeId">Recipe</label>
            <b-form-select id="input-receipeId" v-model="newMeetup.recipeId" :options="recipeOptions"></b-form-select>
            <b-alert :show="isWarning" variant="danger" class="my-2">Fully fill in the form!</b-alert>
        </b-modal>
    </div>
</template>

<script>
import BackEndRouter from '@client/utils/http';
export default {
    data() {
        return {
            newMeetup: {
                place: "",
                date: "",
                time: "",
                maxGuests: 0,
                recipeId: null
            },
            isWarning: false
        }
    },
    computed: {
        fullDateString() {
            return this.newMeetup.date + "T" + this.newMeetup.time + "Z";
        }
    },
    props: {
        recipeOptions: {
            required: true
        }
    },
    methods: {
        resetModal() {
            this.newMeetup.place = "";
            this.newMeetup.date = "";
            this.newMeetup.maxGuests = "";
            this.newMeetup.recipeId = null;
            this.isWarning = false;
        },
        handleOk(evt) {
            let self = this;
            //prevent modal from closing
            evt.preventDefault();
            //check input
            if(!this.checkInput()) {
                this.isWarning = true;
                return;
            }
            this.isWarning = false;
            
            //create object
            let newObj = {
                date: this.fullDateString,
                place: this.newMeetup.place,
                maxGuests: Number(this.newMeetup.maxGuests),
                recipeId: "713974d3-eb27-4ebc-a979-e239d25748fd" //doesnt with options
            }
            console.log(newObj)

            //Request to Backend
            BackEndRouter.RequestRouter.EndPoints.CREATE("/meetups", newObj)
                .then(res => self.$emit("created-meetup", res))
                .catch(err => console.log(err))
            
            //hide modal if successful
            this.$nextTick(() => {
                this.$bvModal.hide('add-meetup-modal')
            })
        },
        checkInput() {
            if(this.newMeetup.place == "" 
            || this.newMeetup.date == "" 
            || this.newMeetup.time == "" 
            || this.newMeetup.maxGuests == 0 
            || this.newMeetup.maxGuests == "") { // add this if recipes work || this.newMeetup.recipeId == null
                console.log("false")
                return false
            }
            return true;
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