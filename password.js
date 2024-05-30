let password=document.getElementById('password');
      let visibility=document.getElementById('visibility');
      
      let is_show=true;
      visibility.addEventListener('click',function(){
            if(is_show){
                    password.setAttribute('type','text');
                    visibility.innerHTML='visibility';
                }else{
                        password.setAttribute('type','password');
                        visibility.innerHTML='visibility_off';
                    }
                    is_show=!is_show;
                  });
                  //LOGIN
                  let passwordL=document.getElementById('passwordL');
      let visibilityL=document.getElementById('visibilityL');
      
      let is_showL=true;
      visibilityL.addEventListener('click',function(){
            if(is_showL){
                    passwordL.setAttribute('type','text');
                    visibilityL.innerHTML='visibility';
                }else{
                        passwordL.setAttribute('type','password');
                        visibilityL.innerHTML='visibility_off';
                    }
                    is_showL=!is_showL;
                  });
                //   open main file
    function login()
    {
    
        open("index.html");
        close("login1.html");
    }