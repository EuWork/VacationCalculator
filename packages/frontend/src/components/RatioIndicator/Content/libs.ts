import type { GlobalToken } from "antd";
import Color from "color";

export class ColorLibs {
  colors: string[];
  gradients: string[];

  constructor({ token }: { token: GlobalToken }) {
    this.colors = this.calculateColors(token);
    this.gradients = this.calculateGradients();
  }

  private calculateColors(token: GlobalToken) {
    const baseGray = new Color(token.colorBgLayout).mix(new Color(token.colorFillSecondary), 0.9).hex();
    const baseBlue = new Color(token.blue6).lighten(0.4).hex();
    const baseGreen = new Color(token.green6).lighten(0.4).hex();
    const baseYellow = new Color(token.yellow6).lighten(0.4).hex();
    const baseRed = new Color(token.red6).lighten(0.4).hex();
    const colors = [baseGray, baseBlue, baseGreen, baseYellow, baseRed];

    return colors;
  }

  private calculateGradients() {
    const gradients = [];
    const alpha = 0.5;

    for (let i = 0; i < this.colors.length - 1; i++) {
      const startColor =
        i === 0
          ? new Color(this.colors[i]).alpha(alpha).string()
          : new Color(this.colors[i])
              .mix(new Color(this.colors[i - 1]), 0.5)
              .alpha(alpha)
              .string();

      const endColor = new Color(this.colors[i])
        .mix(new Color(this.colors[i + 1]), 0.5)
        .alpha(alpha)
        .string();

      gradients.push(`linear-gradient(to right, ${startColor}, ${endColor})`);
    }

    const lastStartColor = new Color(this.colors[this.colors.length - 2])
      .mix(new Color(this.colors[this.colors.length - 1]), 0.5)
      .alpha(alpha)
      .string();

    const lastEndColor = new Color(this.colors[this.colors.length - 1]).alpha(alpha).string();

    gradients.push(`linear-gradient(to right, ${lastStartColor}, ${lastEndColor})`);

    return gradients;
  }
}
