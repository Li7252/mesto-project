export const renderLoading = (element, isLoading) => {
    isLoading ? element.textContent = "Сохранение..." : element.textContent = "Сохранить";
}