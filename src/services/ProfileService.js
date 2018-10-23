(function () {
    angular.module("customDeal").service("ProfileService", function($http) {
  
      this.getProfileInfo = function() {
  
        var url = "http://customdeal.azurewebsites.net/api/Users/info";
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

      }

      this.getProfileInfoByID = function(id) {
  
        var url = "http://customdeal.azurewebsites.net/api/Users/"+id;
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

      }

      this.editProfile = function(data){
        var url = "http://customdeal.azurewebsites.net/api/Users";
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.post(url,data, config);
      }

      this.uploadImage = function(data){
        var url = "http://customdeal.azurewebsites.net/api/Upload/photo";
        var config = {headers:  {
            'Authorization': 'Bearer ' + localStorage.getItem("BearerToken"),
            "Content-Type": "application/json",
            }
        };
        return $http.post(url,data, config);
      }
    });
  })();