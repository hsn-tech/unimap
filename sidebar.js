// ============= دوال القائمة الجانبية =============

// عرض قائمة المفضلة
const renderFavoritesList = () => {
    const favoritesList = getEl("favorites-list");
    if (!favoritesList) return;

    if (state.favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-favorites">لا توجد مفضلة</p>';
        return;
    }

    const favRooms = allRooms.filter(r => state.favorites.includes(r.id));
    
    favoritesList.innerHTML = favRooms.map(room => `
        <div class="favorite-item" data-room-id="${room.id}">
            <span>${room.icon}</span>
            <span>${room.name}</span>
        </div>
    `).join("");

    favoritesList.querySelectorAll(".favorite-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            navigateToRoom(item.dataset.roomId);
        });
    });
};

// فتح/إغلاق القائمة الجانبية
const toggleSidebar = (show) => {
    const sidebar = getEl("sidebar-menu");
    const overlay = getEl("sidebar-overlay");
    
    if (show) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        renderFavoritesList();
    } else {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }
};

// مستمعي القائمة الجانبية
const setupSidebarListeners = () => {
    getEl("hamburger-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar(true);
    });

    getEl("close-sidebar")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar(false);
    });

    getEl("sidebar-overlay")?.addEventListener("click", (e) => {
        if (e.target.id === "sidebar-overlay") {
            toggleSidebar(false);
        }
    });
};
