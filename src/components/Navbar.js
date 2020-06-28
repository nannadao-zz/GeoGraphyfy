import React, {Component} from 'react';
import '../style/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div onClick={this.props.getLetter} className="Navbar">
                <p> {this.props.name} </p>
            </div>
        )
    }
}

export default Navbar;