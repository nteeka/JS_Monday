var SchemaUser = require('../schema/product')

module.exports ={
    getall:function(query){
        var sort={};
        var Search={};
        if(query.sort){
            if(query.sort[0]=='-'){
                sort[query.sort.substring(1)]='desc';
            }else{
                sort[query.sort]='asc';
            }
        }
        if(query.key){
            Search.name= new RegExp(query.key,'i');
        }
        var limit = parseInt(query.limit)||2;
        var page = parseInt(query.page)||1;
        var skip = (page-1)*limit;
        return SchemaProduct.find(Search).select('name descritption price').sort(sort).limit(limit).skip(skip).exec();
    },
    getOne:function(id){
        return SchemaProduct.findById(id);
    },
    getByName:function (name){
        return SchemaProduct.findOne({}).exec();
    },
    createProduct:function(product){
        return new SchemaProduct(product).save();
    }
}