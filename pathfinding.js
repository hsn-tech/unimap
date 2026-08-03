// ============= دوال حساب المسار (A* Algorithm) =============

const GRID_SIZE = 94;
const CELL_SIZE = 15;

// إنشاء شبكة المشي
const createWalkableGrid = (w, h, walls) => {
    const grid = Array(h).fill(0).map(() => Array(w).fill(true));
    
    walls.forEach(wall => {
        const { x1, y1, x2, y2 } = wall;
        const [gx1, gy1, gx2, gy2] = [x1, y1, x2, y2].map(c => Math.floor(c / CELL_SIZE));
        
        for (let y = Math.min(gy1, gy2); y <= Math.max(gy1, gy2); y++)
            for (let x = Math.min(gx1, gx2); x <= Math.max(gx1, gx2); x++)
                if (y >= 0 && y < h && x >= 0 && x < w) grid[y][x] = false;
    });
    
    return grid;
};

// تحويل من إحداثيات SVG لخلايا الشبكة
const svgToGrid = (x, y, s) => ({ x: Math.floor(x / s), y: Math.floor(y / s) });

// تحويل من خلايا الشبكة لإحداثيات SVG
const gridToSvg = (x, y, s) => ({ x: x * s + s / 2, y: y * s + s / 2 });

// حساب المسافة التقريبية
const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// تحويل نقطة لمفتاح نصي
const key = p => `${p.x},${p.y}`;

// جيب الجيران
const getNeighbors = (p, grid, w, h) => {
    const neighbors = [];
    [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dx, dy]) => {
        const [nx, ny] = [p.x + dx, p.y + dy];
        if (nx >= 0 && nx < w && ny >= 0 && ny < h && grid[ny]?.[nx])
            neighbors.push({ x: nx, y: ny });
    });
    return neighbors;
};

// إيجاد المسار بين نقطتين
const findPath = (start, end, grid, w, h) => {
    const openSet = [{ ...start, g: 0, f: heuristic(start, end) }];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map([[key(start), 0]]);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        const currentKey = key(current);

        if (current.x === end.x && current.y === end.y) {
            const path = [current];
            let curr = current;
            while (cameFrom.has(key(curr))) {
                curr = cameFrom.get(key(curr));
                path.unshift(curr);
            }
            return path;
        }

        closedSet.add(currentKey);

        for (const neighbor of getNeighbors(current, grid, w, h)) {
            const neighborKey = key(neighbor);
            if (closedSet.has(neighborKey)) continue;

            const tentativeG = (gScore.get(currentKey) || 0) + 1;
            
            if (tentativeG < (gScore.get(neighborKey) || Infinity)) {
                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeG);
                const neighborNode = { 
                    ...neighbor, 
                    g: tentativeG, 
                    f: tentativeG + heuristic(neighbor, end)
                };
                if (!openSet.find(n => key(n) === neighborKey)) openSet.push(neighborNode);
            }
        }
    }
    
    return [];
};
