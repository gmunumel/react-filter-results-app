import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/*
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}


class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
*/

class ProductRow extends React.Component {
  render () {
    let product = this.props.product

    return (
      <tr>
        <td className={product.stocked ? '' : 'outStock'}>
          {product.name}  
        </td>
        <td>{product.price}</td> 
      </tr>
    )
  }
}

class ProductCategoryRow extends React.Component {
  render () {
    return (
      <tr>
        <td colSpan="2"><b>{this.props.category}</b></td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render () {
    let category = ""
    let rows = []
    
    this.props.products.forEach((elem) => {                             
      if(category !== elem.category) {
        rows.push(<ProductCategoryRow key={elem.category} category={elem.category} />)
      } 
      if (((this.props.isStockOn && elem.stocked) || !this.props.isStockOn)
        && elem.name.includes(this.props.search)) {
        rows.push(<ProductRow key={elem.name} product={elem} />)
      }
      
      category = elem.category
    }) 

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleStockClick() {
    this.props.onStockClick();
  }

  handleSearchChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  render () {
    return (
      <form>
        <input type="text" placeholder="Search..." onChange={this.handleSearchChange} />
        <br />
        <input type="checkbox" name="stock" onClick={this.handleStockClick} />
        <label>Only show products in stock</label>
        <br /><br />
      </form>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isStockOn: false, search: ''}

    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleStockClick() {
    this.setState(state => ({
      isStockOn: !state.isStockOn
    }))
  }

  handleSearchChange(value) {
    if(value.length > 0 && value !== this.state.search) {
      this.setState(state => ({
        search: value
      }))
    }
  }

  render () {
    return (
      <div>
          <SearchBar onStockClick={this.handleStockClick} onSearchChange={this.handleSearchChange} />
          <ProductTable 
            products={this.props.products} 
            isStockOn={this.state.isStockOn} 
            search={this.state.search} 
          />
      </div>
    )
  }
}

const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
  <FilterableProductTable products={products} />,
  document.getElementById('root')
); 