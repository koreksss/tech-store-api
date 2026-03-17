const express = require("express");     // Подключаем Express для создания роутера
const router = express.Router();        // Создаём объект роутера для маршрутов ПВЗ
const db = require("../db/db");          // Подключаем модуль базы данных

router.get("/", (req, res, next) => {   // GET-маршрут для получения списка всех ПВЗ
  try {
    const pvz = db.prepare("SELECT * FROM pvz ORDER BY city, address").all();
    res.json(pvz); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;  //экспрт