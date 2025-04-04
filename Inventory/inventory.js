var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function getProductById(inventory, productId) {
    for (var _i = 0, inventory_1 = inventory; _i < inventory_1.length; _i++) {
        var product = inventory_1[_i];
        if (product.id === productId) {
            return product;
        }
    }
    return undefined;
}
function addProduct(inventory, product) {
    var productData = getProductById(inventory, product.id);
    if (productData) {
        console.error("Product with id ".concat(product.id, " already exists "));
        return inventory;
    }
    return __spreadArray(__spreadArray([], inventory, true), [product], false);
}
function updateStock(inventory, productId, quantityChange) {
    var productData = getProductById(inventory, productId);
    if (productData) {
        return inventory.map(function (data) { return data.id === productId ? __assign(__assign({}, data), { quantityInStock: Math.max(0, data.quantityInStock + quantityChange) }) : data; });
    }
    console.error("Invalid ".concat(productId, " Product doesn't exists"));
    return inventory;
}
function getTotalInventoryValue(inventory) {
    return inventory.reduce(function (total, product) { return total + product.quantityInStock * product.price; }, 0);
}
var inventory = [];
//adding product
inventory = addProduct(inventory, { id: 1, name: "Laptop", price: 1000, quantityInStock: 5 });
inventory = addProduct(inventory, { id: 2, name: "Mouse", price: 500, quantityInStock: 4 });
inventory = addProduct(inventory, { id: 3, name: "CPU", price: 800, quantityInStock: 10 });
// Check for same id while adding product  will give error
inventory = addProduct(inventory, { id: 3, name: "CPU", price: 800, quantityInStock: 10 });
// Updating stock
inventory = updateStock(inventory, 1, -3);
inventory = updateStock(inventory, 2, 2);
// Check by getProductById
console.log("Product 2 Details :", getProductById(inventory, 2));
// getTotalInventoryValue
console.log("The total value of all products currently in stock : Rs ", getTotalInventoryValue(inventory));
//INVENTORY DISPLAY
console.log("Whole Inventory :", inventory);
