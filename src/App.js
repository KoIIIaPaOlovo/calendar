import React from "react";
import './App.css';
import MonthPicker from "./components/MonthPicker"
import Table from "./components/Table"

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentDate: new Date()
    }
    this.changeDate = this.changeDate.bind(this);
  }

  render(){
    return (
      <div className="app-wrapper">
      <MonthPicker changeDate={this.changeDate} currentDate={this.state.currentDate}/>
      <Table currentDate={this.state.currentDate}/>
      </div>
    )
  }

  changeDate(direction){
    if(direction === 'next'){
      this.setState({currentDate : new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1))});
    }
    else{
      this.setState({currentDate : new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() - 1))});
    }
  }


}

