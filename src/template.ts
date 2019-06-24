export class Value {
  text: string;
  value: string;
  tags?: string[]
  isNone?: boolean;

  constructor(text: string, value: string, params?: Partial<Value>) {
    Object.assign(this, { text, value }, params);
  }

  static all(): Value {
    return {
      text: 'All',
      value: '$__all',
    };
  }
}

export enum Hide {
  Nothing,
  Label,
  Variable
}

export class Template {
  type: string;
  name: string;
  current: Value;
  hide: Hide = Hide.Nothing;
  includeAll: boolean = false;
  label: string | null = null;
  multi: boolean = false;
  skipUrlSync: boolean = false;

  constructor(type: string) {
    this.type = type;
  }
}

export enum Refresh {
  Never,
  OnDashboardLoad,
  OnTimeRangeChange,
}

export enum Source {
  Prometheus = 'prometheus',
}

export class DataSource extends Template {
  regex: string = '';
  refresh: Refresh = Refresh.OnDashboardLoad;

  constructor(query: Source, name: string, value: string, params?: Partial<DataSource>) {
    super('datasource');
    Object.assign(this, { query, name, current: { text: value, value } }, params);
  }
}

export class PrometheusDataSource extends DataSource {
  constructor(name: string, value: string, params?: Partial<PrometheusDataSource>) {
    super(Source.Prometheus, name, value, params);
  }
}
