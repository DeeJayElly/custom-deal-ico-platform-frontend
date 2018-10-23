(function () {
    angular.module("customDeal").service("GuestHostService", function($http, $timeout, $q) {
  
      this.getServicesNum = function(type) {
        var deferred = $q.defer();
  
        var req = {
          method: 'get',
          url: 'http://customdeal.tkn.rs/api/ServiceOffer/accommodation/{userUid}',
        }
  
        /*return $http(req).then(function(offers) {
          console.log(offers);
          return offers
        },
        function(err) {
          console.log(err)
        });*/
  
        $timeout(function() {
          if (true) {
            if (type == "guest") {
              deferred.resolve({ success: true, offersNum: 8 });
            } else {
              deferred.resolve({ success: true, requestsNum: 3 });
            }
          } else {
            deferred.resolve({ success: false });
          }
        }, 1000);
  
        return deferred.promise;
      }
    });
  })();