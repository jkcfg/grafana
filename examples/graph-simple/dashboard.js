import * as g from '../../@jkcfg/grafana';
import * as template from '../../@jkcfg/grafana/template';

const r = '2m'; // Time window for range vectors.
const job = name => `job='${name}'`;
const RPS = selector => `sum (irate(http_requests_total{${selector}}[${r}])) by (code)`;

const dashboard = name => new g.Dashboard(`Service > ${name}`)
  .addTemplate(
    new template.PrometheusDataSource('datasource', 'Prometheus')
  )
  .addPanel(
    new g.Graph(`${name} RPS`, {
      datasource: '$datasource',
    })
      .addTargets([
        new g.Prometheus(RPS(job(name)), { legendFormat: '{{code}}' }),
      ]),
  );

export default [
  { value: dashboard('apiserver'), file: 'dashboard.json' },
];
