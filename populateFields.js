/**
 * Created by fyang on 2/16/2017.
 */
var models={};
var makes={};
//Get all vehicle makes
function getAllVehicleMakes() {

    $.ajax({
        url:"https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/NCSA%20Make?format=json",
        async:false,
        dataType:'json',
        success:function (data) {
            makes=data.Results;
            makes=_.sortBy(makes,function (m) {
                return m.Name;
            })
        }
    });

}

//get all models
function getAllVehicleModels() {

    $.ajax({
        url:"https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/NCSA%20Model?format=json",
        async:false,
        dataType:'json',
        success:function (data) {
            models=data.Results;
            models=addMakeIdAndNameToModel(models);
            models=_.sortBy(models,function (m) {
                return m.Name;
            })
        }
    });

}

//Get the make from model id
function getMakeByModelId(modelId) {
    var make={};
    var modelIdString=modelId.toString();
    make.makeId=modelIdString.substr(0,modelIdString.length-6);
    make=_.find(makes,function (m) {
        return m.Id==make.makeId;
    });
    return make;
}


function addMakeIdAndNameToModel(models) {
    var make = {};
    var makeName='';
    $.each(models,function (i,model) {
        make=getMakeByModelId(model.Id);
        model.makeId=make.Id;
        model.makeName=make.Name;
    });
    return models;
}

//Populate the fields
function populateFields() {

    var groups=myGroups.Groups;

    var i=0;
    $.each(groups,function (i,group) {
        var id='collapse'+(++i);
        var groupPenel=$("<div class='panel panel-default field-group-container'><div class='panel-heading btn btn-default field-group-heading' data-toggle='collapse'" +
            " data-parent='#fields' href='#"+id+"'>"+group.Group+"</div></div>");

        var btnTable=$("<table class='table table-hover panel-collapse collapse' id='"+id+"'><tbody></tbody></table>");


        $.each(group.Fields,function (i,field) {
            var fieldTd=$("<td class='row'><div  value='"+field.id+"' data-OperatorType='"+field.OperatorType+"' " +
                "class='field fieldOnly col-sm-10'>"+field.Variable+"</div><div class='col-sm-2'>" +
                "<button class='btn btn-default btn-add btn-sm' type='button'><span class='glyphicon glyphicon-plus'></span></button></div></td>");
            var fieldTr=$("<tr></tr>");
            fieldData.push(field);
            fieldTr.append(fieldTd);
            fieldTd.data("field",field);
            btnTable.append(fieldTr);

        });

        groupPenel.append(btnTable);
        $('#fields').append(groupPenel);
    })

}