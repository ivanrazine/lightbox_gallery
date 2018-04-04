/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
 
/////////////////////////////////////////////////////
////// LIGHTBOX GALLERY
/////////////////////////////////////////////////////

var lightbox_images = document.querySelectorAll("[data-rel='lightbox']");

var lightbox_index = void 0,
    origin = void 0; 

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

            imagesLoaded(img, function( instance ) {
                imgBox.classList.add("fade-in");
                spinner.classList.add("hidden");
            });

        }

    });

}

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

        imagesLoaded(img, function( instance ) {
            imgBox.classList.add("fade-in");
            spinner.classList.add("hidden");
        });

    }

}

function keyPress(e) {

    e = e || window.event;

    if(lightbox.classList.contains("active")) {

        if (e.keyCode == '37') {
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

lightbox.addEventListener("click", close, false);

document.addEventListener("keydown", keyPress, false);

lightbox.addEventListener("touchstart", function(event) {

    origin = event.touches[0].clientX;

});

lightbox.addEventListener("touchend", function(event) {

    var end = event.changedTouches[0].clientX;
    origin > end + 60 ? next() : origin < end - 60 && prev();

});