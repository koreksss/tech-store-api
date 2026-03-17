module.exports = {
    PORT: process.env.PORT || 3000,       //настройки порта

    ITEMS_PER_PAGE: 10,           //пагинация
    MAX_ITEMS_PER_PAGE: 20,

    ORDER_STATUSES: [       // массив допустимых статусов заказов
        "new",
        "processing",
        "ready_for_pickup",
        "completed",
        "canceled"
    ],

    API_PREFIX: "/api",          //префикс

    ADMIN_CREDENTIALS: {        //данные администратора
        username: "admin",
        password: "secret",
    },

    DEFAULT_PHONE_REGEX: /^\-7\(d{3}\)\d{3}-\\d{2}-\d{2}$/,   //Проверка формата телефона
    MIN_NAME_LENGTH: 3,       //макс значение имени
    MAX_NAME_LENGTH: 50,      // мин значение иимени

    STATS_CACHE_TTL: 60 * 1000,   //время жизни кэша статистики, в мс
};