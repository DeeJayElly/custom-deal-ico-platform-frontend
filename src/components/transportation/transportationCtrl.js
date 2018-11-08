
    angular.module("customDeal")
    .controller('TransportationCtrl', ["$scope", "$rootScope", "$location","ProfileService", "$routeParams", "Map","ATService", function($scope, $rootScope, $location, ProfileService, $routeParams, Map, ATService) {
    

        $("#transportation-carousel").carousel()

        ProfileService.getProfileInfoByID($routeParams.id)
        .then(function(res){
            $scope.profileInfo = res.data;
            $scope.profileImage = "http://customdeal.azurewebsites.net/"+$scope.profileInfo.photoURL;

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.profileInfo.city+"+"+$scope.profileInfo.country+"&key=AIzaSyC7g7BNVgYN26kRlqkTuEde7zhXJGpfuE8", function( data ) {
                console.log( data.results[0].geometry.location );
                Map.init(data.results[0].geometry.location);
              });
            ATService.getTransportation($scope.profileInfo.uid)
            .then(function(res){
                $scope.transportationInfo = res.data;
                for(var i = 0; i<res.data.photoUrlList.length; i++){
                    $scope.transportationInfo.photoUrlList[i] =  "http://customdeal.azurewebsites.net/" + res.data.photoUrlList[i];
                }
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
        $scope.openGallery = function(){
            lightbox.start($(".example-image-link"))
        }
}]);

