/**
 * Created by dell on 2016/6/23.
 */
'use strict';

var  driver = require('./../wd-manage/driver').driver,
 webURL = require('./../config/webURL'),
purchasePage = require('./../page/shop-purchase-page'),
makeblockOpr = require('./../operation/makeblock-operation'),
shopOpr = require('./../operation/shop-operation'),
opencartOpr = require('./../operation/opencart-operation'),
users = require('./../data/user-data'),
dbOpr = require('./../DB/makeblockDB');


describe('@module：product purchase test',function(){
    var user = users.user1;
    this.timeout(5 * 60 * 1000);
    //var path = '/index.php?route=product/category&path=0&status=new';
    before(function(){
        return driver
            .initDriver()
            .maximize();
    });

    beforeEach(function(){
        return makeblockOpr.login(user['email'], user['password']);
    });

    describe('#function：add product', function(){
        var proPath = '/mbot-v1-1-stem-educational-robot-kit';
        var proName = 'mBot V1.1-Blue (Bluetooth Version)';
        //var proPath = '/mbot-ranger';
        //it("#init opr: login into makeblock",function(){
        //    return makeblockOpr.login(user['email'], user['password']);
        //});

        it('#check default info:quantity is 1 and version select the first', function(done){

            return  driver.get(webURL.initURL + proPath)
                .sleep(2000)
                .elementByCssSelector('input.js_quantity_wanted.quantity_wanted')   //产品数量框
                .getAttribute('value')
                .then(function(value){
                    value.should.be.equal('1');
                })
                .takeScreenshot()
                .elementByXPathIfExists('//span[text()=\'Version:\']/following-sibling::div/span[1]') //第一个版本被选中
                .then(function(result){
                    if(result==undefined){
                        done();
                    }
                })
                .getAttribute('class')
                .then(function(cls){
                    cls.should.be.containEql('active');
                });

        });

        it('#when stock is empty, the add button is disable and show "OUT OF STOCK"', function(){
            dbOpr.changeProQuantity(proName,0);
            return driver
                .get(webURL.initURL + proPath)
                .sleep(2000)
                .elementByCssSelector('#button-cart > span')
                .text()
                .then(function(text){
                    text.trim().should.be.equal('OUT OF STOCK');
                })
                .elementById('button-cart')
                .getAttribute('href')
                .then(function(data){
                    data.should.be.equal('javascript:void(0);');
                });
        });

        it('#the maximum number of quantity, reach,plus,minus', function () {
            var count = '2000';
            dbOpr.changeProQuantity(proName,2000);
            return driver
                .get(webURL.initURL + proPath)
                .sleep(2000)
                .elementByClassName('js_quantity_wanted')  //数量输入框
                .clear()
                .sendKeys(count)
                .sleep(1000)
                .elementByClassName('fa-plus')  //+按钮
                .click()
                .sleep(1000)
                .elementByClassName('js_quantity_wanted')
                .getAttribute('value')
                .then(function(text){
                    text.should.be.equal(count);
                })
                .elementByClassName('fa-minus')  //-按钮
                .click()
                .sleep(1000)
                .elementByClassName('js_quantity_wanted')
                .getAttribute('value')
                .then(function(text){
                    text.should.be.equal('1999');
                });
        });

        it('#input special character into quantity', function(){
            return driver
                .get(webURL.initURL + proPath)
                .sleep(2000)
                .elementByClassName('js_quantity_wanted')  //数量输入框
                .clear()
                .sendKeys('a~!@#$%^&*()_+')
                .sleep(1000)
                .getAttribute('value')
                .then(function(text){
                    text.should.be.equal('1');
                });
        });

        it.only('#add different value of quantity to cart, check cart list ', function(){
             var num = 3;
            return shopOpr.addToCart(proPath)
                .then(shopOpr.goToShopCart)
                .elementByClassName('quantity_wanted')
                .getAttribute('value')
                .then(function(value){
                    value.should.be.equal('1');
                });
        });


    });

    after(function(done){
        return driver.quit(done)
    });
});



/**
 * Created by dell on 2016/6/21.
 */
