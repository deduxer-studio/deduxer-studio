/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'

import { initSmoothScroll } from '../components/smooth'

/**
 * Main Easing
 */

const easeOut = 'power2.inOut'

/**
 * Text split
 */
const split = new SplitType('[text-split]', {
  types: 'words, chars, lines',
  tagName: 'span',
})

split.split()

/**
 * Case study init
 */

gsap.registerPlugin(ScrollTrigger)

// update split on resize
window.addEventListener('resize', () => {
  split.revert()
  split.split()
})
function Setter() {
  gsap.set(
    '.hero-details_link',
    {
      scale: 0,
      opacity: 0,
    }
  )
  gsap.set(
    '.project-description .word',
    {
      yPercent: 105,
    }
  )
}
function Loader() {
  let loader = gsap.timeline()
  loader.to('.project-cover', {
    duration: 2,
    y: 0,
    scale: 1.2,
    ease: easeOut,
  })
  .to('.project-cover_img', {
    duration: 1,
    scale: 1,
    ease: easeOut,
  }, 2)
  .to('.project-cover', {
    duration: .5,
    scale: 1,
    ease: easeOut,
  }, 2)
  .to('.component_bar', {
    duration: 2,
    x: '0%',
    ease: easeOut,
  }, .5)
  .to('.component_cta', {
    duration: 1,
    x: '50%',
    ease: easeOut,
  }, .5)
  .to('.project_hero-heading .char', {
    duration: 1.2,
    y: '0%',
    stagger: '0.018',
    ease: easeOut,
  }, .5)

return loader
}

function Hero() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.project_hero',
      start: 'top top',
      end: '150%',
      scrub: true,
      pin: true,
    },
  })
  tl.to(
    '.project_hero-overlap',
    {
      duration: 1.5,
      x: '0%',
    },
    'same'
  )
  .to(
    '.project_hero-bg',
    {
      duration: 1.4,
      scale: 1.4,
      ease: easeOut,
    },
    'same'
  )
  .to(
    '.project-cover_overlay',
    {
      duration: 2,
      opacity: 0.6,
      ease: easeOut,
    },
    'same'
  )
  const description = gsap.timeline({ paused: true })

  description.to(
    '.project-description .word',
    {
      yPercent: 0,
      duration: 0.85,
      ease: easeOut,
      stagger: '0.007',
    },
    'same'
  )
  .to(
    '.hero-details_link',
    {
      scale: 1,
      opacity: 1,
      duration: 0.85,
    },
    'same'
  )
  ScrollTrigger.create({
    trigger: '.project-description',
    start: 'right 40%',
    onEnter: () => {
      description.play()
    },
    onLeaveBack: () => {
      description.reverse()
    },
  })
}

function Mac() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.project_mockup_mac',
      start: 'top top',
      end: '+=80%',
      scrub: true,
      pin: true,
    },
  })
  tl.to(
    '.mock-screen',
    {
      y: '-30%',
      duration: 1,
      ease: 'sine.out',
    },
    'same'
  )
  tl.to(
    '.project_mac-wrapper',
    {
      y: '18%',
      ease: 'sine.out',
      duration: 1,
    },
    'same'
  )
}

function LeftBar() {
  const switcher = gsap.timeline({ paused: true })
  gsap.set('.is-back', {
    yPercent: 0,
    opacity: 1,
  })
  gsap.set('.is-back .bar-content_item .char', {
    yPercent: -100,
  })
  switcher.to(
    '.is-scroll .bar-content_item .char',
    {
      yPercent: 101,
      stagger: '0.04',
      duration: 0.6,
      ease: easeOut,
    },
    'same'
  )
  switcher.to(
    '.is-back .bar-content_item .char',
    {
      yPercent: 0,
      stagger: '0.04',
      duration: 0.6,
      ease: easeOut,
    },
    'same'
  )
  ScrollTrigger.create({
    trigger: '.project_information',
    top: 'top top',
    start: 'top top',
    onEnter: () => {
      console.log('enter')
      switcher.play()
    },
    onLeaveBack: () => {
      console.log('leave')
      switcher.reverse()
    },
  })
}

function StickyBars() {
  $('section').each(function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this).find('.project_bar'),
        start: 'top top',
        // end at the end of section
        end: () => `+=${$(this).outerHeight()}`,
        pinSpacing: false,
        scrub: true,
        pin: true,
      },
    })
  })

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
}

function landing() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.project_landing',
      start: 'top top',
      end: '+=40%',
      scrub: true,
    },
  })
  tl.to(
    '.landing-bg',
    {
      opacity: 0.2,
      duration: 0.2,
      ease: easeOut,
      filter: 'blur(10px)',
    },
    0
  )
}

function interactive() {
  //import bg image for each importer-image in importer and set it as background for each interactive-image
  $('.importer-image').each(function (index) {
    let url = $(this).css('background-image')
    $('.interactive-image_wrapper').eq(index).css('background-image', url)
  })
  $('.image-container, .landing-itself').each(function (index) {
    gsap.from($(this), {
      scrollTrigger: {
        trigger: $(this),
      },
      opacity: 0,
      scale: 0.95,
      duration: 1.6,
      ease: easeOut,
    })
  })
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.project_interactive',
      start: 'top top',
      pin: true,
      end: '160%',
      scrub: true,
    },
  })
  tl.to(
    '.interactive-col_inner.is-first .interactive-image_wrapper',
    {
      scale: 0.8,
      duration: 1,
      //random stagger from 0 to 0.5
      stagger: 0.1,
      ease: easeOut,
      yPercent: -150,
    },
    'same'
  )
  tl.to(
    '.interactive-col_inner.is-second .interactive-image_wrapper',
    {
      scale: 0.3,
      ease: easeOut,
      duration: 1,
      stagger: 0.1,
      yPercent: -50,
    },
    'same'
  )
  tl.to(
    '.interactive-flex',
    {
      scale: 1,
      ease: easeOut,
      duration: 1,
    },
    'same'
  )
}

function next() {
  gsap.set('.scroll-text', {
    clipPath: 'inset(0 100% 0 0)',
  })

  //hover effect
  document.querySelector('.next-content').addEventListener('mouseenter', () => {
    gsap.to('.scroll-text', {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: easeOut,
    })
    gsap.to('.next-image', {
      y: '45vh',
      duration: 1.4,
      ease: easeOut,
    })
    gsap.to('.next-image-itself', {
      scale: 1.1,
      duration: 1.15,
      ease: easeOut,
    })
  }
  )
  document.querySelector('.next-content').addEventListener('mouseleave', () => {
    gsap.to('.scroll-text', {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.8,
      ease: easeOut,
    })
    gsap.to('.next-image', {
      y: '60vh',
      duration: 0.8,
      ease: easeOut,
    })
    gsap.to('.next-image-itself', {
      scale: 1,
      duration: .6,
      ease: easeOut,
    })
  }
  )
}

function initDesktop() {
  const master = gsap.timeline()
  master.add(Setter()).add(Loader()).add(Mac()).add(Hero()).add(StickyBars()).add(LeftBar()).add(landing()).add(interactive()).add(next())

}

function initMobile() {
  const master = gsap.timeline()
  master.add(Loader()).add(Mac()).add(StickyBars()).add(LeftBar()).add(landing()).add(interactive())
}

function initStudy() {
  if (window.innerWidth < 768) {
    initMobile()
  } else {
    initDesktop()
  }
}

initStudy()

