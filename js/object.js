function lightbox(config) {

    var lightbox,
        lightbox_images,
        lightbox_index;

    var config = {

        lightboxCls: "lightbox",
        lightboxImgCls: "fade-in",
        lightboxImgSelector: "img"

    }

    function prev() {

        lightbox_index = lightbox.querySelector("." + config.lightboxImgCls).dataset.index;
    
        lightbox_index--;
    
        if(lightbox_index < 0) lightbox_index = lightbox_images.length - 1;
    
        switchTo(lightbox_index);
    
    }

    function next() {

        lightbox_index = lightbox.querySelector("." + config.lightboxImgCls).dataset.index;
    
        lightbox_index++;
    
        if(lightbox_index >= lightbox_images.length) lightbox_index = 0;
    
        switchTo(lightbox_index);
    
    }

    function switchTo(index) {

        if(lightbox.querySelectorAll(config.lightboxImgSelector)) {
    
            for (j = 0; j < lightbox.querySelectorAll(config.lightboxImgSelector).length; j++) {
    
                lightbox.querySelectorAll(config.lightboxImgSelector)[j].classList.remove(config.lightboxImgCls);
    
            }
    
        }
    
        if(lightbox.querySelector(config.lightboxImgSelector + "[data-index='" + index + "']")) {
    
            lightbox.querySelector(config.lightboxImgSelector + "[data-index='" + index + "']").classList.add(config.lightboxImgCls);
    
        } else {
    
            var img = new Image();
                img.src = document.querySelector("[data-rel='" + config.lightboxCls + "'][data-index='" + index + "']").href;
                img.dataset.index = index;
                lightbox.appendChild(img);
    
                img.onload = function() {
    
                    img.classList.add(config.lightboxImgCls);
    
                }
    
        }
    
    }

    function close() {

        lightbox.classList.remove("active");

        if(lightbox.querySelectorAll(config.lightboxImgSelector)) {
    
            for (j = 0; j < lightbox.querySelectorAll(config.lightboxImgSelector).length; j++) {
    
                lightbox.querySelectorAll(config.lightboxImgSelector)[j].classList.remove(config.lightboxImgCls);
    
            }
    
        }

    }

    function keyPress(event) {

        event = event || window.event;

        if(lightbox.classList.contains("active")) {

            switch(event.keyCode) {

                case 38: next(); break;
                case 40: prev(); break;
                case 37: prev(); break;
                case 39: next(); break;
                case 27: close(); break;

            }
    
        }

    }

    function init() {

        lightbox = document.createElement("div");
        lightbox.className = config.lightboxCls;
        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", close, false);

        lightbox_images = document.querySelectorAll("[data-rel='" + config.lightboxCls + "']");

        for (i = 0; i < lightbox_images.length; i++) {

            lightbox_images[i].dataset.index = i;
        
            lightbox_images[i].addEventListener("click", function(event) {
        
                event.preventDefault();
        
                lightbox.classList.add("active");
        
                if(lightbox.querySelectorAll(config.lightboxImgSelector)) {
        
                    for (j = 0; j < lightbox.querySelectorAll(config.lightboxImgSelector).length; j++) {
        
                        lightbox.querySelectorAll(config.lightboxImgSelector)[j].classList.remove(config.lightboxImgCls);
        
                    }
        
                }
        
                if(lightbox.querySelector(config.lightboxImgSelector + "[data-index='" + this.dataset.index + "']")) {
        
                    lightbox.querySelector(config.lightboxImgSelector + "[data-index='" + this.dataset.index + "']").classList.add(config.lightboxImgCls);
        
                } else {
        
                    var img = new Image();
                        img.src = this.href;
                        img.dataset.index = this.dataset.index;
                        lightbox.appendChild(img);
        
                        img.onload = function() {
        
                            img.classList.add(config.lightboxImgCls);
        
                        } 
        
                }
        
            });
        
        }

        window.addEventListener("keydown", keyPress, false);

    }

    init(); 

}

lightbox();