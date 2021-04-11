export const getRoleDisplayName = (role: string) => {
    switch (role) {
        case "DEVELOPER":
            return "Разработчик"
        case "CUSTOMER":
            return "Представитель заказчика"
        case "OWNER":
            return "Владелец личного кабинета"
        default:
            return "Неизвестно"
    }
}
