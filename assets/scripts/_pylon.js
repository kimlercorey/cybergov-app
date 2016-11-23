/***
 *     █████╗ ██████╗ ██████╗
 *    ██╔══██╗██╔══██╗██╔══██╗
 *    ███████║██████╔╝██████╔╝
 *    ██╔══██║██╔═══╝ ██╔═══╝
 *    ██║  ██║██║     ██║
 *    ╚═╝  ╚═╝╚═╝     ╚═╝
 *    ██████╗  ██████╗  ██████╗ ████████╗███████╗████████╗██████╗  █████╗ ██████╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗
 *    ██████╔╝██║   ██║██║   ██║   ██║   ███████╗   ██║   ██████╔╝███████║██████╔╝
 *    ██╔══██╗██║   ██║██║   ██║   ██║   ╚════██║   ██║   ██╔══██╗██╔══██║██╔═══╝
 *    ██████╔╝╚██████╔╝╚██████╔╝   ██║   ███████║   ██║   ██║  ██║██║  ██║██║
 *    ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
 *
 */


(function() {

  /***
   *     ██████╗
   *    ██╔═████╗
   *    ██║██╔██║
   *    ████╔╝██║
   *    ╚██████╔╝██╗
   *     ╚═════╝ ╚═╝
   *
   */
  // Inject the $http angular service so we can load files
  var initInjector = angular.injector(["ng"]);
  var $http = initInjector.get("$http");

  /***
   *     ██╗
   *    ███║
   *    ╚██║
   *     ██║
   *     ██║██╗
   *     ╚═╝╚═╝
   *
   */
  // Load the app's configuration settings
  return $http.get("app-config.json")
  .then(function(response) {
  /***
   *    ██████╗
   *    ╚════██╗
   *     █████╔╝
   *    ██╔═══╝
   *    ███████╗██╗
   *    ╚══════╝╚═╝
   *
   */
  // Set settings to the values in the response
  var SETTINGS = response.data;


  /***
   *    ██████╗
   *    ╚════██╗
   *     █████╔╝
   *     ╚═══██╗
   *    ██████╔╝██╗
   *    ╚═════╝ ╚═╝
   *
   */
  // Load NAVIGATION/STATE values from navigation file
  // specified in the app-config.json in property SETTINGS.navigationFile
  $http.get(SETTINGS.navigationFile)
    .then(function(response) {
      /***
       *    ██╗  ██╗
       *    ██║  ██║
       *    ███████║
       *    ╚════██║
       *         ██║██╗
       *         ╚═╝╚═╝
       *
       */
      // Add a new nav property to the settings object and
      // point .nav to the loaded and sorted values from the nav.json / api
      SETTINGS.nav = {};
      SETTINGS.nav = response.data.sort(dynamicSort('sortOrder'));

      SETTINGS.navRight = {};
      SETTINGS.navRight = response.data.sort(dynamicSort('sortOrder'));

      /***
       *    ███████╗
       *    ██╔════╝
       *    ███████╗
       *    ╚════██║
       *    ███████║██╗
       *    ╚══════╝╚═╝
       *
       */
      // Create a constant for the app with all these
      // Settings inside so the app has all these settings when it starts.
      PARTICLE.constant("CONFIG", SETTINGS);

    })
    /***
     *     ██████╗
     *    ██╔════╝
     *    ███████╗
     *    ██╔═══██╗
     *    ╚██████╔╝██╗
     *     ╚═════╝ ╚═╝
     *
     */
    // Start up / Boostrap the application
    // Attaching the app to the body tag.
    .then(function bootstrapApplication() {
      angular.bootstrap(document.body,["PARTICLE"]);
      angular.element(document).ready(function() { });
    })
    /***
     *    ███████╗
     *    ╚════██║
     *        ██╔╝
     *       ██╔╝
     *       ██║██╗
     *       ╚═╝╚═╝
     *
     */
    // Define how to deal with errors if the navigation/nav.json can not be loaded
    .catch(function (data) {
      console.log("Unable to load: ",SETTINGS.navigationFile,data);
    });

  })
  /***
   *     █████╗
   *    ██╔══██╗
   *    ╚█████╔╝
   *    ██╔══██╗
   *    ╚█████╔╝██╗
   *     ╚════╝ ╚═╝
   *
   */
  // Define how to deal with errors if the app-configs.json can not be loaded
  .catch(function (data) {
    console.log("Unable to load app-configs.json");
  });

}());

/***
 *    ███╗   ███╗ █████╗ ██╗███╗   ██╗      ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
 *    ████╗ ████║██╔══██╗██║████╗  ██║      ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
 *    ██╔████╔██║███████║██║██╔██╗ ██║█████╗██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗
 *    ██║╚██╔╝██║██╔══██║██║██║╚██╗██║╚════╝██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝
 *    ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║      ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
 *    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝      ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 *
 *    This provider allows to create a central SINGLETON to hold important information
 *    Specifically it allows us to store information generated during the .config function
 *
 */

var PARTICLE = angular.module('PARTICLE', ['ngAnimate','ui.router','jsonFormatter'])
  .run(['$rootScope',  '$state', function ($rootScope, $state) {
    $rootScope.$state = $state;
  }]);
// **************************************************************************************************************************

/**************************************************************************************************************************
 *
 *     ██████╗███████╗███╗   ██╗████████╗██████╗  █████╗ ██╗      ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗
 *    ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝
 *    ██║     █████╗  ██╔██╗ ██║   ██║   ██████╔╝███████║██║     ██║   ██║██████╔╝     ██║█████╗  ██║        ██║
 *    ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║     ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║
 *    ╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║██║  ██║███████╗╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║
 *     ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝
 *
 *    This provider allows to create a central SINGLETON to hold important information
 *    Specifically it allows us to store information generated during the .config function
 *
 */

  PARTICLE.provider("centralObject", function () {
    var obj={};
    return {
      set: function (property,value) {
        obj[property] = value;
      },
      $get: function () {
        return obj;
      }
    };
  });

// **************************************************************************************************************************

/***
 *        ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
 *       ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
 *       ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
 *       ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
 *    ██╗╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
 *    ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
 *
 *
 *    This provider allows to create a central SINGLETON to hold important information
 *    Specifically it allows us to store information generated during the .config function
 *
 */
PARTICLE.config(function($stateProvider,$urlRouterProvider,CONFIG,centralObjectProvider) {

  document.title = CONFIG.siteTitle;

  var objectStates = {}, applicationStates = [];

  var configState = function(obj, type, parentName, arrayOfStates,objectOfStates) {

    if (typeof obj == "object") {

      var newState = obj;

      //ADD STATE PROPERTIES TO OBJECT
      newState.name = (parentName !== null) ? parentName + "." + obj.slug : obj.slug;
      newState.contentFile = CONFIG.contentPath + type + "/" + obj._id + CONFIG.contentFileSuffix;
      newState.url = "/" + obj.slug;
      newState.subs = [];
      newState.template = obj.template ? obj.template : type.single();
      newState.headerTemplate = obj.headerTemplate ? obj.headerTemplate : 'header-content';
      newState.controller = obj.controller ? obj.controller : 'content';

      //ADD STATE VIEW PROPERTIES TO OBJECT
      if (type == "collections") {

        newState.views = {
          'headerContent@': {
            templateUrl: CONFIG.viewPath + newState.headerTemplate + '.html',
            controller: 'content',
            resolve: {
              contentSettings: function() {
                return newState;
              }
            }
          },
          'primary@': {
            templateUrl: CONFIG.viewPath + newState.template + '.html',
            controller: newState.controller,
            resolve: {
              contentSettings: function() {
                return newState;
              }
            }
          }
        };

      } else {

        newState.views = {
          'primary@': {
            templateUrl: CONFIG.viewPath + newState.template + '.html',
            controller: newState.controller,
            resolve: {
              contentSettings: function() {
                return newState;
              }
            }
          }
        };

      } //-- End else------



      //Instantiate State
      $stateProvider.state(newState.name, newState);

      objectOfStates[obj.slug] = { prop:newState };
      return newState;

    } else {
      return null;
    }
  };

  var makeStates = function(obj, parentName, arrayOfStates,objectOfStates) {
    var pointer, newParent, newParentName, newObRef = null;
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (CONFIG.collectionsStateObjects.inArray(property)) {
          if (Array.isArray(obj[property]) && obj[property].length) {
            for (var inst in obj[property]) {
              if (obj[property].hasOwnProperty(inst)) {
                newParent = configState(obj[property][inst], property, parentName, arrayOfStates,objectOfStates);
                if (newParent !== null) {
                  arrayOfStates.push(newParent);
                  newParentName = newParent.name;
                  newObRef = obj[property][inst].slug;
                  makeStates(obj[property][inst], newParentName, newParent.subs,objectOfStates[newObRef]);
                }
              }
            }
          }
        }

      }

    }
  };


 $stateProvider
  // HOME ===================================================================
  .state('home', {
    url: '/',
    views: {
      'tagline@': {
        templateUrl: CONFIG.viewPath + 'tagline.html',
      },
      'headerContent@': {
        templateUrl: CONFIG.viewPath + 'header-home.html',
      },
      'primary@': {
        templateUrl: CONFIG.viewPath + 'home.html',
      }
    }
  });

  $urlRouterProvider.otherwise('/');


  //===========================================================================

  var objs = {};
  objs.collections = CONFIG.nav;
  makeStates(objs,null,applicationStates,objectStates);

    centralObjectProvider.set("applicationStates",applicationStates);
    centralObjectProvider.set("config",CONFIG);
    centralObjectProvider.set("objectStates",objectStates);


  //============================================================================


});



/**
 ------------------------------------------------------------------------------------------------------------------------
 *    ┌─┐┌─┐┌┐┌┌┬┐┌─┐┌┐┌┌┬┐  ┌─┐┌─┐┌┐┌┌┬┐┬─┐┌─┐┬  ┬  ┌─┐┬─┐
 *    │  │ ││││ │ ├┤ │││ │   │  │ ││││ │ ├┬┘│ ││  │  ├┤ ├┬┘
 *    └─┘└─┘┘└┘ ┴ └─┘┘└┘ ┴   └─┘└─┘┘└┘ ┴ ┴└─└─┘┴─┘┴─┘└─┘┴└─
 ------------------------------------------------------------------------------------------------------------------------
 **/
PARTICLE.controller("content",function($scope,$stateParams,$state,$timeout,dataIo,CONFIG,contentSettings) {

  $scope.CONFIG = CONFIG;
  $scope.content = null;

  dataIo.getFile({
    file:contentSettings.contentFile
  }).then(function(_data){
    $timeout(function(){
    $scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
  }, 500);
  }).catch(function (_data) {
    $scope.content = _data;
  });

});


/** END: content: CONTROLLER
------------------------------------------------------------------------------------------------------------------------ **/

/**
 ------------------------------------------------------------------------------------------------------------------------
 *    ┬ ┬┬  ┌─┐┌─┐┌┐┌┌┬┐┬─┐┌─┐┬  ┬  ┌─┐┬─┐
 *    │ ││  │  │ ││││ │ ├┬┘│ ││  │  ├┤ ├┬┘
 *    └─┘┴  └─┘└─┘┘└┘ ┴ ┴└─└─┘┴─┘┴─┘└─┘┴└─
 ------------------------------------------------------------------------------------------------------------------------
 **/
  PARTICLE.controller("ui",function($scope,centralObject,$timeout,$state) {

    $scope.CONFIG = centralObject.config;
    $scope.applicationStates = centralObject.applicationStates;
    $scope.centralObject = centralObject;

    /**
     ------------------------------------------------------------------------------------------------------------------------
     *    START
     *    Can't reconcile Todd's change with mine (Scott's), so they're
     *    probably duplicate functionality at the moment...
     ------------------------------------------------------------------------------------------------------------------------
     **/

    $scope.viewParameters = {};
    $scope.setViewParameter = function(prop,val){  $scope.viewParameters[prop] = val; };

    $scope.viewParams = {};
    $scope.viewParamsChange = function(obj) {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          $scope.viewParams[property] = obj[property];
        }
      }
    };
    $scope.viewParamsChange($scope.CONFIG.viewParams);

    /**
     ------------------------------------------------------------------------------------------------------------------------
     *    END
     ------------------------------------------------------------------------------------------------------------------------
     **/

    $timeout(function(){
      $( document ).foundation();
    },2000);


    $scope.setViewParameter = function(prop,val){  $scope.viewParameters[prop] = val; };


    $scope.$on('$stateChangeSuccess', function () {

      if ( $('#offCanvasLeft').hasClass('is-open') ) {
        $('#offCanvasLeft').foundation('close');
      }

      if ( $('#offCanvasRight').hasClass('is-open') ) {
        $('#offCanvasRight').foundation('close');
      }

    });

  });

/** END: ui:CONTROLLER
------------------------------------------------------------------------------------------------------------------------ **/

PARTICLE.directive('contentBlock', function ($timeout,dataIo,CONFIG,$location,$state) {

  var directiveDefinitionObject = {

  /***
   *    ███████╗██╗     ███████╗███╗   ███╗███████╗███╗   ██╗████████╗       ██╗        █████╗ ████████╗████████╗██████╗
   *    ██╔════╝██║     ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝       ██║       ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗
   *    █████╗  ██║     █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ████████╗    ███████║   ██║      ██║   ██████╔╝
   *    ██╔══╝  ██║     ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██╔═██╔═╝    ██╔══██║   ██║      ██║   ██╔══██╗
   *    ███████╗███████╗███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ██████║      ██║  ██║   ██║      ██║   ██║  ██║
   *    ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═════╝      ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝
   *
   */
  restrict: 'EA',

  /***
   *    ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
   *    ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
   *       ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗
   *       ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝
   *       ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
   *       ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
   *
   */
  template: '<div ng-include="getTemplateUrl()"></div>',
  transclude:true,

  /***
  *    ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
  *    ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
  *    ███████╗██║     ██║   ██║██████╔╝█████╗
  *    ╚════██║██║     ██║   ██║██╔═══╝ ██╔══╝
  *    ███████║╚██████╗╚██████╔╝██║     ███████╗
  *    ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚══════╝
  *
  */
  scope: {
    data:"="
  },

    /***
     *    ██╗     ██╗███╗   ██╗██╗  ██╗
     *    ██║     ██║████╗  ██║██║ ██╔╝
     *    ██║     ██║██╔██╗ ██║█████╔╝
     *    ██║     ██║██║╚██╗██║██╔═██╗
     *    ███████╗██║██║ ╚████║██║  ██╗
     *    ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
     *
     */
  controller: function ($scope) {

    $scope.loaded = null;
    $scope.error = null;
    $scope.CONFIG = CONFIG;
    $scope.hash = $location.path();
    $scope.current = $state.current.name;

    var singleType = $scope.data.type;
    var idlocation = "_id";

    if ($scope.data.obj._id) {
      idlocation = "_id";
    } else {
      idlocation = "$oid";
    }

    $scope.getTemplateUrl = function() {
      if (singleType.charAt(singleType.length - 1) == 's') {  singleType= singleType.substr(0, singleType.length - 1); }
      $scope.singleType = singleType;
      return CONFIG.viewPath+singleType+".html";
    };

      dataIo.getFile({
        file:CONFIG.contentPath + $scope.data.type+"/"+$scope.data.obj[idlocation]+CONFIG.contentFileSuffix
      }).then(function(_data){
        // scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
        // scope.loaded = true;

        /***
         *    ███████╗ █████╗ ██╗  ██╗███████╗    ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ██████╗ ███████╗██╗      █████╗ ██╗   ██╗
         *    ██╔════╝██╔══██╗██║ ██╔╝██╔════╝    ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔══██╗██╔════╝██║     ██╔══██╗╚██╗ ██╔╝
         *    █████╗  ███████║█████╔╝ █████╗      ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██║  ██║█████╗  ██║     ███████║ ╚████╔╝
         *    ██╔══╝  ██╔══██║██╔═██╗ ██╔══╝      ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║  ██║██╔══╝  ██║     ██╔══██║  ╚██╔╝
         *    ██║     ██║  ██║██║  ██╗███████╗    ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██████╔╝███████╗███████╗██║  ██║   ██║
         *    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝
         *
         */

        $timeout(function(){
          $scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
          $scope.loaded = true;
        }, 500);

        }).catch(function (_data) {
        console.log("Error in DIRECTIVE:contentBlock");
        $scope.error = _data;
      });

    }
  }; //--END directiveDefinitionObject


  return directiveDefinitionObject;


});
PARTICLE.directive('loadBlock', function ($timeout,dataIo,CONFIG,$location,$state) {

  var directiveDefinitionObject = {

  /***
   *    ███████╗██╗     ███████╗███╗   ███╗███████╗███╗   ██╗████████╗       ██╗        █████╗ ████████╗████████╗██████╗
   *    ██╔════╝██║     ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝       ██║       ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗
   *    █████╗  ██║     █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ████████╗    ███████║   ██║      ██║   ██████╔╝
   *    ██╔══╝  ██║     ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██╔═██╔═╝    ██╔══██║   ██║      ██║   ██╔══██╗
   *    ███████╗███████╗███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ██████║      ██║  ██║   ██║      ██║   ██║  ██║
   *    ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═════╝      ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝
   *
   */
  restrict: 'EA',

  /***
   *    ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
   *    ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
   *       ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗
   *       ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝
   *       ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
   *       ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
   *
   */
  template: '<div ng-include="getTemplateUrl()"></div>',
  transclude:false,

  /***
  *    ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
  *    ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
  *    ███████╗██║     ██║   ██║██████╔╝█████╗
  *    ╚════██║██║     ██║   ██║██╔═══╝ ██╔══╝
  *    ███████║╚██████╗╚██████╔╝██║     ███████╗
  *    ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚══════╝
  *
  */
  scope: {
    data:"="
  },

    /***
     *    ██╗     ██╗███╗   ██╗██╗  ██╗
     *    ██║     ██║████╗  ██║██║ ██╔╝
     *    ██║     ██║██╔██╗ ██║█████╔╝
     *    ██║     ██║██║╚██╗██║██╔═██╗
     *    ███████╗██║██║ ╚████║██║  ██╗
     *    ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
     *
     */
  controller: function ($scope) {

    $scope.loaded = null;
    $scope.error = null;
    $scope.CONFIG = CONFIG;
    $scope.hash = $location.path();
    $scope.current = $state.current.name;


    if ($scope.data) {

    $scope.getTemplateUrl = function() {
      //console.log(CONFIG.viewPath+$scope.data.template);
      return CONFIG.viewPath+$scope.data.template;
    };


      dataIo.getFile({
        file:CONFIG.contentPath + $scope.data.content + CONFIG.contentFileSuffix
      }).then(function(_data){
        // scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
        // scope.loaded = true;

        /***
         *    ███████╗ █████╗ ██╗  ██╗███████╗    ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ██████╗ ███████╗██╗      █████╗ ██╗   ██╗
         *    ██╔════╝██╔══██╗██║ ██╔╝██╔════╝    ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔══██╗██╔════╝██║     ██╔══██╗╚██╗ ██╔╝
         *    █████╗  ███████║█████╔╝ █████╗      ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██║  ██║█████╗  ██║     ███████║ ╚████╔╝
         *    ██╔══╝  ██╔══██║██╔═██╗ ██╔══╝      ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║  ██║██╔══╝  ██║     ██╔══██║  ╚██╔╝
         *    ██║     ██║  ██║██║  ██╗███████╗    ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██████╔╝███████╗███████╗██║  ██║   ██║
         *    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝
         *
         */

        $timeout(function(){
          $scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
          $scope.loaded = true;
        }, 500);

        }).catch(function (_data) {
        console.log("Error in DIRECTIVE:contentBlock");
        $scope.error = _data;
      });

    }

    }

  }; //--END directiveDefinitionObject


  return directiveDefinitionObject;


});
PARTICLE.filter('navFilter', function() {
  return function(items, menu) {
    var filtered = [];

    if (menu === undefined || menu === '') {
      return items;
    }

    angular.forEach(items, function(item) {

      if ( menu === 'mainNav' ) {
        if ( item.sortOrder >= 1 ) {
          filtered.push(item);
        }
      } else if ( menu === 'rightNav' ) {
        if ( item.rightNavOrder >= 1 ) {
          filtered.push(item);
        }
      } else if ( menu === 'homeHeader' ) {
        if ( item.homePageOrder >= 1 && item.homePageOrder <= 3 ) {
          filtered.push(item);
        }
      } else if ( menu === 'homeHeaderButton' ) {
        if ( item.homePageOrder == 4 ) {
          filtered.push(item);
        }
      } else if ( menu === 'homeBody' ) {
        if ( item.homePageOrder >= 5 ) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }

    });

    return filtered;
  };
});

PARTICLE.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

/***
 *     ██████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗  ██╗     █████╗ ██████╗ ██████╗  █████╗ ██╗   ██╗
 *    ██╔════╝██║  ██║██║   ██║████╗  ██║██║ ██╔╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
 *    ██║     ███████║██║   ██║██╔██╗ ██║█████╔╝     ███████║██████╔╝██████╔╝███████║ ╚████╔╝
 *    ██║     ██╔══██║██║   ██║██║╚██╗██║██╔═██╗     ██╔══██║██╔══██╗██╔══██╗██╔══██║  ╚██╔╝
 *    ╚██████╗██║  ██║╚██████╔╝██║ ╚████║██║  ██╗    ██║  ██║██║  ██║██║  ██║██║  ██║   ██║
 *     ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility for chunking arrays into groups.
 */

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
});

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

Array.prototype.inArray=function(needle){
  return (this.indexOf(needle) != -1);
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

function dynamicSort(property) {

  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  };
}
/***
 *    ███╗   ███╗ ██████╗ ██████╗ ██╗██╗     ███████╗
 *    ████╗ ████║██╔═══██╗██╔══██╗██║██║     ██╔════╝
 *    ██╔████╔██║██║   ██║██████╔╝██║██║     █████╗
 *    ██║╚██╔╝██║██║   ██║██╔══██╗██║██║     ██╔══╝
 *    ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║███████╗███████╗
 *    ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚══════╝╚══════╝
 *    ██████╗ ███████╗████████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ██║  ██║█████╗     ██║   █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 *    ██║  ██║██╔══╝     ██║   ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 *    ██████╔╝███████╗   ██║   ███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 *    ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility for determining whether to run in mobile or desktop mode.
 */

var _isNotMobile = (function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return !check;
})();


/***
 *    ██╗  ██╗██╗ ██████╗ ██╗  ██╗ ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗███████╗
 *    ██║  ██║██║██╔════╝ ██║  ██║██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
 *    ███████║██║██║  ███╗███████║██║     ███████║███████║██████╔╝   ██║   ███████╗
 *    ██╔══██║██║██║   ██║██╔══██║██║     ██╔══██║██╔══██║██╔══██╗   ██║   ╚════██║
 *    ██║  ██║██║╚██████╔╝██║  ██║╚██████╗██║  ██║██║  ██║██║  ██║   ██║   ███████║
 *    ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
 *     █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
 *    ██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 *    ███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
 *    ██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
 *    ██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
 *    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility for applying animation effects to charts.
 */

Math.easeOutBounce = function (pos) {
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};

/***
 *     ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗
 *    ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝
 *    ██║   ██║██████╔╝     ██║█████╗  ██║        ██║
 *    ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║
 *    ╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║
 *     ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝
 *    ██████╗ ███████╗███████╗███████╗██████╗ ███████╗███╗   ██╗ ██████╗███████╗
 *    ██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
 *    ██████╔╝█████╗  █████╗  █████╗  ██████╔╝█████╗  ██╔██╗ ██║██║     █████╗
 *    ██╔══██╗██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║     ██╔══╝
 *    ██║  ██║███████╗██║     ███████╗██║  ██║███████╗██║ ╚████║╚██████╗███████╗
 *    ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility to evaluate a literal string reference to a JavaScript object/property.
 *
 *    In our application we require a way to map values in the data returned to places within the UI.
 *    We do this by putting a reference in ui object in dot notaion such as totalFYSpending.0.agile
 *    This little utility splits the dotted string and returns the value within the obj passed in.
 *    This is how we push values into the ui object.
 */

function resRef(obj, str) {
    return str.split(".").reduce(function (o, x) {
            if (typeof o != 'undefined') {
                return o[x];
            } else {
                console.log("There is missing data within object ", o, " referenced by :", x);
            }
        },
        obj
    );
}

String.prototype.upper = function () {
    return this.toUpperCase();
};



String.prototype.single = function () { 
    return this.replace(/s$/, '');
};
PARTICLE.factory('dataIo', ['$http', 'dataRigger','CONFIG','$sce', function ($http, dataRigger,CONFIG,$sce) {

          var dataIo = {};

		        dataIo.getFile = function (_params) {
              if (CONFIG.showConsoleLogs) {
                console.log("dataIo.getFile",_params);
              }
		          var searchData = dataRigger.getNew("file", _params);
		            return $http({
		                method: 'GET',
		                url: searchData.object.file,
		                params: searchData.object,
		            });
		        };

		        dataIo.getContent = function (_params) {
              var that = this;
              if (CONFIG.showConsoleLogs) {
                console.log("dataIo.getContent",_params.file);
              }
		          var searchData = dataRigger.getNew("file", _params);
		            $http({
		                method: 'GET',
		                url: searchData.object.file,
		                params: searchData.object,
		            }).then(function(_data){
                  console.log(_data.data[Object.keys(_data.data)[0]]);
		              _params.content=that.parseContent(_data.data[Object.keys(_data.data)[0]]);
                  console.log("_params.content",_params.content);
		            }).catch(function (_data) {
                  $scope.content = _data;
                  });
		        };

            dataIo.parseContent = function(obj) {
              for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                  if (typeof obj[property] == "object") {
                    this.parseContent(obj[property]);
                  } else {
                    if(CONFIG.trustedHTML.inArray(property)) {
                      obj[property] = $sce.trustAsHtml(obj[property]);
                    }
                  }
                }
              }
              return obj;
            };

            dataIo.xml2json = function(xml) {
             var x2js = new X2JS();
             var json = x2js.xml_str2json( xml );
             return json;
            };

		        return dataIo;
		    }])
		    .service('dataRigger', function () {

		        this.getApiBaseUrl = function (_params) {
		            return "https://api.github.com/";
		        };

		        this.fillDataInObjectByList = function (_object, _params, _list) {

		            angular.forEach(_list, function (value, key) {
		                if (angular.isDefined(_params[value])) {
		                    _object.object[value] = _params[value];
		                }
		            });

		           return _object;

		        };

		        this.getNew = function (_type, _params) {
		            var githubSearchData = {
		                object: {},
		                url: "",
		            };

		            if (angular.isDefined(_params.per_page)) {
		                githubSearchData.object.per_page = _params.per_page;
		            }

		            if (angular.isDefined(_params.access_token)) {
		                githubSearchData.object.access_token = _params.access_token;
		            }

		            switch (_type) {

										case "file":
		                  githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, ['file']);
		                  //githubSearchData.url = this.getApiBaseUrl() + "users/" + _params.user;
											break;

		                case "user":
		                    githubSearchData.object.per_page = undefined;
		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, []);
		                    githubSearchData.url = this.getApiBaseUrl() + "users/" + _params.user;
		                    break;

		                case "reposByUser":
		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, [
		                        'q', 'sort', 'order', 'page'
		                    ]);
		                    githubSearchData.url = this.getApiBaseUrl() + "users/" + _params.user + "/repos";
		                    break;

		                case "reposByName":
		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, [
		                        'sort', 'order', 'page'
		                    ]);
		                    githubSearchData.url = this.getApiBaseUrl() + "search/repositories?q=" + _params.q;
		                    break;

		                case "repoByUserAndName":
		                    githubSearchData.object = {
		                        access_token: _params.access_token,
		                    };

		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, []);

		                    githubSearchData.url = this.getApiBaseUrl() + "repos/" + _params.user + "/" + _params.repo;
		                    break;

		                case "eventsByUser":
		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, [
		                        'q', 'sort', 'order', 'page'
		                    ]);
		                    githubSearchData.url = this.getApiBaseUrl() + "users/" + _params.user + "/events";
		                    break;

		                case "eventsFromRepoByUserAndName":
		                    githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, [
		                        'q', 'sort', 'order', 'page'
		                    ]);
		                    githubSearchData.url = this.getApiBaseUrl() + "repos/" + _params.user + "/" + _params.repo + "/events";
		                    break;

		                case "fileByRepoName":
		                  githubSearchData.object = {
		                      access_token: _params.access_token,
		                  };

		                  githubSearchData = this.fillDataInObjectByList(githubSearchData, _params, []);
		                  githubSearchData.url = this.getApiBaseUrl() + "repos/" + _params.user + "/" + _params.repo + "/contents/" + _params.path ;
											console.log("githubSearchData.url",githubSearchData.url);
		                  break;
		            }
		            return githubSearchData;
		        };
		    });
/***
 *    ██████╗  █████╗ ████████╗ █████╗ ███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗
 *    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝
 *    ██║  ██║███████║   ██║   ███████║███████╗██║   ██║██║   ██║██████╔╝██║     █████╗
 *    ██║  ██║██╔══██║   ██║   ██╔══██║╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝
 *    ██████╔╝██║  ██║   ██║   ██║  ██║███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗
 *    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝
 *      ____                      _
 *     / ___|   ___  _ __ __   __(_)  ___  ___
 *     \___ \  / _ \| '__|\ \ / /| | / __|/ _ \
 *      ___) ||  __/| |    \ V / | || (__|  __/
 *     |____/  \___||_|     \_/  |_| \___|\___|
 *
 *    A service for querying a data source and inserting processed data into the UI.
 */

PARTICLE.factory('$datasource', ['$http', '$sce', '$timeout', function ($http, $sce, $timeout) {

    /**
     * The $datasource service object includes a few public methods.
     */
    var service = {

        /**
         * Initialize the source.
         *
         * @param {object} params
         * @param {object} hash
         *
         * @returns {string}
         */
        initialize: function (params, hash) {

            // Get source filtering parameters from URL hash
            decodeParams(params, hash);

        },

        /**
         * Get data from source.
         *
         * @param {string} uri
         *
         * @returns {object}
         */
        getData: function (uri, params, hash) {

            var config = {
                params: params
            };

            if (typeof webSessionToken != 'undefined') {
                config.headers = {
                    'X-Session-Token': webSessionToken.toString()
                };
            }

            // Set source filtering parameters in URL hash, to enable bookmarking of filtered views
            encodeParams(params, hash);

            return $http.get(uri, config).then(
                function (response) {
                    return response.data;
                }
            );

        },

        /**
         * Insert processed data into UI.
         *
         * @param {object} raw
         * @param {mixed} results
         * @param {int} start_index
         * @param {int} group_num
         *
         * @returns {array}
         */
        processData: function (raw, results, start_index, group_num) {

            var ui_nodes = [];
            var widCount = 0;
            var chunked_bits = [];
            var group_by = 3;

            if (raw.hasOwnProperty("widgets")) {
                group_by = (raw.group_by !== undefined ) ? raw.group_by : group_by;
                chunked_bits = raw.widgets.chunk(group_by);
            } else {
                group_by = group_num;
                chunked_bits = raw.chunk(group_by);
            }

            chunked_bits.forEach(function (nodes, indx) {

                var children_to_process = [];
                var common_children_group_class = start_index + "_" + indx + "_group";
                var controlsChildren = 0;
                //Put each of the parent nodes into the stack in groups of three
                nodes.forEach(function (node) {


                    node.toggle = 1;
                    node.id_class = start_index + "_" + widCount;
                    widCount++;

                    if (node.primary_value !== undefined) {
                        node.primary_value = resRef(results, node.primary_value);
                    }

                    if (node.title !== undefined) {
                        node.title = $sce.trustAsHtml(node.title);
                    }

                    if (node.body !== undefined) {
                        node.body = $sce.trustAsHtml(resRef(results, node.body));
                    }

                    if ((node.content !== undefined) && (typeof node.content === 'object')) {
                        Object.keys(node.content).forEach(function(key) {
                            if (node.content[key].words !== undefined) {
                              if (typeof node.content[key].words != 'object') {
                                node.content[key].words = $sce.trustAsHtml(resRef(results, node.content[key].words));
                              } else {
                                
                                Object.keys(node.content[key].words).forEach(function(keyInner) { 
                                  node.content[key].words[keyInner] = $sce.trustAsHtml(resRef(results, node.content[key].words[keyInner]));
                                
                                });
                                
                              }
                            }
                            if (node.content[key].primary_value !== undefined) {
                                node.content[key].primary_value = resRef(results, node.content[key].primary_value);
                            }
                        });
                    }

                    var mynewContainerWidget = new container_widget();

                    //If the parent has some children then for now we will assume they will be put into a collpaseable
                    //DIV, for now I am going to just dump them all into
                    if (node.hasOwnProperty("widgets")) {

                        controlsChildren = 1;

                        //We need to build a container for holding the
                        mynewContainerWidget.id_class = start_index + "_" + widCount;
                        var pointerToWidgets = node.widgets;
                        delete node.widgets;
                        node.group_by = ( node.group_by !== undefined ) ? node.group_by : group_by;

                        mynewContainerWidget.widgets = service.processData(pointerToWidgets, results, mynewContainerWidget.id_class, node.group_by);
                        mynewContainerWidget.label = "Empty Container";
                        mynewContainerWidget.toggle = 1;
                        if (node.children_initial_state == "hidden")  mynewContainerWidget.toggle = 0;
                        //Put the container on the stack of children to tack into the stack after the parents are on the stack;
                        node.activates = mynewContainerWidget.id_class;
                        node.hides = common_children_group_class;
                        mynewContainerWidget.group_class = common_children_group_class;
                        widCount++;
                    }

                    if ((node.position_hidden_children == "adjacent" || !_isNotMobile ) && controlsChildren) {
                        ui_nodes.push(node);
                        ui_nodes.push(mynewContainerWidget);
                    } else {
                        if (controlsChildren) {
                            children_to_process.push(mynewContainerWidget);
                        }
                        ui_nodes.push(node);
                    }

                    controlsChildren = 0;
                });

                children_to_process.forEach(function (node) {
                    ui_nodes.push(node);


                });

                //add_to_ui_array(nodes);
            });

            return ui_nodes;

        }

    };

    /**
     * Prototype widget, used for inserting processed source data into UI.
     */
    var container_widget = function () {
        this.title = null;
        this.type = "empty_container";
        this.block_type = "col-sm-12";
        this.primary_value = null;
        this.color_code = null;
        this.group_by = 3;
        this.children_inital_state = "show";
        this.widgets = null;
    };

    /**
     * Translate source filtering parameters into a minified URL hash.
     */
    var encodeParams = function (params, hash) {

        for (var param in params) {

            // Minify an agency code by stripping leading zeroes
            if (param === 'agencyCode') {
                hash.a = parseInt(params[param]);
            }

        }

        location.hash = $.param(hash);

    };

    /**
     * Translate a minified URL hash into source filtering parameters.
     */
    var decodeParams = function (params, hash) {

        try {
            var json, str = decodeURIComponent(location.hash.substring(2));
            if (str) {
                json = JSON.parse('{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                if (json && typeof json === 'object' && json !== null) {
                    console.log('Parameters from URL hash string:', json);
                    hash = json;
                }
            }
        } catch (e) {
            console.log('URL hash string is invalid');
        }

        for (var param in hash) {

            // Restore a minified agency code by adding leading zeroes
            if (param === 'a') {
                params.agencyCode = ('000' + hash[param]).substring(hash[param].length);
            }

        }

    };

    return service;

}]);
