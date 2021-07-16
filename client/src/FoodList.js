import React from "react";
import "./FoodList.css";
class FoodList extends React.Component {

    render() {
        return <li id={this.props.food.id}> 
        商店: {this.props.food.shop} 食物: {this.props.food.foodName} <a target="_blank" rel="noreferrer" href={this.props.food.url}>網址</a>
           {this.props.onDelete? <span className="delete" title="Delete" onClick={()=>this.props.onDelete(this.props.food.id)}>
                <i className="fa fa-minus-circle"></i>
            </span> : null}
        </li>
    }
}

export default FoodList;