(function() {
  var options;

  options = {
    waitSeconds: 60,
    baseUrl: "assets/js",
    paths: {
      "jquery": "../libs/jquery/jquery",
      "jquery-ui": "../libs/jquery-ui/jquery-ui.min",
      "jquery-cookie": "../libs/jquery-cookie/jquery.cookie",
      "angular": "../libs/angular/angular",
      "ngRoute": "../libs/angular-route/angular-route",
      "angular-bootstrap": "../libs/angular-bootstrap/ui-bootstrap-tpls.min",
      "ngAnimate": "../libs/angular-animate/angular-animate.min",
      "lodash": "../libs/lodash/dist/lodash.min",
      "moment": "../libs/moment/min/moment.min",
      "bootstrap": "bootstrap.min"
    },
    shim: {
      "angular": {
        exports: 'angular'
      },
      "ngRoute": [
        "angular"
      ],
      "angular-bootstrap": {
        deps: ["angular"],
        exports: 'angular.bootstrap'
      },
      "ngAnimate": {
        deps: ["angular"],
        exports: 'ngAnimate'
      },
      "bootstrap": {
        deps: ['jquery']
      },
      "main": {
        deps: ['jquery']
      }
    },
    deps: ['../../app/app']
  };

  if (typeof define === "function" && (define.amd != null)) {
  } else if (typeof module !== "undefined" && (module.exports != null)) {
    module.exports = options;
  }

  if (require.config != null) {
    require.config(options);
    require(["main"], function() {});
  }

}).call(this);
