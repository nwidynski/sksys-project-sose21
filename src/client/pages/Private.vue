<template>
    <div>
    <header>
      <!--
      <div id="nav">
        <b-navbar toggleable="sm" type="dark" variant="dark">
          <b-navbar-brand>Meet n Eat</b-navbar-brand>
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/private/profile">Profile</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      -->
      <sidebar-menu :menu="menu" :width="'250px'" :collapsed="collapse">
        <span slot="toggle-icon"><b-icon-arrow-left-right></b-icon-arrow-left-right></span>

      </sidebar-menu>
    </header>
    <router-view/>
    </div>
</template>

<script>
export default {
    name: 'Private',
    data() {
      return {
        menu: [
          {
            header: true,
            title: 'Navigation',
            hiddenOnCollapse: true
          },
          {
            href: {path: '/private/profile'},
            title: 'Profile',
            icon: 'fa fa-user'
          },
          {
            href: {path: ''},
            title: 'Receipt Feed',
            icon: 'fa fa-utensils'
          },
          {
            href: {path: ''},
            title: 'MeetUp',
            icon: 'fa fa-people-arrows'
          },
          {
            href: {path: '/'},
            title: 'Login',
            icon: 'fa fa-coffee'
          },
          {
            href: {path: ''},
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
      }
  }
}
</script>

<style>

</style>