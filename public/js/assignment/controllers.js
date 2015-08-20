/**
 * Created by C-Styles on 8/5/15.
 */


angular.module('assignment')
.controller('assignment.daily_housekeepingController', [ '$scope', '$http','SweetAlert',function ($scope, $http, SweetAlert) {

$scope.dataLoaded = false;

$scope.gridOptions1 = {
   enableSorting: true,
   enableRowSelection: true,
   multiSelect: true,
   enableFullRowSelection: true,
   treeRowHeaderAlwaysVisible: false,
   columnDefs: [
     { field: 'location', sort:{priority:1,direction:'asc'} },
     { field: 'status', sort:{priority:0,direction:'asc'} },
     { field: 'cabin_number', displayName:'Cabin' },
     { field: 'linens'},
     { field: 'assigned_to'}
   ],
   onRegisterApi: function( gridApi ) {
     $scope.grid1Api = gridApi;
   }
};

$scope.gridOptions2 = {
   enableSorting: true,
   enableRowSelection: true,
   multiSelect: true,
   enableFullRowSelection: true,
   columnDefs: [
     { field: 'first_name', displayName:'HouseKeeper', grouping: {groupPriority: 0} },
     { field: 'status' },
     { field: 'cabin_number', displayName:'Cabin'},
   ],
   onRegisterApi: function( gridApi ) {
     $scope.grid2Api = gridApi;
   }
};

$scope.assignedPercentage = function(){
	var percentage = 0;
	var assigned = {
		total:$scope.gridOptions1.data.length,
		count:0
	};

	angular.forEach($scope.gridOptions1.data,function (v){
		if(v.assigned_to.length > 0){
			this.count++;
		}
	},assigned);

	percentage = Math.ceil((assigned.count/assigned.total)*100);
	var color = getColorFromPercentage(percentage);

	return {width:percentage+'%','background-color':color};
}

$scope.assign = function (housekeeper){
	        var forPersistance = [{
		        assignee:housekeeper.first_name,
		        housekeeper_id: housekeeper.id
	        }];
            var selectedRows = $scope.grid1Api.selection.getSelectedRows();

	        angular.forEach(selectedRows,gatherToPersist, forPersistance);

            var assignee       = housekeeper.first_name;
            var housekeeper_id = housekeeper.id;

            for(var x in selectedRows){

                var row = selectedRows[x];
                var assignment = {
	                 housekeeper_id : housekeeper_id,
                    first_name     : assignee,
                    status         : row.status,
                    cabin_number   : row.cabin_number,
	                 linens         : row.linens,
                    assigned_from  : row.id
                };

                if(arrayDoesNotContain(row.assigned_to, assignee)){
                    row.assigned_to.push(assignee);
                    $scope.gridOptions2.data.push(assignment);

                }
                else{
                    alert(assignee + ' has already been assigned to cabin ' + row.cabin_number);
                }
            }

            $scope.grid1Api.selection.clearSelectedRows();
        };

$scope.unAssign = function(){
 var selectedRows = $scope.grid2Api.selection.getSelectedRows();

 var wholeModel = $scope.gridOptions1.data;
 var assignmentsModel = $scope.gridOptions2.data;

   for(var row in selectedRows){
       var selected = selectedRows[row], from = selected.assigned_from, name = selected.first_name;

       for(var index in wholeModel){
           var model = wholeModel[index], from_identifier = model.id;

           if(from == from_identifier){
               model.assigned_to = _.without(model.assigned_to, name)
               assignmentsModel = _.without(assignmentsModel, selected);
           }
       }
   }
   $scope.gridOptions2.data = assignmentsModel;

};

$scope.isAssigned = function(assignments){
   var assigned = false;
   if(assignments.length > 0){
       assigned = true;
   }
   return assigned;
};

$scope.thereIsNoSelection = function(){
   if($scope.dataLoaded) {
      if ($scope.grid1Api.selection.getSelectedRows().length > 0) {
         return false;
      }
      else {
         return true;
      }
   }
};

$scope.assignmentCount = function(){
 if($scope.gridOptions1.data){
     return propertyExistsCounter($scope.gridOptions1.data, 'assigned_to');
 }
 else{
     return 'waiting on data';
 }
};

$http.get('/housekeeping_assignments').success(function(cabin_active){
   angular.forEach(cabin_active,function(value){
       value.assigned_to = [];
   });
   $scope.gridOptions1.data = cabin_active;
   //$scope.assignmentCount = propertyExistsCounter(cabin_active,'assigned_to');

});

$http.get('/housekeepers').success(function(housekeepers){

   $scope.gridOptions2.data = [];
   $scope.gridOptions2.housekeepers = housekeepers;
});

$scope.save = function(){
var model = [];
angular.forEach( $scope.grid2Api.grid.rows, getDesiredProps, model);
$http.post('/save_housekeeping_assignments', {data:model}).then(function(succ){
 SweetAlert.success('Upload Successfull!!');
});
}

function getDesiredProps(val, k){
	value =  (val.hasOwnProperty('entity') == true) ? val['entity']: val;


	this[k] = {
		housekeeper_id : value['housekeeper_id'],
		cabin_number   : value['cabin_number'],
		status         : value['status'],
		linens         : value['linens'],
		first_name     : value['first_name'],
		assigned_from  : value['assigned_from']
	};
}
function arrayDoesNotContain(arr, toBeFound){
   var isNotFound = true;
   for (var arrValue in arr){
       console.log(arr[arrValue]);
       if (arr[arrValue] == toBeFound){
           isNotFound = false;
       }
   }
   return isNotFound;
}
function propertyExistsCounter(model, property){
       var count = 0;
       for(var index in model){
           //console.log(model[index][property]);
           if(model[index][property].length > 0){
               count++;
           }
       }
       //console.log(count);
       return count;
   }
function gatherToPersist(v){
	var gatheredObj = {
		assignee      : this[0].assignee,
		housekeeper_id: this[0].housekeeper_id
	};
	angular.forEach(v,function(v, key){
		this[key] = v;
	}, gatheredObj);
	this.push(gatheredObj);
}
function getColorFromPercentage(percent){
								/*  red                           orange                      blue     green  */
	color = (percent <= 25)?  '#ED5565' : (percent <= 50) ?  '#F8AC59': (percent <= 99)?  '#23C6C8':  '#1AB394';
	return color;
}

}])
.controller('assignment.officeController', ['$scope', function ($scope) {

    $scope.data = {};

	    $scope.myData = [
        {Name: "Moroni", Age: 50, Position: 'PR Menager', Status: 'active', Date: '12.12.2014'},
        {Name: "Teancum", Age: 43, Position: 'CEO/CFO', Status: 'deactive', Date: '10.10.2014'},
        {Name: "Jacob", Age: 27, Position: 'UI Designer', Status: 'active', Date: '09.11.2013'},
        {Name: "Nephi", Age: 29, Position: 'Java programmer', Status: 'deactive', Date: '22.10.2014'},
        {Name: "Joseph", Age: 22, Position: 'Marketing manager', Status: 'active', Date: '24.08.2013'},
        {Name: "Monica", Age: 43, Position: 'President', Status: 'active', Date: '11.12.2014'},
        {Name: "Arnold", Age: 12, Position: 'CEO', Status: 'active', Date: '07.10.2013'},
        {Name: "Mark", Age: 54, Position: 'Analyst', Status: 'deactive', Date: '03.03.2014'},
        {Name: "Amelia", Age: 33, Position: 'Sales manager', Status: 'deactive', Date: '26.09.2013'},
        {Name: "Jesica", Age: 41, Position: 'Ruby programmer', Status: 'active', Date: '22.12.2013'},
        {Name: "John", Age: 48, Position: 'Marketing manager', Status: 'deactive', Date: '09.10.2014'},
        {Name: "Berg", Age: 19, Position: 'UI/UX Designer', Status: 'active', Date: '12.11.2013'}
    ];



}])

