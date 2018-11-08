angular.module("customDeal")
    .controller("ProfileCtrl", ["$scope", "$rootScope", "$location", "ProfileService", "$routeParams", "ReviewService", function ($scope, $rootScope, $location, ProfileService, $routeParams, ReviewService) {

        // $scope.profileId = $routeParams.id;
        $scope.isMyProfile = $routeParams.id == "me" ? true : false
        $scope.profileInfo = {}

        $scope.getReviews = function (id) {
            ReviewService.getReviews(id)
                .then(function (res) {
                    $scope.allReviews = res.data;
                    angular.forEach($scope.allReviews, function (obj) {
                        obj.reviewer.photoURL = "http://customdeal.azurewebsites.net" + obj.reviewer.photoURL
                    });
                    console.log($scope.allReviews);
                })
                .catch(function (err) {
                    console.log(err)
                })
        };

        if ($scope.isMyProfile) {
            ProfileService.getProfileInfo()
                .then(function (res) {
                    $scope.profileInfo = res.data;
                    $scope.profileImage = "http://customdeal.azurewebsites.net" + $scope.profileInfo.photoURL;
                    $scope.getReviews($scope.profileInfo.uid);
                    localStorage.setItem("myUid", $scope.profileInfo.uid)
                })
                .catch(function (err) {
                    console.log(err)
                })
        } else {
            ProfileService.getProfileInfoByID($routeParams.id)
                .then(function (res) {
                    $scope.profileInfo = res.data;
                    $scope.profileImage = "http://customdeal.azurewebsites.net" + $scope.profileInfo.photoURL;
                    $scope.getReviews($scope.profileInfo.uid);
                })
                .catch(function (err) {
                    console.log(err)
                })
        }


        $scope.editUser = function () {
            ProfileService.editProfile($scope.profileInfo)
                .then(function (res) {
                    console.log(res)
                    swal("Profil has been edited!");
                    $("#editProfile").modal("hide");
                })
                .catch(function (err) {
                    console.log(err)
                    swal("Some Error has occured!");
                })
        }

        $scope.saveReview = function () {
            $scope.addReview.userUid = $scope.profileInfo.uid
            console.log($scope.addReview)
            ReviewService.addReview($scope.addReview)
                .then(function (res) {
                    console.log(res)
                    swal("You have added new review!")
                    $("#addReview").modal("hide");
                })
                .catch(function (err) {
                    console.log(err);
                    swal("Some Error has occured!");
                })
        }

        function readURL(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#editImg').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-upload").change(function () {
            readURL(this);
        });

        $scope.addImage = function () {
            var file = document.getElementById("file-upload").files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var data = "'" + reader.result + "'"

                ProfileService.uploadImage(data)
                    .then(function (res) {
                        console.log(res);
                        swal("You have changed profile image!")
                        $("#editProfile").modal("hide");

                    })
                    .catch(function (err) {
                        console.log(err);
                        swal("Some Error has occured!");
                    })

            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

    }]);

