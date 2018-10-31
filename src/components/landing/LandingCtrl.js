
    angular.module("customDeal")
    .controller("LandingCtrl", ["$scope","$rootScope", "InterestsService", "ProfileService", "RiderListService", function($scope, $rootScope,  InterestsService, ProfileService, RiderListService) {

        InterestsService.getInterests()
        .then(function (data) {
            $scope.interests = data.data;
            console.log($scope.interests);
        })
        .catch(function(err){
            console.log(err)
        })

        InterestsService.getLanguages()
        .then(function (data) {
            $scope.languages = data.data;
            console.log($scope.languages);
        })
        .catch(function(err){
            console.log(err)
        })

        InterestsService.getCountries()
        .then(function (data) {
            $scope.countries = data.data;
            console.log($scope.countries);
        })
        .catch(function(err){
            console.log(err)
        })

        $scope.letsRide = function(){
              if($rootScope.isLoggedIn) {
                var data = {};
                data.country = $scope.country;
                data.city = $scope.city;
                data.checkIn = $scope.checkInTime;
                data.checkOut = $scope.checkOutTime;
                data.gender = $scope.gender;
                data.age = $scope.age;
                data.activeHours = $scope.timePeriod;
                data.languageList = []
                data.languageList.push($scope.selectedLanguage);
                data.details = $scope.riderListMessage;
                data.interestsList = [];


                $('input:checkbox.interest-icon-checkbox').each(function () {
                  this.checked ? data.interestsList.push($(this).val()) : "";
                });

                console.log(data);
                

                RiderListService.createRiderlist(data)
                .then(function(res){
                  console.log(res)
                  swal("Your rider list has been created!").then(function(){
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                  });
                })
                .catch(function(err){
                  console.log(err);
                  swal("Some Error has occured!");
                })
              } else {
                swal("Please Login First");

              }
        };

        $scope.updateCountry = function() {
          var selectedCountry = $scope.countries.filter(function(country){ 
            if(country.countryName === $scope.country) { 

              return country 

            }});

           $scope.availableCities = selectedCountry[0].cityList;
        };


        $( "#checkInTime" ).datepicker();
        $( "#checkOutTime" ).datepicker();


        $('#myCarousel').carousel();
        $('#carousel').carousel();

        $(".interests-list .checkbox input[type='checkbox'], .interests-container .checkbox input[type='checkbox']").change(function() {
          var selectedIcon = $(this).attr('name');

          if (this.checked) {
            $(this).prev().find("img").attr("src", "assets/img/home/icons/" + selectedIcon + "-active.png");
          } else {
            $(this).prev().find("img").attr("src", "assets/img/home/icons/" + selectedIcon + ".png");
          }
        });
    
    }]);

