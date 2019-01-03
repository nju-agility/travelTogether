/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // Generate a random number.
    const getRandomNumber = (min, max) => (Math.random() * (max - min) + min);
    const body = document.body;
    const winsize = {width: window.innerWidth, height: window.innerHeight};

    class Slide {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.img = this.DOM.el.querySelector('.slide__image');
            this.DOM.title = this.DOM.el.querySelector('.slide__title');
            charming(this.DOM.title);
            this.DOM.titleLetters = Array.from(this.DOM.title.querySelectorAll('span'));
            this.titleLettersTotal = this.DOM.titleLetters.length;
        }
    }

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            this.slides = [];
            this.dothint = [];
            Array.from(this.DOM.el.querySelectorAll('.slide')).forEach(slide => this.slides.push(new Slide(slide)));
            Array.from(this.DOM.el.querySelectorAll('.dot')).forEach(dot => this.dothint.push(dot));

            this.slidesTotal = this.slides.length;
            this.current = 0;
            this.slides[this.current].DOM.el.classList.add('slide--current');
            this.dothint[this.current].classList.add('dot_selected');
            this.navigationCtrls = {
                // next: this.DOM.el.querySelector('.nav > .nav__button--next'),
                // prev: this.DOM.el.querySelector('.nav > .nav__button--previous')
                next: this.DOM.el.querySelector('.nav_dot > .nav_container > .nav_next'),
                prev: this.DOM.el.querySelector('.nav_dot > .nav_container > .nav_previous')
            };
            this.timer = '';
            this.initEvents();
            this.prepareToShow();
        }

        initEvents() {
            const obj = this;
            this.navigationCtrls.next.addEventListener('click', () => {
                this.navigate('next', 'undefined');
                this.stoptimer();
                this.prepareToShow();
            });
            this.navigationCtrls.prev.addEventListener('click', () => {
                this.navigate('prev', 'undefined');
                this.stoptimer();
                this.prepareToShow();
            });
            this.dothint.forEach(function (value, index) {
                value.addEventListener('click', () => {
                    obj.navigate('next', index);
                    obj.stoptimer();
                    obj.prepareToShow();
                    console.log(obj.timer)
                })

            });
            document.addEventListener('keydown', (ev) => {
                const keyCode = ev.keyCode || ev.which;
                if (keyCode === 39) {
                    this.navigate('next');
                } else if (keyCode === 37) {
                    this.navigate('prev');
                }
            });
        }

        prepareToShow() {
            const obj = this;
            function refreshCount() {
                obj.navigate('next', 'undefined');
            }

            obj.timer = window.setInterval(refreshCount, 6000);
        }

        stoptimer() {
            window.clearInterval(this.timer);
        }


        navigate(direction = 'next', nextPos = 'undefined') {
            if (nextPos === this.current) {
                return;
            }
            // if (this.isAnimating) return;
            this.isAnimating = true;
            const currentSlide = this.slides[this.current];
            const currentDot = this.dothint[this.current];

            this.current = nextPos === 'undefined' ? direction === 'next' ? this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
                this.current > 0 ? this.current - 1 : this.slidesTotal - 1 : nextPos;

            const upcomingSlide = this.slides[this.current];
            const upcomingDot = this.dothint[this.current];

            // The elements we will animate.
            const currentImg = currentSlide.DOM.img;
            const currentTitle = currentSlide.DOM.title;
            const currentTitleLetters = currentSlide.DOM.titleLetters;
            const currentTitleLettersTotal = currentSlide.titleLettersTotal;
            const upcomingImg = upcomingSlide.DOM.img;
            const upcomingTitle = upcomingSlide.DOM.title;

            this.tl = new TimelineMax({
                onStart: () => {
                    upcomingSlide.DOM.el.classList.add('slide--current');
                    upcomingDot.classList.add('dot_selected');
                    currentDot.classList.remove('dot_selected');
                },
                onComplete: () => {
                    currentSlide.DOM.el.classList.remove('slide--current');
                    this.isAnimating = false;
                }
            }).add('begin');

            this.tl
                .set(currentImg, {transformOrigin: direction === 'next' ? '100% 50%' : '0% 50%'})
                .set(upcomingTitle, {x: direction === 'next' ? 600 : -600, y: 0, opacity: 0})
                .to(currentImg, 0.3, {
                    ease: Quad.easeOut,
                    scaleX: 2,
                    scaleY: 0.95,
                    opacity: 0.5
                }, 'begin')
                .to(currentImg, 0.4, {
                    ease: Expo.easeOut,
                    x: direction === 'next' ? -1 * winsize.width : winsize.width
                }, 'begin+=0.2')
                .to(currentTitle, 0.2, {
                    ease: Quad.easeOut,
                    x: direction === 'next' ? 8 : -8,
                    y: 2,
                    repeat: 9
                }, 'begin+=0.2')
                .staggerTo(currentTitleLetters.sort((a, b) => 0.5 - Math.random()), 0.2, {
                        ease: Expo.easeOut,
                        cycle: {
                            x: () => direction === 'next' ? getRandomNumber(-800, -400) : getRandomNumber(400, 800),
                            // x: () => direction === 'next' ? getRandomNumber(-1200, -800) : getRandomNumber(800, 1200),
                            y: () => getRandomNumber(-40, 40),
                        },
                        opacity: 0
                    },
                    0.5 / currentTitleLettersTotal, 'begin+=0.3'
                )
                .set(upcomingImg, {
                    transformOrigin: direction === 'next' ? '0% 50%' : '100% 50%',
                    x: direction === 'next' ? winsize.width : -1 * winsize.width,
                    scaleX: 1.5,
                    scaleY: 0.8,
                    opacity: 0.3
                }, 'begin+=0.65')
                .to(upcomingImg, 0.2, {
                    ease: Expo.easeOut,
                    x: 0
                }, 'begin+=0.65')
                .to(upcomingImg, 0.3, {
                    ease: Elastic.easeOut.config(1, 0.7),
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1
                }, 'begin+=0.7')
                .to(upcomingTitle, 0.3, {
                    ease: Elastic.easeOut.config(1, 0.7),
                    x: 0,
                    opacity: 1
                }, 'begin+=0.75')
                .set(currentTitleLetters, {x: 0, y: 0, opacity: 1});

            this.tl.addCallback(() => {
                    body.classList.add('show-deco');
                },
                'begin+=0.2'
            )
            ;

            this.tl.addCallback(() => {
                    body.classList.remove('show-deco');
                },
                'begin+=0.7'
            )
            ;
        }
    }

    new Slideshow(document.querySelector('.slideshow'));

    imagesLoaded(document.querySelectorAll('.slide__image'), {background: true}, () => document.body.classList.remove('loading')
    )
    ;
}
