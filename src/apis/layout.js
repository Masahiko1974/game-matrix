import httpInstance from "@/utils/http";

export function getCategoryAPI(params) {
    return httpInstance({
        url: '/home/category/head'
    })
}