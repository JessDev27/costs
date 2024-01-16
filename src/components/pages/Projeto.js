import { parse, v4 as uuidv4 } from 'uuid'

import styles from './projeto.module.css'

import { json, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/loading'
import Container from '../layout/Container'
import Message from '../layout/message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/serviceForm'
import ServiceCard from '../service/ServiceCard'

function Projeto() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [ type, setType] = useState()
    const [services, setServices] = useState([])

    useEffect(() => {
        setTimeout(() => {fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            console.log(data)
            setServices(data.services)
        })
        .catch((err) => console.log)}, 300)
    }, [id])

    function editPost(project) {
        setMessage('')

        // budget validation
        if(project.budget < project.cost) {
            // mensagem
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')
        console.log(project)
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}` , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
        setShowServiceForm(false)
    })
    .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.service = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    // console.log(services)

    return (<>
        {project.name ? (
     <div className={styles.project_details}>
      <Container customClass='column'>
          {message && <Message type={type} msg={message} />}
        <div className={styles.details_container}>
        <h1>Projeto: {project.name}</h1>
        <button onClick={toggleProjectForm} className={styles.btn}>
          {!showProjectForm ? 'Editar projeto' : 'Fechar'}
        </button>
          {!showProjectForm ? 
            (<div className={styles.project_info}>
             <p>
              <span>Categoria: </span> {project.category.name}
             </p>
             <p>
              <span>Total do orçamento:</span> R${project.budget}
             </p>
             <p>
              <span>Total utilizado:</span> R${project.cost}
             </p>
             </div>)
                : (
             <div className={styles.project_info}>
                <ProjectForm handleSubmit={editPost}
                     btnText='Concluir edição'
                     projectData={project} />
             </div>
                )}
            </div>

            <div className={styles.service_form_container}>
               <h2>Adicione um serviço:</h2>
               <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
               </button>
               <div className={styles.project_info}>
                {showServiceForm && (<ServiceForm 
                 handleSubmit={createService}
                 btnText='Adicionar serviço'
                 projectData={project}
                />)}
               </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
                { services.length > 0 &&
                services.map((service) => (
                    <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                ))

                }
                {services.length === 0 && <p>Não há serviços cadastrados!</p>}
            </Container>
        </Container>
      </div>
        ) :  (<Loading />)
        }
    </>)
}

export default Projeto