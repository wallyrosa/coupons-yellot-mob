import { Coupons } from "@/infra/types";

export const mockCoupons: Coupons[] = [
  {
    code: "DESC10",
    type: "percentage",
    value: 10,
    expire_at: "2024-12-31T23:59:59Z",
    is_active: true,
    max_use: 100,
    used: 25,
    max_apply_date: "2024-12-25T23:59:59Z",
  },
  {
    code: "FIXED50",
    type: "fixed",
    value: 50,
    expire_at: "2024-11-30T23:59:59Z",
    is_active: true,
    max_use: 50,
    used: 15,
    max_apply_date: null,
  },
  {
    code: "EXPIRED20",
    type: "percentage",
    value: 20,
    expire_at: "2024-01-01T00:00:00Z",
    is_active: false,
    max_use: 200,
    used: 200,
    max_apply_date: null,
  },
  {
    code: "LIMITED5",
    type: "percentage",
    value: 5,
    expire_at: "2024-12-31T23:59:59Z",
    is_active: true,
    max_use: 10,
    used: 10,
    max_apply_date: null,
  },
];

export const mockApiResponse = {
  data: mockCoupons,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

export const mockApiError = {
  response: {
    data: { message: "Erro interno do servidor" },
    status: 500,
    statusText: "Internal Server Error",
    headers: {},
    config: {},
  },
  message: "Request failed with status code 500",
};

