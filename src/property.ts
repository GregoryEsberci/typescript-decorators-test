const isValidEmail = (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

const size = ({ min = -Infinity, max = Infinity }) => (
  target: Record<keyof any, any>,
  propertyKey: string,
) => {
  let value = target[propertyKey];

  const setter = (newVal: any) => {
    if (newVal.length < min) {
      console.error(`${propertyKey} deve ter mais de ${min} caracteres`);
    } else if (newVal.length > max) {
      console.error(`${propertyKey} deve ter menos de ${max} caracteres`);
    } else {
      value = newVal;
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: setter,
  });
};

const email = (target: Record<keyof any, any>, propertyKey: string) => {
  let value = target[propertyKey];

  const setter = (newVal: string) => {
    if (isValidEmail(newVal)) value = newVal;
    else console.error('Email invalido');
  };

  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: setter,
  });
};

class PropertyMethod {
  @size({ min: 2, max: 5 })
  sizeControlled = ':)';

  @email email = 'email@gmail.com'

  setSizeControlled(value: string) {
    console.log('\nset sizeControlled:', value);

    this.sizeControlled = value;
    console.log('saved:', this.sizeControlled === value);
  }

  setEmail(value: string) {
    console.log('\nset email:', value);

    this.email = value;
    console.log('saved:', this.email === value);
  }
}

const propertyMethod = new PropertyMethod();

propertyMethod.setSizeControlled('.');
propertyMethod.setSizeControlled('ヽ(｀Д´)ﾉ');
propertyMethod.setSizeControlled(':D');

console.log('\n\n');

propertyMethod.setEmail('i`m email?');
propertyMethod.setEmail('email@exemple.com');
