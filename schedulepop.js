// ============= دوال النوافذ المنبثقة =============

// فتح/إغلاق نافذة إضافة مادة
const handleModal = (action) => {
    const modal = getEl("add-schedule-modal");
    if (!modal) return;

    if (action === 'open') {
        modal.classList.add("active");
    } else if (action === 'close') {
        modal.classList.remove("active");
        getEl("schedule-form")?.reset();
    }
};

// مستمعي نافذة إضافة مادة
const setupScheduleModalListeners = () => {
    getEl("add-schedule-btn")?.addEventListener("click", () => handleModal('open'));

    getEl("schedule-form")?.addEventListener("submit", e => {
        e.preventDefault();
        const form = e.target;
        
        state.schedules.push({
            name: form['course-name'].value,
            day: form['course-day'].value,
            time: form['course-time'].value,
            room: form['course-room'].value,
        });
        
        localStorage.setItem("schedules", JSON.stringify(state.schedules));
        renderScheduleTable();
        handleModal('close');
    });

    qSelAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', () => handleModal('close'));
    });

    getEl("add-schedule-modal")?.addEventListener('click', (e) => {
        if (e.target.id === "add-schedule-modal") handleModal('close');
    });
};

// مستمعي نافذة تفاصيل القاعة
const setupRoomModalListeners = () => {
    getEl("room-details-modal")?.addEventListener('click', (e) => {
        if (e.target.id === "room-details-modal") {
            getEl("room-details-modal").classList.remove("active");
        }
    });

    qSelAll('[data-action="close-room-modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            getEl("room-details-modal").classList.remove("active");
        });
    });
};
