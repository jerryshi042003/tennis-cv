import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const scriptFrom = (path, needle) => {
  const script = [...read(path).matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(match => match[1]).find(script => script.includes(needle));
  assert.ok(script, `Missing production script: ${path}`);
  return script;
};

function contactLab(reducedMotion = false) {
  const nodes = new Map();
  const element = id => {
    if (!nodes.has(id)) nodes.set(id, {
      clientWidth: 640, clientHeight: 400, style: {}, value: '0', listeners: {},
      classList: { toggle() {}, remove() {} },
      addEventListener(event, callback) { this.listeners[event] = callback; },
      setPointerCapture() {}
    });
    return nodes.get(id);
  };
  const context = vm.createContext({
    console: { warn() {} }, devicePixelRatio: 1,
    performance: { now: () => 0 }, requestAnimationFrame() {},
    ResizeObserver: class { observe() {} },
    matchMedia: () => ({ matches: reducedMotion }),
    getComputedStyle: () => ({ getPropertyValue: () => '#17150f' }),
    document: { documentElement: {}, getElementById: element, querySelectorAll: () => [] }
  });
  vm.runInContext(read('public/serve-motion-lab/three.min.js'), context);
  // Keep real scene geometry/quaternions; substitute only browser rendering.
  context.THREE.WebGLRenderer = class { setPixelRatio() {} setSize() {} render() {} };
  const script = scriptFrom('public/serve-motion-lab/contact.html', 'function pose(t)');
  assert.match(script, /\}\)\(\);\s*$/);
  const observable = script.replace(/\}\)\(\);\s*$/, 'globalThis.probe={pose,setMode,loop,ball};\n})();');
  vm.runInContext(observable, context);
  return { ...context.probe, element };
}

test('Contact Lab resets prior spin when scrubbing or changing serve mode', () => {
  const lab = contactLab();
  const initial = lab.ball.quaternion.clone();
  lab.loop(10000);
  assert.ok(initial.angleTo(lab.ball.quaternion) > 0.1, 'Fixture must reach visible spin');
  lab.element('scrub').value = '0';
  lab.element('scrub').listeners.input();
  assert.ok(initial.angleTo(lab.ball.quaternion) < 1e-7);
  lab.pose(0.8);
  const expected = lab.ball.quaternion.clone();
  lab.pose(0.1);
  lab.pose(0.8);
  assert.ok(expected.angleTo(lab.ball.quaternion) < 1e-7, 'Orientation depends only on timeline time');
  lab.element('scrub').value = '1000';
  lab.element('scrub').listeners.input();
  lab.setMode('kick');
  assert.ok(initial.angleTo(lab.ball.quaternion) < 1e-7);
  assert.equal(Number(lab.element('scrub').value), 0);
});

test('Contact Lab reduced-motion start retains its paused contact pose', () => {
  const lab = contactLab(true);
  assert.equal(lab.element('play').textContent, 'Play');
  assert.match(lab.element('phase').textContent, /HOOK/);
});

test('evidence duration rounds before splitting minutes and seconds', () => {
  const script = scriptFrom('public/visual-evidence/index.html', 'const time=');
  const source = ts.createSourceFile('inline.js', script, ts.ScriptTarget.Latest, true);
  let initializer;
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(source) === 'time') initializer = declaration.initializer.getText(source);
    }
  }
  assert.ok(initializer);
  const format = vm.runInNewContext(`(${initializer})`);
  for (const [seconds, expected] of [[0, '0s'], [12.4, '12s'], [59.6, '1:00'], [60, '1:00'], [119.6, '2:00']]) {
    assert.equal(format(seconds), expected);
  }
});

function practiceCourt(stored) {
  const listeners = {}, elements = {};
  const element = id => elements[id] ||= {
    innerHTML: '', textContent: '', value: '',
    addEventListener(event, callback) { listeners[`${id}:${event}`] = callback; }
  };
  vm.runInNewContext(scriptFrom('public/practice-court/index.html', 'const D='), {
    document: { getElementById: element },
    localStorage: {
      getItem() { if (stored instanceof Error) throw stored; return stored; },
      setItem() { throw new Error('storage denied'); }
    },
    fetch: () => Promise.resolve({ ok: false })
  });
  const follow = () => listeners['list:change']({
    target: { closest: () => ({ dataset: { h: '@fixture' }, checked: true }) }
  });
  return { elements, follow };
}

test('Practice Court works in memory when optional storage is blocked', () => {
  const court = practiceCourt(new Error('storage denied'));
  assert.match(court.elements.count.textContent, /0 followed/);
  assert.doesNotThrow(court.follow);
  assert.match(court.elements.count.textContent, /1 followed/);
});

test('Practice Court ignores malformed or non-object cached follow state', () => {
  for (const stored of ['invalid JSON', 'true', '"oops"', '["not an account"]']) {
    const court = practiceCourt(stored);
    assert.match(court.elements.count.textContent, /0 followed/);
    court.follow();
    assert.match(court.elements.count.textContent, /1 followed/);
  }
});
