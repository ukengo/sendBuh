function sendBuh() {
  
  const fileName = 'title contains "Мельник Віталій Григорович виписка" or title contains "Фрідман Роман Зіновійович виписка"'
  
  // забираем в массив все id файлов по критерию из fileName (работает сторонняя функция)
  const idArr = searchFile(fileName)  
  // проверяем количество файлов ,если их 2, то по большому кругу, если нет, то else  
  if (idArr.length === 2) {
    
    // задержка перед выполнением на 1 минуту, чтобы обновился гугл диск
    //Utilities.sleep(60000)
    
    // создаем пустой массив
    let spreadsheetFileArr = []
    
    // для каждого id в массиве 
    for (elem of idArr) {
      
      //находим файл по id
      var spreadsheetFile = DriveApp.getFileById(elem)

      //формируем масив из найденных файлов
      spreadsheetFileArr.push(spreadsheetFile)
    }

    // отправляем почту
    MailApp.sendEmail("friedmanukraine@gmail.com", "Виписки Монобанк", "", {
      name: 'Виталий Мельник (Фрідман-Україна)',
      attachments: spreadsheetFileArr
    })
    MailApp.sendEmail("vat.friedman@gmail.com", "Виписки Монобанк", "", {
      name: 'Виталий Мельник (Фрідман-Україна)',
      attachments: spreadsheetFileArr
    })
  } else {
     /*  MailApp.sendEmail("friedmanukraine@gmail.com",
                  "Выписки Монобанк",
                  "Файлов не два"); */
    return   
  }
  for (elem of idArr) {
    Drive.Files.remove(elem)
  }
}

function searchFile(fileName) {
  let arr = []
  const files = DriveApp.searchFiles(fileName)
  while (files.hasNext()) {
    const file = files.next()
    arr.push(file.getId())
  }
  return arr
}

function deleteFile(fileName) {
  const fgt = searchFile(fileName)
  console.log(fgt)
  Drive.Files.remove(fgt)
}