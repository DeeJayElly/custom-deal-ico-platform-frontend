
    angular.module("customDeal")
    .controller("MainCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.loaded = "";
    $scope.isLoggedIn = false;
    $scope.$on('$viewContentLoaded', function() {
        $scope.loaded = "loaded";
        $('.navbar-collapse').removeClass("collapsing");
        $('.navbar-collapse').collapse('hide');
    });


    if(localStorage.hasOwnProperty('BearerToken')){
        $rootScope.isLoggedIn = true;
    } else {
        $rootScope.isLoggedIn = false;
    }
    $rootScope.customDeal = {
        user: {
        type: "",
        firstName: "",
        lastName: "",
        username: "",
        token: ""
        },
        nav: {
        pendingTitle: "",
        servicesNum: 0,
        serviceActionUrl: "",
        serviceActionName: "",
        switchToName: "",
        switchToTitle: ""
        }
    }

    $scope.showSignInPopup = function() {
        $("#signing-modal1").modal();
    }

    $scope.scrollToSection = function() {
        $('html, body').animate({
        scrollTop: $("#home-second-section").offset().top
        }, 1000);
    }

    $(document).mouseup(function (e) {
        var popup = $(".sign-in-box");
        if (!$('#nav-sign-in').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        $("#sign-in").hide();
        $(".signing").hide();
        }
    });

    $(document).scroll(function() {

        var wintop = $(window).scrollTop();   // Winodw Scroll Positon
        
        if (wintop >= 200) {                  // If page is scrolled more than 200px
        $('.scroll-to-top').show();         // Show scroll to top button
        } else {
        $('.scroll-to-top').hide();         // Hide scroll to top button
        }
    });
    $('.scroll-to-top').click(function() {  // When arrow is clicked
        $('body, html').animate({
        scrollTop : 0                       // Scroll to top of body
        }, 600);
    });
    
    }]);

