console.log("How to use: ")
console.log('triangle(4, "leg", 8, "hypotenuse");')
console.log('triangle(8, "hypotenuse", 4, "leg");')

function triangle(v1, t1, v2, t2) {
    function degToRad(deg) { return deg * Math.PI / 180; }
    function radToDeg(rad) { return rad * 180 / Math.PI; }

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    // Перевірка правильності типів
    if (!validTypes.includes(t1) || !validTypes.includes(t2)) {
        console.log("Помилка: невідомий тип. Перечитайте інструкцію.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    function printResult() {
        console.log(`a = ${a.toFixed(4)}`);
        console.log(`b = ${b.toFixed(4)}`);
        console.log(`c = ${c.toFixed(4)}`);
        console.log(`alpha = ${alpha.toFixed(4)}°`);
        console.log(`beta = ${beta.toFixed(4)}°`);
    }

    function solve(v1, t1, v2, t2) {
        // Катет і гіпотенуза
        if (t1 === "leg" && t2 === "hypotenuse") {
            a = v1; c = v2;
            if (a <= 0 || c <= 0 || a >= c) return "Некоректні значення.";
            b = Math.sqrt(c * c - a * a);
            alpha = radToDeg(Math.asin(a / c));
            beta = 90 - alpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "hypotenuse") {
            return solve(v2, t2, v1, t1);
        }

        // Два катети
        if (t1 === "leg" && t2 === "leg") {
            a = v1; b = v2;
            if (a <= 0 || b <= 0) return "Некоректні значення.";
            c = Math.sqrt(a * a + b * b);
            alpha = radToDeg(Math.atan(a / b));
            beta = 90 - alpha;
            return "success";
        }

        // Катет і прилеглий кут
        if (t1 === "leg" && t2 === "adjacent angle") {
            a = v1; alpha = v2;
            if (a <= 0 || alpha <= 0 || alpha >= 90) return "Некоректні значення.";
            b = a * Math.tan(degToRad(alpha));
            c = a / Math.cos(degToRad(alpha));
            beta = 90 - alpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "adjacent angle") {
            return solve(v2, t2, v1, t1);
        }

        // Катет і протилежний кут
        if (t1 === "leg" && t2 === "opposite angle") {
            a = v1; alpha = v2;
            if (a <= 0 || alpha <= 0 || alpha >= 90) return "Некоректні значення.";
            c = a / Math.sin(degToRad(alpha));
            b = Math.sqrt(c * c - a * a);
            beta = 90 - alpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "opposite angle") {
            return solve(v2, t2, v1, t1);
        }

        // Гіпотенуза і гострий кут (angle)
        if (t1 === "hypotenuse" && t2 === "angle") {
            c = v1; alpha = v2;
            if (c <= 0 || alpha <= 0 || alpha >= 90) return "Некоректні значення.";
            a = c * Math.sin(degToRad(alpha));
            b = c * Math.cos(degToRad(alpha));
            beta = 90 - alpha;
            return "success";
        }
        if (t2 === "hypotenuse" && t1 === "angle") {
            return solve(v2, t2, v1, t1);
        }

        return "failed";
    }

    let result = solve(v1, t1, v2, t2);

    if (result === "success") {
        printResult();
    } else {
        console.log(result === "failed"
            ? "Помилка: несумісна пара типів. Перечитайте інструкцію."
            : result
        );
    }

    return result;
}