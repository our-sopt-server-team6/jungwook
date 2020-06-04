const pool = require('../modules/pool');
const table = 'menu';
const menu = {
    READ_MENU : async (menu, order) =>{

        // class 분류(burger, set, mac_m, happy, side, dessert, mac_c)
        if(menu == 1)
            var s_class = "burger";
        else if(menu == 2)
            var s_class = "set";
        else if(menu == 3)
            var s_class = "mac_m";
        else if(menu == 4)
            var s_class = "happy";
        else if(menu == 5)
            var s_class = "side";
        else if(menu == 6)
            var s_class = "dessert";
        else if(menu == 7)
            var s_class = "mac_c";
        
        // order 분류(인기순-0, 최신순-1)
        if(order == 0)
            var s_order = "popular";
        else if(order == 1)
        {
            var s_order = "bornDate";
            ADESC = "DESC";
        }
        // 전체인지 아닌지 분류
        if(menu == 0)
        {
            var query = `SELECT * FROM ${table} ORDER BY ${s_order} DESC`;
        }
        else
        {
            var query = `SELECT * FROM ${table} WHERE class="${s_class}" ORDER BY ${s_order} DESC`;
        }
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    },
    READ_COUPON: async (menu)=>{
        // class 분류(burger, set, mac_m, happy, side, dessert, mac_c)
        if(menu == 1)
            var s_class = "burger";
        else if(menu == 2)
            var s_class = "set";
        else if(menu == 3)
            var s_class = "mac_m";
        else if(menu == 4)
            var s_class = "happy";
        else if(menu == 5)
            var s_class = "side";
        else if(menu == 6)
            var s_class = "dessert";
        else if(menu == 7)
            var s_class = "mac_c";

        const query = `SELECT class,name,price,img,discount_pst,expiration_date FROM ${table},coupon 
        WHERE menu.menuIdx = coupon.menuIdx and class="${s_class}" ORDER BY bornDate DESC`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    },
    READ_BANNER1 : async ()=>{
        const query = `SELECT name,price,discount_pst FROM menu,coupon
         WHERE menu.menuIdx = coupon.menuIdx ORDER BY menu.popular DESC LIMIT 3`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    }
}

module.exports = menu;