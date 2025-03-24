async function fetchData(url) {
	try {
			const response = await fetch(url);

			// Проверяем статус ответа
			if (!response.ok) {
					throw new Error(`Ошибка сети: код состояния ${response.status}`);
			}

			// Парсим JSON
			const data = await response.json();
			return data;
	} catch (e) {
			// Обработка ошибок
			if (e instanceof SyntaxError) {
					throw new Error(`Неверный формат JSON: ${e.message}`);
			} else if (e instanceof TypeError) {
					throw new Error(`Ошибка сети: ${e.message}`);
			} else {
					throw e; // Передаем остальные ошибки дальше
			}
	}
}

// Пример использования функции
(async () => {
	try {
			const result = await fetchData("https://www.google.com/");
			console.log(result);
	} catch (e) {
			if (e instanceof SyntaxError) {
					console.error("Неверный формат JSON:", e.message);
			} else if (e instanceof TypeError) {
					console.error("Некорректный тип данных:", e.message);
			} else if (e instanceof URIError) {
					console.error("Ошибочный URL:", e.message);
			} else {
					console.error(e.message);
			}
	} finally {
			console.log("Соединение закрыто.");
	}
})();