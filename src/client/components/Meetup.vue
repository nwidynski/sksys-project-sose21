<template>
    <div>
        <b-card bg-variant="light" :header="meetObj.receipt">
            <b-card-text>
                <p>Location: {{meetObj.location}}</p>
                <p>Date: {{meetObj.date}}</p>
                <p>Member: {{meetObj.member.length}}/{{meetObj.maxMember}}</p>
            </b-card-text>
            <b-button pill >join</b-button>
            <b-avatar-group class="float-right" size="2rem" variant="warning">
                <b-avatar v-for="member in meetObj.member" :key="member.id" :text="member.name"></b-avatar>
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
    }
}
</script>