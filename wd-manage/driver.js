/**
 * Created by dell on 2016/6/20.
 */
const getDriver = function(){
    return  require('webdriver-client')({
        platformName: 'desktop',
        browserName: 'chrome'
    }).initPromiseChain();
};

module.exports = {
    driver : getDriver()
};