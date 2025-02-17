import { Canvas } from '@antv/g';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Chart, createLibrary, ChartEvent } from '../../../src';
import {
  View,
  TimingKeyframe,
  SpaceFlex,
  FacetRect,
  RepeatMatrix,
  FacetCircle,
  SpaceLayer,
} from '../../../src/api/composition';
import {
  Area,
  Cell,
  Image,
  Interval,
  Line,
  Link,
  Point,
  Polygon,
  Vector,
  Text,
  Box,
  LineX,
  LineY,
  Range,
  RangeX,
  RangeY,
  Rect,
  Connector,
  Boxplot,
  Sankey,
  Treemap,
  Shape,
  Pack,
  ForceGraph,
  Tree,
  WordCloud,
  Gauge,
  Density,
  Heatmap,
} from '../../../src/api/mark/mark';

const TEST_OPTIONS = {
  type: 'interval',
  theme: 'classic',
  encode: { x: 'genre', y: 'sold' },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
};

describe('Chart', () => {
  it('Chart() should have expected defaults.', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({ theme: 'classic', key: undefined });
    expect(chart['_container'].nodeName).toBe('DIV');
    expect(chart['_trailing']).toBe(false);
    expect(chart['_rendering']).toBe(false);
    expect(chart['_plugins'].length).toBe(0);
    expect(chart['_renderer']).toBeDefined();
    expect(chart['_trailingResolve']).toBeNull();
    expect(chart['_trailingReject']).toBeNull();
  });

  it('Chart({...}) should support HTML container.', () => {
    const container = document.createElement('div');
    const chart = new Chart({ theme: 'classic', container });
    expect(chart['_container']).toBe(container);
  });

  it('Chart({...}) should support id container.', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({ theme: 'classic', container: 'root' });
    expect(chart['_container']).toBe(div);
  });

  it('Chart({...}) should support undefined container.', () => {
    const chart = new Chart({ theme: 'classic' });
    const defaultContainer = chart['_container'];
    expect(defaultContainer.nodeName).toBe('DIV');
    expect(defaultContainer.parentNode).toBeNull();
  });

  it('Chart({...}) should override default value.', () => {
    const chart = new Chart({
      theme: 'classic',
      data: [1, 2, 3],
      key: 'chart',
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
      key: 'chart',
      theme: 'classic',
    });
  });

  it('chart.getContainer() should return container.', () => {
    const container = document.createElement('div');
    const chart = new Chart({ theme: 'classic', container });
    expect(chart.getContainer()).toBe(container);
  });

  it('chart.[attr](...) should specify options by API.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart
      .data([1, 2, 3])
      .labelTransform({ type: 'overlapDodgeY' })
      .attr('key', 'composition')
      .coordinate({ type: 'polar' })
      .interaction('elementHighlight')
      .transform({ type: 'stackY' })
      .theme({ defaultColor: 'red' });

    expect(chart.options()).toEqual({
      type: 'view',
      data: [1, 2, 3],
      key: 'composition',
      labelTransform: [{ type: 'overlapDodgeY' }],
      coordinate: { type: 'polar' },
      transform: [{ type: 'stackY' }],
      theme: { defaultColor: 'red' },
      interaction: {
        elementHighlight: true,
      },
    });
  });

  it('chart.nodeName() should return expected node.', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.interval()).toBeInstanceOf(Interval);
    expect(chart.rect()).toBeInstanceOf(Rect);
    expect(chart.point()).toBeInstanceOf(Point);
    expect(chart.area()).toBeInstanceOf(Area);
    expect(chart.line()).toBeInstanceOf(Line);
    expect(chart.cell()).toBeInstanceOf(Cell);
    expect(chart.vector()).toBeInstanceOf(Vector);
    expect(chart.link()).toBeInstanceOf(Link);
    expect(chart.polygon()).toBeInstanceOf(Polygon);
    expect(chart.image()).toBeInstanceOf(Image);
    expect(chart.text()).toBeInstanceOf(Text);
    expect(chart.box()).toBeInstanceOf(Box);
    expect(chart.lineX()).toBeInstanceOf(LineX);
    expect(chart.lineY()).toBeInstanceOf(LineY);
    expect(chart.range()).toBeInstanceOf(Range);
    expect(chart.rangeX()).toBeInstanceOf(RangeX);
    expect(chart.rangeY()).toBeInstanceOf(RangeY);
    expect(chart.connector()).toBeInstanceOf(Connector);
    expect(chart.sankey()).toBeInstanceOf(Sankey);
    expect(chart.treemap()).toBeInstanceOf(Treemap);
    expect(chart.boxplot()).toBeInstanceOf(Boxplot);
    expect(chart.shape()).toBeInstanceOf(Shape);
    expect(chart.pack()).toBeInstanceOf(Pack);
    expect(chart.forceGraph()).toBeInstanceOf(ForceGraph);
    expect(chart.tree()).toBeInstanceOf(Tree);
    expect(chart.wordCloud()).toBeInstanceOf(WordCloud);
    expect(chart.gauge()).toBeInstanceOf(Gauge);
    expect(chart.density()).toBeInstanceOf(Density);
    expect(chart.heatmap()).toBeInstanceOf(Heatmap);
    expect(chart.options().children).toEqual([
      { type: 'interval' },
      { type: 'rect' },
      { type: 'point' },
      { type: 'area' },
      { type: 'line' },
      { type: 'cell' },
      { type: 'vector' },
      { type: 'link' },
      { type: 'polygon' },
      { type: 'image' },
      { type: 'text' },
      { type: 'box' },
      { type: 'lineX' },
      { type: 'lineY' },
      { type: 'range' },
      { type: 'rangeX' },
      { type: 'rangeY' },
      { type: 'connector' },
      { type: 'sankey' },
      { type: 'treemap' },
      { type: 'boxplot' },
      { type: 'shape' },
      { type: 'pack' },
      { type: 'forceGraph' },
      { type: 'tree' },
      { type: 'wordCloud' },
      { type: 'gauge' },
      { type: 'density' },
      { type: 'heatmap' },
    ]);
  });

  it('chart.container() should use last node as root node.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.view();
    chart.spaceLayer();
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
  });

  it('chart.container() should set layout options for root node.', () => {
    const chart = new Chart({
      theme: 'classic',
      width: 100,
      height: 120,
      padding: 0,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
      marginBottom: 10,
      marginRight: 20,
      marginLeft: 30,
      marginTop: 40,
      margin: 0,
      insetBottom: 10,
      insetRight: 20,
      insetLeft: 30,
      insetTop: 40,
      inset: 0,
      autoFit: true,
    });
    chart.spaceLayer();
    expect(chart.options()).toEqual({
      type: 'spaceLayer',
      theme: 'classic',
      width: 100,
      height: 120,
      padding: 0,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 30,
      paddingTop: 40,
      marginBottom: 10,
      marginRight: 20,
      marginLeft: 30,
      marginTop: 40,
      margin: 0,
      insetBottom: 10,
      insetRight: 20,
      insetLeft: 30,
      insetTop: 40,
      inset: 0,
      autoFit: true,
    });
  });

  it('chart.container() should return expected container.', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.view()).toBeInstanceOf(View);
    expect(chart.options()).toEqual({ type: 'view', theme: 'classic' });
    expect(chart.spaceLayer()).toBeInstanceOf(SpaceLayer);
    expect(chart.options()).toEqual({ type: 'spaceLayer', theme: 'classic' });
    expect(chart.spaceFlex()).toBeInstanceOf(SpaceFlex);
    expect(chart.options()).toEqual({ type: 'spaceFlex', theme: 'classic' });
    expect(chart.facetRect()).toBeInstanceOf(FacetRect);
    expect(chart.options()).toEqual({ type: 'facetRect', theme: 'classic' });
    expect(chart.repeatMatrix()).toBeInstanceOf(RepeatMatrix);
    expect(chart.options()).toEqual({ type: 'repeatMatrix', theme: 'classic' });
    expect(chart.facetCircle()).toBeInstanceOf(FacetCircle);
    expect(chart.options()).toEqual({ type: 'facetCircle', theme: 'classic' });
    expect(chart.timingKeyframe()).toBeInstanceOf(TimingKeyframe);
    expect(chart.options()).toEqual({
      type: 'timingKeyframe',
      theme: 'classic',
    });
  });

  it('chart.options() should return view tree.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.options(options) should handle date object.', () => {
    const chart = new Chart({ theme: 'classic' });
    const date = new Date();
    chart.cell().data([{ date }]);
    expect(chart.options()).toEqual({
      type: 'view',
      theme: 'classic',
      children: [{ type: 'cell', data: [{ date }] }],
    });
  });

  it('chart.options(options) should return this chart instance.', () => {
    const chart = new Chart({ theme: 'classic' });
    expect(chart.options({ width: 800 })).toBe(chart);
  });

  it('chart.title() should set title options.', () => {
    const chart = new Chart({ theme: 'classic' });

    chart.title('This is a title.');
    expect(chart.options().title).toEqual('This is a title.');

    chart.title({
      title: 'This is a main title,',
      subtitle: 'This is a subtitle.',
    });
    expect(chart.options().title).toEqual({
      title: 'This is a main title,',
      subtitle: 'This is a subtitle.',
    });
  });

  it('chart.nodeName() should build view tree.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.interval();
    chart.point();
    expect(chart.options()).toEqual({
      type: 'view',
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.call(chart => chart.nodeName()) should build view tree.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart.call((chart) => chart.interval()).call((chart) => chart.point());
    expect(chart.options()).toEqual({
      type: 'view',
      theme: 'classic',
      children: [{ type: 'interval' }, { type: 'point' }],
    });
  });

  it('chart.nodeName() should build nested view tree.', () => {
    const chart = new Chart({ theme: 'classic' });
    chart
      .spaceFlex()
      .call((node) => node.interval())
      .call((node) =>
        node
          .spaceFlex()
          .call((node) => node.line())
          .call((node) => node.point()),
      );
    expect(chart.options()).toEqual({
      type: 'spaceFlex',
      theme: 'classic',
      children: [
        { type: 'interval' },
        { type: 'spaceFlex', children: [{ type: 'line' }, { type: 'point' }] },
      ],
    });
  });

  it('chart.getContext() should return rendering context.', () => {
    const chart = new Chart({ theme: 'classic' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    const context = chart.getContext();
    expect(context.canvas).toBeUndefined();
    expect(context.library).toEqual(createLibrary());
    chart.render();
    expect(context.canvas).toBeInstanceOf(Canvas);
  });

  it('chart.render() should return promise.', (done) => {
    const chart = new Chart({ theme: 'classic' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.render().then((c) => {
      expect(c).toBe(chart);
      done();
    });
  });

  it('chart renderer SVG and Canvas', () => {
    // Default is CanvasRenderer.
    let chart = new Chart({ theme: 'classic' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);

    chart.interval().encode('x', 'genre').encode('y', 'sold');

    chart.render();
    expect(chart.getContainer().querySelector('canvas')).not.toBeNull();

    // Use SVGRenderer.
    chart = new Chart({ theme: 'classic', renderer: new SVGRenderer() });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);

    chart.interval().encode('x', 'genre').encode('y', 'sold');

    chart.render();
    expect(chart.getContainer().querySelector('svg')).not.toBeNull();
  });

  it('chart.on(event, callback) should register chart event.', (done) => {
    const chart = new Chart({ theme: 'classic' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    let beforerender = false;
    let beforepaint = false;
    let afterpaint = false;
    chart
      .on('beforerender', () => (beforerender = true))
      .on('beforepaint', () => (beforepaint = true))
      .on('afterpaint', () => (afterpaint = true))
      .on('afterrender', () => {
        expect(beforerender).toBe(true);
        expect(beforepaint).toBe(true);
        expect(afterpaint).toBe(true);
        done();
      });

    chart.render();
  });

  it('chart.once(event, callback) should call callback once.', () => {
    const chart = new Chart({ theme: 'classic' });
    let count = 0;
    chart.once('foo', () => count++);
    chart.emit('foo');
    chart.emit('foo');
    expect(count).toBe(1);
  });

  it('chart.emit(event, ...params) should emit event.', () => {
    const chart = new Chart({ theme: 'classic' });
    let sum = 0;
    chart.on('foo', (a, b) => (sum = a + b));
    chart.emit('foo', 1, 2);
    expect(sum).toBe(3);
  });

  it('chart.off(event) should remove event.', () => {
    const chart = new Chart({ theme: 'classic' });
    let count = 0;
    chart.on('foo', () => count++);
    chart.off('foo');
    chart.emit('foo');
    expect(count).toBe(0);
  });

  it('chart.render() should be called after window resize.', (done) => {
    const div = document.createElement('div');
    const chart = new Chart({
      theme: 'classic',
      container: div,
      autoFit: true,
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    // Track chart render;
    const fn = jest.fn();
    const render = chart.render.bind(chart);
    chart.render = () => {
      fn();
      return render();
    };

    chart.render().then(() => {
      // Mock resize window.
      div.style.width = '100px';
      div.style.height = '100px';
      window.dispatchEvent(new Event('resize'));
    });

    // Listen.
    chart.on('afterchangesize', () => {
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('chart.getInstance() should return internal instance after chart render.', async () => {
    const chart = new Chart({ theme: 'classic' });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();

    const context = chart.getContext();
    const view = context.views?.find((v) => v.key === chart['_key']);

    expect(chart.getView()).toEqual(view);
    expect(chart.getCoordinate()).toEqual(view?.coordinate);
    expect(chart.getTheme()).toEqual(view?.theme);
    expect(chart.getGroup().id).toEqual(chart['_key']);
    expect(chart.getScale()).toEqual(view?.scale);
    expect(chart.getScaleByChannel('color')).toEqual(view?.scale.color);
    expect(chart.getScaleByChannel('shape')).not.toBeDefined();
  });

  it('chart.render() should throw error.', async () => {
    // Catch error.
    // @ts-ignore
    const chart = new Chart({});
    await expect(chart.render()).rejects.toThrowError();
  });

  it('chart.destroy() should destroy group', async () => {
    const chart = new Chart({ theme: 'classic' });
    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
    chart
      .interval()
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();
    expect(chart.getGroup().id).toEqual(chart['_key']);
    chart.destroy();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.clear() should clear group.', async () => {
    const chart = new Chart({ theme: 'classic' });
    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
    chart
      .interval()
      .attr('key', 'interval')
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    await chart.render();
    expect(chart.getGroup().id).toEqual(chart['_key']);
    chart.clear();
    expect(chart.getGroup()).toEqual(null);
  });

  it('chart.changeData() should update all children data although mark children have their own data', async () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = new Chart({ theme: 'classic' });
    const interval = chart
      .interval()
      .data(data)
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre')
      .interaction('tooltip');

    const line = chart
      .line()
      .data([data[0]])
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre')
      .interaction('tooltip');

    await chart.render();
    expect(interval.data()).toEqual(data);
    expect(line.data()).toEqual([data[0]]);

    await chart.changeData([data[1]]);
    expect(chart.data()).toEqual([data[1]]);
    expect(interval.data()).toEqual([data[1]]);
    expect(line.data()).toEqual([data[1]]);
  });

  it('new Chart({ autoFit: true }) should not set width and height of chart options.', async () => {
    const chart = new Chart({ theme: 'classic', autoFit: true });
    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold');
    await chart.render();
    expect(chart.width()).toBeUndefined();
    expect(chart.height()).toBeUndefined();
  });

  it('chart.options({ autoFit: true }) should bind autoFit.', async () => {
    const div = document.createElement('div');
    const chart = new Chart({
      container: div,
    });
    chart.options({
      autoFit: true,
      theme: 'classic',
      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
      },
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
    });

    expect(chart['_hasBindAutoFit']).toBe(false);

    await chart.render();
    expect(chart['_hasBindAutoFit']).toBe(true);

    chart.options({
      autoFit: false,
    });
    await chart.render();
    expect(chart['_hasBindAutoFit']).toBe(false);
  });

  it('chart.forceFit() should be not rerender if size of container do not change.', async () => {
    const div = document.createElement('div');
    div.style.width = '500px';
    div.style.height = '400px';

    const chart = new Chart({
      theme: 'classic',
      container: div,
      autoFit: true,
    });

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    // Track chart render;
    const fn = jest.fn();
    const render = chart.render.bind(chart);
    chart.render = () => {
      fn();
      return render();
    };
    await chart.render();

    await chart.forceFit();
    expect(fn).toBeCalledTimes(1);
  });

  it('chart.render() should toggle value of _rendering.', async () => {
    const chart = new Chart({});

    chart.options(TEST_OPTIONS);

    const finished = chart.render();
    expect(chart['_rendering']).toBeTruthy();

    await finished;
    expect(chart['_rendering']).toBeFalsy();
  });

  it('chart.render() should catch error for trailing render task.', async () => {
    const chart = new Chart({});
    chart.options(TEST_OPTIONS);
    chart.render();

    chart.options({ ...TEST_OPTIONS, theme: 'foo' });
    await expect(chart.render()).rejects.toThrowError();
    expect(chart['_rendering']).toBeFalsy();
  });

  it('chart.render() should render after previous rendering.', async () => {
    const chart = new Chart({});

    chart.options(TEST_OPTIONS);

    let count = 0;
    chart.on(ChartEvent.BEFORE_RENDER, () => {
      count++;
    });
    const p1 = chart.render();
    const p2 = chart.render();

    await p1;
    expect(count).toBe(1);
    await p2;
    expect(count).toBe(2);
  });

  it('chart.render() should render first and last rendering task in a row.', async () => {
    const chart = new Chart({});

    chart.options(TEST_OPTIONS);

    let count = 0;
    chart.on(ChartEvent.AFTER_RENDER, () => {
      count++;
    });

    const p1 = chart.render();
    const p2 = chart.render();
    const p3 = chart.render();
    const p4 = chart.render();

    const v1 = await p1;
    const v2 = await p2;
    const v3 = await p3;
    const v4 = await p4;

    expect(count).toBe(2);
    expect(v1).toBe(chart);
    expect(v2).toBe(chart);
    expect(v3).toBe(chart);
    expect(v4).toBe(chart);
  });
});
