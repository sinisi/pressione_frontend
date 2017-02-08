 pressione.controller('temperaturaController', ["$scope", "$http", function ($scope, $http){
    var vm =this;
     vm.init=function(){
         vm.clearRecord();
         
         $http.get("http://localhost/ng-pressione/pressione_backend/temp_elenco.php")
            .then(function(response){
                $scope.table = response.data;
            });   
     };

    vm.clearRow=function(id){
        $http.get("http://localhost/ng-pressione/pressione_backend/temp_elenco.php?act=del&id="+id)
            .then(function(response){
            $scope.table = response.data;
        });
    };
    
    vm.clearRecord=function(){
        $scope.newTemp = 
        {
            'datamisurazione':"",
            'valore':""
            
        };
    };
   
    vm.insertData=function(){
        $http({
            method: "POST",
            url: "http://localhost/ng-pressione/pressione_backend/temp_elenco.php?act=new",
            header: {"Content-Type":"application/json"},
            data: $scope.newTemp
        }).then(function(response){
            $scope.table = response.data;
        });
    };
         
    vm.init();
    
}]);


