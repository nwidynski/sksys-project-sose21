<template>
    <div>
        <b-card border-variant="dark" :header="meetObj.recipeName">
            <b-card-text>
                <p>Place: {{meetObj.place}}</p>
                <p>Date: {{getDate()}}</p>
                <p>Time: {{getTime()}}</p>
                <p>Guests: {{meetObj.guests.length}}/{{meetObj.maxGuests}}</p>
                <p>created by: {{meetObj.hostName}}</p>
            </b-card-text>
            <b-button pill @click="joinClicked()">join</b-button>
            <b-button pill @click="editClicked()">edit</b-button>
            <b-button pill variant="danger" @click="deleteClicked()">delete</b-button>
            
            <b-avatar-group class="float-right" size="2rem" variant="warning">
                <b-avatar button v-for="guest in meetObj.guests" :key="guest.id" :text="getAcronym(guest)" @click="iconClicked(guest.id)"></b-avatar>
            </b-avatar-group>
            
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        meetObj: {
            required: true
        }
    },
    methods: {
        joinClicked() {
            this.$emit('join-event', this.$props.meetObj.id);
        },
        editClicked() {
            this.$emit('edit-event', this.$props.meetObj.id);
        },
        deleteClicked() {
            this.$emit('delete-event', this.$props.meetObj.id);
        },
        getDate() {
            return this.$props.meetObj.date.substring(0, 10);
        },
        getTime() {
            return this.$props.meetObj.date.substring(11, 16);
        },
        getAcronym(guest) {
            return guest.firstname.charAt(0) + guest.surname.charAt(0);
        },
        iconClicked(id) {
            console.log("icon: " + id);
            this.$router.push({path: "/private/profile/" + id});
        }
    }

}
</script>