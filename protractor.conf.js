const crew = require('serenity-js/lib/stage_crew');

const path = require('path'),
    protractor = require.resolve('protractor'),
    node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules') + 12);

exports.config = {

    seleniumServerJar: path.resolve(node_modules, 'protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar'),

    localSeleniumStandaloneOpts: {
        jvmArgs: [`-Dwebdriver.gecko.driver=${path.resolve(node_modules, 'protractor/node_modules/webdriver-manager/selenium')}/geckodriver-v0.18.0`]
    },

    baseUrl: 'http://google.com',

    allScriptsTimeout: 110000,

    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),
    serenity: {
        dialect: 'cucumber',
        crew: [
            crew.serenityBDDReporter(),
            crew.consoleReporter(),
            crew.Photographer.who(_ => _
                .takesPhotosOf(_.Tasks_and_Interactions)
                .takesPhotosWhen(_.Activity_Finishes)
)
]
},

specs: [ 'features/**/*.feature' ],
    cucumberOpts: {
    require:    [ 'features/**/*.ts' ],
        format:     'pretty',
        compiler:   'ts:ts-node/register'
},

capabilities: {
    browserName: 'chrome',
        chromeOptions: {
        args: [
            // 'incognito',
            // 'disable-extensions',
            // 'show-fps-counter=true'
        ]
    },

    // execute tests using 2 browsers running in parallel
    shardTestFiles: true,
        maxInstances: 2
},

restartBrowserBetweenTests: true
};