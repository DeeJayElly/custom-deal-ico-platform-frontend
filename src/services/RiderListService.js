(function () {
    angular.module("customDeal").service("RiderListService", function($http) {
  
      this.createRiderlist = function(data) {
  
        var url = "http://customdeal.azurewebsites.net/api/RiderList";
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.post(url, data, config);

      }

    });
  })();