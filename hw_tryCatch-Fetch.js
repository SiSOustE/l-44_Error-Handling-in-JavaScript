function fetchData(url) {
	let data;
	const xhr = new XMLHttpRequest();
	
	xhr.open("GET", url, false);
	xhr.send();
	
	if (xhr.status === 200) {
			try {
					data = JSON.parse(xhr.responseText);
			} catch (e) {
					throw new Error(`Ошибка при разборе JSON: ${e.message}`);
			}
	} else {
			throw new Error(`Ошибка сети: код состояния ${xhr.status}`);
	}
	
	return data;
}

// Пример использования функции с обработкой ошибок и finally-блоком
try {
	const result = fetchData("https://www.google.com/");
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
	// Завершающие действия, например, закрытие соединения
	console.log("Соединение закрыто.");
}