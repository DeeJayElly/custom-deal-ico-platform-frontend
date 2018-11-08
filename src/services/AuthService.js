(function () {
    angular.module("customDeal").service("AuthService", function ($http, $timeout, $q) {

        this.login = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/Auth/login";
            return $http.post(url, data, [])


        }
        this.register = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/Auth/register";
            return $http.post(url, data, [])
        }
    });
})();