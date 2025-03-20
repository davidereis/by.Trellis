import { useCallback } from "react";

export const useParallax = () => {
  // Apply parallax effect to an element
  const applyParallaxEffect = useCallback((element: HTMLElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      // Find elements with parallax data attributes
      const parallaxElements = element.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = Number(htmlEl.dataset.speed || 20);
        const moveX = x * speed;
        const moveY = y * speed;
        
        htmlEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      // Apply subtle rotation to floating elements
      const floatingElements = element.querySelectorAll('.floating');
      
      floatingElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rotateX = y * 10; // degrees
        const rotateY = -x * 10; // degrees
        
        htmlEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };
    
    // Apply scroll-based parallax
    const handleScroll = () => {
      // Get scroll position
      const scrollY = window.scrollY;
      
      // Find elements with scroll-parallax data attributes
      const scrollParallaxElements = element.querySelectorAll('[data-scroll-parallax]');
      
      scrollParallaxElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = Number(htmlEl.dataset.scrollSpeed || 0.1);
        const direction = htmlEl.dataset.direction || 'up';
        
        let translateY;
        if (direction === 'up') {
          translateY = -scrollY * speed;
        } else {
          translateY = scrollY * speed;
        }
        
        htmlEl.style.transform = `translateY(${translateY}px)`;
      });
    };
    
    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Return cleanup function
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return { applyParallaxEffect };
};
