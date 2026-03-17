const express = require("express");    // Подключаем Express для создания роутера
const router = express.Router();       // Создаём объект роутера для группировки маршрутов заказов

const orderController = require("../controllers/orderController");   // Подключаем контроллер заказов с логикой обработки запросов
const auth = require("../middleware/auth");                          // Подключаем middleware для проверки аутентификации

const {       // Импортируем функции валидации для разных типов запросов
    createOrder,
    updateOrder,
    getAllOrdersQuery,
} = require("../validators/order");

router.get("/", ...getAllOrdersQuery, orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);

router.post("/", auth, ...createOrder, orderController.createOrder);

router.put("/:id", auth, ...updateOrder, orderController.updateOrder);

router.delete(        //удаление заказа
    "/:id",
    auth,
    orderController.deleteOrder,
);

module.exports = router;  //экспрт