import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to Machine Learning Projects. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web' ?
            <ToggleButton active value="web" onClick={() => setToggle('web')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web" onClick={() => setToggle('web')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'designs' ?
            <ToggleButton active value="designs" onClick={() => setToggle('designs')}>UI/UX Designs</ToggleButton>
            :
            <ToggleButton value="designs" onClick={() => setToggle('designs')}>UI/UX Designs</ToggleButton>
          }
          <Divider />
          {toggle === 'ml' ?
            <ToggleButton active value="ml" onClick={() => setToggle('ml')}>MACHINE LEARNING</ToggleButton>
            :
            <ToggleButton value="ml" onClick={() => setToggle('ml')}>MACHINE LEARNING</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects