let isLoggedIn = false;
let currentUser = null;

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        logout();
    } else {
        loginModal.classList.remove('hidden');
    }
});

closeModal.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email') || e.target[0].value;
    const password = formData.get('password') || e.target[1].value;
    
    if (email && password) {
        login(email, password);
    }
});

function login(email, password) {
    if (email === 'test@landbridge.com' && password === 'password123') {
        isLoggedIn = true;
        currentUser = { email: email, name: 'テストユーザー' };
        
        loginBtn.textContent = 'ログアウト';
        loginBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        loginBtn.classList.add('bg-red-600', 'hover:bg-red-700');
        
        loginModal.classList.add('hidden');
        
        showNotification('ログインしました', 'success');
        
        updateUIForLoggedInUser();
    } else {
        showNotification('メールアドレスまたはパスワードが間違っています', 'error');
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    
    loginBtn.textContent = 'ログイン';
    loginBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
    loginBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    
    showNotification('ログアウトしました', 'info');
    
    updateUIForLoggedOutUser();
}

function updateUIForLoggedInUser() {
    const trackingSection = document.querySelector('#tracking .text-center.text-gray-600');
    if (trackingSection) {
        trackingSection.innerHTML = '<p class="text-green-600">ログイン済み - 追跡機能をご利用いただけます</p>';
    }
    
    const trackingButton = document.querySelector('#tracking button');
    if (trackingButton) {
        trackingButton.disabled = false;
        trackingButton.classList.remove('opacity-50', 'cursor-not-allowed');
        trackingButton.addEventListener('click', handleTracking);
    }
}

function updateUIForLoggedOutUser() {
    const trackingSection = document.querySelector('#tracking .text-center p');
    if (trackingSection) {
        trackingSection.textContent = '※ログインが必要です';
        trackingSection.className = 'text-gray-600';
    }
    
    const trackingButton = document.querySelector('#tracking button');
    if (trackingButton) {
        trackingButton.disabled = true;
        trackingButton.classList.add('opacity-50', 'cursor-not-allowed');
        trackingButton.removeEventListener('click', handleTracking);
    }
}

function handleTracking() {
    if (!isLoggedIn) {
        showNotification('追跡機能を利用するにはログインが必要です', 'warning');
        loginModal.classList.remove('hidden');
        return;
    }
    
    const trackingInput = document.querySelector('#tracking input');
    const trackingNumber = trackingInput.value.trim();
    
    if (!trackingNumber) {
        showNotification('追跡番号を入力してください', 'warning');
        return;
    }
    
    showTrackingResult(trackingNumber);
}

function showTrackingResult(trackingNumber) {
    const mockTrackingData = {
        '123456789': {
            status: '配送中',
            location: '東京配送センター',
            estimatedDelivery: '本日 16:00-18:00',
            history: [
                { time: '2024-01-15 09:00', status: '荷物受付', location: '新宿営業所' },
                { time: '2024-01-15 12:00', status: '配送センター到着', location: '東京配送センター' },
                { time: '2024-01-15 14:00', status: '配送開始', location: '東京配送センター' }
            ]
        }
    };
    
    const trackingData = mockTrackingData[trackingNumber];
    
    if (trackingData) {
        showTrackingModal(trackingData);
    } else {
        showNotification('追跡番号が見つかりません', 'error');
    }
}

function showTrackingModal(data) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">配送状況</h2>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="border-l-4 border-blue-500 pl-4">
                    <h3 class="font-semibold text-lg">${data.status}</h3>
                    <p class="text-gray-600">現在地: ${data.location}</p>
                    <p class="text-gray-600">お届け予定: ${data.estimatedDelivery}</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">配送履歴</h4>
                    <div class="space-y-2">
                        ${data.history.map(item => `
                            <div class="text-sm">
                                <span class="text-gray-500">${item.time}</span> - 
                                <span class="font-medium">${item.status}</span>
                                <span class="text-gray-600">(${item.location})</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${getNotificationColor(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return 'bg-green-500';
        case 'error': return 'bg-red-500';
        case 'warning': return 'bg-yellow-500';
        default: return 'bg-blue-500';
    }
}

function toggleFAQ(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateUIForLoggedOutUser();
    
    const priceCalculator = document.querySelector('#pricing button');
    if (priceCalculator) {
        priceCalculator.addEventListener('click', calculatePrice);
    }
});

function calculatePrice() {
    const from = document.querySelector('#pricing select:nth-of-type(1)').value;
    const to = document.querySelector('#pricing select:nth-of-type(2)').value;
    const size = document.querySelector('#pricing select:nth-of-type(3)').value;
    
    const prices = {
        '60サイズ': { '同一県内': 800, '隣接県': 1000, 'その他': 1200 },
        '80サイズ': { '同一県内': 1200, '隣接県': 1500, 'その他': 1800 },
        '100サイズ': { '同一県内': 1600, '隣接県': 2000, 'その他': 2400 }
    };
    
    let zone = '同一県内';
    if (from !== to) {
        zone = 'その他';
    }
    
    const basePrice = prices[size][zone];
    const discount = isLoggedIn ? 0.8 : 1;
    const finalPrice = Math.floor(basePrice * discount);
    
    const discountText = isLoggedIn ? ' (ログイン割引20%適用)' : '';
    
    showNotification(`配送料金: ¥${finalPrice.toLocaleString()}${discountText}`, 'success');
}

function initializeServices() {
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('今すぐお問い合わせ') || button.textContent.includes('料金確認')) {
            button.addEventListener('click', () => {
                if (!isLoggedIn) {
                    showNotification('サービス詳細の確認にはログインが必要です', 'warning');
                    loginModal.classList.remove('hidden');
                } else {
                    showNotification('ありがとうございます。担当者よりご連絡いたします。', 'success');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeServices);