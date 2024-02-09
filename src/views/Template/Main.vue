<template>
    <div id="content">
        <navBar />
        <div class="px-2 pb-5">
            <router-view/>
        </div>
    </div>
</template>

<script>
import navBar from './Navbar.vue'
export default {
    components:{
        navBar
    },
}
</script>

<style scope>

</style>