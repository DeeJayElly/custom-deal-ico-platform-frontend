angular.module("customDeal")
    .controller("RequestsCtrl", ["$scope", "$rootScope", "$location", "OffersService", function ($scope, $rootScope, $location, OffersService) {

        OffersService.getRequests()
            .then(function (data) {
                $scope.requests = data.data
                for (var i = 0; i < $scope.requests.length; i++) {
                    $scope.requests[i].userImage = "http://customdeal.azurewebsites.net" + $scope.requests[i].travelerPictureUrl;
                }
                console.log($scope.requests);
            })
        $scope.sendOffer = function () {
            $scope.offer.riderListId = $scope.selectedOffer.riderListUid;
            $scope.offer.offerorUid = $scope.selectedOffer.travelerUid;

            console.log($scope.offer)
            OffersService.sendOffer($scope.offer)
                .then(function (data) {
                    console.log(data);
                    swal("You have sent an offer!")
                })
        }

        $scope.backHome = function () {
            $location.url("/");
        }

        $scope.offermodal = function (i) {
            console.log(i);
            $('#offermodal' + i).show();
            $scope.selectedOffer = $scope.requests[i];
        }

        $scope.hideRequestPopup = function () {
            $(".popup.popup1").hide();
        }

        $scope.showSendOfferPopup = function () {
            $(".popup.popup2").show();
        }

        $scope.hideSendOfferPopup = function () {
            $(".popup.popup2").hide();
        }

        $("div[id^='offermodal']").each(function () {

            var currentModal = $(this);

            //click next
            currentModal.find('.nav-arrow-right').click(function () {
                currentModal.hide();
                currentModal.closest("div[id^='offermodal']").nextAll("div[id^='offermodal']").first().show();
            });

            //click prev
            currentModal.find('.nav-arrow-left').click(function () {
                currentModal.hide();
                currentModal.closest("div[id^='offermodal']").prevAll("div[id^='offermodal']").first().show();
            });
        });


    }]);

