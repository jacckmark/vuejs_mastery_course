// this will transport data from one component to another
var eventBus = new Vue();

// here creating vue component
Vue.component('product', {
    // here defining the props (inputs for our component)
    props: {
        premium: {
            // we can specify type and if the prop is required
            type: Boolean,
            required: true
        }
    },
    // defining the html template
    template:
        `<div class="product">
        <div class="product-image">
        <img :src="image"
             alt="">
        </div>
        <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        <p>User is premium: {{premium}}</p>
        <p>Shipping: {{shipping}}</p>
        <p>{{ sale }}</p>
        <ul>
        <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div class="color-box" v-for="(variant, index) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
            Add to cart
        </button>
        </div>

        <product-tabs :reviews="reviews"></product-tabs>
        </div>
       `,
    // crucial difference when using components is that data is not a property but the 
    // function which returns the data object (this is because we don't want to share 
    // the information with other components, they can be same at the beginning but 
    // then the changes should be made in concrete component only, thanks to this we can
    // reuse them)  
    data() {
        return {
            product: "socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            description: 'some test description of product',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                { variantId: 2234, variantColor: "green", variantImage: "./assets/vmSocks-green-onWhite.jpg", variantQuantity: 10 },
                { variantId: 2235, variantColor: "blue", variantImage: "./assets/vmSocks-blue-onWhite.jpg", variantQuantity: 0 }
            ],
            onSale: true,
            reviews: []
        }
    },
    methods: {
        // this function will emit the event if triggered and pass the currently 
        // selected variant id
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on sale!`
            }
            return `${this.brand} ${this.product} are not on sale`
        },
        shipping() {
            if (this.premium) {
                return 'free';
            }
            return 2.99;
        }
    },
    mounted() {
        // we are setting up the eventbus listener which will wait for event-submitted 
        // and then run logic (here push review into reviews array)
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    // here we are using two way data binding (this allows us to change data within)
    // for example name property from input field but also from outside of it. This is 
    // also handy when we are trying to get the data from form (like here), there 
    // is no need to wait for the submit we have the data all the time user is 
    // interacting with our form
    template: `
        <!-- here we are binding the onSubmit method to when the form gets submitted
        also we are using here the modifier prevent which will stop the site from 
        refreshing which is default behaviour -->
        <form class="review-form" @submit.prevent="onSubmit">  
        <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
        <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        </p>
        <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
        <label for="rating">Rating:</label>
        <!--.number will ensure that data from this field will be typecasted to 
        a number-->
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>
        <p><input type="submit" value="Submit"></p>    
        </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    }, methods: {
        onSubmit() {
            // if there is some issue with passed data we are adding the error to 
            // error array and displaying it in the beginning of the form 
            if (this.name && this.review && this.rating) {
                // here we are creating the productReview object based on submitted data 
                // from form
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }
                // when we have the data we can send it by emitting it
                eventBus.$emit('review-submitted', productReview);
                // here we are deleting data from the variables in order to clear the form 
                // after submission
                this.name = null;
                this.rating = null;
                this.review = null;
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
        <span class="tab" :class="{activeTab:selectedTab===tab}" v-for="(tab,index) in tabs" :key="index" @click="selectedTab=tab">{{tab}}</span>
        <div v-show="selectedTab==='Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
        <li v-for="review in reviews">
        <p>{{review.name}}</p>
        <p>{{review.rating}}</p>
        <p>{{review.review}}</p>
        </li>
        </ul>
        </div>
        <product-review v-show="selectedTab==='Make a review'"></product-review>
        </div>
        `,
    data() {
        return {
            tabs: ['Reviews', 'Make a review'],
            selectedTab: 'Reviews'
        }
    }
})

// here creating vue instance
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        // method updateCart is pushing data into the cart variable
        updateCart(id) {
            this.cart.push(id);
        }
    }
})