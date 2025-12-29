// Simple Audio Manager using HTML5 Audio
// You should place actual mp3 files in public/sounds/ folder

const SOUNDS = {
    bgm: '/sounds/bgm.mp3',
    correct: '/sounds/correct.mp3', // 딩동댕
    wrong: '/sounds/wrong.mp3',   // 땡
    cheer: '/sounds/cheer.mp3',   // 환호성 (Ranking Up)
    click: '/sounds/click.mp3'
};

const audioCache = {};

// Preload (optional)
export const preloadSounds = () => {
    Object.values(SOUNDS).forEach(src => {
        const audio = new Audio(src);
        audioCache[src] = audio;
    });
};

export const playSound = (type) => {
    const src = SOUNDS[type];
    if (!src) return;

    try {
        const audio = new Audio(src);
        audio.volume = 0.5;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(e => {
                // Auto-play policy or missing file
                // Suppress detailed error to avoid console spam for missing assets
                if (e.name === 'NotSupportedError' || e.name === 'NotAllowedError') {
                    // console.warn("Audio play blocked or source not found:", src); 
                } else {
                    console.error("Audio error:", e);
                }
            });
        }
    } catch (error) {
        // console.error("Audio creation error:", error);
    }
};
