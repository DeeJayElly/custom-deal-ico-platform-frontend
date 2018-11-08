(function () {
    angular.module("customDeal").service("OffersService", function ($http) {
  
        this.getRequests = function (data) {

            var url = "http://customdeal.azurewebsites.net/api/HostRiderList";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json",
                }
            };
            return $http.get(url, config);

        }
        this.getOffers = function () {

            var url = "http://customdeal.azurewebsites.net/api/RiderListOffer";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json",
                }
            };
            return $http.get(url, config);

        }

        this.sendOffer = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/RiderListOffer/send";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json",
                }
            };
            return $http.post(url, data, config);
        }
        this.acceptOffer = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/RiderListOffer/accept";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json",
                }
            };
            return $http.post(url, data, config);
        }
        this.rejectOffer = function (data) {
            var url = "http://customdeal.azurewebsites.net/api/RiderListOffer/decline";
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
                    "Content-Type": "application/json",
                }
            };
            return $http.post(url, data, config);
        }
    });
})();