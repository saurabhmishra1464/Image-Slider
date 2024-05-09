const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots-container');

async function fetchPhotos() {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=10', {
            method: 'GET',
        })
        const result = await response.json();
        if (result && result.length > 0) {
            renderPhotos(result);
        }
    } catch (error) {
        console.log(error);
    }
}

function renderPhotos(ListOfImages) {
    console.log(ListOfImages);
    slider.innerHTML = ListOfImages.map(
        (item) =>
            `<div class="slide">
          <img src="${item.download_url}" id=${item.id} height=${item.height} width=${item.width} alt="${item.id}"/>
    </div>
    `
    ).join(" ");

    dotsContainer.innerHTML = ListOfImages.map(
        (item, index) =>
            `
        <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
        `
    ).join(" ");
}

fetchPhotos();

setTimeout(() => {

    //slider functionality

    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');

    let currentSlide = 0;


    function activeDot(slide) {
        document.querySelectorAll(".dot").forEach(dotItem => dotItem.classList.remove("active"));
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add("active");
    }

    function changeCurrentSlide(currentSlide) {
        debugger
        slides.forEach(
            (slideItem, index) =>
                (slideItem.style.transform = `translate(${100 * (index - currentSlide)}%)`)
        );
    }

    changeCurrentSlide(currentSlide);

    btnNext.addEventListener("click", () => {
        currentSlide++
        if (slides.length - 1 < currentSlide) {
            currentSlide = 0;
        }
        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    });

    btnPrev.addEventListener('click', () => {
        currentSlide--;
        if (0 > currentSlide) {
            currentSlide = slides.length - 1;
        }
        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    })

    dotsContainer.addEventListener('click', (event) => {
        console.log(event.target.dataset.slide);
        if (event.target.classList.contains('dot')) {
            const currentSlide = event.target.dataset.slide;
            changeCurrentSlide(currentSlide);
            activeDot(currentSlide);
        }

    })

}, 1000)

