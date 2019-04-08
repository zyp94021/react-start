import React, { Component } from 'react'
import { Form, Input, Select, Button, } from 'antd';
export class UserCTHoldings extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'ctserver5111' };

    }
    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
          this.setState({ currency });
        }
        this.triggerChange({ currency });
      }
    render() {
        const state = this.state
        return (
            <span>
             <Select value={state.value} onChange={this.handleCurrencyChange}>
             
             </Select>
            </span>
        )
    }
}