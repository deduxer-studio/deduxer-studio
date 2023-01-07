/* eslint-disable prettier/prettier */
import { gsap } from 'gsap'

// * Easing
const easeOut = 'power2.inOut'

function navbar() {
  // hamburger menu click function with jquery and gsap

  let tl = gsap.timeline({ paused: true })
  gsap.set('.navbar-background', {
    display: 'flex',
    y: '-100%',
  })
  gsap.set('.navbar-links .char', {
    yPercent: 101,
  })
  gsap.set('.socials-navbar .char', {
    yPercent: 101,
  })
  gsap.set('.navbar-indicator div', {
    yPercent: 101,
  })
  tl.to(
    '.navbar-background',
    {
      y: '0%',
      duration: 1.6,
      ease: easeOut,
    },
    'same'
  )
  .to(
    '.navbar-menu_wrapper',
    {
      height: '75vh',
      duration: 1.2,
      ease: easeOut,
      delay: 0.8,
    },
    'same'
  )
  .to(
    '.navbar-links .char',
    {
      stagger: '0.018',
      yPercent: 0,
      duration: 0.8,
      delay: 1.2,
      ease: 'power2.out',
    },
    'same'
  )
  .to(
    '.socials-navbar .char',
    {
      yPercent: 0,
      duration: 0.6,
      delay: 1.4,
      ease: 'power2.out',
    },
    'same'
  )
  .to(
    '.navbar-indicator div',
    {
      yPercent: 0,
      stagger: { amount: 0.2 },
      duration: 0.9,
      delay: 1.2,
      ease: easeOut,
    },
    'same'
  )
  let state = false
  document.querySelector('.navbar-hamburger').addEventListener('click', function () {
    state = !state
    if (state) {
      tl.timeScale(1)
      tl.play()
    } else {
        tl.timeScale(1.6)
        tl.reverse()
        // play 2x faster
        }

  })

//   const tl = gsap.timeline({ paused: true })



//   $('.navbar-hamburger').on('click', () => {
//     console.log('clicked');
//     $('.component_navbar').toggleClass('active')
//     if ($('.component_navbar').hasClass('active')) {
//       tl.timeScale(1)
//       tl.play()
//     } else {
//       tl.timeScale(1.6)
//       tl.reverse()
//       // play 2x faster
//     }
//   })
}

export function initNavbar() {
    navbar()
}