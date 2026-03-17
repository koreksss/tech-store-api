const config = require("../config");             //модуль конфигурации
const AppError = require("../utils/AppError");   //обработчик ошибок

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;     //проверка наличия заголовка
    if (!authHeader || !authHeader.startsWith("Basic")) {     //заголовок должен содержать учётные данные в формате Basic Auth
        return next(new AppError("Требуется авторизация (Basic Auth)", 401));    // возвращtybt ошибкb с кодом 401 (Unauthorized)
    }

    const base64Credentials = authHeader.split(" ")[1];       //учётные данные передаются в формате "username:password", закодированные в Base64.
    const credentials = Buffer.from(base64Credentials, "base64").toString(     //декодируем эту строку из Base64 в обычный текст
        "ascii",
    );
    const [username, password] = credentials.split(":");   //

    if (       //сравнение с правильными учетными данными
        username === config.ADMIN_CREDENTIALS.username &&
        password === config.ADMIN_CREDENTIALS.password
    ) {
        next();      // Если они совпадают, функция вызывает next() без параметров, что означает успешную аутентификацию
    } else {            //если учётные данные не совпадают, возвращается ошибка с кодом 401 и сообщением
        return next(new AppError("Неверные учетные данные", 401));
    }
};

module.exports = authMiddleware;     //экспорт middleware