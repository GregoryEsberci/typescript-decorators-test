const loaderService = {
  show: () => console.log('loader show'),
  hidden: () => console.log('loader hidden'),
};

const messageService = {
  success: (message: string) => console.log('Success message:', message),
  error: (message: string) => console.log('Error message:', message),
};

const sleep = (t: number, result: 'resolve' | 'reject' = 'resolve') => (
  new Promise((resolve, reject) => setTimeout(result === 'resolve' ? resolve : reject, t))
);

function loader() {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...arg: any) => Promise<any>>,
  ) => {
    const originalMethod = descriptor.value;

    if (!originalMethod) return;

    descriptor.value = async function (...args) {
      loaderService.show();

      try {
        await originalMethod.apply(this, args);
      } finally {
        loaderService.hidden();
      }
    };
  };
}

function messages(message: { success?: string, error?: string }) {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...arg: any) => Promise<any>>,
  ) => {
    const originalMethod = descriptor.value;

    if (!originalMethod) return;

    descriptor.value = async function (...args) {
      try {
        await originalMethod.apply(this, args);
        if (message.success) messageService.success(message.success);
      } catch (e) {
        if (message.error) messageService.error(message.error);
        throw e;
      }
    };
  };
}

class DecoratorTest {
  @loader()
  @messages({
    error: 'Deu ruim :c',
    success: 'Deu boa :D',
  })
  async asyncMethod(success: boolean) {
    console.log('start method');
    await sleep(1000, success ? 'resolve' : 'reject');
    console.log('\nend method');
  }
}

const run = async () => {
  const decoratorTest = new DecoratorTest();
  console.log('\n\n\n######## success \n\n\n');
  await decoratorTest.asyncMethod(true);

  try {
    console.log('\n\n\n######## error \n\n\n');
    await decoratorTest.asyncMethod(false);
  } catch (error) {
    console.log('expected error');
  }
};

run();
