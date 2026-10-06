/* ==========================================
   MENÚ MÓVIL
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* ==========================================
   CERRAR MENÚ AL HACER CLICK
========================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon =
            menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   MODO OSCURO / CLARO
========================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const lightMode =
        document.body.classList.contains("light-mode");


    if (lightMode) {

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fas fa-moon"></i>';

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

});


/* ==========================================
   AÑO AUTOMÁTICO
========================================== */

const year =
    document.getElementById("year");

year.textContent =
    new Date().getFullYear();


/* ==========================================
   ANIMACIÓN DE HABILIDADES
========================================== */

const progressBars =
    document.querySelectorAll(".progress-bar");


const progressObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar =
                        entry.target;

                    const progress =
                        bar.dataset.progress;

                    bar.style.width =
                        progress + "%";

                }

            });

        },
        {
            threshold: 0.5
        }
    );


progressBars.forEach(bar => {

    progressObserver.observe(bar);

});


/* ==========================================
   NAVEGACIÓN ACTIVA
========================================== */

const sections =
    document.querySelectorAll("section");

const navigationLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   FORMULARIO
========================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;


        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            alert(
                "Por favor completa todos los campos."
            );

            return;

        }


        const phone =
            "51900136139"; // Reemplaza con tu número de WhatsApp en formato internacional sin el signo "+"


        const text =
            `Hola, soy ${name}.%0A%0A` +
            `Mi correo es: ${email}%0A%0A` +
            `Mi proyecto:%0A${message}`;


        const whatsappURL =
            `https://wa.me/${51900136139}?text=${text}`;


        window.open(
            whatsappURL,
            "_blank"
        );

        contactForm.reset();

    }
);


/* ==========================================
   EFECTO REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .service-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});


/* ==========================================
   EFECTO TYPING
========================================== */

const heroTitle =
    document.querySelector(".hero h2");

const originalTitle =
    heroTitle.textContent.trim();

const titles = [

    "Desarrollador de Software",

    "Desarrollador Web",

    "Programador en formación",

    "Creador de soluciones digitales"

];


let titleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentTitle =
        titles[titleIndex];


    if (!deleting) {

        heroTitle.textContent =
            currentTitle.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentTitle.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1800
            );

            return;

        }

    } else {

        heroTitle.textContent =
            currentTitle.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            titleIndex++;

            if (
                titleIndex >=
                titles.length
            ) {

                titleIndex = 0;

            }

        }

    }


    const speed =
        deleting ? 50 : 90;

    setTimeout(
        typeEffect,
        speed
    );

}


setTimeout(
    typeEffect,
    1500
);
/* ==========================================
   CARGAR PROYECTOS ESPECÍFICOS DE GITHUB
========================================== */

const GITHUB_USERNAME = "jhericohuamanquispe-lgtm"; // <--- Tu usuario de GitHub

// Escribe los nombres EXACTOS de los repositorios que quieres mostrar
const PROYECTOS_SELECCIONADOS = [
    "WEB-DE-EMPRESA",
    "",
    
];

async function cargarProyectosWeb() {
    const container = document.getElementById("github-projects");

    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        
        if (!response.ok) throw new Error("Error al consultar la API de GitHub");
        
        const repos = await response.json();
        
        // Filtramos para incluir SOLO los repositorios de tu lista personalizada
        const misWebs = repos.filter(repo => PROYECTOS_SELECCIONADOS.includes(repo.name));

        container.innerHTML = ""; 

        misWebs.forEach(repo => {
            const demoUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}/`;

            const card = `
                <article class="project-card">
                    <div class="project-content">
                        <span class="project-category">${repo.language || 'Desarrollo Web'}</span>
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'Página web desarrollada y alojada en GitHub.'}</p>
                        
                        <div class="project-tech">
                            <span>${repo.language || 'HTML/CSS'}</span>
                        </div>

                        <div class="project-buttons">
                            <a href="${demoUrl}" target="_blank" class="btn btn-primary btn-sm">
                                Ver Demo <i class="fas fa-external-link-alt"></i>
                            </a>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-secondary btn-sm">
                                Código <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </article>
            `;
            container.innerHTML += card;
        });

    } catch (error) {
        container.innerHTML = "<p style='text-align:center;'>No se pudieron cargar las páginas web seleccionadas.</p>";
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", cargarProyectosWeb);