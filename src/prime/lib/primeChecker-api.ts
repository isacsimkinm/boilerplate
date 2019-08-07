export async function primeChecker(num: number): Promise<string> {

  let result = "";

  if (!isNaN(num)) {
    for (var i = 2; i < num; i++) {
      if (num % i === 0) {
        result = "Not prime";
        return result;
      }
    }
    result = "It is prime";
    // return result;
  } else {
    throw new Error("Please enter a valid number");
  }
  return result;
}



