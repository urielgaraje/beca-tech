$('.container').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
});

const title = document.querySelector('h1');
let seconds = 55;

setInterval(function () {
    if (seconds === 60) seconds = 0;

    title.textContent = seconds++;
}, 1000);
