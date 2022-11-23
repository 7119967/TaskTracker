import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { formatDate } from '../infrastructure/common'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer className="fixed-bottom bg-secondary text-white">
                <Container>				
                    <p className="m-3" align="center">Copyright {formatDate(Date.now())} © All Rights Reserved.</p>
                </Container>
            </footer>
        );
    }
}