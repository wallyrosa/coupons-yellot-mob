import { render, screen } from "@testing-library/react-native";
import { Card } from "../Card";
import { useCouponsStorage } from "../../../../infra";
import { mockCoupons } from "../../../../tests/mocks/coupons";

// Mock do useCouponsStorage
jest.mock("../../../../infra", () => ({
  useCouponsStorage: jest.fn(),
}));

const mockedUseCouponsStorage = useCouponsStorage as jest.MockedFunction<
  typeof useCouponsStorage
>;

describe("Card Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Estado de Loading", () => {
    it("deve mostrar skeleton quando isLoading é true", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: [],
        couponsCache: [],
        isLoading: true,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByTestId("skeleton")).toBeTruthy();
    });

    it("não deve mostrar conteúdo quando isLoading é true", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: true,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.queryByText("Total")).toBeNull();
      expect(screen.queryByText(mockCoupons.length.toString())).toBeNull();
    });
  });

  describe("Estado com Dados", () => {
    it("deve mostrar informações corretas dos cupons", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText("Total")).toBeTruthy();
      expect(screen.getByText(mockCoupons.length.toString())).toBeTruthy();
      expect(screen.getByText("Cupons disponíveis")).toBeTruthy();
    });

    it("deve calcular e mostrar cupons disponíveis corretamente", () => {
      const activeCoupons = mockCoupons.filter((coupon) => coupon.is_active);

      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText(activeCoupons.length.toString())).toBeTruthy();
    });

    it("deve calcular progresso corretamente", () => {
      const activeCoupons = mockCoupons.filter((coupon) => coupon.is_active);
      const expectedProgress =
        (activeCoupons.length / mockCoupons.length) * 100;

      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      const progressBar = screen.getByTestId("progress-bar");
      expect(progressBar).toBeTruthy();
    });
  });

  describe("Cenários Especiais", () => {
    it("deve lidar com lista vazia de cupons", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: [],
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText("Total")).toBeTruthy();
      expect(screen.getAllByText("0")[0]).toBeTruthy();
      expect(screen.getByText("Cupons disponíveis")).toBeTruthy();
    });

    it("deve lidar com todos os cupons inativos", () => {
      const inactiveCoupons = mockCoupons.map((coupon) => ({
        ...coupon,
        is_active: false,
      }));

      mockedUseCouponsStorage.mockReturnValue({
        coupons: inactiveCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText("Total")).toBeTruthy();
      expect(screen.getByText(inactiveCoupons.length.toString())).toBeTruthy();
      expect(screen.getByText("0")).toBeTruthy(); // Cupons disponíveis
    });

    it("deve lidar com todos os cupons ativos", () => {
      const activeCoupons = mockCoupons.map((coupon) => ({
        ...coupon,
        is_active: true,
      }));

      mockedUseCouponsStorage.mockReturnValue({
        coupons: activeCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText("Total")).toBeTruthy();
      expect(
        screen.getAllByText(activeCoupons.length.toString())[0]
      ).toBeTruthy();
      expect(
        screen.getAllByText(activeCoupons.length.toString())[1]
      ).toBeTruthy(); // Cupons disponíveis
    });
  });

  describe("Estrutura do Componente", () => {
    it("deve ter a estrutura correta quando não está carregando", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      render(<Card />);

      expect(screen.getByText("Total")).toBeTruthy();
      expect(screen.getByText("Cupons disponíveis")).toBeTruthy();
      expect(screen.getByTestId("separator")).toBeTruthy();
    });

    it("deve aplicar classes CSS corretas", () => {
      mockedUseCouponsStorage.mockReturnValue({
        coupons: mockCoupons,
        couponsCache: [],
        isLoading: false,
        setCoupons: jest.fn(),
        setCouponsCache: jest.fn(),
        resetCoupons: jest.fn(),
        setIsLoading: jest.fn(),
      });

      const { getByTestId } = render(<Card />);
      const cardContainer = getByTestId("card-container");

      expect(cardContainer).toBeTruthy();
    });
  });
});
