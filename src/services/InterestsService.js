(function () {
    angular.module("customDeal").service("InterestsService", function ($http, $q) {


    this.getInterests = function() {

        var url = "http://customdeal.azurewebsites.net/api/Interests";
        var config = {headers:  {
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

    }

    this.getLanguages = function() {

        var url = "http://customdeal.azurewebsites.net/api/Languages";
        var config = {headers:  {
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

    }

    this.getCountries = function() {

        var url = "http://customdeal.azurewebsites.net/api/Settings/country";
        var config = {headers:  {
            "Content-Type": "application/json",
            }
        };
        return $http.get(url, config);

    }
    // var service = {
    //     interests: [],
    //     getInterests: getInterests
    // };
    // return service;

    // function getInterests() {

    // 	var def = $q.defer();

    //     var interests = $http({method: 'GET', url: 'https://customdeal.azurewebsites.net/api/Interests', cache: 'false'});
	//     var languages = $http({method: 'GET', url: 'https://customdeal.azurewebsites.net/api/Languages', cache: 'false'});
	//     var countries = $http({method: 'GET', url: 'https://customdeal.azurewebsites.net/api/Settings/country', cache: 'false'});

	// 	$q.all([interests, languages, countries]).then(function(data) {
	// 		service.interests = data;
	// 		def.resolve(data);
	// 	});
	// 	return def.promise;
    // }
  });
})();