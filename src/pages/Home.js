import React from 'react'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
export default function Home() {
    return (
        <div>
            <Banner title="Olá, Diogo" 
            description= "Gerencie as jornadas de trabalho dos colaboradores com o Jarvis!" 
            image="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
            imageText="Imagem ilustrativa pessoa usando notebook"/>
            <Menu></Menu>
        </div>
    )
}