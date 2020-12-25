// TODO: Esse descriptor não funciona corretamente se existir um setter
function cache(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalGetter = descriptor.get as () => any;

  descriptor.get = function () {
    // Sobrescreve o atributo para não realizar mais o get
    Object.defineProperty(target, propertyKey, {
      value: originalGetter.apply(this),
      configurable: true,
      enumerable: true,
      writable: false,
    });
    console.log('stored value');
  };
}

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
}

const test = new DecoratorAccessor();

/* eslint-disable no-unused-expressions */
console.count('get');
test.immutableValue;
console.count('get');
test.immutableValue;
console.count('get');
test.immutableValue;
/* eslint-enable no-unused-expressions */
