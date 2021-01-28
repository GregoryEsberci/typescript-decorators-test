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

function loader(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...arg: any) => Promise<any>>,
) {
  const originalMethod = descriptor.value;

  if (!originalMethod) return;

  descriptor.value = async function (...args) {
    loaderService.show();

    try {
      return await originalMethod.apply(this, args);
    } finally {
      loaderService.hidden();
    }
  };
}

const messages = (message: { success?: string, error?: string }) => (
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...arg: any) => Promise<any>>,
) => {
  const originalMethod = descriptor.value;

  if (!originalMethod) return;

  descriptor.value = async function (...args) {
    try {
      const originalReturn = await originalMethod.apply(this, args);
      if (message.success) messageService.success(message.success);
      return originalReturn;
    } catch (e) {
      if (message.error) messageService.error(message.error);
      throw e;
    }
  };
};

class DecoratorMethod {
  @loader
  @messages({
    error: 'Deu ruim :c',
    success: 'Deu boa :D',
  })
  async asyncMethod(success: boolean) {
    console.log('start method');
    await sleep(1000, success ? 'resolve' : 'reject');
    console.log('end method');
  }
}

const run = async () => {
  const decoratorMethod = new DecoratorMethod();
  console.log('\n\n\n######## success');
  await decoratorMethod.asyncMethod(true);

  try {
    console.log('\n\n\n######## error');
    await decoratorMethod.asyncMethod(false);
  } catch (error) {
    console.log('expected error');
  }
};

run();
