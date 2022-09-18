

<template>
  <div class="container">
    <div class="card p-2 m-5 max-500 mx-auto" :class="!show?'':'d-none'">
      <form>
        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amount" placeholder="100" v-model="amount">
        </div>
        <div class="text-danger p-2 text-right">{{lowMoneyError}}</div>
        <button class="btn btn-primary d-block mx-auto min-10-rem" @click="getClientSecret" :disabled="loading">Pay
          ${{amount}}</button>
      </form>
    </div>
    <div class="card p-2 m-5 max-500 mx-auto" :class="show?'visible':'invisible'">
      <form id="payment-form">
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
        <button class="btn btn-primary d-block mx-auto min-10-rem mt-3" @click="completePayment">Submit Payment</button>
        <div class="text-danger p-2 text-right">{{errorMessage}}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const public_key_test = 'pk_test_51GmBDmKhbvlqPzkUaDsi270ISlW1BI8UfG2Jon6ZdgTc392dUi3ibLJ8hSh2UVcOi3di4CepRk2C9r5DLKeLfyOk00A3flLprg';
const public_key_live = 'pk_live_51GmBDmKhbvlqPzkUMIaR1Y9mmAPwosm5Yisxg7gOaITh3XWiP4a3kYO4r1uUvIN9HGtFMPhAH8I9SXqWqsqLdMfk006NwiLFR6';
const live = window.location.hostname !== 'localhost';
const public_key = live ? public_key_live : public_key_test;
const stripe_endpoint = 'https://qw4l8g02a0.execute-api.ap-southeast-2.amazonaws.com/dev';
const stripe = Stripe(public_key);
export default {
  name: 'Payment Page',
  data: () => ({
    amount: 0,
    elements: null,
    show: false,
    errorMessage: '',
    lowMoneyError: '',
    loading: false
  }),
  computed: {
    someDataFromStore() {
      return this.$store.state.someDataFromStore
    }
  },
  methods: {
    setLastName() {
      this.$store.commit('setSomeData', 'Koko')
    },
    async getClientSecret(e) {
      e.preventDefault();
      if (this.amount < 2) return this.lowMoneyError = 'Least allowed is $2';
      this.loading = true;
      const appearance = {
        theme: 'night'
      };
      try {
        const { data: { body: { clientSecret } } } = await axios.post(stripe_endpoint, {
          amount: this.amount * 100,
          live,
          shipping: {
            address: {
              city: 'Clarinda',
              country: 'Australia',
              line1: '5/7 Mack Crescent',
              postal_code: '3169'
            },
            name: 'Tony Melek',
            phone: '0426081060'
          }
        });
        const options = {
          clientSecret,
          appearance
        };
        this.elements = stripe.elements(options);
        const paymentElement = this.elements.create('payment');
        paymentElement.mount('#payment-element');
        this.show = true;
        this.loading = false;
      } catch (err) {
        console.log(err)
      }
    },
    async completePayment(e) {
      e.preventDefault();
      const { error } = await stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        }
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        this.errorMessage = error.message;
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    }
  }
}
</script>
<style scoped>
.max-500 {
  width: 100%;
  max-width: 500px;
}

.min-10-rem {
  min-width: 10rem;
}

#Field-countryInput {
  display: none;
}
</style>