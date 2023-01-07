/* eslint-disable valid-jsdoc */
/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper'

import 'swiper/css'
import { initNavbar } from '../components/navbar'
import { initSmoothScroll } from '../components/smooth'
import initMobile from './indexMobile'

initSmoothScroll()
// * Easing
const easeOut = 'power2.inOut'

// * Functions

/**
 * Client section
 */
function clients() {
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

/**
 * Hero section
 */

function hero() {
  const tl = gsap.timeline()
  gsap.set('.intro-heading_itself .char', {
    yPercent: 100,
  })
  gsap.set('.info__headings-itself .char', {
    yPercent: 105,
  })

  tl.to('.intro-heading_itself .char', {
    yPercent: 0,
    stagger: '0.016',
    ease: 'power2.out',
    duration: 1.15,
  })
  tl.from(
    '.is-nav',
    {
      yPercent: -100,
      ease: easeOut,
      duration: 0.6,
    },
    1
  )
}

/**
 * Footer section
 */

function footer() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.component_footer',
      start: 'top top',
      pin: true,
      scrub: true,
      end: '+=80%',
    },
  })

  tl.from('.footer-bg', {
    scaleX: 1.2,
    borderRadius: 0,
    ease: easeOut,
  })

  function getRandomLetter(length) {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:<>?'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  $('.char').each(function () {
    const text = $(this).text()
    $(this).attr('letter', text)
  })

  $('.letter-wrap').each(function () {
    function resetText() {
      if (myInterval !== undefined) {
        clearInterval(myInterval)
      }
      chars.each(function () {
        const letter = $(this).attr('letter')
        $(this).text(letter)
      })
    }

    let myInterval
    const chars = $(this).find('.char')
    $(this).on('mouseenter', () => {
      let { length } = chars
      myInterval = setInterval(() => {
        chars.each(function (index) {
          if (index < length) {
            const letter = getRandomLetter(1)
            $(this).text(letter)
          } else {
            const letter = $(this).attr('letter')
            $(this).text(letter)
          }
        })
        length -= 1
      }, 100)
      setTimeout(() => {
        resetText()
      }, 600)
    })
    $(this).on('mouseleave', () => {
      resetText()
    })
  })
}

/**
 * Works section
 */

function worksEnter() {
  $('.work-card-bg').each(function () {
    gsap.to($(this), {
      clipPath: 'inset(0% 0 0 0)',
      scrollTrigger: {
        trigger: $(this),
      },
      duration: 1.6,
      ease: easeOut,
    })
  })
}

/**
 * Pin text section
 */

function pinText() {
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

  $('.main-paragraph').each(function () {
    const tl = gsap.timeline({ paused: true })
    tl.from($(this).find('.word'), {
      yPercent: 101,
      duration: 0.65,
      ease: easeOut,
      stagger: '0.007',
    })
    createScrollTrigger($(this), tl)
  })

  // heading animation for each

  $('.info__headings-itself').each(function () {
    const tl = gsap.timeline({ paused: true })
    tl.to($(this).find('.char'), {
      yPercent: 0,
      duration: 1.15,
      stagger: '0.016',
      ease: 'power2.out',
    })
    createScrollTrigger($(this), tl)
  })
  const container = document.querySelector('.horizontal-wrapper')

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: true,
      start: 'top top',
      end: '650%',
    },
  })
  timeline.to(
    '.process-content',
    {
      opacity: 0,
      scale: 0.85,
      transformOrigin: 'left center',
      duration: 0.5,
      ease: easeOut,
    },
    0
  )

  $('.process-card').each(function (index) {
    timeline.to(
      $(this),
      {
        x: '0%',
        ease: 'none',
      },
      index * 0.5
    )
    timeline.to(
      $(this).prev(),
      {
        x: '-90vw',
        ease: 'none',
      },
      index * 0.5
    )
  })
  $('.card-lottie').each(function (index) {
    timeline.to(
      $(this),
      {
        x: '70vw',
        delay: 0.2,
        ease: easeOut,
      },
      index * 0.5
    )
  })

  // ScrollTrigger.create({
  //   trigger: '.section_info',
  //   start: 'top top',
  //   end: '+=450%',

  //   scrub: true,
  //   onUpdate: self => {
  //     currentWaveCount = self.progress * 22
  //     deductionOptions.cam.zoom = self.progress * 5

  //   }
  // })

  // gsap.set('.solution-tooltip', {
  //   xPercent: -50,
  //   yPercent: -50,
  //   scale: 0
  // });

  $('[data-tooltip]').on('mouseenter', function () {
    const tooltip = $(this).attr('data-tooltip')
    $('.tooltip-text').text(tooltip)

    gsap.to($('.tooltip'), {
      scale: 1,
      duration: 0.6,
      ease: 'ease.circle.inOut',
    })
  })
  $('[data-tooltip]').on('mouseleave', function () {
    const tooltip = $(this).attr('data-tooltip')
    $('.tooltip-text').text(tooltip)

    gsap.to($('.tooltip'), {
      scale: 0,
      duration: 0.6,
      ease: 'ease.circle.inOut',
    })
  })
}

/**
 * Links section
 */

function Links() {
  function getRandomLetter(length) {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:<>?'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  $('.char').each(function () {
    const text = $(this).text()
    $(this).attr('letter', text)
  })

  $('.letter-wrap').each(function () {
    function resetText() {
      if (myInterval !== undefined) {
        clearInterval(myInterval)
      }
      chars.each(function () {
        const letter = $(this).attr('letter')
        $(this).text(letter)
      })
    }

    let myInterval
    const chars = $(this).find('.char')
    $(this).on('mouseenter', () => {
      let { length } = chars
      myInterval = setInterval(() => {
        chars.each(function (index) {
          if (index < length) {
            const letter = getRandomLetter(1)
            $(this).text(letter)
          } else {
            const letter = $(this).attr('letter')
            $(this).text(letter)
          }
        })
        length -= 1
      }, 100)
      setTimeout(() => {
        resetText()
      }, 600)
    })
    $(this).on('mouseleave', () => {
      resetText()
    })
  })
}
Links()

/**
 * Init home section
 */

function initHome() {
  if (window.innerWidth < 520) {
    initMobile()
  } else {
    /**
     * Text split
     */
    const split = new SplitType(
      '[text-split], .heading-hero, .hero-content_block, .info__headings-itself, .work-title, .letter-wrap',
      {
        types: 'words, chars, lines',
        tagName: 'span',
      }
    )

    // update split on resize
    window.addEventListener('resize', () => {
      split.revert()
      split.split()
    })
    /**
     * Page transition filter
     */
    gsap.registerPlugin(ScrollTrigger)

    // tooltip follow mouse with gsap

    $(document).on('mousemove', (e) => {
      gsap.to('.tooltip', {
        x: e.clientX,
        y: e.clientY,
      })
    })

    /**
     * Particle
     */

    const master = gsap.timeline()
    master
      .add(hero())
      .add(initNavbar())
      .add(clients())
      .add(footer())
      .add(worksEnter())
      .add(pinText())
  }
  function renderHome() {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const particles = []
    const numObjects = 10
    const slice = (Math.PI * 2) / numObjects
    const colors = ['#C5ABF3', '#DFCEFD', '#7E3AF9']

    class Particle {
      /**
       * コンストラクター
       * @param {Number} x
       * @param {Number} y
       * @param {Number} radius
       * @param {Number} angle
       * @param {Number} distance
       */
      constructor(canvas, radius, angle, distance, color) {
        this.canvas = canvas
        this.radius = radius
        this.angle = angle
        this.distance = distance
        this.color = color
        this.x = 0
        this.y = 0
        this.speed = 0.2
        this.radius = 60 // Double the radius of the particles
      }
      update() {
        this.angle += 0.01
        this.speed += 0.01
        this.x = this.canvas.width / 2 + Math.cos(this.angle) * this.distance
        this.y = this.canvas.height / 2 + Math.sin(this.angle) * this.distance
      }
    }

    ScrollTrigger.create({
      trigger: '.section_introduction',
      start: 'top top',
      end: '+=20%',
      onEnterBack: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 4,
          size2: canvas.width / 4.1,
          x: canvas.width / 1.3,
          y: canvas.height / 2,
          ease: easeOut,
        })
      },
      onLeave: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 8,
          size2: canvas.width / 9,
          x: 0 + canvas.width / 2,
          y: canvas.height / 2,
        })
      },
    })

    ScrollTrigger.create({
      trigger: '.section_process',
      start: 'top top',
      end: '+=20%',
      onEnterBack: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 8,
          size2: canvas.width / 9,
          x: canvas.width / 2,
          y: canvas.height / 2,
          ease: easeOut,
        })
      },
      onLeave: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 2,
          size2: canvas.width / 3,
          x: 0 + canvas.width / 1,
          y: canvas.height / 3,
          ease: easeOut,
        })
      },
    })

    ScrollTrigger.create({
      trigger: '.section_clients',
      start: 'top top',
      end: '+=20%',
      // on leave
      onEnterBack: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 2,
          size2: canvas.width / 3,
          x: canvas.width / 1,
          y: canvas.height / 3,
          ease: easeOut,
        })
      },
      // on enter
      onLeave: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 1.5,
          size2: canvas.width / 3,
          x: 0 + canvas.width / 4,
          y: canvas.height / 1.4,
          ease: easeOut,
        })
      },
    })

    ScrollTrigger.create({
      trigger: '.component_footer',
      start: 'top top',
      end: '+=20%',
      // on leave
      onEnterBack: () => {
        gsap.to(centerLight, {
          duration: 1,
          size: canvas.width / 1.5,
          size2: canvas.width / 3,
          x: 0 + canvas.width / 4,
          y: canvas.height / 1.4,
          ease: easeOut,
        })
      },
      // on enter
      onLeave: () => {
        gsap.to(centerLight, {
          duration: 3,
          size: canvas.width / 1.2,
          size2: canvas.width / 1.2,
          x: 0 + canvas.width / 4,
          y: canvas.height - canvas.height / 1.5,
          ease: easeOut,
        })
      },
    })

    window.onresize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    // RequestAnimationFrame
    ;(function () {
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
      window.requestAnimationFrame = requestAnimationFrame
    })()

    // Utility Function
    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const ballX = canvas.width / 1.3
    const ballY = canvas.height / 1.6
    const centerSize = canvas.width / 6
    const centerSize2 = canvas.width / 6.2
    const centerLight = {
      x: ballX,
      y: ballY,
      size: centerSize,
      size2: centerSize2,
    }
    // Center Ball
    function centerBall(currentX, currentY, currentSize, centerSize2) {
      ctx.beginPath()
      ctx.arc(currentX, currentY, centerSize2, 0, Math.PI * 2)
      const grd = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        currentSize
      )
      // grd.addColorStop(0.004, 'rgba(255, 127, 80, 1.000)');
      // grd.addColorStop(0.324, 'rgba(244, 168, 168, 1.000)');
      // grd.addColorStop(0.692, 'rgba(126, 58, 249, 1.000)');
      // grd.addColorStop(1.000, 'rgba(28, 19, 38, 1.000)');

      // grd.addColorStop(0.004, 'rgba(255, 239, 239, 1.000)');
      // grd.addColorStop(0.324, 'rgba(223, 206, 253, 1.000)');
      // grd.addColorStop(0.692, 'rgba(126, 58, 249, 1.000)');
      // grd.addColorStop(1.000, 'rgba(18, 9, 26, 1.000)');

      grd.addColorStop(0.004, 'rgba(223, 206, 253, 1.000)')
      grd.addColorStop(0.324, 'rgba(197, 171, 243, 1.000)')
      grd.addColorStop(0.692, 'rgba(126, 58, 249, 1.000)')
      grd.addColorStop(1.0, 'rgba(38, 29, 48, 1.000)')
      ctx.fillStyle = grd
      ctx.fill()
    }

    for (let i = 0; i < numObjects; i++) {
      particles.push(
        new Particle(
          canvas,
          Math.random() * 10 + 16,
          i * slice,
          width * Math.random(),
          randomColor(colors)
        )
      )
    }

    render()

    function render() {
      ctx.clearRect(0, 0, width, height)
      centerBall(
        centerLight.x,
        centerLight.y,
        centerLight.size,
        centerLight.size2
      ) // Pass the new center point to the centerBall function
      for (let i = 0; i < numObjects; i++) {
        const p = particles[i]
        p.update()
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.restore()
      }
      requestAnimationFrame(render)
    }
  }
  renderHome()
}

initHome()
