var lightbox_images = document.querySelectorAll("[data-rel='lightbox']");

var lightbox_index = void 0;

var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);

for (i = 0; i < lightbox_images.length; i++) {

    lightbox_images[i].dataset.index = i;

    lightbox_images[i].addEventListener("click", function(event) {

        event.preventDefault();

        lightbox.classList.add("active");

        if(lightbox.querySelectorAll("img")) {

            for (j = 0; j < lightbox.querySelectorAll("img").length; j++) {

                lightbox.querySelectorAll("img")[j].classList.remove("fade-in");

            }

        }

        if(lightbox.querySelector("img[data-index='" + this.dataset.index + "']")) {

            lightbox.querySelector("img[data-index='" + this.dataset.index + "']").classList.add("fade-in");

        } else {

            var img = new Image();
                img.src = this.href;
                img.dataset.index = this.dataset.index;
                lightbox.appendChild(img);

                img.onload = function() {

                    img.classList.add("fade-in");

                } 

        }

    });

}

lightbox.addEventListener("click", function(event) {  

    close();

});

function close() {

    lightbox.classList.remove("active");

    if(lightbox.querySelectorAll("img")) {

        for (j = 0; j < lightbox.querySelectorAll("img").length; j++) {

            lightbox.querySelectorAll("img")[j].classList.remove("fade-in");

        }

    }

}



function next() {

    lightbox_index = lightbox.querySelector(".fade-in").dataset.index;

    lightbox_index++;

    if(lightbox_index >= lightbox_images.length) lightbox_index = 0;

    switchTo(lightbox_index);

}

function prev() {

    lightbox_index = lightbox.querySelector(".fade-in").dataset.index;

    lightbox_index--;

    if(lightbox_index < 0) lightbox_index = lightbox_images.length - 1;

    switchTo(lightbox_index);

}

function switchTo(index) {

    if(lightbox.querySelectorAll("img")) {

        for (j = 0; j < lightbox.querySelectorAll("img").length; j++) {

            lightbox.querySelectorAll("img")[j].classList.remove("fade-in");

        }

    }

    if(lightbox.querySelector("img[data-index='" + index + "']")) {

        lightbox.querySelector("img[data-index='" + index + "']").classList.add("fade-in");

    } else {

        var img = new Image();
            img.src = document.querySelector("[data-rel='lightbox'][data-index='" + index + "']").href;
            img.dataset.index = index;
            lightbox.appendChild(img);

            img.onload = function() {

                img.classList.add("fade-in");

            }

    }

}

document.onkeydown = function checkKey(e) {

    e = e || window.event;

    if(lightbox.classList.contains("active")) {

        if (e.keyCode == '38') {
            next();
        }
        else if (e.keyCode == '40') {
            prev();
        }
        else if (e.keyCode == '37') {
            prev();
        }
        else if (e.keyCode == '39') {
            next();
        }
        else if (e.keyCode == '27') {
            close();
        }

    }

}