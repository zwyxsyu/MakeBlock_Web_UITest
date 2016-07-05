
'use strict';

var  driver = require('./../wd-manage/driver').driver;
var webURL = require('./../config/webURL');

describe('makeblock shop portal test',function(){

    this.timeout(5 * 60 * 1000);
    before(function(){
        return driver
            .initDriver()
            .maximize()
    });

    describe.skip('#entrance', function() {

        it('#0 should go into index', function() {
            return driver
                    .get(officialURL)
                    .sleep(2000)
                    .title()
                    .then(function(title){
                    title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
                });
        });

        it('#1 click shop link,should go into shop portal', function() {
        return driver
            .elementByLinkText('Shop')
            .sleep(5000)
            .title()
            //.hasElementByXPath("//span[text()='FOR MAKERS']")
            .then(function(title) {
                title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
            })
            .takeScreenshot();
    });

        it('#2 access shop url,should go into shop portal', function() {
        return driver
            .get(shopInitURL)
            .sleep(5000)
            .title()
            //.hasElementByXPath("//span[text()='FOR MAKERS']")
            .then(function(title) {
                title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
            })
            .takeScreenshot();
        });

    });

    describe.skip('#product', function() {

        it('#1 FOR EDUCATORS: image and icon is clickable, price is not', function () {
            var url = "/mbot-v1-1-stem-educational-robot-kit";
            driver.get(webURL.shopURL)
                .sleep(5000);
               return  driver.elementByCssSelector('div.for-educators > div:nth-child(2) > div > div:nth-child(1) > div > div.thumb > div > a')
                    .getAttribute('href')
                    .then(function (data) {
                        data.should.be.equal(url);
                    })
                    .takeScreenshot();
                   // .elementByCssSelector('body > div.g-home > div.for-educators > div:nth-child(2) > div > div:nth-child(1) > div > div.thumb > a ')
                   // .getAttribute('href')
                   // .then(function (attr) {
                   //     attr.should.be.equal(href);
                   // })
                   // .takeScreenshot()
                   //.elementByCssSelector('body > div.g-home > div.for-educators > div:nth-child(2) > div > div:nth-child(1) > div > div.extra > a')
                   //.getAttribute('href')
                   //.then(function (attr) {
                   //    attr.should.be.equal(href);
                   //})
                   //.takeScreenshot()
                   //.sleep(2000)
                   // .get(webURL.shopURL + href)
                   // .sleep(3000)
                   // .title()
                   // .then(function (title) {
                   //     title.should.be.equal('mBot V1.1-Blue (Bluetooth Version)');
                   // })
                   // .takeScreenshot()
                   // .get(webURL.initURL)
                   // .sleep(5000);

        });
    });

    describe('#secondary page', function(){
        var pages = [
            {name:'New Products', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(1)', title:'New Products'},
            {name:'Featured Products', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(2)', title:'Featured Products'},
            {name:'Robot Kits', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(3)', title:'Robot Kits | Makeblock'},
            {name:'Electronic Modules', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(4)', title:'Electronic Modules and Accessories | Makeblock'},
            {name:'Mechanical Parts', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(5)', title:'Mechanical | Makeblock'},
            {name:'Others', cssStr:'body > div.navigation-container.shop-makeblock > div > div > a:nth-child(6)', title:'Others | Makeblock'}];
        pages.forEach(function(page){
            it(page.name+' url is normal', function(){
                return driver.get(webURL.initURL)
                    .sleep(2000)
                    .elementByCssSelector(page.cssStr)
                    .click()
                    .sleep(2000)
                    .title()
                    .then(function(title){
                        title.should.equal(page.title);
                    })
                    .takeScreenshot();
            });
        });
        return driver.get(webURL);
    });

    describe.skip('browser back', function(){
        it('#0 should go into shop portal', function() {
            return driver
                .get(shopInitURL)
                .sleep(2000)
                .title()
                .then(function(title){
                    title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
                })
                .takeScreenshot()
        });

        it('#1 click makeblock logo icon,should go to makeblock portal page', function() {
            return driver
                .elementByCssSelector('#topNavbar > div > div.col-md-3.makeblock-logo-pic > a > img')
                .click()
                .sleep(2000)
                .title()
                .then(function(title){
                    title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
                })
                .takeScreenshot()
        });

        it('#2 history back of browser,should go to makeblock portal page', function() {
            return driver
                .get(shopInitURL)
                .setImplicitWaitTimeout(20000)
                .elementByLinkText('OpenLab')
                .click()
                .setImplicitWaitTimeout(20000)
                .back()
                .setImplicitWaitTimeout(20000)
                .title()
                .then(function(title){
                    title.should.equal('Open-source Arduino Robot Building Platform | Makeblock Official Shop')
                })
                .takeScreenshot()
        });

    });

    describe('#New Products',function(){
        var path = '/index.php?route=product/category&path=0&status=new';
        var products = driver.elementsB


        //it('#click product image', function(){
        //
        //});
    });
    //describe.skip('#add wish', function(){
    //    var path = '/mbot-v1-1-stem-educational-robot-kit';
    //    it('#not signed:when clicked the button "wish", page will jump into login page in current window', function(){
    //         return driver.get(webURL.initURL+path)
    //            .sleep(3000)
    //             .safeExecute('document.getElementsByClassName(\'add-wish-btn\')[0].click()')
    //             .sleep(1000)
    //             .then(function (title) {
    //                 title.should.be.equal('Makeblock-login');
    //             });
    //        //return purchasePage.add_wish_btn.click()
    //        //    .sleep(2000)
    //        //    .title()
    //    });
    //
    //    it('#signed:when clicked  button "wish",  page will not jump into login,  add wish success', function(){
    //        return driver.get(webURL.initURL+path)
    //            .sleep(3000)
    //            .safeExecute('document.getElementsByClassName(\'add-wish-btn\')[0].click()')
    //            .sleep(1000)
    //            .then(function (title) {
    //
    //            });
    //    });
    //});

    //describe('#purchase test', function(){
    //    it('#add to cart', function(){
    //        return makeblockOpr.login(user['email'], user['password'])
    //            .then(function(){
    //               return  shopOpr.addToCart('/mbot-v1-1-stem-educational-robot-kit', '1');
    //            })
    //            .then(function(){
    //                return  shopOpr.addToCart('/mbot-ranger', '1');
    //            })
    //            .then(function(){
    //                return shopOpr.goToShopCart();
    //            })
    //            .then(function(){
    //                return shopOpr.updatePurchase([
    //                    {name:'mBot Ranger-Transformable STEM Educational Robot Kit',quantity:'12'},
    //                    {name:'mBot V1.1-Blue (Bluetooth Version)',quantity:'12'}
    //                ]);
    //            });
    //    });
    //});

    //describe.skip('清除购物车', function(){
    //    it('#清空', function(){
    //        return driver.get('http://192.168.12.225:9000/index.php?route=checkout/cart')
    //            .sleep(3000)
    //            .then(function(){
    //                shopOpr.removeAll();
    //            });
    //    });
    //});

    after(function(done){
        return driver.quit(done)
    });
});



/**
 * Created by dell on 2016/6/21.
 */
