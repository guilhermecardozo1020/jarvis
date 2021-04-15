import React from 'react'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
import ImagemBanner from '../images/banner_home_background.jpg';
export default function Home() {
    return (
        <div>
            <Banner title="Olá, Diogo" 
            description= "Gerencie as jornadas de trabalho dos colaboradores com o Jarvis!" 
            image={ImagemBanner}
            imageText="Imagem ilustrativa pessoa usando notebook"/>
            <Menu tabAtiva={0}></Menu>
        </div>
    )
}