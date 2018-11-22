angular.module("customDeal")
    .controller("OffersCtrl", ["$scope", "$rootScope", "$location", "OffersService", function ($scope, $rootScope, $location, OffersService) {
        OffersService.getOffers()
            .then(function (data) {
                $scope.offers = data.data;
                for (var i = 0; i < $scope.offers.length; i++) {
                    $scope.offers[i].userImage = "http://customdeal.azurewebsites.net" + $scope.offers[i].offerrorInfo.photoURL;
                }
            });

        window.addEventListener('popstate', function () {
            handler.close();
        });

        $scope.backHome = function () {
            $location.url("/");
        };

        $scope.acceptOffer = function (offer) {
            var handler = StripeCheckout.configure({
                key: 'pk_test_hTXbyT2rqDEQDhtJTV6M8OTV',
                image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: 'auto',
                token: function (token) {
                    offer.token = token.id;
                    OffersService.acceptOffer(offer)
                        .then(function (data) {
                            swal("You have accepted offer!");
                        });
                }
            });
            handler.open({
                name: 'Custom Deal',
                description: offer.message,
                zipCode: false,
                amount: 100
            });
            e.preventDefault();
        };
        $scope.rejectOffer = function (offer) {
            OffersService.rejectOffer(offer)
                .then(function (data) {
                    swal("You have rejected offer!");
                });
        }
    }]);
