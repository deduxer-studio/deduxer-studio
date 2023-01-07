/* eslint-disable no-unused-vars */
import { gsap } from 'gsap'
import $ from 'jquery'
import SplitType from 'split-type'

import { initSmoothScroll } from '../components/smooth'
import { initNavbar } from './../components/navbar'
import { Slideshow } from './../components/slideshow'

initSmoothScroll()

function initArchive() {
  const split = new SplitType('[text-split]')
  window.onresize = () => {
    split.revert()
    split.split()
  }
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
  initNavbar()

  let tl = gsap.timeline()
  gsap.set('.stack__item', {
    scaleY: 0,
  })
  tl.from('.oh__inner.main .char', {
    duration: 1,
    yPercent: 105,
    ease: 'power2.inOut',
    stagger: '0.018',
  })
    .from(
      '.title__sub .word',
      {
        duration: 1.2,
        yPercent: 101,
        ease: 'expo.out',
        stagger: '0.1',
      },
      'same'
    )
    .to('.stack__item', {
      duration: 1.2,
      scaleY: 1,
      transformOrigin: 'top top',
      ease: 'power2.inOut',
      stagger: '0.15',
      onStart: () => {
        const stack = document.querySelector('.stack')
        const firstDiv = document.createElement('div')
        firstDiv.classList.add('stack__item', 'stack__item--empty')
        stack.prepend(firstDiv)

        const secondDiv = document.createElement('div')
        secondDiv.classList.add('stack__item', 'stack__item--empty')
        stack.append(secondDiv)
      },
    })

  new Slideshow(document.querySelector('.stack'))

  console.log('init archive')
}

initArchive()
