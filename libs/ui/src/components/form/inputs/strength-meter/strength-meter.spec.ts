import { scorePassword } from './strength-meter';

describe('scorePassword', () => {
  it.each([
    [null, 0],
    ['', 0],
    ['abc', 1],
    ['Abc1!', 1],
    ['abcdefgh', 1],
    ['Abcdefgh', 2],
    ['Abcdefgh1!', 3],
    ['Abcdefghijk1!', 4],
  ])('scores %j as %i', (pw, expected) => {
    expect(scorePassword(pw)).toBe(expected);
  });
});
