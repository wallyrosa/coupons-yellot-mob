import { cn } from "../mergeCss";

describe("cn", () => {
  it("deve combinar classes CSS válidas", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("bg-red-500", "text-white", "p-4")).toBe(
      "bg-red-500 text-white p-4"
    );
  });

  it("deve ignorar valores falsy", () => {
    expect(cn("class1", null, "class2", undefined, "class3")).toBe(
      "class1 class2 class3"
    );
    expect(cn("class1", "", "class2", false, "class3")).toBe(
      "class1 class2 class3"
    );
  });

  it("deve funcionar com array de classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe(
      "class1 class2 class3"
    );
  });

  it("deve funcionar com objetos condicionais", () => {
    expect(cn({ class1: true, class2: false }, "class3")).toBe(
      "class1 class3"
    );
  });

  it("deve retornar string vazia para entrada vazia", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null, undefined, false)).toBe("");
  });

  it("deve funcionar com classes Tailwind CSS", () => {
    expect(cn("bg-primary", "text-secondary", "rounded-lg")).toBe(
      "bg-primary text-secondary rounded-lg"
    );
  });

  it("deve lidar com classes duplicadas", () => {
    expect(cn("class1", "class2", "class1")).toBe("class1 class2 class1");
  });
});

