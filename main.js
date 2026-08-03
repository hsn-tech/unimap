// ============= بداية البرنامج =============

document.addEventListener("DOMContentLoaded", () => {
    // إنشاء القوالب أولاً
    initializeApp();

    // تطبيق الوضع الليلي إذا كان مفعّل
    if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
        const darkModeToggle = getEl("dark-mode-toggle");
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // عرض المحتوى الأولي
    renderSearchResults();
    renderInfoContent();
    renderScheduleTable();



// تسجيل الدخول
document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "login-form") {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const scriptPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/login.php';

        try {
            const response = await fetch(scriptPath, {
                method: "POST",
                body: formData
            });

            const result = await response.text();
            console.log("الرد من السيرفر:", result); 

            if (result.trim() === "success") {
                state.isLoggedIn = true;
                navigateTo("map-page");
                qSel(".bottom-nav").style.display = "flex";
            } else {
                alert("بيانات الدخول غير صحيحة، حاول مرة أخرى.");
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("فشل الاتصال: تأكد أنك تفتح الموقع عبر http://localhost وليس بفتح الملف مباشرة.");
        }
    }
});


    // تسجيل الخروج
    getEl("logout-btn")?.addEventListener("click", () => {
        state.isLoggedIn = false;
        qSel(".bottom-nav").style.display = "none";
        mapInitialized = false;
        navigateTo("login-page");
    });

    // أزرار التنقل السفلية
    qSelAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => navigateTo(item.dataset.page));
    });

    // خانة البحث
    qSel(".search-input")?.addEventListener("input", e => renderSearchResults(e.target.value));

    // مفتاح الوضع الليلي
    getEl("dark-mode-toggle")?.addEventListener("change", (e) => {
        document.documentElement.classList.toggle("dark", e.target.checked);
        state.isDarkMode = e.target.checked;
        localStorage.setItem("darkMode", e.target.checked);
        
        // إعادة رسم القاعات لتحديث ألوان النصوص
        if (mapInitialized) {
            renderRooms();
        }
    });

    setupSidebarListeners();
    setupScheduleModalListeners();
    setupRoomModalListeners();

});