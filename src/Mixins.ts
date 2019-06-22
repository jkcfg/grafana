import { Target } from './Target';

type Constructor<T = {}> = new (...args: any[]) => T;

export function Targetable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    targets: Target[] = [];

    addTarget(target: Target) {
      target.refId = String.fromCharCode('A'.charCodeAt(0) + this.targets.length);
      this.targets.push(target);
      return this;
    }

    addTargets(targets: Target[]) {
      targets.forEach(t => this.addTarget(t));
      return this;
    }
  };
}
