interface Product {
    id: number;
    name: string;
    price: number
    image: string;
    quantity: number;
}

const mockProducts: Product[] = [
    { id: 1, name: 'Product A', price: 10, image: "/productImage/computer_1.webp", quantity: 1},
    { id: 2, name: 'Product B', price: 20, image: "/productImage/computer_2.png", quantity: 1},
    { id: 3, name: 'Product C', price: 30, image: "/productImage/computer_3.jpg", quantity: 1},
    { id: 4, name: 'Product D', price: 40, image: "/productImage/computer_4.png", quantity: 1},
    { id: 5, name: 'Product E', price: 50, image: "/productImage/computer_1.webp", quantity: 1},
    { id: 6, name: 'Product F', price: 60, image: "/productImage/computer_2.png", quantity: 1},
    { id: 7, name: 'Product G', price: 70, image: "/productImage/computer_3.jpg", quantity: 1},
    { id: 8, name: 'Product H', price: 80, image: "/productImage/computer_4.png", quantity: 1},
    { id: 9, name: 'Product I', price: 90, image: "/carouselImage/carouselImage_2.webp", quantity: 1},
];

export default mockProducts;