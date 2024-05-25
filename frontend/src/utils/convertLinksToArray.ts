export function convertLinks(text: string) {
  var links = [];

  // Удаляем запятые из строки
  text = text.replace(/,/g, "");

  // Разбиваем текст на отдельные слова с помощью пробела в качестве разделителя
  var words = text.split(" ");

  // Перебираем каждое слово
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    // Проверяем, начинается ли слово с "http://" или "https://"
    if (word.startsWith("http://") || word.startsWith("https://")) {
      // Добавляем слово в массив ссылок
      links.push(word);
    }
  }

  return links;
}
