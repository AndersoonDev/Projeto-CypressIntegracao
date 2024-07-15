const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn',
    },

    MENU: {
        SETTINGS: '[data-test="menu-settings"] > .fas',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        },

    CONTAS: {
        NOME: '[data-test="nome"]',
        SALVAR: '.btn',
    },

        MESSAGE: '.toast-message',
}

export default locators