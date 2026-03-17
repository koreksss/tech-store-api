const express = require("express");      // Подключаем Express для создания роутера
const router = express.Router();         // Создаём объект роутера для маршрутов статистики

const orderController = require("../controllers/orderController");   // Подключаем контроллер заказов для получения статистики
const auth = require("../middleware/auth");                          // Подключаем middleware для проверки аутентификации

router.get("/", auth, orderController.getStats);      // GET-маршрут для получения статистики по заказам (только для авторизованных)

module.exports = router;  //экспрт