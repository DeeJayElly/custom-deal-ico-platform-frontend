(function () {
    angular.module("customDeal").service("InterestsService", function ($http, $q) {
        this.getInterests = function () {
            var url = "http://customdeal.azurewebsites.net/api/Interests";
            var config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return $http.get(url, config);
        };

        this.getLanguages = function () {
            var url = "http://customdeal.azurewebsites.net/api/Languages";
            var config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return $http.get(url, config);
        };

        this.getCountries = function () {
            var url = "http://customdeal.azurewebsites.net/api/Settings/country";
            var config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return $http.get(url, config);
        };
    });
})();