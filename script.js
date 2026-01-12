// Lógica de visibilidad del botón Volver Arriba
        window.onscroll = function() {
            const btn = document.getElementById('scrollTopBtn');
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        };

        // Lógica Genérica de Modales con Animación Suave (Basada en tu selección)
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('active');
            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modal.style.display = 'none';
                }
            }, 400); 
            document.body.style.overflow = 'auto';
        }

        // Wrapper para Lightbox específico
        function openLightbox(url) {
            const img = document.getElementById('lightbox-img');
            img.src = url;
            openModal('lightbox');
        }

        // Lógica de Lightbox Mejorada con Animación Suave
        function openLightbox(url) {
            const lightbox = document.getElementById('lightbox');
            const img = document.getElementById('lightbox-img');            
            img.src = url;
            
            // Primero mostramos el contenedor
            lightbox.style.display = 'flex';
            
            // Pequeño timeout para permitir que el navegador registre el display antes de animar la opacidad
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            
            // Esperamos a que termine la animación de opacidad para ocultar el display
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightbox.style.display = 'none';
                }
            }, 400); // Coincide con el tiempo de transición de CSS
            
            document.body.style.overflow = 'auto';
        }

        // --- Funciones del Modal Gemini (Nuevo) ---

        function showGeminiModal() {
            document.getElementById('geminiModal').classList.remove('hidden');
            document.getElementById('geminiModal').classList.add('flex');
        }

        function hideGeminiModal() {
            document.getElementById('geminiModal').classList.add('hidden');
            document.getElementById('geminiModal').classList.remove('flex');
        }

        function openGeminiAnalysis(projectTitle) {
            const modalTitle = document.getElementById('geminiModalTitle');
            const modalContent = document.getElementById('geminiModalContent');
            
            modalTitle.textContent = `Insight sobre: ${projectTitle}`;

            // Mostrar estado de carga (Spinner)
            modalContent.innerHTML = `
                <div class="text-center">
                    <div class="spinner"></div>
                    <p class="text-lg opacity-80">Analizando las últimas tendencias de marketing...</p>
                </div>
            `;
            showGeminiModal();

            // Llamar a la función de análisis
            generateAnalysis(projectTitle);
        }

        async function generateAnalysis(projectTitle) {
            const modalContent = document.getElementById('geminiModalContent');
            const systemPrompt = "Actúa como un consultor de marketing de alto nivel. Genera un resumen ejecutivo conciso (máximo 40 palabras) y un hallazgo clave (Key Takeaway) para un proyecto de marketing digital sobre el tema proporcionado. Responde en español y usa formato Markdown. El título del hallazgo clave debe ser 'Hallazgo Clave'.";
            const userQuery = `Analiza las tendencias de mercado y genera un resumen ejecutivo sobre el siguiente tipo de proyecto: ${projectTitle}.`;

            const { text, sources } = await geminiApiCall(userQuery, systemPrompt);

            // Reemplazar spinner con contenido
            let htmlContent = `<div class="p-4">${text.replace(/\n/g, '<br>')}</div>`;

            if (sources.length > 0) {
                const sourceList = sources.map(source => 
                    `<li class="text-xs opacity-60 truncate"><a href="${source.uri}" target="_blank" class="hover:underline">${source.title}</a></li>`
                ).join('');
                htmlContent += `
                    <div class="mt-4 pt-4 border-t border-dark-green text-left">
                        <p class="text-sm font-semibold mb-2">Fuentes Consultadas:</p>
                        <ul class="list-disc ml-4 space-y-1">${sourceList}</ul>
                    </div>
                `;
            }

            modalContent.innerHTML = htmlContent;
        }


        // Script para cambiar la opacidad de la barra de navegación al hacer scroll (efecto Apple)
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                // Barra de navegación con más transparencia al bajar (más líquido)
                nav.style.backgroundColor = 'rgba(3, 34, 33, 0.6)'; 
            } else {
                // Barra de navegación con menos transparencia al inicio
                nav.style.backgroundColor = 'rgba(3, 34, 33, 0.4)';
            }
        });