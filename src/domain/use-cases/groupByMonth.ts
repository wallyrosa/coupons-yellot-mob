import { Coupons } from "@/infra";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const groupByMonth = (items: Coupons[]) => {
  const map: Record<string, Coupons[]> = {};

  items.forEach((item) => {
    const month = format(item.expire_at, "MMMM", { locale: ptBR });
    if (!map[month]) map[month] = [];
    map[month].push(item);
  });

  let sections = Object.entries(map).map(([title, data]) => ({ title, data }));

  sections.sort(
    (a, b) => new Date(a.data[0].expire_at).getMonth() - new Date(b.data[0].expire_at).getMonth()
  );

  const currentMonth = new Date().getMonth();
  const index = sections.findIndex(
    (s) => new Date(s.data[0].expire_at).getMonth() === currentMonth
  );

  if (index > 0) {
    sections = [...sections.slice(index), ...sections.slice(0, index)];
  }

  return sections;
};
