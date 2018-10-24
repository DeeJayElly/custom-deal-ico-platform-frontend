angular.module('customDeal', [
    'ngRoute'
])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/landing/landing.html',
                    controller: 'LandingCtrl'
                })
                .when('/profile/:id', {
                    templateUrl: '/profile/profile.html',
                    controller: 'ProfileCtrl'
                })
                .when('/requests', {
                    templateUrl: '/requests/requests.html',
                    controller: 'RequestsCtrl'
                })
                .when('/accomodation/:id', {
                    templateUrl: '/accomodation/accomodation.html',
                    controller: 'AccomodationCtrl'
                })
                .when('/offers', {
                    templateUrl: '/offers/offers.html',
                    controller: 'OffersCtrl'
                })
                .when('/provide-service', {
                    templateUrl: '/provideServices/provideServices.html',
                    controller: 'ProvideServicesCtrl'
                })
                .when('/preview-service', {
                    templateUrl: '/previewServices/previewServices.html',
                    controller: 'PreviewServicesCtrl'
                })
                .when('/transportation/:id', {
                    templateUrl: '/transportation/transportation.html',
                    controller: 'TransportationCtrl'
                })
                .otherwise({redirectTo: "/"});
        }
    ]);
