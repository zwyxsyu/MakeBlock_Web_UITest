/**
 * Created by dell on 2016/6/23.
 */
const driver = require('./../wd-manage/driver').driver;
module.exports = {
     add_q_up : driver.elementByClassName('q_up'),
     add_q_down : driver.elementByClassName("q_down"),
     add_quantity_input : driver.elementByCssSelector('#product > div > div.col-lg-5.mright.j-stock-control > div:nth-child(4) > div > input.js_quantity_wanted.quantity_wanted'),
     add_to_cart: driver.elementById('button-cart'),
     add_wish_btn:driver.elementByClassName('add-wish-btn')
}