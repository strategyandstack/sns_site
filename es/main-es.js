import { salesArchitectureData as data } from './data-es.js';
import { createValuePropCard, createBlueprintNavItem, createBlueprintDisplay, createBlueprintAccordion, createPricingCard, createStatItem, createRoadmapItem, createFaqItem, createMarketDynamics, createSecondaryCTANote, createABetterWaySection, createWhoThisIsForSection } from '../components.js';

const LANG = 'es';
const TIDY_LINKS = {
    discovery: 'https:
    strategy: 'https:
};

const emailTemplates = {
    linkedin: `{{RANDOM | Hola {{firstName}} | {{firstName}},}} este es un mensaje en frío y sé que recibes muchos, así que seré breve.

Hemos ayudado a más de 105 profesionales a convertir su presencia en LinkedIn en una fuente constante de leads.

{{RANDOM | Estamos abriendo | Estamos lanzando}} un paquete de fin de año para solo 12 clientes.

{{RANDOM | Incluye | Dentro obtienes}} una actualización completa de perfil de LinkedIn, más 1 mes completo de outreach gestionado.

{{RANDOM | Si te interesa explorar esto | Si suena interesante}}, responde "Sí" y te comparto mi link de calendario.`,

    cold: `Asunto: {{RANDOM | Pregunta rápida sobre {{companyName}} | {{firstName}}, vi tu trabajo en {{companyName}}}}

{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Noté | Vi}} que {{companyName}} {{RANDOM | está escalando rápidamente | ha estado creciendo}} y pensé que te podría interesar cómo hemos ayudado a empresas similares de {{industry}} a {{RANDOM | triplicar su pipeline | agendar 40+ reuniones mensuales}}.

Construimos sistemas de outbound llave en mano que {{RANDOM | corren en automático | escalan sin agregar personal}}.

{{RANDOM | ¿Tendría sentido | ¿Estarías abierto a}} una llamada de 15 minutos esta semana?

{{RANDOM | Saludos | Un abrazo}},
{{senderName}}`,

    followup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Dando seguimiento a mi último mensaje | Quería retomar}} - {{RANDOM | sé que estás ocupado | las cosas se entierran}}.

Ayudamos a empresas de {{industry}} como {{companyName}} a construir sistemas de outbound que {{RANDOM | generan leads en automático | agendan 30-50 reuniones por mes}}.

{{RANDOM | ¿Vale la pena una llamada de 10 minutos? | ¿Tendría sentido conectar?}}

{{RANDOM | {{senderName}} | Saludos, {{senderName}}}}`,

    breakup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Te he escrito varias veces | Este es mi último seguimiento}} - {{RANDOM | no quiero seguir llenando tu bandeja | respeto tu tiempo}}.

{{RANDOM | Si construir un motor de outbound predecible no es prioridad ahora | Si no es el momento correcto}}, {{RANDOM | lo entiendo totalmente | no hay problema}}.

{{RANDOM | Pero si algo cambia | Cuando estés listo}}, {{RANDOM | mi puerta siempre está abierta | sabes dónde encontrarme}}.

{{RANDOM | {{senderName}} | Un abrazo, {{senderName}}}}`
};

let currentBlueprintIndex = 0;
let typingTimer = null;
let isTyping = false;
let ctaHoverTimeout = null;
let blurOverlay = null;

document.addEventListener('DOMContentLoaded', () => {
    if (!data) return;
    initBlurOverlay();
    initMouseGlow();
    initLayout();
    initActiveNavHighlight();
    initSmoothScroll();
    initEmailEditor();
    initBlueprintInteraction();
    initBlueprintAccordion();
    initSectionReveals();
    initRoadmapAnimation();
    initFaqAnimations();
    initStatsCounter();
    initCTAFocusEffect();
    initBookingModal();
    initUnifiedScrollHandler();
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn('Lucide icons failed to load:', e);
    }
});

function initBlurOverlay() {
    blurOverlay = document.createElement('div');
    blurOverlay.className = 'page-blur-overlay';
    document.body.appendChild(blurOverlay);
}

function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    let animating = false;

    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

        
        if (Math.abs(mouseX - glowX) < 0.5 && Math.abs(mouseY - glowY) < 0.5) {
            animating = false;
            return;
        }
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!animating) {
            animating = true;
            requestAnimationFrame(animate);
        }
    }, { passive: true });
}



function initUnifiedScrollHandler() {
    const callbacks = [];

    
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    callbacks.push(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${scrollTop / docHeight})`;
    });

    
    const nav = document.querySelector('nav');
    if (nav) {
        callbacks.push(() => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    
    const editor = document.querySelector('.email-editor-container');
    const statsSection = document.getElementById('stats-section');
    if (editor && statsSection && editor.closest('section')) {
        callbacks.push(() => {
            const scrollY = window.scrollY;
            const statsTop = statsSection.offsetTop;
            const scrollStart = 100;
            const scrollEnd = statsTop - 100;
            const p = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));

            if (scrollY < scrollStart) {
                editor.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
                editor.style.opacity = '1';
            } else if (p < 1) {
                const scale = 1 + (p * 0.15);
                const rotateX = p * -8;
                const translateY = p * -30;
                editor.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
                editor.style.opacity = Math.max(0, 1 - (p * 1.2));
            } else {
                editor.style.opacity = '0';
            }
        });
    }

    
    callbacks.push(clearAllFocusEffects);

    
    const sticky = document.querySelector('.mobile-sticky-cta');
    const hero = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    if (sticky && hero) {
        callbacks.push(() => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
            sticky.classList.toggle('visible', heroBottom < 0 && footerTop > window.innerHeight);
        });
    }

    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                for (let i = 0; i < callbacks.length; i++) callbacks[i]();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}



function clearAllFocusEffects() {
    if (ctaHoverTimeout) { clearTimeout(ctaHoverTimeout); ctaHoverTimeout = null; }
    blurOverlay.classList.remove('active');
    document.querySelectorAll('.cta-focus').forEach(el => el.classList.remove('cta-focus'));
    document.querySelectorAll('.card-elevated').forEach(el => el.classList.remove('card-elevated'));
}

function initCTAFocusEffect() {
    
    
    document.addEventListener('mouseenter', (e) => {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const cta = e.target.closest('.btn-primary, .btn-secondary, .display-cta, .pricing-cta');
        if (!cta) return;
        clearAllFocusEffects();
        ctaHoverTimeout = setTimeout(() => {
            blurOverlay.classList.add('active');
            cta.classList.add('cta-focus');
            const parentCard = cta.closest('.glass-card, .pricing-card, .blueprint-display');
            if (parentCard) parentCard.classList.add('card-elevated');
        }, 300);
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const cta = e.target.closest('.btn-primary, .btn-secondary, .display-cta, .pricing-cta');
        if (!cta) return;
        clearAllFocusEffects();
    }, true);
    
}

function initSectionReveals() {
    const reveals = document.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const embedContainer = document.getElementById('tidycal-embed');
    const closeBtn = document.getElementById('close-booking-modal');
    const backdrop = modal?.querySelector('.booking-modal-backdrop');
    const loader = modal?.querySelector('.modal-loader');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');

    if (!modal || !embedContainer) return;

    window.openBookingModal = (code = 'GENERAL', type = 'discovery') => {
        const baseUrl = TIDY_LINKS[type] || TIDY_LINKS.discovery;
        const trackingUrl = `${baseUrl}?utm_source=Website&utm_medium=CTA&utm_campaign=${code}`;

        
        if (loader) loader.style.opacity = '1';
        if (modalTitle) modalTitle.textContent = type === 'strategy' ? 'Sesión de Estrategia' : 'Sesión de Exploración';
        if (modalSubtitle) modalSubtitle.textContent = type === 'strategy' ? '30 minutos • Sesión de Trabajo' : '15 minutos • Llamada de Alineación';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        
        gsap.to(modal, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.fromTo('.booking-modal-content-wrapper',
            { y: 30, scale: 0.98 },
            { y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
        );

        
        const iframe = document.createElement('iframe');
        iframe.src = trackingUrl;
        iframe.title = 'TidyCal Booking';
        iframe.allow = 'payment';

        iframe.onload = () => {
            if (loader) {
                gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
            }
        };

        embedContainer.innerHTML = '';
        embedContainer.appendChild(iframe);
        if (loader) loader.style.display = 'flex';
    };

    const closeModal = () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.classList.remove('active');
                embedContainer.innerHTML = '';
                document.body.style.overflow = '';
            }
        });
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-booking');
        if (btn) {
            e.preventDefault();
            const code = btn.dataset.bookingCode || 'GENERAL';
            const type = btn.dataset.bookingType || 'discovery';
            window.openBookingModal(code, type);
        }
    });
}



function initLayout() {
    document.title = data.meta.name + " | " + data.meta.tagline;

    
    const aBetterWayContainer = document.getElementById('a-better-way-container');
    if (aBetterWayContainer && data.a_better_way) {
        aBetterWayContainer.innerHTML = createABetterWaySection(data.a_better_way, LANG);
    }

    const vpContainer = document.getElementById('value-props');
    if (vpContainer) {
        vpContainer.innerHTML = createValuePropCard('Probado en Batalla', data.value_proposition.supporting, 'layers') +
            createValuePropCard('Propiedad Total', 'Construimos en tu infraestructura. Cuentas, datos y contenido se quedan contigo para siempre.', 'key') +
            createValuePropCard('El Resultado', data.value_proposition.outcome, 'rocket');
    }

    const gList = document.getElementById('guarantees-list');
    if (gList) {
        data.guarantee.what_we_guarantee.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-4 text-gray-300 group';
            li.innerHTML = `<div class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:border-white transition-all"><i data-lucide="check" class="w-3 h-3 text-white group-hover:text-black"></i></div><span class="text-base font-medium leading-tight group-hover:text-white transition-colors">${item}</span>`;
            gList.appendChild(li);
        });
    }

    const mList = document.getElementById('market-depends-list');
    if (mList) {
        mList.innerHTML = createMarketDynamics(data.guarantee.what_depends_on_market, LANG);
    }

    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) statsGrid.innerHTML = data.social_proof.stats.map(s => createStatItem(s)).join('');

    const bpContainer = document.getElementById('blueprints-container');
    if (bpContainer) {
        bpContainer.innerHTML = `
<div class="blueprint-dashboard section-reveal">
    <div class="blueprint-nav">${data.blueprints.map((bp, i) => createBlueprintNavItem(bp, i === 0)).join('')}</div>
    <div class="blueprint-display" id="blueprint-display">${createBlueprintDisplay(data.blueprints[0], LANG)}</div>
</div>
${createBlueprintAccordion(data.blueprints, LANG)}`;
        setTimeout(() => {
            const display = document.getElementById('blueprint-display');
            if (display) display.classList.add('active');
            animateHoursBars();
        }, 100);
    }

    
    const whoThisIsForContainer = document.getElementById('who-this-is-for-container');
    if (whoThisIsForContainer && data.who_this_is_for) {
        whoThisIsForContainer.innerHTML = createWhoThisIsForSection(data.who_this_is_for, LANG);
    }

    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) pricingGrid.innerHTML = data.packages.map(p => createPricingCard(p, LANG)).join('');

    const stepsContainer = document.getElementById('next-steps-container');
    if (stepsContainer) stepsContainer.innerHTML = data.next_steps.map((s, i) => createRoadmapItem(s, i)).join('');

    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) faqContainer.innerHTML = data.faq.map((f, i) => createFaqItem(f, i)).join('');

    const ctaPrimaryTitle = document.getElementById('cta-primary-title');
    const ctaPrimarySub = document.getElementById('cta-primary-sub');
    const ctaPrimaryBtn = document.getElementById('cta-primary-btn');
    const ctaPrimarySecondary = document.getElementById('cta-primary-secondary');
    if (ctaPrimaryTitle) ctaPrimaryTitle.textContent = data.cta_sections.primary.headline;
    if (ctaPrimarySub) ctaPrimarySub.textContent = data.cta_sections.primary.subheadline;
    if (ctaPrimaryBtn) ctaPrimaryBtn.textContent = data.cta_sections.primary.button_text;
    if (ctaPrimarySecondary) ctaPrimarySecondary.textContent = data.cta_sections.primary.secondary_text;

    const ctaSecondaryTitle = document.getElementById('cta-secondary-title');
    const ctaSecondarySub = document.getElementById('cta-secondary-sub');
    const ctaSecondaryBtn = document.getElementById('cta-secondary-btn');
    const ctaSecondaryCard = document.getElementById('cta-secondary-card');
    if (ctaSecondaryTitle) ctaSecondaryTitle.textContent = data.cta_sections.secondary.headline;
    if (ctaSecondarySub) ctaSecondarySub.textContent = data.cta_sections.secondary.subheadline;
    if (ctaSecondaryBtn) ctaSecondaryBtn.textContent = data.cta_sections.secondary.button_text;

    if (ctaSecondaryCard && data.cta_sections.secondary.note_text) {
        const noteHtml = createSecondaryCTANote(data.cta_sections.secondary.note_text, data.cta_sections.secondary.scarcity_text);
        ctaSecondaryCard.insertAdjacentHTML('beforeend', noteHtml);
    }

    const footerTagline = document.getElementById('footer-tagline');
    const footerPowered = document.getElementById('footer-powered');
    if (footerTagline) footerTagline.textContent = data.footer.tagline;
    if (footerPowered) footerPowered.textContent = data.footer.powered_by;
}

function animateHoursBars() {
    document.querySelectorAll('.hours-bar[data-width]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, 100);
    });
}

function initRoadmapAnimation() {
    const items = document.querySelectorAll('.roadmap-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
}

function initFaqAnimations() {
    const items = document.querySelectorAll('.faq-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
    items.forEach(item => {
        item.querySelector('summary').addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--ripple-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
            item.style.setProperty('--ripple-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
            item.classList.remove('ripple');
            void item.offsetWidth;
            item.classList.add('ripple');
        });
    });
}

function initBlueprintInteraction() {
    const navItems = document.querySelectorAll('.blueprint-nav-item');
    const display = document.getElementById('blueprint-display');
    if (!navItems.length || !display) return;
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.blueprintIndex);
            if (index === currentBlueprintIndex) return;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            loadBlueprint(index);
        });
    });
}

function initBlueprintAccordion() {
    const items = document.querySelectorAll('.blueprint-accordion-item');
    items.forEach(item => {
        item.querySelector('.blueprint-accordion-header').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!wasActive) {
                item.classList.add('active');
                setTimeout(() => animateHoursBars(), 100);
            }
        });
    });
}

function loadBlueprint(index) {
    const display = document.getElementById('blueprint-display');
    const bp = data.blueprints[index];
    if (!display || !bp) return;
    currentBlueprintIndex = index;
    display.classList.remove('scanning', 'active');
    void display.offsetWidth;
    display.classList.add('scanning');
    display.innerHTML = createBlueprintDisplay(bp, LANG);
    animateBlueprintContent(bp);
    setTimeout(() => display.classList.add('active'), 700);
    setTimeout(() => animateHoursBars(), 100);
    
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn('Lucide icons failed to load:', e);
    }
}

function animateBlueprintContent(bp) {
    const display = document.getElementById('blueprint-display');
    const mixedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    
    const title = display.querySelector('.display-title');
    if (title) scrambleText(title, bp.name.toUpperCase(), { speed: 45, charsPerTick: 1 });

    
    display.querySelectorAll('.display-description, .display-timeline').forEach((el, i) => {
        const text = el.textContent;
        const html = el.innerHTML;
        const hasHTML = html.includes('<');
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
            scrambleText(el, text, { chars: mixedChars, restoreHTML: hasHTML ? html : null });
            el.style.opacity = '1';
        }, 200 + i * 150);
    });

    
    display.querySelectorAll('.feature-list li').forEach((el, i) => {
        const text = el.textContent;
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.15s ease';
        setTimeout(() => {
            scrambleText(el, text, { chars: mixedChars });
            el.style.opacity = '1';
        }, 400 + i * 80);
    });

    
    const footer = display.querySelector('.display-footer');
    if (footer) {
        footer.style.opacity = '0';
        setTimeout(() => {
            footer.style.transition = 'opacity 0.4s ease';
            footer.style.opacity = '1';
            const price = footer.querySelector('.display-price');
            if (price) {
                const priceText = price.textContent;
                scrambleText(price, priceText, { charsPerTick: 1 });
            }
        }, 700);
    }
}

function scrambleText(element, targetText, options = {}) {
    const chars = options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const speed = options.speed || 25;
    const charsPerTick = options.charsPerTick || 3;
    const restoreHTML = options.restoreHTML || null;
    let iteration = 0;
    
    element.textContent = targetText.split('').map(char =>
        (char === ' ' || char === '\n') ? char : chars[Math.floor(Math.random() * chars.length)]
    ).join('');

    let lastTime = 0;
    let frameId;

    function tick(time) {
        if (!lastTime) lastTime = time;
        const elapsed = time - lastTime;

        if (elapsed > speed) {
            iteration += charsPerTick;
            lastTime = time;

            if (iteration > targetText.length) {
                if (restoreHTML) element.innerHTML = restoreHTML;
                else element.textContent = targetText;
                cancelAnimationFrame(frameId);
                return;
            }

            element.textContent = targetText.split('').map((char, idx) => {
                if (char === ' ' || char === '\n') return char;
                return idx < iteration ? targetText[idx] : chars[Math.floor(Math.random() * chars.length)];
            }).join('');
        }
        frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
}

function initEmailEditor() {
    const editorContainer = document.querySelector('.email-editor-container');
    if (editorContainer) {
        editorContainer.style.opacity = '1';
    }

    const tabs = document.querySelectorAll('.editor-tab');
    if (!tabs.length) return;
    Object.keys(emailTemplates).forEach(tabName => {
        const panel = document.getElementById(`tab-${tabName}`);
        if (panel) panel.querySelector('.editor-text').innerHTML = '<span class="typing-cursor"></span>';
    });
    setTimeout(() => typeText('linkedin'), 500);
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            stopTyping();
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
            const activePanel = document.getElementById(`tab-${tabName}`);
            if (activePanel) { activePanel.classList.remove('hidden'); setTimeout(() => typeText(tabName), 50); }
        });
    });
}

function stopTyping() {
    if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
    isTyping = false;
}

function typeText(tabName) {
    stopTyping();
    const panel = document.getElementById(`tab-${tabName}`);
    if (!panel) return;
    const textElement = panel.querySelector('.editor-text');
    const template = emailTemplates[tabName];
    if (!textElement || !template) return;

    isTyping = true;
    const highlightedText = highlightSyntax(template);

    
    const container = document.createElement('div');
    container.style.display = 'inline';
    container.innerHTML = highlightedText;

    const charsToType = [];

    function processNode(node) {
        if (node.nodeType === 3) { 
            const text = node.nodeValue;
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < text.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = text[i];
                charSpan.style.opacity = '0';
                fragment.appendChild(charSpan);
                charsToType.push(charSpan);
            }
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === 1) { 
            Array.from(node.childNodes).forEach(processNode);
        }
    }

    Array.from(container.childNodes).forEach(processNode);

    textElement.innerHTML = '';
    textElement.appendChild(container);

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    textElement.appendChild(cursor);

    let charIndex = 0;

    function typeNextChar() {
        if (!isTyping) return;

        if (charIndex >= charsToType.length) {
            stopTyping();
            setTimeout(() => {
                if (cursor) cursor.style.opacity = '0';
            }, 2000);
            return;
        }

        const charSpan = charsToType[charIndex];
        charSpan.style.opacity = '1';

        
        let delay = (10 + Math.random() * 15) * 0.7;
        const char = charSpan.textContent;
        if (char === ' ') delay += 7;
        if (['.', ',', '?', '!'].includes(char)) delay += 28;
        if (char === '\n') delay += 70;
        if (Math.random() > 0.99) delay += 35;

        charIndex++;
        typingTimer = setTimeout(typeNextChar, delay);
    }

    typeNextChar();
}

function highlightSyntax(text) {
    let escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    
    const tokenColors = {
        'firstName': 'syntax-firstname',
        'senderName': 'syntax-sender',
        'companyName': 'syntax-company',
        'industry': 'syntax-industry'
    };

    
    const colorizeToken = (match, varName) => {
        const colorClass = tokenColors[varName] || 'syntax-variable';
        return `<span class="${colorClass}">{{${varName}}}</span>`;
    };

    
    escaped = escaped.replace(/\{\{RANDOM\s*\|((?:[^{}]|\{\{[^}]+\}\})+)\}\}/g, (m, content) => {
        const parts = content.split('|').map(p => p.trim());
        const highlighted = parts.map((part, i) => {
            const v = part.replace(/\{\{(\w+)\}\}/g, colorizeToken);
            return i < parts.length - 1 ? v + '<span class="syntax-pipe"> | </span>' : v;
        }).join('');
        return `<span class="syntax-random">{{RANDOM}}</span> ${highlighted}`;
    });

    
    return escaped.replace(/\{\{(\w+)\}\}/g, colorizeToken);
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const counter = { value: 0 };
                gsap.to(counter, { value: target, duration: 1.5, ease: 'power2.out', onUpdate: () => entry.target.textContent = Math.round(counter.value), onComplete: () => { entry.target.classList.add('pulse'); setTimeout(() => entry.target.classList.remove('pulse'), 600); } });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(stat => observer.observe(stat));
}

function initAnimations() {
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });

    tl.from('nav', {
        opacity: 0,
        duration: 0.4,
        clearProps: 'all'
    });

    
    
}
