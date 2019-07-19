import React from 'react';
import axios from 'axios';
class Trainers extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            userSet: null,
            farm: null,
            trainer: null,
            times: null
        };
    }

componentWillMount(){

}


    render(){
 
        return(
                <div>
                    <h1>Trainers</h1>
                    
                </div>
        );
    }
}

export default Trainers;