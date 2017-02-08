 pressione.controller('pressioneController', ["$scope", "$http", function ($scope, $http){
    var vm =this;
     vm.init=function(){
         vm.clearRecord();
         
         $http.get("http://localhost/ng-pressione/pressione_backend/elenco.php")
            .then(function(response){
                $scope.table = response.data;
            });   
     };

    vm.clearRow=function(id){
        $http.get("http://localhost/ng-pressione/pressione_backend/elenco.php?act=del&id="+id)
            .then(function(response){
            $scope.table = response.data;
        });
    };
    
    vm.clearRecord=function(){
        $scope.newMis = 
        {
            'datamisurazione':"",
            'sistolica':"",
            'diastolica':"",
            'pesocorporeo':""
        };
    };
   
    vm.insertData=function(){
        $http({
            method: "POST",
            url: "http://localhost/ng-pressione/pressione_backend/elenco.php?act=new",
            header: {"Content-Type":"application/json"},
            data: $scope.newMis
        }).then(function(response){
            $scope.table = response.data;
        });
    };
         
    vm.init();
    
}]);


