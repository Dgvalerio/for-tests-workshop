import { Calculator } from './calculator';

describe('Calculator', () => {
  const sut = new Calculator();

  it('should be able to add the numbers', () => {
    expect(sut.addition([1, 2])).toBe(3);
  });

  it('should be able to subtract the numbers', () => {
    expect(sut.subtraction(4, 2)).toBe(2);
  });

  it('should be able to split the numbers', () => {
    expect(sut.division(16, 2)).toBe(8);
  });

  it('should be able to multiply the numbers', () => {
    expect(sut.multiplication([5, 3])).toBe(15);
  });
});
