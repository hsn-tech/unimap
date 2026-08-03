// ============= حالة التطبيق =============

const state = {
    isLoggedIn: false,
    schedules: JSON.parse(localStorage.getItem("schedules")) || [],
    isDarkMode: localStorage.getItem("darkMode") === "true",
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
};

// حالة الخريطة
const mapState = {
    floorNames: { 1: "الطابق الأول", 2: "الطابق الثاني", 3: "الطابق الثالث" },
    currentFloor: 1,
    searchQuery: "",
    isNavigationMode: false,
    startPoint: null,
    endPoint: null,
    path: [],
    transform: { x: 0, y: 0, scale: 1 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    
    allWalls: [
        { x1: 100, y1: 80, x2: 1300, y2: 80 },
        { x1: 1300, y1: 80, x2: 1300, y2: 820 },
        { x1: 1300, y1: 820, x2: 100, y2: 820 },
        { x1: 100, y1: 820, x2: 100, y2: 80 },
        { x1: 100, y1: 180, x2: 400, y2: 180 },
        { x1: 275, y1: 80, x2: 275, y2: 180 },
        { x1: 100, y1: 380, x2: 400, y2: 380 },
        { x1: 100, y1: 520, x2: 400, y2: 520 },
        { x1: 250, y1: 380, x2: 250, y2: 520 },
        { x1: 100, y1: 720, x2: 400, y2: 720 },
        { x1: 250, y1: 620, x2: 250, y2: 720 },
        { x1: 500, y1: 180, x2: 900, y2: 180 },
        { x1: 700, y1: 80, x2: 700, y2: 180 },
        { x1: 500, y1: 380, x2: 900, y2: 380 },
        { x1: 500, y1: 520, x2: 900, y2: 520 },
        { x1: 700, y1: 380, x2: 700, y2: 620 },
        { x1: 500, y1: 720, x2: 900, y2: 720 },
        { x1: 1000, y1: 180, x2: 1300, y2: 180 },
        { x1: 1150, y1: 80, x2: 1150, y2: 180 },
        { x1: 1000, y1: 380, x2: 1300, y2: 380 },
        { x1: 1000, y1: 520, x2: 1300, y2: 520 },
        { x1: 1150, y1: 280, x2: 1150, y2: 520 },
        { x1: 1000, y1: 720, x2: 1300, y2: 720 },
        { x1: 1150, y1: 620, x2: 1150, y2: 720 },
    ],
};

let walkableGrid;
let mapInitialized = false;
