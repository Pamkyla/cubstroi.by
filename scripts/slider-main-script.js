! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Siema", [], t) : "object" == typeof exports ? exports.Siema = t() : e.Siema = t()
}("undefined" != typeof self ? self : this, function () {
    return function (e) {
        function t(r) {
            if (i[r]) return i[r].exports;
            let n = i[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }
        let i = {};
        return t.m = e, t.c = i, t.d = function (e, i, r) {
            t.o(e, i) || Object.defineProperty(e, i, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function (e) {
            let i = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(i, "a", i), i
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 0)
    }([function (e, t, i) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            s = function () {
                function e(e, t) {
                    for (let i = 0; i < t.length; i++) {
                        let r = t[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function (t, i, r) {
                    return i && e(t.prototype, i), r && e(t, r), t
                }
            }(),
            l = function () {
                function e(t) {
                    let i = this;
                    if (r(this, e), this.config = e.mergeSettings(t), this.selector = "string" == typeof this.config.selector ? document.querySelector(this.config.selector) : this.config.selector, null === this.selector) throw new Error("Something wrong with your selector рџ­");
                    this.resolveSlidesNumber(), this.selectorWidth = this.selector.offsetWidth, this.innerElements = [].slice.call(this.selector.children), this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage)), this.transformProperty = e.webkitOrNot(), ["resizeHandler", "touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler", "clickHandler"].forEach(function (e) {
                        i[e] = i[e].bind(i)
                    }), this.init()
                }
                return s(e, [{
                    key: "attachEvents",
                    value: function () {
                        window.addEventListener("resize", this.resizeHandler), this.config.draggable && (this.pointerDown = !1, this.drag = {
                            startX: 0,
                            endX: 0,
                            startY: 0,
                            letItGo: null,
                            preventClick: !1
                        }, this.selector.addEventListener("touchstart", this.touchstartHandler), this.selector.addEventListener("touchend", this.touchendHandler), this.selector.addEventListener("touchmove", this.touchmoveHandler), this.selector.addEventListener("mousedown", this.mousedownHandler), this.selector.addEventListener("mouseup", this.mouseupHandler), this.selector.addEventListener("mouseleave", this.mouseleaveHandler), this.selector.addEventListener("mousemove", this.mousemoveHandler), this.selector.addEventListener("click", this.clickHandler))
                    }
                }, {
                    key: "detachEvents",
                    value: function () {
                        window.removeEventListener("resize", this.resizeHandler), this.selector.removeEventListener("touchstart", this.touchstartHandler), this.selector.removeEventListener("touchend", this.touchendHandler), this.selector.removeEventListener("touchmove", this.touchmoveHandler), this.selector.removeEventListener("mousedown", this.mousedownHandler), this.selector.removeEventListener("mouseup", this.mouseupHandler), this.selector.removeEventListener("mouseleave", this.mouseleaveHandler), this.selector.removeEventListener("mousemove", this.mousemoveHandler), this.selector.removeEventListener("click", this.clickHandler)
                    }
                }, {
                    key: "init",
                    value: function () {
                        this.attachEvents(), this.selector.style.overflow = "hidden", this.selector.style.direction = this.config.rtl ? "rtl" : "ltr", this.buildSliderFrame(), this.config.onInit.call(this)
                    }
                }, {
                    key: "buildSliderFrame",
                    value: function () {
                        let e = this.selectorWidth / this.perPage,
                            t = this.config.loop ? this.innerElements.length + 2 * this.perPage : this.innerElements.length;
                        this.sliderFrame = document.createElement("div"), this.sliderFrame.style.width = e * t + "px", this.enableTransition(), this.config.draggable && (this.selector.style.cursor = "-webkit-grab");
                        let i = document.createDocumentFragment();
                        if (this.config.loop)
                            for (let r = this.innerElements.length - this.perPage; r < this.innerElements.length; r++) {
                                let n = this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));
                                i.appendChild(n)
                            }
                        for (let s = 0; s < this.innerElements.length; s++) {
                            let l = this.buildSliderFrameItem(this.innerElements[s]);
                            i.appendChild(l)
                        }
                        if (this.config.loop)
                            for (let o = 0; o < this.perPage; o++) {
                                let a = this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));
                                i.appendChild(a)
                            }
                        this.sliderFrame.appendChild(i), this.selector.innerHTML = "", this.selector.appendChild(this.sliderFrame), this.slideToCurrent()
                    }
                }, {
                    key: "buildSliderFrameItem",
                    value: function (e) {
                        let t = document.createElement("div");
                        return t.style.cssFloat = this.config.rtl ? "right" : "left", t.style.float = this.config.rtl ? "right" : "left", t.style.width = (this.config.loop ? 100 / (this.innerElements.length + 2 * this.perPage) : 100 / this.innerElements.length) + "%", t.appendChild(e), t
                    }
                }, {
                    key: "resolveSlidesNumber",
                    value: function () {
                        if ("number" == typeof this.config.perPage) this.perPage = this.config.perPage;
                        else if ("object" === n(this.config.perPage)) {
                            this.perPage = 1;
                            for (let e in this.config.perPage) window.innerWidth >= e && (this.perPage = this.config.perPage[e])
                        }
                    }
                }, {
                    key: "prev",
                    value: function () {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                            t = arguments[1];
                        if (!(this.innerElements.length <= this.perPage)) {
                            let i = this.currentSlide;
                            if (this.config.loop) {
                                if (this.currentSlide - e < 0) {
                                    this.disableTransition();
                                    let r = this.currentSlide + this.innerElements.length,
                                        n = this.perPage,
                                        s = r + n,
                                        l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage),
                                        o = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                                    this.sliderFrame.style[this.transformProperty] = "translate3d(" + (l + o) + "px, 0, 0)", this.currentSlide = r - e
                                } else this.currentSlide = this.currentSlide - e
                            } else this.currentSlide = Math.max(this.currentSlide - e, 0);
                            i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this))
                        }
                    }
                }, {
                    key: "next",
                    value: function () {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                            t = arguments[1];
                        if (!(this.innerElements.length <= this.perPage)) {
                            let i = this.currentSlide;
                            if (this.config.loop) {
                                if (this.currentSlide + e > this.innerElements.length - this.perPage) {

                                    this.disableTransition();
                                    let r = this.currentSlide - this.innerElements.length,
                                        n = this.perPage,
                                        s = r + n,
                                        l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage),
                                        o = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                                    this.sliderFrame.style[this.transformProperty] = "translate3d(" + (l + o) + "px, 0, 0)", this.currentSlide = r + e
                                } else this.currentSlide = this.currentSlide + e

                            } else this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.perPage);
                            i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this))
                        }
                    }
                }, {
                    key: "disableTransition",
                    value: function () {
                        this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing
                    }
                }, {
                    key: "enableTransition",
                    value: function () {
                        this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing
                    }
                }, {
                    key: "goTo",
                    value: function (e, t) {
                        if (!(this.innerElements.length <= this.perPage)) {
                            let i = this.currentSlide;
                            this.currentSlide = this.config.loop ? e % this.innerElements.length : Math.min(Math.max(e, 0), this.innerElements.length - this.perPage), i !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), t && t.call(this))
                        }
                    }
                }, {
                    key: "slideToCurrent",
                    value: function (e) {
                        let t = this,
                            i = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                            r = (this.config.rtl ? 1 : -1) * i * (this.selectorWidth / this.perPage);
                        e ? requestAnimationFrame(function () {
                            requestAnimationFrame(function () {
                                t.enableTransition(), t.sliderFrame.style[t.transformProperty] = "translate3d(" + r + "px, 0, 0)"
                            })
                        }) : this.sliderFrame.style[this.transformProperty] = "translate3d(" + r + "px, 0, 0)"
                    }
                }, {
                    key: "updateAfterDrag",
                    value: function () {
                        let e = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX),
                            t = Math.abs(e),
                            i = this.config.multipleDrag ? Math.ceil(t / (this.selectorWidth / this.perPage)) : 1,
                            r = e > 0 && this.currentSlide - i < 0,
                            n = e < 0 && this.currentSlide + i > this.innerElements.length - this.perPage;
                        e > 0 && t > this.config.threshold && this.innerElements.length > this.perPage ? this.prev(i) : e < 0 && t > this.config.threshold && this.innerElements.length > this.perPage && this.next(i), this.slideToCurrent(r || n)
                    }
                }, {
                    key: "resizeHandler",
                    value: function () {
                        this.resolveSlidesNumber(), this.currentSlide + this.perPage > this.innerElements.length && (this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage), this.selectorWidth = this.selector.offsetWidth, this.buildSliderFrame()
                    }
                }, {
                    key: "clearDrag",
                    value: function () {
                        this.drag = {
                            startX: 0,
                            endX: 0,
                            startY: 0,
                            letItGo: null,
                            preventClick: this.drag.preventClick
                        }
                    }
                }, {
                    key: "touchstartHandler",
                    value: function (e) {
                        -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) || (e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.touches[0].pageX, this.drag.startY = e.touches[0].pageY)
                    }
                }, {
                    key: "touchendHandler",
                    value: function (e) {
                        e.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag()
                    }
                }, {
                    key: "touchmoveHandler",
                    value: function (e) {
                        if (e.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)), this.pointerDown && this.drag.letItGo) {
                            e.preventDefault(), this.drag.endX = e.touches[0].pageX, this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
                            let t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                                i = t * (this.selectorWidth / this.perPage),
                                r = this.drag.endX - this.drag.startX,
                                n = this.config.rtl ? i + r : i - r;
                            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * n + "px, 0, 0)"
                        }
                    }
                }, {
                    key: "mousedownHandler",
                    value: function (e) {
                        -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) || (e.preventDefault(), e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.pageX)
                    }
                }, {
                    key: "mouseupHandler",
                    value: function (e) {
                        e.stopPropagation(), this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag()
                    }
                }, {
                    key: "mousemoveHandler",
                    value: function (e) {
                        if (e.preventDefault(), this.pointerDown) {
                            "A" === e.target.nodeName && (this.drag.preventClick = !0), this.drag.endX = e.pageX, this.selector.style.cursor = "-webkit-grabbing", this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
                            let t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                                i = t * (this.selectorWidth / this.perPage),
                                r = this.drag.endX - this.drag.startX,
                                n = this.config.rtl ? i + r : i - r;
                            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * n + "px, 0, 0)"
                        }
                    }
                }, {
                    key: "mouseleaveHandler",
                    value: function (e) {
                        this.pointerDown && (this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.drag.endX = e.pageX, this.drag.preventClick = !1, this.enableTransition(), this.updateAfterDrag(), this.clearDrag())
                    }
                }, {
                    key: "clickHandler",
                    value: function (e) {
                        this.drag.preventClick && e.preventDefault(), this.drag.preventClick = !1
                    }
                }, {
                    key: "remove",
                    value: function (e, t) {
                        if (e < 0 || e >= this.innerElements.length) throw new Error("Item to remove doesn't exist рџ­");
                        let i = e < this.currentSlide,
                            r = this.currentSlide + this.perPage - 1 === e;
                        (i || r) && this.currentSlide--, this.innerElements.splice(e, 1), this.buildSliderFrame(), t && t.call(this)
                    }
                }, {
                    key: "insert",
                    value: function (e, t, i) {
                        if (t < 0 || t > this.innerElements.length + 1) throw new Error("Unable to inset it at this index рџ­");
                        if (-1 !== this.innerElements.indexOf(e)) throw new Error("The same item in a carousel? Really? Nope рџ­");
                        let r = t <= this.currentSlide > 0 && this.innerElements.length;
                        this.currentSlide = r ? this.currentSlide + 1 : this.currentSlide, this.innerElements.splice(t, 0, e), this.buildSliderFrame(), i && i.call(this)
                    }
                }, {
                    key: "prepend",
                    value: function (e, t) {
                        this.insert(e, 0), t && t.call(this)
                    }
                }, {
                    key: "append",
                    value: function (e, t) {
                        this.insert(e, this.innerElements.length + 1), t && t.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                            t = arguments[1];
                        if (this.detachEvents(), this.selector.style.cursor = "auto", e) {
                            for (let i = document.createDocumentFragment(), r = 0; r < this.innerElements.length; r++) i.appendChild(this.innerElements[r]);
                            this.selector.innerHTML = "", this.selector.appendChild(i), this.selector.removeAttribute("style")
                        }
                        t && t.call(this)
                    }
                }], [{
                    key: "mergeSettings",
                    value: function (e) {
                        let t = {
                                selector: ".siema",
                                duration: 200,
                                easing: "ease-out",
                                perPage: 1,
                                startIndex: 0,
                                draggable: !0,
                                multipleDrag: !0,
                                threshold: 20,
                                loop: !1,
                                rtl: !1,
                                onInit: function () {},
                                onChange: function () {}
                            },
                            i = e;
                        for (let r in i) t[r] = i[r];
                        return t
                    }
                }, {
                    key: "webkitOrNot",
                    value: function () {
                        return "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform"
                    }
                }]), e
            }();
        t.default = l, e.exports = t.default
    }])
});

// extend a Siema class by two methods
// addDots - to create a markup for dots
// updateDots - to update classes on dots on change callback
class SiemaSlider extends Siema {
    initSlideBtn(selector) {
        document.querySelector(`${selector} .siema__prev`).addEventListener('click', () => {
            this.prev()
        });
        document.querySelector(`${selector} .siema__next`).addEventListener('click', () => {
            this.next()
        });
    }
    currentSlde(selector) {
        document.querySelector(`${selector} .current-number`).innerHTML = this.currentSlide + 1;
        document.querySelector(`${selector} .max-number`).innerHTML = this.innerElements.length;
    }
    initScrollBar() {
        if (!this.config.scrollBar) {
            return;
        }
        // Контейнер для скроллбара
        this.scrollBarWrapper = document.createElement('div');
        this.scrollBarWrapper.classList.add('scroll-bar-wrapper');
        // Скроллбар 
        this.scrollBarExtender = document.createElement('div');
        this.scrollBarExtender.classList.add('scroll-bar-extender');
        this.selector.parentNode.after(this.scrollBarWrapper);
        this.scrollBarExtender.style.width = `${Math.ceil(this.currentSlide/this.innerElements.length*100)+1}%`;
        this.scrollBarWrapper.appendChild(this.scrollBarExtender);
        // Блок поверх скроллбара, чтобы правильно работал mouseout
        this.scrollBarOver = document.createElement('div');
        this.scrollBarOver.classList.add('scroll-bar-over');
        this.scrollBarWrapper.appendChild(this.scrollBarOver);
        // Величина для последовательных ивентов
        let grab = 0;
        // Нажатие
        this.scrollBarWrapper.addEventListener('pointerdown', (event) => {
            grab = 1;
            this.moveScrollBar(event);
        });
        // Движение
        this.scrollBarWrapper.addEventListener('pointermove', (event) => {
            if (grab == 1) {
                this.moveScrollBar(event);
            }
        });
        // Выход за элемент
        this.scrollBarWrapper.addEventListener('mouseout', () => {
            grab = 0;
        });
        // Отпускание
        this.scrollBarWrapper.addEventListener('pointerup', (event) => {
            grab = 0;
            this.moveScrollBar(event);
        });
    }
    // Функция перелистывания для скроллбара
    moveScrollBar(event) {
        let scrollBarWrapper = document.querySelector('.scroll-bar-wrapper');
        let i = `${Math.ceil(Math.ceil(((event.x-scrollBarWrapper.offsetLeft)/scrollBarWrapper.offsetWidth*100))*this.innerElements.length/100)-1}`;
        if (i == -1) {
            i = 0;
        }
        this.goTo(i);
    }
    // Функция заполенения скроллбара при перелистывании 
    updateScrollBar() {
        if (!this.config.scrollBar) {
            return;
        }
        let scrollBarExtender = document.querySelector('.scroll-bar-extender');
        scrollBarExtender.style.width = `${Math.ceil(this.currentSlide/(this.innerElements.length-1)*100)}%`;
    }
    addDots() {
        if (!this.config.dots) {
            return;
        }
        // create a contnier for all dots
        // add a class 'dots' for styling reason
        this.dots = document.createElement('div');
        this.dots.classList.add('pagination');
        // loop through slides to create a number of dots
        for (let i = 0; i < this.innerElements.length; i++) { // create a dot 
            const dot = document.createElement('button');
            // add a class to dot 
            dot.classList.add('pagination__item');
            // add an event handler to each of them 
            dot.addEventListener('click', () => {
                this.goTo(i);
            })
            // append dot to a container for all of them
            this.dots.appendChild(dot);
        }
        // add the container full of dots after selector
        this.selector.parentNode.after(this.dots);
    }
    updateDots() {
        if (!this.config.dots) {
            return;
        }
        // loop through all dots
        for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
            // if current dot matches currentSlide prop, add a class to it, remove otherwise
            const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
            this.dots.querySelectorAll('button')[i].classList[addOrRemove]('pagination__item--active');
        }
    }
}