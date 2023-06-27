<script setup>
import HomeBanner from "./components/HomeBanner.vue"
import HomeCategory from "./components/HomeCategory.vue"
import Homegames from "./components/Homegames.vue"
import HomeHot from "./components/HomeHot.vue"
import HomeNew from "./components/HomeNew.vue"
</script>

<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <Homegames />
</template>



<style lang="scss" scoped></style>