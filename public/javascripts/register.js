function back(){
    history.back();
}

//////////////////////////////////////////
$(document).ready(function(){
    
    $("#btnAgree").click(function(){    
        if($("#termsService1").is(":checked") == false){
            alert("모든 약관에 동의 하셔야 다음 단계로 진행 가능합니다.");
            return false;
        }else if($("#termsService2").is(":checked") == false){
            alert("모든 약관에 동의 하셔야 다음 단계로 진행 가능합니다.");
            return false;
        }else if($("#termsService3").is(":checked") == false){
            alert("모든 약관에 동의 하셔야 다음 단계로 진행 가능합니다.");
            return false;
        }else{
            $("#joing_form").submit();
        }
        // if($("#termsService1").is(":checked") == true && $("#termsService2").is(":checked")  == true && $("#termsService3").is(":checked") == true){
        //     $("#joing_form").submit();
        // }else{
        //     return false;
        // }
    });    
});

