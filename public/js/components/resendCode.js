const ResendCode = (update)=> {
    const data = resources.codeResend;
    const containerCode = $('<section class="container"></section>');
    const formVerfication = $('<form class="verification"></form>');
    const input = $(`<input id="text" type="number" pattern="^[0-9]{6}" placeholder=". . . . . ." required>`);
    const checkbox = $(`<input id="terms" type="checkbox">`);
    const reboot = $('<p>Reintentar en 21</p>');
    const code = $(`<div><p>Tu CÓDIGO: </p></div>`)


    formVerfication.append(input);
    formVerfication.append(reboot);
    containerCode.append(Instructions(data.image,data.title,data.description));
    containerCode.append(formVerfication);
    containerCode.append(code);
    return containerCode;
}