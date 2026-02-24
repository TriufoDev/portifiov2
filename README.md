# Portfólio - Mateus Triunfo | <TRIUNFO.DEV/>

Portfólio profissional de desenvolvedor Full Stack com design moderno, tema dark/light e recursos avançados de SEO.

## 🚀 Recursos Implementados

### ✨ Funcionalidades
- ✅ Tema Dark/Light com salvamento de preferência
- ✅ Animações suaves ao scroll (Intersection Observer)
- ✅ Efeito Parallax no hero e imagens
- ✅ Menu responsivo para mobile
- ✅ Formulário de contato via WhatsApp
- ✅ Botão flutuante do WhatsApp
- ✅ SEO otimizado
- ✅ Google Analytics integrado
- ✅ Schema.org structured data
- ✅ Open Graph tags (Facebook/Twitter)

### 📊 Google Analytics - Configuração

**IMPORTANTE:** Substitua `G-XXXXXXXXXX` pelo seu ID real do Google Analytics.

#### Como obter seu ID do Google Analytics:

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma conta (se não tiver)
3. Crie uma propriedade para seu site
4. Copie o ID no formato `G-XXXXXXXXXX`
5. Edite o arquivo `index.html` e substitua nas duas ocorrências:
   - Linha ~30: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
   - Linha ~35: `gtag('config', 'G-XXXXXXXXXX');`

#### Eventos Rastreados:
- ✅ Cliques em links externos
- ✅ Cliques no botão WhatsApp flutuante
- ✅ Cliques nos botões CTA
- ✅ Envio de formulário
- ✅ Profundidade de scroll (25%, 50%, 75%, 100%)
- ✅ Navegação entre seções

### 🎯 SEO - Técnicas Implementadas

#### Meta Tags Básicas
- Description otimizada com palavras-chave locais
- Keywords relevantes
- Canonical URL
- Robots meta tag
- Language e revisit-after

#### SEO Local
- Geo tags (região e cidade)
- Endereço estruturado no Schema.org
- Informações de contato locais

#### Open Graph (Redes Sociais)
- Facebook/WhatsApp preview otimizado
- Twitter Card configurado
- Imagem de preview personalizada

#### Schema.org Structured Data
- Tipo: Person
- Dados profissionais estruturados
- Habilidades e competências
- Informações de contato

#### Melhorias Técnicas de SEO
- HTML semântico (header, nav, section, article, footer)
- Alt text em todas as imagens
- Heading hierarchy correta (H1 > H2 > H3)
- URLs amigáveis
- Lazy loading de imagens
- Performance otimizada

### 📱 Botão WhatsApp Flutuante

- Posicionado fixo no canto inferior direito
- Animação de pulse para chamar atenção
- Link direto com mensagem pré-formatada
- Totalmente responsivo
- Cor oficial do WhatsApp (#25D366)

### 🎨 Personalização

#### Alterar Cores do Tema
Edite as variáveis CSS no início do arquivo `style.css`:

```css
:root {
    --accent-primary: #06b6d4;    /* Cor principal */
    --accent-secondary: #0891b2;   /* Cor secundária */
    --bg-primary: #0a0e27;         /* Fundo principal (dark) */
    /* ... outras cores */
}
```

#### Alterar Informações
- **Contato:** Edite o HTML nas seções de contato
- **Projetos:** Adicione/remova cards na seção de projetos
- **Habilidades:** Modifique as barras de progresso
- **Experiência:** Atualize a timeline

### 📁 Estrutura de Arquivos

```
portifolio/
├── index.html          # Estrutura HTML
├── style.css           # Estilos e tema
├── script.js           # JavaScript interativo
├── mateus.png          # Foto de perfil
├── assets/             # Imagens dos projetos
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   └── project4.jpg
└── README.md          # Este arquivo
```

### 🌐 Deploy

Para publicar seu portfólio online:

#### Opção 1: GitHub Pages (Grátis)
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará em `https://seu-usuario.github.io/repositorio`

#### Opção 2: Vercel (Grátis)
1. Instale Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções

#### Opção 3: Netlify (Grátis)
1. Arraste a pasta no [Netlify Drop](https://app.netlify.com/drop)
2. Pronto!

### ⚠️ Checklist Antes do Deploy

- [ ] Substituir ID do Google Analytics
- [ ] Atualizar URLs nas meta tags Open Graph
- [ ] Verificar todas as informações de contato
- [ ] Testar formulário WhatsApp
- [ ] Adicionar imagens reais dos projetos
- [ ] Testar em diferentes dispositivos
- [ ] Validar HTML/CSS no [W3C Validator](https://validator.w3.org/)
- [ ] Testar velocidade no [PageSpeed Insights](https://pagespeed.web.dev/)

### 📞 Contato

- **Email:** triunfo.ti121@gmail.com
- **WhatsApp:** +55 (35) 91018-1807
- **Localização:** Pouso Alegre, MG - Jardim Aeroporto

### 🔧 Tecnologias Utilizadas

- HTML5 Semântico
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Google Analytics
- Schema.org
- Open Graph Protocol
- Intersection Observer API
- Local Storage API

---

Desenvolvido por **Mateus Triunfo** 🚀
