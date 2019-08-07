export async function calculation(numa: number, numb: number, operator: string): Promise<number> {
    let result: number = 0;

    if (operator === "+") {
        result = numa + numb;
    } else if (operator === "-") {
        result = numa - numb;
    } else if (operator === "*") {
        result = numa * numb;
    } else if (operator === "/") {
        result = numa / numb;
    }
    if (isNaN(numa) || isNaN(numb)) {
        throw new Error("Please enter 2 numbers");
    }

    return result;
}