import { act, renderHook } from "@testing-library/react-native";
import { useFilterDays } from "../useFilterDays";
import { useCouponsStorage } from "../../../infra";
import { filterByRange } from "../../../domain/use-cases";
import { mockCoupons } from "../../../tests/mocks/coupons";

// Mock do useCouponsStorage
jest.mock("../../../infra", () => ({
  useCouponsStorage: jest.fn(),
}));

// Mock do filterByRange
jest.mock("../../../domain/use-cases", () => ({
  filterByRange: jest.fn(),
}));

const mockedUseCouponsStorage = useCouponsStorage as jest.MockedFunction<
  typeof useCouponsStorage
>;
const mockedFilterByRange = filterByRange as jest.MockedFunction<
  typeof filterByRange
>;

describe("useFilterDays", () => {
  const mockSetCoupons = jest.fn();
  const mockResetCoupons = jest.fn();
  const mockCouponsCache = mockCoupons;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseCouponsStorage.mockReturnValue({
      coupons: [],
      couponsCache: mockCouponsCache,
      isLoading: false,
      setCoupons: mockSetCoupons,
      setCouponsCache: jest.fn(),
      resetCoupons: mockResetCoupons,
      setIsLoading: jest.fn(),
    });

    mockedFilterByRange.mockImplementation((coupons, days) =>
      coupons.filter((coupon) => {
        const expireDate = new Date(coupon.expire_at);
        const now = new Date();
        const diffTime = expireDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
      })
    );
  });

  describe("Estado inicial", () => {
    it("deve ter selectedDay como null inicialmente", () => {
      const { result } = renderHook(() => useFilterDays());

      expect(result.current.selectedDay).toBeNull();
    });

    it("deve ter as funções handleSelectDay e handleRemoveFilter disponíveis", () => {
      const { result } = renderHook(() => useFilterDays());

      expect(typeof result.current.handleSelectDay).toBe("function");
      expect(typeof result.current.handleRemoveFilter).toBe("function");
    });
  });

  describe("handleSelectDay", () => {
    it("deve aplicar filtro quando seleciona um dia diferente", () => {
      const { result } = renderHook(() => useFilterDays());
      const filteredCoupons = mockCoupons.slice(0, 2);

      mockedFilterByRange.mockReturnValue(filteredCoupons);

      act(() => {
        result.current.handleSelectDay(1, 7);
      });

      expect(mockedFilterByRange).toHaveBeenCalledWith(mockCouponsCache, 7);
      expect(mockSetCoupons).toHaveBeenCalledWith(filteredCoupons);
      expect(result.current.selectedDay).toBe(1);
    });

    it("deve remover filtro quando seleciona o mesmo dia", () => {
      const { result } = renderHook(() => useFilterDays());

      act(() => {
        result.current.handleSelectDay(1, 7);
      });

      expect(result.current.selectedDay).toBe(1);

      act(() => {
        result.current.handleSelectDay(1, 7);
      });

      expect(mockResetCoupons).toHaveBeenCalled();
      expect(result.current.selectedDay).toBeNull();
    });

    it("deve atualizar selectedDay corretamente", () => {
      const { result } = renderHook(() => useFilterDays());

      act(() => {
        result.current.handleSelectDay(2, 15);
      });

      expect(result.current.selectedDay).toBe(2);

      act(() => {
        result.current.handleSelectDay(3, 30);
      });

      expect(result.current.selectedDay).toBe(3);
    });
  });

  describe("handleRemoveFilter", () => {
    it("deve resetar cupons e selectedDay", () => {
      const { result } = renderHook(() => useFilterDays());

      act(() => {
        result.current.handleSelectDay(1, 7);
      });

      expect(result.current.selectedDay).toBe(1);

      act(() => {
        result.current.handleRemoveFilter();
      });

      expect(mockResetCoupons).toHaveBeenCalled();
      expect(result.current.selectedDay).toBeNull();
    });

    it("deve funcionar mesmo sem filtro aplicado", () => {
      const { result } = renderHook(() => useFilterDays());

      act(() => {
        result.current.handleRemoveFilter();
      });

      expect(mockResetCoupons).toHaveBeenCalled();
      expect(result.current.selectedDay).toBeNull();
    });
  });

  describe("Integração", () => {
    it("deve funcionar corretamente com múltiplas operações", () => {
      const { result } = renderHook(() => useFilterDays());

      act(() => {
        result.current.handleSelectDay(1, 7);
      });

      expect(result.current.selectedDay).toBe(1);
      expect(mockSetCoupons).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.handleSelectDay(2, 15);
      });

      expect(result.current.selectedDay).toBe(2);
      expect(mockSetCoupons).toHaveBeenCalledTimes(2);

      act(() => {
        result.current.handleRemoveFilter();
      });

      expect(result.current.selectedDay).toBeNull();
      expect(mockResetCoupons).toHaveBeenCalledTimes(1);
    });
  });
});
