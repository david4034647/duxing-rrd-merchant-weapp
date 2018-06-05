var imgBaseURL = "https://ms.wrcdn.com/";
var baseURL = "https://mchapp.wxrrd.com/";
var loginURL = baseURL + "auth/login.json";
var homeURL = baseURL + "stat/shop_baseinfo.json";
var orderURL = baseURL + "order/orders.json";
var token_index = "token";

module.exports = {
    IMG_BASE_URL: imgBaseURL,
    LOGIN_URL: loginURL,
    BASE_URL: baseURL,
    HOME_URL: homeURL,
    ORDER_URL: orderURL,
    KEY_TOKEN_INDEX: token_index,
};