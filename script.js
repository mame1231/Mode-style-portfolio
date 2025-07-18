// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// タッチデバイスかどうかを検出
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

// タッチデバイスまたは画面幅が1024px以下の場合はカーソルを非表示
if (isTouchDevice() || window.innerWidth <= 1024) {
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
} else {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    });
}

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// ウィンドウリサイズ時にカーソルの表示/非表示を切り替え
window.addEventListener('resize', () => {
    if (isTouchDevice() || window.innerWidth <= 1024) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
        document.body.style.cursor = 'none';
    }
});

// Hover effect for links
const links = document.querySelectorAll('a, button, .work-item');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--black)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--gray-700)';
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// メニュー内のリンクをクリックしたら閉じる
const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Add fade-in class to elements with direction
document.querySelectorAll('.section-header, .about-content, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ページ読み込み時に既に画面内にある要素にもアニメーションを適用
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.section-header').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('fade-in');
            }
        });
    }, 500);
});

// Special animation for mamedaihuku with rotation
document.querySelectorAll('.about-mamedaihuku').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'rotate(-10deg) translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Work items with specific animations
document.querySelectorAll('.work-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Beauty project in ebetsu と RE:BIRTH は左から
    if (index === 0 || index === 3) {
        el.style.transform = 'translateX(-50px)';
        el.classList.add('from-left');
    }
    // WOODEN STUDIO と Blue Paint は右から
    else if (index === 2 || index === 4) {
        el.style.transform = 'translateX(50px)';
        el.classList.add('from-right');
    }
    // Voice Chain は下から
    else {
        el.style.transform = 'translateY(30px)';
        el.classList.add('from-bottom');
    }
    
    observer.observe(el);
});

// CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .fade-in.from-left {
        transform: translateX(0) !important;
    }
    .fade-in.from-right {
        transform: translateX(0) !important;
    }
    .fade-in.from-bottom {
        transform: translateY(0) !important;
    }
    .about-mamedaihuku.fade-in {
        transform: rotate(-10deg) translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Hero Title Animation
const heroTitle = document.querySelector('.hero-title');
const titleLines = heroTitle.querySelectorAll('.title-line');

// フォントが読み込まれてからアニメーションを開始
document.fonts.ready.then(() => {
    // ナビゲーションロゴを表示
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.style.opacity = '1';
    }
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(100%)';
        line.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
});

// Hero Subtitle Animation
const heroSubtitle = document.querySelector('.hero-subtitle');
heroSubtitle.style.opacity = '0';
heroSubtitle.style.transform = 'translateY(20px)';
heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
    heroSubtitle.style.opacity = '1';
    heroSubtitle.style.transform = 'translateY(0)';
}, 800);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const videoContainer = document.querySelector('.video-container');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
    
    if (videoContainer) {
        videoContainer.style.transform = `scale(${1 + scrolled * 0.0003})`;
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--black);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Mobile menu styling
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media screen and (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background-color: var(--white);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.5s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .menu-toggle.active span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:last-child {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// Smooth scroll for video
const video = document.querySelector('video');
if (video) {
    video.playbackRate = 0.8;
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// レスポンシブ時のWORKSスクロールアニメーション
function setupMobileWorkAnimation() {
    if (window.innerWidth <= 768) {
        const workItems = document.querySelectorAll('.work-item');
        
        const observerOptions = {
            threshold: 0.5, // 画像の50%が画面に入ったら
            rootMargin: '0px'
        };
        
        const workObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    // 画面から外れたら元に戻す
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);
        
        workItems.forEach(item => {
            workObserver.observe(item);
        });
    }
}

// 初期化
setupMobileWorkAnimation();

// リサイズ時にも再実行
window.addEventListener('resize', () => {
    setupMobileWorkAnimation();
});