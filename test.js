const readline = require('readline');

// створюємо екземпляр rl і в об'єкті налаштувань передаємо потоки введення та виведення:
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// обробка кожного введеного рядка через подію line:
rl.on('line', cmd => {
    console.log(`You just typed ${cmd}`);
})

// ставимо запитання користувачеві і отримати на нього відповідь:
rl.question('Як вас звати?', answer => {
    console.log(`Приємно познайомитися, ${answer}`);
})
