// ============= دوال البحث =============

// بيانات البحث
const searchData = allRooms.map(r => ({
    icon: r.icon,
    title: r.name,
    category: `${getCategoryName(r.category)} • الطابق ${r.floor}`,
    roomData: r
}));

// عرض نتائج البحث
const renderSearchResults = (query = "") => {
    let filtered = query
        ? searchData.filter(item => 
            item.title.includes(query) || item.category.includes(query))
        : searchData;
    
    filtered.sort((a, b) => isFavorite(b.roomData.id) - isFavorite(a.roomData.id));

    const resultsContainer = getEl("search-results");

    if (resultsContainer) {
        const starSvg = '<svg class="result-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        const arrowSvg = '<svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>';

        resultsContainer.innerHTML = filtered.map(item => {
            const isFav = isFavorite(item.roomData?.id || '');
            return `
                <div class="result-item ${isFav ? 'starred' : ''}" onclick="showRoomDetailsFromSearch('${item.roomData.id}')">
                    <div class="result-icon">${item.icon}</div>
                    <div style="flex: 1;">
                        <h3 class="result-title">${item.title}</h3>
                        <p class="result-category">${item.category}</p>
                    </div>
                    ${isFav ? starSvg : arrowSvg}
                </div>
            `;
        }).join("");
    }
};

// عرض تفاصيل قاعة من البحث
const showRoomDetailsFromSearch = (roomId) => {
    const room = allRooms.find(r => r.id === roomId);
    if (room) showRoomDetails(roomId);
};
