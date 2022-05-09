const template = `
    <div>Price :${price} </div>
    <div>Total:${price * quantity}</div>
    <div>Taxes:${totalPriceWithTax}</div> 
`

const Vue = {
  data: {
    price: 10.00,
    quantity: 2
  },
  computed: {
    totalPriceWithTax() {
      return this.price * this.quantity * 1.03
    }
  }
}

//  当price改变的时候，vue是怎么知道去改变所有东西