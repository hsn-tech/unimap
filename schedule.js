// ============= دوال الجدول الدراسي =============

// عرض جدول المواد
const renderScheduleTable = () => {
    const body = getEl("schedule-table-body");
    if (!body) return;

    if (state.schedules.length === 0) {
        body.innerHTML = '<p class="empty-message">لا توجد جداول مضافة</p>';
        return;
    }

    body.innerHTML = state.schedules.map((s, i) => `
        <div class="table-row">
            <div class="table-cell">${s.room}</div>
            <div class="table-cell">${s.day}</div>
            <div class="table-cell">${s.time}</div>
            <div class="table-cell">${s.name}</div>
            <button class="btn-delete" data-index="${i}">حذف</button>
        </div>
    `).join("");

    body.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", e => {
            state.schedules.splice(parseInt(e.target.dataset.index), 1);
            localStorage.setItem("schedules", JSON.stringify(state.schedules));
            renderScheduleTable();
        });
    });
};

// عرض محتوى صفحة المعلومات
const renderInfoContent = () => {
    const container = getEl("info-content");
    if (container) {
        const header = `<div class="info-section"><h2 class="info-title">جامعة الإمام محمد بن سعود الإسلامية</h2><p class="info-subtitle">الكلية التطبيقية - فرع حريملاء</p></div>`;
        
        const items = infoItems.map(item => `
            <div class="info-item">
                <div class="info-icon">${item.icon}</div>
                <div><p class="info-label">${item.label}</p><p class="info-value">${item.value}</p></div>
            </div>
        `).join("");
        
        container.innerHTML = header + items;
    }
};
