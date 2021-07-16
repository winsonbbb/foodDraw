import React from "react";
import "./InputForm.css";
import "./Popup.css";
import FoodList from "./FoodList";
import Popup from 'react-popup';

class FoodInputForm extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            shop: "",
            foodName: "",
            url: "",
            loginName: "",
        };
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount = () => {
        this.getCandidateList();
    }

    handleAdd = (e) => {
        e.preventDefault();
        this.addCandidate(this.state.shop, this.state.foodName, this.state.url);
    }

    handleRandom = (e) => {
        e.preventDefault();
        if (this.state.items.length > 0) {
            let number = this.getRandomInt(this.state.items.length);
            Popup.plugins().random(this.state.items[number]);
        }
    }
    handleDelete = (val) => {
        this.removeCandidate(val);
    }
    handleShopChange = (e) => {
        var value = e.target.value;
        this.setState({
            shop: value
        })
    }
    handleFoodNameChange = (e) => {
        var value = e.target.value;
        this.setState({
            foodName: value
        })
    }
    handleUrlChange = (e) => {
        var value = e.target.value;
        this.setState({
            url: value
        })
    }
    handleloginNameChange = (e) => {
        var value = e.target.value;
        this.setState({
            loginName: value
        })
    }
    addCandidate = (s, f, u) => {
        fetch("/api/food", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({ shop: s, foodName: f, url: u }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Not Found");
        }).then(response => {
            this.setState({
                items: [...this.state.items, response],
                foodName: "",
                shop: "",
                url: ""
            })
            this.showPopup('成功加入');
        })
            .catch(error => console.error('Error:', error));

    }

    removeCandidate = (v) => {
        fetch("/api/food/delete", {
            method: 'POST',
            body: JSON.stringify({ id: v }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Not Found");
        })
            .then(response => {
                this.setState({
                    items: this.state.items.filter((_) => _.id !== v)
                })
            })
            .catch(error => console.error('Error:', error));

    }
    getCandidateList = () => {
        fetch("/api/food").then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Not Found");
        }).then(response => {

            this.setState({
                items: response
            })
        })
            .catch(error => console.error('Error:', error));
    }
    showPopup = (text) => {
        Popup.alert(text);
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    render() {
        return (
            <div>
                <Popup />
                <h1>加食物</h1>
                <form id="edit-item-form" onSubmit={this.handleAdd}>
                    <input type="text" placeholder="商店名" id="new-shop" value={this.state.shop} onChange={this.handleShopChange} />
                    <input type="text" placeholder="食物名" id="new-food" value={this.state.foodName} onChange={this.handleFoodNameChange} />
                    <input type="text" placeholder="網址" id="new-url" value={this.state.url} onChange={this.handleUrlChange} />
                    <button className="btn positive-btn" title="Add" onClick={this.handleAdd}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <div className="item-list-container">
                        <h2>食物清單</h2>
                        <ul className="item-list">
                            {this.state.items.map((food) => {
                                return <FoodList key={food.id} food={food} onDelete={this.handleDelete} />
                            }
                            )}
                        </ul>
                        {/* <div className="text-right float-right">
                        <a className="delete-all" onClick={this.handleDeleteAll}>
                            <i className="fa fa-times"></i>
                        Delete All</a>
                    </div>
                    <label htmlFor="rand-without-replacement" className="text-left">
                        <input checked={this.state.isWithoutReplacement} onClick={this.setWithoutReplacement} type="checkbox" id="rand-without-replacement" name="without-replacement" />
                        Draw without replacement
                    </label> */}
                    </div>
                    <div className="btn-set">
                        <button className="btn primary-btn btn-done" onClick={this.handleRandom.bind(this)}>抽獎</button>
                    </div>
                </form>
            </div>
        );
    }
}
Popup.registerPlugin('random', function (food, callback) {
    this.create({
        title: '今日要食既係',
        content: <FoodList key={food.id} food={food} />,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'OK',
                className: 'success',
                action: function () {
                    Popup.close();
                }
            }]
        }
    });
});
export default FoodInputForm;