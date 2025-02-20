// const Products = Array.from({ length: 120 }, (_, index) => ({
//     name: `Product ${index + 1}`,
//     price: Math.floor(Math.random() * (50000 - 100 + 1)) + 100, // Random price between 100 - 50000
//     image: `https://w7.pngwing.com/pngs/295/410/png-transparent-christmas-gift-christmas-gift-gift-miscellaneous-ribbon-orange-thumbnail.png`
//   }));
  

  const Products = (range) => {
    const priceRanges = [1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999, 11999, 12999];
  
    if (!priceRanges.includes(range)) return [];
  
    return Array.from({ length: 120 }, (_, index) => ({
      name: `Product ${index + 1}`,
      price: Math.floor(Math.random() * (range + 1000 - range + 1)) + range, // Price within range to range+1000
      image: `https://w7.pngwing.com/pngs/295/410/png-transparent-christmas-gift-christmas-gift-gift-miscellaneous-ribbon-orange-thumbnail.png`,
    }));
  };
  
  
  


  export default Products;
  