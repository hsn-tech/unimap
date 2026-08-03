// ============= دوال الخريطة =============

// تحديث شبكة المشي
const updateWalkableGrid = () => walkableGrid = createWalkableGrid(GRID_SIZE, 60, mapState.allWalls);

// تحديث عنوان الخريطة
const updateMapTitle = () => {
    const titleEl = getEl("map-title");
    if (titleEl) {
        titleEl.textContent = mapState.floorNames[mapState.currentFloor] || "خريطة الجامعة";
    }
};

// رسم القاعات على الخريطة
const renderRooms = () => {
    const roomsGroup = getEl("roomsGroup");
    if (!roomsGroup) return;

    const filtered = allRooms.filter(r => 
        r.floor === mapState.currentFloor && 
        (!mapState.searchQuery || 
         r.name.includes(mapState.searchQuery) || 
         r.id.includes(mapState.searchQuery))
    );

    // تحديد لون النص بناءً على الوضع الليلي
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#e0e0e0' : '#000000';

    // تعبئة محتوى مجموعة القاعات
    roomsGroup.innerHTML = filtered.map(room => {
        // جلب لون الدائرة حسب نوع القاعة (أخضر للفصول، بنفسجي للمختبرات، إلخ)
        const color = getCategoryColor(room.category);
// إنشاء دائرة حول القاعة
        const circle = `<circle cx="${room.x}" cy="${room.y}" r="35" fill="white" stroke="${color}" stroke-width="3"/>`;
  // إنشاء نص الإيموجي (الأيقونة) في مركز الدائرة
        const icon = `<text x="${room.x}" y="${room.y}" font-size="32" text-anchor="middle" dominant-baseline="central" style="pointer-events:none">${room.icon}</text>`;
         // إنشاء نص اسم القاعة أسفل الدائرة
        const label = `<text x="${room.x}" y="${room.y + 55}" font-size="16" font-weight="600" text-anchor="middle" fill="${textColor}" style="pointer-events:none">${room.name}</text>`;
           // تجميع العناصر الثلاثة (دائرة + أيقونة + اسم) في عنصر واحد قابل للنقر
        return `<g class="room-element" data-room-id="${room.id}" onclick="handleRoomClick(event, this.dataset.roomId)">${circle}${icon}${label}</g>`;
    }).join("");
};

// عرض تفاصيل القاعة
const showRoomDetails = (roomId) => {
    const room = allRooms.find(r => r.id === roomId);
    if (!room) return;

    getEl("room-details-name").textContent = room.name;
    getEl("room-details-id").textContent = room.id;
    getEl("room-details-category").textContent = getCategoryName(room.category);
    getEl("room-details-floor").textContent = `الطابق ${room.floor}`;

    const favBtn = getEl("room-favorite-btn");
    const isFav = isFavorite(roomId);
    favBtn.classList.toggle("favorited", isFav);
    getEl("favorite-text").textContent = isFav ? "مضافة للمفضلة" : "إضافة للمفضلة";

    favBtn.onclick = () => {
        toggleFavorite(roomId);
        showRoomDetails(roomId);
    };

    const navigateBtn = getEl("room-navigate-btn");
    navigateBtn.classList.remove("hidden");
    
    navigateBtn.onclick = () => {
        mapState.currentFloor = room.floor;
        renderRooms();
        updateMapTitle();
        getEl("room-details-modal").classList.remove("active");
        navigateTo("map-page");
    };

    getEl("room-details-modal").classList.add("active");
};

// تحديث عرض المسار
const updatePathDisplay = (path) => {
    const timePopup = getEl("timePopup");
    
    if (path.length > 0) {
        mapState.path = path;
        const estimatedTime = Math.round((path.length * CELL_SIZE) / 100);
        getEl("timeText").textContent = `الوقت التقديري للوصول: ${estimatedTime} دقيقة`;
        timePopup.classList.remove("hidden");
        showMapToast("تم اختيار الوجهة");
    } else {
        mapState.endPoint = null;
        timePopup.classList.add("hidden");
        showMapToast("لا يوجد مسار متاح. جرب نقاطًا أخرى.");
    }
    
    renderPath();
};

// معالجة الضغط على الخريطة
const handleMapInteraction = (gridPoint) => {
    if (!mapState.startPoint) {
        mapState.startPoint = gridPoint;
        renderPath();
        showMapToast("تم تحديد نقطة البداية");
    } else if (!mapState.endPoint) {
        mapState.endPoint = gridPoint;
        const path = findPath(mapState.startPoint, mapState.endPoint, walkableGrid, GRID_SIZE, 60);
        updatePathDisplay(path);
    } else {
        mapState.startPoint = gridPoint;
        mapState.endPoint = null;
        mapState.path = [];
        getEl("timePopup")?.classList.add("hidden");
        showMapToast("تم تحديد نقطة البداية");
        renderPath();
    }
};

// معالجة الضغط على قاعة
const handleRoomClick = (e, roomId) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const room = allRooms.find(r => r.id === roomId);
    if (!room) return;

    if (mapState.isNavigationMode) {
        if (room.floor !== mapState.currentFloor) {
            showMapToast("يجب اختيار قاعة من الطابق الحالي");
            return;
        }
        handleMapInteraction(svgToGrid(room.x, room.y, CELL_SIZE));
    } else {
        showRoomDetails(roomId);
    }
};

// رسم المسار على الخريطة
const renderPath = () => {
    const pathGroup = getEl("pathGroup");
    if (!pathGroup) return;

    let html = "";
    
    if (mapState.path.length > 0) {
        const pathData = mapState.path.map((p, i) => {
            const svg = gridToSvg(p.x, p.y, CELL_SIZE);
            return `${i === 0 ? 'M' : 'L'} ${svg.x} ${svg.y}`;
        }).join(" ");
        
        html += `<path d="${pathData}" class="path-line"/>`;
    }

    if (mapState.startPoint) {
        const start = gridToSvg(mapState.startPoint.x, mapState.startPoint.y, CELL_SIZE);
        html += `<circle cx="${start.x}" cy="${start.y}" r="10" class="start-marker"/>`;
    }

    if (mapState.endPoint) {
        const end = gridToSvg(mapState.endPoint.x, mapState.endPoint.y, CELL_SIZE);
        html += `<circle cx="${end.x}" cy="${end.y}" r="10" class="end-marker"/>`;
    }

    pathGroup.innerHTML = html;
};

// تطبيق التحويلات على الخريطة
const updateMapTransform = () => {
    const mapSvg = getEl("mapSvg");
    if (mapSvg) {
        mapSvg.style.transform = `translate(${mapState.transform.x}px, ${mapState.transform.y}px) scale(${mapState.transform.scale})`;
    }
};

// معالجة الضغط على الخريطة
const handleMapClick = (e) => {
    if (mapState.isDragging || !mapState.isNavigationMode) return;

    const mapSvg = getEl("mapSvg");
    const pt = mapSvg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPoint = pt.matrixTransform(mapSvg.getScreenCTM().inverse());
    handleMapInteraction(svgToGrid(svgPoint.x, svgPoint.y, CELL_SIZE));
};

// تهيئة الخريطة
const initMap = () => {
    if (mapInitialized) return;
    updateMapTitle();
    mapInitialized = true;

    updateWalkableGrid();
    renderRooms();
    updateMapTitle();
    setupMapListeners();
    setupFloorButtons();
    setupZoomControls();
};

// سحب الخريطة
const setupMapListeners = () => {
    const mapSvg = getEl("mapSvg");
    if (!mapSvg) return;

    const startDrag = e => {
        mapState.isDragging = true;
        mapState.dragStart = { 
            x: e.clientX - mapState.transform.x, 
            y: e.clientY - mapState.transform.y 
        };
        mapSvg.classList.add("dragging");
    };

    const drag = e => {
        if (mapState.isDragging && !mapState.isNavigationMode) {
            mapState.transform.x = e.clientX - mapState.dragStart.x;
            mapState.transform.y = e.clientY - mapState.dragStart.y;
            updateMapTransform();
        }
    };

    const endDrag = () => {
        mapState.isDragging = false;
        mapSvg.classList.remove("dragging");
    };

    mapSvg.addEventListener("mousedown", startDrag);
    mapSvg.addEventListener("mousemove", drag);
    ["mouseup", "mouseleave"].forEach(evt => mapSvg.addEventListener(evt, endDrag));
    mapSvg.addEventListener("click", handleMapClick);
};

// تهيئة أزرار الطوابق
const setupFloorButtons = () => {
    const floorBtns = qSelAll(".floor-btn");
    
    floorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const floor = parseInt(btn.dataset.floor);
            mapState.currentFloor = floor;
            renderRooms();
            updateMapTitle();
            
            floorBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            showMapToast(`تم الانتقال للطابق ${floor}`);
        });
        
        if (parseInt(btn.dataset.floor) === mapState.currentFloor) {
            btn.classList.add("active");
        }
    });
};

// تهيئة أزرار التكبير والتصغير
const setupZoomControls = () => {
    const zoomHandler = (id) => {
        if (id === "zoomInBtn") {
            mapState.transform.scale = Math.min(mapState.transform.scale * 1.2, 3);
        } else if (id === "zoomOutBtn") {
            mapState.transform.scale = Math.max(mapState.transform.scale / 1.2, 0.5);
        }
        updateMapTransform();
    };

    getEl("zoomInBtn")?.addEventListener("click", () => zoomHandler("zoomInBtn"));
    getEl("zoomOutBtn")?.addEventListener("click", () => zoomHandler("zoomOutBtn"));
    
    getEl("resetViewBtn")?.addEventListener("click", () => {
        mapState.transform = { x: 0, y: 0, scale: 1 };
        updateMapTransform();
    });
};