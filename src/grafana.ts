import { Targetable } from './Mixins';
import { Target } from './Target';

export class TimePicker {
  refresh_intervals = [
    '5s',
    '10s',
    '30s',
    '1m',
    '5m',
    '15m',
    '30m',
    '1h',
    '2h',
    '1d',
  ];
  time_options = [
    '5m',
    '15m',
    '1h',
    '6h',
    '12h',
    '24h',
    '2d',
    '7d',
    '30d',
  ];

  constructor(params?: Partial<TimePicker>) {
    Object.assign(this, params);
  }
}

export class Legend {
  show = true;
  values = false;
  min = false;
  max = false;
  current = false;
  total = false;
  avg = false;
  alignAsTable = false;
  rightSide = false;
  hideEmpty = undefined;
  hideZero = undefined;
  sort = undefined;
  sortDesc = undefined;

  constructor(params?: Partial<Legend>) {
    Object.assign(this, params);
  }
}

export class YAxis {
  format = 'short';
  min = null;
  max = null;
  label = null;
  show = true;
  logBase = 1;
  decimals = undefined;

  constructor(params?: Partial<YAxis>) {
    Object.assign(this, params);
  }
}

export class XAxis {
  show = true;
  mode = 'time';
  name = null;
  values = undefined;
  buckets = null;
  constructor(params?: Partial<XAxis>) {
    Object.assign(this, params);
  }
}

export class Prometheus {
  refId: string;

  format = 'time_series';
  intervalFactor = 2;
  legendFormat = '';
  datasource = undefined;
  interval = undefined;
  instant = undefined;

  constructor(expr: string, params?: Partial<Prometheus>) {
    Object.assign(this, { expr }, params);
  }
}

class BaseGraph {
  type = 'graph';
  title: string;
  span?: number;
  min_span?: number;
  fill = 1;
  linewidth = 1;
  description?: string;
  lines = true;
  datasource: string | null = null;
  points = false;
  pointradius = 5;
  bars = false;
  height?: number;
  nullPointMode: string = 'null';
  dashes = false;
  stack = false;
  repeat = null;
  repeatDirection = undefined;
  legend = new Legend();
  aliasColors = {};
  transparent = undefined;
  yAxis = [
    new YAxis(),
    new YAxis(),
  ];
  xAxis = new XAxis();
  renderer = 'flot';
  dashLength = 10;
  spaceLength = 10;
  percentage = false;
  steppedLine = false;
  tooltip = {
    value_type: 'individual',
    shared: true,
    sort: 0,
  };
  seriesOverrides = [];
  thresholds = [];
  links = [];

  targets: Target[];
  constructor(title, params?: Partial<BaseGraph>) {
    Object.assign(this, { title }, params);
  }
}

export class Graph extends Targetable(BaseGraph) { }

export const Tooltip = {
  DEFAULT: 0,
  SHARED_CROSSHAIR: 1,
  SHARED_TOOLTIP: 2,
};

export class Dashboard {
  title: string;

  panels: any[] = [];
  editable = false;
  style = 'dark';
  tags = [];
  timezone = 'browser';
  refresh = '';
  timepicker = new TimePicker();
  graphTooltip = Tooltip.DEFAULT;
  hideControls = false;
  schemaVersion = 16;
  uid = '';
  description?: string;
  annotations = {
    list: [],
  };
  gnetId = null;
  id = null;
  links = [];
  time = {
    from: 'now-6h',
    to: 'now',
  };
  version = 0;
  templating: Template[] = [];

  constructor(title, params?: Partial<Dashboard>) {
    Object.assign(this, { title }, params);
  }

  static numPanels(panels) {
    return panels.reduce((count, panel) => {
      if ('panels' in panel) {
        return count + Dashboard.numPanels(panel.panels);
      }
      return count + 1;
    }, 0, 0);
  }

  static setPanelsId(panels, startId) {
    panels.forEach((p) => {
      p.id = startId + 1;
      if ('panels' in p) {
        startId = Dashboard.setPanelsId(p.panels, startId);
      }
    });
    return startId;
  }

  addPanel(panel, {
    gridPos = {
      x: 0, y: 0, w: 24, h: 7,
    },
  } = {}) {
    const nextId = Dashboard.numPanels(this.panels) + 1;
    Dashboard.setPanelsId([panel], nextId);
    panel.gridPos = gridPos;
    this.panels.push(panel);
    return this;
  }
}
