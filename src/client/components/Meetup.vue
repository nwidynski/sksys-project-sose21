<template>
    <div>
        <b-card border-variant="dark" :header="meetObj.receipt">
            <b-card-text>
                <p>Place: {{meetObj.place}}</p>
                <p>Date: {{meetObj.date}}</p>
                <p>Guests: {{meetObj.guests.length}}/{{meetObj.maxGuests}}</p>
                <p>created by: {{meetObj.host.firstname}}</p>
            </b-card-text>
            <b-button pill @click="joinClicked()">join</b-button>
            <b-avatar-group class="float-right" size="2rem" variant="warning">
                <b-avatar v-for="guest in meetObj.guests" :key="guest.id" :text="guest.name"></b-avatar>
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
        }
    }

}
</script>