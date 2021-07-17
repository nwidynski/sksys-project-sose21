<template>
  <div>
    <header>

      <div id="nav" style="display:none">
        <b-navbar toggleable="sm" type="dark" variant="dark">
          <b-navbar-brand>Meet n Eat</b-navbar-brand>
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item @click="onItemClick" :to="profilePath"><i class="fa fa-user mr-2"/>Profile</b-nav-item>
              <b-nav-item to="/private/recipefeed"><i class="fa fa-utensils mr-2"/>Recipe Feed</b-nav-item>
              <b-nav-item to="/private/meetups"><i class="fa fa-people-arrows mr-2"/>MeetUp</b-nav-item>
              <b-nav-item @click="onItemClick"><i class="fa fa-coffee mr-2"/>Logout</b-nav-item>
              <b-nav-item to="/private/settings"><i class="fa fa-cog mr-2"/>Settings</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <sidebar-menu :menu="menu" :width="'250px'" @item-click="onItemClick" :collapsed="collapse" :hide-toggle="true">
      </sidebar-menu>
    </header>
    <router-view/>
  </div>
</template>

<script>
import UserStorage from '@client/utils/userStorage'
export default {
  name: 'Private',
  data() {
    return {
      profilePath: '/private/profile/' + UserStorage.readObj("user").id,
      menu: [
        {
          header: true,
          title: 'Hi ' + UserStorage.readObj("user").firstname + '!',
          hiddenOnCollapse: true
        },
        {
          href: {path: '/private/profile/' + UserStorage.readObj("user").id},
          title: 'Profile',
          icon: 'fa fa-user'
        },
        {
          href: {path: '/private/recipefeed'},
          title: 'Recipe Feed',
          icon: 'fa fa-utensils'
        },
        {
          href: {path: '/private/meetups'},
          title: 'MeetUps',
          icon: 'fa fa-people-arrows'
        },
        {
          // href: {path: '/'},
          title: 'Logout',
          icon: 'fa fa-coffee'
        },
        {
          href: {path: '/private/settings'},
          title: 'Settings',
          icon: 'fa fa-cog'
        }
      ],
      collapse: false,
    }
  },
  created: function() {
    window.addEventListener('resize',this.onResize)
  },
  methods: {
    onResize(){
      if(window.innerWidth < 1000)
        this.collapse = true
      else
        this.collapse = false
    },
    onItemClick(event, item, node) {
      console.log("event: ", event)
      console.log("item: ",  item)
      console.log("node: ", node)

      if(event.target.innerText == "Logout" || (item != undefined && item.title == "Logout")) {
        UserStorage.deleteObj("user")
        console.log("Clicked on Logout")
        this.$router.push({path: "/"})
      }
      else if(event.target.innerText == "Profile" || (item != undefined && item.title == "Profile")) {
        console.log("refresh")
        this.$root.$refs.ProfileComponent.getData();
      }

    }
  }
}
</script>

<style>
@media screen AND (max-width: 476px) {
  .v-sidebar-menu {
    display: none !important;
  }
  #nav {
    display: block !important;
  }
}
</style>