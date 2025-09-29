import { act, renderHook } from "@testing-library/react-native";
import { useCouponsStorage } from "../useCouponsStorage";
import { mockCoupons } from "../../../tests/mocks/coupons";

describe("useCouponsStorage", () => {
  beforeEach(() => {
    // Reset do store antes de cada teste
    const { result } = renderHook(() => useCouponsStorage());
    act(() => {
      result.current.setCoupons([]);
      result.current.setCouponsCache([]);
      result.current.setIsLoading(false);
    });
  });

  describe("Estado inicial", () => {
    it("deve ter estado inicial correto", () => {
      const { result } = renderHook(() => useCouponsStorage());

      expect(result.current.coupons).toEqual([]);
      expect(result.current.couponsCache).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("setCoupons", () => {
    it("deve atualizar a lista de cupons", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setCoupons(mockCoupons);
      });

      expect(result.current.coupons).toEqual(mockCoupons);
    });

    it("deve substituir completamente a lista de cupons", () => {
      const { result } = renderHook(() => useCouponsStorage());
      const initialCoupons = [mockCoupons[0]];
      const newCoupons = [mockCoupons[1], mockCoupons[2]];

      act(() => {
        result.current.setCoupons(initialCoupons);
      });

      expect(result.current.coupons).toEqual(initialCoupons);

      act(() => {
        result.current.setCoupons(newCoupons);
      });

      expect(result.current.coupons).toEqual(newCoupons);
    });
  });

  describe("setCouponsCache", () => {
    it("deve atualizar o cache de cupons", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setCouponsCache(mockCoupons);
      });

      expect(result.current.couponsCache).toEqual(mockCoupons);
    });
  });

  describe("resetCoupons", () => {
    it("deve restaurar cupons do cache", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setCouponsCache(mockCoupons);
        result.current.setCoupons([]);
      });

      expect(result.current.coupons).toEqual([]);
      expect(result.current.couponsCache).toEqual(mockCoupons);

      act(() => {
        result.current.resetCoupons();
      });

      expect(result.current.coupons).toEqual(mockCoupons);
    });

    it("deve manter cache inalterado após reset", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setCouponsCache(mockCoupons);
        result.current.setCoupons([]);
        result.current.resetCoupons();
      });

      expect(result.current.couponsCache).toEqual(mockCoupons);
    });
  });

  describe("setIsLoading", () => {
    it("deve atualizar o estado de loading", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setIsLoading(true);
      });

      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.setIsLoading(false);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Integração", () => {
    it("deve permitir operações complexas", () => {
      const { result } = renderHook(() => useCouponsStorage());

      act(() => {
        result.current.setCouponsCache(mockCoupons);
        result.current.setCoupons([mockCoupons[0]]);
        result.current.setIsLoading(true);
      });

      expect(result.current.couponsCache).toEqual(mockCoupons);
      expect(result.current.coupons).toEqual([mockCoupons[0]]);
      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.resetCoupons();
        result.current.setIsLoading(false);
      });

      expect(result.current.coupons).toEqual(mockCoupons);
      expect(result.current.isLoading).toBe(false);
    });
  });
});

