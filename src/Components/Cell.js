import React,{Component} from 'react'
import "../public/Cell.css"

export default class Cell extends Component{

    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }


        // Handle click on cell event

    handleClick(e)
    {
        this.props.flipThem();
    }

    render(){
        let cName=this.props.isLit ? "lit" : "nLit";
        return(
            <td className={cName} onClick={this.handleClick}>
            </td>
        )
    }
}