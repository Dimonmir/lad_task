const readlineSync = require('readline-sync');

function createRandom() {
    let random = 0;
    let flag = false;
    let lvl = 0;
    do {
        console.log('Добро пожаловать! Выбери какое число будет загадывать компьютер');
        console.log("1. 3-х значное");
        console.log("2. 4-х значное");
        console.log("3. 5-х значное");
        console.log("4. 6-х значное");
        lvl = readlineSync.question('Твой выбор ?  ');
        console.log("");
        if (lvl > 4 || lvl < 1) {
            console.log(" Ошибка, неправильный ответ! ");
            console.log("");
        } else {
            flag = true;
        }
    } while (!flag);

    switch (lvl) {
        case '1':
            random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            break;
        case '2':
            random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            break;
        case '3':
            random = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            break;
        case '4':
            random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            break;
    }
    return random;
}

function createUserRandom(number) {
    let flag = false;
    let lvl = 0;
    do {
        console.log('Введите свой вариант');
        lvl = readlineSync.question('Твой вариант ?  ');
        console.log("");
        if (lvl.toString().length == number.toString().length) {
            flag = true;
        } else {
            console.log('Ваше число не имеет разную разрядность с выбранным ранее вариантом!');
            console.log("");
        }
    } while (!flag);
    return lvl;
}

function main() {
    let flag = false;
    let attempt = 2;

    for (attempt; attempt >= 0; attempt--) {
        let userNumber = createUserRandom(randNumber);
        if (compare(randNumber, userNumber)) {
            console.log("Поздравляю! Вы угадали!");
            flag = true;
            return;
        } else {
            console.log("Попытайтесь еще! Осталось попыток - ", attempt);
        }
    }

    if (!flag) {
        console.log("Попытки закончились, вы не справились(");
        console.log("Было загадано ", randNumber);
    }
}

function compare(randNumber, userNumber) {
    let coincided = [];
    let correct = [];
    let arrRandNumber = [];
    let arrUserNumber = [];
    let index = [];
    let temp = 0;
    while (randNumber > 0) {
        temp = randNumber % 10;
        tempUser = userNumber % 10;
        arrRandNumber.push(temp);
        arrUserNumber.push(tempUser);
        randNumber = Math.floor(randNumber / 10);
        userNumber = Math.floor(userNumber / 10);
    }
    for (let i = 0; i < arrUserNumber.length; i++) {
        if (arrUserNumber[i] === arrRandNumber[i]) {
            correct.push(arrUserNumber[i]);
            index.push(i);
        } else {
            if (arrRandNumber.includes(arrUserNumber[i]) && !index.includes(arrRandNumber.indexOf(arrUserNumber[i]))) {
                coincided.push(arrUserNumber[i]);
            }
        }
    }
    const compareArrays = (arrRandNumber, arrUserNumber) => {
        let len = Math.max(arrRandNumber.length, arrUserNumber.length);
        let arr1 = arrRandNumber;
        let arr2 = arrUserNumber;

        for (let i = 0; i < len; i++) {
            if (arr1[i] != arr2[i])
                return false;
        }
        return true;
    }
    console.log("Cовпавших цифр не на своих местах ", coincided.length, coincided);
    console.log("Цифр на своих местах ", correct.length, correct);
    return compareArrays(arrRandNumber, arrUserNumber);
}

let randNumber = createRandom();
main();