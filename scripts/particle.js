

var PARTICLE = angular.module('PARTICLE', ['ngAnimate','ui.router','jsonFormatter']);

PARTICLE.provider("centralObject", function () {
  var obj={};
  return {
    set: function (property,value) {
      console.log("Setting centralObject."+property+" to "+ value)
      obj[property] = value;
    },
    $get: function () {
      return obj;
    }
  };
});

PARTICLE.config(function($stateProvider,$urlRouterProvider,CONFIG,centralObjectProvider) {
  
  
  var applicationStates = [];
  
  var returnStateFromObject = function(obj, type, parentName, arrayOfStates) {

    if (typeof obj == "object") {

      var slug = "";
      var stateProperties = {};
      var singleType = type;

      if (parentName != null) {
        slug = parentName + "." + obj.slug;
      } else {
        slug = "" + obj.slug;
      }

      if (singleType.charAt(singleType.length - 1) == 's') {
        singleType = singleType.substr(0, singleType.length - 1);
      }

      stateProperties.params = {};
      stateProperties.params[type] = {};
      stateProperties.hash = obj._id;
      stateProperties.title = obj.title;
      if (type == "collections") {
        stateProperties.templateUrl = CONFIG.viewPath + "sections.html"
        stateProperties.controller = "content";
        stateProperties.views = {
          '': {
            templateUrl: CONFIG.viewPath + 'sections.html',
            controller: 'content',
          },
          'headerContent': {
            templateUrl: CONFIG.viewPath + 'header-content.html',
            controller: 'content'
          },
          'rightSidebar': {
            templateUrl: CONFIG.viewPath + 'header-content.html',
            controller: 'questions'
          },
          'relatedContent': {
            templateUrl: CONFIG.viewPath + 'related-content.html',
            controller: 'content'
          }
        };
        stateProperties.params.contentFile = CONFIG.contentPath + type + "/" + obj["_id"] + CONFIG.contentFileSuffix;
      } else {
        stateProperties.templateUrl = CONFIG.viewPath + type + ".html"
        stateProperties.params.state = slug;
      }

      stateProperties.name = slug;
      stateProperties.url = "/" + obj.slug;
      $stateProvider.state(slug, stateProperties);
      stateProperties.subs = [];
      return stateProperties;
    } else {
      return null;
    }
  }

  var makeCollectionIntoStates = function(obj, parentName, arrayOfStates) {
   var pointer, newParent, newParentName = null;
   for (var property in obj) {
     if (obj.hasOwnProperty(property)) {
       if (CONFIG.collectionsStateObjects.inArray(property)) {
         if (Array.isArray(obj[property]) && obj[property].length) {
           for (var inst in obj[property]) {
             if (obj[property].hasOwnProperty(inst)) {
               newParent = returnStateFromObject(obj[property][inst], property, parentName, arrayOfStates);
               if (newParent !== null) {
                 arrayOfStates.push(newParent);
                 newParentName = newParent.name;
                 makeCollectionIntoStates(obj[property][inst], newParentName, newParent.subs);
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
      '': {
        templateUrl: CONFIG.viewPath + 'home.html',
      },
      'tagline': {
        templateUrl: CONFIG.viewPath + 'tagline.html',
      },
      'headerContent': {
        templateUrl: CONFIG.viewPath + 'home-header.html',
      },
      'rightSidebar': {
        templateUrl: CONFIG.viewPath + 'questions.html',
        controller: 'questions'
      },
      'relatedContent': {
        template: '',
      }
    }
  });
  
  $urlRouterProvider.otherwise('/');
  
  
  //===========================================================================

  var objs = {};
  objs.collections = CONFIG.nav
  makeCollectionIntoStates(objs,null,applicationStates);
  centralObjectProvider.set("applicationStates",applicationStates);
  centralObjectProvider.set("config",CONFIG);
  
  //============================================================================
  

});



/**
 ------------------------------------------------------------------------------------------------------------------------
 *    ┌─┐┌─┐┌┐┌┌┬┐┌─┐┌┐┌┌┬┐  ┌─┐┌─┐┌┐┌┌┬┐┬─┐┌─┐┬  ┬  ┌─┐┬─┐
 *    │  │ ││││ │ ├┤ │││ │   │  │ ││││ │ ├┬┘│ ││  │  ├┤ ├┬┘
 *    └─┘└─┘┘└┘ ┴ └─┘┘└┘ ┴   └─┘└─┘┘└┘ ┴ ┴└─└─┘┴─┘┴─┘└─┘┴└─
 ------------------------------------------------------------------------------------------------------------------------
 **/

  PARTICLE.controller("content",function($scope,$stateParams,$state,$sce,dataIo,CONFIG) {

    $scope.CONFIG = CONFIG;

    dataIo.getFile({
      file:$stateParams.contentFile
    }).then(function(_data){
      $scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
    }).catch(function (_data) {
      $scope.content = _data;
    });

  });

  PARTICLE.controller("questions",function($scope,$stateParams,$state,$sce,dataIo,CONFIG) {

    $scope.CONFIG = CONFIG;

    log_q($stateParams);

    dataIo.getFile({
      file:CONFIG.contentPath + "questions.json"
    }).then(function(_data){
      $scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
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
  // PARTICLE.controller("ui",function($stateProvider,$urlRouterProvider,$state,$scope,$location,$timeout,$anchorScroll,$timeout,dataIo,$q,CONFIG,appConfig,centralObject) {

  PARTICLE.controller("ui",function($scope,centralObject,$timeout) {

    $scope.CONFIG = centralObject.config;
    $scope.applicationStates = centralObject.applicationStates;
    $scope.centralObject = centralObject;

    $timeout(function(){
       $( document ).foundation();
    },2000)
     
    
    


  });

/** END: ui:CONTROLLER
------------------------------------------------------------------------------------------------------------------------ **/

/***
* ██████╗  █████╗ ██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
* ██████╔╝███████║██████╔╝    ██║     ███████║███████║██████╔╝   ██║
* ██╔══██╗██╔══██║██╔══██╗    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
* ██████╔╝██║  ██║██║  ██║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
* ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a bar chart.
*/

PARTICLE.directive('smartChart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe();
                drawn=1;
            }
        }
    },
    1);

    var drawMe = function(indexval) {

      console.log("BARCHART DARW");
        if (indexval === null) {
            return null;
        }
        var width, height, dataset, layers;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 200;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          var spending = ["DME", "OM"];
          var parseDate = d3.time.format("%m/%Y").parse;

              // Function below establishes start and end dates for the graph and removes
              // the values that fall outside the range. It also parses data elements in X and Y
              // components that will be used for plotting.



              // Parse the data
              layers = sub.map(function(d) {
                  return {x: d.date, y: +d.rating, y0: +0};
              });

            layers = d3.layout.stack()(spending.map(function(c) {
                return dataset.map(function(d) {
                    return {x: d.date, y: d[c]};
                });
            }));
          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

              // Define X Scale
              xScale = d3.time.scale()
                  .domain([startdate, enddate])
                  .range([0 + config.margin.left, width - config.margin.right]);

              // Define Y Scale
              yScale = d3.scale.linear()
                  .domain([0, 5])
                  .range([height-config.margin.bottom, config.margin.top])
                  .nice();

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width]);

              var y = d3.scale.linear()
                  .rangeRound([height, 0]);

              var z = d3.scale.category10();

              var chart = el.append("svg")
                  .attr("height",height)
                  .attr("width",width)
                  .attr("class", "chart");

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .tickFormat(d3.time.format("%b"));

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left");

              var x_axis = chart.append("g") // Draw axes: x axis
                  .attr("id","xaxis"+indexval)
                  .attr("class", "axis x")
                  .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
                  .call(xAxis)
                      .selectAll("text")
                      .style("text-anchor", function(d) {
                          if(d.getMonth() !== 0){
                              return "middle";
                          } else {
                              return "start";
                          }
                      })
                      .attr("dy", "10px")
                      .attr("transform", function(d) {
                          if(d.getMonth() !== 0){
                              return "translate(" + xtickdist/2 + ", 0)";
                          }
                      })
                      .style("font-weight", function(d) {
                          if(d.getMonth() === 0){
                              return "bold";
                          }
                      });

              var y_axis = chart.append("g") // Draw axes: y axis
                  .attr("id","yaxis"+indexval)
                  .attr("class", "axis y")
                  .attr("transform","translate(" + config.margin.left + ",0)")
                  .call(yAxis)
                      .selectAll("text")
                      .attr("transform","translate(0, " + ytickdist/2 + ")")
                      .style("text-anchor", "middle")
                      .text(function(d) {
                          if(d == "0"){
                              return null;
                          } else {
                              return d;
                          }
                      });
              var yTick = (height - config.margin.top - config.margin.bottom)/yticks;
              console.log(yTick);
              d3.select("#yaxis"+indexval)
                  .append("text")
                  .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
                  .attr("y", -config.margin.left/2)
                  .attr("transform", "rotate(-90)")
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text("Rating");

              d3.select("#xaxis"+indexval)
                  .append("text")
                  .attr("y", 50)
                  .attr("x", (0.5 * width))
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text("Submission Date");

              var bars = chart.selectAll("rect") // Create Bars
                  .data(layers)
                  .enter()
                  .append("rect")
                      .attr("x",function(d){
                          return xScale(d.x);
                      })
                      .attr("y", function(d) {
                          return yScale(d.y0 + d.y);
                      })
                      .attr("width", config.barWidth)
                      .attr("height", function(d) {
                          return yScale(d.y0) - yScale(d.y + d.y0);
                      })
                      .attr("date", function(d) {
                          return d.x;
                      })
                      .attr("rating", function(d){
                          return d.y;
                      })
                      .style("fill", function(d) {
                          if(d.y == 3) {
                              return "#f78c00";
                          } else if (d.y == "1" | d.y == "2") {
                              return "#b30000";
                          } else if (d.y == "4" | d.y == "5") {
                              return "#007844";
                          } else {
                              return "#000";
                          }
                      });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    drawMe();
    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
//=============================================
//***************
//***********
//*****

/***
 *    ██████╗ ██╗   ██╗██╗     ██╗     ███████╗████████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║   ██║██║     ██║     ██╔════╝╚══██╔══╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║   ██║██║     ██║     █████╗     ██║       ██║     ███████║███████║██████╔╝   ██║
 *    ██╔══██╗██║   ██║██║     ██║     ██╔══╝     ██║       ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██████╔╝╚██████╔╝███████╗███████╗███████╗   ██║       ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝        ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a bullet chart.
 */

PARTICLE.directive('bulletChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: true,
        //our data source would be an array
        //passed thru chart-data attribute
      scope: {
        member: '=',
        target: "=",
        rangestart: "=",
        rangeend: "=",
        current: "=",
        colors: "=",
        ratio: "=",
        delay: "=",
        alttext:"="
      },
        link: function (scope, element, attrs) {
          //in D3, any selection[0] contains the group
          //selection[0][0] is the DOM node
          //but we won't need that this time
          //a little of magic: setting it's width based
          //on the data value (d)
          //and text all with a smooth transition

          //---------------------------------------

          //console.log(attrs)
          //console.log(scope.member.graph);
          var drawn = 0;
          var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
          var drawDelay = 250;
          width = element.parent().innerWidth() * 0.98;
          height = element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
          if (width<150) width = 205;
          if (height <= width ){  height = width;}
          height = width;

          // var unregister = scope.$watch(
          // function() { return element.parent().parent().parent().is(":visible"); },
          // function() {
          //   $timeout(function() {
          //
          //               if (element.parent().height()) {
          //                 //width = 300;//.6*element.parent().innerWidth(),
          //                 //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
          //
          //                 if(drawn===0){drawMe(width,height);drawn=1;
          //                 }
          //               }
          //           }, 0);
          //
          //
          // });

   $timeout(function() {
       if (element.parent().height()) {
         if(drawn===0){drawMe(width,height);drawn=1;
         }
       }
   }, 5000 + scope.delay * drawDelay );

        scope.rangestart = scope.rangestart || 0;


        var plainTextFromHTML =  function(text) {
          return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };


        var drawMe = function(width,height) {

          if (scope.rangestart < scope.rangeend) {
            if(scope.current > scope.rangeend) {
              scope.current = scope.rangeend;
            }
          } else {
            if(scope.current < scope.rangeend) {
              scope.current = scope.rangeend;
            }
          }

          var w = width,
              h = height,
              ah = h / scope.ratio;

          var margins = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            texmargin:15
          },
          legendPanel = {
            width: 0
          },

          dataset = [
          {
            name: 'x',
            data: [{
              month: 'x',
              count: scope.rangeend,
              start:50
            }]
          },
          {
            name: 'y',
            data: [{
              month: 'y',
              count: scope.current,
              start:0
            }]
          },
          // {
 //            name: 'z',
 //            data: [{
 //              month: 'z',
 //              count: scope.rangeend * .6,
 //              start:22
 //            }]
 //          }
          ],
          series = dataset.map(function (d) {
            return d.name;
          });
          dataset = dataset.map(function (d) {
            return d.data.map(function (o, i) {
              // Structure it so that your numeric
              // axis (the stacked amount) is y
              return {
                y: o.count,
                x: o.month,
                s: o.start
              };
            });
          });
          stack = d3.layout.stack();

          stack(dataset);

          dataset = dataset.map(function (group) {
            return group.map(function (d) {
              // Invert the x and y values, and y0 becomes x0
              console.log("dataset.map",d);
              return {
                x: d.y,
                y: d.x,
                x0: d.y0,
                start:d.s
              };
            });
          });


          //console.log("scope.target",scope.target,"scope.rangestart",scope.rangestart,"scope.rangeend",scope.rangeend)
            var svg = d3.select(element[0])
              .append('svg')
              .attr("viewBox", "0 0 " + w + " " + ah + "")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .append('g')
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
              .attr('alt',plainTextFromHTML(scope.alttext)),
            xMax = d3.max(dataset, function (group) {
              return d3.max(group, function (d) {
                return d.x + d.x0;
              });
            });

           console.log("[scope.rangestart, width*.9]",[scope.rangestart, width * 0.9]);

            var xScale = d3.scale.linear()
              .domain([scope.rangestart, scope.rangeend])
              .range([scope.rangestart, width * 0.9]);

            var xScaleRev = d3.scale.linear()
              .domain([scope.rangeend, scope.rangestart])
              .range([scope.rangestart, width * 0.9]);

            var months = dataset[0].map(function (d) {
              return d.y;
            }),
            yScale = d3.scale.ordinal()
              .domain(months)
              .rangeRoundBands([0, height], 0.5);

            var xAxis = d3.svg.axis()
              .scale(xScale)
              .ticks(7)
              .innerTickSize(-ah);

            var xAxisRev = d3.svg.axis()
              .scale(xScaleRev)
              .ticks(7)
              .innerTickSize(-ah),

            //var colours = d3.scale.category10()

            groups = svg.selectAll('g')
              .data(dataset)
              .enter()
              .append('g')
              .attr('class', function (d, i) {
                return  "bg-" + scope.colors[i];
              }),

            rects = groups.selectAll()
              .data(function (d) {
                return d;
              })
              .enter()
              .append('rect')
              .attr('x', 1.5*margins.texmargin)
              .attr('y', 2 *margins.texmargin)
              .attr('height', ah - 2 * margins.texmargin)
              .attr('width', function (d) {
                return xScale(d.x);
              }),

            triangles = groups.selectAll('rect');


            console.log("scope.rangeend = " + scope.rangeend +" - scope.target = "+ scope.target ,Math.abs(scope.rangeend - scope.target));
            var successBarWidth = 3;
            if (scope.rangeend != scope.target) {
              successBarWidth = Math.abs(xScale(scope.target) - xScale(scope.rangeend));
            } {
              //successBarWidth = Math.abs(xScale(scope.target) - xScale(scope.rangeend))
              //scope.target = scope.target * .97
              Math.abs(xScale(scope.target) - xScale(scope.target * 0.97));
            }



            var bar = svg.append('g');
            bar.append('rect')
            .attr('width', successBarWidth )
            .attr('height', ah)
            .attr('x', xScale(scope.target) + 1.5*margins.texmargin)
            .attr('y', 0)
            .attr('id',"MU MU ZIPO ZIPO")
            .attr('class',"bg-lillypad-0-fade-6");

            // .each(function(d) {
            //   var lb = xScale(d.x) - 5,
            //       mb = xScale(d.x),
            //       rb = xScale(d.x) + 5,
            //       pointsTop = lb + ",0 " + rb + ",0 " + mb + ",10",
            //       pointsBot = lb + "," + ah + " " + rb + "," + ah + " " + mb + "," + (ah - 10),
            //       old_rect = this.outerHTML,
            //       new_rect = '<g>' + old_rect + '<polygon points="' + pointsTop + '"/><polygon points="' + pointsBot + '"/><line x1="' + xScale(d.x) + '" y1="0" x2="' + xScale(d.x) + '" y2="' + ah + '"/></g>';
            //   $(this).parent().html(new_rect);
            //   return;
            // });
            //

          svg.append('g')
            .attr('class', 'axis color-white')
            .call(xAxis);

          svg.selectAll(".axis line")
            .attr("transform", function(d) {
               return "translate("+ 1.5 * margins.texmargin +"," + (ah+1.75*margins.texmargin) + ")";
           });

          svg.selectAll(".axis text")
            .attr("transform", function(d) {
               return "translate(" + 1.5 * margins.texmargin + "," + margins.texmargin/2 + ")rotate(0)";
           });

        };
      }
     };
     return directiveDefinitionObject;
  });

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
PARTICLE.directive('contentBlock', function ($parse, $window, $timeout,dataIo,CONFIG,$sce) {

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
  template: '<ng-include src="getTemplateUrl()"/>',

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
    index:"=",
    obj:"=",
    type:"="
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
    link: function (scope, element, attrs) {

      scope.loaded = null;
      scope.error = null;
      scope.CONFIG = CONFIG;
      var singleType = scope.type;
      var idlocation = "_id";

      if (scope.obj._id) {
        idlocation = "_id";
      } else {
        idlocation = "$oid";
      }

      scope.getTemplateUrl = function() {
        if (singleType.charAt(singleType.length - 1) == 's') {  singleType= singleType.substr(0, singleType.length - 1); }
        scope.singleType = singleType;
        return CONFIG.viewPath+singleType+".html";
      }

      dataIo.getFile({
        file:CONFIG.contentPath + scope.type+"/"+scope.obj[idlocation]+CONFIG.contentFileSuffix
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
          //scope.content = dataIo.parseContent(_data.data);
          scope.content = dataIo.parseContent(_data.data[Object.keys(_data.data)[0]]);
          scope.loaded = true;
        }, 500);

      }).catch(function (_data) {
        console.log("Error in DIRECTIVE:contentBlock")
        scope.error = _data;
      });

    } //--END link: function

  }; //--END directiveDefinitionObject


  return directiveDefinitionObject;


});
/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a donut chart.
 */

PARTICLE.directive('donutChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var dataset = [100, 90, 80, 70, 60, 50];
                var radius = Math.min(width, height) / 2;

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");
                var color = d3.scale.ordinal()
                    .range(["#009DD9", "#FF8300", "#B21DAC", "#D70036", "#707276", "#000000"]);
                var pie = d3.layout.pie()
                    .sort(null);
                var arc = d3.svg.arc()
                    .innerRadius(( width / 2 ) - ( width / 4 ))
                    .outerRadius(( width / 2 ));
                var path = svg.selectAll("path")
                    .data(pie(dataset))
                    .enter().append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", arc)
                    .attr('class', function (d, i) {
                        return 'fill-color-' + i;
                    })
                    .each(function (d) {
                        this._current = d;
                    }); // store the initial values
                function change(newdata) {
                    path = path.data(pie(newdata)); // update the data
                    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
                }

                // Store the displayed angles in _current.
                // Then, interpolate from _current to the new angles.
                // During the transition, _current is updated in-place by d3.interpolate.
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function (t) {
                        return arc(i(t));
                    };
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ███████╗██╗██╗     ██╗          ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔════╝██║██║     ██║         ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    █████╗  ██║██║     ██║         ██║     ███████║███████║██████╔╝   ██║
 *    ██╔══╝  ██║██║     ██║         ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a fill chart.
 */

PARTICLE.directive('fillChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {
            data: '=chartData',
            whoamiin: '=whoamiin',
            member: '=member',
            elementid: "=elementid"
        },
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member.graph);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 ),
                    el = scope.elementid;

                d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2.05 ) + " " + ( th * 2.05 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("id", el);

                var gauge2 = loadLiquidFillGauge(el, 70);
                var config2 = liquidFillGaugeDefaultSettings();

                function NewValue() {
                    if (Math.random() > 0.5) {
                        return Math.round(Math.random() * 100);
                    } else {
                        return (Math.random() * 100).toFixed(1);
                    }
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██╗████████╗███████╗███╗   ███╗    ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
 *    ██║╚══██╔══╝██╔════╝████╗ ████║    ██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
 *    ██║   ██║   █████╗  ██╔████╔██║    ██████╔╝██║     ██║   ██║██║     █████╔╝
 *    ██║   ██║   ██╔══╝  ██║╚██╔╝██║    ██╔══██╗██║     ██║   ██║██║     ██╔═██╗
 *    ██║   ██║   ███████╗██║ ╚═╝ ██║    ██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
 *    ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a structural component of the page, based on information
 *    in the UI object returned by the data source.
 */

PARTICLE.directive('itemBlock', function ($compile, $rootScope, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '=',
        },
        templateUrl: "/directives/iblock.html",
        link: function (scope, element, attrs) {

            scope.$watch(attrs.member, function () {
                //check new value to be what you expect.
                if (scope.member !== undefined) {
                    console.log("WATCH Fired", scope.member);
                }

            });

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
            if (!scope.member) {
                // console.log("NOT DEFINED");
            } else if (angular.isArray(scope.member.widgets)) {
                $compile(collectionSt)(scope, function (cloned, scope) {
                    element.append(cloned);
                });
            }
        },
        controller: function ($scope) {

            if ($scope.member !== undefined) {
                var initial_state = $scope.member.toggle;
                $scope.member.toggle = 1;

                $timeout(function () {
                    $scope.member.toggle = initial_state;
                }, 100);
            }


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

/***
* ███╗   ███╗██╗   ██╗██╗  ████████╗██╗██████╗ ██╗     ███████╗    ████████╗██╗███╗   ███╗███████╗██╗     ██╗███╗   ██╗███████╗
* ████╗ ████║██║   ██║██║  ╚══██╔══╝██║██╔══██╗██║     ██╔════╝    ╚══██╔══╝██║████╗ ████║██╔════╝██║     ██║████╗  ██║██╔════╝
* ██╔████╔██║██║   ██║██║     ██║   ██║██████╔╝██║     █████╗         ██║   ██║██╔████╔██║█████╗  ██║     ██║██╔██╗ ██║█████╗
* ██║╚██╔╝██║██║   ██║██║     ██║   ██║██╔═══╝ ██║     ██╔══╝         ██║   ██║██║╚██╔╝██║██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
* ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║██║     ███████╗███████╗       ██║   ██║██║ ╚═╝ ██║███████╗███████╗██║██║ ╚████║███████╗
* ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝╚═╝     ╚══════╝╚══════╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a trend chart.
*/

PARTICLE.directive('multipleTimeline', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },

    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe(scope.index);
                drawn=1;
            }
        }
    },
    1);

    var drawMe = function(index) {
        var width, height, dataset, layers, chart;

        /***
        *    DEFAULT
        *          _                          _              _    _    _
        *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
        *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
        *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
        *                                                                     |___|
        *
        *
        *        chartInset  :: istance from the edge of the drawn SVG
        *        margin      :: standard top, right...... in pixels - no being used at moment....
        *        barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
        *        successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
        *                                      :: set to 0 to make it go to the very end of the chart
        *
        ***/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 80,
                  bottom: 40,
                  left: 90
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 400, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

          var color = d3.scale.category10();
          color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          // Define X Scale
          var xScale = d3.time.scale()
              .domain([new Date(2015, 05, 31), new Date(2016, 07, 01)]) //d3.extent(dataset, function(d) { return d.date; })
              .range([0 + config.margin.left, width - config.margin.right]);

          // Define Y Scale
          var fields = ["replan", "correction", "rebaseline"];
          var yScale = d3.scale.ordinal()
              .domain(fields)
              .rangePoints([height-config.margin.bottom, config.margin.top]);

          var xticks = dataset.length;

          chart = el.append("svg")
              .attr("viewBox", "0 0 " + width + " " + height + "")
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("height",height)
              .attr("width",width);

          /*chart = el.append("svg")
              .attr("viewBox", "0 0 " + width + " " + height + "")
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("class", "chart")
              .append('g')
              .attr("height",height)
              .attr("width",width);*/

          var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .innerTickSize(-height + config.margin.top + config.margin.bottom)
              .outerTickSize(0)
              .tickPadding(20);

          var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(fields.length)
              .innerTickSize(-width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .tickPadding(20);

          var x_axis = chart.append("g") // Draw axes: x axis
              .attr("id","xaxis")
              .attr("class", "color-white-0")
              .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
              .call(xAxis)
                  .selectAll("text")
                  .style("text-anchor", "middle")
                  .attr("dy", "10px")
                  .style("font-weight", function(d) {
                      if(d.getMonth() === 0){
                          return "bold";
                      }
                  });

          var y_axis = chart.append("g") // Draw axes: y axis
              .attr("id","yaxis")
              .attr("class", "color-white-0")
              .attr("transform","translate(" + config.margin.left + ",0)")
              .call(yAxis)
                  .selectAll("text")
                  .style("text-anchor", "end")
                  .text(function(d) {
                      return d.charAt(0).toUpperCase() + d.slice(1);
                  });

          var point = chart.append("g")
                .attr("class", "line-point");

          point.selectAll('circle')
              .data(dataset)
              .enter()
              .append('circle')
                .attr("cx", function(d) { return xScale(d.date); })
                .attr("cy", function(d) { return yScale(d.type); })
                .attr("r", 10)
                .attr("class", "color-white-0-fade-5")
                .style("stroke", function(d) { return color(d.type); })
                .style("stroke-width", "4px");

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
 *    ███╗   ██╗███████╗███████╗██████╗ ██╗     ███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ████╗  ██║██╔════╝██╔════╝██╔══██╗██║     ██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██╔██╗ ██║█████╗  █████╗  ██║  ██║██║     █████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██║╚██╗██║██╔══╝  ██╔══╝  ██║  ██║██║     ██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║ ╚████║███████╗███████╗██████╔╝███████╗███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═════╝ ╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a needle chart.
 */

PARTICLE.directive('needleChart', function ($parse,$window,$timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets
  */

  var directiveDefinitionObject = {

    //Restrict use to an element
    restrict: 'E',
    //Do NOT overwrite our directive declaration in the HTML mark-up
    replace: false,
    //Chart data and config passed thru attributes
    scope: {
      config: '=',
      datasets: "=",
      colors: "=",
      percentcomplete: "=",
      successpercent: "=",
      max:"=",
      min:"=",
      mockup:"=",
      alttext:"="
    },
    link: function (scope, element, attrs) {

      var drawn = 0;

      $timeout(function() {
        if (element.parent().height()) {
          if(drawn===0){
            drawMe();
            drawn=1;
          }
        }
      }, 100);


      var plainTextFromHTML =  function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
      };

      var drawMe = function() {

      var chart, degToRad, repaintGauge, success_per,
      height, margin, numSections, padRad, percToDeg, percToRad,
      percent, radius, sectionIndx, svg, totalPercent, width;


      //Set the percent for the CURRENT bale
      padRad = 0.025;

    /***
     *    DEFAULT
     *          _                          _              _    _    _
     *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
     *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
     *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
     *                                                                     |___|
     *

              chartInset  :: istance from the edge of the drawn SVG
              margin      :: standard top, right...... in pixels - no being used at moment....
              barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
              successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                            :: set to 0 to make it go to the very end of the chart

      **********************************************/
      var config = {
        chartInset:20,
        hasSuccessIndicator:true,
        hasBandIndicator:false,
        margin: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 20
        },
        barWidth:100,
        widthPercentSize:1.1,
        successIndicatorDegWidth:0,
        startAngle:-110,
        endAngle:110,
        needLength:1,
        colors: {
          primary_fill: "color-pewter",
          color_2: "boldorange-0-fade-1",
          success: "color-bluepuddy-0-fade-5",
          needle: "color-pewter-0-fade-0",
          bg: "color-white-6-fade-8",
          legend:"color-bluepuddy-8-fade-0"
        },
        labelFormat          : d3.format(',g'),
        max:100,
        min:0,
        units:"%"
      };

    /***
     *
     *                                     _  _             _       ___            _  _
     *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
     *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
     *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
     *
     */
      if (scope.config !== undefined){
        Object.keys(scope.config).forEach(function(key,index) {
             config[key] = scope.config[key];
        });
      }

      /***
       *
       *          _    _  _  _  _                       _    _           _
       *     _ _ | |_ |_|| ||_|| |_  _ _    _____  ___ | |_ | |_  ___  _| | ___
       *    | | ||  _|| || || ||  _|| | |  |     || -_||  _||   || . || . ||_ -|
       *    |___||_|  |_||_||_||_|  |_  |  |_|_|_||___||_|  |_|_||___||___||___|
       *                            |___|
       *
      **********************************************/
      percToDeg = function(perc) {
        //return perc * 360;
        return 360 - (totalAngle * perc + config.startAngle);
      };

      percToRad = function(perc) {
        return degToRad(percToDeg(perc));
      };

      degToRad = function(deg) {
        return deg * Math.PI / 180;
      };


      /***
       *
       *                 _                                         _
       *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
       *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
       *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
       *                          |_|
       */

      /***
       *
       *     ___
       *    |_  |
       *     _| |_  _
       *    |_____||_|   Select the directive element to push our SVG into:
       *
       */
      el = d3.select(element[0]);


      /***
       *
       *     ___
       *    |_  |
       *    |  _| _
       *    |___||_|    Calculate the width of the width, height and radius of the chart
       *
       */
      width = element.innerWidth();
      radius =width * 0.5 ;
			height = (radius + Math.sin(degToRad(config.endAngle-90))*radius) ;
      /***
       *
       *     ___
       *    |_  |
       *    |_  | _
       *    |___||_|    Create the primary SVG element,
       *                Set the preserveAspectRatio so it scales as the screen size changes
       *
       */
      console.log("config.widthPercentSize",config.widthPercentSize);
      svg = el.append('svg')
            .attr("viewBox", "0 0 " + ( width * config.widthPercentSize ) + " " + ( height * config.widthPercentSize ) + "")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g").attr('transform', "translate(" + ( config.widthPercentSize  * (width)/2 ) + ", " + config.widthPercentSize * (width/2) + ")")
            .attr('width', width).attr('height', height)
            .attr('alt',plainTextFromHTML(scope.alttext));

      /***
       *
       *     ___
       *    | | |
       *    |_  | _
       *      |_||_|    Add layer for the gauge itself
       *                Also add the paths for the three archs
       *                NOTE: the additional identifying classes such as primary_band, bg_band and success_band
       *                Which are used to identify and select them later
       *
       */
      chart = svg.append('g');
      chart.append('path').attr('class', "arc " + config.colors.primary_fill + " primary_band" );
      chart.append('path').attr('class', "arc " + config.colors.success  + " success_band");
      chart.append('path').attr('class', "arc " + config.colors.bg  + " bg_band");

      function centerTranslation() {
        return 'translate('+radius/2 +','+ radius/2 +')';
      }
      var centerTx = centerTranslation();

      var scale = d3.scale.linear().range([0,1]).domain([config.min, config.max]);

  var range = config.endAngle - config.startAngle;
  var ticks = scale.ticks(9);

  var lg = svg.append('g').attr('class', 'color-white').attr('transform' , 'translate(0,0)');

      lg.selectAll('text')
      .data(ticks)
      .enter().append('text')
      .attr('transform', function(d) {

        var ratio = scale(d);
        var newAngle = degToRad(config.startAngle + (ratio * range));
        newAngle = degToRad(180 - (range * ratio + config.startAngle));

        var turnAngle = range * ratio;
        console.log(turnAngle,",turnAngle");

        var xpos = Math.sin(newAngle) * (radius + config.chartInset) ;//- ( Math.sin(newAngle) * config.chartInset);
        var ypos = Math.cos(newAngle) * (radius + config.chartInset);

        console.log("xpos,ypos", xpos, ypos);
        console.log("radius",radius);
        return 'rotate(' + 0 +') translate('+ (xpos -10) + "," + (ypos +5) +')';
        //return 'rotate(' + turnAngle +') translate('+ (-100) + "," + 100 +')';

      })
      .text(config.labelFormat);


      /***
       *
       *     ___
       *    |  _|
       *    |_  | _
       *    |___||_|    set the inner and outer radius of the arts, they are all the same at the moment.
       *
       */
      var arc_Background = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(radius - config.chartInset - config.barWidth);
      var arc_Progress = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(radius - config.chartInset - config.barWidth);
      var arc_Success = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(0);

      /***
       *
       *     ___
       *    |  _|
       *    | . | _
       *    |___||_|    set the values for percent complete and the success point on the gauge.
       *                uses 25% if it undefined for mocking up interface
       *                uses 85% for default success unless
       *
       */

      if (config.max != 100 || config.min !== 0) {
        var gaugeRange;
        if (config.max > config.min) {
          gaugeRange = Math.abs(config.max - config.min);
          success_per = (scope.successpercent - config.min)/gaugeRange;
        } else {
          gaugeRange = Math.abs(config.min - config.max);
          success_per = (config.min-scope.successpercent)/gaugeRange;
        }
        percent =  scope.percentcomplete/100;

      } else {
        percent = scope.percentcomplete/100 ;
        if ( scope.successpercent == 100 ) {
          success_per = 0.99;
        } else {
          success_per = scope.successpercent/100;
        }
        percent = scope.percentcomplete/100;
      }

      if (percent > 1) { percent = 1; }


      /***
       *
       *     ___
       *    |_  |
       *      | | _
       *      |_||_|    Calulate the start and end Rads along with the total degress of the gauge
       *
       */
      var startAngleRad = degToRad(config.startAngle);
      var endAngleRad = degToRad(config.endAngle);
      var totalAngle = config.endAngle - config.startAngle;

     // percent = .75

      var perAngle = (totalAngle * percent + config.startAngle);
      var successAngle = (totalAngle * success_per + config.startAngle);

      var successAngleEnd;
      if (config.successIndicatorDegWidth !== undefined && config.successIndicatorDegWidth > 0) {
        successAngleEnd = (totalAngle * success_per + config.startAngle + config.successIndicatorDegWidth);
      } else {
        successAngleEnd = config.endAngle;
      }


      arc_Background.startAngle(degToRad(config.startAngle)).endAngle(endAngleRad);
      chart.select(".bg_band").attr('d', arc_Background);

      if (config.hasSuccessIndicator) {
        arc_Success.startAngle(degToRad(successAngle)).endAngle(degToRad(successAngleEnd));
        chart.select(".success_band").attr('d', arc_Success);
      }

      if (config.hasBandIndicator) {
        arc_Progress.startAngle(startAngleRad).endAngle(degToRad(perAngle));
        chart.select(".primary_band").attr('d', arc_Progress);
      }

      repaintGauge = function (perc)
      {

        //console.log("repaintGauge perc",perc)
        // //console.log("repaintGauge",perc)
 //        var next_start = totalPercent;
 //
 //        arcStartRad = percToRad(next_start);
 //        arcEndRad = arcStartRad + percToRad(perc / 2);
 //        next_start += perc / 2;
 //
 //
 //        arc_Progress.startAngle(arcStartRad).endAngle(arcEndRad);
 //
 //        arcStartRad = percToRad(next_start);
 //        arcEndRad = arcStartRad + percToRad((1 - perc) / 2);
 //
 //        arc_Background.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
 //
 //
 //
 //
 //        chart.select(".primary_band").attr('d', arc_Progress);
 //        chart.select(".bg_band").attr('d', arc_Background);
 //

      };

      var needle;


      var Needle = (function() {

        /**
          * Helper function that returns the `d` value
          * for moving the needle
        **/
        var recalcPointerPos = function(perc) {
          var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
          thetaRad = degToRad(360 - (totalAngle * perc + config.startAngle));
          //thetaRad = percToDeg()
          centerX = 0;
          centerY = 0;
          //console.log(Math.sin(Math.abs(startAngleRad)),"COS of startAngleRad" , startAngleRad)
          topX = centerX - this.len * Math.sin(thetaRad);
          topY = centerY - this.len * Math.cos(thetaRad);
          leftX = centerX - this.radius * Math.sin(thetaRad - Math.PI / 2);
          leftY = centerY - this.radius * Math.cos(thetaRad - Math.PI / 2);
          rightX = centerX - this.radius * Math.sin(thetaRad + Math.PI / 2);
          rightY = centerY - this.radius * Math.cos(thetaRad + Math.PI / 2);
          return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
        };

        function Needle(el) {
          this.el = el;
          this.len = radius * config.needLength - config.barWidth * 0.5 ;
          this.radius = this.len * 0.2;
        }

        Needle.prototype.render = function() {
          this.el.append('circle').attr('class', 'needle-center ' + config.colors.needle).attr('cx', 0).attr('cy', 0).attr('r', this.radius);
          return this.el.append('path').attr('class', 'needle ' + config.colors.needle).attr('d', recalcPointerPos.call(this, 0));
        };

        Needle.prototype.moveTo = function(perc) {
          var self,
              oldValue = this.perc || 0;
              this.perc = perc;
              self = this;

          // Reset pointer position
          this.el.transition().delay(100).ease('quad').duration(500).select('.needle').tween('reset-progress', function() {
            return function(percentOfPercent) {
              var progress = (1 - percentOfPercent) * oldValue;
              repaintGauge(progress);
              return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
            };
          });

          this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function() {
            return function(percentOfPercent) {
              var progress = percentOfPercent * perc;

              repaintGauge(progress);
              return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
            };
          });

        };



          return Needle;

      })();

      needle = new Needle(chart);
      needle.render();

      console.log("Org Percent",percent);
      needle.moveTo(percent);


      };
    }
  };
  return directiveDefinitionObject;
});
/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *    ██╗      █████╗ ██████╗ ███████╗██╗
 *    ██║     ██╔══██╗██╔══██╗██╔════╝██║
 *    ██║     ███████║██████╔╝█████╗  ██║
 *    ██║     ██╔══██║██╔══██╗██╔══╝  ██║
 *    ███████╗██║  ██║██████╔╝███████╗███████╗
 *    ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders the labels for a pie chart.
 */

PARTICLE.directive('pieChartLabel', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member.graph);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 ),
                    radius = Math.min(width, height) / 2;

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( w ) + " " + ( h ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g");

                svg.append("g")
                    .attr("class", "slices");
                svg.append("g")
                    .attr("class", "labels");
                svg.append("g")
                    .attr("class", "lines");

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.value;
                    });

                var arc = d3.svg.arc()
                    .outerRadius(radius * 0.8)
                    .innerRadius(radius * 0.4);

                var outerArc = d3.svg.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9);

                svg.attr("transform", "translate(" + w + "," + th + ")");

                var key = function (d) {
                    return d.data.label;
                };

                var color = d3.scale.ordinal()
                    .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                function randomData() {
                    var labels = color.domain();
                    return labels.map(function (label) {
                        return {label: label, value: Math.random()};
                    });
                }

                change(randomData());

                d3.select(".randomize")
                    .on("click", function () {
                        change(randomData());
                    });


                function change(data) {

                    /* ------- PIE SLICES -------*/
                    var slice = svg.select(".slices").selectAll("path.slice")
                        .data(pie(data), key);

                    slice.enter()
                        .insert("path")
                        .attr('class', function (d, i) {
                            return 'slice fill-color-' + i;
                        });

                    slice
                        .transition().duration(1000)
                        .attrTween("d", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                return arc(interpolate(t));
                            };
                        });

                    slice.exit()
                        .remove();

                    /* ------- TEXT LABELS -------*/

                    var text = svg.select(".labels").selectAll("text")
                        .data(pie(data), key);

                    text.enter()
                        .append("text")
                        .attr("dy", ".35em")
                        .text(function (d) {
                            return d.data.label;
                        });

                    function midAngle(d) {
                        return d.startAngle + (d.endAngle - d.startAngle) / 2;
                    }

                    text.transition().duration(1000)
                        .attrTween("transform", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                var pos = outerArc.centroid(d2);
                                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                                return "translate(" + pos + ")";
                            };
                        })
                        .styleTween("text-anchor", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                return midAngle(d2) < Math.PI ? "start" : "end";
                            };
                        });

                    text.exit()
                        .remove();

                    /* ------- SLICE TO TEXT POLYLINES -------*/

                    var polyline = svg.select(".lines").selectAll("polyline")
                        .data(pie(data), key);

                    polyline.enter()
                        .append("polyline");

                    polyline.transition().duration(1000)
                        .attrTween("points", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                var pos = outerArc.centroid(d2);
                                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                                return [arc.centroid(d2), outerArc.centroid(d2), pos];
                            };
                        });

                    polyline.exit()
                        .remove();
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a pie chart.
 */

PARTICLE.directive('pieChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var dataset = [100, 90, 80, 70, 60, 50];
                var radius = Math.min(width, height) / 2;

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");
                var color = d3.scale.ordinal()
                    .range(["#009DD9", "#FF8300", "#B21DAC", "#D70036", "#707276", "#000000"]);
                var pie = d3.layout.pie()
                    .sort(null);
                var arc = d3.svg.arc()
                    .innerRadius(( width / 2 ) - ( width / 4 ))
                    .outerRadius(( width / 2 ));
                var path = svg.selectAll("path")
                    .data(pie(dataset))
                    .enter().append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", arc)
                    .attr('class', function (d, i) {
                        return 'fill-color-' + i;
                    })
                    .each(function (d) {
                        this._current = d;
                    }); // store the initial values
                function change(newdata) {
                    path = path.data(pie(newdata)); // update the data
                    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
                }

                // Store the displayed angles in _current.
                // Then, interpolate from _current to the new angles.
                // During the transition, _current is updated in-place by d3.interpolate.
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function (t) {
                        return arc(i(t));
                    };
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██████╗ ██████╗  ██████╗  ██████╗ ██████╗ ███████╗███████╗███████╗
 *    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔════╝██╔════╝██╔════╝
 *    ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝█████╗  ███████╗███████╗
 *    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══╝  ╚════██║╚════██║
 *    ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║███████╗███████║███████║
 *    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 *    ███╗   ███╗███████╗████████╗███████╗██████╗
 *    ████╗ ████║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
 *    ██╔████╔██║█████╗     ██║   █████╗  ██████╔╝
 *    ██║╚██╔╝██║██╔══╝     ██║   ██╔══╝  ██╔══██╗
 *    ██║ ╚═╝ ██║███████╗   ██║   ███████╗██║  ██║
 *    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a progress meter chart.
 */

PARTICLE.directive('progressMeter', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {
            colors: '=',
            datasets: "="
        },
        link: function (scope, element, attrs) {

            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });
					    /***
					     *    DEFAULT
					     *          _                          _              _    _    _
					     *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
					     *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
					     *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
					     *                                                                     |___|
					     *

					              chartInset  :: istance from the edge of the drawn SVG
					              margin      :: standard top, right...... in pixels - no being used at moment....
					              barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
					              successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
					                                            :: set to 0 to make it go to the very end of the chart

					      **********************************************/
					      var config = {
					        chartInset:0,
					        hasSuccessIndicator:true,
					        hasBandIndicator:false,
					        margin: {
					          top: 0,
					          right: 0,
					          bottom: 0,
					          left: 0
					        },
					        barWidth:0.20,
					        successIndicatorDegWidth:0,
					        startAngle:-110,
					        endAngle:110,
					        needLength:1,
					        colors: {
					          primary_fill: "color-pewter",
					          color_2: "boldorange-0-fade-1",
					          success: "color-bluepuddy-0-fade-5",
					          needle: "color-bluepuddy-0-fade-0",
					          bg: "color-white-6-fade-8",
					          legend:"color-bluepuddy-8-fade-0"
					        }
					      };

            var drawMe = function () {
                var twoPi = 2 * Math.PI;

                var dataset = {
                    progress: Math.floor(Math.random() * 100),
                    total: 100
                };


                var dataset2 = {
                    progress: Math.floor(Math.random() * 100),
                    total: 100
                };
                var i, bits = 3;
                var dataSets = [], archs = [],
                    bandWidth = ((width - dataSets.length * 2) * 0.25) / dataSets.length;

                for (i = 0; i < bits; i++) {
                    dataSets.push({progress: Math.floor(Math.random() * 100), total: 100});
                }

                var arcs = [];


                var arc = d3.svg.arc()
                    .innerRadius(width * 0.25 - width / (2 * dataSets.length) / 2)
                    .outerRadius(width * 0.50)
                    .startAngle(0);

                var arc2 = d3.svg.arc()
                    .innerRadius(width * 0.29)
                    .outerRadius(width * 0.395)
                    .startAngle(0);

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin slice")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");


                var meter = svg.append("g")
                    .attr("class", "info");

                var background = meter.append("path")
                    .datum({endAngle: twoPi})
                    .attr("class", config.colors.bg)
                    .attr("d", arc);


                var text = meter.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    .attr("font-size", "4em")
                    .attr("font-weight", "300")
                    .text((scope.datasets[0] * 100) + "%");

                var words = meter.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", "3em")
                    .attr("font-size", "1em")
                    .attr("font-weight", "300")
                    .text("Complete");


                var foreground = meter.append("path")
                    .datum({endAngle: 0})
                    .attr("class", "bg-" + (scope.datasets[0] > 0.5  ? config.colors.success : config.colors.needle))
                    .attr("d", arc);
                // var background2 = meter.append("path")
                //          .datum({endAngle: twoPi})
                //          .attr("class", "bg-"+scope.colors.bg)
                //          .attr("d", arc2);
                //
                //      var foreground2 = meter.append("path")
                //          .datum({endAngle:0})
                //          .attr("class", "bg-"+(scope.datasets[1]>scope.colors.min_success[1]?scope.colors.success:scope.colors.color_2))
                //          .attr("d", arc2);
                //
                //          console.log(scope.datasets)

                foreground.transition()
                    .duration(1000)
                    .ease("linear")
                    .attrTween("d", function (d) {
                        var interpolate = d3.interpolate(d.endAngle, twoPi * scope.datasets[0]);
                        return function (t) {
                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });


                // foreground2.transition()
                //         .duration(1000)
                //         .ease("linear")
                //         .attrTween("d", function(d) {
                //                    var interpolate = d3.interpolate(d.endAngle, twoPi *  scope.datasets[1])
                //                    return function(t) {
                //                       d.endAngle = interpolate(t);
                //                       return arc2(d);
                //                    }
                //                 });


            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 *    ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 *    ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 *    ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *    ██╗  ██╗███████╗ █████╗ ██████╗ ███████╗██████╗
 *    ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
 *    ███████║█████╗  ███████║██║  ██║█████╗  ██████╔╝
 *    ██╔══██║██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗
 *    ██║  ██║███████╗██║  ██║██████╔╝███████╗██║  ██║
 *    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a structural component of the page,
 *    based on information in the UI object returned by the data source.
 */

PARTICLE.directive('sectionHeader', function () {
    return {
        restrict: "E",
        scope: {
            item: "="
        },
        templateUrl: "/directives/sectionheader.html"
    };
});

/***
* ██████╗  █████╗ ██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
* ██████╔╝███████║██████╔╝    ██║     ███████║███████║██████╔╝   ██║
* ██╔══██╗██╔══██║██╔══██╗    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
* ██████╔╝██║  ██║██║  ██║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
* ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a bar chart.
*/

PARTICLE.directive('stackedBarchart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {

            if(drawn===0){
                drawMe();
                drawn=1;
            }

    }, 50);

    var drawMe = function() {

        var width, height, dataset, layers, spending, x, y, z, chart, xAxis, yAxis, layer;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 50
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 200;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          spending = ["DME", "OM"];

          // Parse the data
          layers = d3.layout.stack()(spending.map(function(c) {
              return dataset.map(function(d) {
                return {x: d.year, y: d[c]};
            });
          }));

         /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          x = d3.scale.ordinal()
              .rangeRoundBands([config.margin.left, width - config.margin.right], 0.2)
              .domain(layers[0].map(function(d) { return d.x; }));

          y = d3.scale.linear()
              .rangeRound([height - config.margin.bottom, config.margin.top])
              .domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })])
              .nice();

          z = d3.scale.category10();

          /*chart = el.append("svg")
              .attr("height",height)
              .attr("width",width)
              .attr("class", "chart");*/




      chart = d3.select(element[0])
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height + "")
          .attr("preserveAspectRatio", "xMinYMin slice")
          .append('g')
          .attr("height",height)
          .attr("width",width);


          xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .outerTickSize(0);

          yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .innerTickSize(- width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .ticks(5)
              .tickPadding(10);

          layer = chart.selectAll(".layer")
              .data(layers)
            .enter().append("g")
              .attr("class", "layer")
              .style("fill", function(d, i) { return z(i); });

          layer.selectAll("rect")
              .data(function(d) { return d; })
            .enter().append("rect")
              .attr("x", function(d) { return x(d.x); })
              .attr("y", function(d) { return y(d.y + d.y0); })
              .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
              .attr("width", x.rangeBand() - 1);

          var x_axis = chart.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + (height - config.margin.bottom) + ")")
              .attr("class", "color-white-0")
              .call(xAxis);

          var y_axis = chart.append("g")
              .attr("class", "axis axis--y")
              .attr("transform", "translate(" + (config.margin.left) + ",0)")
              .attr("class", "color-white-0")
              .call(yAxis);

          y_axis.selectAll("text")
              .text(function(d){
                  return ("$ " + d + "M");
              });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */


    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
* ████████╗██╗███╗   ███╗███████╗███████╗███████╗██████╗ ██╗███████╗███████╗    ██████╗  █████╗ ██████╗ ██████╗ ██╗      ██████╗ ████████╗
* ╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██║██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗╚══██╔══╝
*    ██║   ██║██╔████╔██║█████╗  ███████╗█████╗  ██████╔╝██║█████╗  ███████╗    ██████╔╝███████║██████╔╝██████╔╝██║     ██║   ██║   ██║
*    ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══╝  ██╔══██╗██║██╔══╝  ╚════██║    ██╔══██╗██╔══██║██╔══██╗██╔═══╝ ██║     ██║   ██║   ██║
*    ██║   ██║██║ ╚═╝ ██║███████╗███████║███████╗██║  ██║██║███████╗███████║    ██████╔╝██║  ██║██║  ██║██║     ███████╗╚██████╔╝   ██║
*    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a timeseries barplot.
*/

PARTICLE.directive('timeseriesBarplot', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {

    var drawn = 0;

    $timeout(function() {
            if(drawn===0){
                drawMe();
                drawn=1;
            }
    }, 1);

    var drawMe = function() {

        var width, height, datasetfull, dataset, layers;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60
              },
              barWidth:20,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0,
              endDate: new Date(),
              startDate: new Date() - 1000*60*60*24*365
          }; // End config

          console.log('timeseries dates', config.endDate, config.startDate);

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          readDate = d3.time.format("%m/%d/%y").parse;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

              // Function below establishes start and end dates for the graph and removes
              // the values that fall outside the range. It also parses data elements in X and Y
              // components that will be used for plotting.

              var startdate = readDate("06/30/15");
              var enddate = readDate("06/30/16");
              var sub = [];
              for(var i = 0; i < dataset.length; i++){
                  if(dataset[i].date >= startdate & dataset[i].date <= enddate){
                      sub.push(d3.values(dataset)[i]);
                  }
                  else {}
              }

              // Parse the data
              layers = sub.map(function(d) {
                  return {x: d.date, y: +d.rating, y0: +0};
              });

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

              // Define X Scale
              xScale = d3.time.scale()
                  .domain([startdate, enddate])
                  .range([0 + config.margin.left, width - config.margin.right]);

              // Define Y Scale
              yScale = d3.scale.linear()
                  .domain([0, 5])
                  .range([height-config.margin.bottom, config.margin.top])
                  .nice();

              var yticks = 5;
              var xticks = 12;
              var ytickdist = (height-config.margin.bottom - config.margin.top)/yticks;
              var xtickdist = (width - config.margin.right - config.margin.left)/xticks;

              var chart = el.append("svg")
                  .attr("viewBox", "0 0 " + width + " " + height + "")
                  .attr("preserveAspectRatio", "xMinYMin slice")
                  .append('g')
                  .attr("height",height)
                  .attr("width",width);

              var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .outerTickSize(0);

              var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(yticks)
                  .innerTickSize(- width + config.margin.left + config.margin.right)
                  .outerTickSize(0)
                  .tickPadding(10);

              var x_axis = chart.append("g") // Draw axes: x axis
                  // .attr("id","xaxis"+indexval)
                  .attr("class", "axis x")
                  .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
                  .call(xAxis)
                      .selectAll("text")
                    .attr("class","color-white")
                      .style("text-anchor", function(d) {
                          if(d.getMonth() !== 0){
                              return "middle";
                          } else {
                              return "start";
                          }
                      })
                      .attr("dy", "10px")
                      .attr("transform", function(d) {
                          if(d.getMonth() !== 0){
                              return "translate(" + xtickdist/2 + ", 0)";
                          }
                      })
                      .style("font-weight", function(d) {
                          if(d.getMonth() === 0){
                              return "bold";
                          }
                      });

              var y_axis = chart.append("g") // Draw axes: y axis
                  // .attr("id","yaxis"+indexval)
                  .attr("class", "axis y")
                  .attr("transform","translate(" + config.margin.left + ",0)")
                  .call(yAxis)
                      .selectAll("text")
                      .attr("class","color-white")
                      .attr("transform","translate(0, " + ytickdist/2 + ")")
                      .style("text-anchor", "middle")
                      .text(function(d) {
                          if(d == "0"){
                              return null;
                          } else {
                              return d;
                          }
                      });
              var yTick = (height - config.margin.top - config.margin.bottom)/yticks;
              y_axis.append("g")
                  .append("text")
                  .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
                  .attr("y", -config.margin.left/2)
                  .attr("transform", "rotate(-90)")
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .attr("class","color-white")
                  .text("Rating");

              x_axis.append("g")
                  .append("text")
                  .attr("y", 50)
                  .attr("x", (0.5 * width))
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .attr("class","color-white")
                  .text("Submission Date");

              var bars = chart.selectAll("rect") // Create Bars
                  .data(layers)
                  .enter()
                  .append("rect")
                      .attr("x",function(d){
                          return xScale(d.x);
                      })
                      .attr("y", function(d) {
                          return yScale(d.y0 + d.y);
                      })
                      .attr("width", config.barWidth)
                      .attr("height", function(d) {
                          return yScale(d.y0) - yScale(d.y + d.y0);
                      })
                      .attr("date", function(d) {
                          return d.x;
                      })
                      .attr("rating", function(d){
                          return d.y;
                      })
                      .attr("class", function(d) {
                          if(d.y == 3) {
                              return "bg-color-offgold-0-fade-4";
                          } else if (d.y == "1" | d.y == "2") {
                              return "bg-color-boldred-0-fade-4";
                          } else if (d.y == "4" | d.y == "5") {
                              return "bg-color-lillypad-0-fade-4";
                          } else {
                              return "#000";
                          }
                      });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          *
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive








/***
* ████████╗██████╗ ███████╗███╗   ██╗██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ╚══██╔══╝██╔══██╗██╔════╝████╗  ██║██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
*    ██║   ██████╔╝█████╗  ██╔██╗ ██║██║  ██║    ██║     ███████║███████║██████╔╝   ██║
*    ██║   ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
*    ██║   ██║  ██║███████╗██║ ╚████║██████╔╝    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
*    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝      ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a trend chart.
*/

PARTICLE.directive('trendChart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },

    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe(scope.index);
                drawn=1;
            }
        }
    }, 5);
    var drawMe = function(indexval) {


        var width, height, dataset, layers;

        /***
        *    DEFAULT
        *          _                          _              _    _    _
        *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
        *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
        *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
        *                                                                     |___|
        *
        *
        *        chartInset  :: istance from the edge of the drawn SVG
        *        margin      :: standard top, right...... in pixels - no being used at moment....
        *        barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
        *        successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
        *                                      :: set to 0 to make it go to the very end of the chart
        *
        ***/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 10,
                  right: 40,
                  bottom: 60,
                  left: 70
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-9",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 400, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

          var color = d3.scale.category10();
          color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date" & key !== "label"; }));

          var metrics = color.domain().map(function(name) {
              return {
                  name: name,
                  values: dataset.map(function(d) {
                      return {date: d.date, value: +d[name]};
                  })
              };
          });

          var xTickValues = [];
          metrics[0].values.forEach(function(d){
              xTickValues.push(d.date);
          });

          var  date_format = d3.time.format("%b %y");

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          // Define X Scale
          xScale = d3.time.scale()
              .domain(d3.extent(dataset, function(d) { return d.date; }))
              .range([0 + config.margin.left, width - config.margin.right]);

          // Define Y Scale
          yScale = d3.scale.linear()
              .domain([0, 100])
              .range([height-config.margin.bottom, config.margin.top]);

          var yticks = 5;
          var xticks = dataset.length;


      var chart = d3.select(element[0])
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height + "")
          .attr("preserveAspectRatio", "xMinYMin slice")
          .append('g')
          .attr("height",height)
          .attr("width",width);

          var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .innerTickSize(-height + config.margin.top + config.margin.bottom)
              .outerTickSize(0)
              .tickPadding(10)
              .tickValues(xTickValues)
              .tickFormat(date_format);

          var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(yticks)
              .innerTickSize(- width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .tickPadding(5);

          var x_axis = chart.append("g") // Draw axes: x axis
              .attr("id","xaxis")
              .attr("class", "color-white")
              .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
              .call(xAxis)
                  .selectAll("text")
                  .style("text-anchor", "middle")
                  .attr("dy", "10px")
                  .style("font-weight", function(d) {
                      if(d.getMonth() === 0){
                          return "bold";
                      }
                  });

          var y_axis = chart.append("g") // Draw axes: y axis
              .attr("id","yaxis"+indexval)
              .attr("class", "color-white")
              .attr("transform","translate(" + config.margin.left + ",0)")
              .call(yAxis)
                  .selectAll("text")
                  .style("text-anchor", "end")
                  .text(function(d) {
                      return d + "%";
                  });

          d3.select("#yaxis"+indexval)
              .append("text")
              .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
              .attr("y", -config.margin.left/1.5)
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")
              .style("font-weight", "bold")
              .text("Performance");

          d3.select("#xaxis")
              .append("text")
              .attr("y", 40)
              .attr("x", (0.5 * width))
              .attr("text-anchor", "middle")
              .text("Snapshot Date");

          var line = d3.svg.line()
              .interpolate("linear")
              .x(function(d) {
                  return xScale(d.date);
              })
              .y(function(d) {
                  return yScale(d.value);
              });

          var metric = chart.selectAll(".metric")
              .data(metrics)
              .enter()
              .append("g")
                .attr("class", "metric"
                     )
                .attr("value", function(d){
                    return d.value;
                });

          metric.append("path")
              .attr("class", "line")
              .attr("d", function(d) {
                  return line(d.values);
              })
              .style("stroke", function(d) { return color(d.name); })
              .style("stroke-width", "8px")
              .style("fill", "none");

          var point = metric.append("g")
              .attr("class", "line-point");

          point.selectAll('circle')
              .data(function(d){ return d.values; })
              .enter()
              .append('circle')
                  .attr("cx", function(d) { return xScale(d.date); })
                  .attr("cy", function(d) { return yScale(d.value); })
                  .attr("r", 8)
                  .attr("class", "color-white")
                  .style("stroke-width", "1px")
                  .style("stroke", function(d) { return color(this.parentNode.__data__.name); });



      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
 *    ██╗   ██╗███████╗ █████╗     ███╗   ███╗ █████╗ ██████╗
 *    ██║   ██║██╔════╝██╔══██╗    ████╗ ████║██╔══██╗██╔══██╗
 *    ██║   ██║███████╗███████║    ██╔████╔██║███████║██████╔╝
 *    ██║   ██║╚════██║██╔══██║    ██║╚██╔╝██║██╔══██║██╔═══╝
 *    ╚██████╔╝███████║██║  ██║    ██║ ╚═╝ ██║██║  ██║██║
 *     ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a USA map chart.
 */

PARTICLE.directive('usMap', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.9;
            height = element.parent().innerHeight() * 0.5;//$window.innerHeight * .75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = 500;
            //height = width
            console.log("progressMeter", width, height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {


                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {


                //Define map projection
                var projection = d3.geo.albersUsa()
                    .translate([width / 2, height / 2]).scale([1100]);


                //Define path generator
                var path = d3.geo.path()
                    .projection(projection);

                //Define quantize scale to sort data values into buckets of color
                var color = d3.scale.quantize()
                    .range(["#8AB28C", "rgba(97, 65, 82,.5)", "#666b95", "rgb(49,163,84)", "rgb(0,109,44)"]);
                //Colors taken from colorbrewer.js, included in the D3 download

                //Create SVG element
                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                //Load in agriculture data
                d3.csv("csv/us-ag-productivity-2004.csv", function (data) {

                    //Set input domain for color scale
                    color.domain([
                        d3.min(data, function (d) {
                            return d.value;
                        }),
                        d3.max(data, function (d) {
                            return d.value;
                        })
                    ]);

                    //Load in GeoJSON data
                    d3.json("json/us-states.json", function (json) {

                        //Merge the ag. data and GeoJSON
                        //Loop through once for each ag. data value
                        for (var i = 0; i < data.length; i++) {

                            //Grab state name
                            var dataState = data[i].state;

                            //Grab data value, and convert from string to float
                            var dataValue = parseFloat(data[i].value);

                            //Find the corresponding state inside the GeoJSON
                            for (var j = 0; j < json.features.length; j++) {

                                var jsonState = json.features[j].properties.name;

                                if (dataState == jsonState) {

                                    //Copy the data value into the JSON
                                    json.features[j].properties.value = dataValue;

                                    //Stop looking through the JSON
                                    break;

                                }
                            }
                        }

                        //Bind data and create one path per GeoJSON feature
                        svg.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .style("fill", function (d) {
                                //Get data value
                                var value = d.properties.value;

                                if (value) {
                                    //If value exists…
                                    return color(value);
                                } else {
                                    //If value is undefined…
                                    return "#ccc";
                                }
                            });

                    });

                });


            };


        }
    };
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
		          var searchData = dataRigger.getNew("file", _params);
		            return $http({
		                method: 'GET',
		                url: searchData.object.file,
		                params: searchData.object,
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
