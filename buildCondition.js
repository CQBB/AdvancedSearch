/**
 * Created by fyang on 2/16/2017.
 */
//Form the query condition
function getCondition(field) {
    var operator;
    var rightOperand;
    var condition = $("<div class='condition row condition-container as-row'><div class='field col-sm-3 field-container' value='" + field.id + "'>" + field.Variable + "</div></div>");


    //operator dropdown
    if (field.SelectType != "Check box")
    {
        operator = getOperator(field.OperatorType);
        condition.append(operator);


        rightOperand = getRightOperand(field);
        operator.after(rightOperand);
    }
    //condition.append(rightOperand);
    condition.append(removeBtn);
    return condition;
};

function getRightOperand(field) {
    var rightOperand;
    var selectType=field.SelectType;
    var valueContainer= $("<div class='col-sm-5 value-container'></div>");
    if (field.id == '21') {
        rightOperand = getVDDL(makes, 'make');

    } else if (field.id == '22') {
        var groupedModels=getGroupedModelsFromCurrMakes();
        rightOperand = getVDDL(groupedModels, 'model');
    } else if(selectType=='MultiSelect'||selectType=='Dropdown'){
        rightOperand=getDDL(field);

    }else if(selectType== "Textbox"||selectType=="Range")
    {
        rightOperand = $("<input type='text' style='width:100px; float:left' " +
            "class='right form-control right-textbox required' " +
            "name='input_text["+(counter++)+"]'></input>");
    }
    valueContainer.append(rightOperand);
    return valueContainer;
}

function getOperator(operatorType) {
    var operatorDDL;
    var operatorGroup=_.find(operatorPool,function (o) {
        return o.OperatorCate==operatorType;
    });

    operatorDDL = $("<select class='form-control operator'></select>");
    var operatorOptions = [];
    var ddlDiv = $('<div class="col-sm-2 operator-container"></div>');
    $.each(operatorGroup.Operators, function(i, operator) {
        operatorOptions.push('<option>' + operator + '</option>');
    });
    operatorDDL.append(operatorOptions.join(''));

    ddlDiv.append(operatorDDL);
    return ddlDiv;
}

//get dropdownlist for make and model.
function getVDDL(items, className) {

    var DDL = $("<select class='right' data-placeholder='Select values' multiple " +
        "name='multiselect["+(counter++)+"]' required></select>");



    //If it's model ddl form the grouped ddl
    if(className=='model'){
        $.each(items,function (i,item) {
            var optgroup=$("<optgroup label='"+i+"'></optgroup>");
            var options=[];
            $.each(item,function (i,subitem) {
                options.push("<option class=" + className + " value="+subitem.Id+">" + subitem.Name + "</option>");
            });
            optgroup.append(options.join(''));
            DDL.append(optgroup);
        });
    }
    else if(className=='make')
    {
        DDL.addClass('makeSelect');
        var options = [];
        $.each(items, function(i, item) {
            options.push("<option class=" + className + " value="+item.Id+">" + item.Name + "</option>");
        });

        DDL.append(options.join(''));
    }
    return DDL;
}
//get ddl in general
function  getDDL(field) {
    if(field.SelectType=='MultiSelect')
    {
        var DDL = $("<select class='right' data-placeholder='Select values' multiple " +
            "name='multiselect["+(counter++)+"]' required></select>");
    }
    else
    {
        var DDL = $("<select class='right'></select>");
    }

    var options=[];
    $.each(field.Values,function (i,v) {
        if(i==0)
        {
            options.push("<option  value="+v.Value+" selected>" + v.ValueText + "</option>");
        }
        else
        {
            options.push("<option  value="+v.Value+">" + v.ValueText + "</option>");
        }

    });
    DDL.append(options.join(''));

    return DDL;
}
//Check if previous item exists and is not andor, then add andorOption
function addAndOrOptions(condition) {
    var andOrOptions = "<div class='andor row as-row'><select class=andorSelect><option class=and>AND</option><option class=or>OR</option><select></div>";

    var prevCondition = condition.prev();
    if (prevCondition.length) {
        var prevConditionClass = prevCondition.attr('class');
        //if previous element is a condition add operator.
        if (prevConditionClass.indexOf('condition') >= 0) {
            prevCondition.after(andOrOptions);
        }
    }
}



function addBlankGroup(selectedGroup) {
    var groupBox = $("<div class='group condition panel panel-default row as-row' tabindex='-1'></div>");
    var removeRow=$("<div class='row removeRow as-row'></div>");
    var removeBtn=$("<button type='button' class='btn btn-danger pull-right remove btn-xs'><span class='glyphicon glyphicon-remove'></span>Remove Group</button>");
    selectedGroup.append(groupBox);

    removeRow.append(removeBtn);
    groupBox.append(removeRow);
    selectedGroup.removeClass('selected');
    groupBox.addClass("selected");


    return groupBox;
}

//Group the models from current make listed
function getGroupedModelsFromCurrMakes() {
    var makeSelects=$('#container').find('.makeSelect');
    var selectedMakes=makeSelects.find('option:selected');
    var makeNames=[];
    var groupedModels={};
    $.each(selectedMakes,function (i,selectedMake) {
        makeNames.push(selectedMake.text);
    });
    makeNames.sort();
    var modelsUnderSelectedMakes=_.filter(models,function (model) {
        return makeNames.indexOf(model.makeName)!=-1;
    });

    modelsUnderSelectedMakes=_.sortBy(modelsUnderSelectedMakes,function (m) {
        return m.makeName;
    });
    groupedModels=_.groupBy(modelsUnderSelectedMakes,function (m) {
        return m.makeName;
    });

    return groupedModels;
}