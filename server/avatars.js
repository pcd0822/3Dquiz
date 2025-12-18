// 3D Avatar Image URLs (Using standard high-quality assets or placeholders for now)
// In a real app, these would be local files or reliable CDN links.
// Using DiceBear or similar for 3D vibes if available, or just predefined images.
// Since user requested "3D style human character", I will use some representative sample URLs.
// For the purpose of this demo, I'll use placeholders that I can assume exist or are generic.
// Actually, I'll use a set of publicly available 3D avatar assets or just emojis if images aren't handy.
// But the user specifically asked for "3D style human avatars".
// I will use `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=...` or `adventurer`
// `adventurer` style in DiceBear looks somewhat 3D/Human. `fun-emoji` is also good.
// Let's use `adventurer` for human-like 3D.

export const AVATARS = [
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Felix',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Christopher',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Brian',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Ulysses',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Caleb',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=George',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Maria',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Willow'
];

export function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
