/**
 * Created by dell on 2016/6/27.
 */
var connection = require('./database').getConnection();


module.exports ={
    /**
     * 修改产品数量
     * @param proName
     * @param quantity
     */
    changeProQuantity:function(proName, quantity){
        var sql = 'UPDATE oc_product AS a,oc_product_description AS' +
            ' b SET  a.`quantity`= '+quantity+' WHERE a.product_id=b.product_id AND b.name=\''+proName+'\'';
        connection.query(sql, function(err, result, field){
            if (err) throw err;
            console.log('The result is: ', result);
        });
    }
}

