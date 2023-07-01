import httpInstance from "@/utils/http";

//获取banner

export const getBannerAPI = () => {
    return httpInstance({
        url: '/game-banner'
    })
}

/**
 * @description: 或取全新发行栏目
 * @param {*}
 * @return {*}
 */
export const getLatestAPI = () => {
    return httpInstance({
        url: '/game-info',
        params: {
            type: "is_new"
        }
    })
}