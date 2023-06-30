<script setup>
import { getBannerAPI } from '@/apis/home';
import { onMounted, ref } from 'vue';

const bannerList = ref([])
const getBanner = async () => {
    const res = await getBannerAPI()
    console.log("getBanner:", res)
    bannerList.value = res
}
onMounted(() => {
    getBanner()
})
</script>



<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item._id">
                <img :src="item.url" :alt="item.title" mode="aspectFit">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
</style>