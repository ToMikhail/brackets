module.exports = function check(str, bracketsConfig) {
    let stack = [];
    let open = ['{', '(', '[', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let close = ['}', ')', ']', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let openArr = ['{', '(', '[', '|', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let closeArr = ['}', ')', ']', '|', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let closeIndex;
    let openIndex;
    let special = ['|'];
    let specialIndex;

    let chars = str.split('');

    for (let i = 0; i < chars.length; i++) {
        openIndex = open.indexOf(chars[i]);
        if (openIndex !== -1) {
            // Нашли открывающую скобку. Помещаем ее в стек (п.2).
            stack.push(openIndex);
            continue;
        }

        closeIndex = close.indexOf(chars[i]);
        if (closeIndex !== -1) {
            // Нашли закрывающую скобку. Проверяем ее соответствие открывающей (п.3).
            openIndex = stack.pop();
            if (closeIndex !== openIndex) {
                return false;
            }
        }

        specialIndex = special.indexOf(chars[i]);
        let id = stack.indexOf(0);
        if (specialIndex !== -1 && id == -1) {
            stack.push(specialIndex);
            continue;
        }
        if (specialIndex !== -1 && id !== -1) {
            stack.pop();
        }
    }

    // Проверяем дисбаланс открытых/закрытых скобок (п.5).
    if (stack.length !== 0) {
        return false;
    }

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i].length !== 2) {
            return false;
        }
        openIndex = openArr.indexOf(bracketsConfig[i][0]);
        closeIndex = closeArr.indexOf(bracketsConfig[i][1]);
        if (openIndex == -1 && closeIndex == -1) {
            return false;
        }
    }

    return true;
}
