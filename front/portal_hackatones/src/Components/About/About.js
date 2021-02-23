import './About.css'
import us from './images/us.jpg'
import coding from './images/coding.jpg'

function About () {

   


    return(
       
        <div className="about-container">
            <h1 className="about-title">Quienes somos?</h1>
            <img className="about-picture" src={us}/>
            <p> 
                Somos un grupo de jóvenes con una con varios años de experiencia en el mundo de la
                programación y el desarrollo web. Entre nuestros integrantes hay desde expertos en bases de datos 
                hasta diseñadores gráficos y por supuesto programadores.
            </p>
            <img className="about-picture" src={coding}/>
            <p> 
                Si algo nos ha unido aquí es nuestra pasión por los hackathones.
                Nos encanta participar y compartir ideas y conocimiento con otros apasionados de 
                la programación .
                <br></br>
                Echabamos en falta un punto de encuentro en el que poder compartir los hackathones que 
                organizamos y a la vez inscribirnos en hackathones de otras personas.
                <br></br>
                Y así se nos ocurrió la idea de crear esta web.
                Esperamos que os sea de ayuda y nos vemos por los hackathones.
                <br></br>
                <br></br>
                Saludos del equipo de Hackathon Place!!!
            </p>
        </div>
       
    )

}

export default About
