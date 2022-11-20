import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import { Home } from "./components/Home";

export class Footer extends Component {
    static displayName = Footer.name;

    constructor() {
        super();
        this.state = {}
    }
    
    formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        let year = d.getFullYear();
        if (month.length < 2) {
          month = '0' + month;
        }
        if (day.length < 2) {
          day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    render() {
        return (
            <footer className="fixed-bottom bg-secondary text-white">
                <Container>				
                    <p className="m-3" align="center">Copyright {this.formatDate(Date.now())} © All Rights Reserved.</p>
                </Container>
            </footer>
        );
    }
}