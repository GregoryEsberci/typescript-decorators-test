type decoratorFunc = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor | void

const f = (): decoratorFunc => {
  console.log('f(): evaluated');
  return () => {
    console.log('f(): called');
  };
};

const g = (): decoratorFunc => {
  console.log('g(): evaluated');
  return () => {
    console.log('g(): called');
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class C {
  @f()
  @g()
  method() {}
}
