import React from 'react'

import API from '../../API/API'

import List from '../ui/list/List'
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input'

import Request from '../../communication/Request'

let lastToken = 0
class AutoComplete extends React.Component
{
    constructor(props)
    {
        super(props)


        this.tId = null
        this.state = {
            filter: props.initialValue || '',
            results: []
        }
        
    
        this.handleChange = this.handleChange.bind(this)
        this.requestData = this.requestData.bind(this)
        this.itemClicked = this.itemClicked.bind(this)
    }

    // componentWillReceiveProps(nextProps)
    // {
    //     if(nextProps.initialValue != this.props.initialValue)
    //     {
    //         this.setState({filter: nextProps.initialValue})
    //     }
    // }

    generateToken()
    {
        return this.token = ++lastToken
    }

    async requestData()
    {
        const { connection, requestPath, name, queryFormatter, queryFieldOverride } = this.props

        const Conn = connection || AutoComplete.DefaultConnection
        try 
        {
            let formattedFilter = queryFormatter ? queryFormatter(this.state.filter) : this.state.filter
            let res
            if(formattedFilter === null) 
            {
                res = await Conn.get(requestPath, new Request(null, Conn.headers.headers, ""))
            }   
            else
            {
                res = await Conn.get(requestPath, new Request(null, Conn.headers.headers, `?${queryFieldOverride || name}=${formattedFilter}`))
            } 
            this.setState({results: res.data || []})
        }
        catch(e)
        {
            // request failed
            this.setState({results: []})
        }

        this.tId = null
    }

    handleChange(e)
    {
        const { onChange, itemSelected } = this.props
        const v = e.target.value
        this.setState({filter: v})

        if(itemSelected && v.trim() === '')
        {
            itemSelected(null)
        }

        this.startRequest()
        if(onChange)
        {
           onChange(e) 
        }
    }

    startRequest()
    {
        const { requestDelay } = this.props
        if(this.tId != null)
        {
            clearTimeout(this.tId)
        }

        this.tId = setTimeout(this.requestData, requestDelay || 150)
    }

    itemClicked(item)
    {
        const { name, displayFormatter, itemSelected, valueSelector } = this.props
        
        if(itemSelected)
        {
            this.setState({filter: displayFormatter(item)})
            if(valueSelector)
            {
                itemSelected( item, valueSelector(item) )
            }
            else
            {
                itemSelected(item, item[name])
            }
        }
        else
        {
            this.setState({filter: ''})
        }
        this.setState({results: []})
    }

    render()
    {
        const { name, full, placeholder, disabled, label, displayFormatter, inputFormatter } = this.props

        const filter = inputFormatter ? inputFormatter(this.state.filter) : this.state.filter
        return(
            <div className={disabled ? 'disabled' : ''} onBlur={() => setTimeout( ()=> this.setState({results:[]}), 200 )} style={{position:'relative'}}>
                {label && <Label>{label}</Label>}
                <Input noAutocomplete={true} full={full} placeholder={placeholder} name={name} onFocus={() => this.startRequest()} value={filter} onChange={this.handleChange} /> 
                <div style={{position: 'absolute', width:'100%', overflow:'auto', maxHeight: '150px', top:'100%', left:'50%', transform: 'translate(-50%,0)', zIndex: 999}}>
                    {this.state.results.length > 0 && <List itemClicked={this.itemClicked} items={this.state.results} renderItem={displayFormatter}/>}
                </div>
            </div>
        )
    }
}

AutoComplete.DefaultConnection = API
export default AutoComplete