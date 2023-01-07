/* eslint-disable require-jsdoc */

import { gsap } from 'gsap'
// import Draggable from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper'

import 'swiper/css'
import { initNavbar } from '../components/navbar'

export default function initMobile() {
  gsap.registerPlugin(ScrollTrigger)
  // * Easing
  const easeOut = 'power3.inOut'

  // * Text Split
  new SplitType(
    '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap, .heading-process-card, .main-paragraph-process',
    {
      types: 'words, chars, lines',
      tagName: 'span',
    }
  )
  function Process() {
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top bottom',
        onLeaveBack: () => {
          timeline.progress(0)
          timeline.pause()
        },
      })
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 60%',
        onEnter: () => timeline.play(),
      })
    }

    $('[words-slide-up]').each(function () {
      const tl = gsap.timeline({ paused: true })
      tl.from($(this).find('.word'), {
        yPercent: 101,
        duration: 0.65,
        ease: easeOut,
        stagger: '0.007',
      })
      createScrollTrigger($(this), tl)
    })

    $('[letters-slide-up]').each(function () {
      const tl = gsap.timeline({ paused: true })
      tl.from($(this).find('.char'), {
        yPercent: 101,
        duration: 0.35,
        ease: easeOut,
        stagger: '0.018',
      })
      createScrollTrigger($(this), tl)
    })
    $('.card-lottie').each(function () {
      const tl = gsap.timeline({ paused: true })
      tl.from($(this), {
        yPercent: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power1.inOut',
      })
      createScrollTrigger($(this), tl)
    })
    $('.process-card').each(function () {
      const tl = gsap.timeline({ paused: true })
      tl.from($(this), { scaleY: 0.65, duration: 0.9, ease: easeOut })
      createScrollTrigger($(this), tl)
    })
  }

  function worksEnter() {
    $('.work-card-bg').each(function () {
      gsap.to($(this), {
        clipPath: 'inset(0 0 0% 0)',
        scrollTrigger: {
          trigger: $(this),
        },
        duration: 1.2,
        ease: easeOut,
      })
    })
  }

  function HeroMobile() {
    const tl = gsap.timeline()
    gsap.set('.intro-heading_itself .char', {
      yPercent: 100,
    })

    tl.to('.intro-heading_itself .char', {
      yPercent: 0,
      stagger: '0.018',
      ease: easeOut,
      duration: 1.2,
    }).from('.navbar', {
      yPercent: -100,
      ease: easeOut,
      duration: 1,
    })
  }
  function Clients() {
    const swiper = new Swiper('.clients-slider', {
      // Optional parameters
      speed: 1500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // change slides speed
    })

    $('.swiper-button-next').on('click', () => {
      swiper.slideNext()
    })
    $('.swiper-button-prev').on('click', () => {
      swiper.slidePrev()
    })
  }

  const master = gsap.timeline()
  master
    .add(HeroMobile())
    .add(Clients())
    .add(worksEnter())
    .add(Process())
    .add(initNavbar())
}
