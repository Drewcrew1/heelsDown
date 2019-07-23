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
            times: null,
            userName: null,
            userEmail: null,
            allFarms: null,
            farmId: null,
            rerender: true
        };
    }

componentWillMount(){
axios.get('/api/users/getall').then((users) => {
this.setState({users: users.data});
}).catch((err) => {
    console.log(err);
});

    axios.get('api/farms/getall').then((res) => {
        this.setState({allFarms: res.data});
    }).catch((err) => {
        console.log(err);
    });
};
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

submitUser = () => {
        let data = {
          name: this.state.userName,
          email: this.state.userEmail
        };
  axios.post('/api/users/setup',data).then((res) => {
      console.log(res);
  }).catch((err) => console.log(err));
};
    getTimes = () => {
        let farm = this.state.farmId;
        axios.get(`/api/trainers/selectTime/${farm}`).then((res) => {
            this.setState({times: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
    setUserOnTrainer = (thing) => {
        let id = thing._id;
        console.log('id',id);
        let trainer = this.state.times[0].email;
        let user = this.state.userSet.item._id;
        axios.get(`/api/trainers/setUserOnTime/${trainer}/${id}/${user}`).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
    };


    render(){
        let times;
        if(this.state.times !== null){
            console.log(this.state.times);
            let name = this.state.times[0].name;
           
            times = (
                
                this.state.times[0].times.map((item) => {
                    if(this.state.times[0].times[0].booked === false){
                        return (
                            <button onClick={() => this.setUserOnTrainer(item)}>{name} -- {item.day} -- {item.time}</button>
                        );
                    }else{
                        return (
                            <button onClick={() => this.setUserOnTrainer(item)}>{name} -- {item.day} -- {item.time} -- Booked</button>
                        );
                    }
                   
                })
            );

        }else{
            times = <p>No times</p>;
        }
        if(this.state.farmId !== null && this.state.rerender === true){
            this.getTimes();
            this.setState({rerender: false});
        }
        let allfarms;
        if(this.state.allFarms !== null){
            allfarms = (
                this.state.allFarms.map((item) => {
                    return (
                        <button onClick={() => this.setState({farmId: item._id})} id={item._id}>{item.name}</button>
                    );
                })
            );
        }else{
            allfarms = <p>No Farms</p>;
        }
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
                    <div className="hideShow">
                        <h3>User set up</h3>
                        <label >user name</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} />
                        <label >user Email</label>
                        <input name="userEmail" value={this.state.userEmail} onChange={this.onChange} />
                        <button onClick={() => this.submitUser()}>Make User</button>
                    </div>
                    <hr/>


                    <h3>Pick a farm</h3>
                    {allfarms}
                    <hr/>

                    <h3>Select a trainer and time</h3>
                    {times}
                </div>
        );
    }
}

export default Users;