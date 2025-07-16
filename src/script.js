// グローバル変数
let isLoggedIn = false;
let currentUser = null;

// DOM要素の取得を確実に行う関数
function getElements() {
    return {
        loginBtn: document.getElementById('loginBtn'),
        loginModal: document.getElementById('loginModal'),
        modalContent: document.querySelector('.modal-content'),
        closeModal: document.getElementById('closeModal'),
        loginForm: document.getElementById('loginForm')
    };
}

// ログイン機能の初期化
function initializeLogin() {
    const elements = getElements();
    
    if (elements.loginBtn) {
        elements.loginBtn.addEventListener('click', () => {
            if (isLoggedIn) {
                logout();
            } else {
                showLoginModal();
            }
        });
    }
    
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', hideLoginModal);
    }
    
    if (elements.loginModal) {
        elements.loginModal.addEventListener('click', (e) => {
            if (e.target === elements.loginModal) {
                hideLoginModal();
            }
        });
    }
    
    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

// ログインモーダルの表示
function showLoginModal() {
    const elements = getElements();
    if (elements.loginModal && elements.modalContent) {
        elements.loginModal.classList.add('active');
        elements.modalContent.classList.add('active');
    }
}

// ログインモーダルの非表示
function hideLoginModal() {
    const elements = getElements();
    if (elements.loginModal && elements.modalContent) {
        elements.loginModal.classList.remove('active');
        elements.modalContent.classList.remove('active');
    }
}

// ログインフォームの送信処理
function handleLoginSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target[0].value;
    const password = formData.get('password') || e.target[1].value;
    
    if (email && password) {
        login(email, password);
    }
}

// ログイン処理
function login(email, password) {
    // テスト用の認証（実際はサーバーで行う）
    if (email === 'test@landbridge.com' && password === 'password123') {
        isLoggedIn = true;
        currentUser = { email: email, name: 'テストユーザー' };
        
        const elements = getElements();
        if (elements.loginBtn) {
            elements.loginBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-2"></i>ログアウト';
        }
        
        hideLoginModal();
        showNotification('ログインしました', 'success');
        updateUIForLoggedInUser();
    } else {
        showNotification('メールアドレスまたはパスワードが間違っています', 'error');
    }
}

// ログアウト処理
function logout() {
    isLoggedIn = false;
    currentUser = null;
    
    const elements = getElements();
    if (elements.loginBtn) {
        elements.loginBtn.innerHTML = '<i class="fas fa-user mr-2"></i>ログイン';
    }
    
    showNotification('ログアウトしました', 'info');
    updateUIForLoggedOutUser();
}

// ログイン後のUI更新
function updateUIForLoggedInUser() {
    // ログイン必要な機能を有効化
    document.querySelectorAll('.requires-login').forEach(element => {
        element.classList.remove('disabled');
    });
}

// ログアウト後のUI更新
function updateUIForLoggedOutUser() {
    // ログイン必要な機能を無効化
    document.querySelectorAll('.requires-login').forEach(element => {
        element.classList.add('disabled');
    });
}

// 通知表示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// 集荷依頼機能
function initializePickupRequest() {
    const pickupBtns = document.querySelectorAll('.btn-pickup');
    pickupBtns.forEach(btn => {
        btn.addEventListener('click', showPickupModal);
    });
}

function showPickupModal() {
    if (!isLoggedIn) {
        showNotification('集荷依頼にはログインが必要です', 'warning');
        showLoginModal();
        return;
    }
    
    const modal = createPickupModal();
    document.body.appendChild(modal);
    modal.classList.add('active');
    modal.querySelector('.modal-content').classList.add('active');
}

function createPickupModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2 class="modal-title">集荷依頼</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="modal-form" onsubmit="handlePickupSubmit(event)">
                <div class="form-group">
                    <label class="form-label">お名前 <span class="required">*</span></label>
                    <input type="text" class="form-input" required placeholder="山田太郎">
                </div>
                <div class="form-group">
                    <label class="form-label">電話番号 <span class="required">*</span></label>
                    <input type="tel" class="form-input" required placeholder="090-1234-5678">
                </div>
                <div class="form-group">
                    <label class="form-label">集荷希望日 <span class="required">*</span></label>
                    <input type="date" class="form-input" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label class="form-label">集荷希望時間帯 <span class="required">*</span></label>
                    <select class="form-input form-select" required>
                        <option value="">選択してください</option>
                        <option value="9-12">9:00-12:00</option>
                        <option value="12-15">12:00-15:00</option>
                        <option value="15-18">15:00-18:00</option>
                        <option value="18-21">18:00-21:00</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">集荷先住所 <span class="required">*</span></label>
                    <textarea class="form-input" required rows="3" placeholder="東京都新宿区○○1-2-3"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">荷物の個数</label>
                    <input type="number" class="form-input" min="1" value="1">
                </div>
                <div class="form-group">
                    <label class="form-label">備考</label>
                    <textarea class="form-input" rows="2" placeholder="特記事項があれば記入してください"></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-full">
                    集荷を依頼する
                </button>
            </form>
        </div>
    `;
    return modal;
}

function handlePickupSubmit(event) {
    event.preventDefault();
    showNotification('集荷依頼を受け付けました。確認メールをお送りします。', 'success');
    event.target.closest('.modal-overlay').remove();
}

// エリア選択・料金計算機能
function initializePriceCalculator() {
    // クイック見積もり
    const quickEstimateBtn = document.querySelector('.quick-estimate-section .btn-primary');
    if (quickEstimateBtn) {
        quickEstimateBtn.addEventListener('click', calculateQuickEstimate);
    }
    
    // 詳細見積もりフォーム
    const detailForm = document.querySelector('.pricing-form');
    if (detailForm) {
        detailForm.addEventListener('submit', handleDetailEstimate);
    }
}

function calculateQuickEstimate() {
    const fromArea = document.querySelector('.estimate-form select:nth-of-type(1)').value;
    const toArea = document.querySelector('.estimate-form select:nth-of-type(2)').value;
    const size = document.querySelector('.estimate-form select:nth-of-type(3)').value;
    
    if (!fromArea || fromArea === 'エリアを選択' || 
        !toArea || toArea === 'エリアを選択' || 
        !size || size === 'サイズを選択') {
        showNotification('すべての項目を選択してください', 'warning');
        return;
    }
    
    // 料金計算ロジック
    const basePrice = {
        '60サイズ': 800,
        '80サイズ': 1200,
        '100サイズ': 1600,
        '120サイズ': 2000
    };
    
    const areaMultiplier = {
        '同一エリア': 1,
        '隣接エリア': 1.3,
        '遠距離': 1.8
    };
    
    // エリア間の距離を判定
    let distance = '同一エリア';
    if (fromArea !== toArea) {
        distance = (fromArea === '関東' && toArea === '関西') || 
                   (fromArea === '関西' && toArea === '関東') ? '遠距離' : '隣接エリア';
    }
    
    const price = Math.floor(basePrice[size] * areaMultiplier[distance]);
    const discountPrice = isLoggedIn ? Math.floor(price * 0.8) : price;
    
    showPriceResult(price, discountPrice);
}

function showPriceResult(price, discountPrice) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h2 class="modal-title">料金計算結果</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="text-align: center; padding: var(--spacing-6);">
                <div style="font-size: var(--font-size-3xl); color: var(--color-primary-green); font-weight: var(--font-weight-bold);">
                    ¥${discountPrice.toLocaleString()}
                </div>
                ${isLoggedIn && price !== discountPrice ? `
                    <div style="margin-top: var(--spacing-2);">
                        <span style="text-decoration: line-through; color: var(--color-text-tertiary);">¥${price.toLocaleString()}</span>
                        <span class="badge badge-success">20% OFF</span>
                    </div>
                ` : ''}
                <p style="margin-top: var(--spacing-4); color: var(--color-text-secondary);">
                    ※ 実際の料金は荷物の重量や配送条件により変動する場合があります
                </p>
                <button class="btn btn-primary" style="margin-top: var(--spacing-6);" onclick="this.closest('.modal-overlay').remove(); showPickupModal();">
                    この内容で集荷を依頼
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.classList.add('active');
    modal.querySelector('.modal-content').classList.add('active');
}

function handleDetailEstimate(event) {
    event.preventDefault();
    showNotification('見積もり依頼を受け付けました。担当者よりご連絡いたします。', 'success');
    event.target.reset();
}

// 追跡機能
function initializeTracking() {
    const trackingBtn = document.querySelector('.tracking-section .btn-primary');
    if (trackingBtn) {
        trackingBtn.addEventListener('click', handleTracking);
    }
}

function handleTracking() {
    const input = document.querySelector('.tracking-input');
    const trackingNumber = input.value.trim();
    
    if (!trackingNumber) {
        showNotification('追跡番号を入力してください', 'warning');
        return;
    }
    
    // モックデータ
    const trackingData = {
        'LB2024123456': {
            status: '配送中',
            location: '関東配送センター',
            estimatedDelivery: '本日 16:00-18:00',
            history: [
                { time: '2024-01-15 09:00', status: '荷物受付完了', location: '東京営業所' },
                { time: '2024-01-15 14:00', status: '配送センター到着', location: '関東配送センター' },
                { time: '2024-01-15 15:30', status: '配送開始', location: '関東配送センター' }
            ]
        }
    };
    
    const data = trackingData[trackingNumber];
    if (data) {
        updateTrackingDisplay(data);
    } else {
        showNotification('追跡番号が見つかりません', 'error');
    }
}

function updateTrackingDisplay(data) {
    // 実際の追跡結果を表示エリアに更新
    const exampleSection = document.querySelector('.tracking-example');
    if (exampleSection) {
        exampleSection.style.display = 'block';
        // タイムラインを更新
        const timelineItems = exampleSection.querySelectorAll('.timeline-item');
        data.history.forEach((item, index) => {
            if (timelineItems[index]) {
                timelineItems[index].classList.add('active');
                timelineItems[index].querySelector('.timeline-time').textContent = item.time;
                timelineItems[index].querySelector('.timeline-status').textContent = item.status;
                timelineItems[index].querySelector('.timeline-location').textContent = item.location;
            }
        });
    }
    showNotification('追跡情報を更新しました', 'success');
}

// ナビゲーション機能
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ページ遷移機能
function initializePageLinks() {
    // サービスページへのリンク
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = 'services.html';
        });
    });
    
    // その他のページリンクも同様に設定
    const pageLinks = {
        '.tracking-card': 'tracking.html',
        '.case-card': 'cases.html',
        '.company-info': 'company.html'
    };
    
    Object.entries(pageLinks).forEach(([selector, url]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', () => {
                window.location.href = url;
            });
        });
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
    initializePickupRequest();
    initializePriceCalculator();
    initializeTracking();
    initializeNavigation();
    initializePageLinks();
    
    // ログイン状態の復元（実際はセッションやCookieから）
    updateUIForLoggedOutUser();
});

// グローバル関数として登録
window.showPickupModal = showPickupModal;
window.handlePickupSubmit = handlePickupSubmit;