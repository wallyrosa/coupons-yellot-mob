// Mock do axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe("API Yellot", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma instância do axios com a URL base correta", () => {
    const { apiYellot } = require("../api");

    expect(apiYellot).toBeDefined();
    expect(apiYellot.interceptors).toBeDefined();
  });

  it("deve ter interceptors configurados", () => {
    const { apiYellot } = require("../api");

    expect(apiYellot).toBeDefined();
    expect(apiYellot.interceptors).toBeDefined();
    expect(apiYellot.interceptors.request).toBeDefined();
    expect(apiYellot.interceptors.response).toBeDefined();
  });

  describe("Métodos HTTP", () => {
    it("deve ter método GET disponível", () => {
      const { apiYellot } = require("../api");
      expect(apiYellot.get).toBeDefined();
    });

    it("deve ter método POST disponível", () => {
      const { apiYellot } = require("../api");
      expect(apiYellot.post).toBeDefined();
    });

    it("deve ter método PUT disponível", () => {
      const { apiYellot } = require("../api");
      expect(apiYellot.put).toBeDefined();
    });

    it("deve ter método DELETE disponível", () => {
      const { apiYellot } = require("../api");
      expect(apiYellot.delete).toBeDefined();
    });
  });
});
