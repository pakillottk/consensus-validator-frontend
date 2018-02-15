import React from 'react'

import Button from '../components/ui/button/Button'
import Segment from '../components/ui/segment/Segment'
import Divider from '../components/ui/divider/Divider'
import Img from '../components/ui/img/Img'
import FormBuilder from '../components/forms/FormBuilder'

export default class UISetup extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <Segment secondary>
                        <h1>Buttons</h1>
                    </Segment>
                    
                    <Segment>
                        <h2>SIZES</h2>
                        <Button inline size="tiny">TINY</Button>
                        <Button inline size="small">SMALL</Button>
                        <Button inline size="medium">MEDIUM</Button>
                        <Button inline size="big">BIG</Button>
                        <Button inline size="large">LARGE</Button>
                        <Button full>FULL</Button>
                    </Segment>
                    <Segment secondary>
                        <h2>COLORS</h2>
                        <Button context="default">DEFAULT</Button>
                        <Button context="secondary">SECONDARY</Button>
                        <Button context="possitive">POSSITIVE</Button>
                        <Button context="negative">NEGATIVE</Button>
                        <Button context="relevant">RELEVANT</Button>
                    </Segment>
                    <Segment>
                        <h2>DISABLED</h2>
                        <Button disabled context="default">DEFAULT</Button>
                        <Button disabled context="secondary">SECONDARY</Button>
                        <Button disabled context="possitive">POSSITIVE</Button>
                        <Button disabled context="negative">NEGATIVE</Button>
                        <Button disabled context="relevant">RELEVANT</Button>
                    </Segment>
                </div>
                <div>
                    <Segment secondary>
                        <h1>Dividers</h1>
                    </Segment>
                    <Segment>
                        <Divider />
                        <Divider full />                        
                    </Segment>
                    <Segment secondary>
                        <Divider secondary />
                        <Divider secondary full />                        
                    </Segment>
                </div>
                <div>
                    <Segment secondary>
                        <h1>IMG</h1>
                    </Segment>
                    <Segment>
                        <Img size="tiny" src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                        <Img size="small" src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                        <Img size="medium" src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                        <Img size="big" src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                        <Img size="large" src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                    </Segment>
                    <Segment>
                        <Img bordered src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                        <Img size="small" rounded bordered src="https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg"/>
                    </Segment>
                </div>
                <div>
                    <Segment secondary>
                        <h1>Forms</h1>
                    </Segment>
                    <Segment>
                        <FormBuilder
                            title="My Form"
                            fields={[
                                {
                                    type:"input",
                                    component:'text',
                                    label:'FOO',
                                    name:'foo'
                                },
                                {
                                    type:"select",
                                    component:'select',
                                    label:'BAR',
                                    name:'bar',
                                    options: [
                                        {text:'A', value: 'a'},
                                        {text:'B', value: 'b'},
                                    ]
                                },
                            ]}
                        />
                        <FormBuilder
                            secondary
                            title="My Form"
                            fields={[
                                {
                                    type:"input",
                                    component:'text',
                                    label:'FOO',
                                    name:'foo'
                                },
                                {
                                    type:"select",
                                    component:'select',
                                    label:'BAR',
                                    name:'bar',
                                    options: [
                                        {text:'A', value: 'a'},
                                        {text:'B', value: 'b'},
                                    ]
                                },
                            ]}
                        />
                    </Segment>
                </div>
            </div>
        );
    }
}