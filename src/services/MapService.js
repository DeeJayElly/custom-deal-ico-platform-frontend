
    //   angular.module("customDeal")
    //   .service('Map', function($) {
      
    //       this.init = function(location) {
    //           var options = {
    //               center: new google.maps.LatLng(location),
    //               zoom: 13,
    //               disableDefaultUI: true,
    //               image: 'http://wfarm1.dataknet.com/static/resources/icons/set94/be39f3b7.png'    
    //           }
    //           this.map = new google.maps.Map(
    //               document.getElementById("map"), options
    //           );
  
    //         //   this.places = new google.maps.places.PlacesService(this.map);
    //       }
          
    //       this.addMarker = function(res) {
    //           if(this.marker) this.marker.setMap(null);
    //           this.marker = new google.maps.Marker({
    //               map: this.map,
    //               position: res.geometry.location,
    //               icon: image
    //           });
    //           this.map.setCenter(res.geometry.location);
    //       }  
    //   })