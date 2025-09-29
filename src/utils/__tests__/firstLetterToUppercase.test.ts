import { firstLetterToUppercase } from "../firstLetterToUppercase";

describe("firstLetterToUppercase", () => {
  it("deve capitalizar a primeira letra de uma string", () => {
    expect(firstLetterToUppercase("hello")).toBe("Hello");
    expect(firstLetterToUppercase("world")).toBe("World");
  });

  it("deve funcionar com strings que já começam com maiúscula", () => {
    expect(firstLetterToUppercase("Hello")).toBe("Hello");
    expect(firstLetterToUppercase("WORLD")).toBe("WORLD");
  });

  it("deve funcionar com strings vazias", () => {
    expect(firstLetterToUppercase("")).toBe("");
  });

  it("deve funcionar com strings de um caractere", () => {
    expect(firstLetterToUppercase("a")).toBe("A");
    expect(firstLetterToUppercase("A")).toBe("A");
  });

  it("deve funcionar com strings contendo números", () => {
    expect(firstLetterToUppercase("1test")).toBe("1test");
    expect(firstLetterToUppercase("test123")).toBe("Test123");
  });

  it("deve funcionar com strings contendo espaços", () => {
    expect(firstLetterToUppercase(" hello")).toBe(" hello");
    expect(firstLetterToUppercase("hello world")).toBe("Hello world");
  });

  it("deve funcionar com caracteres especiais", () => {
    expect(firstLetterToUppercase("@test")).toBe("@test");
    expect(firstLetterToUppercase("#hello")).toBe("#hello");
  });
});

