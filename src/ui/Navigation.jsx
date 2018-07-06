import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import Addressbook from './Addressbook.jsx';
import AddContact from './AddContact.jsx';

const Navigation = () => (
<Router>
    <div className="container">
        <div className="abContainer">
            <NavLink exact to="/" className="navlink" activeClassName="navlinkActive">Address book</NavLink>
            <NavLink exact to="/addcontact" className="navlink" activeClassName="navlinkActive">Add contact</NavLink>
        </div>

        <Route exact path="/" component={Addressbook}/>
        <Route path="/addcontact/:id?" component={AddContact}/>
    </div>
</Router>
);

export default Navigation;
