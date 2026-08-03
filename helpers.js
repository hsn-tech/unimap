// ============= دوال مساعدة للـ DOM =============

const getEl = id => document.getElementById(id);
const qSel = sel => document.querySelector(sel);
const qSelAll = sel => document.querySelectorAll(sel);

// جيب لون الفئة
const getCategoryColor = cat => ({
    classroom: "limegreen",
    lab: "mediumpurple",
    office: "darkorange",
    restroom: "deepskyblue",
    common: "gold"
})[cat] || "slateblue";

// جيب اسم الفئة بالعربي
const getCategoryName = cat => ({
    classroom: "قاعة دراسية",
    lab: "مختبر",
    office: "مكتب",
    restroom: "دورة مياه",
    common: "منطقة مشتركة"
})[cat] || "آخر";

// عرض رسالة توست
const showMapToast = (message) => {
    const toast = getEl("toast-message");
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.remove("hidden");
    
    setTimeout(() => toast.classList.add("hidden"), 3000);
};
