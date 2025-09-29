import { apiYellot } from "../../services";
import { couponsRepository } from "../couponsRepository";
import { mockCoupons, mockApiResponse } from "../../../tests/mocks/coupons";

// Mock da API
jest.mock("../../services", () => ({
  apiYellot: {
    get: jest.fn(),
  },
}));

const mockedApiYellot = apiYellot as jest.Mocked<typeof apiYellot>;

describe("couponsRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCoupons", () => {
    it("deve retornar cupons quando a API responde com sucesso", async () => {
      // Arrange
      mockedApiYellot.get.mockResolvedValueOnce({
        data: mockCoupons,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const { getCoupons } = couponsRepository();

      // Act
      const result = await getCoupons();

      // Assert
      expect(mockedApiYellot.get).toHaveBeenCalledWith(
        "/discount/api/front-end-test"
      );
      expect(result).toEqual(mockCoupons);
      expect(mockedApiYellot.get).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando a API falha", async () => {
      // Arrange
      const errorMessage = "Network Error";
      mockedApiYellot.get.mockRejectedValueOnce(new Error(errorMessage));

      const { getCoupons } = couponsRepository();

      // Act & Assert
      await expect(getCoupons()).rejects.toThrow(errorMessage);
      expect(mockedApiYellot.get).toHaveBeenCalledWith(
        "/discount/api/front-end-test"
      );
    });

    it("deve lançar erro quando a API retorna status de erro", async () => {
      // Arrange
      const errorResponse = {
        response: {
          data: { message: "Erro interno do servidor" },
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: {},
        },
        message: "Request failed with status code 500",
      };

      mockedApiYellot.get.mockRejectedValueOnce(errorResponse);

      const { getCoupons } = couponsRepository();

      // Act & Assert
      await expect(getCoupons()).rejects.toEqual(errorResponse);
      expect(mockedApiYellot.get).toHaveBeenCalledWith(
        "/discount/api/front-end-test"
      );
    });

    it("deve retornar array vazio quando a API retorna dados vazios", async () => {
      // Arrange
      mockedApiYellot.get.mockResolvedValueOnce({
        data: [],
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const { getCoupons } = couponsRepository();

      // Act
      const result = await getCoupons();

      // Assert
      expect(result).toEqual([]);
      expect(mockedApiYellot.get).toHaveBeenCalledWith(
        "/discount/api/front-end-test"
      );
    });
  });

  describe("repository instance", () => {
    it("deve retornar um objeto com método getCoupons", () => {
      const repository = couponsRepository();

      expect(repository).toHaveProperty("getCoupons");
      expect(typeof repository.getCoupons).toBe("function");
    });

    it("deve criar nova instância a cada chamada", () => {
      const repository1 = couponsRepository();
      const repository2 = couponsRepository();

      expect(repository1).not.toBe(repository2);
      expect(repository1.getCoupons).not.toBe(repository2.getCoupons);
    });
  });
});

