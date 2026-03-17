const express = require("express"); //инструменты для обработки HTTP-запросов, маршрутизации и работы с промежуточным ПО
const cors = require("cors");       //разрешение кросс-доменных запросов
const swaggerUi = require("swagger-ui-express");   //создание красивого веб-интерфейса для документации API прямо в браузере

const specs = require("./swagger");         //импорт локальных модулей
const config = require("./config");

const app = express();       //создание экземпляра Express-приложения

app.use(cors());             //разрешение запросов с любых доменов
app.use(express.json());     //автоматически парсит JSON из тела запроса 

// Подключаем маршруты из папки routes
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/order");
const pvzRoutes = require("./routes/pvz");
const statsRoutes = require("./routes/stats");

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/pvz", pvzRoutes);
app.use("/stats", statsRoutes);

app.use((req, res, next) => {      //кастомный middleware для логирования
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

app.use(                     //создание роута для документации
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: "API документации",
    }),
);

app.get("/", (req, res) => {       //возвращение простого приветственного сообщения в формате JSON
    res.json({
        message: "Добро пожаловать в API магазина техники!",
        docs: "/api-docs - интерактивная документация",
    });
});

app.use((err,req, res, next) => {   //обработчик ошибок 
    console.error("Ошибка:", err.message);

    const status = typeof err.status === "number" ? err.status : 500;

    res.status(status).json({
        error: err.message || "Внутреняя ошибка сервера",
    });
});

const PORT = config.PORT || 3000;     

app.listen(PORT, () => {       //отправление ответа с описанием ошибки
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Документация доступна: http://localhost:${PORT}/api-docs`);
});