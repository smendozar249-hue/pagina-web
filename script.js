/* =========================================
   CUIDEMOS LO PÚBLICO
   INEM FRANCISCO DE PAULA SANTANDER
========================================= */


/* =========================================
   COMPROMISOS
========================================= */

function guardarCompromiso() {

    const nombre =
        document.getElementById("nombreCompromiso").value.trim();

    const compromiso =
        document.getElementById("textoCompromiso").value.trim();


    if (nombre === "" || compromiso === "") {

        alert("Por favor escribe tu nombre y tu compromiso.");

        return;
    }


    const contenedor =
        document.getElementById("listaCompromisos");


    const nuevoCompromiso =
        document.createElement("div");


    nuevoCompromiso.className =
        "compromiso-publicado";


    nuevoCompromiso.innerHTML = `
        <strong>${escapeHTML(nombre)}</strong>
        <p>${escapeHTML(compromiso)}</p>
    `;


    contenedor.prepend(nuevoCompromiso);


    document.getElementById("nombreCompromiso").value = "";

    document.getElementById("textoCompromiso").value = "";

}


/* =========================================
   SEGURIDAD PARA TEXTO INGRESADO
========================================= */

function escapeHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


/* =========================================
   RESPUESTAS CORRECTAS
========================================= */

const respuestasCorrectas = {

    p1: "b",

    p2: "c",

    p3: "a",

    p4: "b",

    p5: "c",

    p6: "a",

    p7: "b",

    p8: "a",

    p9: "a",

    p10: "c"

};


/* =========================================
   CALIFICAR EVALUACIÓN
========================================= */

function calificar() {

    const nombre =
        document.getElementById("nombreEstudiante").value.trim();

    const curso =
        document.getElementById("cursoEstudiante").value.trim();


    /* Comprobar datos */

    if (nombre === "" || curso === "") {

        alert(
            "Por favor escribe tu nombre completo y tu curso antes de realizar la evaluación."
        );

        return;
    }


    let correctas = 0;

    let respondidas = 0;


    /* Revisar las 10 preguntas */

    for (let i = 1; i <= 10; i++) {

        const seleccion =
            document.querySelector(
                `input[name="p${i}"]:checked`
            );


        if (seleccion) {

            respondidas++;


            if (
                seleccion.value ===
                respuestasCorrectas[`p${i}`]
            ) {

                correctas++;

            }

        }

    }


    /* Si faltan preguntas */

    if (respondidas < 10) {

        alert(
            `Has respondido ${respondidas} de 10 preguntas. Debes responder todas antes de calificar.`
        );

        return;
    }


    /* Calcular porcentaje */

    const porcentaje =
        Math.round((correctas / 10) * 100);


    const resultado =
        document.getElementById("resultado");


    resultado.style.display = "block";


    /* =====================================
       APROBADO
    ===================================== */

    if (porcentaje >= 80) {

        resultado.className =
            "resultado aprobado";


        resultado.innerHTML = `
            🎉 ¡Felicitaciones, ${escapeHTML(nombre)}!
            <br><br>
            Obtuviste <strong>${porcentaje}%</strong>.
            <br>
            Has aprobado la evaluación.
            <br><br>
            Tu certificado ha sido generado.
        `;


        generarCertificado(
            nombre,
            curso,
            porcentaje
        );


        document
            .getElementById("certificado")
            .classList.remove("oculto");


        document
            .getElementById("botonImprimir")
            .classList.remove("oculto");


        setTimeout(() => {

            document
                .getElementById("certificado")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 300);

    }


    /* =====================================
       NO APROBADO
    ===================================== */

    else {

        resultado.className =
            "resultado reprobado";


        resultado.innerHTML = `
            📚 Obtuviste <strong>${porcentaje}%</strong>.
            <br><br>
            Aún no alcanzas el 80 % necesario para aprobar.
            <br>
            Debes revisar nuevamente los contenidos
            y presentar otra vez la evaluación.
        `;


        document
            .getElementById("certificado")
            .classList.add("oculto");


        document
            .getElementById("botonImprimir")
            .classList.add("oculto");


        resultado.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   GENERAR CERTIFICADO
========================================= */

function generarCertificado(
    nombre,
    curso,
    porcentaje
) {

    document.getElementById(
        "certNombre"
    ).textContent = nombre;


    document.getElementById(
        "certCurso"
    ).textContent = curso;


    document.getElementById(
        "certPorcentaje"
    ).textContent = porcentaje + "%";


    const fecha = new Date();


    const opciones = {

        day: "2-digit",

        month: "2-digit",

        year: "numeric"

    };


    const fechaFormateada =
        fecha.toLocaleDateString(
            "es-CO",
            opciones
        );


    document.getElementById(
        "certFecha"
    ).textContent = fechaFormateada;

}


/* =========================================
   IMPRIMIR CERTIFICADO
========================================= */

function imprimirCertificado() {

    window.print();

}
