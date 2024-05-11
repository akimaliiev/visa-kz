<!--Navbar Collapse Function-->
let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

let body = document.querySelector('body');

if (isMobile.any()) {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.arrow');
    for (i = 0; i < arrow.length; i++) {
        let thisLink = arrow[i].previousElementSibling;
        let subMenu = arrow[i].nextElementSibling;
        let thisArrow = arrow[i];

        thisLink.classList.add('parent');

        arrow[i].addEventListener('click', function () {
            subMenu.classList.toggle('open');
            thisArrow.classList.toggle('active');
        })
    }
} else {
    body.classList.add('mouse')
}

<!-- To rotate header section arrow -->
let count = 0;

function rot() {
    const page_arrow = document.getElementById("page-header__arrow")
    count++;
    let deg = count * 180;
    page_arrow.style.transform = "rotate(" + deg + "deg)";
}

<!-- To stop video by clicking CloseMark -->
let video = document.querySelector('video');
let modalArea = document.getElementById("exampleModalToggle1")

const startVideo = function () {
    video.load()
    video.play()
}

const stopVideos = function () {
    video.pause()
    video.currentTime = 0;
};

modalArea.addEventListener('click', function (e) {
    if (e.target.classList.contains("show")) {
        stopVideos()
    }
});

<!-- Last Gallery Slider -->
const slider = document.querySelector(".gallery-slider_slides"),
    firstImg = slider.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".gallery-slider_wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth;
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = (slider.scrollLeft - 0.4000244140625) == scrollWidth ? "none" : "block";
    console.log((slider.scrollLeft - 0.4000244140625) + ' ' + scrollWidth)
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        slider.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth
        setTimeout(() => showHideIcons(), 60);
    })
})

const autoSlide = () => {
    if (slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    slider.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slider.addEventListener("touchend", dragStop);
