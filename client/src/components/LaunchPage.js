import React from 'react';
import ProjectPreview from './ProjectPreview';
import CreateProject from './CreateProject';



export default class LaunchPage extends React.Component {
    constructor(props) {
        super()
        this.state= {

        }
    }

    render() {
        return (
            <div className="launchpage-container">
                <ProjectPreview />
                <CreateProject />
            </div>
        )
    }
}