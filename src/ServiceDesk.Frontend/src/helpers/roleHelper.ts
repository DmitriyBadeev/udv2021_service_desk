export const DEVELOPER_ROLE = "DEVELOPER"
export const CUSTOMER_ROLE = "CUSTOMER"
export const OWNER_ROLE = "OWNER"

export const getRoleDisplayName = (role: string) => {
    switch (role) {
        case DEVELOPER_ROLE:
            return "Разработчик"
        case CUSTOMER_ROLE:
            return "Представитель заказчика"
        case OWNER_ROLE:
            return "Владелец личного кабинета"
        default:
            return "Неизвестно"
    }
}
