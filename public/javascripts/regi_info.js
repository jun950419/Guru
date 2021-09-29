


$(document).ready(function(e) {
    let id_bool = 0;
    let pw_bool = 0;
    let re_pw_bool = 0;
    let name_bool = 0;
    let email_bool = 0;

    $("#user_id").keyup(() => {
    let input_id = $('#user_id').val(); // 입력 값 받아오는 부분
    let id_pattern = /^[a-z0-9_]{4,12}$/; // 정규표현식
    let id_res = id_pattern.test(input_id); // 검사 => t/f
    if(input_id == ""){ // null 검사
        $("#alert_userid").html("필수 입력");
        id_bool = 1;
        $(".form_submit_button").attr("disabled", true); // 비활성화
    }else{
        if(!id_res){ // 정규 표현식 => flase 일 경우
            $("#alert_userid").html("영어 소문자,숫자 4-12자리");
            $("#alert_userid").css("color","red");
            id_bool = 1;
            $(".form_submit_button").attr("disabled", true);
        }else{
            $.ajax({
                url: "/register/regi_info/findId",
                type: "POST",
                data: {
                    'data': input_id,
                },
                dataType: "json",
                success:(result)=>{
                    if(result['result'] == true) {
                        $("#alert_userid").html("사용 가능한 아이디");
                        $("#alert_userid").css("color","blue");
                        id_bool = 0;
                        if((id_bool||pw_bool||re_pw_bool||name_bool||email_bool) == 0) {
                            $(".form_submit_button").attr("disabled", false); //사용가능
                        }
                    }
                    else {
                        $("#alert_userid").html("중복된 아이디");
                        $("#alert_userid").css("color","red");
                        id_bool = 1;
                        $(".:form_submit_button").attr("disabled", "true");
                        }
                    },
                });
            }
        }
    });

    $("#user-email").focusout(() => {
        let input_email = $('#user-email').val();
        let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

        let email_res = email_pattern.test(input_email);
        if(input_email == ""){
            $("#alert_email").html("필수 입력");
            email_bool = 1;
            $(".form_submit_button").attr("disabled", "true"); // 비활성화
        }else if(!email_res){
            
                $("#alert_email").html("이메일 형식을 확인해주세요");
                $("#alert_email").css("color","red");
                email_bool = 1;
                $(".form_submit_button").attr("disabled", "true");
            }
            else{
                $("#alert_email").html("사용가능");
                $("#alert_email").css("color","blue");
                email_bool = 0;
            }
        });


        $("#user_name").on("keyup", function() {
            let input_name = $('#user_name').val();
            let name_pattern = /^[가-힣\s]+$/;
    
            let name_res = name_pattern.test(input_name);
            if(input_name == ""){
                $("#alert_username").html("필수 입력");
                name_bool = 1;
                $(".form_submit_button").attr("disabled", "true"); // 비활성화
            }else if(!name_res){
                
                    $("#alert_username").html("띄어쓰기 없이 한글만 가능합니다.");
                    $("#alert_username").css("color","red");
                    name_bool = 1;
                    $(".form_submit_button").attr("disabled", "true");
                }
                else{
                    $("#alert_username").html("사용가능");
                    $("#alert_username").css("color","blue");
                    name_bool = 0;
                }
            });

            $("#user-pw").focusout(() => {
                let input_pw = $('#user-pw').val();
                let pw_pattern = /^[a-z0-9_]{6,12}$/;
        
                let pw_res = pw_pattern.test(input_pw);
                if(input_pw == ""){
                    $("#alert_password").html("필수 입력");
                    pw_bool = 1;
                    $(".form_submit_button").attr("disabled", "true"); // 비활성화
                }else if(!pw_res){
                    
                        $("#alert_password").html("6~12자 영문소문자, 숫자만 가능합니다");
                        $("#alert_password").css("color","red");
                        pw_bool = 1;
                        $(".form_submit_button").attr("disabled", "true");
                    }
                    else{
                        $("#alert_password").html("사용가능");
                        $("#alert_password").css("color","blue");
                        pw_bool = 0;
                    }
                });


                $("#user-repw").on("keyup", function() {
                    if($("#user-pw").val() !== $("#user-repw").val()) {
                        $("#alert_password2").html("비밀번호 불일치");
                        $("#alert_password2").css("color","red");
                        re_pw_bool = 1;
                        $(".form_submit_button").attr("disabled", "disabled");
                    }
                    else {
                        $("#alert_password2").html("비밀번호 일치");
                        $("#alert_password2").css("color","blue");
                        re_pw_bool = 0;
                        if((id_bool||pw_bool||re_pw_bool||name_bool||email_bool) != 1) {
                            $(".form_submit_button").removeAttr("disabled");
                        }
                    }
                });

               
                
});



function back(){
    history.back();
}