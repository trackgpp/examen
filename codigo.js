document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Diálogo de bienvenida
    const welcomeMessage = "¡Hola! Soy Vocatech, tu asistente para explorar las especialidades de ingeniería. ¿En qué puedo ayudarte hoy?";
    appendBotMessage(welcomeMessage);

    sendButton.addEventListener('click', function() {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            appendUserMessage(userMessage);
            processUserMessage(userMessage);
            userInput.value = '';
        }
    });

    function appendBotMessage(message) {
        const botMessage = document.createElement('div');
        botMessage.classList.add('chat-message', 'bot');
        botMessage.textContent = message;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function processUserMessage(message) {
        // Lista de palabras clave y respuestas específicas
        const keywords = {
          "hola":"hola cómo estás?",
          "bien":"comencemos con las preguntas",
          "ingeniería": "La ingeniería es una disciplina que aplica principios científicos y matemáticos para resolver problemas y diseñar soluciones.",
            "especialidades": "Existen muchas especialidades en ingeniería, como civil, industrial, informática, geología, minería y más.",
            "civil": "La ingeniería civil se enfoca en la planificación y diseño de proyectos de construcción, como carreteras, puentes y edificios.",
            "industrial": "La ingeniería industrial se centra en la eficiencia de los procesos y la gestión de recursos en la producción.",
            "informática": "La ingeniería informática se dedica al desarrollo de software, sistemas y tecnologías de la información.",
            "geología": "La geología se ocupa del estudio de la Tierra y los procesos geológicos, importante en la exploración de recursos naturales.",
            "minería": "La ingeniería de minería se relaciona con la extracción de minerales y su procesamiento.",
            "obras civiles": "Las obras civiles abarcan proyectos de construcción y mantenimiento de infraestructura pública y privada.",
            "años de estudio": "El estudio en ingeniería puede ser riguroso y requiere dedicación a las materias técnicas y científicas.",
            "universidades en chile": "Chile cuenta con varias universidades que ofrecen programas de ingeniería de alta calidad.",
            "desempeño": "El desempeño en ingeniería puede variar según la dedicación y el compromiso con el aprendizaje.",
            "malla curricular": "La malla curricular es el plan de estudios que guía las materias y cursos durante la carrera.",
            "carrera profesional": "La carrera profesional en ingeniería ofrece oportunidades emocionantes para diseñar y crear soluciones innovadoras en diversos campos.",
            "campus": "Los campus universitarios de ingeniería están equipados con laboratorios de vanguardia y recursos para potenciar el aprendizaje.",
            "tecnología": "La ingeniería está estrechamente relacionada con la tecnología y abre puertas a la creación de dispositivos avanzados y sistemas inteligentes.",
            "programación": "La programación es una habilidad esencial para los ingenieros de software que desarrollan aplicaciones y sistemas informáticos.",
            "proyectos": "La gestión de proyectos es clave en la ingeniería para planificar y ejecutar proyectos de construcción, diseño y desarrollo.",
            "prácticas profesionales": "Las prácticas profesionales permiten a los futuros ingenieros adquirir experiencia práctica en la industria.",
            "laboratorio": "Los laboratorios de ingeniería son lugares donde los estudiantes pueden experimentar y aplicar conceptos teóricos en entornos controlados.",
            "matemáticas": "Las matemáticas desempeñan un papel fundamental en la resolución de problemas y el análisis de datos en ingeniería.",
            "física": "La física es una ciencia esencial para comprender los principios detrás de las máquinas y sistemas en ingeniería.",
            "química": "La química es relevante en la ingeniería química y de materiales, donde se crean productos y materiales innovadores.",
            "electrónica": "La electrónica es clave en la ingeniería eléctrica y electrónica, que abarca desde circuitos simples hasta dispositivos complejos.",
            "robótica": "La robótica es una especialidad fascinante que combina la ingeniería con la creación de máquinas autónomas y robots.",
            "energías renovables": "La ingeniería en energías renovables se centra en desarrollar fuentes limpias y sostenibles de energía.",
            "sistemas de información": "La ingeniería de sistemas de información se enfoca en diseñar sistemas de software eficientes y seguros.",
            "medio ambiente": "La ingeniería ambiental busca soluciones para preservar y proteger nuestro entorno natural.",
            "seguridad industrial": "La seguridad industrial es crucial en la ingeniería para prevenir accidentes y garantizar lugares de trabajo seguros.",
            "investigación": "La investigación en ingeniería impulsa la innovación y el desarrollo de nuevas tecnologías.",
            "tesis": "Escribir una tesis en ingeniería es una oportunidad para investigar a fondo un tema de interés y contribuir al campo.",
            "seminarios": "Los seminarios de ingeniería son espacios donde se discuten temas especializados y se fomenta la colaboración.",
            "cálculo": "El cálculo es una herramienta fundamental para resolver problemas complejos en ingeniería y ciencias aplicadas.",
            "diseño": "El diseño en ingeniería se relaciona con la creación de productos, sistemas y estructuras funcionales y estéticas.",
            "estructuras": "El diseño de estructuras es esencial en la ingeniería civil para construir edificios y puentes seguros y eficientes.",
            "control de calidad": "El control de calidad asegura que los productos y proyectos de ingeniería cumplan con estándares y requisitos exigentes.",
            "recursos naturales": "La ingeniería de recursos naturales se centra en la gestión sostenible de los recursos naturales del planeta.",
            "geotecnia": "La geotecnia es una rama de la ingeniería que se enfoca en la mecánica de suelos y rocas en la construcción y la minería.",
            "sismología": "La sismología es esencial en la ingeniería sísmica para diseñar estructuras resistentes a los terremotos.",
            "topografía": "La topografía es clave en la ingeniería civil para la medición y mapeo del terreno en proyectos de construcción.",
            "programas de estudio": "Los programas de estudio en ingeniería ofrecen una variedad de especialidades y oportunidades de aprendizaje.",
            "exámenes": "Los exámenes son parte de la evaluación en la educación en ingeniería para medir el conocimiento y las habilidades.",
            "tareas": "Las tareas y proyectos en ingeniería desafían a los estudiantes a aplicar conceptos y resolver problemas prácticos.",
            "proyectos finales": "Los proyectos finales en ingeniería permiten a los estudiantes demostrar su capacidad para aplicar lo aprendido en situaciones reales.",
            "becas": "Las becas en ingeniería ayudan a aliviar la carga financiera de los estudiantes y fomentan la excelencia académica.",
            "conferencias": "Las conferencias en ingeniería brindan la oportunidad de aprender de expertos y mantenerse actualizado sobre avances en el campo.",
            "asesoramiento": "El asesoramiento académico es importante para guiar a los estudiantes hacia el éxito en su carrera de ingeniería.",
            "publicaciones": "Las publicaciones científicas y técnicas son una forma de compartir investigaciones y avances en ingeniería.",
            "oportunidades laborales": "La ingeniería ofrece diversas oportunidades laborales en industrias como la manufactura, la tecnología y la energía.",
            "futuro en ingeniería": "El futuro en ingeniería es prometedor, con desafíos y oportunidades para contribuir al progreso de la sociedad.",
            "ingeniería mecánica": "La ingeniería mecánica se enfoca en diseñar y desarrollar sistemas y máquinas que involucran movimiento y energía.",
            "ingeniería eléctrica": "La ingeniería eléctrica se ocupa de la generación, transmisión y uso de la energía eléctrica en una amplia gama de aplicaciones.",
            "ingeniería civil": "La ingeniería civil se dedica a la planificación y construcción de infraestructuras, como carreteras, puentes y edificios.",
            "ingeniería química": "La ingeniería química se centra en procesos de transformación química y en la producción de productos químicos.",
            "ingeniería industrial": "La ingeniería industrial se encarga de optimizar sistemas y procesos para mejorar la eficiencia y la productividad.",
            "ingeniería aeroespacial": "La ingeniería aeroespacial se relaciona con el diseño y la fabricación de aeronaves y sistemas espaciales.",
            "ingeniería de software": "La ingeniería de software se dedica a desarrollar aplicaciones y sistemas informáticos confiables y eficientes.",
            "ingeniería biomédica": "La ingeniería biomédica combina la ingeniería con la biología para crear dispositivos médicos y tecnologías de salud.",
            "ingeniería de telecomunicaciones": "La ingeniería de telecomunicaciones se enfoca en la transmisión de información a través de redes de comunicación.",
            "ingeniería ambiental": "La ingeniería ambiental busca soluciones sostenibles para proteger y preservar el entorno natural.",
            "ingeniería de minas": "La ingeniería de minas se dedica a la extracción y procesamiento de minerales y recursos naturales.",
            "ingeniería nuclear": "La ingeniería nuclear se ocupa de la energía nuclear y sus aplicaciones en medicina e industria.",
            "ingeniería petrolera": "La ingeniería petrolera se enfoca en la exploración y producción de petróleo y gas natural."
        
};

        // Busca si el mensaje del usuario contiene una palabra clave y proporciona la respuesta correspondiente
        for (const keyword in keywords) {
            if (message.toLowerCase().includes(keyword)) {
                appendBotMessage(keywords[keyword]);
                return; // Detiene la búsqueda después de encontrar una coincidencia
            }
        }

        // Respuesta genérica si no se encuentra una palabra clave.
        appendBotMessage('Lo siento, no entiendo. ¿Puedes reformular tu pregunta o elegir una palabra clave de la lista?');
    }
});
