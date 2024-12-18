export const generateUid = () => {
    return Date.now().toString(36) + Math.round(Math.random() * 100000).toString(36).substring(1, 4);
};