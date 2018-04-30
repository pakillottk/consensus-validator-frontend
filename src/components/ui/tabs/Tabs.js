import React from 'react'
import UIThemeable from '../UIThemeable'

class Tabs extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            selectedTab: props.defaultTab ? props.defaultTab : 0
        }
    }
    applyThemeStyles( theme ) {
        return {
            container: {
                display: 'flex',
                justifyContent:'space-around',
                fontSize:'1.2rem'
            },
            tab: {
                cursor:'pointer',
                textAlign:'center',
                width:'100%',
                backgroundColor:theme.thirdColor,
                padding: theme.padding.medium,
                color: theme.secondaryTextColor,
                borderTop: '4px solid ' + theme.dark
            },
            activeTab: {
                textAlign:'center',
                width:'100%',
                backgroundColor:theme.secondaryColor,
                padding: theme.padding.medium,
                color: theme.secondaryTextColor,
                borderTop: '4px solid ' + theme.relevant
            },
            content: {

            }
        }
    }

    render() {
        const { theme, tabs, defaultTab } = this.props
        const styles = this.applyThemeStyles( theme )
        return(
            <div>
                <div style={styles.container}>
                    { tabs.map( (tab, index) => (
                    <div 
                        key={index} 
                        onClick={()=>this.setState({selectedTab:index})} 
                        style={ this.state.selectedTab === index ? styles.activeTab : styles.tab}
                    >
                        {tab.label}
                    </div>) ) }
                </div>
                <div style={styles.content}>
                    { tabs[ this.state.selectedTab ].content }
                </div>
            </div>
        )
    }
}
export default UIThemeable( Tabs )