/**
 * Instagram Tracker - Shared UI Components
 * Toast notifications, modals, skeleton loaders, animated counters
 */

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

const ToastManager = {
  container: null,
  toasts: [],

  init() {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 380px;
      width: calc(100% - 40px);
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 4000) {
    this.init();

    const toast = document.createElement('div');
    toast.className = 'toast-item';

    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    const colors = {
      success: { bg: 'rgba(50, 215, 75, 0.15)', border: 'rgba(50, 215, 75, 0.3)', icon: '#32D74B' },
      error: { bg: 'rgba(255, 69, 58, 0.15)', border: 'rgba(255, 69, 58, 0.3)', icon: '#FF453A' },
      warning: { bg: 'rgba(255, 159, 10, 0.15)', border: 'rgba(255, 159, 10, 0.3)', icon: '#FF9F0A' },
      info: { bg: 'rgba(100, 210, 255, 0.15)', border: 'rgba(100, 210, 255, 0.3)', icon: '#64D2FF' }
    };

    const color = colors[type] || colors.info;

    toast.style.cssText = `
      background: ${color.bg};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid ${color.border};
      border-radius: 14px;
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: #f5f5f7;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 14px;
      pointer-events: auto;
      transform: translateX(120%);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    `;

    toast.innerHTML = `
      <div style="color: ${color.icon}; flex-shrink: 0; margin-top: 2px;">
        ${icons[type] || icons.info}
      </div>
      <div style="flex: 1; line-height: 1.5;">${message}</div>
      <button class="toast-close" style="
        background: none;
        border: none;
        color: rgba(255,255,255,0.5);
        cursor: pointer;
        padding: 4px;
        margin: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="toast-progress" style="
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: ${color.icon};
        width: 100%;
        transform-origin: left;
        transition: transform ${duration}ms linear;
      "></div>
    `;

    this.container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';

      // Start progress bar
      const progress = toast.querySelector('.toast-progress');
      requestAnimationFrame(() => {
        progress.style.transform = 'scaleX(0)';
      });
    });

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#fff');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'rgba(255,255,255,0.5)');
    closeBtn.addEventListener('click', () => this.dismiss(toast));

    // Pause on hover
    let timeoutId;
    const startTimeout = () => {
      timeoutId = setTimeout(() => this.dismiss(toast), duration);
      toast.querySelector('.toast-progress').style.animationPlayState = 'running';
    };

    toast.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      toast.querySelector('.toast-progress').style.transform = 'scaleX(1)';
      toast.querySelector('.toast-progress').style.transition = 'none';
    });

    toast.addEventListener('mouseleave', () => {
      toast.querySelector('.toast-progress').style.transition = `transform ${duration}ms linear`;
      requestAnimationFrame(() => {
        toast.querySelector('.toast-progress').style.transform = 'scaleX(0)';
      });
      startTimeout();
    });

    startTimeout();
    this.toasts.push(toast);

    return toast;
  },

  dismiss(toast) {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';

    setTimeout(() => {
      toast.remove();
      this.toasts = this.toasts.filter(t => t !== toast);
    }, 400);
  },

  success(message, duration) { return this.show(message, 'success', duration); },
  error(message, duration) { return this.show(message, 'error', duration); },
  warning(message, duration) { return this.show(message, 'warning', duration); },
  info(message, duration) { return this.show(message, 'info', duration); }
};


// ============================================
// MODAL SYSTEM
// ============================================

const Modal = {
  overlay: null,
  activeModal: null,

  createOverlay() {
    if (this.overlay) return this.overlay;

    this.overlay = document.createElement('div');
    this.overlay.id = 'modal-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.body.appendChild(this.overlay);
    return this.overlay;
  },

  open(content, options = {}) {
    const overlay = this.createOverlay();

    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: #131419;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: ${options.padding || '32px'};
      max-width: ${options.maxWidth || '420px'};
      width: calc(100% - 40px);
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
    `;

    modal.innerHTML = content;
    document.body.appendChild(modal);

    this.activeModal = modal;

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.close();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    return modal;
  },

  close() {
    if (!this.activeModal) return;

    this.overlay.style.opacity = '0';
    this.overlay.style.visibility = 'hidden';
    this.activeModal.style.opacity = '0';
    this.activeModal.style.transform = 'translate(-50%, -50%) scale(0.9)';

    setTimeout(() => {
      if (this.activeModal) {
        this.activeModal.remove();
        this.activeModal = null;
      }
    }, 300);
  },

  // Confirmation dialog
  confirm(title, message, options = {}) {
    return new Promise((resolve) => {
      const confirmText = options.confirmText || 'Confirm';
      const cancelText = options.cancelText || 'Cancel';
      const isDanger = options.danger || false;

      const content = `
        <div style="text-align: center;">
          ${options.icon ? `<div style="margin-bottom: 20px;">${options.icon}</div>` : ''}
          <h3 style="
            font-family: 'Syne', system-ui, sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #f5f5f7;
            margin-bottom: 12px;
          ">${title}</h3>
          <p style="
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 14px;
            color: #a1a1a6;
            line-height: 1.6;
            margin-bottom: 28px;
          ">${message}</p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="modal-cancel" style="
              font-family: 'DM Sans', system-ui, sans-serif;
              font-size: 14px;
              font-weight: 600;
              padding: 12px 24px;
              border-radius: 12px;
              border: 1px solid rgba(255,255,255,0.1);
              background: #1a1b21;
              color: #a1a1a6;
              cursor: pointer;
              transition: all 0.2s;
            ">${cancelText}</button>
            <button id="modal-confirm" style="
              font-family: 'DM Sans', system-ui, sans-serif;
              font-size: 14px;
              font-weight: 600;
              padding: 12px 24px;
              border-radius: 12px;
              border: none;
              background: ${isDanger ? '#FF453A' : 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)'};
              color: white;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: ${isDanger ? '0 4px 20px rgba(255, 69, 58, 0.3)' : '0 4px 20px rgba(221, 42, 123, 0.3)'};
            ">${confirmText}</button>
          </div>
        </div>
      `;

      const modal = this.open(content);

      modal.querySelector('#modal-cancel').addEventListener('click', () => {
        this.close();
        resolve(false);
      });

      modal.querySelector('#modal-confirm').addEventListener('click', () => {
        this.close();
        resolve(true);
      });

      // Hover effects
      const cancelBtn = modal.querySelector('#modal-cancel');
      const confirmBtn = modal.querySelector('#modal-confirm');

      cancelBtn.addEventListener('mouseenter', () => {
        cancelBtn.style.background = '#22232b';
        cancelBtn.style.color = '#f5f5f7';
      });
      cancelBtn.addEventListener('mouseleave', () => {
        cancelBtn.style.background = '#1a1b21';
        cancelBtn.style.color = '#a1a1a6';
      });

      confirmBtn.addEventListener('mouseenter', () => {
        confirmBtn.style.transform = 'translateY(-2px)';
      });
      confirmBtn.addEventListener('mouseleave', () => {
        confirmBtn.style.transform = 'translateY(0)';
      });
    });
  }
};


// ============================================
// PASSWORD MODAL
// ============================================

const PasswordModal = {
  show(options = {}) {
    return new Promise((resolve, reject) => {
      const title = options.title || 'Enter Password';
      const placeholder = options.placeholder || 'Password';

      const content = `
        <div style="text-align: center;">
          <div style="
            width: 64px;
            height: 64px;
            margin: 0 auto 24px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(245, 133, 41, 0.2) 0%, rgba(221, 42, 123, 0.15) 50%, rgba(129, 52, 175, 0.1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#lockGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <defs>
                <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#F58529"/>
                  <stop offset="50%" style="stop-color:#DD2A7B"/>
                  <stop offset="100%" style="stop-color:#8134AF"/>
                </linearGradient>
              </defs>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h3 style="
            font-family: 'Syne', system-ui, sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #f5f5f7;
            margin-bottom: 8px;
          ">${title}</h3>

          <p style="
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 14px;
            color: #6e6e73;
            margin-bottom: 24px;
          ">Enter your password to access Instagram Tracker</p>

          <div style="position: relative; margin-bottom: 24px;">
            <input
              type="password"
              id="password-input"
              placeholder="${placeholder}"
              style="
                width: 100%;
                padding: 16px 48px 16px 16px;
                font-family: 'DM Sans', system-ui, sans-serif;
                font-size: 16px;
                color: #f5f5f7;
                background: #1a1b21;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 14px;
                outline: none;
                transition: all 0.2s;
              "
            />
            <button
              type="button"
              id="toggle-password"
              style="
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: #6e6e73;
                cursor: pointer;
                padding: 4px;
                display: flex;
                transition: color 0.2s;
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>

          <p id="password-error" style="
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 13px;
            color: #FF453A;
            margin-bottom: 16px;
            display: none;
          ">Incorrect password. Please try again.</p>

          <button id="password-submit" style="
            width: 100%;
            padding: 16px;
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 15px;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%);
            border: none;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 20px rgba(221, 42, 123, 0.3);
          ">
            Continue
          </button>
        </div>
      `;

      const modal = Modal.open(content, { padding: '40px' });

      const input = modal.querySelector('#password-input');
      const toggleBtn = modal.querySelector('#toggle-password');
      const submitBtn = modal.querySelector('#password-submit');
      const errorText = modal.querySelector('#password-error');

      // Focus input
      setTimeout(() => input.focus(), 100);

      // Input focus styles
      input.addEventListener('focus', () => {
        input.style.borderColor = 'rgba(221, 42, 123, 0.5)';
        input.style.boxShadow = '0 0 0 3px rgba(221, 42, 123, 0.1)';
      });
      input.addEventListener('blur', () => {
        input.style.borderColor = 'rgba(255,255,255,0.1)';
        input.style.boxShadow = 'none';
      });

      // Toggle password visibility
      let isVisible = false;
      toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        input.type = isVisible ? 'text' : 'password';
        toggleBtn.innerHTML = isVisible ? `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ` : `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      });

      // Submit handler
      const handleSubmit = () => {
        const password = input.value;
        if (password) {
          resolve(password);
        }
      };

      submitBtn.addEventListener('click', handleSubmit);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSubmit();
      });

      // Button hover
      submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.transform = 'translateY(-2px)';
        submitBtn.style.boxShadow = '0 6px 30px rgba(221, 42, 123, 0.4)';
      });
      submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.transform = 'translateY(0)';
        submitBtn.style.boxShadow = '0 4px 20px rgba(221, 42, 123, 0.3)';
      });

      // Expose error method
      modal.showError = () => {
        errorText.style.display = 'block';
        input.style.borderColor = 'rgba(255, 69, 58, 0.5)';
        input.style.animation = 'shake 0.5s ease-out';
        setTimeout(() => {
          input.style.animation = '';
        }, 500);
      };

      // Add shake animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `;
      document.head.appendChild(style);
    });
  }
};


// ============================================
// ANIMATED COUNTER
// ============================================

const AnimatedCounter = {
  animate(element, endValue, duration = 1000, prefix = '', suffix = '') {
    const startValue = 0;
    const startTime = performance.now();

    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);

      element.textContent = prefix + currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  // Initialize all elements with data-count attribute
  initAll(selector = '[data-count]') {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const endValue = parseInt(el.dataset.count, 10);
          const duration = parseInt(el.dataset.duration, 10) || 1000;
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';

          this.animate(el, endValue, duration, prefix, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
  }
};


// ============================================
// SKELETON LOADER
// ============================================

const Skeleton = {
  create(type = 'text', options = {}) {
    const el = document.createElement('div');
    el.className = 'skeleton';

    switch (type) {
      case 'text':
        el.classList.add('skeleton-text');
        el.style.width = options.width || '100%';
        break;
      case 'heading':
        el.classList.add('skeleton-heading');
        el.style.width = options.width || '60%';
        break;
      case 'avatar':
        el.classList.add('skeleton-avatar');
        el.style.width = options.size || '40px';
        el.style.height = options.size || '40px';
        break;
      case 'card':
        el.classList.add('skeleton-card');
        el.style.height = options.height || '120px';
        break;
      case 'stat':
        el.innerHTML = `
          <div class="skeleton skeleton-avatar" style="width: 44px; height: 44px; border-radius: 14px; margin-bottom: 16px;"></div>
          <div class="skeleton skeleton-heading" style="width: 50%; height: 32px; margin-bottom: 8px;"></div>
          <div class="skeleton skeleton-text" style="width: 70%; height: 14px;"></div>
        `;
        el.style.cssText = `
          background: rgba(245, 133, 41, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 20px;
        `;
        el.className = '';
        break;
    }

    return el;
  },

  // Replace content with skeletons
  replace(container, config) {
    container.innerHTML = '';
    config.forEach(item => {
      container.appendChild(this.create(item.type, item.options));
    });
  }
};


// ============================================
// PAGE TRANSITION EFFECTS
// ============================================

const PageTransition = {
  init() {
    // Add stagger animation to children
    document.querySelectorAll('.stagger-children').forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * 50}ms`;
      });
    });
  },

  // Fade in elements as they scroll into view
  initScrollReveal(selector = '.reveal') {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }
};


// ============================================
// EXPORTS
// ============================================

// For ES modules
export { ToastManager, Modal, PasswordModal, AnimatedCounter, Skeleton, PageTransition };

// Also attach to window for non-module usage
if (typeof window !== 'undefined') {
  window.ToastManager = ToastManager;
  window.Modal = Modal;
  window.PasswordModal = PasswordModal;
  window.AnimatedCounter = AnimatedCounter;
  window.Skeleton = Skeleton;
  window.PageTransition = PageTransition;
}
