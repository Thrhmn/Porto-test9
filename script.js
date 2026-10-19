(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false');
    }));
  }
  const carousel = document.querySelector('#project-carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.project-slide')];
    const dots = [...carousel.querySelectorAll('.carousel-dot')];
    const current = document.querySelector('#slide-current');
    const previous = document.querySelector('#carousel-prev');
    const next = document.querySelector('#carousel-next');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = 0, timer = null, paused = false;
    const show = index => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === active);
        slide.setAttribute('aria-hidden', String(i !== active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === active);
        dot.setAttribute('aria-pressed', String(i === active));
      });
      if (current) current.textContent = String(active + 1).padStart(2, '0');
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const start = () => {
      stop(); if (reducedMotion || paused || document.hidden) return;
      timer = setInterval(() => show(active + 1), 6000);
    };
    previous?.addEventListener('click', () => { show(active - 1); start(); });
    next?.addEventListener('click', () => { show(active + 1); start(); });
    dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.go)); start(); }));
    carousel.addEventListener('mouseenter', () => { paused = true; stop(); });
    carousel.addEventListener('mouseleave', () => { paused = false; start(); });
    carousel.addEventListener('focusin', () => { paused = true; stop(); });
    carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { paused = false; start(); } });
    document.addEventListener('visibilitychange', start);
    let touchStart = null;
    carousel.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; stop(); }, {passive:true});
    carousel.addEventListener('touchend', e => {
      if (touchStart !== null) { const dx = e.changedTouches[0].clientX - touchStart; if (Math.abs(dx) > 45) show(active + (dx < 0 ? 1 : -1)); }
      touchStart = null; start();
    }, {passive:true});
    show(0); start();
  }
  const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
})();

/* ---- Contact form ----
   Isi salah satu:
   - data-endpoint di <form id="contact-form"> (mis. https://formspree.io/f/XXXXXXXX) -> pesan terkirim langsung dari website
   - data-email (fallback) -> membuka aplikasi email pengunjung dengan pesan terisi */
(function(){
  var form=document.getElementById('contact-form'); if(!form) return;
  var status=document.getElementById('form-status');
  var btn=form.querySelector('button[type="submit"]');
  function say(msg,cls){status.textContent=msg;status.className='form-status'+(cls?' '+cls:'');}
  form.addEventListener('input',function(e){ if(e.target.classList) e.target.classList.remove('is-invalid'); });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements, ok=true;
    ['name','email','message'].forEach(function(n){
      var el=f[n], bad=!el.value.trim() || (n==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.classList.toggle('is-invalid',bad); if(bad) ok=false;
    });
    if(!ok){say('Please fill in your name, a valid email, and a message.','is-error');return;}
    if(f._gotcha.value){return;}
    var endpoint=(form.dataset.endpoint||'').trim();
    if(endpoint){
      btn.disabled=true; say('Sending…');
      fetch(endpoint,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(r){ if(!r.ok) throw new Error(); form.reset(); say('Thank you! Your message has been sent.','is-ok'); })
        .catch(function(){ say('Could not send right now. Please try again later.','is-error'); })
        .then(function(){ btn.disabled=false; });
    } else {
      var to=form.dataset.email;
      var subject=encodeURIComponent('Portfolio inquiry from '+f.name.value.trim());
      var body=encodeURIComponent(f.message.value.trim()+'\n\n— '+f.name.value.trim()+' ('+f.email.value.trim()+')');
      window.location.href='mailto:'+to+'?subject='+subject+'&body='+body;
      say('Opening your email app…');
    }
  });
})();
