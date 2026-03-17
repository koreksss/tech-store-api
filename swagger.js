const swaggerJsdoc = require("swagger-jsdoc");      //подключение 2 библиотек
const path = require("path");

const options = {          //объект конфигурации
    definition : {         //спецификация API
        openapi: "3.0.0",
        info: {
            title: "Магазин техники API",
            version: "1.0.0",
            description:
               "REST API для управления клиентами, заказами и пунктами выдачи (ПВЗ).",
        },
        servers: [         //определяет, где именно работает API
            {
                url: "http://localhost:3000",
                description: "Локальный сервер (разработка)",
            },
        ],
        components: {      //механизм аутентификации
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic",
                    description:
                       "Basic Authentication для доступа к административным эндпоинтам. Используйте учетные данные из конфигурации.",
                },
            },
        },
    },
    apis: ["./docs/*.yaml"],   //путь к файлам с описанием эндпоинтов
};

const specs = swaggerJsdoc(options);   //генерация финальной спецификации

module.exports  = specs;        //экспорт спецификации
