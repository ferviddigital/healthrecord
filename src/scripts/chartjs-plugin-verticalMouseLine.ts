import { PointElement } from 'chart.js';
import type { Chart, ChartEvent, Color, Plugin } from 'chart.js';

interface VerticalMouseLineOptions {
  hoverX?: number;
  activeIndex?: number;
  color: Color;
  hoverLineWidth: number;
  activeLineWidth: number;
  lineDash: number[];
}

const VerticalMouseLine: Plugin<'line', VerticalMouseLineOptions> = {
  id: 'verticalMouseLine',
  defaults: {
    hoverX: undefined,
    activeIndex: undefined,
    color: 'red',
    hoverLineWidth: 1,
    activeLineWidth: 2,
    lineDash: [5, 3],
  },
  afterEvent: (
    chart: Chart,
    args: Object & { event: ChartEvent; inChartArea: boolean },
    options
  ) => {
    if (!args.inChartArea || !chart.getActiveElements().length) {
      options.hoverX = undefined;
      return;
    }

    const activeElement = chart.getActiveElements()[0].element;

    if (!(activeElement instanceof PointElement)) return;

    const x = activeElement.x;

    switch (args.event.type) {
      case 'mousemove':
        options.hoverX = x;
        break;
    }
  },
  afterDraw: (chart: Chart, _args: Object, options) => {
    const ctx = chart.ctx;

    if (options.hoverX) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = options.color;
      ctx.lineWidth = options.hoverLineWidth;
      ctx.setLineDash(options.lineDash);
      ctx.moveTo(options.hoverX, chart.chartArea.bottom);
      ctx.lineTo(options.hoverX, options.activeIndex ? 0 : chart.chartArea.top);
      ctx.stroke();
      ctx.restore();
    }

    if (options.activeIndex) {
      const x = chart.getDatasetMeta(0).data[options.activeIndex].x;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = options.color;
      ctx.lineWidth = options.activeLineWidth;
      ctx.moveTo(x, chart.chartArea.bottom);
      ctx.lineTo(x, 0);
      ctx.stroke();
      ctx.restore();
    }
  },
};

export default VerticalMouseLine;
