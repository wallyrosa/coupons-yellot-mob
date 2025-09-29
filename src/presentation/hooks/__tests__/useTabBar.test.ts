import { renderHook, act } from "@testing-library/react-native";
import { useTabBar } from "../useTabBar";
import { tabIcons } from "@/utils";

describe("useTabBar", () => {
  const mockNavigation = {
    emit: jest.fn(),
    navigate: jest.fn(),
  };

  const mockState = {
    routes: [
      { key: "coupons", name: "Coupons", params: {} },
      { key: "search", name: "Search", params: {} },
      { key: "history", name: "History", params: {} },
      { key: "wallet", name: "Wallet", params: {} },
    ],
    index: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getIconName", () => {
    it("deve retornar ícone focado quando isFocused é true", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      const iconName = result.current.getIconName("Coupons", true);
      expect(iconName).toBe(tabIcons.Coupons.focused);
    });

    it("deve retornar ícone não focado quando isFocused é false", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      const iconName = result.current.getIconName("Coupons", false);
      expect(iconName).toBe(tabIcons.Coupons.unfocused);
    });

    it("deve retornar undefined para rota inexistente", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      const iconName = result.current.getIconName("NonExistent", true);
      expect(iconName).toBeUndefined();
    });

    it("deve funcionar com todas as rotas", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      expect(result.current.getIconName("Coupons", true)).toBe(
        tabIcons.Coupons.focused
      );
      expect(result.current.getIconName("Search", true)).toBe(
        tabIcons.Search.focused
      );
      expect(result.current.getIconName("History", true)).toBe(
        tabIcons.History.focused
      );
      expect(result.current.getIconName("Wallet", true)).toBe(
        tabIcons.Wallet.focused
      );
    });
  });

  describe("onPress", () => {
    it("deve emitir evento tabPress", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );
      const route = mockState.routes[0];

      // Mock do evento com defaultPrevented
      const mockEvent = { defaultPrevented: false };
      mockNavigation.emit.mockReturnValue(mockEvent);

      act(() => {
        result.current.onPress(route, false, 0);
      });

      expect(mockNavigation.emit).toHaveBeenCalledWith({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
    });

    it("deve navegar quando não está focado e evento não foi prevenido", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );
      const route = mockState.routes[1];

      mockNavigation.emit.mockReturnValue({ defaultPrevented: false });

      act(() => {
        result.current.onPress(route, false, 1);
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        route.name,
        route.params
      );
    });

    it("não deve navegar quando já está focado", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );
      const route = mockState.routes[0];

      act(() => {
        result.current.onPress(route, true, 0);
      });

      expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });

    it("não deve navegar quando evento foi prevenido", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );
      const route = mockState.routes[1];

      mockNavigation.emit.mockReturnValue({ defaultPrevented: true });

      act(() => {
        result.current.onPress(route, false, 1);
      });

      expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });
  });

  describe("onLongPress", () => {
    it("deve emitir evento tabLongPress", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      act(() => {
        result.current.onLongPress("coupons-key");
      });

      expect(mockNavigation.emit).toHaveBeenCalledWith({
        type: "tabLongPress",
        target: "coupons-key",
      });
    });
  });

  describe("dimensions e buttonWidth", () => {
    it("deve calcular buttonWidth corretamente", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      expect(result.current.buttonWidth).toBe(20 / 4);
    });

    it("deve atualizar buttonWidth quando dimensions mudam", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      act(() => {
        result.current.setDimensions({ width: 100, height: 50 });
      });

      expect(result.current.buttonWidth).toBe(100 / 4);
    });
  });

  describe("Estado inicial", () => {
    it("deve ter dimensões padrão", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      expect(result.current.dimensions).toEqual({ width: 20, height: 100 });
    });

    it("deve ter setDimensions disponível", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      expect(typeof result.current.setDimensions).toBe("function");
    });

    it("deve ter animatedItem disponível", () => {
      const { result } = renderHook(() =>
        useTabBar(mockNavigation as any, mockState as any)
      );

      expect(result.current.animatedItem).toBeDefined();
    });
  });
});
