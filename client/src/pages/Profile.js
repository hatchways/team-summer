import React, {Component} from 'react';
import UserDetailsSidebar from '../components/profile/pUserDetailsSidebar';
import ProfileButton from '../components/profile/profileButton';
import ProjectCard from '../components/projectCard';
import { getUser } from '../api/users';

//standin data
localStorage.setItem('id', '5dd4934d2e312ee46deb3f95')//currentUser === id
//localStorage.setItem('id', '5')//currentUser !== id

class ProfilePage extends Component {
    state = {
        profile: {
            id: this.props.match.params.id,
            name: '',
            location: '',
            about: '',
            expertise: '',
            projectIds: [],
            imageUrl: '', //where will we store the pics - and how in github?
        },
        projects: [],
        currentUserId: localStorage.getItem('id')
    }

    componentDidMount() {
        const { id } = this.state.profile
        const profile = getUser(id).then(profile => {
            this.setState({
                profile: profile.data
            })
        })
    }

    renderButton() {
        const { profile, currentUserId } = this.state;
        const buttonType = profile.id === currentUserId ?
            'edit' : 'submit'

        return (
            <div>
                <button>MaterialUI button goes here</button>
            </div>
        )
    }

    handleClick() {
        console.log("clicked")
    }

    renderUserInfo() {
        const {
            imageUrl,
            name, 
            location, 
            about, 
            expertise } = this.state.profile

        return (
            <React.Fragment>
                <UserDetailsSidebar />
            </React.Fragment>
        )
    }

    renderProjects = () => {
        const { projects } = this.state.profile
        
        return projects.map(({name, funding, goal, imageUrl}) => {
            return (
                <ProjectCard 
                    name={name}
                    funding={funding}
                    goal={goal}
                    imageUrl={imageUrl}
                />
            )
        })
    }

    render() {
        return (
            <div className='profileSidebar'>
                <h1>placeholder</h1>
                { this.renderUserInfo() }
                { this.renderButton() }
                { this.renderProjects() }
            </div>
        )
    }
}

export default ProfilePage;


// front-end route -> /users/:userId  eg: url eg:'5dd4934d2e312ee46deb3f95'

// show content on the left hand side about the user
// placeholder data for things that don't exist

// Send message button should be a edit button if you are on your own profile page, 
// and it should be a send message button elsewhere

// back-end: get user by id route (public)