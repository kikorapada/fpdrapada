$(function(){

  /* ── Particles ─────────────────────────────────────── */
  const $pp = $('#heroParticles');
  for(let i = 0; i < 30; i++){
    const colors = ['#2563eb','#f59e0b','#1d4ed8','#fbbf24'];
    const c = colors[Math.floor(Math.random()*colors.length)];
    $pp.append(`<div class="hp" style="
      left:${Math.random()*100}%;
      background:${c};
      box-shadow:0 0 6px ${c};
      animation-delay:${Math.random()*18}s;
      animation-duration:${14 + Math.random()*14}s;
    "></div>`);
  }

  /* ── Navbar scroll ──────────────────────────────────── */
  $(window).on('scroll.nav', function(){
    if($(this).scrollTop() > 40){
      $('#navbar').addClass('stuck');
    } else {
      $('#navbar').removeClass('stuck');
    }
  });

  /* ── Mobile nav ─────────────────────────────────────── */
  $('#hamburger').on('click', function(){ $('#mobNav').addClass('open'); });
  $('#mobClose').on('click', function(){ $('#mobNav').removeClass('open'); });
  window.closeMob = function(){ $('#mobNav').removeClass('open'); };

  /* ── THEME TOGGLE ───────────────────────────────────── */
  (function(){
    // Read saved preference, default to dark
    const saved = localStorage.getItem('fdev_theme') || 'dark';
    applyTheme(saved, false);

    $('#themeToggle').on('click', function(){
      const current = $('html').attr('data-theme') === 'light' ? 'light' : 'dark';
      const next    = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      localStorage.setItem('fdev_theme', next);
    });

    function applyTheme(theme, animate){
      if(animate){
        // Brief flash effect on switch
        $('body').css('transition','background-color .4s ease, color .3s ease');
      }
      $('html').attr('data-theme', theme);
    }
  })();

  /* ── Hero typewriter ────────────────────────────────── */
  (function(){
    const words   = ['scale.','automate.','secure.','perform.','grow.','impress.'];
    const TYPE_SPD  = 95;   // ms per character typed
    const ERASE_SPD = 48;   // ms per character erased
    const PAUSE_END = 1800; // ms pause after fully typed
    const PAUSE_START = 320; // ms pause before typing next word

    let wi    = 0;
    let ci    = 0;
    let phase = 'typing'; // 'typing' | 'pausing' | 'erasing' | 'waiting'
    const $el = $('#morphWord');

    function tick(){
      const word = words[wi];

      if(phase === 'typing'){
        ci++;
        $el.text(word.slice(0, ci));
        if(ci >= word.length){
          phase = 'pausing';
          setTimeout(tick, PAUSE_END);
        } else {
          // Slight randomness makes it feel human
          setTimeout(tick, TYPE_SPD + (Math.random() * 40 - 20));
        }

      } else if(phase === 'pausing'){
        phase = 'erasing';
        setTimeout(tick, ERASE_SPD);

      } else if(phase === 'erasing'){
        if(ci > 0){
          ci--;
          $el.text(word.slice(0, ci));
          setTimeout(tick, ERASE_SPD + (Math.random() * 20 - 10));
        } else {
          wi    = (wi + 1) % words.length;
          phase = 'waiting';
          setTimeout(tick, PAUSE_START);
        }

      } else if(phase === 'waiting'){
        phase = 'typing';
        setTimeout(tick, TYPE_SPD);
      }
    }

    // Erase the initial static word, then start the loop
    $el.text(words[0]);
    ci    = words[0].length;
    phase = 'pausing';
    setTimeout(tick, PAUSE_END);
  })();

  /* ── Count-up ───────────────────────────────────────── */
  function countUp(id, target, duration, suffix){
    let start = 0;
    const step = Math.ceil(duration / target);
    const t = setInterval(function(){
      start++;
      $('#' + id).text(start + (suffix||''));
      if(start >= target) clearInterval(t);
    }, step);
  }
  // Run on hero visible
  let counted = false;
  function checkCount(){
    if(counted) return;
    if($('.hero-metrics').length){
      const top = $('.hero-metrics').offset().top;
      if($(window).scrollTop() + $(window).height() > top - 100){
        counted = true;
        countUp('cntProj',    15, 1200);
        countUp('cntClients', 4,  900);
        countUp('cntYears',    8,  600);
        countUp('cntSat',     95, 1400);
      }
    }
  }
  $(window).on('scroll.count', checkCount);
  // Trigger immediately if hero is already in view
  setTimeout(checkCount, 300);

  /* ── Reveal on scroll ───────────────────────────────── */
  function checkReveal(){
    $('.reveal').each(function(){
      if(!$(this).hasClass('in')){
        const top = $(this).offset().top;
        if($(window).scrollTop() + $(window).height() > top - 80){
          $(this).addClass('in');
        }
      }
    });
  }
  // Initial check
  checkReveal();
  $(window).on('scroll.reveal', checkReveal);

  /* ── Skill bar fill ─────────────────────────────────── */
  let skillsFired = false;
  function checkSkills(){
    if(skillsFired) return;
    if($('.wv-main').length){
      const top = $('.wv-main').offset().top;
      if($(window).scrollTop() + $(window).height() > top - 60){
        skillsFired = true;
        $('.skill-fill').each(function(){
          const w = $(this).data('w') + '%';
          $(this).css('width', w);
        });
      }
    }
  }
  $(window).on('scroll.skills', checkSkills);

  /* ── FAQ accordion ──────────────────────────────────── */
  $('.faq-q').on('click', function(){
    const $item = $(this).closest('.faq-item');
    const $ans  = $item.find('.faq-a');
    const isOpen = $item.hasClass('open');

    // Close all
    $('.faq-item').removeClass('open');
    $('.faq-a').css('max-height','0');

    if(!isOpen){
      $item.addClass('open');
      $ans.css('max-height', $ans[0].scrollHeight + 'px');
    }
  });

  /* ── Contact form ───────────────────────────────────── */
  $('#sendBtn').on('click', function(){
    const $btn = $(this);
    $btn.html('<i class="bi bi-hourglass-split"></i> Sending…').css('opacity',.75).prop('disabled',true);
    setTimeout(function(){
      $btn.html('<i class="bi bi-check-circle-fill"></i> Message Sent! I\'ll reply within 24h.')
          .css({'opacity':1,'background':'#1B3D8B'});
    }, 1800);
  });

  /* ════════════════════════════════════════════════════
     WELCOME OVERLAY
     ════════════════════════════════════════════════════ */
  (function(){

    // Show every first visit per session (use localStorage for repeat visits)
    const seen = localStorage.getItem('fdev_visited');

    if(seen){
      // Returning visitor — remove instantly, no fanfare
      $('#welcomeOverlay').remove();
      return;
    }

    /* — Floating code particles — */
    const snippets = [
      'php artisan make:controller',
      'SELECT * FROM transactions',
      'docker-compose up -d',
      '$query->where("status","active")',
      'git push origin main',
      'npm run build',
      'Route::apiResource("/api/v1")',
      'class AuthController extends Controller',
      'aws s3 sync ./dist s3://bucket',
      'return response()->json($data)',
      'Schema::create("users")',
      'nginx -t && nginx -s reload',
    ];
    const $cp = $('#wovCodeParticles');
    snippets.forEach(function(s, i){
      $cp.append($('<span class="wov-code">').text(s).css({
        left: (5 + Math.random() * 85) + '%',
        animationDuration: (18 + Math.random() * 16) + 's',
        animationDelay:    (Math.random() * 14) + 's',
        opacity: 0
      }));
    });

    /* — Typewriter effect — */
    const greetings = [
      { pre:'Hey there! ',   hi:'Welcome 👋',         color:false },
      { pre:'I\'m Francis — ', hi:'Full Stack Dev.', color:true  },
    ];
    let gIdx = 0, cIdx = 0, typing = true, pausing = false;

    function type(){
      const g   = greetings[gIdx];
      const txt = g.pre + g.hi;
      const $el = $('#wovTyped');

      if(typing){
        if(cIdx < txt.length){
          cIdx++;
          const current = txt.slice(0, cIdx);
          if(g.color && cIdx > g.pre.length){
            $el.html(
              $('<span>').text(g.pre)[0].outerHTML +
              '<span class="grad-txt">' + $('<span>').text(current.slice(g.pre.length)).text() + '</span>'
            );
          } else {
            $el.text(current);
          }
          setTimeout(type, cIdx < g.pre.length ? 55 : 70);
        } else {
          // Done typing — pause then erase after first greeting, else stop
          if(gIdx === 0){
            setTimeout(function(){ typing = false; erase(); }, 1400);
          }
          // second greeting stays
        }
      }
    }

    function erase(){
      const $el = $('#wovTyped');
      const txt = $el.text();
      if(txt.length > 0){
        $el.text(txt.slice(0, -1));
        setTimeout(erase, 28);
      } else {
        gIdx = 1; cIdx = 0; typing = true;
        setTimeout(type, 300);
      }
    }

    // Start typing after avatar animates in
    setTimeout(type, 600);

    /* — Auto-progress bar — */
    const DURATION = 5200; // ms until auto-dismiss
    const $fill = $('#wovFill');
    const $pct  = $('#wovPct');
    let elapsed = 0;
    const TICK  = 60;
    let timer   = setInterval(function(){
      elapsed += TICK;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      $fill.css({ width: pct + '%', transition: 'width ' + TICK + 'ms linear' });
      $pct.text(pct + '%');
      if(elapsed >= DURATION){
        clearInterval(timer);
        dismissOverlay();
      }
    }, TICK);

    /* — Dismiss function — */
    function dismissOverlay(){
      localStorage.setItem('fdev_visited', '1');
      $('#welcomeOverlay').addClass('hiding');
      setTimeout(function(){
        $('#welcomeOverlay').remove();
        // Trigger reveal check after overlay gone
        $(window).trigger('scroll.reveal');
      }, 820);
    }

    /* — Button handlers — */
    $('#wovEnter, #wovSkip').on('click', function(){
      clearInterval(timer);
      dismissOverlay();
    });

  })();

});
