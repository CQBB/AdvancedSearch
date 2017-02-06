/**
 * Created by fyang on 1/23/2017.
 */
// Code goes here
$(document).ready(function() {

    var equalOperatorPool = ["Make", "Model"];
    var items = [];
    var operatorPool=[
        {
            "OperatorCate":"L",//lookup
            "Operators":['=','!=']
        },
        {
            "OperatorCate":"N",//Numeric
            "Operators":['=','!=','&gt','&gt=','&lt','&lt=']
        },
        {
            "OperatorCate":"T",//Text
            "Operators":['=','!=','like','end with','start with']
        }

    ];

    var fieldData=[];
    var models={};
    var makes={};
    var removeBtn = " <button type='button' class='btn btn-danger btn-xs remove pull-right'> <span class='glyphicon glyphicon-remove'></span></button>";


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
        getAllVehicleMakes();
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
        getAllVehicleModels();
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
            })
            groupedModels=_.groupBy(modelsUnderSelectedMakes,function (m) {
                return m.makeName;
            });

            return groupedModels;
        }


    $('#getJson').click(function () {
      var data= generateTransportData($('#container'));


       console.log(data);
        console.log(getSqlQueryFromJson(data));
      console.log(JSON.stringify(data));

    });

    $('#fields').on('click','.field-group-heading',function () {
        $('.field-group-heading-selected').removeClass('field-group-heading-selected');
        $(this).addClass('field-group-heading-selected');

    });

    $('#addGroup').click(function() {
        var selectedGroup=$('.selected');
        var newGroup=addBlankGroup(selectedGroup);
        addAndOrOptions(newGroup);
        $('.andorSelect').select2({
            minimumResultsForSearch: -1
        });
        updateQuery();
    });

    function addBlankGroup(selectedGroup) {
        var groupBox = $("<div class='group condition panel panel-default row' tabindex='-1'></div>");
        var removeRow=$("<div class='row removeRow'></div>");
        var removeBtn=$("<button type='button' class='btn btn-danger pull-right remove btn-xs'><span class='glyphicon glyphicon-remove'></span>Remove Group</button>");
        selectedGroup.append(groupBox);

        removeRow.append(removeBtn);
        groupBox.append(removeRow);
        selectedGroup.removeClass('selected');
        groupBox.addClass("selected");


        return groupBox;
    };

    $('#getConditionString').click(function() {

        updateQuery();
    });

    $('#removeAll').click(function () {
       $('#container').empty().addClass('selected');
       $('#query').empty();
    });

    function updateQuery() {
        var condition = $('#container');
        var query = getConditionStringsFromGroup(condition);
        $('#query').text(query);
    }

    function getConditionStringsFromGroup(condition) {
        var query = '';
        condition.children('div').each(function() {

            var current = $(this);

            var isGroup = current.hasClass('group');
            var temp = '';
            if (current.hasClass('andor')){
                //find the andor select
                var andorselect = current.find('.andorSelect');
                temp = andorselect.find('option:selected').text();
            } else if (!isGroup && current.hasClass('condition')) //straight single condition
            {
                temp = getSingleConditionString(current);
            } else if (isGroup) //group recurse
            {
                temp = '(' + getConditionStringsFromGroup(current) + ')';
            }
            query = query + '  ' + temp;

        });

        return query;
    }


    function getSqlQueryFromJson(data) {
        var query='';
        var conditions=data.conditions;
        $.each(conditions,function (i,condition) {
            var temp='';
            switch(condition.type){
                case "condition":
                    temp=getSingleConditionJson(condition);
                    break;
                case "operator":
                    temp=condition.value;
                    break;
                case "group":
                    temp= '(' + getSqlQueryFromJson(condition.conditions)+ ')';
                    break;
            }

            query=query+' '+temp;
        });

        return query;
    }

    function generateTransportData(condition) {
        var dataAaray=[];
        var data={};
        condition.children('div').each(function() {

            var current = $(this);

            var isGroup = current.hasClass('group');
            var temp = {};
            if (current.hasClass('andor')){
                //find the andor select
                var andorselect = current.find('.andorSelect');
                var value = andorselect.find('option:selected').text();

                temp.type='operator';
                temp.value=value;
            } else if (!isGroup && current.hasClass('condition')) //straight single condition
            {
                temp = getSingleConditionData(current);
            } else if (isGroup) //group recurse
            {
                //temp = "{'type':'group','conditions':["+generateTransportData(current)+"]}";
                temp.type='group';
                temp.conditions= generateTransportData(current);

            }
            if(!$.isEmptyObject(temp))
                dataAaray.push(temp);

        });
        data.conditions=dataAaray;

        return data;
    }



    //Event delegate to select change, then update query.
    $('#container').on('change','select',function (e) {
        updateQuery();
    });

    //Event delegate to input change, then update query.
    $('#container').on('change','input',function (e) {
        updateQuery();
    });

    //Event delegate. Add click event dynamically
    $('#container').on('click', '.group', function(e) {
        $('.selected').removeClass('selected');
        $(this).addClass("selected");
        //updateQuery();
        e.stopPropagation();

    });

    //Event delegate for remove button click
    $('#container').on('click', '.remove', function(e) {
        var prev;
        //Check if remove is in the group
        var group=$(this).parent().parent();
        var parent=$(this).parent();
        //Remove btn on group.
        if(group.hasClass('group')&&!parent.hasClass('condition'))
        {
            prev=group.prev();
            parent=group;
            group.parent().addClass('selected');
        }
        else
        {
            prev= $(this).parent().prev();
            parent=$(this).parent();
        }
        //If previous element is andor, remove it.

        if (prev.hasClass('andor')) {
            prev.remove();
        }

        //If it's the first element or 2nd but 1st is remove btn, delete operator
        if (!prev.length || prev.hasClass('removeRow')) {
            var next =parent.next();
            next.remove();
        }

        parent.remove();
        updateQuery();
        e.stopPropagation();
    });

    $('#container').click(function() {
        $('.selected').removeClass('selected');
        $(this).addClass("selected");
    });

    //Field add click
    $('#fields').on('click','.btn-add',function(e) {
        var field=$(this).parent().parent().data('field');
        var condition = getCondition(field);
        $('.selected').append(condition);
        addAndOrOptions(condition);

        //Bueatify select
       setHtmlBehavior(field,condition);



        updateQuery();
        e.stopPropagation();
    });

    function setHtmlBehavior(field,condition) {
        $('.andorSelect').select2({
            minimumResultsForSearch: -1
        });
        $('.operator').select2({
            minimumResultsForSearch: -1
        });

        var select=condition.find('.right');
        if(field.SelectType=='MultiSelect')
        {
            select.select2({
                allowClear:true,
                closeOnSelect:false
            });
        }else if(field.SelectType=='Dropdown')
        {
            select.select2({
                minimumResultsForSearch: -1
            });
        }

        $('select').on("select2:select", function (e) {
            $(window).scroll();
        });

        if(field.OperatorType=='N')
            condition.find('.right').keyup(function () {
                this.value = this.value.replace(/[^0-9\.]/g,'');
            });

    }


    //Save search click
    $('#saveSearch').click(function (e) {
        e.preventDefault();
        $('#saveModal').modal('show');

    });



    $('#saveSearchModal').click(function (){
       var search={};
        search.searchData=generateTransportData($('#container'));
       // search.searchContent=$('#container').html();
      var searches={};

       if(localStorage.getItem('maxId')==null)
       {
           localStorage.setItem('maxId',0);
       }

       if(JSON.parse(localStorage.getItem('searches'))==null)
       {
         searches={
            "searches":[]
        };

         localStorage.setItem('searches',JSON.stringify(searches));
       }

       searches=JSON.parse(localStorage.getItem('searches'));
       var maxId=localStorage.getItem('maxId');
       search.id=++maxId;
       localStorage.setItem('maxId',maxId);
       search.name=$('#searchName').val();
       if(search.name.length=='')
       {
           search.name='Search name unspecified';
       }

       //Tell if the search exists
       /* var exSearch=_.findWhere(searches,{id:search.id});
        if(exSearch!=null)
        {
            _.extend(_.findWhere(searches,{id:search.id}),search);
        }
*/


       searches.searches.push(search);
       localStorage.setItem('searches',JSON.stringify(searches));

       var savedSearchContainer=$("<tr class='row'>" +
           "<td class='col-xs-8 search-name'>"+search.name+"</td>" +
           "<td class='col-xs-2 btn btn-default btn-sm edit-search'><span class='glyphicon glyphicon-edit'></span></td>" +
           "<td class='col-xs-2 btn btn-default btn-sm remove-search'><span class='glyphicon glyphicon-remove'></span></td>" +
           "</tr>");

       savedSearchContainer.data('search',search);
       $('#savedSearches').append(savedSearchContainer);

       $('#saveModal').modal('hide');
    });

    $('#saveModal').on('hidden.bs.modal',function (e) {
       $(this).find('input').val('').end();
    });

    $('#savedSearches').on('click','.remove-search',function (e) {

          var search=$(this).parent().data('search');

          var searches=JSON.parse(localStorage.getItem('searches'));
          searches.searches=_.without(searches.searches,_.findWhere(searches.searches,{id:search.id}));
          localStorage.setItem('searches',JSON.stringify(searches));
          $(this).parent().remove();
    });

    $('#savedSearches').on('click','.edit-search',function (e) {
         var search=$(this).parent().data('search');
         $('#container').empty();
         loadSavedGroup($('#container'),search.searchData.conditions);


    });

    loadSavedSearches();
    //Load the saved searches from localstorage
    function  loadSavedSearches() {
        var searches=JSON.parse(localStorage.getItem('searches'));
        if(searches!=null)
        {
            $.each(searches.searches,function (i,s) {
                var savedSearchContainer=$("<tr class='row'>" +
                    "<td class='col-xs-8 search-name'>"+s.name+"</td>" +
                    "<td class='col-xs-2 btn btn-default btn-sm edit-search'><span class='glyphicon glyphicon-edit'></span></td>" +
                    "<td class='col-xs-2 btn btn-default btn-sm remove-search'><span class='glyphicon glyphicon-remove'></span></td>" +
                    "</tr>");

                savedSearchContainer.data('search',s);
                $('#savedSearches').append(savedSearchContainer);
            })
        }
    }





    function loadSavedGroup(currGroup,conditions) {
        $.each(conditions,function (i,condition) {
            var type=condition.type;
            if(type=='condition')
            {

                var variable=condition.variable;
                //find the field to fill the condition
                var field=_.find(fieldData,function (f) {
                    return f.Variable==variable;
                });
                var conditionHtml=getCondition(field);

                //Pre fill selected
                if(condition.relation=='IN'){
                    var multiString=condition.value.slice(1,-1);
                    conditionHtml.find('.right').val(multiString.split(','));

                }
                else if(condition.relation=='NOT IN'){
                    var multiString=condition.value.slice(1,-1);
                    conditionHtml.find('.right').val(multiString.split(','));
               }else
                {
                    conditionHtml.find('.right').val(condition.value);
                }

                conditionHtml.find('.operator').val(condition.relation);
                currGroup.append(conditionHtml);
                setHtmlBehavior(field,conditionHtml);


            }
            else if(type=='operator')
            {
                var andOrOptions = $("<div class='andor row'><select class=andorSelect><option class=and>AND</option><option class=or>OR</option><select></div>");
                andOrOptions.find('select').val(condition.value);
                currGroup.append(andOrOptions);
                $('.andorSelect').select2({
                    minimumResultsForSearch: -1
                });
            }
            else if(type=='group'){
                var newGroup=addBlankGroup(currGroup);
                var conditionsInGroup=condition.conditions;
                loadSavedGroup(newGroup,conditionsInGroup.conditions);
            }
        });

    }
    
    //Populate the fields
    function populateFields() {
        $.getJSON("fieldsDefinition.json",function (data) {
            var groups=data.Groups;

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
        });
    }
    populateFields();



    //Form the query condition
    function getCondition(field) {
        var operator;
        var rightOperand;
        var condition = $("<div class='condition row condition-container'><div class='field col-sm-3 field-container' value='" + field.id + "'>" + field.Variable + "</div></div>");


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
            rightOperand = $("<input style='width:100px;' class='right form-control'></input>");
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

        var DDL = $("<select class='right' data-placeholder='Select values' multiple></select>");



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
           var DDL = $("<select class='right' data-placeholder='Select values' multiple></select>");
       }
       else
       {
           var DDL = $("<select class='right'></select>");
       }

        var options=[];
        $.each(field.Values,function (i,v) {
            options.push("<option  value="+v.Value+">" + v.ValueText + "</option>");
        });
        DDL.append(options.join(''));

        return DDL;
    }
    //Check if previous item exists and is not andor, then add andorOption
    function addAndOrOptions(condition) {
        var andOrOptions = "<div class='andor row'><select class=andorSelect><option class=and>AND</option><option class=or>OR</option><select></div>";

        var prevCondition = condition.prev();
        if (prevCondition.length) {
            var prevConditionClass = prevCondition.attr('class');
            //if previous element is a condition add operator.
            if (prevConditionClass.indexOf('condition') >= 0) {
                prevCondition.after(andOrOptions);
            }
        }
    }

    //get the condition string from condition div
    function getSingleConditionString(condition) {
        var fieldTxt = condition.find('.field').attr('value');
        var operatorTxt = "";
        var operator = condition.find('.operator');
        var right = condition.find('.right');
        var rightTxt = "";

        operatorTxt = operator.find('option:selected').text();


        if (right.is('input')) {
            rightTxt = right.val();
            switch(operatorTxt){
                case 'LIKE':
                    rightTxt='%'+rightTxt+'%';

                    break;
                case 'end with':
                    rightTxt='%'+rightTxt;
                    operatorTxt='LIKE';
                    break;
                case 'start with':
                    rightTxt=rightTxt+'%';
                    operatorTxt='LIKE';
                    break;
            }
        } else {

            var selected=right.find('option:selected');
            if(selected.length>1)//mutiSelect
            {
                var rigthtTxtArray=[];
                $.each(selected,function (i,s) {
                    rigthtTxtArray.push($(s).attr('value'));
                });
                rightTxt='('+rigthtTxtArray.join(',')+')';
                if(operatorTxt=='=')
                {
                    operatorTxt='IN';
                }else
                {
                    operatorTxt='NOT IN';
                }

            }
            else
            {
                rightTxt = right.find('option:selected').attr('value');
            }



        }

        return fieldTxt +' '+ operatorTxt +' '+ rightTxt;
    }

    //Form the json object for single condition
    function getSingleConditionData(condition) {
        var fieldTxt = condition.find('.field').attr('value');
        var operatorTxt = "";
        var operator = condition.find('.operator');
        var right = condition.find('.right');
        var rightTxt = "";
        var data={};

        operatorTxt = operator.find('option:selected').text();


        var selected=right.find('option:selected');
        if(selected.length>1)//mutiSelect
        {
            var rigthtTxtArray=[];
            $.each(selected,function (i,s) {
                rigthtTxtArray.push($(s).attr('value'));
            });
            rightTxt='('+rigthtTxtArray.join(',')+')';
            if(operatorTxt=='=')
            {
                operatorTxt='IN';
            }
            else
            {
                operatorTxt='NOT IN';
            }

        }
        else
        {
            rightTxt = right.find('option:selected').attr('value');
        }


        data.type='condition';
        data.id=fieldTxt;
        data.relation=operatorTxt;
        data.value=rightTxt;
        data.variable=condition.find('.field').text();
        return data;
    }

     function getSingleConditionJson(condition ) {
         return condition.id+' '+condition.relation+' '+condition.value;
     }

});