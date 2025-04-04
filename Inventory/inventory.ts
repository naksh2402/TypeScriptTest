interface Product{
    id: number,
    name:string,
    price:number,
    quantityInStock:number
}

type Inventory=Product[];

function  getProductById(inventory: Inventory, productId: number): Product | undefined{
   for(let product of inventory){
    if(product.id===productId){
        return product;
    }
   }
   return undefined;
}
function addProduct(inventory: Inventory, product: Product): Inventory{
const productData=getProductById(inventory,product.id);
if(productData){
console.error(`Product with id ${product.id} already exists `);
return inventory;
}
return [...inventory,product];
}

function  updateStock(inventory: Inventory, productId: number, quantityChange: number):Inventory{
const productData=getProductById(inventory,productId);
if(productData){
   return inventory.map((data)=>data.id===productId?
   {...data,quantityInStock:Math.max(0,data.quantityInStock+quantityChange)}
    :data); 
}
    console.error(`Invalid ${productId} Product doesn't exists`);
    return inventory;
}

function getTotalInventoryValue(inventory: Inventory): number{
 return inventory.reduce((total,product)=>total+product.quantityInStock*product.price,0);
}

let inventory:Inventory=[];
//adding product
inventory=addProduct(inventory,{id:1,name:"Laptop",price:1000,quantityInStock:5});
inventory=addProduct(inventory,{id:2,name:"Mouse",price:500,quantityInStock:4});
inventory=addProduct(inventory,{id:3,name:"CPU",price:800,quantityInStock:10});

// Check for same id while adding product  will give error
inventory=addProduct(inventory,{id:3,name:"CPU",price:800,quantityInStock:10});

// Updating stock
inventory=updateStock(inventory,1,-3);
inventory=updateStock(inventory,2,2);

// Check by getProductById
console.log("Product 2 Details :",getProductById(inventory,2));

// getTotalInventoryValue
console.log("The total value of all products currently in stock : Rs ",getTotalInventoryValue(inventory));

//INVENTORY DISPLAY
console.log("Whole Inventory :",inventory);

