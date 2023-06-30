import httpInstance from "@/utils/http";

//获取首页分类

export function getCategoryAPI(params) {
    return httpInstance({
        url: '/game-category'
    })
}