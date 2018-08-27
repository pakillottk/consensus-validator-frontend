import React from 'react'

import Label from '../../ui/form/Label/Label'
import Input from '../../ui/form/Input/Input'
import Button from '../../ui/button/Button'
import TypeSelector from '../../forms/Controls/TypeSelector/TypeSelector'

import { generateCodes } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CodeGenerator extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            type_id: 0,
            ammount: 0
        }
    }

    resetState() {
        this.setState({type_id:0,ammount:0})
    }

    dispatchGenerator() {
        const { sessionId, generateCodes } = this.props
        const { type_id, ammount } = this.state
        
        generateCodes( ammount, type_id, sessionId )
        this.resetState()
    }

    render() {
        return(
            <div>
                <Label>TIPO</Label>
                <TypeSelector value={this.state.type_id} onChange={(event)=>this.setState({type_id:event.target.value})}/>
                <Label>CANTIDAD</Label>
                <Input type="number" value={this.state.ammount} onChange={(event)=>this.setState({ammount:event.target.value})} />
                <Button 
                    disabled={parseInt(this.state.type_id,10)===0||parseInt(this.state.ammount,10)===0} 
                    context="possitive"
                    onClick={()=>this.dispatchGenerator()}
                >
                    GENERAR
                </Button>
            </div>
        )
    }
}
export default connect(
    () => { return {} },
    ( dispatch ) => {
        return {
            generateCodes: bindActionCreators( generateCodes, dispatch )
        }
    }
)(CodeGenerator)
