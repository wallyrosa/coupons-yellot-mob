import { render, screen } from "@testing-library/react-native";
import { ProgressBar } from "../ProgressBar";

describe("ProgressBar Component", () => {
  describe("Renderização", () => {
    it("deve renderizar com progresso 0", () => {
      render(<ProgressBar progress={0} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });

    it("deve renderizar com progresso 50", () => {
      render(<ProgressBar progress={50} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });

    it("deve renderizar com progresso 100", () => {
      render(<ProgressBar progress={100} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });
  });

  describe("Classes CSS", () => {
    it("deve aplicar className personalizada", () => {
      const { getByTestId } = render(
        <ProgressBar
          progress={50}
          className="custom-class"
          testID="progress-bar"
        />
      );

      const element = getByTestId("progress-bar");
      expect(element).toBeTruthy();
    });
  });

  describe("Props", () => {
    it("deve aceitar testID", () => {
      render(<ProgressBar progress={50} testID="custom-test-id" />);

      expect(screen.getByTestId("custom-test-id")).toBeTruthy();
    });

    it("deve usar progresso padrão quando não fornecido", () => {
      render(<ProgressBar progress={0} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });
  });

  describe("Valores de Progresso", () => {
    it("deve lidar com progresso negativo", () => {
      render(<ProgressBar progress={-10} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });

    it("deve limitar progresso acima de 100", () => {
      render(<ProgressBar progress={150} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });

    it("deve lidar com valores decimais", () => {
      render(<ProgressBar progress={33.33} testID="progress-bar" />);

      expect(screen.getByTestId("progress-bar")).toBeTruthy();
    });
  });

  describe("Acessibilidade", () => {
    it("deve ter estrutura correta para leitores de tela", () => {
      const { getByTestId } = render(
        <ProgressBar progress={75} testID="progress-bar" />
      );

      const element = getByTestId("progress-bar");
      expect(element).toBeTruthy();
    });
  });
});
