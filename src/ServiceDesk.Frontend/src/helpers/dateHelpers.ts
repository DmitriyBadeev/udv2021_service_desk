export const getNumericStringDate = (date: string | number) => {
    return new Date(date).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "Europe/Moscow",
    })
}
