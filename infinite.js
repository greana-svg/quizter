const INFINITE_EMOJI_POOLS = {
    animals: ["🐱","🐶","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐜"],
    fruits: ["🍎","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥝","🍅","🥑"],
    objects: ["⚽","🏀","🏈","⚾","🎾","🏐","🎱","🔮","💎","🎯","🎮","🎲","🧩","♟️","🎪","🎭","🎨","🔧","🔑","🗝️","🧲","💡","🔋","📱","💻","⌚","📷"],
    stars: ["⭐","🌟","✨","💫","⚡","🔥","❄️","🌈","☀️","🌙","💧","🍀","🌸","🌺","🌻","🌹"],
    shapes: ["🔴","🔵","🟢","🟡","🟠","🟣","⬛","⬜","🟧","🟦","🟩","🟨","🟥","🟪","🟫"],
    food: ["🍕","🍔","🍟","🌭","🍿","🧀","🥚","🥓","🥞","🧇","🍗","🥩","🍖","🌮","🌯","🥗"],
};

const INFINITE_REBUSES = [
    { emojis: ["🔥","🏠"], options: ["Hot house","Firehouse","Burn building","Blaze home"], answer: 1 },
    { emojis: ["⭐","🐟"], options: ["Star fish","Starfish","Space fish","Bright fish"], answer: 1 },
    { emojis: ["☀️","🌻"], options: ["Day bloom","Sunflower","Bright flower","Day plant"], answer: 1 },
    { emojis: ["🌙","⭐"], options: ["Night star","Moonlight","Star night","Dark light"], answer: 1 },
    { emojis: ["🧠","🌊"], options: ["Smart wave","Brain ocean","Brainstorm","Mind flood"], answer: 2 },
    { emojis: ["❄️","⛄"], options: ["Cold man","Snowman","Ice guy","Frost person"], answer: 1 },
    { emojis: ["⏰","⏱️"], options: ["Time watch","Clock time","Time's up","Watch clock"], answer: 2 },
    { emojis: ["📚","🐛"], options: ["Book bug","Bookworm","Read crawl","Page insect"], answer: 1 },
    { emojis: ["🌊","🐚"], options: ["Ocean shell","Seashell","Wave shell","Beach stone"], answer: 1 },
    { emojis: ["🌈","🐟"], options: ["Color fish","Rainbow fish","Bright fish","Arc fish"], answer: 1 },
    { emojis: ["🔥","💧"], options: ["Fire water","Steam","Hot ice","Burn rain"], answer: 1 },
    { emojis: ["🐝","🍯"], options: ["Bee honey","Honeybee","Sweet sting","Beehive"], answer: 1 },
    { emojis: ["❄️","🔥"], options: ["Cold fire","Ice flame","Fire and ice","Frozen burn"], answer: 2 },
    { emojis: ["☀️","🌙"], options: ["Day night","Sun moon","Solar lunar","Dawn dusk"], answer: 1 },
    { emojis: ["🎵","📖"], options: ["Music book","Songbook","Sound story","Note read"], answer: 1 },
    { emojis: ["🎸","⭐"], options: ["Guitar star","Rockstar","Music star","String light"], answer: 1 },
    { emojis: ["☕","🎂"], options: ["Coffee cake","Tea pie","Cup cake","Brown cake"], answer: 2 },
    { emojis: ["🐶","🏠"], options: ["Puppy home","Doghouse","Pet shelter","Bark house"], answer: 1 },
    { emojis: ["🍎","🌳"], options: ["Fruit tree","Apple tree","Red plant","Orchard"], answer: 1 },
    { emojis: ["🐻","🍯"], options: ["Bear sweet","Honey bear","Bear honey","Brown sugar"], answer: 1 },
];

function generateInfinitePuzzle(level) {
    const difficulty = Math.min(Math.floor((level - 100) / 10), 5);
    const types = ["odd_one_out","count_objects","find_hidden","visual_pattern","emoji_rebus","stroop_test"];
    const vtype = types[Math.floor(Math.random() * types.length)];

    if (vtype === "odd_one_out") {
        const pools = Object.values(INFINITE_EMOJI_POOLS);
        const pool = pools[Math.floor(Math.random() * pools.length)];
        const base = pool[Math.floor(Math.random() * pool.length)];
        const others = pool.filter(e => e !== base);
        const odd = others[Math.floor(Math.random() * others.length)];
        const sizes = [9, 12, 16, 20, 25];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const cols = [3, 4, 5][Math.floor(Math.random() * 3)];
        const grid = Array(size).fill(base);
        const oddIdx = Math.floor(Math.random() * size);
        grid[oddIdx] = odd;
        return {
            id: level, type: "visual", visualType: "odd_one_out",
            category: "Infinite", question: "Find the odd one out!",
            grid, cols, answer: oddIdx,
            hint: "One of these is not like the others...", explanation: "Found it!"
        };
    }

    if (vtype === "count_objects") {
        const pools = Object.values(INFINITE_EMOJI_POOLS);
        const pool = pools[Math.floor(Math.random() * pools.length)];
        const target = pool[Math.floor(Math.random() * pool.length)];
        const others = pool.filter(e => e !== target);
        const distractor = others[Math.floor(Math.random() * others.length)];
        const count = 3 + Math.floor(Math.random() * (5 + difficulty * 2));
        const extra = 5 + Math.floor(Math.random() * (6 + difficulty * 3));
        const grid = Array(count).fill(target).concat(Array(extra).fill(distractor));
        for (let i = grid.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [grid[i], grid[j]] = [grid[j], grid[i]];
        }
        const cols = Math.min(6, grid.length);
        return {
            id: level, type: "visual", visualType: "count_objects",
            category: "Infinite", question: `How many ${target} can you find?`,
            grid, cols, answer: count,
            hint: "Count carefully, skip the others...", explanation: `There were ${count} ${target}.`
        };
    }

    if (vtype === "find_hidden") {
        const pools = Object.values(INFINITE_EMOJI_POOLS);
        const pool = pools[Math.floor(Math.random() * pools.length)];
        const base = pool[Math.floor(Math.random() * pool.length)];
        const others = pool.filter(e => e !== base);
        const hidden = others[Math.floor(Math.random() * others.length)];
        const size = 16 + difficulty * 4;
        const cols = [4, 5, 6][Math.floor(Math.random() * 3)];
        const grid = Array(size).fill(base);
        const hidIdx = Math.floor(Math.random() * size);
        grid[hidIdx] = hidden;
        return {
            id: level, type: "visual", visualType: "find_hidden",
            category: "Infinite",
            question: `Find the ${hidden} hiding among the ${base}!`,
            grid, cols, answer: hidIdx,
            hint: "Look carefully...", explanation: "Found it!"
        };
    }

    if (vtype === "visual_pattern") {
        const pools = Object.values(INFINITE_EMOJI_POOLS);
        const pool = pools[Math.floor(Math.random() * pools.length)];
        const patLen = 3 + Math.floor(Math.random() * 3);
        const patPool = [];
        while (patPool.length < patLen) {
            const e = pool[Math.floor(Math.random() * pool.length)];
            if (!patPool.includes(e)) patPool.push(e);
        }
        const repeats = 2 + Math.floor(Math.random() * 2);
        const full = [];
        for (let r = 0; r < repeats; r++) full.push(...patPool);
        const answer = full[full.length - 1];
        const opts = [answer];
        while (opts.length < 4) {
            const e = pool[Math.floor(Math.random() * pool.length)];
            if (!opts.includes(e)) opts.push(e);
        }
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        return {
            id: level, type: "visual", visualType: "visual_pattern",
            category: "Infinite", question: "What comes next?",
            pattern: full.concat(["?"]),
            options: opts,
            answer: opts.indexOf(answer),
            hint: "Look for the repeating pattern...", explanation: "Pattern found!"
        };
    }

    if (vtype === "emoji_rebus") {
        const r = INFINITE_REBUSES[Math.floor(Math.random() * INFINITE_REBUSES.length)];
        return {
            id: level, type: "visual", visualType: "emoji_rebus",
            category: "Infinite",
            question: "What phrase do these emojis represent?",
            reEmojis: r.emojis, options: r.options, answer: r.answer,
            hint: "Think about the words...", explanation: "Correct!"
        };
    }

    const colorNames = [
        { word: "RED", color: "#e74c3c" },
        { word: "BLUE", color: "#2980b9" },
        { word: "GREEN", color: "#27ae60" },
        { word: "YELLOW", color: "#f1c40f" },
        { word: "PURPLE", color: "#8e44ad" },
        { word: "ORANGE", color: "#e67e22" },
        { word: "PINK", color: "#e91e63" },
        { word: "BLACK", color: "#2c3e50" },
        { word: "BROWN", color: "#795548" },
    ];
    let chosen = colorNames[Math.floor(Math.random() * colorNames.length)];
    let ink;
    do { ink = colorNames[Math.floor(Math.random() * colorNames.length)]; } while (ink.word === chosen.word);
    const others = colorNames.filter(c => c.word !== ink.word);
    const distractors = [];
    while (distractors.length < 3 && others.length > 0) {
        const idx = Math.floor(Math.random() * others.length);
        distractors.push(others.splice(idx, 1)[0].word);
    }
    const opts = [ink.word, ...distractors];
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    const correctIdx = opts.indexOf(ink.word);

    return {
        id: level, type: "visual", visualType: "stroop_test",
        category: "Infinite",
        question: "What COLOR is the text? Ignore the word!",
        stroopWord: chosen.word, stroopColor: ink.color,
        options: opts, answer: correctIdx,
        hint: "Look at the ink color, not the word!", explanation: `Written in ${ink.word}.`
    };
}
