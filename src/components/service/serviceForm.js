import { useState } from 'react'

import Input from '../form/input'
import SubmitButton from '../form/submitButton'

import styles from '../project/projectform.module.css'


function ServiceForm({ handleSubmit, btnText, projectData }){

    const [service, setService] = useState({})

 function submit(e){
    e.preventDefault()
    console.log(projectData)
    projectData.services.push(service)
    handleSubmit(projectData)
 }

 function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value})
 }

  return (
    <form onSubmit={submit} className={styles.form}>
       <Input 
         type='text'
         text='nome do serviço'
         name='name'
         placeholder='Insira o nome do serviço'
         handleOnChange={handleChange}
       />

       <Input 
         type='number'
         text='custo de serviço'
         name='cost'
         placeholder='Insira o valor total'
         handleOnChange={handleChange}
        />

       <Input 
         type='text'
         text='descrição do serviço'
         name='description'
         placeholder='Descreva o serviço'
         handleOnChange={handleChange}
        />
        <SubmitButton text={btnText} />
    </form>
   )
}

export default ServiceForm