// ============= دوال زر التنقل =============

// الانتقال لصفحة معينة
const navigateTo = pageId => {
    // إخفاء جميع الصفحات (بما فيها صفحة تسجيل الدخول)
    qSelAll(".page, .login-page").forEach(p => p.classList.remove("active"));
    qSelAll(".nav-item").forEach(item => item.classList.remove("active"));

    const targetPage = getEl(pageId);
    if (targetPage) {
        targetPage.classList.add("active");
        qSel(`.nav-item[data-page="${pageId}"]`)?.classList.add("active");

        if (pageId === 'map-page') {
            requestAnimationFrame(() => {
                mapInitialized = false;
                setupNavigationButton();
                initMap();
            });
        }
    }
};

// معالج حدث زر التنقل
const navigationButtonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    mapState.isNavigationMode = !mapState.isNavigationMode;
    
    getEl("navigationBtn")?.classList.toggle("active", mapState.isNavigationMode);
    getEl("mapSvg")?.classList.toggle("navigation-mode", mapState.isNavigationMode);

    if (!mapState.isNavigationMode) {
        mapState.startPoint = mapState.endPoint = null;
        mapState.path = [];
        renderPath();
        getEl("timePopup")?.classList.add("hidden");
        showMapToast("تم إلغاء وضع التنقل");
    } else {
        showMapToast(" اختر نقطة البداية.");
    }
};

// تهيئة زر التنقل
const setupNavigationButton = () => {
    const navigationBtn = getEl("navigationBtn");
    if (!navigationBtn) return;
    
    navigationBtn.removeEventListener("click", navigationButtonHandler);
    navigationBtn.addEventListener("click", navigationButtonHandler);
};

// الانتقال لقاعة معينة
const navigateToRoom = (roomId) => {
    const room = allRooms.find(r => r.id === roomId);
    if (!room) {
        showMapToast("القاعة غير موجودة");
        return;
    }

    if (mapState.currentFloor !== room.floor) {
        mapState.currentFloor = room.floor;
        
        qSelAll(".floor-btn").forEach(btn => {
            btn.classList.toggle("active", parseInt(btn.dataset.floor) === room.floor);
        });
        
        updateMapTitle();
    }

    renderRooms();
    toggleSidebar(false);
    showMapToast(`تم التنقل إلى ${room.name} - الطابق ${room.floor}`);
};