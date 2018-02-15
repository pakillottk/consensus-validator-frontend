import React from 'react'
import UIThemeable from '../UIThemeable'
import ListStyles from './ListStyles'
import Divider from '../divider/Divider'

class List extends React.Component {
    applyThemeStyles( secondary, theme ) {
        return {
            wrapper: {
                backgroundColor: secondary ? theme.secondaryColor : theme.primaryColor,
                color: secondary ? theme.secondaryTextColor : theme.textColor,
                borderColor: theme.borderColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                padding: theme.padding.hard
            },
            container: {                
                
            }
        }
    }

    render() {
        const { horizontal, header, items, renderItem, secondary, theme } = this.props
        const listStyles = ListStyles( horizontal )
        const styles = this.props.styles || {wrapper: {}, container: {}, items: {}}
        const themeStyles = this.applyThemeStyles( secondary, theme )

        return(
            <div style={{...themeStyles.wrapper, ...listStyles.wrapper, ...styles.wrapper}}>
                { header && <h2 style={{textAlign: 'center'}}>{header}</h2> }
                <div style={{...themeStyles.container, ...listStyles.container, ...styles.container}}>
                    {items.map( ( item, index ) => 
                        <div key={index}>
                            <div style={{...listStyles.item, ...styles.item}}>
                                {renderItem( item )}
                                {horizontal && <Divider vertical />}
                            </div>
                            {!horizontal && <Divider />}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default UIThemeable( List )