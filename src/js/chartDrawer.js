define([], () => {
  const CANVAS_PADDING_PX = 30.5;

  return class {
    constructor (canvasId) {
      this.canvas = document.getElementById(canvasId);
    }

    getEffectiveWidth () { return this.canvas.width - 2 * CANVAS_PADDING_PX; }

    drawChart (data, options) {
      const context = this.canvas.getContext('2d');
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const { min, max, color, total } = options;

      const drawAxis = () => {
        const w = Math.round(this.canvas.width);
        const h = Math.round(this.canvas.height);
        context.beginPath();
        // Vertical axis
        context.fillText(max, CANVAS_PADDING_PX - 25, CANVAS_PADDING_PX);
        context.fillText(min, CANVAS_PADDING_PX - 25, h - CANVAS_PADDING_PX);
        context.moveTo(CANVAS_PADDING_PX, CANVAS_PADDING_PX);
        context.lineTo(CANVAS_PADDING_PX, h - CANVAS_PADDING_PX);
        context.stroke();
        // Horizontal axis
        context.lineTo(w - CANVAS_PADDING_PX, h - CANVAS_PADDING_PX);
        context.stroke();
      };

      const drawLabel = (value, x, y) => {
        context.fillText(value, x - context.measureText(value).width / 2, this.canvas.height - CANVAS_PADDING_PX + 10);
      };

      const drawMainContent = () => {
        const stepX = this.getEffectiveWidth() / (total - 1);

        const effectiveHeight = this.canvas.height - (2 * CANVAS_PADDING_PX);
        const yScaleRate = effectiveHeight / (max - min);
        const minYAbsolute = this.canvas.height - CANVAS_PADDING_PX;

        let x = CANVAS_PADDING_PX;
        let y;
        context.beginPath();

        let iteration = 0;
        let lastDrawnLabelX = 0;
        data.forEach((values) => {
          if (lastDrawnLabelX === 0 || x - lastDrawnLabelX > 50) {
            drawLabel(values.ym, x, y);
            lastDrawnLabelX = x;
          }

          values.v.forEach(v => {
            y = minYAbsolute - ((v - min) * yScaleRate);
            if (iteration === 0) {
              context.moveTo(x, y);
            } else {
              x += stepX;
              context.lineTo(x, y);
            }

            iteration++;
          });
        });

        context.strokeStyle = color;
        context.stroke();
      };

      drawAxis();
      drawMainContent();
    }
  };
});
