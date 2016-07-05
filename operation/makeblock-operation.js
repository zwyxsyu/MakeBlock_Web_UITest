/**
 * Created by dell on 2016/6/20.
 */
var webURL = require('./../config/webURL');
var driver = require('./../wd-manage/driver').driver;
module.exports = {
    login:function(email, password){
        return driver.get(webURL.loginURL)
            .sleep(2000)
            .elementById('email').sendKeys(email)
            .elementById('password').sendKeys(password)
            .sleep(1000)
            .elementByXPath('//button[text()=\'Log In\']')
            .click()
            .sleep(5000)
             .title()
             .then(function(title){
                 title.should.equal('Orders History');
             });
    },
    logout:function(){
        return driver.get(webUrl.initURL)
            .sleep(3000)
            .elementByCssSelector('#topNavbar > div > div.col-md-4.top-bar-right.clearfix > div.login-cart-language-container.pull-right.clearfix > div.login-container.pull-left > a')
            .moveTo(5,5)
            .sleep(2000)
            .elementByCssSelector('#topNavbar > div > div.col-md-4.top-bar-right.clearfix > div.login-cart-language-container.pull-right.clearfix > div.login-container.pull-left > div > a.btn.btn-default.logout.bg-color-d1d1d1')
            .click()
            .sleep(3000);
    }
}