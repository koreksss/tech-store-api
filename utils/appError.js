class AppError extends Error {
    constructor(message, statusCode) {       // текст сообщения об ошибке и HTTP-код статуса
        super(message);                  //вызов конструктора родителльского класса
        this.statusCode = statusCode;    //сохранение HTTP-кода ответа
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);      //вызов метода captureStackTrace
    }
}

module.exports = AppError;      //экспорт класса