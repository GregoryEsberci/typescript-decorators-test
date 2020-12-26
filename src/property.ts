const isValidEmail = (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

function Size({ min = 0, max = Infinity }) {
  return function (
    target: Object,
    propertyKey: string,
  ) {
    let value = '';

    const setter = (newVal: string) => {
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
}

function Email(target: Object, propertyKey: string) {
  let value = '';

  const setter = (newVal: string) => {
    if (isValidEmail(newVal)) value = newVal;
    else console.error('Email invalido');
  };

  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: setter,
  });
}

class PropertyMethod {
  @Size({ min: 2, max: 5 })
  private sizeControlled = ':)';

  @Email
  private email = ''

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

propertyMethod.setSizeControlled('');
propertyMethod.setSizeControlled('very big');
propertyMethod.setSizeControlled(':D');

console.log('\n\n');

propertyMethod.setEmail('i`m email?');
propertyMethod.setEmail('email@exemple.com');
