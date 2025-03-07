const Dialog = document.getElementById('navDialog');

function handleMenu()
{
  Dialog.classList.toggle('hidden');
}

const initialTranslateLTR = -48*4;
const initialTranslateRTL = 36*4;

function setupIntersectionObserver(element, isLTR, speed)
{
  const intersectioncallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if(isIntersecting){
      document.addEventListener('scroll', scrollHandler);
    }
    else {
      document.removeEventListener('scroll', scrollHandler);
    }
    
  }
  let intersectionObserver = new IntersectionObserver(intersectioncallback);

  intersectionObserver.observe(element);

  function scrollHandler()
  {
    const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;
    let totalTranslate = 0;
    if(isLTR){
         totalTranslate = translateX + initialTranslateLTR;
    }
    else{
      totalTranslate = -(translateX + initialTranslateRTL);
    }
    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);

const dtElement = document.querySelectorAll('dt');
dtElement.forEach(element =>{
  element.addEventListener('click', () => {
    const ddId = element.getAttribute('aria-controls');
    const ddElement  = document.getElementById(ddId);
    const ddArrowIcon = ddElement.querySelectorAll('i')[0];

    ddElement.classList.toggle('hidden');
    ddArrowIcon.classList.toggle('rotate-180');
  })
})