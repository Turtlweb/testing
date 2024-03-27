const { remote } = require('webdriverio');

const capabilities = {
 platformName: 'iOS',
 'appium:app': 'storage:filename=app (19).ipa', // The filename of the mobile app
 'appium:deviceName': 'Android GoogleAPI Emulator',
 'appium:platformVersion': '12.0',
 'appium:automationName': 'XCUITest',
 'sauce:options': {
    build: 'appium-build-I2FEA',
    name: '<your test name>',
    deviceOrientation: 'PORTRAIT',
  },
};


async function runTest() {
  const driver = await wd.remote({
    user: 'oauth-tenistipster505-373ca',
    key: '51e71f00-9111-4ad8-995b-5c7eef82b84a',
    hostname: 'ondemand.eu-central-1.saucelabs.com',
    port: 443,
    baseUrl: 'wd/hub',
    capabilities,
  });

  async function clickElementByText(text) {
    await driver.waitUntil(async () => {
      const element = await driver.$(`~${text}`);
      return await element.isDisplayed();
    }, {
      timeout: 10000, // Tempo máximo de espera em milissegundos
      timeoutMsg: `O elemento com o texto "${text}" não apareceu após 10 segundos`
    });

    const element = await driver.$(`~${text}`);
    await element.click();
    console.log(`Elemento com o texto "${text}" clicado com sucesso.`);
  }

  const texts = ["SALTAR", "9", "1", "3", "9", "2", "3", "9", "7", "5"];

  for (const text of texts) {
    await clickElementByText(text);
  }

  // Espera pelo texto "Insira o seu Código de Acesso"
  await driver.waitUntil(async () => {
    const element = await driver.$('~Insira o seu Código de Acesso');
    return await element.isDisplayed();
  }, {
    timeout: 10000, // Tempo máximo de espera em milissegundos
    timeoutMsg: 'O texto "Insira o seu Código de Acesso" não apareceu após 10 segundos'
  });

  // Clica no texto "1" seis vezes
  for (let i = 0; i < 6; i++) {
    await clickElementByText("1");
  }

  // Feche a sessão do driver
  await driver.deleteSession();
}

runTest().catch(console.error);
