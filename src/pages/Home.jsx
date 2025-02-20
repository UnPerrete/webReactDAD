import React, { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import ChatBox from '../chatbot/ChatBox';

export function Home() {
    const { loginData } = useContext(LoginContext)
    console.log(loginData)

    function InfoBox({ name }) {
        const [isShowed, setShowed] = useState(true);

        const handleShowed = (event) => {
            if (isShowed) {
                setShowed(false)
            } else {
                setShowed(true)
            }
            console.log(isShowed)
        }

        let info, image, clase, btn;
        if (name === 'JavaScript') {
            info = 'JavaScript es un lenguaje de programación de alto nivel, dinámico y multiplataforma, diseñado principalmente para crear contenido interactivo en sitios web. Fue desarrollado inicialmente para mejorar la funcionalidad de las páginas web, permitiendo que estas respondieran a las interacciones del usuario sin necesidad de recargar la página.';
            image = "src/images/javascript.png";
            clase = "js";
            btn = "btn btn-warning btn-sm";
        } else if (name === 'TypeScript') {
            info = 'TypeScript es un lenguaje de programación de código abierto desarrollado por Microsoft, que se basa en JavaScript, pero con una característica clave: agrega un sistema de tipos estáticos. Esto significa que TypeScript permite definir y verificar tipos de datos en tiempo de compilación, lo que ayuda a prevenir errores antes de ejecutar el código. TypeScript transpila (convierte) el código a JavaScript estándar, por lo que se puede ejecutar en cualquier entorno que soporte JavaScript, como navegadores y servidores con Node.js.';
            image = 'src/images/typescript.png';
            clase = "ts";
            btn = "btn btn-primary btn-sm";

        } else if (name === 'Node.js') {
            info = 'Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Google Chrome, diseñado para ejecutar código JavaScript fuera de un navegador. Fue creado en 2009 por Ryan Dahl y permite usar JavaScript en el backend (servidor), lo que amplía su alcance más allá del desarrollo frontend.';
            image = 'src/images/node-js.png';
            clase = "nd";
            btn = "btn btn-success btn-sm";

        }


        return (
            <>
                <button onClick={handleShowed} className={btn}> {isShowed ? "Ocultar" : "Mostrar"} </button>
                {isShowed ? 
                    <section className={clase}>
                        <h3>{name}</h3>
                        <img src={image} alt="" />
                        <p>
                            {info}
                        </p>
                    </section>
                 : <></>}
            </>
        );
    }

    return (
        <div className="container-fluid ">
            <p>Hola {loginData.user}</p>
            <div className="col">
                <div className="col border border-3 border-info rounded p-3">
                    <div className="reactinfo">
                        <img className="p-3" src="src\images\react-logo.png" alt="" width="200" height="240" />
                        <p className="text-start">
                            React es una biblioteca de JavaScript desarrollada por Meta (antes Facebook)
                            que se utiliza para construir interfaces de usuario (UI) en aplicaciones web.
                            Está diseñada para manejar la vista en el patrón MVC (Modelo-Vista-Controlador),
                            permitiendo crear aplicaciones web dinámicas, rápidas y eficientes mediante
                            componentes reutilizables. Puedes programar con React utilizando TypeScript,
                            lo cual es muy común en proyectos modernos debido a las ventajas que ofrece al
                            desarrollo de aplicaciones.
                        </p>
                    </div>
                </div>


            </div>
            <div className="infoboxes">
                <div>
                <InfoBox name="JavaScript" />
                </div>
                <div>
                <InfoBox name="TypeScript" />
                </div>
                <div>
                <InfoBox name="Node.js" />
                </div>
            </div>
            <ChatBox></ChatBox>
        </div>
    )
}

