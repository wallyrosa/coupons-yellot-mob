export interface Coupons {
  code: string;
  type: string;
  value: number;
  expire_at: string;
  is_active: boolean;
  max_use: number;
  used: number;
  max_apply_date: string | null;
}
