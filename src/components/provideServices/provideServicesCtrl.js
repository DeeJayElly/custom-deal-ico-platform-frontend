
angular.module("customDeal")
.controller("ProvideServicesCtrl", ["$scope","$rootScope", "$location", "ATService", function($scope,rootScope, $location, ATService) {
console.log("relja")
$scope.accomodationInfo = {};
$scope.accomodationInfo.photoUrlList = [];
$scope.transporationInfo = {};
$scope.transporationInfo.photoUrlList = [];

$scope.backHome = function() {
    $location.url("/");
}

$scope.showProvideServicePopup = function() {
    $("#provide-modal1").modal();
}

$scope.showProvideTransportationPopup = function() {
    $("#provide-transportation").modal();
}
$scope.nextStepAcomodation =function(){
    $("#provide-modal1").modal("hide");
    $("#provide-modal2").modal();
}
$scope.previousStepAcomodation =function(){
    $("#provide-modal2").modal("hide");
    $("#provide-modal1").modal();
}
$scope.nextStepTransportation =function(){
    $("#provide-transportation").modal("hide");
    $("#provide-transportation2").modal();
}
$scope.previousStepTransporation =function(){
    $("#provide-transportation2").modal("hide");
    $("#provide-transportation").modal();
}


$scope.addService = function(type){
    if (type == "accomodation") {
        $scope.accomodationInfo.userUid = localStorage.getItem("myUid");

        ATService.addAccomodation($scope.accomodationInfo)
        .then(function(data){
            console.log(data);
            swal("You have added accomodation!");
            $("#provide-modal2").modal("hide");
        })
        .catch(function(err){
            console.log(err);
            swal("Some Error has occured!");
        })
    } else {
        $scope.transporationInfo.userUid = localStorage.getItem("myUid");

        ATService.addTransportation($scope.transporationInfo)
        .then(function(data){
            console.log(data);
            swal("You have added transportation!");
            $("#provide-transportation2").modal("hide");
        })
        .catch(function(err){
            console.log(err);
            swal("Some Error has occured!");
        })
    }
}


function readImage(input, type){
    var file = document.getElementById(input).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if(type == "accomodation"){
            $scope.accomodationInfo.photoUrlList.push(reader.result)    
        } else {
        $scope.transporationInfo.photoUrlList.push(reader.result)
            
        }


    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}
function readURL(input, id) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
    
        reader.onload = function(e) {
        $(id).attr('src', e.target.result);
        }
    
        reader.readAsDataURL(input.files[0]);
    }
}

    function readMultipleImages(id, result){

            console.log(id)
            var filesInput = document.getElementById(id);
            
            filesInput.addEventListener("change", function(event){
                // console.log(event.target.files)
                var files = event.target.files; //FileList object
                var output = document.getElementById(result);
                if (files.length > 8) {
                    swal("Please select max 8 files.");
                    e.preventDefault();
                } else {
                    for(var i = 0; i< files.length; i++)
                    {
                        var file = files[i];
                        
                        //Only pics
                        if(!file.type.match('image'))
                          continue;
                        
                        var picReader = new FileReader();
                        
                        picReader.addEventListener("load",function(event){
                            
                            var picFile = event.target;
                            if(id =="filesAccomodation"){
                                $scope.accomodationInfo.photoUrlList.push(picFile.result)
                            } else {
                                $scope.transporationInfo.photoUrlList.push(picFile.result)
                                
                            }
                            var div = document.createElement("div");
                            
                            div.innerHTML = "<img class='thumbnailService' src='" + picFile.result + "'" +
                                    "title='" + picFile.name + "'/>";
                            
                            output.insertBefore(div,null);            
                        
                        });
                        
                         //Read the image
                        picReader.readAsDataURL(file);
                    }  
                }
                                 
               
            });
    };
    
    readMultipleImages("filesAccomodation", "resultAccomodation");
    readMultipleImages("filesTransportation", "resultTransportation");
var modal = $('.modal'),
    modalBox = $(".provide-modal"),
    body = $("body"),
    modals = $("div[id^='provide-modal']"),
    modalBackdrop = $(".modal-backdrop"),
    modalBackdropIn = $(".modal-backdrop.in"),
    modalVisible = $('.modal:visible');

    modalBox.on('show.bs.modal', function () {
        setTimeout( function() {
            modalBackdrop.addClass("modal-backdrop-fullscreen");
        },0);
    });

    modalBox.on('shown.bs.modal', function () {
        body.addClass('modal-open');
    });    

    modalBox.on('hidden.bs.modal', function () {
        modalBackdrop.addClass("modal-backdrop-fullscreen");
    });
    
    modal.on("hidden.bs.modal", function (e) {
        if(modalVisible.length)
        {
            modalBackdrop.first().css('z-index', parseInt(modalVisible.last().css('z-index')) - 10);
            body.addClass('modal-open');
        }
    }).on("show.bs.modal", function (e) {
        if(modalVisible.length)
        {
            modalBackdropIn.first().css('z-index', parseInt(modalVisible.last().css('z-index')) + 10);
            $(this).css('z-index', parseInt(modalBackdropIn.first().css('z-index')) + 10);
            alert("Test");
        }
    });

/* Providing services quantity plus / minus */  

jQuery(document).ready(function(){
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment only if value is < 20
            if (currentVal < 20)
            {
            $('input[name='+fieldName+']').val(currentVal + 1);
            $('.qtyminus').val("-").removeAttr('style');
            }
            else
            {
            $('.qtyplus').val("+").css('color','#aaa');
            $('.qtyplus').val("+").css('cursor','not-allowed');
            }
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);

        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one only if value is > 1
            $('input[name='+fieldName+']').val(currentVal - 1);
            $('.qtyplus').val("+").removeAttr('style');
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
            $('.qtyminus').val("-").css('color','#aaa');
            $('.qtyminus').val("-").css('cursor','not-allowed');
        }
    });
});

}]);

