var lightbox_images = document.querySelectorAll("[data-rel='lightbox']");

var lightbox_index = void 0;

var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);

var spinner = document.createElement("div");
    spinner.className = "spinner";
    lightbox.appendChild(spinner);     

for (i = 0; i < lightbox_images.length; i++) {

    lightbox_images[i].dataset.index = i;

    lightbox_images[i].addEventListener("click", function(event) {

        event.preventDefault();

        lightbox.classList.add("active");

        if(lightbox.querySelectorAll("figure")) {

            for (j = 0; j < lightbox.querySelectorAll("figure").length; j++) {

                lightbox.querySelectorAll("figure")[j].classList.remove("fade-in");

            }

        }

        if(lightbox.querySelector("[data-index='" + this.dataset.index + "']")) {

            spinner.classList.add("hidden");
            lightbox.querySelector("[data-index='" + this.dataset.index + "']").classList.add("fade-in");

        } else {

            spinner.classList.remove("hidden");

            var img = new Image();
                img.src = this.href;
                lightbox.appendChild(img);

            var imgBox = document.createElement("figure");
                imgBox.dataset.index = this.dataset.index;
                imgBox.appendChild(img);

            if(this.parentNode.querySelector("figcaption") != null) {

                var caption = document.createElement("figcaption");
                caption.innerText = this.parentNode.querySelector("figcaption").innerText;
                imgBox.appendChild(caption);

            } 

            lightbox.appendChild(imgBox);

            img.onload = function() {

                imgBox.classList.add("fade-in");
                spinner.classList.add("hidden");

            } 

        }

    });

}

lightbox.addEventListener("click", close, false);

function close() {

    lightbox.classList.remove("active");

    if(lightbox.querySelectorAll("figure")) {

        for (j = 0; j < lightbox.querySelectorAll("figure").length; j++) {

            lightbox.querySelectorAll("figure")[j].classList.remove("fade-in");

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

    console.log(lightbox_index);

    if(lightbox_index < 0) lightbox_index = lightbox_images.length - 1;

    switchTo(lightbox_index);

}

function switchTo(index) {

    var _this = document.querySelector("[data-rel='lightbox'][data-index='" + index + "']");

    spinner.classList.remove("hidden");

    if(lightbox.querySelectorAll("figure")) {

        for (j = 0; j < lightbox.querySelectorAll("figure").length; j++) {

            lightbox.querySelectorAll("figure")[j].classList.remove("fade-in");

        }

    }

    if(lightbox.querySelector("[data-index='" + index + "']")) {

        spinner.classList.add("hidden");
        lightbox.querySelector("[data-index='" + index + "']").classList.add("fade-in");

    } else {

        var img = new Image();
            img.src = _this.href;

        var imgBox = document.createElement("figure");
            imgBox.dataset.index = index;
            imgBox.appendChild(img);

        if(_this.parentNode.querySelector("figcaption") != null) {

            var caption = document.createElement("figcaption");
            caption.innerText = _this.parentNode.querySelector("figcaption").innerText;
            imgBox.appendChild(caption);

        } 

        lightbox.appendChild(imgBox);

        img.onload = function() {

            imgBox.classList.add("fade-in");
            spinner.classList.add("hidden");

        }

    }

}

document.addEventListener("keydown", keyPress, false);

function keyPress(e) {

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