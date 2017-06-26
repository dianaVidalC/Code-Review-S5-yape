"use strict";
const Portada = (update)=>{
    const containerPortada = $('<section class="container"></section>');
    const div = $('<div class="carousel flex"></div>');
    const button = $('<button>Registrarme</button>');

    div.append(carousel());
    div.append(button);
    containerPortada.append(div);

    button.on('click',_=>{
        state.nextPage = RegisterNumber;
        update();
    });

    return containerPortada;
};
