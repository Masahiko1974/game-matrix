<script setup>
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
</script>

<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="cate in categoryStore.categoryList" :key="cate._id">
                <RouterLink to="/">{{ cate.name }}</RouterLink>
                <RouterLink v-for="subCate in cate.subcategory.splice(0,2)" :key="subCate._id" to="/">{{ subCate.name }}</RouterLink>
                <!-- 弹层layer位置 -->
                <div class="layer">
                    <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
                    <ul>
                        <li v-for="item in cate.goods " :key="item._id">
                            <RouterLink to="/">
                                <img :src="item.thumb" alt="" />
                                <div class="info">
                                    <p class="name ellipsis-2">
                                        {{ item.name }}
                                    </p>
                                    <!-- <p class="desc ellipsis">{{ item.desc }}</p> -->
                                    <p class="price"><i>¥</i>{{ item.price }}</p>
                                </div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped lang='scss'>
.home-category {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;

    .menu {
        li {
            padding-left: 40px;
            height: 55px;
            line-height: 55px;

            &:hover {
                background: $mainColor;
            }

            a {
                margin-right: 4px;
                color: $activeTextColor;

                &:first-child {
                    font-size: 16px;
                }
            }

            .layer {
                width: 990px;
                height: 500px;
                background: rgba(255, 255, 255, 0.8);
                position: absolute;
                left: 250px;
                top: 0;
                display: none;
                padding: 0 15px;

                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 310px;
                        height: 120px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        background: #fff;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }

                        a {
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            padding: 10px;

                            &:hover {
                                background: #e3f9f4;
                            }

                            img {
                                width: 95px;
                                height: 95px;
                            }

                            .info {
                                padding-left: 10px;
                                line-height: 24px;
                                overflow: hidden;

                                .name {
                                    font-size: 16px;
                                    color: #666;
                                }

                                .desc {
                                    color: #999;
                                }

                                .price {
                                    font-size: 22px;
                                    color: #F4E6D4;

                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 关键样式  hover状态下的layer盒子变成block
            &:hover {
                .layer {
                    display: block;
                }
            }
        }
    }
}
</style>