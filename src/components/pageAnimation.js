/* eslint-disable */
import barba from "@barba/core";
import { gsap } from "gsap";
import $ from "jquery";

export function animationEnter(container) {
  let tl = gsap.timeline();
  tl.set(".loader", {
    display: "none",
  });
  if (document.querySelector(".mesh")) {
    tl.to(
      ".mesh",
      {
        opacity: 1,
        scale: 1,
        delay: 1.2,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "same"
    );
  }
  return tl;
}

export function animationOut(container) {}

export function animationOnce(duration) {
  // barba page loader homepage transition

  let tl = gsap.timeline();
  tl.to("#logo-loader", {
    clipPath: "inset(0 0 0% 0)",
    // loading time duration
    duration: duration,
    ease: "expo.inOut",
  });
  tl.to(
    ".close-mask",
    {
      height: "100%",
      delay: 0.4,
      duration: 0.65,
      ease: "quad.out",
    },
    "same"
  );
  tl.to(
    ".loader-logo",
    {
      scale: 1.12,
      delay: 0.2,
      duration: 0.45,
      ease: "sine.inOut",
    },
    "same"
  );
  tl.to(".loader-logo", {
    display: "none",
    duration: 0,
  });
  tl.to(
    ".loader-col",
    {
      y: "-100%",
      stagger: 0.4,
      duration: 1.5,
      ease: "power2.inOut",
    },
    "same"
  );
  if (document.querySelector(".mesh")) {
    tl.to(
      ".mesh",
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "same"
    );
  }
  tl.to(
    ".page-wrapper",
    {
      delay: duration - 0.5,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut",
    },
    "same"
  );
  tl.set(".loader", {
    display: "none",
    duration: 0,
  });
}
