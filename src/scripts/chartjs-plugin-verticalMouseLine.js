import { PointElement } from 'chart.js';

/** @type {import('chart.js').Plugin} */
const VerticalMouseLine = {
  id: 'verticalMouseLine',
  defaults: {
    hoverX: null,
    activeIndex: null,
    color: 'red',
    hoverLineWidth: 1,
    activeLineWidth: 2,
    lineDash: [5,3],
  },
  afterEvent: (chart, {event, inChartArea}, options) => {
    if (!inChartArea || !chart.getActiveElements().length) {
      options.hoverX = null;
      return
    }

    const activeElement = chart.getActiveElements()[0].element;

    if (!(activeElement instanceof PointElement)) return;

    const x = activeElement.x;

    switch (event.type) {
      case 'mousemove':
        options.hoverX = x
        break;
    }
  },
  afterDraw: (chart, args, options) => {
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
      const x = chart.getDatasetMeta(0).data[options.activeIndex].x
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = options.color;
      ctx.lineWidth = options.activeLineWidth;
      ctx.moveTo(x, chart.chartArea.bottom);
      ctx.lineTo(x, 0);
      ctx.stroke();
      ctx.restore();
    }
  }
}

export default VerticalMouseLine;