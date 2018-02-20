import React from 'react'

export default class Window {
    static lastId = 0
    constructor( title, content ) {
        this.moving = false
        this.minimized = false
        this.id = ++Window.lastId
        this.title = title || 'New Window'
        this.content = content || (<div>My Window.</div>)
        this.x = 0
        this.y = 0
    }

    valueOrCurrent( field, value ) {
        if( value === undefined ) {
            return this[ field ]
        }

        return value
    }

    update( data ) {
        const newWindow = new Window()

        const { moving, minimized, x, y, title, content } = data
        newWindow.id = this.id
        newWindow.moving = this.valueOrCurrent( 'moving', moving )
        newWindow.minimized = this.valueOrCurrent( 'minimized', minimized )
        newWindow.x = this.valueOrCurrent( 'x', x )
        newWindow.y = this.valueOrCurrent( 'y', y )
        newWindow.title = this.valueOrCurrent( 'title', title )
        newWindow.content = this.valueOrCurrent( 'content', content )

        return newWindow
    }
}