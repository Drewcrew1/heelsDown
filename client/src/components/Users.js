import React from 'react';
import axios from 'axios';
class Users extends React.Component{
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
axios.get('/api/users/getall').then((users) => {
this.setState({users: users.data});
}).catch((err) => {
    console.log(err);
});
}


    render(){
        let content;
        if(this.state.users[0] !== null || undefined){
            
content = this.state.users.map((item) => {
return <button onClick={() => this.setState({userSet: {item}})}>{item.name}</button>
});
        }else{
            content = <p>No Users</p>
        }
if(this.state.userSet !== null){
    console.log(this.state.userSet.item._id);
}
        return(
                <div>
                    <h1>Users</h1>
                    <div>
                        {content}
                    </div>
                </div>
        );
    }
}

export default Users;