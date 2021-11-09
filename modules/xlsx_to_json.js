$scope.ExcelExport= function (event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
      var fileData = reader.result;
      var wb = XLSX.read(fileData, {type : 'binary'});

      wb.SheetNames.forEach(function(sheetName){
      var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      var jsonObj = JSON.stringify(rowObj);
      console.log(jsonObj)
      })
  };
  reader.readAsBinaryString(input.files[0]);
};