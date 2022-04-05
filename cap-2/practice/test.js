$('.container').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
});

console.log(appName);

const title = document.querySelector('h1');
let seconds = 55;

const newParagraph = document.createElement('p');
newParagraph.textContent = 'Nuevo elemento creado dinamicamente';
newParagraph.classList.add('red');

const divBlog = document.querySelector('.blog');

setInterval(function () {
    if (seconds === 60) seconds = 0;

    title.textContent = seconds++;
}, 1000);

const elDelete = document.querySelector('.to-delete');

setTimeout(function () {
    // elDelete.remove();

    elDelete.parentElement.removeChild(elDelete);
    divBlog.insertAdjacentElement('beforeend', newParagraph);
}, 3000);

console.dir(elDelete);

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);

    for (const object of formData.entries()) {
        console.log('Name of the property:', object[0]);
        console.log('Value of the property:', object[1]);
    }
    console.log(event);
});

/* const func1 = (event) => {
    console.log(event);
};
form.addEventListener('submit', func1.bind(form)); */

/* const func = (event) => {
    
}

const func2 = function () {

} */
