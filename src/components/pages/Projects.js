import { useLocation } from 'react-router-dom'
import styles from './projects.module.css'

import Message from "../layout/message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/projectCard'
import { useState, useEffect } from 'react'


function Projects() {
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
        })
        .catch((err) => console.log(err))
    },[])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass='start'>
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projects