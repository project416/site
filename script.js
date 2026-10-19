document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Изменение стиля хедера при скролле
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Анимация появления элементов при скролле (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15, // Элемент появится, когда покажется на 15%
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Анимируем только один раз
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 3. Кастомный курсор (Только для устройств с мышью)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (!isMobile) {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Отслеживаем позицию мыши
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Мгновенное движение точки
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Плавное движение круга (эффект инерции)
    function animateFollower() {
      // Значение 0.15 задает скорость "догоняния"
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Эффект увеличения при наведении на ссылки и кнопки
    const hoverElements = document.querySelectorAll('a, .btn, .card, .person-card, .feature-item');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('hovered');
      });
    });
  }

  // 4. Плавный скролл для якорных ссылок (с учетом фиксированного хедера)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Игнорируем пустые ссылки
      if (href === "#") return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        // Вычисляем позицию элемента с отступом для хедера
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px доп. отступ
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
