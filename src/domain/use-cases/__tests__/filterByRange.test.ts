import { filterByRange } from "../filterByRange";
import { subDays } from "date-fns";

describe("filterByRange", () => {
  describe("Filtro por dias", () => {
    it("deve retornar cupons que expiram dentro do range de 7 dias (passado)", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_6_DAYS_AGO",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 6).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
        {
          code: "EXPIRED_3_DAYS_AGO",
          type: "percentage",
          value: 15,
          expire_at: subDays(today, 3).toISOString(),
          is_active: true,
          max_use: 50,
          used: 10,
          max_apply_date: null,
        },
        {
          code: "EXPIRED_10_DAYS_AGO",
          type: "fixed",
          value: 50,
          expire_at: subDays(today, 10).toISOString(),
          is_active: true,
          max_use: 200,
          used: 50,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 7);

      expect(result).toHaveLength(2);
      expect(result.map((c) => c.code)).toContain("EXPIRED_6_DAYS_AGO");
      expect(result.map((c) => c.code)).toContain("EXPIRED_3_DAYS_AGO");
      expect(result.map((c) => c.code)).not.toContain("EXPIRED_10_DAYS_AGO");
    });

    it("deve retornar cupons que expiram dentro do range de 30 dias (passado)", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_15_DAYS_AGO",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 15).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
        {
          code: "EXPIRED_25_DAYS_AGO",
          type: "percentage",
          value: 20,
          expire_at: subDays(today, 25).toISOString(),
          is_active: true,
          max_use: 50,
          used: 10,
          max_apply_date: null,
        },
        {
          code: "EXPIRED_35_DAYS_AGO",
          type: "fixed",
          value: 100,
          expire_at: subDays(today, 35).toISOString(),
          is_active: true,
          max_use: 200,
          used: 50,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 30);

      expect(result).toHaveLength(2);
      expect(result.map((c) => c.code)).toContain("EXPIRED_15_DAYS_AGO");
      expect(result.map((c) => c.code)).toContain("EXPIRED_25_DAYS_AGO");
      expect(result.map((c) => c.code)).not.toContain("EXPIRED_35_DAYS_AGO");
    });

    it("deve retornar array vazio quando não há cupons no range", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_10_DAYS_AGO",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 10).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 7);

      expect(result).toHaveLength(0);
    });

    it("deve retornar array vazio quando lista de cupons está vazia", () => {
      const result = filterByRange([], 7);

      expect(result).toHaveLength(0);
    });
  });

  describe("Cenários especiais", () => {
    it("deve lidar com cupons que expiram exatamente no limite do range", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_EXACTLY_7_DAYS_AGO",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 7).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
        {
          code: "EXPIRED_JUST_BEFORE_7_DAYS",
          type: "percentage",
          value: 15,
          expire_at: subDays(today, 7.1).toISOString(),
          is_active: true,
          max_use: 50,
          used: 10,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 7);

      expect(result).toHaveLength(1);
      expect(result[0].code).toBe("EXPIRED_EXACTLY_7_DAYS_AGO");
    });

    it("deve lidar com cupons que expiram hoje", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRES_TODAY",
          type: "percentage",
          value: 10,
          expire_at: today.toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 1);

      expect(result).toHaveLength(0);
    });

    it("deve lidar com range de 0 dias", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_YESTERDAY",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 1).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 0);

      expect(result).toHaveLength(0);
    });
  });

  describe("Performance e edge cases", () => {
    it("deve lidar com range muito grande", () => {
      const today = new Date();
      const coupons = [
        {
          code: "EXPIRED_365_DAYS_AGO",
          type: "percentage",
          value: 10,
          expire_at: subDays(today, 365).toISOString(),
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
      ];

      const result = filterByRange(coupons, 365);

      expect(result).toHaveLength(1);
    });

    it("deve preservar todas as propriedades dos cupons", () => {
      const today = new Date();
      const coupon = {
        code: "TEST",
        type: "percentage",
        value: 10,
        expire_at: subDays(today, 5).toISOString(),
        is_active: true,
        max_use: 100,
        used: 25,
        max_apply_date: "2024-12-25T23:59:59Z",
      };

      const result = filterByRange([coupon], 7);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(coupon);
    });

    it("deve lidar com datas inválidas graciosamente", () => {
      const coupons = [
        {
          code: "INVALID_DATE",
          type: "percentage",
          value: 10,
          expire_at: "invalid-date",
          is_active: true,
          max_use: 100,
          used: 0,
          max_apply_date: null,
        },
      ];

      expect(() => filterByRange(coupons, 7)).not.toThrow();
    });
  });
});
