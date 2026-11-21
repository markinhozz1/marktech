export const categorySlugs = [
  'nao-funciona',
  'backup-e-conversas',
  'espaco-e-armazenamento',
  'audio-e-mensagens',
  'dicas-e-recursos',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export interface Category {
  slug: CategorySlug;
  title: string;
  nav: string;
  description: string;
  intro: string[];
}

export const categories: Category[] = [
  {
    slug: 'nao-funciona',
    title: 'Não funciona/erros',
    nav: 'Não funciona',
    description:
      'O que tentar quando o WhatsApp não abre, fecha sozinho ou trava no Android, antes de apagar as conversas.',
    intro: [
      'Esta seção reúne falhas em que o aplicativo não chega a funcionar: não abre, fecha na hora ou fica na tela de início.',
      'O caminho seguro começa pelo que não apaga conversa: reiniciar, atualizar pela Play Store e limpar só o cache. Desinstalar e limpar dados ficam para o fim, e só com backup feito.',
    ],
  },
  {
    slug: 'backup-e-conversas',
    title: 'Backup e conversas',
    nav: 'Backup',
    description:
      'Como destravar o backup do WhatsApp na conta Google e o que não apagar quando ele é a única cópia das conversas.',
    intro: [
      'Aqui entram backup que não termina, backup pausado por falta de espaço e a diferença entre a cópia na conta Google e os arquivos que estão no celular.',
      'Cada backup novo substitui o anterior. Se as conversas já sumiram do aparelho, o guia pede para não criar outra cópia por cima nem apagar a que ainda existe.',
    ],
  },
  {
    slug: 'espaco-e-armazenamento',
    title: 'Espaço e armazenamento',
    nav: 'Armazenamento',
    description:
      'Como liberar o espaço ocupado pelo WhatsApp no Android sem apagar o texto das conversas.',
    intro: [
      'Fotos, vídeos e áudios costumam ocupar bem mais espaço do que o texto. Dá para rever e apagar essa mídia dentro do próprio aplicativo e manter a conversa na lista.',
      'Limpar o cache do sistema é diferente de limpar os dados do aplicativo. A segunda opção apaga o que está só no celular.',
    ],
  },
  {
    slug: 'audio-e-mensagens',
    title: 'Áudio e mensagens',
    nav: 'Áudio',
    description:
      'Mensagem que não sai, mensagem que não chega e áudio que não grava no WhatsApp para Android.',
    intro: [
      'Relógio ao lado da mensagem, um tique só e microfone sem permissão são problemas diferentes. O guia separa cada um.',
      'Os caminhos de permissão mudam na One UI, na Motorola e na HyperOS ou MIUI. Os nomes abaixo são os que o suporte de cada marca descreve, traduzidos para o português usual do celular.',
    ],
  },
  {
    slug: 'dicas-e-recursos',
    title: 'Dicas e recursos',
    nav: 'Dicas',
    description:
      'Recursos do WhatsApp no Android que não são um erro: ajustes, permissões e hábitos para usar o aplicativo com menos susto.',
    intro: [
      'Esta categoria é para tutoriais de recurso: o que um ajuste faz e como voltar atrás. Ainda não há artigo publicado aqui.',
      'Enquanto isso, os guias de erro, backup, espaço e áudio cobrem os pedidos mais comuns. Uma correção ou uma sugestão de pauta pode ir para o e-mail de contato.',
    ],
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
