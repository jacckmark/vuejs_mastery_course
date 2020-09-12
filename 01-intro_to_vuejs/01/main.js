var app = new Vue({
    el: '#app',
    data: {
        product: "socks",
        brand: 'Vue Mastery',
        description: 'some test description of product',
        image: "./assets/vmSocks-green-onWhite.jpg",
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            { variantId: 2234, variantColor: "green", variantImage: "./assets/vmSocks-green-onWhite.jpg" },
            { variantId: 2235, variantColor: "blue", variantImage: "./assets/vmSocks-blue-onWhite.jpg" }
        ],
        cart: 0,
        // we can also define whole style objects and use them with style bindings
        cartStyleObj: {
            fontSize: '23px',
            color: 'magenta'
        },
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        },
        removeFromCart() {
            this.cart -= 1;
        }
    },
    // we should use computed properties instead of methods if the operation is 
    // expensive and we don't want to rerun it every time we try to access it 
    // (results are cached until 
    // the dependencies change)
    computed: {
        // this computed property will render the title according to changes in 
        // the dependencies (so if the brand for example changes the title will
        // also change)
        title() {
            return `${this.brand} ${this.product}`;
        }
    },
})