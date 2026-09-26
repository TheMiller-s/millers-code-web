content = open('D:/millers-code-web/portafolio.html', 'r', encoding='utf-8').read()
content = content.split('<!-- Seccion: Contacto / Footer -->')[0].replace('</main>', '').replace('</body>', '').replace('</html>', '')
import re
content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
content = content.strip()

footer = '''
    <!-- Seccion: Contacto / Footer (CORRECTAMENTE DENTRO DEL MAIN) -->
    <section id="contacto" style="padding: 120px 40px 80px; text-align: center; background: #050505; color: #fff; pointer-events: auto; position: relative; z-index: 10;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; letter-spacing: -2px; margin-bottom: 20px;">¿Listo para evolucionar?</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 1.15rem; line-height: 1.6; margin-bottom: 40px;">
          Escríbenos directamente a WhatsApp. Te responderemos en minutos para agendar una consultoría técnica gratuita y analizar la viabilidad de tu proyecto.
        </p>
        <a href="https://wa.me/593978961548?text=Hola%20Miller's%20Code,%20vengo%20de%20su%20página%20web%20y%20me%20gustaría%20iniciar%20un%20proyecto." target="_blank" class="liquid-button" style="background: #fff; color: #000; font-size: 1.1rem; padding: 15px 40px; display: inline-block;">
          Chatear por WhatsApp
        </a>
      </div>
      
      <div style="margin-top: 100px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; font-size: 0.9rem; color: rgba(255,255,255,0.4);">
        <div style="font-weight: 600; color: #fff;">Miller's<span style="color: rgba(255,255,255,0.5);">Code.</span></div>
        <div>© 2024. Todos los derechos reservados.</div>
        <div>Ecuador — Base de Operaciones</div>
      </div>
    </section>

  </main>

  <script src="js/main.js"></script>
</body>
</html>
'''
with open('D:/millers-code-web/portafolio.html', 'w', encoding='utf-8') as f:
    f.write(content + '\n' + footer)