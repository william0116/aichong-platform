/* ============================================
   爱宠平台 - 移动端交互脚本
   ============================================ */

// 页面切换
function switchTab(tabName) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(`page-${tabName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新底部导航状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 找到对应的tab并激活
    const tabMap = {
        'home': 0,
        'welfare': 1,
        'service': 2,
        'mall': 3,
        'profile': 4,
        'community': 3  // 商城和社区共享第4个tab
    };
    
    const tabIndex = tabMap[tabName];
    if (tabIndex !== undefined) {
        const tabs = document.querySelectorAll('.tab-item');
        if (tabs[tabIndex]) {
            tabs[tabIndex].classList.add('active');
        }
    }
    
    // 社区页面特殊处理
    if (tabName === 'community') {
        document.querySelectorAll('.tab-item')[3].classList.add('active');
    }
    
    // 滚动到顶部
    const scrollContent = targetPage?.querySelector('.scroll-content');
    if (scrollContent) {
        scrollContent.scrollTop = 0;
    }
}

// 更新时间
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 积分数字动画
function animatePoints() {
    const pointsNumber = document.querySelector('.points-number');
    if (!pointsNumber) return;
    
    const target = 128;
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const update = () => {
        current += increment;
        if (current < target) {
            pointsNumber.textContent = `+${Math.floor(current)}`;
            requestAnimationFrame(update);
        } else {
            pointsNumber.textContent = `+${target}`;
        }
    };
    
    update();
}

// 进度条动画
function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 页面加载动画
function initAnimations() {
    // 卡片渐入动画
    const animateItems = document.querySelectorAll('.action-item, .pet-card, .store-card, .news-item, .stat-card, .rescue-item, .service-card, .product-card, .post-item, .menu-item');
    
    animateItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
}

// 触摸反馈
function addTouchFeedback() {
    const buttons = document.querySelectorAll('button, .action-item, .tab-item, .menu-item');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 下拉刷新效果（模拟）
function addPullToRefresh() {
    const scrollContents = document.querySelectorAll('.scroll-content');
    
    scrollContents.forEach(content => {
        let startY = 0;
        let isPulling = false;
        
        content.addEventListener('touchstart', (e) => {
            if (content.scrollTop === 0) {
                startY = e.touches[0].pageY;
                isPulling = true;
            }
        });
        
        content.addEventListener('touchmove', (e) => {
            if (!isPulling) return;
            
            const currentY = e.touches[0].pageY;
            const diff = currentY - startY;
            
            if (diff > 0 && content.scrollTop === 0) {
                // 可以添加下拉刷新UI
            }
        });
        
        content.addEventListener('touchend', () => {
            isPulling = false;
        });
    });
}

// 关注按钮切换
function toggleFollow(btn) {
    if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.textContent = '关注';
        btn.style.background = 'var(--primary)';
    } else {
        btn.classList.add('following');
        btn.textContent = '已关注';
        btn.style.background = 'var(--text-light)';
    }
}

// 点赞效果
function toggleLike(btn) {
    const icon = btn.querySelector('i');
    const count = btn.textContent.match(/\d+/);
    
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        icon.style.color = 'var(--text-secondary)';
        if (count) {
            btn.innerHTML = `<i class="fas fa-heart"></i> ${parseInt(count[0]) - 1}`;
        }
    } else {
        btn.classList.add('liked');
        icon.style.color = 'var(--primary)';
        icon.style.transform = 'scale(1.3)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
        
        if (count) {
            btn.innerHTML = `<i class="fas fa-heart"></i> ${parseInt(count[0]) + 1}`;
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 更新时间
    updateTime();
    setInterval(updateTime, 60000);
    
    // 启动动画
    setTimeout(() => {
        animatePoints();
        animateProgress();
        initAnimations();
    }, 300);
    
    // 添加触摸反馈
    addTouchFeedback();
    
    // 添加下拉刷新
    addPullToRefresh();
    
    // 关注按钮事件
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFollow(btn);
        });
    });
    
    // 点赞按钮事件
    document.querySelectorAll('.post-actions button:first-child').forEach(btn => {
        btn.addEventListener('click', () => toggleLike(btn));
    });
    
    // 服务分类切换
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // 社区标签切换
    document.querySelectorAll('.comm-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.comm-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    console.log('🐾 爱宠平台移动端已加载');
});

// 防止双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
