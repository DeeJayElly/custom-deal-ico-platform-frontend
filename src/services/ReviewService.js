(function () {
    angular.module("customDeal").service("ReviewService", function($http) {
  
      this.addReview = function(data) {
  
        var url = "http://customdeal.azurewebsites.net/api/Reviews";
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.post(url, data, config);

      },
      this.getReviews = function(id) {
  
        var url = "http://customdeal.azurewebsites.net/api/Reviews/"+id;
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

      }

    });
  })();