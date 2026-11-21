---
title: "Título do tutorial, com o problema e o sistema"
description: "Resumo único, entre 70 e 180 caracteres, dizendo o que a pessoa resolve e em quais celulares. Sem aspas internas."
category: "dicas-e-recursos"
published: "2026-11-21"
updated: "2026-11-21"
cover: "/images/covers/nome-do-arquivo-sem-extensao"
coverAlt: "Descrição objetiva da ilustração, sem tratar a arte como foto real do aplicativo."
featured: 5
draft: true
howto:
  - name: "Primeiro passo seguro"
    text: "Frase completa, com o que fazer e o que não apagar. O texto entra na lista do topo do artigo e no campo hasPart do JSON-LD Article. Mínimo de quarenta caracteres."
  - name: "Segundo passo"
    text: "Outro passo completo. Se o comando apaga conversa, o aviso precisa estar nesta frase, não só no texto longo."
  - name: "Onde parar"
    text: "Diga quando partir para o suporte do fabricante ou da Central de Ajuda, sem indicar APK, mod ou aplicativo de monitoramento."
sources:
  - title: "Nome da página oficial"
    url: "https://faq.whatsapp.com/?locale=pt_BR"
---

O arquivo de verdade fica em `src/content/articles/`, com `draft: false` ou sem o campo draft. Este modelo está fora dessa pasta de propósito, para não virar página.

Escreva em português do Brasil, em segunda pessoa, sem depoimento e sem número que você não tenha lido numa fonte. Se o menu muda de aparelho, diga isso no parágrafo, não só no componente fixo do layout.

Use um blockquote começando com "Cuidado:" antes de limpar dados, desinstalar, apagar backup ou limpar a conversa inteira.

Link interno no formato `/categoria/slug/`, com barra no fim. Link externo aponta para a página oficial que você abriu. Não copie o texto dela.

A capa precisa existir em quatro arquivos, gerados por `npm run images` a partir de um SVG em `src/assets/illustrations/`:

- `/images/covers/nome.png`
- `/images/covers/nome.webp`
- `/images/covers/nome-800.png`
- `/images/covers/nome-800.webp`

O PNG grande tem 1920×1080. A arte é original. Não use print, foto de banco ou logotipo de terceiro.
