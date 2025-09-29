import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import React from "react";
import { useCouponsQuery } from "../useCouponsQuery";
import { mockCoupons, mockApiResponse } from "../../../tests/mocks/coupons";

// Mock do repository
const mockGetCoupons = jest.fn();
jest.mock("../../../infra/repositories", () => ({
  couponsRepository: jest.fn(() => ({
    getCoupons: mockGetCoupons,
  })),
}));

import { couponsRepository } from "../../../infra/repositories";

const mockedRepository = couponsRepository as jest.MockedFunction<
  typeof couponsRepository
>;

describe("useCouponsQuery", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("deve buscar cupons com sucesso", async () => {
    // Arrange
    mockGetCoupons.mockResolvedValue(mockCoupons);

    // Act
    const { result } = renderHook(() => useCouponsQuery(), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCoupons);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockGetCoupons).toHaveBeenCalledTimes(1);
  });

  it("deve mostrar estado de loading inicial", () => {
    // Arrange
    mockGetCoupons.mockResolvedValue(mockCoupons);

    // Act
    const { result } = renderHook(() => useCouponsQuery(), { wrapper });

    // Assert
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isSuccess).toBe(false);
  });

  it("deve tratar erro na busca de cupons", async () => {
    // Arrange
    const errorMessage = "Erro ao buscar cupons";
    mockGetCoupons.mockRejectedValue(new Error(errorMessage));

    // Act
    const { result } = renderHook(() => useCouponsQuery(), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetCoupons).toHaveBeenCalledTimes(1);
  });

  it("deve usar a queryKey correta", () => {
    // Arrange
    mockGetCoupons.mockResolvedValue(mockCoupons);

    // Act
    renderHook(() => useCouponsQuery(), { wrapper });

    // Assert
    expect(
      queryClient.getQueryCache().find({ queryKey: ["coupons"] })
    ).toBeDefined();
  });

  it("deve retornar array vazio quando não há dados", async () => {
    // Arrange
    mockGetCoupons.mockResolvedValue([]);

    // Act
    const { result } = renderHook(() => useCouponsQuery(), { wrapper });

    // Assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("deve manter dados em cache entre re-renders", async () => {
    // Arrange
    mockGetCoupons.mockResolvedValue(mockCoupons);

    // Act
    const { result, rerender } = renderHook(() => useCouponsQuery(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    rerender();

    // Assert
    expect(result.current.data).toEqual(mockCoupons);
    expect(mockGetCoupons).toHaveBeenCalledTimes(1); // Não deve chamar novamente
  });
});
