/**
 * Created by dell on 2016/6/27.
 */
var webURL = require('./../config/webURL');
var driver = require('./../wd-manage/driver').driver;

const productsURL = webURL+'/index.php?route=catalog/product&token=ac65b76972993306258a644a0c2429f1';
/**
 * 登录后台opencart系统
 * @param name
 * @param pwd
 */
var loginBackend = function(name, pwd){
    return driver.get(webURL.opencartURL)
        .sleep(2000)
        .elementById('input-username')
        .sendKeys(name)
        .elementById('input-password')
        .sendKeys(pwd)
        .elementByClassName('btn-primary')
        .click()
        .sleep(2000)
        .title()
        .then(function(title){
            title.should.be.equal('Dashboard');
        })
};

/**
 * 修改产品数量
 * @param proName
 * @param num
 * @returns {*}
 */
var changeProductQuantity = function(proName, num){
    return driver.elementById('catalog')
        .moveTo(10,5)
        .elementByXPath('//*[@id="catalog"]/ul/li[2]/a')
        .getAttribute('href')
        .then(function(data){
            return driver.get(data);
        })
        .elementById('input-name')
        .clear()
        .sendKeys(proName)
        .elementById('button-filter')
        .click()
        .sleep(2000)
        .elementByXPath('//*[@id="form-product"]/div/table/tbody/tr/td[8]/a/i')   //编辑按钮
        .click()
        .sleep(2000)
        .elementById('input-quantity')
        .clear()
        .sendKeys(num)
        .elementByCssSelector('#content > div.page-header > div > div > button > i') //保存按钮
        .sleep(2000);
}





module.exports = {
    loginBackend : loginBackend,
    changeProductQuantity : changeProductQuantity
}