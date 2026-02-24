// ===========================
// TEMA DARK/LIGHT
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
}

// Toggle de tema
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

// ===========================
// NAVEGAÇÃO MOBILE
// ===========================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// ACTIVE LINK NA NAVEGAÇÃO
// ===========================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
});

// ===========================
// EFEITO PARALLAX
// ===========================
const parallaxBg = document.getElementById('parallaxBg');
const heroImageParallax = document.getElementById('heroImageParallax');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    if (heroImageParallax) {
        heroImageParallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Parallax do mouse na imagem do hero
if (heroImageParallax) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        heroImageParallax.style.transform = `
            translateX(${moveX}px) 
            translateY(${moveY}px)
        `;
    });
}

// ===========================
// ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER)
// ===========================
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animação das barras de habilidades
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.parentElement.previousElementSibling.style.getPropertyValue('--progress') || '0%';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observar todos os elementos com classe 'reveal'
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// ===========================
// SCROLL SUAVE
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// EFEITO TYPING NO HERO
// ===========================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = [
        'Desenvolvedor Full Stack',
        'Engenheiro de Software',
        'Criador de Soluções Web'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pausar no fim do texto
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Iniciar o efeito após 1 segundo
    setTimeout(type, 1000);
}

// ===========================
// FORMULÁRIO DE CONTATO - ENVIO VIA WHATSAPP
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação simples
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Número do WhatsApp (formato: código do país + DDD + número, sem espaços ou caracteres especiais)
        const whatsappNumber = '5535910181807'; // 55 (Brasil) + 35 (DDD) + 910181807
        
        // Montar mensagem formatada para WhatsApp
        const whatsappMessage = `*Nova mensagem do Portfólio*%0A%0A` +
                               `*Nome:* ${name}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Assunto:* ${subject}%0A%0A` +
                               `*Mensagem:*%0A${message}`;
        
        // URL do WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappURL, '_blank');
        
        // Track evento do formulário
        trackEvent('Form', 'Submit', 'Contact Form via WhatsApp');
        
        // Mostrar notificação de sucesso
        showNotification('Abrindo WhatsApp para enviar sua mensagem!', 'success');
        
        // Limpar formulário após 2 segundos
        setTimeout(() => {
            contactForm.reset();
        }, 2000);
    });
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Adiciona estilos inline
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '0',
        lineHeight: '1'
    });
    
    document.body.appendChild(notification);
    
    // Fechar ao clicar no X
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adicionar animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// LOADING INICIAL
// ===========================
window.addEventListener('load', () => {
    // Adicionar classe para animações iniciais
    document.body.classList.add('loaded');
    
    // Iniciar animação dos elementos visíveis
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===========================
// PREVENÇÃO DE SCROLL HORIZONTAL
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Prevenir scroll horizontal em dispositivos touch
    let startX;
    let scrollLeft;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = window.pageXOffset;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!startX) return;
        
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        
        if (Math.abs(walk) > 10) {
            e.preventDefault();
        }
    });
});

// ===========================
// PERFORMANCE: LAZY LOADING DE IMAGENS
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// GOOGLE ANALYTICS - TRACKING DE EVENTOS
// ===========================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track cliques em links externos
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('External Link', 'Click', this.href);
    });
});

// Track cliques no botão WhatsApp flutuante
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
        trackEvent('WhatsApp', 'Click', 'Floating Button');
    });
}

// Track cliques nos botões CTA
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA', 'Click', this.textContent);
    });
});

// Track scroll depth
let scrollDepth = {
    '25%': false,
    '50%': false,
    '75%': false,
    '100%': false
};

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent >= 25 && !scrollDepth['25%']) {
        scrollDepth['25%'] = true;
        trackEvent('Scroll Depth', 'Reached', '25%');
    }
    if (scrollPercent >= 50 && !scrollDepth['50%']) {
        scrollDepth['50%'] = true;
        trackEvent('Scroll Depth', 'Reached', '50%');
    }
    if (scrollPercent >= 75 && !scrollDepth['75%']) {
        scrollDepth['75%'] = true;
        trackEvent('Scroll Depth', 'Reached', '75%');
    }
    if (scrollPercent >= 95 && !scrollDepth['100%']) {
        scrollDepth['100%'] = true;
        trackEvent('Scroll Depth', 'Reached', '100%');
    }
});

// ===========================
// CONSOLE LOG ESTILIZADO
// ===========================
console.log(
    '%c👋 Olá, Dev! ',
    'background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);
console.log(
    '%cSe você está vendo isso, significa que está curioso sobre o código! 🚀',
    'color: #06b6d4; font-size: 14px; font-weight: 500;'
);
console.log(
    '%cVamos conversar? Entre em contato pelo formulário! 💬',
    'color: #9ca3af; font-size: 12px;'
);

// ===========================
// DEBUG MODE (remover em produção)
// ===========================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Modo de desenvolvimento ativo');
    
    // Mostrar seções sendo observadas
    window.debugObserver = () => {
        const reveals = document.querySelectorAll('.reveal');
        console.log(`📊 ${reveals.length} elementos com animação de reveal`);
        reveals.forEach((el, i) => {
            console.log(`${i + 1}. ${el.tagName} - ${el.classList.contains('active') ? '✅ Ativo' : '⏳ Aguardando'}`);
        });
    };
    
    console.log('💡 Digite debugObserver() no console para ver status das animações');
}

// ===========================
// PWA - SERVICE WORKER REGISTRATION
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(err => {
                console.log('Falha no registro do ServiceWorker:', err);
            });
    });
}

// ===========================
// MODAL PROJETOS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const projectsData = {
        sitio: {
            title: 'Sítio Triunfo',
            image: 'assets/project-sitio.jpg',
            description: 'Landing page desenvolvida para o Sítio Triunfo, um espaço para aluguel de eventos. O site apresenta uma galeria de fotos interativa, seções com as comodidades do local, mapa de localização integrado com o Google Maps e informações de contato direto. O design é responsivo e focado em atrair clientes através de um visual limpo e convidativo.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsivo'],
            liveUrl: 'https://sitiotriunfo.netlify.app',
            repoUrl: '#' // IMPORTANTE: Substitua pelo link do seu repositório
        },
        ponto: {
            title: 'Sistema de Ponto V2',
            image: 'assets/project-ponto.jpg',
            description: 'Aplicação web completa para gerenciamento de ponto eletrônico. Funcionários podem registrar entradas e saídas, e o sistema calcula automaticamente as horas trabalhadas, horas extras e banco de horas. Administradores têm acesso a um dashboard com relatórios detalhados por funcionário ou período. A autenticação é feita via JWT.',
            tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
            liveUrl: 'https://pontov2.netlify.app',
            repoUrl: '#' // IMPORTANTE: Substitua pelo link do seu repositório
        },
        carol: {
            title: 'Cardápio Digital - Carol Coxinhas',
            image: 'assets/project-carol.jpg',
            description: 'Cardápio digital interativo criado para a franquia Carol Coxinhas. O projeto visa substituir o cardápio físico, oferecendo uma experiência mais dinâmica para o cliente. Permite a fácil visualização dos produtos, combos e promoções, com um design que segue a identidade visual da marca.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX'],
            liveUrl: 'https://carolcoxinhas1.netlify.app',
            repoUrl: '#' // IMPORTANTE: Substitua pelo link do seu repositório
        },
        clickfotos: {
            title: 'Galeria Click Fotos',
            image: 'assets/project-clickfotos.jpg',
            description: 'Plataforma estilo portfólio para fotógrafos. O site permite a criação de galerias de fotos, organizadas por categorias. Implementado com lazy loading para otimizar o carregamento das imagens e uma interface minimalista para dar total destaque ao trabalho do fotógrafo. A gestão do conteúdo é feita através do Firebase.',
            tags: ['React', 'Firebase', 'Styled-Components', 'Fotografia'],
            liveUrl: 'https://clickfotos.netlify.app',
            repoUrl: '#' // IMPORTANTE: Substitua pelo link do seu repositório
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.querySelector('.project-modal-body');
    const closeModalBtn = document.getElementById('projectModalClose');
    const modalOverlay = document.getElementById('projectModalOverlay');

    if (!modal || !projectCards.length) return;

    const openModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <div class="modal-project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <h3 class="modal-project-title">${project.title}</h3>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <p class="modal-project-description">${project.description}</p>
            <div class="modal-project-links">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Ver Projeto Online</a>
                <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Ver Repositório</a>
            </div>
        `;

        modal.classList.add('active');
        document.body.classList.add('body-no-scroll');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('body-no-scroll');
    };

    projectCards.forEach(card => card.addEventListener('click', () => openModal(card.dataset.project)));
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => (e.key === 'Escape') && closeModal());
});
