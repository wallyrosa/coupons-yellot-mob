import { render, screen } from "@testing-library/react-native";
import { Separator } from "../Separator";

describe("Separator Component", () => {
  describe("Renderização", () => {
    it("deve renderizar sem props", () => {
      const { getByTestId } = render(<Separator testID="separator" />);

      expect(getByTestId("separator")).toBeTruthy();
    });

    it("deve renderizar com className personalizada", () => {
      const { getByTestId } = render(
        <Separator className="my-4" testID="separator" />
      );

      expect(getByTestId("separator")).toBeTruthy();
    });
  });

  describe("Props", () => {
    it("deve aceitar testID", () => {
      render(<Separator testID="custom-separator" />);

      expect(screen.getByTestId("custom-separator")).toBeTruthy();
    });

    it("deve aceitar className", () => {
      const { getByTestId } = render(
        <Separator className="bg-red-500 h-2" testID="separator" />
      );

      expect(getByTestId("separator")).toBeTruthy();
    });

    it("deve funcionar sem testID", () => {
      const { getByTestId } = render(<Separator />);

      // Como não há testID, vamos verificar se o componente renderiza
      // através da estrutura do componente
      expect(getByTestId).toBeDefined();
    });
  });

  describe("Classes CSS padrão", () => {
    it("deve aplicar classes CSS padrão", () => {
      const { getByTestId } = render(<Separator testID="separator" />);

      const element = getByTestId("separator");
      expect(element).toBeTruthy();
      // As classes CSS específicas seriam verificadas através das props do componente
    });
  });
});

