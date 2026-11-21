# MarkTech

Site estático, em português, com tutoriais de WhatsApp no Android para Samsung (One UI), Motorola e Xiaomi (HyperOS ou MIUI). O MarkTech é independente: não tem vínculo com o WhatsApp nem com a Meta.

Não há banner de demonstração e as páginas públicas não usam `noindex`. A única exceção é a página 404, que responde como erro e pede para não ser indexada.

## Requisitos

- Node.js 22 ou mais novo
- npm

## Como rodar

```bash
npm install
npm run images   # só se for recriar as capas a partir dos SVG
npm run dev
```

O endereço local aparece no terminal, em geral `http://127.0.0.1:4321/`.

Para gerar o site e conferir links, JSON-LD, robots e capas:

```bash
npm run build
npm run verify
npm run preview
```

`npm run verify` lê a pasta `dist/`. Ele falha se faltar página, se um link interno quebrar, se o JSON-LD de artigo não tiver `Article`, `HowTo` e `BreadcrumbList`, se alguma página comum estiver com `noindex`, ou se aparecer script de anúncio.

## URL do site

Canonical, Open Graph, sitemap, `robots.txt` e JSON-LD usam a origem definida em `PUBLIC_SITE_URL`.

1. Copie `.env.example` para `.env` (o `.env` não entra no Git).
2. Ajuste o valor, só a origem, sem caminho e sem barra no final. Exemplo: `https://www.seudominio.com.br`.
3. Rode o build de novo.

Sem essa variável, o build usa o placeholder `https://marktech.example` e avisa no terminal. Troque antes de apontar um domínio. Não coloque segredo nesse valor: é uma URL pública.

Na Vercel, a mesma variável pode ser configurada no projeto, para Production e Preview. Este repositório não cria essa configuração e não faz deploy.

## Como publicar um artigo novo

1. Copie `src/content/templates/artigo.md` para `src/content/articles/slug-do-texto.md`. O nome do arquivo vira o slug. A URL fica `/categoria/slug/`.
2. Preencha o front matter. `category` é uma destas: `nao-funciona`, `backup-e-conversas`, `espaco-e-armazenamento`, `audio-e-mensagens`, `dicas-e-recursos`.
3. `description` é única, entre 70 e 180 caracteres.
4. Se houver passo a passo, preencha `howto`. Esses passos aparecem no topo do artigo e no JSON-LD `HowTo`. O aviso de passo que apaga conversa tem de estar no texto do passo, não só no miolo.
5. Liste em `sources` as páginas oficiais que você abriu. Não invente número, depoimento ou caminho de menu.
6. Crie um SVG original em `src/assets/illustrations/`, mapeie o nome em `scripts/render-images.mjs` e rode `npm run images`. A capa precisa de PNG e WebP em 1920×1080 e de uma variante de 800 px. Nada de foto de terceiros, print ou logotipo de WhatsApp, Meta, Google, Samsung, Motorola ou Xiaomi.
7. Deixe `draft: false` ou apague o campo. `draft: true` não gera página.
8. Rode `npm run build` e `npm run verify`.

O aviso de site independente já sai no rodapé de todas as páginas e de novo no corpo do artigo. Não remova essa frase.

## Imagens

Origem, paleta e licença de uso no site: `src/assets/illustrations/ORIGEM.md`. Os SVG são a fonte. PNG e WebP em `public/` são gerados.

## SEO técnico

- `@astrojs/sitemap` gera `sitemap-index.xml` e `sitemap-0.xml`.
- `robots.txt` é gerado no build, com `Allow: /` e a linha `Sitemap:` apontando para o índice.
- Na Vercel, `/sitemap.xml` redireciona para `/sitemap-index.xml` (`vercel.json`).
- Cada página tem `title`, `description`, canonical, Open Graph, Twitter e JSON-LD.
- Artigos acrescentam `Article`, `HowTo` (quando há `howto`) e `BreadcrumbList`.
- Organização, site e a pessoa responsável (Marcos) entram no grafo de todas as páginas.

## Segurança

`vercel.json` envia, em todas as rotas:

- `Content-Security-Policy` sem script externo. `script-src` e `style-src` ficam em `'self'`. `frame-ancestors 'none'`. `form-action 'none'`, porque não há formulário.
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` com câmera, microfone e localização desligados.

O `astro dev` e o `astro preview` repetem esses cabeçalhos, sem `upgrade-insecure-requests`, para o HTTP local não quebrar. A versão publicada mantém `upgrade-insecure-requests`.

O JSON-LD vai num `script` com `type="application/ld+json"`. Esse tipo não executa JavaScript. Se algum navegador passar a bloquear esse bloco, o sintoma é dado estruturado ausente, não página sem estilo.

## Anúncio (desligado)

O componente `src/components/AdSlot.astro` reserva altura: 100 px no celular e 90 px no banner largo, e 280 px no retângulo de até 336 px. Nada disso carrega script. O texto da caixa é “Espaço reservado para anúncio”.

Não há `ads.txt` em `public/`. O modelo comentado, que não deve ser copiado para a raiz até existir uma conta real, está em `docs/ads.txt.example`.

### Quando for ativar o AdSense

Faça nesta ordem, num commit próprio, depois de revisão humana:

1. Tenha a conta AdSense aprovada e o identificador `pub-` verdadeiro.
2. Instale uma CMP (plataforma de consentimento) compatível com o que o Google exigir para o seu público, inclusive Brasil. O script do anúncio só entra depois do consentimento. Sem CMP, não publique o script.
3. Atualize a Política de Privacidade: cookies de publicidade, parceiros, base legal de consentimento (LGPD, art. 7º, I) e a data no topo da página.
4. Publique `ads.txt` real na raiz, com a linha copiada da conta. Não use o exemplo comentado como arquivo final.
5. Amplie a CSP em `vercel.json`. A política atual bloqueia domínio externo de propósito. O AdSense precisa de `script-src`, `img-src`, `frame-src` e `connect-src` para os domínios vigentes da documentação do Google. Confira a lista na Central de Ajuda do AdSense na data da ativação; ela muda. Mantenha `frame-ancestors 'none'` e `object-src 'none'`. Não abra `script-src` para `'unsafe-inline'` além do que a CMP exigir, e anote o motivo no README.
6. Troque o miolo do `AdSlot` pelo código do bloco, sem alterar `min-height`, para o anúncio não empurrar o texto quando chegar.
7. Rode build, `npm run verify` (o verificador hoje falha se achar script do Google; atualize essa trava no mesmo commit, de propósito) e um Lighthouse de novo.

Até lá, não cole `adsbygoogle`, `gtag` nem o script de `googlesyndication`.

## Checklist antes da produção

- [ ] `PUBLIC_SITE_URL` com o domínio final, e um build novo
- [ ] Revisão humana dos quatro artigos e das páginas legais
- [ ] Conferir de novo os links da Central de Ajuda e dos suportes de Google, Samsung, Motorola e Xiaomi
- [ ] Testar os caminhos num Samsung, numa Motorola e numa Xiaomi de verdade
- [ ] Search Console somente depois do domínio definitivo
- [ ] Conta AdSense, se for o caso, com CMP antes de qualquer script
- [ ] `ads.txt` real, se o anúncio for ligado
- [ ] CSP ampliada e testada, se o anúncio ou a CMP entrarem
- [ ] Política de Privacidade com a data nova e, se a hospedagem for a Vercel, o mecanismo de transferência internacional confirmado na documentação vigente
- [ ] Endereço ou encarregado, se a operação passar a exigir
- [ ] Nenhum `.env` commitado e nenhum segredo no repositório

## O que este repositório não faz

Não configura domínio, não cria projeto na Vercel e não promove deploy de produção. Se o GitHub deste repositório já estiver ligado a um projeto Vercel, o preview do pull request pode aparecer sozinho. Isso não é um lançamento.

Contato publicado no site: contatomarkinhozz@gmail.com.
