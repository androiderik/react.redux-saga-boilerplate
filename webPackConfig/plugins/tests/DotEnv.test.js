const DotEnv = require('../DotEnv');
const blackListRemover = require('../../../src/utils/blackListRemover');

describe('Class methods', () => {
  it('Must be an instance of an object', () => {
    expect(new DotEnv()).toBeInstanceOf(Object)
  })
});

describe('BlackList methods', () => {
  const blackList = ['envTest', 'envConfig']
  const env = {
    env: 'env',
    envConfig: 'envConfig',
  }

  it('Must have been called blackListRemover', () => {
    const mock = jest.fn(blackListRemover(env, blackList));
    mock();

    expect(mock).toHaveReturned();
  })

  it('Must remove blacklisted items', () => {
    const envToArray = Object.values(env)
    expect(envToArray).toHaveLength(1)
  })
});
