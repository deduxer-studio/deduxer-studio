/* eslint-disable require-jsdoc */
import { gsap } from 'gsap'
import $ from 'jquery'
import SplitType from 'split-type'

import { initNavbar } from '../components/navbar'
import { initSmoothScroll } from '../components/smooth'

initSmoothScroll()
function initContact() {
  let easeOut = 'power3.inOut'

  new SplitType('[text-split], .heading-contact', {
    types: 'words, chars, lines',
    tagName: 'span',
  })

  function Links() {
    function getRandomLetter(length) {
      let result = ''
      const characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:<>?'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
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

  function Hero() {
    let tl = gsap.timeline()
    gsap.set(
      '.heading-contact.default .char, .heading-contact.not-filled .char, .heading-contact.active .char',
      {
        yPercent: 101,
      }
    )
    gsap.set('.heading-contact.sent-message .char', {
      yPercent: -101,
    })
    tl.to(
      '.heading-contact.default .char',
      {
        yPercent: 0,
        stagger: '0.018',
        duration: 1,
        ease: easeOut,
      },
      'same'
    )
    tl.to(
      '.heading-contact.not-filled .char',
      {
        yPercent: 0,
        stagger: '0.018',
        duration: 1,
        delay: 0.6,
        ease: easeOut,
      },
      'same'
    )
    tl.to(
      '.heading-contact.active .char',
      {
        yPercent: 0,
        duration: 1,
        delay: 0.6,
        stagger: '0.018',
        ease: easeOut,
      },
      'same'
    )
    tl.from(
      '.form-wrapper',
      {
        y: '5rem',
        opacity: 0,
        duration: 1.2,
        ease: easeOut,
      },
      1
    )
    return tl
  }

  function Progress() {
    let bar = $('.progress-block_loading')
    const total = $('.form-step').length + 1
    $('.progress-block_loading').css('width', $('.heading-contact.active'))
    $('.next-button,  .back-button ').on('click', function () {
      $('.form-step').each(function (index) {
        if ($(this).css('display') == 'none') {
          /* empty */
        } else {
          gsap.to(bar, {
            duration: 1,
            ease: easeOut,
            width: (index / total) * 100 + '%',
          })
        }
      })
    })
    //event listener for form submit
    $('.submit-button').on('click', function () {
      let tl = gsap.timeline({ paused: true })
      gsap.set('.heading-contact.sent .char', {
        yPercent: 101,
      })
      tl.to(
        '.heading-contact.sent .char',
        {
          yPercent: 0,
          stagger: '0.018',
          duration: 1,
          ease: easeOut,
        },
        'message'
      )
      tl.to(
        '.heading-contact.default .char',
        {
          yPercent: 101,
          stagger: '0.018',
          duration: 1,
          ease: easeOut,
        },
        'message'
      )
      tl.to(
        '.heading-contact.sent-message .char',
        {
          yPercent: 0,
          stagger: '0.018',
          duration: 1,
          ease: easeOut,
          delay: 0.89,
        },
        'message'
      )
      tl.to('.success-message', {
        opacity: 1,
        duration: 0.8,
        ease: easeOut,
      })
      if ($('.w-form-fail').css('display') === 'none') {
        tl.play()
      }
    })
  }
  initNavbar()
  if (window.innerWidth < 768) {
    Hero()
    Progress()
  } else {
    Hero()
    Progress()
  }
}

initContact()
