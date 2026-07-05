const logoAnimation = document.getElementById("svglogoanimation");
const bkgdVideo = document.getElementById("backgroundvideo");

setTimeout(() => {
    logoAnimation.classList.add("fade-out");

    setTimeout(() => {
        logoAnimation.remove();
        bkgdVideo.play();
    }, 300);
}, 11000);


/*=========== ↓ Lightbox ↓ ===========*/ 

const lightbox = document.getElementById("lightbox");
const mainImage = document.getElementById("lightbox-image");
const thumbsContainer = document.getElementById("lightbox-thumbs");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const closeBtn = document.getElementById("close");

const galleries = {
  logology: [
    "assets/logos/casanovacrew.svg",
    "assets/logos/mountaindentallab.svg",
    "assets/logos/gardensun.svg",
    "assets/logos/mojoemusic.png",
    "assets/logos/protoprism.png",
    "assets/logos/kshamica.svg",
    "assets/logos/ptalogo.svg",
    "assets/logos/harmonikmmmproject.png",
    "assets/logos/dentricity.svg",
    "assets/logos/2wnty3.svg",
    "assets/logos/lemonz.svg",
    "assets/logos/pandaconstruction.svg",
    "assets/logos/infannette.svg"
  ],
  
  graphicdesign: [
    "assets/graphics/casanovacrewbanners.png",
    "assets/graphics/engeltshirt01.png",
    "assets/graphics/engeltshirt02.png",
    "assets/graphics/mdltricouponmailer.png",
    "assets/graphics/starseedsummit.png",
    "assets/graphics/cosmicreuniontrinity.png",
    "assets/graphics/greggbradeninterview.png",
    "assets/graphics/richarddolaninterview.png",
    "assets/graphics/rainbowlightbody.png", 
    "assets/graphics/thedebtillusion.png",
    "assets/graphics/greerthedeepstate.png",
    "assets/graphics/drgreerremoteviewing.png",
    "assets/graphics/mayabiotics.png",
    "assets/graphics/kshamica01.png",
    "assets/graphics/kshamica02.png",
    "assets/graphics/infannette01.png",
    "assets/graphics/infannette02.png"
  ]
};

let currentGallery = [];
let currentIndex = 0;

// OPEN LIGHTBOX
document.querySelectorAll("[data-gallery]").forEach((trigger) => {
  trigger.addEventListener("click", () => {

    const name = trigger.dataset.gallery;
    currentGallery = galleries[name];
    currentIndex = 0;

    renderThumbs();
    updateImage();

    lightbox.classList.add("active");
  });
});

// RENDER THUMBNAILS
function renderThumbs() {
  thumbsContainer.innerHTML = "";

  currentGallery.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;

    if (index === 0) img.classList.add("active");

    img.addEventListener("click", () => {
      currentIndex = index;
      updateImage();
    });

    thumbsContainer.appendChild(img);
  });
}

// UPDATE MAIN IMAGE
function updateImage() {
  mainImage.src = currentGallery[currentIndex];

  document.querySelectorAll(".lightbox-thumbs img")
    .forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
}

// NAVIGATION
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateImage();
});

// CLOSE
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

function openMenu() {
    document.querySelector('.nav__link--list')
        .classList.toggle('open');
}

document.querySelectorAll('.nav__link--anchor').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav__link--list')
            .classList.remove('open');
    });
});



/*=========== ↓ CONTACT FORM ↓ ===========*/ 

emailjs.init({
    publicKey: "BLPJwREvxb2RlmsRh"
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    status.textContent = "";

    emailjs
        .sendForm(
            "service_4pe60tk", 
            "template_prcb3t9",
            form
        )

        .then(function () {

            status.style.color = "green";
            status.textContent = "✓ Your message has been sent successfully!";

            form.reset();

        })

        .catch(function (error) {

            console.error(error);

            status.style.color = "red";
            status.textContent =
                "Sorry, something went wrong. Please try again.";

        })

        .finally(function () {

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";

        });

});