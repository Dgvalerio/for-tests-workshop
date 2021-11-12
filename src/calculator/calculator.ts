/**
 * Calculator class
 * @module Calculator
 * */
export class Calculator {
  /**
   * addition - sum all of array
   * @param {number[]} numbers - numbers
   * @return {number}
   * */
  public addition(numbers: number[]): number {
    return numbers.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }

  /**
   * subtraction - remove minuend of subtraendo
   * @param {number} subtraendo
   * @param {number} minuend
   * @return {number}
   * */
  public subtraction(subtraendo: number, minuend: number): number {
    return subtraendo - minuend;
  }

  /**
   * division
   * @param {number} dividend
   * @param {number} divisor
   * @return {number}
   * */
  public division(dividend: number, divisor: number): number {
    return dividend / divisor;
  }

  /**
   * multiplication
   * @param {number[]} factors - numbers
   * @return {number}
   * */
  public multiplication(factors: number[]): number {
    return factors.reduce(
      (previousValue, currentValue) => previousValue * currentValue
    );
  }
}
