const UserMenu = require('../models/menu');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

function move(result, data){
    for(var b in result)
    {
        var discount_price = result[b].price - result[b].price * (result[b].discount_pst/100);
        result[b].price_discount = discount_price;
        data.push(result[b]);
    }
}

const coupon = {
    READ : async(req,res)=>{
        const select = req.params.select;
        //select 유효성 검증
        if(select.length == 0)
        {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.OUT_OF_VALUE));
            return ;
        }    
        var data=[];
        var discount_price;
        for(var a in select)
        {
            if(select[a] == 1) // burger
            {
                const result = await UserMenu.READ_COUPON(1);
                move(result,data);
            }
            else if(select[a] == 2) // set
            {
                const result = await UserMenu.READ_COUPON(2);
                move(result,data);
            }
            else if(select[a] == 3) // macmorning
            {
                const result = await UserMenu.READ_COUPON(3);
                move(result,data);
            }
            else if(select[a] == 4) //side & dessert
            {
                const result = await UserMenu.READ_COUPON(5);
                move(result,data);
                const result2 = await UserMenu.READ_COUPON(6);
                move(result2,data);
            }
            else if(select[a] == 5) // maccoffee
            {
                const result = await UserMenu.READ_COUPON(7);
                move(result,data);
            }
        }
        console.log(data);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.COUPON_READ_SUCCESS,data));
    }
}
module.exports = coupon;