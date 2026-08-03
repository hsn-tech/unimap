// ============= دوال المفضلة =============

const isFavorite = (roomId) => state.favorites.includes(roomId);

const toggleFavorite = (roomId) => {
    const index = state.favorites.indexOf(roomId);
    if (index > -1) state.favorites.splice(index, 1);
    else state.favorites.push(roomId);
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
};
