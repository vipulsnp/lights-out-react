import React, { Component } from 'react'
import '../public/Board.css'
import Cell from './Cell'

export default class Board extends Component{

    static defaultProps={
        nrows: 5,                           // No. of rows
        ncols:5,                            // No. of columns
        chanceLightStartOn:0.5             // Chance of lights ON
    }

    constructor(props){
        super(props);

        this.state={
            hasWon: false,              // Check win
            noOfClicks:0,
            board: this.createBoard(),   // Board Initial State
        };
    }



                        // Creating the Board Here
    createBoard(){
        let board=[];

        for(let y=0;y< this.props.nrows;y++)
        {
            let row=[];     // creating the array  of row i.e columns  
            for(let x=0;x<this.props.ncols;x++)
            {
                row.push(Math.random() < this.props.chanceLightStartOn)
            }
            board.push(row); // pushing the values of that particular row to the board 
        }
        return board;
    }

                // flip the cells and check Win

    flipThemAround(coord)
    {
        
        let {ncols,nrows}=this.props;
        let board=this.state.board;
        let [y,x]=coord.split("-").map(Number);

        function flipCell(y,x)
        {
            if(x>=0 && x<ncols && y>=0 && y<nrows)
            {
                board[y][x] = !board[y][x];
            }
        }

        // flip cells
        flipCell(y,x);
        flipCell(y+1,x);
        flipCell(y-1, x);
        flipCell(y, x+1);
        flipCell(y, x-1);

        let hasWon=board.every(row => row.every(cell => !cell));
        let moves=this.state.noOfClicks + 1;
        this.setState({
            board:board,
            hasWon:hasWon,
            noOfClicks:moves
        });
    }

refreshPage(){
    window.location.reload(false);
}




    render(){

        let tboard=[];

        for(let y=0;y<this.props.nrows;y++)
        {
            let row=[];
            for(let x=0;x<this.props.ncols;x++)
            {
                row.push(<Cell isLit={this.state.board[y][x]} key={`${y},${x}`} 
                flipThem={()=> this.flipThemAround(`${y} - ${x}`)}/>);
            }
            tboard.push(<tr key={y}>{row}</tr>);
        }


        return(
            <div>
            <div className='board-title'>
                <div className='neon-orange'>Lights</div>
                <div className='neon-blue'>Out</div>
            </div>
                <span className="moves">Number of Moves : {this.state.noOfClicks} </span>   
                {this.state.hasWon ? 
                    
                <div className='win neon-orange'> You Won ! 
                <button className="rst-button" onClick={this.refreshPage}> Restart </button>
                </div> :  
                <table className='boardTable'>
                        <tbody>
                            {tboard}
                        </tbody>
                    </table>    
        }        
    </div>
        )
    }
}