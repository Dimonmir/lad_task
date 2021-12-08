const readlineSync = require('readline-sync');

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [{
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0, // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20, // магическая броня
            "cooldown": 0, // ходов на восстановление
            "cooldownNow": 0
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "cooldownNow": 0
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2,
            "cooldownNow": 0
        },
    ]
};
const user = {
    maxHealth: 0,
    name: "Евстафий",
    moves: [{
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0,
            "cooldownNow": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4,
            "cooldownNow": 0
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "cooldownNow": 0
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4,
            "cooldownNow": 0
        },
    ]
};

function start() {
    console.log('Добро пожаловать! Выбери уровень сложности');
    console.log("1. Новичек");
    console.log("2. Бывалый");
    console.log("3. Закаленный в боях");
    const lvl = readlineSync.question('Твой выбор ?  ');
    console.log(" ");
    return lvl;
}

function init(lvl) {
    let health = 1;
    switch (lvl) {
        case '1':
            health = 30;
            break;
        case '2':
            health = 20;
            break;
        case '3':
            health = 10;
            break;
    }

    return health;
}

function battle() {
    let round = 1;
    while (user.maxHealth > 0 && monster.maxHealth > 0) {
        menu(round);
        round++;
    }
    if (monster.maxHealth < 0) {
        console.log('Вы победили монстра!');
    } else {
        console.log('Вы не смогли победить монстра :(');
    }

}

function menu(round) {
    let choose = 0;
    do {
        console.log('Раунд ', round);
        console.log('Выбери действие!');
        console.log("1. Посмотреть характеристики своего персонажа");
        console.log("2. Посмотреть характеристики противника");
        console.log("3. Выбрать действие!");
        choose = readlineSync.question('Твой выбор ?  ');
        console.log(" ");

        switch (choose) {
            case '1':
                showInfoMyself();
                break;
            case '2':
                showInfoEnemy();
                break;
            case '3':
                showAction();
                break;
        }
    }
    while (choose != '3');
}

function showInfoMyself() {
    console.log(user.name, user.maxHealth);
}

function showInfoEnemy() {
    console.log(monster.name, monster.maxHealth);
}

function showAction() {
    let flag = false;
    do {
        for (let i = 0; i < user.moves.length; i++) {
            console.log(i + 1, " Действие", user.moves[i].name);
            console.log("Физ дамаг", user.moves[i].physicalDmg);
            console.log("Маг дамаг", user.moves[i].magicDmg);
            console.log("Физ броня", user.moves[i].physicArmorPercents);
            console.log("Маг броня", user.moves[i].magicArmorPercents);
            console.log("Кулдаун", user.moves[i].cooldown);
            console.log("Осталось до повторного применения", user.moves[i].cooldownNow, "раундов");
            console.log(" ");
        }
        let choose = readlineSync.question('Твой выбор ?  ');
        switch (choose) {
            case '1':
                if (user.moves[choose - 1].cooldownNow != 0) {
                    console.log(" Сейчас невозможно использовать эту способность!");
                    console.log(" ");
                } else {
                    flag = true;
                    attack(choose - 1);
                }
                break;
            case '2':
                if (user.moves[choose - 1].cooldownNow != 0) {
                    console.log(" Сейчас невозможно использовать эту способность!");
                    console.log(" ");
                } else {
                    flag = true;
                    attack(choose - 1);
                }
                break;
            case '3':
                if (user.moves[choose - 1].cooldownNow != 0) {
                    console.log(" Сейчас невозможно использовать эту способность!");
                    console.log(" ");
                } else {
                    flag = true;
                    attack(choose - 1);
                }
                break;
            case '4':
                if (user.moves[choose - 1].cooldownNow != 0) {
                    console.log(" Сейчас невозможно использовать эту способность!");
                    console.log(" ");
                } else {
                    flag = true;
                    attack(choose - 1);
                }
                break;
        }
    } while (!flag);

    function attack(idMove) {
        let flag = false;
        let attack = user.moves[idMove];
        let monsterAttack = 0;
        console.log("Вы применили ", attack.name);
        do {
            let random = Math.floor(Math.random() * 3);
            monsterAttack = monster.moves[random];
            if (monsterAttack.cooldownNow == 0) {
                flag = true;
            }
        } while (!flag);
        console.log("Враг применил ", monsterAttack.name);
        updateCooldownNow();
        calculatDmg(attack, monsterAttack);
    }

    function calculatDmg(attack, monsterAttack) {
        monsterAttack.cooldownNow = monsterAttack.cooldown;
        attack.cooldownNow = attack.cooldown;
        let dmgToUser = 0;
        let dmgToEnemy = 0;
        if (monsterAttack.physicalDmg == 0) {
            dmgToUser = monsterAttack.magicDmg - (monsterAttack.magicDmg * attack.magicArmorPercents / 100);
        } else {
            dmgToUser = monsterAttack.physicalDmg - (monsterAttack.physicalDmg * attack.physicArmorPercents / 100);
        }
        user.maxHealth -= dmgToUser;
        if (attack.physicalDmg == 0) {
            dmgToEnemy = attack.magicDmg - (attack.magicDmg * monsterAttack.magicArmorPercents / 100);
        } else {
            dmgToEnemy = attack.physicalDmg - (attack.physicalDmg * monsterAttack.physicArmorPercents / 100);
        }
        monster.maxHealth -= dmgToEnemy;
        console.log("Вы нанесли ", dmgToEnemy, " урона");
        console.log("Вам нанесли ", dmgToUser, " урона");
        console.log(" ");
    }

    function updateCooldownNow() {
        for (let i = 0; i < user.moves.length; i++) {
            user.moves[i].cooldownNow -= 1;
            if (user.moves[i].cooldownNow < 0) {
                user.moves[i].cooldownNow = 0;
            }
        }
        for (let i = 0; i < monster.moves.length; i++) {
            monster.moves[i].cooldownNow -= 1;
            if (monster.moves[i].cooldownNow < 0) {
                monster.moves[i].cooldownNow = 0;
            }
        }
    }
}

let lvl = start()
user.maxHealth = init(lvl);
battle();