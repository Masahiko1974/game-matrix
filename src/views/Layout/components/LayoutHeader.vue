<script setup>

import { useCategoryStore } from "@/stores/category";


const categoryStore = useCategoryStore()



</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/"></RouterLink>
            </h1>
            <ul class="app-header-nav">
                <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
                    <RouterLink to="/">{{ item.name }}</RouterLink>
                </li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="Search">
            </div>
            <!-- 头部购物车 -->

        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    background: $bgColor;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 368px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat 2px / contain;
        }
    }

    .app-header-nav {
        width: 680px;
        display: flex;
        padding-left: 24px;
        position: relative;
        z-index: 998;

        li {
            margin-right: 32px;
            width: 38px;
            text-align: center;

            a {
                font-size: 16px;
                line-height: 32px;
                height: 32px;
                font-weight: 600;
                display: inline-block;

                &:hover {
                    color: $activeTextColor;

                }
            }

            .active {
                color: $activeTextColor;
                border-bottom: 1px solid $activeTextColor;
            }
        }
    }

    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid $textColor;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            background: $bgColor;
            width: 140px;
            padding-left: 5px;
            color: $textColor;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>