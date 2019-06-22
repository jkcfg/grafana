import { Dashboard, Graph, Prometheus } from '../src/grafana';

const r = '2m'; // Time window for range vectors.
const selector = (name: string): string => `job=${name}`;
const RPS = (s: string): string => `sum by (code)(sum(irate(http_request_total{${s}}[${r}])))`;

// Somewhat of an e2e test to test we can create basic dashboards.
test('dashboards can be created', () => {
  const title = 'Service dashboard';
  const panelTitle = 'Requests per second';
  const dashboard = new Dashboard(title)
    .addPanel(
      new Graph(panelTitle, {
        datasource: '$PROMETHEUS_DS',
      }).addTargets([
        new Prometheus(RPS(selector('billing')), { legendFormat: '{{code}}' }),
      ]),
    );

  expect(dashboard.title).toBe(title);
  expect(dashboard.panels.length).toBe(1);

  const panel = dashboard.panels[0];
  expect(panel.title).toBe(panelTitle);
});
