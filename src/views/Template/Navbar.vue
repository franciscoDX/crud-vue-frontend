<template>
    <nav class="navbar navbar-expand-lg navbar-dark p-3 bg-danger" id="headerNav">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto ">
                <li class="nav-item">
                <a class="nav-link mx-2 active" aria-current="page" :to="{name: 'projects'}" href="#">Projects</a>
                </li>
                <!--<li class="nav-item d-none d-lg-block">
                <a class="nav-link mx-2" href="#">
                    <img src="/static_files/images/logos/logo_2_white.png" height="80" />
                </a>
                </li>-->
                <li class="nav-item">
                    <a class="nav-link mx-2" @click="logout" href="#">Logout</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            show: false,
            error: "",
        }
    },
    methods:{
        ...mapActions('auth', ['logout']),
    }
}
</script>