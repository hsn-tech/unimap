// ============= قوالب HTML =============

// قالب صفحة البحث
const createSearchPage = () => `
    <div id="search-page" class="page">
        <header class="page-header">
            <h1 class="page-title">البحث الذكي</h1>
        </header>
        <div class="search-bar">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="اكتب: قاعة 205 / المصلى / المواقف ..." class="search-input">
        </div>
        <div class="search-results" id="search-results"></div>
    </div>
`;

// قالب صفحة الجدول الدراسي
const createSchedulePage = () => `
    <div id="schedule-page" class="page">
        <header class="page-header">
            <h1 class="page-title">الجدول الدراسي</h1>
        </header>
        <div class="table-header">
            <div class="table-tabs">
                <button class="tab-btn active">القاعة</button>
                <button class="tab-btn">اليوم</button>
                <button class="tab-btn">الوقت</button>
                <button class="tab-btn">المقرر</button>
            </div>
            <button class="btn-add" id="add-schedule-btn">إضافة</button>
        </div>
        <div class="schedule-table" id="schedule-table-body">
            <p class="empty-message">لا توجد جداول مضافة</p>
        </div>
    </div>
`;

// قالب نافذة إضافة مقرر
const createScheduleModal = () => `
    <div id="add-schedule-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>إضافة مقرر</h2>
                <button class="modal-close" data-action="close-modal">×</button>
            </div>
            <form id="schedule-form" class="modal-form">
                <label for="course-name">تسمية المقرر</label>
                <input type="text" id="course-name" placeholder="مثال: الرياضيات" required class="form-input">
                
                <label for="course-day">اليوم</label>
                <select id="course-day" required class="form-input">
                    <option value="">اختر اليوم</option>
                    <option value="السبت">السبت</option>
                    <option value="الأحد">الأحد</option>
                    <option value="الاثنين">الاثنين</option>
                    <option value="الثلاثاء">الثلاثاء</option>
                    <option value="الأربعاء">الأربعاء</option>
                    <option value="الخميس">الخميس</option>
                    <option value="الجمعة">الجمعة</option>
                </select>
                
                <label for="course-time">الوقت</label>
                <input type="time" id="course-time" required class="form-input">
                
                <label for="course-room">رقم القاعة</label>
                <input type="text" id="course-room" placeholder="مثال: 205" required class="form-input">
                
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">حفظ</button>
                    <button type="button" class="btn-cancel" data-action="close-modal">إلغاء</button>
                </div>
            </form>
        </div>
    </div>
`;

// قالب نافذة تفاصيل القاعة
const createRoomDetailsModal = () => `
    <div id="room-details-modal" class="modal">
        <div class="modal-content room-details-modal">
            <div class="modal-header">
                <h2 id="room-details-name">اسم القاعة</h2>
                <button class="modal-close" data-action="close-room-modal">×</button>
            </div>
            <div class="room-details-content">
                <div class="room-detail-item">
                    <span class="detail-label">رقم القاعة:</span>
                    <span id="room-details-id" class="detail-value">---</span>
                </div>
                <div class="room-detail-item">
                    <span class="detail-label">النوع:</span>
                    <span id="room-details-category" class="detail-value">---</span>
                </div>
                <div class="room-detail-item">
                    <span class="detail-label">الطابق:</span>
                    <span id="room-details-floor" class="detail-value">---</span>
                </div>
                <button id="room-favorite-btn" class="btn-favorite">
                    <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span id="favorite-text">إضافة للمفضلة</span>
                </button>
                <button id="room-navigate-btn" class="btn-navigate hidden">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    <span>الانتقال للقاعة</span>
                </button>
            </div>
        </div>
    </div>
`;

// قالب صفحة الخريطة
const createMapPage = () => `
    <div id="map-page" class="page">
        <header class="page-header">
            <h1 class="page-title" id="map-title">خريطة الجامعة</h1>
            <button id="hamburger-btn" class="hamburger-btn" title="القوائم">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </button>
        </header>

        <div id="toast-message" class="toast-message hidden"></div>

        <div id="sidebar-menu" class="modal">
            <div class="modal-content sidebar-modal">
                <div class="modal-header">
                    <h3>الخيارات</h3>
                    <button class="modal-close" id="close-sidebar">×</button>
                </div>
                <div class="sidebar-content-wrapper">
                    <div class="sidebar-section floor-section">
                        <h4 class="sidebar-title">الطابق</h4>
                        <div class="floor-buttons">
                            <button class="floor-btn" data-floor="1">الطابق الأول</button>
                            <button class="floor-btn" data-floor="2">الطابق الثاني</button>
                            <button class="floor-btn" data-floor="3">الطابق الثالث</button>
                        </div>
                    </div>
                    <div class="sidebar-section favorites-section">
                        <h4 class="sidebar-title">المفضلة</h4>
                        <div class="favorites-list" id="favorites-list">
                            <p class="empty-favorites">لا توجد مفضلة</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebar-overlay" class="sidebar-overlay"></div>

        <div class="navigation-controls">
            <div id="timePopup" class="time-popup hidden">
                <div class="time-popup-content">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span id="timeText">الوقت التقديري للوصول: 0 دقيقة</span>
                </div>
            </div>
        </div>

        <div class="map-container-wrapper">
            <svg id="mapSvg" class="map-svg" viewBox="0 0 1400 900">
                <rect width="1400" height="900" class="map-background" />
                <g class="building-walls">
                    <path d="M 100,80 L 1300,80 M 1300,80 L 1300,820 M 1300,820 L 100,820 M 100,820 L 100,80" class="outer-wall"></path>
                    <path d="M 100,180 L 400,180 M 275,80 L 275,180 M 100,380 L 400,380 M 100,520 L 400,520 M 250,380 L 250,520 M 100,720 L 400,720 M 250,620 L 250,720 M 500,180 L 900,180 M 700,80 L 700,180 M 500,380 L 900,380 M 500,520 L 900,520 M 700,380 L 700,620 M 500,720 L 900,720 M 1000,180 L 1300,180 M 1150,80 L 1150,180 M 1000,380 L 1300,380 M 1000,520 L 1300,520 M 1150,280 L 1150,520 M 1000,720 L 1300,720 M 1150,620 L 1150,720" class="room-divider"></path>
                </g>
                <g id="pathGroup"></g>
                <g id="roomsGroup"></g>
            </svg>

            <div class="zoom-controls">
                <button id="zoomInBtn" class="zoom-btn" title="تكبير">+</button>
                <button id="zoomOutBtn" class="zoom-btn" title="تصغير">−</button>
                <button id="resetViewBtn" class="zoom-btn" title="إعادة تعيين">
                    <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                </button>
                <button id="navigationBtn" class="nav-btn" title="تحديد نقطة البداية">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
`;

// قالب صفحة معلومات الكلية
const createInfoPage = () => `
    <div id="info-page" class="page">
        <header class="page-header">
            <h1 class="page-title">معلومات الكلية</h1>
        </header>
        <div class="info-content" id="info-content"></div>
    </div>
`;

// قالب صفحة الملف الشخصي
const createProfilePage = () => `
    <div id="profile-page" class="page">
        <header class="page-header">
            <h1 class="page-title">الملف الشخصي</h1>
        </header>
        <div class="profile-content">
            <div class="profile-avatar-section">
                <div class="profile-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                <p class="profile-name">طالب - الكلية التطبيقية (حريملاء)</p>
            </div>
            <div class="profile-option">
                <p class="profile-label">الوضع الليلي</p>
                <label class="toggle-switch">
                    <input type="checkbox" id="dark-mode-toggle">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="profile-option logout" id="logout-btn">
                <svg class="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <p class="profile-label">تسجيل الخروج</p>
            </div>
        </div>
    </div>
`;

// قالب شريط التنقل السفلي
const createBottomNav = () => `
    <nav class="bottom-nav">
        <button class="nav-item active" data-page="map-page">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
            </svg>
            <span>الخريطة</span>
        </button>
        <button class="nav-item" data-page="schedule-page">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
            </svg>
            <span>الجدول</span>
        </button>
        <button class="nav-item" data-page="search-page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
            </svg>
            <span>البحث</span>
        </button>
        <button class="nav-item" data-page="info-page">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>معلومات</span>
        </button>
        <button class="nav-item" data-page="profile-page">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>الملف</span>
        </button>
    </nav>
`;

// دالة لإنشاء كل القوالب
const initializeApp = () => {
    const app = getEl("app");
    if (!app) return;

    // حفظ محتوى صفحة تسجيل الدخول الموجودة
    const existingLoginPage = app.innerHTML;
    
    // إضافة كل الصفحات (بما فيها صفحة تسجيل الدخول المحفوظة)
    app.innerHTML = existingLoginPage +
        createSearchPage() +
        createSchedulePage() +
        createScheduleModal() +
        createRoomDetailsModal() +
        createMapPage() +
        createInfoPage() +
        createProfilePage() +
        createBottomNav();
};