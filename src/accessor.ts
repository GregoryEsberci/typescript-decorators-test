const cache = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalGetter = descriptor.get as () => any;

  descriptor.get = function () {
    Object.defineProperty(target, propertyKey, {
      value: originalGetter.apply(this),
      configurable: true,
      enumerable: true,
      writable: false,
    });
    console.log('stored value');
  };
};

// decorator factory
const accessorSize = ({ min = -Infinity, max = Infinity }) => (
  _target: Record<keyof any, any>,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  // the decorator

  const originalSetter = descriptor.set as (v: any) => any;

  descriptor.set = (newVal: any) => {
    if (newVal.length < min) {
      console.error(`${propertyKey} deve ter mais de ${min} caracteres`);
    } else if (newVal.length > max) {
      console.error(`${propertyKey} deve ter menos de ${max} caracteres`);
    } else {
      originalSetter(newVal);
    }
  };
};

class DecoratorAccessor {
  veryHeavyProcess() {
    console.log('call veryHeavyProcess');
    let result = 0;

    // Sé esta demorando muito para executar diminua esse valor
    const loops = 10e8;
    while (result < loops) result += 1;

    return result;
  }

  @cache
  get immutableValue() {
    return this.veryHeavyProcess();
  }

  @accessorSize({ min: 2 })
  set sizeControlled(v: string) {
    console.log('called setter sizeControlled', v);
  }
}

const decoratorAccessor = new DecoratorAccessor();

/* eslint-disable no-unused-expressions */
console.count('get');
decoratorAccessor.immutableValue;
console.count('get');
decoratorAccessor.immutableValue;
console.count('get');
decoratorAccessor.immutableValue;
/* eslint-enable no-unused-expressions */

console.log('\n\n\n\n');
console.log('set:', '.');
decoratorAccessor.sizeControlled = '.';

console.log();
console.log('set:', 'agora sim');
decoratorAccessor.sizeControlled = 'agora sim';
