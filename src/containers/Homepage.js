import React from 'react'
import Loader from '../components/Loader'
import ItemCategory from '../components/ItemCategory'
import Showpage from './Showpage'

class Homepage extends React.Component {
  state = {
    show: false,
    fullscreen: false,
    currentItem: [],
    categories: []
  }

  filterCategory = () => {
    return this.props.items.forEach(item => {
      if (!this.state.categories.includes(item.category)) {
        this.setState({
          categories: [
            ...this.state.categories,
            item.category
          ]
        })
      }
    })
  }

  renderCategory = () => {
    this.filterCategory()
    return this.state.categories.map(category => {
      let categoryItems = this.props.items.filter(item => item.category === category && item.available === true)
      return <ItemCategory key={category} items={categoryItems} clickHandler={this.clickHandler}/>
    })
  }

  clickHandler = (item) => {
    if (this.state.currentItem.id === item.id) {
      this.setState({
        currentItem: item,
        show: !this.state.show
      })
    } else {
      this.setState({currentItem: item, show: true})
    }
  }
  closeHandler = () => {
    this.setState({show: false, currentItem: [], fullscreen: false})
  }
  fullscreenHandler = () => {
    this.setState({
      fullscreen: !this.state.fullscreen
    })
  }
  renderLoader = () => {
    if (this.props.items.length === 0) {
      if (this.props.searchterm === "" && this.props.zipcode === "") {
        return <Loader/>
      }
    }
  }

  render() {
    return (<section>
      <div className="homepage">
        {this.renderLoader()}
        <div className="pad"></div>
        {this.renderCategory()}
      </div>

      <Showpage allItems={this.props.allItems} currentItem={this.state.currentItem} show={this.state.show} fullscreen={this.state.fullscreen} fullscreenHandler={this.fullscreenHandler} closeHandler={this.closeHandler} clickHandler={this.clickHandler} deleteItemHandler={this.props.deleteItemHandler}/>

    </section>)
  }
}

export default Homepage
