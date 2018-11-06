
      angular.module("customDeal")
      .service('Map', function($q) {
      
          this.init = function(location) {
              var options = {
                  center: new google.maps.LatLng(location),
                  zoom: 13,
                  disableDefaultUI: true,
                  image: 'http://wfarm1.dataknet.com/static/resources/icons/set94/be39f3b7.png'    
              }
              this.map = new google.maps.Map(
                  document.getElementById("map"), options
              );
  
            //   this.places = new google.maps.places.PlacesService(this.map);
          }
          
          this.addMarker = function(res) {
              if(this.marker) this.marker.setMap(null);
              this.marker = new google.maps.Marker({
                  map: this.map,
                  position: res.geometry.location,
                  icon: image
              });
              this.map.setCenter(res.geometry.location);
          }  
      })


      .controller("AccomodationCtrl", ["$scope", "$rootScope", "$location","ProfileService", "$routeParams", "Map","ATService", function($scope, $rootScope, $location, ProfileService, $routeParams, Map, ATService) {

        $("#accomodation-carousel").carousel()
        
        ProfileService.getProfileInfoByID($routeParams.id)
        .then(function(res){
            $scope.profileInfo = res.data;
            $scope.profileImage = "http://customdeal.azurewebsites.net/"+$scope.profileInfo.photoURL;

            $.get( "https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.profileInfo.city+"+"+$scope.profileInfo.country+"&key=AIzaSyC7g7BNVgYN26kRlqkTuEde7zhXJGpfuE8", function( data ) {
                Map.init(data.results[0].geometry.location);
              });
            ATService.getAccomodation($scope.profileInfo.uid)
            .then(function(res){
                $scope.accomodationInfo = res.data;
                for(var i = 0; i<res.data.photoUrlList.length; i++){
                    $scope.accomodationInfo.photoUrlList[i] =  "http://customdeal.azurewebsites.net/" + res.data.photoUrlList[i];
                }
            })
            .catch(function(err){
                swal("Error has occured");
                console.log(err)
            })
        })
        .catch(function(err){
            swal("Error has occured");            
            console.log(err)
        })
        
        
        
    $scope.openGallery = function(){
        lightbox.start($(".example-image-link"))
    }
    }]);
    
    