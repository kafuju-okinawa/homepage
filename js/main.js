let currentLang = 'jp';

document.addEventListener('DOMContentLoaded', () => {
    renderMenu(foodMenuData, 'food-content');
    renderMenu(drinkMenuData, 'drink-content');
    updateLanguage(currentLang);
    setupScrollAnimations();
    setupNavigation();
});

function renderMenu(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    
    const t = menuTranslations[currentLang];

    data.forEach(category => {
        const section = document.createElement('div');
        section.className = 'mb-20';
        
        const header = document.createElement('div');
        header.className = 'flex items-center gap-4 mb-8';
        header.innerHTML = `
            <h3 class="text-3xl font-hand text-washi border-l-4 border-kohaku pl-3" data-key="${category.category}">
                ${t[category.category] || category.category}
            </h3>
            <div class="h-px bg-white/10 flex-grow"></div>
        `;
        section.appendChild(header);

        const list = document.createElement('div');
        list.className = 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2';
        
        category.items.forEach((item, index) => {
            const title = t[item.key] || item.key;
            const desc = t[`${item.key}-desc`] || '';

            const row = document.createElement('div');
            row.className = `menu-list-item flex justify-between items-baseline py-3 cursor-pointer group fade-in-up delay-${(index % 5) * 50}`;
            row.dataset.key = item.key;
            row.dataset.price = item.price;
            
            row.innerHTML = `
                <div class="flex-1 pr-4">
                    <h4 class="text-lg font-bold text-washi group-hover:text-kohaku transition-colors font-hand tracking-wider">
                        ${title}
                    </h4>
                    <p class="text-xs text-gray-500 font-light line-clamp-1 mt-1 group-hover:text-gray-400" data-key="${item.key}-desc">
                        ${desc}
                    </p>
                </div>
                <span class="text-kohaku font-hand text-lg whitespace-nowrap">${item.price}</span>
            `;
            list.appendChild(row);
            
            row.addEventListener('click', () => openModal(item));
        });

        section.appendChild(list);
        container.appendChild(section);
    });
}

function updateLanguage(lang) {
    currentLang = lang;
    const t = menuTranslations[lang];

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if (t[key]) {
            if(!el.closest('.menu-list-item') || el.tagName !== 'H4') {
                 el.innerHTML = t[key];
            }
        }
    });
    
    document.querySelectorAll('.menu-list-item').forEach(row => {
        const key = row.dataset.key;
        const h4 = row.querySelector('h4');
        const p = row.querySelector('p');
        
        if (t[key] && h4) h4.textContent = t[key];
        if (t[`${key}-desc`] && p) p.textContent = t[`${key}-desc`];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('border-kohaku', 'text-kohaku');
            btn.classList.remove('text-gray-400', 'border-white/20');
        } else {
            btn.classList.remove('border-kohaku', 'text-kohaku');
            btn.classList.add('text-gray-400', 'border-white/20');
        }
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
});

function switchPage(pageId) {
    // 全てのビューセクションを隠す
    document.querySelectorAll('.view-section').forEach(s => {
        s.classList.remove('active');
    });
    
    // ターゲットのビューを表示
    const targetId = pageId === 'home' ? 'home-view' : `${pageId}-view`;
    const target = document.getElementById(targetId);
    
    if(target) {
        target.classList.add('active');
    }
    
    // ナビゲーションのアクティブ状態更新
    document.querySelectorAll('.nav-link, .mobile-nav-link, #logo-link').forEach(link => {
        if(link.dataset.page === pageId) {
            link.classList.add('text-kohaku');
        } else {
            link.classList.remove('text-kohaku');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu(); 
}

function setupNavigation() {
    // ナビゲーションリンクのクリック処理
    document.querySelectorAll('a[data-page]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            switchPage(pageId);
        });
    });

    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            document.querySelectorAll('.menu-tab').forEach(t => {
                t.classList.remove('active', 'text-kohaku', 'border-b-2', 'border-kohaku');
                t.classList.add('text-gray-500');
            });
            tab.classList.add('active', 'text-kohaku', 'border-b-2', 'border-kohaku');
            tab.classList.remove('text-gray-500');
            document.querySelectorAll('.menu-tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`${targetId}-content`).classList.remove('hidden');
        });
    });
    
    const btn = document.getElementById('mobile-menu-button');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    btn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
}

const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('mobile-menu-overlay');
const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');

function toggleMobileMenu() {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    line1.classList.add('rotate-45', 'translate-y-2.5');
    line2.classList.add('opacity-0');
    line3.classList.add('-rotate-45', '-translate-y-2.5');
}

function closeMobileMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    
    line1.classList.remove('rotate-45', 'translate-y-2.5');
    line2.classList.remove('opacity-0');
    line3.classList.remove('-rotate-45', '-translate-y-2.5');
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('bg-sumi/90', 'shadow-lg');
            header.classList.remove('nav-blur');
        } else {
            header.classList.remove('bg-sumi/90', 'shadow-lg');
            header.classList.add('nav-blur');
        }
    });
}

const modal = document.getElementById('menu-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-description');
const modalAllergens = document.getElementById('modal-allergens');

function openModal(item) {
    const t = menuTranslations[currentLang];
    const aT = allergenTranslations[currentLang];

    modalImg.src = item.img;
    modalTitle.textContent = t[item.key] || item.key;
    modalPrice.textContent = item.price;
    modalDesc.textContent = t[`${item.key}-detail`] || t[`${item.key}-desc`];
    
    modalAllergens.innerHTML = '';
    if(item.allergens && item.allergens.length > 0) {
        item.allergens.forEach(alg => {
            const span = document.createElement('span');
            span.className = 'px-2 py-1 bg-white/10 text-xs rounded text-gray-300';
            span.textContent = aT[alg] || alg;
            modalAllergens.appendChild(span);
        });
    } else {
         const span = document.createElement('span');
         span.className = 'text-xs text-gray-500';
         span.textContent = '-';
         modalAllergens.appendChild(span);
    }

    modal.classList.remove('hidden');
}

document.getElementById('close-modal-button').addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('modal-overlay').addEventListener('click', () => modal.classList.add('hidden'));


