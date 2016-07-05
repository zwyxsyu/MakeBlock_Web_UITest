/**
 * Created by dell on 2016/6/23.
 */
/**
 * Created by dell on 2016/6/20.
 */
var webURL = require('./../config/webURL');
var driver = require('./../wd-manage/driver').driver;


/**
 * 加入购物车，考虑添加数量是否生效
 * @param path   http访问地址的path
 * @param quantity 选择的产品数量
 * @returns {*}
 */
var addToCart = function(path, quantity) {
    var quan = 0;
    return driver.get(webURL.initURL + path)
        .sleep(2000)
        .elementByClassName('cart-count')
        .text()
        .then(function(text){
            quan = Number(text);
        })
        .then(function(){
            if(quantity==undefined){
                return driver;
            }else{
                driver.elementByName('quantity')
                    .clear()
                    .sendKeys(quantity)
                    .sleep(1000)
                    .elementByClassName('cart-count')
                    .text()
                    .then(function(text){
                        Number(text).should.be.equal(Number(quantity)+Number(quan));
                    });
            }
        })
        .elementById('button-cart')
        .click()
        .sleep(3000);
        //.elementByClassName('cart-count')
        //.moveTo(3,10)
        //.sleep(1000)
        //.elementByClassName('btn-view')
        //.click()
        //.safeExecute('document.getElementsByClassName(\'btn-view\')[0].click()')
        //.sleep(3000)
        //.title()
        //.then(function(title){
        //    title.should.be.equal('Shopping Cart');
        //});
};

/**
 * 查看订单
 * @returns {*}
 */
var checkout  = function(){
    return driver
        .elementByClassName('btn-submit')//body > div.container > div > table > tfoot > tr > td > div > div.u-item.pull-right > a
        .click()
        .sleep(3000)
        .title()
        .then(function(title){
            title.should.be.equal('Checkout');
        });
    //.elementByXPath('//div[@class=\'order-steps\']/div[2]/div/span[2]')
    //.getAttribute('class')
    //.then(function(attr){
    //    attr.should.be.equal('active');
    //});
};

/**
 * 确认订单
 * @returns {*}
 */
var confirmOrder = function(){
    return driver.safeExecute('document.getElementById(\'button-confirm\').click()')
        .sleep(3000)
        .title()
        .then(function(title){
            title.should.be.containEql('payfor');
        });
};

/**
 * 支付订单
 * @param payMethod: transfor、paypal、Credit
 */
var payfor = function(payMethod){
    //var ele = driver.elementByCssSelector('div.pay-platform.clearfix > div.col-md-6 > ul > li > a');
    if(payMethod == undefined || payMethod == 'transfor'){
        return  driver.elementByCssSelector('div.pay-platform.clearfix > div.col-md-6 > ul > li > a')
            .click()
            .sleep(1000)
            .safeExecute('document.getElementById(\'button-confirm\').click()')
            .sleep(2000);
    }
    if(payMethod == 'paypal'){
        return driver.elementByCssSelector('div.pay-platform.clearfix > div.col-md-3.pl-0 > ul > li > a')
            .click();
    }
    if(payMethod == 'Credit'){
        return driver.elementByCssSelector('div.pay-platform.clearfix > div.col-md-3.pl-7> ul > li > a')
            .click();
    }
};

/**
 * 进入购物车
 * @returns {*}
 */
var goToShopCart = function(){
    return driver.safeExecute('document.getElementsByClassName(\'btn-view\')[0].click()')
        .sleep(3000)
        .title()
        .then(function(title){
            title.should.be.equal('Shopping Cart');
        });
};


/**
 * 删除单个商品（购物车）
 * @param proName
 * @returns {*}
 */
var removePro = function(proName){
    var count = 0;
    //click(driver.elem());
    return driver
        .elementsByXPath('//table[@class=\'order-cart-table\']/tbody/tr')
        .then(function(elems){
            return count = elems.length;
        })
        .elementByXPath('//a[text()="'+proName+'"]/ancestor::tr/td[@class="operation"]/a[1]')
        .click()
        .sleep(1000)
        .elementByCssSelector('div.ui-dialog-button > button:nth-child(2)')
        .click()
        .sleep(2000)
        .hasElementByClassName('order-cart-table')
        .then(function(result){
            if(result == true){
                return driver.elementsByXPath('//table[@class=\'order-cart-table\']/tbody/tr').length.should.be.equal(count-1)
            }else{ return driver;}
        });
};

/**
 * 查看购物车   待调整
 * @param products 更改购物车中的产品数量    例：[{name:'mBot V1.1-Blue (Bluetooth Version)', quantity:'10'},{name:'A',quantity:2},...]
 * @param removePros 要删除的产品 Array
 * @returns {*}
 */
var updatePurchase = function(updatePros){
    if(updatePros.length==0){
        return driver;
    }else{
        return updatePros.forEach(function(pro){
                return driver.elementByXPath('//a[text()="'+pro.name+'"]/ancestor::tr/td[3]/input')
                .clear()
                .sendKeys(pro.quantity);
        });
    }
    //return goToShopCart()
    //    .then(function(){
    //        //设置数量
    //        if(products.length==0||products==undefined){
    //            return driver;
    //        }else{
    //            return products.forEach(function(product){
    //                return driver.elementByXPath('//a[text()="'+product.name+'"]/ancestor::tr/td[3]/input')
    //                    .clear()
    //                    .sendKeys(product.quantity);
    //            });
    //        }
    //    });
};

/**
 * 添加地址
 * @param address
 * @returns {*}
 */
var addAddress = function(address){
    return driver.elementByCssSelector('body > div.container > div.panel.panel-default.order-content > div > div > div > div.col-md-3.address-add > div > p')
        .click()
        .sleep(1000)
        .then(function(){
            return driver.elementById('firstName')
                .then(function(e){
                    var firstName=(address.firstName==undefined?'zhang':address.firstName);
                    return e.sendKeys(firstName);
                })
                .elementById('lastName')
                .then(function(e){
                    var lastName=(address.lastName==undefined?'san':address.lastName);
                    return e.sendKeys(lastName);
                })
                .elementById('address_1')
                .then(function(e){
                    var address_1=(address.address_1==undefined?'san':address.address_1);
                    return e.sendKeys(address_1);
                })
                .elementById('country')
                .then(function(e){
                    return e.sendKeys()
                })
                ;
        })
};


/**
 * 使用优惠券
 * @param code 优惠券码
 * @returns {*}
 */
var couponApply = function(code){
    return driver.elementById('input-coupon')
        .clear()
        .sendKeys(code)
        .sleep(1000)
        .elementById('button-coupon')
        .click()
        .sleep(1000)
        .then(function(){
            return driver.elementByCssSelector('#order_form > div > table > tfoot > tr:nth-child(2) > td > div > div.u-alert.u-alert-danger').text();
        })
        .safeExecute('document.getElementById(\'button-confirm\').click()')
        .sleep(3000)
        .title()
        .then(function(title){
            title.should.be.containEql('payfor');
        });
};

/**
 * 删除所有商品   有问题待调整
 * @returns {*}
 */
var removeAll = function(){
    return goToShopCart()
        .hasElementByClassName('j-delete')
        .then(function(result){
            if(result){
                return driver.elementsByClassName('j-delete')
                    .then(function(elems){
                        elems.forEach(function(elem){
                            return elem.click()
                                .sleep(1000)
                                .elementByCssSelector('div.ui-dialog-button > button:nth-child(2)')
                                .click()
                                .sleep(2000);
                        });
                    });
            }else{
                return driver;
            }
        })
        .hasElementByClassName('empty-cart')
        .then(function(result){
            result.should.be.equal(true);
        });
};

/**
 *
 * @param proPath
 * @param quantity
 * @returns {*}
 */
var simplePurchase =  function(proPath, quantity){
    return  addToCart(path, quantity)
        .then(checkOut)
        .then(function () {
            return confirmOrder();
        }).then(function(){
            return payfor('transfor');
        })
};

module.exports = {
    addToCart : addToCart,
    checkout : checkout,
    confirmOrder : confirmOrder,
    payfor : payfor,
    goToShopCart :goToShopCart,
    removePro : removePro,
}