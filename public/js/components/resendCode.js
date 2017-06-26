let interval;
const ResendCode = (update)=> {
    const resource = resources.codeResend;
    const containerCode = $('<section class="container"></section>');
    const formVerfication = $('<form class="form-control flex"></form>');
    const divInput = $('<div class="box"></div>');
    const input = $(`<input id="code" type="number" pattern="^[0-9]{6}" placeholder=". . . . . ." required>`);
    const icon = $(`<span class="icon"><img src="img/icons/lock.png"></span>`);
    const p = $('<p>Reintenta en <img class="icon-clock" src="img/icons/clock.png"></p>');
    const reboot = $('<span id="second"></span>');
    const code = $(`<p>Tu CÓDIGO:<span id="code-generated">${state.userCode}</span></p>`);

    divInput.append(input);
    divInput.append(icon);
    formVerfication.append(divInput);
    p.append(reboot);
    formVerfication.append(p);
    containerCode.append(Instructions(resource.image,resource.title,resource.description,state.phone));
    containerCode.append(formVerfication);
    containerCode.append(code);

    interval = setInterval(counter,1000);

    input.on('keypress keyup',(e)=> {
        if (input.val() == state.userCode) {
            stopInterval();
            state.nextPage = RegisterUser;
            update();
        }
    });

    return containerCode;
};

let cont = 21;
function counter(){
    console.log(cont);
    if(cont > 0){
        cont --;
        $('#second').text(cont);
    }else{
        resendCodes(state.phone)
            .then((codeResponse)=>{
                $('#code-generated').empty();
                $('#code-generated').text(codeResponse);
            })
            .catch((err) => {
                console.log(err);
                $('#code').after(`<p>${err}</p>`);
                $('#code').val('');

            });
        cont=21;
    }
}
function stopInterval(){
    clearInterval(interval);
}

