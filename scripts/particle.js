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

  var objectStates = {}, applicationStates = [];

  var configState = function(obj, type, parentName, arrayOfStates,objectOfStates) {

    if (typeof obj == "object") {

      var newState = obj;

      //ADD STATE PROPERTIES TO OBJECT
      (parentName != null) ? newState.name = parentName + "." + obj.slug : newState.name = "" + obj.slug;
      newState.contentFile = CONFIG.contentPath + type + "/" + obj["_id"] + CONFIG.contentFileSuffix;
      newState.url = "/" + obj.slug;
      newState.subs = [];

      //ADD STATE VIEW PROPERTIES TO OBJECT
      if (type == "collections") {

        newState.views = {
          'headerContent@': {
            templateUrl: CONFIG.viewPath + 'header-content.html',
            controller: "content",
            resolve: {
              contentSettings: function() {
                return newState;
              }
            }
          },
          'primary@': {
            templateUrl: CONFIG.viewPath + type.single() + '.html',
            controller: "content",
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
            templateUrl: CONFIG.viewPath + type.single()  + '.html',
            controller: "content",
            resolve: {
              contentSettings: function() {
                return newState;
              }
            }
          }
        }

      }; //-- End else------



      //Instantiate State
      $stateProvider.state(newState.name, newState);

      objectOfStates[obj.slug] = { prop:newState };
      return newState;

    } else {
      return null;
    }
  }

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
                  newObRef = obj[property][inst].slug
                  makeStates(obj[property][inst], newParentName, newParent.subs,objectOfStates[newObRef]);
                }
              }
            }
          }
        }

      }

    }
  }


 $stateProvider
  // HOME ===================================================================
  .state('home', {
    url: '/',
    views: {
      'tagline@': {
        templateUrl: CONFIG.viewPath + 'tagline.html',
      },
      'headerContent@': {
        templateUrl: CONFIG.viewPath + 'home-header.html',
      },
      'primary@': {
        templateUrl: CONFIG.viewPath + 'home.html',
      }
    }
  });

  $urlRouterProvider.otherwise('/');


  //===========================================================================

  var objs = {};
  objs.collections = CONFIG.nav
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


PARTICLE.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

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
    $scope.setViewParameter = function(prop,val){  $scope.viewParameters[prop] = val; }

    $scope.viewParams = {};
    $scope.viewParamsChange = function(obj) {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          $scope.viewParams[property] = obj[property];
        }
      }
    }
    $scope.viewParamsChange($scope.CONFIG.viewParams);

    /**
     ------------------------------------------------------------------------------------------------------------------------
     *    END
     ------------------------------------------------------------------------------------------------------------------------
     **/

    $timeout(function(){

      $( document ).foundation();

      var headHeight = $('#main-header').outerHeight();
      $('#main-content.stickycontent').css('margin-top', headHeight );

      $(window).scroll(function() {
        var scrolledPx = $(window).scrollTop();
        var contentHeight = $('#main-content').outerHeight();
        var windowHeight = $(window).outerHeight();

        if ((scrolledPx > 54) && (contentHeight > windowHeight)) {
          $('#main-header.sticky').addClass('smaller');
          $('#main-content.stickycontent').addClass('content-smaller');
          $('#main-content.stickycontent').css('margin-top', '54px' );
        } else {
          $('#main-header.sticky').removeClass('smaller');
          $('#main-content.stickycontent').removeClass('content-smaller');
          $('#main-content.stickycontent').css('margin-top', headHeight );
        }
      });

    },2000)

    $scope.setViewParameter = function(prop,val){  $scope.viewParameters[prop] = val; }


    $scope.$on('$stateChangeSuccess', function () {

      $timeout(function(){
        var headHeight = $('#main-header').outerHeight();
        $('#main-content:not(.stickycontent)').css('margin-top', '0' );
        $('#main-content.stickycontent').css('margin-top', headHeight );
        $('#main-header').removeClass('smaller');
      },1000)

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

/***
 *     ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 *    ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 *    ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 *     ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *    ███╗   ███╗███████╗███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 *    ████╗ ████║██╔════╝████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 *    ██╔████╔██║█████╗  ██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 *    ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 *    ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 *    ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___  ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \/ __|
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/\__ \
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___||___/
 *
 *    These directives render various structural components of the page,
 *    based on information in the UI object returned by the data source.
 */

PARTICLE.directive('foo', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            typeclass: "=",
            message: "="
        },
        template: '<div class="{{typeclass}}"></div>',
        link: function (scope, element, attrs) {
        }
    };
});

PARTICLE.directive("vBlock", function() {
    return {
        templateUrl: "/directives/value_block.html",
        transclude:true,
        scope: {
            lab: "=?",
            value: "=?",
            units: "=?",
            pack: "=?",
            assignto: "=?",
            unitcolor: "=?",
            bgcolor: "=?",
            labelwidth: "=?",
            valuewidth: "=?"
        },
        link: function(scope, element, attrs, ctrl, transclude) {
            scope.controlClick = function(evt,obj) {
                scope.isActive = !scope.isActive;
            };
        }
    };
});

PARTICLE.directive("invHeaderBlock", function() {
    return {
        templateUrl: "/directives/inv_header_block.html",
        transclude:true,
        scope: {
            label:"=?",
            value:"=?",
            fade: "=?",
            lgsize: "=?",
            color: "=?",
            labelcolor: "=?"
        }
    };
});

PARTICLE.directive("projectAlert", function() {
    return {
        templateUrl: "/directives/project_alert.html",
        transclude:true,
        scope: {
            label:"=?",
            value:"=?",
            units: "=?",
            flag: "=?"
        }
    };
});

PARTICLE.directive("uiPod", function() {
    return {
        template: "",
        transclude:true,
        scope: {
            pack: "=",
            assignto:"=",
            ui: "="
        },
        link: function(scope, element, attrs, ctrl, transclude) {
            scope[scope.assignto] = scope.pack;
            //scope.isActive = true;
            scope.controlClick = function(evt,obj) {
                scope.isActive = !scope.isActive;
            };
            transclude(scope.$new(),function(clone,scope) {
                element.append(clone);
            });
        }
    };
});

PARTICLE.directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '=',
            requirements: "=",
            toggle: '&',
            myData: '&'
        },
        template: "<div class='row flex'><member ng-repeat='widget in collection' requirements='requirements' member='widget'></member></div>",
    };
});

PARTICLE.directive('member', function ($compile, $rootScope, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '=',
            requirements: "="
        },
        templateUrl: "directives/item-block.html",
        link: function (scope, element, attrs) {
            var collectionSt = '<collection collection="member.widgets"></collection>';
            scope.$on("message", function (e, msg) {

                // If I am messaged then I need to toggle myself
                if (msg[0] == scope.member.id_class) {
                    scope.member.toggle = !scope.member.toggle;
                }

                // Futher I also need to turn off all those in my group
                if (msg[1] == scope.member.group_class && msg[0] != scope.member.id_class) {
                    scope.member.toggle = 0;
                }

            });

            if (angular.isArray(scope.member.widgets)) {
                $compile(collectionSt)(scope, function (cloned, scope) {
                    element.append(cloned);
                });
            }
        },
        controller: function ($scope) {

            var initial_state = $scope.member.toggle;
            $scope.member.toggle = 1;

            $timeout(function () {
                $scope.member.toggle = initial_state;
            }, 100);

            $scope.f = function (id) {
                if (this.member.disable_hide_show !== true) {
                    if (this.member.hides) {
                        $rootScope.$broadcast('message', [id, this.member.hides]);
                    } else {
                        $rootScope.$broadcast('message', [id, "LACKAHIDES"]);
                    }
                }
            };

        }

    };
});
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
    }

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
        console.log("Error in DIRECTIVE:contentBlock")
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
    }


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
        console.log("Error in DIRECTIVE:contentBlock")
        $scope.error = _data;
      });

    }

    }

  }; //--END directiveDefinitionObject


  return directiveDefinitionObject;


});
/***
 *     █████╗ ██████╗ ██████╗ ██╗  ██╗   ██╗    ███████╗██╗██╗  ████████╗███████╗██████╗
 *    ██╔══██╗██╔══██╗██╔══██╗██║  ╚██╗ ██╔╝    ██╔════╝██║██║  ╚══██╔══╝██╔════╝██╔══██╗
 *    ███████║██████╔╝██████╔╝██║   ╚████╔╝     █████╗  ██║██║     ██║   █████╗  ██████╔╝
 *    ██╔══██║██╔═══╝ ██╔═══╝ ██║    ╚██╔╝      ██╔══╝  ██║██║     ██║   ██╔══╝  ██╔══██╗
 *    ██║  ██║██║     ██║     ███████╗██║       ██║     ██║███████╗██║   ███████╗██║  ██║
 *    ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝       ╚═╝     ╚═╝╚══════╝╚═╝   ╚══════╝╚═╝  ╚═╝
 *    ███████╗██████╗  ██████╗ ███╗   ███╗    ███████╗████████╗██████╗ ██╗███╗   ██╗ ██████╗
 *    ██╔════╝██╔══██╗██╔═══██╗████╗ ████║    ██╔════╝╚══██╔══╝██╔══██╗██║████╗  ██║██╔════╝
 *    █████╗  ██████╔╝██║   ██║██╔████╔██║    ███████╗   ██║   ██████╔╝██║██╔██╗ ██║██║  ███╗
 *    ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ╚════██║   ██║   ██╔══██╗██║██║╚██╗██║██║   ██║
 *    ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║    ███████║   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝
 *    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|  
 */

PARTICLE.filter('applyFilter', ['$filter', function ($filter) {
    return function (value, filters) {
        if (!filters) {
            return value;
        } else {
            var parts = filters.split(":");
            var filterName = parts[0];
            var params;
            if (parts[1]) {
                params = parts[1].split(":");
            }
            var filterFn = $filter(filterName);
            return filterFn.apply(filterFn, [value].concat(params));

        }
    };
}]);

/***
 *     ██████╗ █████╗ ██████╗ ██╗████████╗ █████╗ ██╗     ██╗███████╗███████╗
 *    ██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██║     ██║╚══███╔╝██╔════╝
 *    ██║     ███████║██████╔╝██║   ██║   ███████║██║     ██║  ███╔╝ █████╗
 *    ██║     ██╔══██║██╔═══╝ ██║   ██║   ██╔══██║██║     ██║ ███╔╝  ██╔══╝
 *    ╚██████╗██║  ██║██║     ██║   ██║   ██║  ██║███████╗██║███████╗███████╗
 *     ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|
 */

PARTICLE.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

/***
 *    ██████╗ ███████╗██████╗  ██████╗███████╗███╗   ██╗████████╗ █████╗  ██████╗ ███████╗
 *    ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝
 *    ██████╔╝█████╗  ██████╔╝██║     █████╗  ██╔██╗ ██║   ██║   ███████║██║  ███╗█████╗
 *    ██╔═══╝ ██╔══╝  ██╔══██╗██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║   ██║██╔══╝
 *    ██║     ███████╗██║  ██║╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
 *    ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|
 */

PARTICLE.filter('percent', function () {
    return function (value, param1) {
        return value.toFixed(param1) + "%";
    };
});

PARTICLE.filter('significantDigits', ['$filter', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var digits = Math.min(input.toString().length, places);
        return Number(input).toPrecision(digits);
    };
}]);
// Came from the comments here:  https://gist.github.com/maruf-nc/5625869
PARTICLE.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    };
});
PARTICLE.factory('dataIo', ['$http', 'dataRigger','CONFIG','$sce', function ($http, dataRigger,CONFIG,$sce) {
  
          var dataIo = {};

		        dataIo.getFile = function (_params) {
              if (CONFIG.showConsoleLogs) {
                console.log("dataIo.getFile",_params)
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
                console.log("dataIo.getContent",_params.file)
              }
		          var searchData = dataRigger.getNew("file", _params);
		            $http({
		                method: 'GET',
		                url: searchData.object.file,
		                params: searchData.object,
		            }).then(function(_data){
                  console.log(_data.data[Object.keys(_data.data)[0]])
		              _params.content=that.parseContent(_data.data[Object.keys(_data.data)[0]])
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
 *    ██╗     ██╗ ██████╗ ██╗   ██╗██╗██████╗     ███████╗██╗██╗     ██╗
 *    ██║     ██║██╔═══██╗██║   ██║██║██╔══██╗    ██╔════╝██║██║     ██║
 *    ██║     ██║██║   ██║██║   ██║██║██║  ██║    █████╗  ██║██║     ██║
 *    ██║     ██║██║▄▄ ██║██║   ██║██║██║  ██║    ██╔══╝  ██║██║     ██║
 *    ███████╗██║╚██████╔╝╚██████╔╝██║██████╔╝    ██║     ██║███████╗███████╗
 *    ╚══════╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═════╝     ╚═╝     ╚═╝╚══════╝╚══════╝
 *     ██████╗  █████╗ ██╗   ██╗ ██████╗ ███████╗
 *    ██╔════╝ ██╔══██╗██║   ██║██╔════╝ ██╔════╝
 *    ██║  ███╗███████║██║   ██║██║  ███╗█████╗
 *    ██║   ██║██╔══██║██║   ██║██║   ██║██╔══╝
 *    ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████╗
 *     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility for rendering animated liquid fill gauge graphics.
 */

/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
function liquidFillGaugeDefaultSettings(){
    return {
        minValue: 0, // The gauge minimum value.
        maxValue: 100, // The gauge maximum value.
        circleThickness: 0.1, // The outer circle thickness as a percentage of it's radius.
        circleFillGap: 0.02, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        circleColor: "#178BCA", // The color of the outer circle.
        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
        waveCount: 1, // The number of full waves per width of the wave circle.
        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        waveAnimate: true, // Controls if the wave scrolls or is static.
        waveColor: "#178BCA", // The color of the fill wave.
        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
        displayPercent: true, // If true, a % symbol is displayed after the value.
        textColor: "#fff", // The color of the value text when the wave does not overlap it.
        waveTextColor: "rgba(255,255,255,.5)" // The color of the value text when the wave overlaps it.
    };
}

function loadLiquidFillGauge(elementId, value, config) {
    if(config === undefined) config = liquidFillGaugeDefaultSettings();

    var gauge = d3.select("#" + elementId);
    var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2;
    var locationX = parseInt(gauge.style("width"))/2 - radius;
    var locationY = parseInt(gauge.style("height"))/2 - radius;
		  console.log(config);
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;

    var waveHeightScale;
    if(config.waveHeightScaling){
        waveHeightScale = d3.scale.linear()
            .range([0,config.waveHeight,0])
            .domain([0,50,100]);
    } else {
        waveHeightScale = d3.scale.linear()
            .range([config.waveHeight,config.waveHeight])
            .domain([0,100]);
    }

    var textPixels = (config.textSize*radius/2);
    var textFinalValue = parseFloat(value).toFixed(2);
    var textStartValue = config.valueCountUp?config.minValue:textFinalValue;
    var percentText = config.displayPercent?"%":"";
    var circleThickness = config.circleThickness * radius;
    var circleFillGap = config.circleFillGap * radius;
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin;
    var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);

    var waveLength = fillCircleRadius*2/config.waveCount;
    var waveClipCount = 1+config.waveCount;
    var waveClipWidth = waveLength*waveClipCount;

    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
    var textRounder = function(value){ return Math.round(value); };
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(1); };
    }
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(2); };
    }

    // Data for building the clip wave area.
    var data = [];
    for(var i = 0; i <= 40*waveClipCount; i++){
        data.push({x: i/(40*waveClipCount), y: (i/(40))});
    }

    // Scales for drawing the outer circle.
    var gaugeCircleX = d3.scale.linear().range([0,2*Math.PI]).domain([0,1]);
    var gaugeCircleY = d3.scale.linear().range([0,radius]).domain([0,radius]);

    // Scales for controlling the size of the clipping path.
    var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
    var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);

    // Scales for controlling the position of the clipping path.
    var waveRiseScale = d3.scale.linear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
        .domain([0,1]);
    var waveAnimateScale = d3.scale.linear()
        .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
        .domain([0,1]);

    // Scale for controlling the position of the text within the gauge.
    var textRiseScaleY = d3.scale.linear()
        .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
        .domain([0,1]);

    // Center the gauge within the parent SVG.
    var gaugeGroup = gauge.append("g")
        .attr('transform','translate('+locationX+','+locationY+')');

    // Draw the outer circle.
    var gaugeCircleArc = d3.svg.arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius-circleThickness));
    gaugeGroup.append("path")
        .attr("d", gaugeCircleArc)
        .attr("class", 'fill-color-0')
        .attr('transform','translate('+radius+','+radius+')');

    // Text where the wave does not overlap.
    var text1 = gaugeGroup.append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // The clipping wave area.
    var clipArea = d3.svg.area()
        .x(function(d) { return waveScaleX(d.x); } )
        .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
        .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
    var waveGroup = gaugeGroup.append("defs")
        .append("clipPath")
        .attr("id", "clipWave" + elementId);
    var wave = waveGroup.append("path")
        .datum(data)
        .attr("d", clipArea)
        .attr("T", 0);

    // The inner circle with the clipping wave attached.
    var fillCircleGroup = gaugeGroup.append("g")
        .attr("clip-path", "url(#clipWave" + elementId + ")");
    fillCircleGroup.append("circle")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("r", fillCircleRadius)
        .attr("class", 'fill-color-1');

    // Text where the wave does overlap.
    var text2 = fillCircleGroup.append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // Make the value count up.
    if(config.valueCountUp){
        var textTween = function(){
            var i = d3.interpolate(this.textContent, textFinalValue);
            return function(t) { this.textContent = textRounder(i(t)) + percentText; };
        };
        text1.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
        text2.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
    }

    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
    if(config.waveRise){
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
            .each("start", function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
    }

    if(config.waveAnimate) animateWave();

    function animateWave() {
        wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
        wave.transition()
            .duration(config.waveAnimateTime * (1-wave.attr('T')))
            .ease('linear')
            .attr('transform','translate('+waveAnimateScale(1)+',0)')
            .attr('T', 1)
            .each('end', function(){
                wave.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
    }

    function GaugeUpdater(){
        this.update = function(value){
            var newFinalValue = parseFloat(value).toFixed(2);
            var textRounderUpdater = function(value){ return Math.round(value); };
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
            }
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
            }

            var textTween = function(){
                var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                return function(t) { this.textContent = textRounderUpdater(i(t)) + percentText; };
            };

            text1.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);

            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
            var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
            var waveRiseScale = d3.scale.linear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                .domain([0,1]);
            var newHeight = waveRiseScale(fillPercent);
            var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
            var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);
            var newClipArea;
            if(config.waveHeightScaling){
                newClipArea = d3.svg.area()
                    .x(function(d) { return waveScaleX(d.x); } )
                    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                    .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
            } else {
                newClipArea = clipArea;
            }

            var newWavePosition = config.waveAnimate?waveAnimateScale(1):0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate?(config.waveAnimateTime * (1-wave.attr('T'))):(config.waveRiseTime))
                .ease('linear')
                .attr('d', newClipArea)
                .attr('transform','translate('+newWavePosition+',0)')
                .attr('T','1')
                .each("end", function(){
                    if(config.waveAnimate){
                        wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            waveGroup.transition()
                .duration(config.waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+newHeight+')');
        };
    }

    return new GaugeUpdater();
}

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
  var SETTINGS = response.data


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
