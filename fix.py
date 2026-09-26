import sys

def fix_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all occurrences of the footer block first
    import re
    # We will just split by '<!-- Seccion: Contacto / Footer -->'
    parts = content.split('<!-- Seccion: Contacto / Footer -->')
    base_html = parts[0]
    
    # Base html might have </main> at the end, or multiple. Let's remove them.
    base_html = base_html.replace('</main>', '')
    base_html = base_html.strip()
    
    footer = '''
    <!-- Seccion: Contacto / Footer -->
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
    
    # We must ensure <script> and </body> are stripped from base_html since they are in footer
    base_html = re.sub(r'<script.*?</script>', '', base_html, flags=re.DOTALL)
    base_html = base_html.replace('</body>', '').replace('</html>', '').strip()
    
    final_html = base_html + "\n" + footer
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(final_html)

fix_html('D:/millers-code-web/index.html')
fix_html('D:/millers-code-web/portafolio.html')