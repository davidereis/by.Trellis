"use strict";

// ==========================================================================
//                            SCRIPT.JS - TRELLIS SITE
//          Interações avançadas, animações, efeitos 3D e funcionalidades
// ==========================================================================

// Espera o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function() {

  // ========================================================================
  //                           HAMBURGER MENU
  // ========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() {
      navLinks.classList.toggle("nav-active");
      hamburger.classList.toggle("toggle");
    });
  }

  // ========================================================================
  //                      SMOOTH SCROLLING PARA LINKS
  // ========================================================================
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });

  // ========================================================================
  //                           MODAL FUNCTIONALITY
  // ========================================================================
  const modal = document.getElementById("modal-info");
  const modalClose = document.querySelector(".modal-close");

  if (modal) {
    // Exemplo: pode ser aberto via um botão específico (trigger)
    // document.querySelector('.open-modal').addEventListener("click", () => modal.style.display = 'block');
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
    window.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ========================================================================
  //                          CARROSSEL DE PORTFÓLIO
  // ========================================================================
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const nextButton = document.querySelector(".carousel-btn.right");
  const prevButton = document.querySelector(".carousel-btn.left");
  let slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;

  // Posiciona os slides um ao lado do outro
  const setSlidePosition = (slide, index) => {
    slide.style.left = (slideWidth * index) + "px";
  };

  if (slides.length > 0) {
    slides.forEach(setSlidePosition);
  }

  // Função para mover para o slide desejado
  function moveToSlide(currentSlide, targetSlide) {
    if (track && targetSlide) {
      track.style.transform = "translateX(-" + targetSlide.style.left + ")";
      currentSlide.classList.remove("current-slide");
      targetSlide.classList.add("current-slide");
    }
  }

  // Botão Próximo
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide") || slides[0];
      let nextSlide = currentSlide.nextElementSibling;
      if (!nextSlide) {
        nextSlide = slides[0];
      }
      moveToSlide(currentSlide, nextSlide);
    });
  }

  // Botão Anterior
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide") || slides[0];
      let prevSlide = currentSlide.previousElementSibling;
      if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
      }
      moveToSlide(currentSlide, prevSlide);
    });
  }

  // Auto-play do carrossel a cada 5 segundos
  setInterval(() => {
    const currentSlide = track.querySelector(".current-slide") || slides[0];
    let nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) {
      nextSlide = slides[0];
    }
    moveToSlide(currentSlide, nextSlide);
  }, 5000);

  // ========================================================================
  //                     ANIMAÇÕES COM INTERSECTIONObserver
  // ========================================================================
  const observerOptions = {
    threshold: 0.1
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);
  const animatedSections = document.querySelectorAll(".animated-section");
  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // ========================================================================
  //                      EFEITO PARALLAX NO SCROLL
  // ========================================================================
  function parallaxEffect() {
    const parallaxElements = document.querySelectorAll(".parallax-bg");
    parallaxElements.forEach(element => {
      const speed = element.getAttribute("data-speed") || 0.5;
      const yPos = -(window.scrollY * speed);
      element.style.transform = "translateY(" + yPos + "px)";
    });
  }
  window.addEventListener("scroll", parallaxEffect);

  // ========================================================================
  //             ANIMAÇÃO DE FLOATING PARA ELEMENTOS FLUTUANTES
  // ========================================================================
  function floatingAnimation() {
    const floatingElements = document.querySelectorAll(".floating");
    floatingElements.forEach(el => {
      let amplitude = 10; // amplitude do movimento (pixels)
      let frequency = 0.001; // frequência (quanto menor, mais lento)
      let offset = Date.now() * frequency;
      let translateY = Math.sin(offset) * amplitude;
      el.style.transform = "translateY(" + translateY + "px)";
    });
    requestAnimationFrame(floatingAnimation);
  }
  floatingAnimation();

  // ========================================================================
  //                INTERAÇÕES ADICIONAIS - HOVER & CLIQUE
  // ========================================================================
  const interactiveElements = document.querySelectorAll(".btn, .carousel-item, .nav-links a");
  interactiveElements.forEach(el => {
    el.addEventListener("mouseover", () => {
      el.style.transform = "scale(1.02)";
    });
    el.addEventListener("mouseout", () => {
      el.style.transform = "scale(1)";
    });
  });

  // ========================================================================
  //                      LAZY LOADING PARA IMAGENS
  // ========================================================================
  const lazyImages = document.querySelectorAll("img.lazy");
  if ("IntersectionObserver" in window) {
    let lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    // Fallback para navegadores antigos
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    });
  }

  // ========================================================================
  //             ENVIO AVANÇADO DO FORMULÁRIO DE PEDIDO
  // ========================================================================
  const pedidoForm = document.querySelector(".pedido-form");
  if (pedidoForm) {
    pedidoForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const submitButton = pedidoForm.querySelector("button[type='submit']");
      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;
      // Simula uma requisição de rede
      setTimeout(() => {
        alert("Pedido enviado com sucesso!");
        pedidoForm.reset();
        submitButton.textContent = "Enviar Pedido";
        submitButton.disabled = false;
      }, 2000);
    });
  }

  // ========================================================================
  //                 ANIMAÇÕES ADICIONAIS NO SCROLL (ATIVAR CLASSES)
  // ========================================================================
  const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");
  window.addEventListener("scroll", function() {
    animateOnScrollElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("active");
      }
    });
  });

  // ========================================================================
  //                     MELHORIAS DE ACESSIBILIDADE
  // ========================================================================
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      if (modal && modal.style.display === "block") {
        modal.style.display = "none";
      }
    }
  });

  // ========================================================================
  //            FUNÇÃO DE LOG PARA DEBUG E ANALYTICS (EXEMPLO)
  // ========================================================================
  function analyticsLog(event, details) {
    console.log("Analytics Event:", event, details);
  }
  window.addEventListener("load", function() {
    analyticsLog("Page Loaded", { time: performance.now() });
  });

  // ========================================================================
  //          TRATAMENTO DE REDIMENSIONAMENTO - REPOSICIONA SLIDES
  // ========================================================================
  window.addEventListener("resize", function() {
    slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
    slides.forEach(setSlidePosition);
  });

  // ========================================================================
  //              FUNÇÕES ADICIONAIS PARA INTERAÇÕES COMPLEXAS
  // ========================================================================
  // Exemplo: Rotacionar elementos ao rolar a página
  const rotateOnScrollElements = document.querySelectorAll(".rotate-on-scroll");
  window.addEventListener("scroll", function() {
    rotateOnScrollElements.forEach(el => {
      const rotation = window.scrollY / 10;
      el.style.transform = "rotate(" + rotation + "deg)";
    });
  });

  // ========================================================================
  //             EVENTOS DE CLIQUE PARA ELEMENTOS DINÂMICOS
  // ========================================================================
  const dynamicElements = document.querySelectorAll(".dynamic-click");
  dynamicElements.forEach(el => {
    el.addEventListener("click", function() {
      el.classList.toggle("clicked");
      analyticsLog("Dynamic Element Clicked", { element: el });
    });
  });

  // ========================================================================
  //          SIMULAÇÃO DE REQUISIÇÃO PARA CARREGAMENTO DE CONTEÚDO
  // ========================================================================
  function simulateContentLoad(selector, delay) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.transition = "opacity 1s ease-in-out";
        element.style.opacity = "1";
      }, delay);
    }
  }
  simulateContentLoad(".hero-content", 1000);
  simulateContentLoad(".benefits", 1500);
  simulateContentLoad(".carousel", 2000);

  // ========================================================================
  //             FINALIZAÇÃO: LOG DE FINAL DO SCRIPT.JS
  // ========================================================================
  console.log("Script.js carregado e executado com sucesso!");

}); // Fim do DOMContentLoaded

// ==========================================================================
//                          FIM DO ARQUIVO SCRIPT.JS
// ==========================================================================
