const Instructions = (image,tittle,description,numberspan)=>{
    "use strict";
    const divInstructions = $(`<div class="instructions flex"><img src="img/icons/${image}" alt=""></div>`);
    const h3 = $(`<h3>${tittle}</h3>`);
    const p = $(`<p>${description} <span>${numberspan}</span></p>`);

    divInstructions.append(h3);
    divInstructions.append(p);

    return divInstructions;
};