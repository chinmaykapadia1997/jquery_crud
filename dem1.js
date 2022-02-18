//============================================================ ARRAYS ============================================================================
$(document).ready(function(){
    function PutDate(){
        var dte = new Date();
        return dte.getHours() + ":" + dte.getMinutes() + ":" + dte.getSeconds();
    }

    var obj = [{id:1, name:"abc", email:"abc@gmail.com", gender:"male", hobby:["football","reading"], age:23, cityy:1,statee:1,time:PutDate()},
               {id:2, name:"def", email:"def@gmail.com", gender:"female", hobby:["football"], age:24, cityy:3, statee:2, time:PutDate()}];

    var state = [{sid:1, sname:"gujarat"},
                 {sid:2, sname:"maharashtra"}];

    var city  = [{cid:1, sid:1, cname:"surat"},
                 {cid:2, sid:1, cname:"baroda"},
                 {cid:3, sid:2, cname:"mumbai"}, 
                 {cid:4, sid:2, cname:"pune"}];

    function get_state(stat_id){
        var s_id = state.filter(item => item.sid == stat_id);
        return s_id[0].sname;
    }
    function get_city(city_id){
        var c_id = city.filter(item => item.cid == city_id);
        return c_id[0].cname;
    }
//=============================================================== FUNCTIONS =====================================================================

    function list(index, item)
    {
        var tableRow = "";
        tableRow+= "<tr id='tr"+index+"'>"+
            "<td id='td"+index+"'>"+item.id+"</td>"
            +"<td id='td"+index+"'>"+item.name+"</td>"
            +"<td id='td"+index+"'>"+item.age+"</td>"
            +"<td id='td"+index+"'>"+item.email+"</td>"
            +"<td id='td"+index+"'>"+item.gender+"</td>"
            +"<td id='td"+index+"'>"+item.hobby+"</td>"
            +"<td id='td"+index+"'>"+get_city(item.cityy)+"</td>"
            +"<td id='td"+index+"'>"+get_state(item.statee)+"</td>"
            +"<td id='td"+index+"'>"+"<button type='button' value='"+item.id+"' id='del1' class='ddelbtn'>Delete</button>"+"</td>"
            +"<td id='td"+index+"'>"+"<button type='button' value='"+item.id+"' id='btnedit'>Edit</button>"+"</td>"
            +"<td id='td"+index+"'>"+item.time+"</td>"
            +"</tr>"; 
            $("#tbody").append(tableRow);
    }

    function DisplayRecord(){   
        $.each(obj,function(index,item){
            list(index, item);  
        });
    }

//---------------------------------------------------------- ================ ---------------------------------------------------------------------
    $("#update1").hide();
    $("#cancel1").hide();
    DisplayRecord();
    var idl = obj.length;
//================================================================ City and State =================================================================
    //State and City:   
    $.each(state,function(index,item){
        $("#tstate").append("<option value=" + item.sid + ">" + item.sname + "</option>");
        });

    $("#tstate").on('change',function(){
        var stat = $(this).val();
        $("#tcity").html('');
        var cityAr = set_city($(this).val());
        $.each(cityAr,function(index,item){
            $("#tcity").append("<option value=" + item.cid + ">" + item.cname + "</option>");
        });
            // $("#tcity").attr("disabled",false);
    });

    function set_city(id)
    {
        var stateC = city.filter(item=>item.sid==id);
        console.log("City : ",stateC);
        return stateC;
    }
        
//================================================================== STATE AND CITY OVER =========================================================

//===================================================================== SUBMIT BUTTON CLICK =======================================================
    $("#submit1").click(function(){

        var name2 = $("#tname").val();
        var email2 = $("#temail").val();
        var gen = $("input[name='gender']:checked").val();
        var hb = [];
        $.each($("input[name='hobb1']:checked"),function(){
            hb.push($(this).val());
        });
        var age2 = $("#tage").val();
        var city2 = $("#tcity").val();
        var state2 = $("#tstate").val();
        var dat1 = PutDate();

        var validExp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validateEmail = validExp.test(email2);

        if(name2.length < 1 && age2.length < 1  && email2.length < 1){
            $("#s1").text('Fields cnnot be empty:');
        }
        else if(!validateEmail){
            $("#s1").text('Enter proper email:');
        }
        else if(age2<18){
            $("#s1").text('Enter proper age:');
        }
        else if($("input[name='gender']:checked").length == 0){
            $("#s1").text('Please select the gender:');
        }
        else if($("input[name='hobb1']:checked").length == 0){
            $("#s1").text('Please select the hobby:');
        }
        else if($("#tstate").val() == ""){
            $("#s1").text('Please select the hobby:');
        }
        else{
            idl++;
            var data = obj.push({id:idl,name:name2,email:email2,gender:gen,hobby:hb,age:parseInt(age2),cityy:city2,statee:state2,time:PutDate()});
            console.table("Obj Array Data:",data);
            $("#tbody").html("");
            DisplayRecord();
            console.log(obj);
            $("#s1").text("");
        }
        //Reseting the form on button click:
        $("#form1")[0].reset();    
        $("#tcity").html("");
    // $('#tcity').attr('disabled',true);
    });

//================================================================== SUBMIT BUTTON CLICK OVER ====================================================

//================================================================== SORTING START ==============================================================
//Sorting:
    $("#tsort").on("change",function(){
        var sv = $("#tsort :selected").text();
        if(sv == "Ascending")
        {
        obj = obj.sort((a,b)=>(a.name > b.name) ? 1:-1);
        $("#tbody").html("");
        DisplayRecord();
        }

        else if(sv == "Descending"){
            obj = obj.sort((a,b)=>(a.name < b.name) ? 1 :-1);
            $("#tbody").html("");
            DisplayRecord();
        }
    });

//================================================================= SORTING OVER ====================================================================

//================================================================= SEARCHING START ================================================================
    
    $("#search1").on('keyup',function(){

        var src = $(this).val();
        $("#tbody").html("");
        $.each(obj,function(index,item){
        if(obj[index].name.toLocaleLowerCase().indexOf(src)>-1){
            list(index, item);
        }
        else{
            console.log("In else block");
        }
        });
    });
//================================================================= SERARHING OVER =================================================================

//================================================================== DELETE START ======================================================================
    //Delete:---
    $("#tbody").on("click",".ddelbtn",function(){
        var btnid = $(this).val();
        console.table(btnid);
        $("#s1").text("");
        $("#tbody").html("");
        $.each(obj,function(index,item){
            if(obj[index].id == btnid){
                obj.splice(index,1);
                console.log(obj);
                $("#tbody").html("");
                DisplayRecord();
            }
            else {
                $("#tbody").html("");
                DisplayRecord();
            }
        });
        $("#form1")[0].reset();
    });
//================================================================= DELETE OVER =================================================================
    $("#cancel1").click(function(){
        $("#form1")[0].reset();
        $("#update1").hide();
        $("#submit1").show();
        $("#cancel1").hide();
        $("#tcity").html("");
    });
//================================================================= EDIT START ==================================================================
    //Edit:-----
    var btnid = "";
    $("#tbody").on("click","#btnedit",function(){

        btnid = $(this).val();  
        $("#s1").text("");
        console.log("BUTTON ID:",btnid);
        var find_id = obj.find(item => item.id == btnid);
        console.log(find_id);
        if(find_id)
        {
            $("#btn1").hide();
            $("#update1").show();

            $("#tid").val(find_id.id);
            $("#tname").val(find_id.name);
            $("#temail").val(find_id.email);
            $("#tage").val(find_id.age); 
            if(find_id.gender == "male"){
                var g = $("input[name='gender'][value='male']").prop("checked",true);
                g.val(find_id.gender);
            }
            else{
                var g = $("input[name='gender'][value='female']").prop("checked",true);
                g.val(find_id.gender);
            }
            if(find_id.hobby){
                var h1 = find_id.hobby;
                console.log(h1);
                var l = h1.length;
                console.log(l);
                console.log("hob --- ",h1)
                if(l>=1){
                    $("input[type='checkbox'][name='hobb1']").val(h1);
                 }
            }
            $("#tstate").val(find_id.statee);
            var stte = $("#tstate").val();
            var cty = city.filter(item => item.sid == stte);
            $("#tcity").html("");
            $.each(cty,(index, item) => {
                $("#tcity").append("<option value='" + item.cid + "'>" + item.cname + "</option>");
            });
            $("#tcity").val(find_id.cityy);
            console.log(obj.length);
        }
        $("#submit1").hide();
        $("#cancel1").show();
    });
       
    $("#update1").click(function(){
        console.log("B id:",btnid);
        var find_id = obj.find(item => item.id == btnid) ;
        if(find_id)
        {
            var new_id = $("#tid").val();
            var new_name = $("#tname").val();
            var new_email = $("#temail").val();
            var new_gen = $("input[name='gender']:checked").val();
            var new_hb = [];
            $.each($("input[name='hobb1']:checked"),function(){
                new_hb.push($(this).val());
            });
            var new_age = $("#tage").val();
            var new_city = $("#tcity").val();
            var new_state = $("#tstate").val();
    
            var validExp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validateEmail = validExp.test(new_email);
            if(!validateEmail){
                $("#s1").text('Enter proper email:');
            }
            else if(new_age<18){
                $("#s1").text('Enter proper age:');
            }
            else if($("input[name='gender']:checked").length == 0){
                $("#s1").text('Please select the gender:');
            }
            else if($("input[name='hobb1']:checked").length == 0){
                $("#s1").text('Please select the hobby:');
            }
            else if($("#tstate").val() == ""){
                $("#s1").text('Please select the hobby:');
            }
            else{
                find_id.name = new_name
                find_id.age = parseInt(new_age);
                find_id.email = new_email;
                find_id.gender = $("input[name='gender']:checked").val();

                var hb = [];
                $.each($("input[name='hobb1']:checked"),function(){
                    hb.push($(this).val());
                });
                find_id.hobby = hb;
                find_id.cityy = new_city;
                find_id.statee = new_state;
                find_id.time=PutDate();
            }
        }
        console.log(obj);
        $("#tbody").html("");
        $("#tcity").html("");
        DisplayRecord();
        $("#form1")[0].reset();
        $("#update1").hide();
        $("#cancel1").hide();
        $("#submit1").show();
    });
//================================================================== EDIT OVER ==================================================================
});