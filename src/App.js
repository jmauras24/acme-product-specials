import React, { Component } from 'react';
import Products from './Products';
import axios from 'axios';
// import Product from '../db/Product';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      specials: [],
      regulars: [],
      productId: -1
    }
    // this.toggleSelection = this.toggleSelection.bind(this);
    this.makeRegular = this.makeRegular.bind(this);
    this.makeSpecial = this.makeSpecial.bind(this);
    this.products = this.products.bind(this);
    this.captureSelection = this.captureSelection.bind(this);
  }

  componentDidMount(){
    this.products();
  }

  products(){
    axios.get('/api/products')
      .then( res => res.data)
      .then(products =>{
        console.log(`PRODUCTS`, products)
        const regulars = products.filter(product => !product.isSpecial);
        const specials = products.filter(product => product.isSpecial);
        this.setState({ specials, regulars});
        document.location.hash ='/';
      })
  }

  captureSelection(ev){
    console.log('capture', ev.target.value)
    this.setState({ productId: ev.target.value});
  }

  makeRegular(ev){
    ev.preventDefault()
    console.log(`make regular`, this.state.productId)
    const id = this.state.productId;
    axios.put(`/api/products/${id}`,{ isSpecial: false })
      .then( res => res.data)
      .then( () =>{
        // document.location.hash = '/'; not working
        this.products();
      })
    }

    makeSpecial(ev){
      ev.preventDefault()
      console.log(`make special`, this.state.productId)
      const id = this.state.productId;
      axios.put(`/api/products/${id}`,{ isSpecial: true })
      .then( res => res.data)
      .then( product =>{
        this.products();
      })
  }

  // toggleSelection(ev){
  //   ev.preventDefault()
  //   console.log('toggle')
  //   // Product.findById(this.state.productId)
  //   //   .then( product => {
  //   //     const isSpecial = !product.isSpecial;
  //   //     axios.put(`/api/products/${id}`,{ isSpecial: isSpecial })
  //   //     .then( res => res.data)
  //   //     .then( product =>{
  //   //       this.setState({ specialId: product.id })
  //   //     })
  //   //   })
  // }

  //refactor - make a single function called Toggle - lookup by Id and flip isSpecial

  render(){
    const { regulars, specials } = this.state;
    const { makeRegular, makeSpecial, captureSelection } = this;
    return(
      <div>
        <h2>We've got { specials.length } specials</h2>
        <Products makeRegular={ makeRegular } regulars={regulars}  specials={ specials } makeSpecial={ makeSpecial } captureSelection={ captureSelection }/>
      </div>
    )
  }

}
