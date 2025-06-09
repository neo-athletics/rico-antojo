export const selectCategories = (items) => {
    const categories = items.map((item) => item.category);
    return [...new Set(categories)];
};
