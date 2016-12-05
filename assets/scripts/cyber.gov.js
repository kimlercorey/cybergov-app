/**
 ------------------------------------------------------------------------------------------------------------------------
 *    ┌─┐┌─┐┌┐┌┌┬┐┌─┐┌┐┌┌┬┐  ┌─┐┌─┐┌┐┌┌┬┐┬─┐┌─┐┬  ┬  ┌─┐┬─┐
 *    │  │ ││││ │ ├┤ │││ │   │  │ ││││ │ ├┬┘│ ││  │  ├┤ ├┬┘
 *    └─┘└─┘┘└┘ ┴ └─┘┘└┘ ┴   └─┘└─┘┘└┘ ┴ ┴└─└─┘┴─┘┴─┘└─┘┴└─
 ------------------------------------------------------------------------------------------------------------------------
 **/
PARTICLE.controller("api",function($scope,$stateParams,$state,$timeout,dataIo,CONFIG,contentSettings) {

  $scope.CONFIG = CONFIG;
  $scope.content = null;
  $scope.searchterm = "searchterm";
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
