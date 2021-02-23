import React, { Component } from 'react';
import axios from 'axios';
import AppConfig from '../config';

class RolesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        };
    }

    componentDidMount() {
        let rolesUrl = `${AppConfig.backend_host}/roles`;
        axios
            .get(rolesUrl)
            .then( response => {
                this.setState( {
                    roles: response.data
                })
            })
        // Axios request here.
    }

    render() {
        return(
            <ul>
                {this.state.roles.map(item => <li key={item.role_id}>{item.role_type}</li>)}
            </ul>
            // Your jsx here
        );
    }
}

export default RolesComponent;