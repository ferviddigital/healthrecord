import { Chart, Title, Filler, Tooltip, LinearScale, PointElement, LineElement, TimeSeriesScale } from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import VerticalMouseLine from './chartjs-plugin-verticalMouseLine';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

Chart.register(Title, Filler, Tooltip, LinearScale, PointElement, LineElement, AnnotationPlugin, TimeSeriesScale, VerticalMouseLine);

Chart.defaults.font.family = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

