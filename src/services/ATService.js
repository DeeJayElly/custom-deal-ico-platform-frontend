(function () {
    angular.module("customDeal").service("ATService", function ($http) {
        this.addAccomodation = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/ServiceOffer/accomodation";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json"
                }
            };
            return $http.post(url, data, config);
        };

        this.getAccomodation = function (id) {
            var url = "http://customdeal.azurewebsites.net/api/ServiceOffer/accomodation/" + id;
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json"
                }
            };
            return $http.get(url, config);
        };

        this.addTransportation = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/ServiceOffer/transportation";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json"
                }
            };
            return $http.post(url, data, config);
        };

        this.getTransportation = function (id) {
            var url = "http://customdeal.azurewebsites.net/api/ServiceOffer/transportation/" + id;
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json"
                }
            };
            return $http.get(url, config);
        };
    });
})();