var app = new Vue({
    el: '#app',
    data: {
        product: "socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        description: 'some test description of product',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            { variantId: 2234, variantColor: "green", variantImage: "./assets/vmSocks-green-onWhite.jpg", variantQuantity: 10 },
            { variantId: 2235, variantColor: "blue", variantImage: "./assets/vmSocks-blue-onWhite.jpg", variantQuantity: 0 }
        ],
        cart: 0,
        onSale: true
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        // we can also use computed properties to display correct image
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        // this computed property will render every time the components change 
        // thus we can use it to change for example style when the item 
        // variantQuantity is equal 0 
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        // this will add small info if the products are on sale today
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on sale!`
            }
            return `${this.brand} ${this.product} are not on sale`
        }
    },
})