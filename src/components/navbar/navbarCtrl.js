angular.module("customDeal")
    .controller("NavbarCtrl", ["$scope", "GuestHostService", "$rootScope", "$location", "OffersService", function ($scope, GuestHostService, $rootScope, $location, OffersService) {
        $scope.user = false;
        $scope.userType = "guest";

        $scope.showSignInPopup = function () {
            $('.navbar-collapse').removeClass("collapsing");
            $('.navbar-collapse').collapse('hide');
            $("#sign-in").show();
        };

        function getOfferNumber() {
            OffersService.getRequests()
                .then(function (data) {
                    $scope.requestsNumber = data.data.length;
                })
                .catch(function (err) {
                    $scope.requestsNumber = 0;
                });

            OffersService.getOffers()
                .then(function (data) {
                    $scope.offersNumber = data.data.length;
                })
                .catch(function (err) {
                    $scope.offersNumber = 0;
                })
        }

        var refreshIntervalId = setInterval(function () {
            if (localStorage.getItem("BearerToken")) {
                getOfferNumber();
                clearInterval(refreshIntervalId);

            }
        }, 2000);

        if (localStorage.hasOwnProperty('BearerToken')) {
            $rootScope.isLoggedIn = true;
        } else {
            $rootScope.isLoggedIn = false;
        }

        $scope.logOut = function () {
            localStorage.removeItem("BearerToken");
            window.location.reload();
        };

        $scope.scrollToSection = function () {
            $('html, body').animate({
                scrollTop: $("#home-second-section").offset().top
            }, 1000);
        };

        $scope.seeAllServices = function (type) {
            $('.navbar-collapse').removeClass("collapsing")
            $('.navbar-collapse').collapse('hide');

            if (type == "guest") {
                $location.url('offers');
            } else if (type == "host") {
                $location.url('requests');
            }
        };

        $scope.scrollToSection = function () {
            $('html, body').animate({
                scrollTop: $("#home-second-section").offset().top
            }, 1000);
        };

        $scope.switchTo = function ($event, type) {
            $event.preventDefault();
            if (type == "host") {
                $rootScope.customDeal.user.type = "host";
                $rootScope.customDeal.nav.pandingTitle = "Pending Requests";
                $rootScope.customDeal.nav.servicesNum = $scope.requestsNumber + " requests";
                $rootScope.customDeal.nav.serviceActionUrl = "provide-service";
                $rootScope.customDeal.nav.serviceActionName = "Provide Service";
                $rootScope.customDeal.nav.switchToName = "guest";
                $rootScope.customDeal.nav.switchToTitle = "Switch To Guest";
            } else {
                $rootScope.customDeal.user.type = "guest";
                $rootScope.customDeal.nav.pandingTitle = "Pending Offers";
                $rootScope.customDeal.nav.servicesNum = $scope.offersNumber + " offers";
                $rootScope.customDeal.nav.serviceActionUrl = "home-second-section";
                $rootScope.customDeal.nav.serviceActionName = "View/Create Rider List";
                $rootScope.customDeal.nav.switchToName = "host";
                $rootScope.customDeal.nav.switchToTitle = "Switch To Host";
            }
        };

        $(function () {
            $('#myNavbar')
                .on('show.bs.collapse', function () {
                    $('.nav-background').css('display', 'block');
                })
                .on('shown.bs.collapse', function () {
                    $('#navbar-hamburger').addClass('hidden');
                    $('#navbar-close').removeClass('hidden');
                    $("body").css({"position": "fixed"});
                })
                .on('hidden.bs.collapse', function () {
                    $('#navbar-hamburger').removeClass('hidden');
                    $('#navbar-close').addClass('hidden');
                    $('.nav-background').css('display', 'none');
                    $("body").css({"position": "relative"});
                });
        });
    }]);
