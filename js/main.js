let currentLang = 'jp';

document.addEventListener('DOMContentLoaded', () => {
    renderMenu(foodMenuData, 'food-content');
    renderMenu(drinkMenuData, 'drink-content');
    updateLanguage(currentLang);
    setupNavigation();
    
    // スクロールアニメーションの初期化（少し遅らせてDOMのレンダリングを待つ）
    setTimeout(setupScrollAnimations, 100);
});

function renderMenu(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    const t = menuTranslations[currentLang];

    data.forEach((category, catIndex) => {
        const section = document.createElement('div');
        section.className = 'mb-20 scroll-fade-up'; // セクションごとにもアニメーション
        
        const header = document.createElement('div');
        header.className = 'flex items-center gap-4 mb-8';
        header.innerHTML = `
            <h3 class="text-2xl md:text-3xl font-serif text-washi border-l-4 border-gold pl-4" data-key="${category.category}">
                ${t[category.category] || category.category}
            </h3>
            <div class="h-px bg-white/10 flex-grow"></div>
        `;
        section.appendChild(header);

        const list = document.createElement('div');
        list.className = 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4';
        
        category.items.forEach((item, index) => {
            const title = t[item.key] || item.key;
            const desc = t[`${item.key}-desc`] || '';

            const row = document.createElement('div');
            // リストアイテムにもスクロールアニメーションと遅延を追加
            row.className = `menu-list-item flex justify-between items-baseline py-3 cursor-pointer group scroll-fade-up delay-${(index % 4) * 100}`;
            row.dataset.key = item.key;
            row.dataset.price = item.price;
            
            row.innerHTML = `
                <div class="flex-1 pr-4">
                    <h4 class="text-lg font-bold text-washi group-hover:text-gold transition-colors font-serif tracking-wider">
                        ${title}
                    </h4>
                    <p class="text-xs text-gray-400 font-light line-clamp-1 mt-1 group-hover:text-gray-300" data-key="${item.key}-desc">
                        ${desc}
                    </p>
                </div>
                <span class="text-gold font-serif text-lg whitespace-nowrap">${item.price}</span>
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
            btn.classList.add('bg-gold', 'text-navy', 'border-transparent');
            btn.classList.remove('text-slate-400', 'border-gold/50');
        } else {
            btn.classList.remove('bg-gold', 'text-navy', 'border-transparent');
            btn.classList.add('text-slate-400', 'border-gold/50');
        }
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
});

function switchPage(pageId) {
    document.querySelectorAll('.view-section').forEach(s => {
        s.classList.remove('active');
    });
    
    const targetId = pageId === 'home' ? 'home-view' : `${pageId}-view`;
    const target = document.getElementById(targetId);
    
    if(target) {
        target.classList.add('active');
        // ページ切り替え後にスクロールアニメーションを再設定
        setTimeout(setupScrollAnimations, 100);
    }
    
    document.querySelectorAll('.nav-link, .mobile-nav-link, #logo-link').forEach(link => {
        if(link.dataset.page === pageId) {
            link.classList.add('text-gold');
        } else {
            link.classList.remove('text-gold');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu(); 
}

function setupNavigation() {
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
                t.classList.remove('active', 'text-gold', 'border-b-2', 'border-gold');
                t.classList.add('text-slate-500');
            });
            tab.classList.add('active', 'text-gold', 'border-b-2', 'border-gold');
            tab.classList.remove('text-slate-500');
            document.querySelectorAll('.menu-tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`${targetId}-content`).classList.remove('hidden');
            
            // タブ切り替え時にもアニメーション再設定
            setTimeout(setupScrollAnimations, 100);
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

// スクロールアニメーションのセットアップ
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // 画面の下10%に入ったら発火
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度表示したら監視終了
            }
        });
    }, observerOptions);

    // 監視対象の要素を取得 (.scroll-fade-up クラスがついているもの)
    const targets = document.querySelectorAll('.scroll-fade-up');
    targets.forEach(target => {
        // 既に表示済みの場合はスキップ
        if (!target.classList.contains('is-visible')) {
            observer.observe(target);
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


