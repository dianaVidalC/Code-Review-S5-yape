const ResendCode = (update)=> {
    const resource = resources.codeResend;
    const containerCode = $('<section class="container"></section>');
    const formVerfication = $('<form class="form-control flex"></form>');
    const divInput = $('<div class="box"></div>');
    const input = $(`<input id="code" type="number" pattern="^[0-9]{6}" placeholder=". . . . . ." required>`);
    const icon = $(`<span class="icon"><img src="img/icons/lock.png"></span>`);
    const p = $('<p>Reintenta en: </p>');
    const reboot = $('<span id="second">21</span>');
    const code = $(`<p>Tu CÓDIGO:<span id="code-generated">${state.userCode}</span></p>`);

    divInput.append(input);
    divInput.append(icon);
    formVerfication.append(divInput);
    p.append(reboot);
    formVerfication.append(p);
    containerCode.append(Instructions(resource.image,resource.title,resource.description));
    containerCode.append(formVerfication);
    containerCode.append(code);

   $(_=>{
       contador(22,input.val(),reboot,update);
       if (input.val().length === 0) {
           intervalo(span, update);
       }
   });

    return containerCode;
};

function contador(cont,inputVal,reboot,update,input){
    let seconds = setInterval(_=>{
        cont--;
        reboot.text(cont);
        if(cont == 0){
            resendCodes(state.phone)
                .then((codeResponse)=>{
                    console.log(codeResponse);
                    state.userCode = codeResponse;
                    //if(inputVal==codeResponse){

                        clearInterval(seconds);
                        state.nextPage = RegisterUser;
                        update();

                    /*}else {
                        $('#code-generated').empty();
                        $('#code-generated').text(state.userCode);
                        state.nextPage = ResendCode;
                    }*/
                })
                .catch((err) => {
                    console.log(err);
                    $('#code').after(`<p>${err}</p>`);
                    $('#code').val('');

                });
            cont=22;
        }else {
            console.log(seconds);
            console.log($('#code'));
            $('#code').on('keypress keyup',(e)=> {
                if (inputVal == state.userCode) {
                    clearInterval(seconds);
                    state.nextPage = RegisterUser;
                    update();
                } else {
                    state.nextPage = ResendCode;
                }
            });
        }
    },1000);
    //return seconds;
}
