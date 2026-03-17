const express = require("express");      //подключаются Express для создания роутера, контроллер клиентов, middleware аутентификации и валидаторы
const router = express.Router();         // это объект, который позволяет определять маршруты отдельно от главного приложения

const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");
const { createCustomer, updateCustomer } = require("../validators/customers");

router.get("/", customerController.getAllCustomers);    //получает список всех клиентов
router.get("/:id", customerController.getCustomerById); //получает одного клиента по его ID

router.post("/", auth, ...createCustomer, customerController.createCustomer);    //создаёт нового клиента

router.put("/:id", auth, ...updateCustomer, customerController.updateCustomer);  //обновляет клиента

router.delete(       // удаляет клиента
    "/:id",
    auth,
    customerController.deleteCustomer,
);

module.exports = router;    //экспрт