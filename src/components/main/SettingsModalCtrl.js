
angular.module("customDeal")
.controller("SettingsModalCtrl", ["$scope", "GuestHostService", "$rootScope", "$location", function($scope, GuestHostService, $rootScope, $location) {

$scope.showSignInPopup = function() {
    $('.navbar-collapse').removeClass("collapsing");
    $('.navbar-collapse').collapse('hide');
    $('#settings').modal('hide');
    $("#sign-in").show();
}
}]);
