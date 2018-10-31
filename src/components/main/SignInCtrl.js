
    angular.module("customDeal")
    .controller("SignInCtrl", ["$scope", "$rootScope", "AuthService", "GuestHostService", "ProfileService", "$timeout", "InterestsService", "OffersService", function($scope, $rootScope, AuthService, GuestHostService, ProfileService, $timeout, InterestsService, OffersService) {




    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
        
            reader.onload = function(e) {
            $('#regImg').attr('src', e.target.result);
            }
        
            reader.readAsDataURL(input.files[0]);
        }
    }
        
    $("#register-image-upload").change(function() {
        readURL(this);
    });  

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
    $scope.updateCountry = function() {
        var selectedCountry = $scope.countries.filter(function(country){ 
          if(country.countryName === $scope.country) { 

            return country 

          }});

         $scope.availableCities = selectedCountry[0].cityList;
      };

    function getProfileInfo () {
        ProfileService.getProfileInfo()
        .then(function(res){
            $rootScope.customDeal.user = {
                type: "guest",
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                username: res.data.email,
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }

    if(localStorage.hasOwnProperty('BearerToken')){
        $rootScope.isLoggedIn = true;
    } else {
        $rootScope.isLoggedIn = false;
    }

    if(localStorage.getItem("BearerToken")){
        getProfileInfo();
        getGuestService();
    }
    function getGuestService () {
        GuestHostService.getServicesNum("guest")
        .then(function(data) {
            $rootScope.customDeal.nav.pandingTitle = "Pending Offers";
            // $rootScope.customDeal.nav.servicesNum = data.offersNum + " offers";
            $rootScope.customDeal.nav.serviceActionUrl = "home-second-section";
            $rootScope.customDeal.nav.serviceActionId = "rider-list";
            $rootScope.customDeal.nav.serviceActionName = "View/Create Rider List";
            $rootScope.customDeal.nav.switchToName = "host";
            $rootScope.customDeal.nav.switchToTitle = "Switch To Host";

            $("#sign-in").hide();

        })
        .catch(function(error) {
            console.log("ERROR => ", error);
        });
    }

    
    $scope.showSignUpPopup = function() {
        $("#sign-in").hide();
        $("#sign-up").show();
    }

    $scope.showSignInPopup = function() {
        $("#sign-in").show();
    }

    $scope.doLogin = function() {
        var data = {
            email: $scope.email,
            password: $scope.password
        }
        AuthService.login(data)
        .then(function(user) {
            localStorage.setItem("BearerToken", user.data.token);
            $rootScope.isLoggedIn = true;
            getProfileInfo();
            getGuestService();
            OffersService.getOffers()
            .then(function(data){
                console.log("uspeo")
                $rootScope.customDeal.nav.servicesNum = data.data.length + " offers";
            })
            .catch(function(err){
                console.log("nije uspeo")
                $rootScope.customDeal.nav.servicesNum = "0 offers";
            })
        })
        .catch(function(err){
            swal(err.data)
        });
        
    }

    $('.single-checkbox').on('change', function(evt) {

        $scope.selectedInterests = [];
        $('.interests-container input:checked').each(function() {
            $scope.selectedInterests.push($(this).val());
        });
       if($scope.selectedInterests.length > 5) {
           this.checked = false;
       }
    });


    $scope.register = function () {
        var file = document.getElementById("register-image-upload").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {

            var data = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.registrationEmail,
                password: $scope.registrationPassword,
                birthDate: new Date($scope.birthYear, $scope.birthMonth - 1, $scope.birthDay),
                country: $scope.country,
                gender: $scope.gender,
                city: $scope.city,
                photoBase64: reader.result,
                interests: $scope.selectedInterests

            }

            AuthService.register(data)
            .then(function (response) {
                console.log(response);
                $scope.finishStep();

            })
            .catch(function(err){
                console.log(err);
            })

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

    }

    $scope.addPhoto = function() {
        $("#add-photo").show(); 
        $("#sign-up").hide();
    }

    $scope.confirmNumber = function() {
        $("#add-photo").hide(); 
        $("#confirm-number").show();
    }

    $scope.confirmationNumber = function() {
        $("#confirm-number").hide(); 
        $("#confirmation-number").show();
    }

    $scope.openInterests = function() {
        $("#confirmation-number").hide(); 
        $("#add-interests").show();
    }

    $scope.finishStep = function() {
        $("#welcome").show();
        $("#add-interests").hide();
    }

    $scope.closeWelcomePopUp = function() {
        $(".signing").hide();
    }

    $scope.closePopUp = function() {
        $(".signing").hide();
    }

    $scope.openHelp = function() {
        $("#help").modal();
    }

    $("#add-interests .interests-container .col-xs-4 input[type='checkbox']").change(function() {
        var selectedIcon = $(this).attr("name");

        if (this.checked) {
        console.log($(this).prev())
        $(this).prev().find("img").attr("src", "assets/img/home/icons/" + selectedIcon + "-active.png");
        } else {
        $(this).prev().find("img").attr("src", "assets/img/home/icons/" + selectedIcon + ".png");
        }
    });
    }]);
