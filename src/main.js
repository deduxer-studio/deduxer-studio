/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-invalid-this */

import './styles/style.css'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupPreloadPlugin from '@swup/preload-plugin'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import Swup from 'swup'

const swup = new Swup({
  plugins: [new SwupPreloadPlugin()],
})

// this event runs for every page view after initial load
swup.on('contentReplaced', function () {
  ScrollTrigger.refresh()
  //update webflow
  if (typeof Webflow === 'object') {
    Webflow.destroy()
    Webflow.ready()
  }
  if (document.querySelector('.is-index')) {
    console.log('is index')
    import('./pages/index').then((module) => {
      module.initHome()
      $('.is-loading').removeClass('is-loading')
    })
  }
  if (document.querySelector('.is-contact')) {
    import('./pages/contact').then((module) => {
      module.initContact()
      document.querySelector('body').classList.remove('is-loading')
    })
    if (!document.querySelector('#multi-step')) {
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/multi-step.js'
      script.async = true
      script.id = 'multi-step'
      document.body.appendChild(script)
    } else {
      console.log('multi-step deleted')
      document.querySelector('#multi-step').remove()
    }
  }
  if (document.querySelector('.is-projects')) {
    console.log('is study')
    import('./pages/case-study.js').then((module) => {
      module.initStudy()
      $('.is-loading').removeClass('is-loading')
    })
  }
})

function killListeners() {
  window.scrollTo(0, 0)
}

swup.on('willReplaceContent', killListeners)
// eslint-disable-next-line require-jsdoc
function copyEmail() {
  $('[data-copy]').each(function () {
    $(this).on('click', function () {
      const email = 'hi@deduxer.studio'
      const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(email)
          console.log('Content copied to clipboard')
        } catch (err) {
          console.error('Failed to copy: ', err)
        }
      }
      copyContent()
      if (document.querySelector('.tooltip')) {
        $('.tooltip-text').text('Copied!')
      }
      if (document.querySelector('.copy-email')) {
        $('.copy-email').text('Copied!')
      }
    })
  })

  //if url is home import and load the initHome function
}
copyEmail()
