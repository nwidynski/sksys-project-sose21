<template>
    <div>
    <header>
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
    </header>
    <router-view/>
    </div>
</template>

<script>
export default {
    name: 'Private'
}
</script>