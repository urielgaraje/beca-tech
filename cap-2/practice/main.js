console.log('Hola uri!');

const container = document.querySelector('.container');

const planetas = ['marte', 'tierra', 'mercurio'];

const title = document.querySelector('h1');
const button = document.querySelector('button');

button.addEventListener('click', function () {
    /*     const name = 'uriel';
    console.log(`Mi nombre es :${name}`);

    title.innerHTML = `<p>${name.toUpperCase()}</p>`;
    title.style.border = '2px solid red'; */
/*     const newTitle = document.createElement('h1');
    newTitle.textContent = 'Hola soy nuevo!';

    container.insertAdjacentElement('beforeend',newTitle);
    container.insertAdjacentHTML('afterbegin','<p>Hola Andres</p>'); */

});

const paragraphs = document.querySelectorAll('.inner-text p');

for (const p of paragraphs) {
    p.textContent = 'Hola Mundo';
}

console.dir(title);

//divP.textContent = 'Hola Mundo';

/* for (let i = 0; i < planetas.length; i++) {
    console.log('Method FOR :', planetas[i]);
}

for (const planeta of planetas) {
    console.log('Method FOR..OF :', planeta);
}

for (const planeta in planetas) {
    console.log('Method FOR..IN :', planeta);
}

planetas.forEach(function (element) {
    console.log('Dentro del FOREACH :', element);
});

let i = 0;

while (planetas.length > 0) {
    console.log(planetas[i]);
		planetas.shift();
} */
