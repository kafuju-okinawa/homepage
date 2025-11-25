let currentLang = 'jp';

document.addEventListener('DOMContentLoaded', () => {
    renderMenu(foodMenuData, 'food-content');
    renderMenu(drinkMenuData, 'drink-content');
    
    // 新機能: 追加ページのレンダリング
    renderRecommend();
    renderRanking();
    renderBlogList();
    renderLatestNews();
    
    updateLanguage(currentLang);
    setupNavigation();
    
    // URLのハッシュ(#)をチェックして、特定の記事を開く
    checkHash();

    setTimeout(setupScrollAnimations, 100);
});

// --- おすすめページのレンダリング ---
function renderRecommend() {
    const container = document.getElementById('recommend-list');
    if (!container) return;
    container.innerHTML = '';
    const t = menuTranslations[currentLang];

    recommendItems.forEach((item, index) => {
        const title = t[item.key] || item.key;
        
        const el = document.createElement('div');
        el.className = `bg-section border border-gold/30 p-6 shadow-lg scroll-fade-up delay-${index * 100}`;
        el.innerHTML = `
            <div class="relative h-64 mb-6 overflow-hidden border border-gold/20">
                <img src="${item.img}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            </div>
            <h3 class="text-2xl font-serif text-gold mb-2">${title}</h3>
            <p class="text-xl text-white font-hand mb-4">${item.price}</p>
            <p class="text-slate-300 leading-relaxed font-sans">${item.comment}</p>
        `;
        container.appendChild(el);
    });
}

// --- ランキングページのレンダリング ---
function renderRanking() {
    const container = document.getElementById('ranking-list');
    if (!container) return;
    container.innerHTML = '';
    const t = menuTranslations[currentLang];

    rankingItems.forEach((item, index) => {
        const title = t[item.key] || item.key;
        const rankColor = index === 0 ? 'text-gold' : (index === 1 ? 'text-slate-300' : 'text-amber-700');
        
        const el = document.createElement('div');
        el.className = `flex flex-col md:flex-row items-center gap-8 bg-section p-6 border border-gold/20 scroll-fade-up delay-${index * 100}`;
        el.innerHTML = `
            <div class="text-5xl font-serif font-bold ${rankColor} w-16 text-center">No.${item.rank}</div>
            <div class="w-full md:w-1/3 h-48 overflow-hidden border border-gold/20 flex-shrink-0">
                <img src="${item.img}" alt="${title}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow text-center md:text-left">
                <h3 class="text-2xl font-serif text-white mb-2">${title}</h3>
                <p class="text-xl text-gold font-hand mb-4">${item.price}</p>
                <p class="text-slate-300 font-sans">${item.comment}</p>
            </div>
        `;
        container.appendChild(el);
    });
}

// --- ブログ一覧のレンダリング ---
function renderBlogList() {
    const container = document.getElementById('blog-list');
    if (!container) return;
    container.innerHTML = '';
    const t = menuTranslations[currentLang];

    blogPosts.forEach((post, index) => {
        const el = document.createElement('div');
        el.className = `bg-navy border border-gold/20 cursor-pointer group scroll-fade-up delay-${index * 100} hover:border-gold transition-colors`;
        el.onclick = () => showBlogPost(post.id);
        
        el.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute bottom-0 left-0 bg-navy/80 text-gold px-3 py-1 text-sm font-hand">${post.date}</div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-serif text-white mb-4 group-hover:text-gold transition-colors line-clamp-2">${post.title}</h3>
                <div class="text-right text-gold text-sm hover:underline" data-key="blog-read-more">${t['blog-read-more'] || 'Read More →'}</div>
            </div>
        `;
        container.appendChild(el);
    });
}

// --- トップページお知らせ欄のレンダリング ---
function renderLatestNews() {
    const container = document.getElementById('latest-news-container');
    if (!container || blogPosts.length === 0) return;
    
    const latest = blogPosts[0];
    container.innerHTML = `
        <div class="flex flex-col md:flex-row gap-2 md:gap-4 text-sm md:text-base text-slate-300 cursor-pointer hover:text-gold transition-colors" onclick="showBlogPost('${latest.id}')">
            <span class="text-gold font-hand whitespace-nowrap">${latest.date}</span>
            <span class="line-clamp-1">${latest.title}</span>
        </div>
    `;
}

// --- ブログ詳細表示 ---
function showBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    // URLのハッシュを更新 (履歴に残す)
    window.location.hash = id;

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-image').src = post.image;
    document.getElementById('post-content').innerHTML = post.content;

    switchPage('post');
}

// --- ハッシュチェック (#post-1 などで直接開く用) ---
function checkHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('post-')) {
        showBlogPost(hash);
    } else if (hash && hash !== 'home') {
        switchPage(hash);
    }
}

// --- (以下、既存の関数) ---
function renderMenu(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    const t = menuTranslations[currentLang];

    data.forEach((category, catIndex) => {
        const section = document.createElement('div');
        section.className = 'mb-20 scroll-fade-up'; 
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
            row.className = `menu-list-item flex justify-between items-baseline py-3 cursor-pointer group scroll-fade-up delay-${(index % 4) * 100}`;
            row.dataset.key = item.key;
            row.dataset.price = item.price;
            row.innerHTML = `
                <div class="flex-1 pr-4">
                    <h4 class="text-lg font-bold text-washi group-hover:text-gold transition-colors font-serif tracking-wider">${title}</h4>
                    <p class="text-xs text-gray-400 font-light line-clamp-1 mt-1 group-hover:text-gray-300" data-key="${item.key}-desc">${desc}</p>
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
    
    renderRecommend();
    renderRanking();
    renderBlogList();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
});

function switchPage(pageId) {
    document.querySelectorAll('.view-section').forEach(s => {
        s.classList.remove('active');
    });
    
    let targetId = `${pageId}-view`;
    if (pageId === 'home') targetId = 'home-view';
    if (pageId === 'recommend' || pageId === 'ranking' || pageId === 'blog' || pageId === 'post') {
        targetId = `${pageId}-view`;
    }
    
    const target = document.getElementById(targetId);
    if(target) {
        target.classList.add('active');
        setTimeout(setupScrollAnimations, 100);
    }

    const hero = document.getElementById('top-hero');
    if (pageId === 'home') {
        hero.classList.remove('hero-hidden');
        hero.classList.add('hero-visible');
    } else {
        hero.classList.remove('hero-visible');
        hero.classList.add('hero-hidden');
    }
    
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const page = link.dataset.page;
        const isBlog = (pageId === 'blog' || pageId === 'post') && page === 'blog';
        
        if(page === pageId || isBlog) {
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

function setupScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const targets = document.querySelectorAll('.scroll-fade-up');
    targets.forEach(target => {
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
