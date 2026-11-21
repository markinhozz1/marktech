---
title: "Backup do WhatsApp travado ou pausado no Google Drive"
description: "O backup do WhatsApp para a conta Google travou ou parou por falta de espaço? Veja o que fazer sem apagar a única cópia das conversas."
category: "backup-e-conversas"
published: "2026-11-21"
updated: "2026-11-21"
cover: "/images/covers/backup-do-whatsapp-travado-no-google-drive"
coverAlt: "Ilustração de uma nuvem com o sinal de pausa e um celular ao lado, nas cores do MarkTech, sem logotipo de terceiros."
featured: 3
howto:
  - name: "Não apague o backup se as conversas sumiram do celular"
    text: "A Central de Ajuda diz que só existe um backup por número, tanto na nuvem do WhatsApp quanto na conta Google, e que o backup novo substitui o antigo. Se as conversas já não estão no aparelho, ou se a restauração não terminou, não apague a cópia, não crie outra e não restaure o celular de fábrica."
  - name: "Leia o aviso da tela antes de repetir o backup"
    text: "Espera de Wi-Fi, falta de armazenamento e barra que não anda são situações diferentes. A Central de Ajuda cita “Waiting for Wi-Fi”, “Backup failed” e o aviso de que é preciso mais armazenamento. Se a barra marca 100% e a notificação continua, pode haver mídia ainda subindo: a orientação oficial é esperar algumas horas."
  - name: "Deixe o celular no Wi-Fi, na tomada, e reinicie"
    text: "A Central de Ajuda pede rede estável e bateria carregada ou aparelho na tomada. Reinicie o telefone, force o fechamento do WhatsApp e tente de novo. Trocar de rede no meio pode fazer o backup expirar. Desligar e ligar o Wi-Fi, testar outra rede ou usar os dados móveis entra na lista, sem ficar pulando de uma rede para outra durante o envio."
  - name: "Confira o espaço do celular e o da conta Google"
    text: "É preciso espaço livre no aparelho para preparar o backup e espaço na conta Google para guardá-lo. O Google informa que o backup do WhatsApp no Android conta na cota compartilhada com Drive, Gmail e Fotos. Se a conta passou do limite, a Central de Ajuda diz que é preciso liberar espaço para o backup voltar. Apagar a cópia do WhatsApp na conta Google é permanente: só faça isso se as conversas ainda estão no celular e um backup novo conseguiu terminar, ou se você aceita perder aquela cópia."
  - name: "Depois, conta Google e Play Services"
    text: "Veja se o app Google Play Services tem atualização. A Central de Ajuda também descreve conferir a permissão de fotos e vídeos, sincronizar a conta Google e, se ainda falhar, sair da conta e entrar de novo. Sair da conta mexe em outros serviços Google daquele celular: tenha a senha em mãos e não faça isso como primeiro teste."
sources:
  - title: "Central de Ajuda do WhatsApp: como fazer backup do histórico no Android"
    url: "https://faq.whatsapp.com/481135090640375/?cms_platform=android&locale=en_US"
  - title: "Central de Ajuda do WhatsApp: sobre backups na conta Google"
    url: "https://faq.whatsapp.com/407643231403807/?cms_platform=android&locale=en_US"
  - title: "Central de Ajuda do WhatsApp: não consigo criar ou restaurar o backup"
    url: "https://faq.whatsapp.com/589979312881396/?cms_platform=android&locale=en_US"
  - title: "Google Drive: gerenciar o armazenamento da conta, inclusive backup do WhatsApp"
    url: "https://support.google.com/drive/answer/6374270?hl=en"
  - title: "Google One: o que conta na cota de armazenamento"
    url: "https://support.google.com/googleone/answer/9312312?hl=en"
  - title: "Google One: limpar armazenamento no Android"
    url: "https://support.google.com/googleone/answer/9776477?hl=en"
  - title: "Samsung: limpar cache de um aplicativo"
    url: "https://www.samsung.com/us/support/answer/ANS10001372/"
  - title: "Motorola: limpar cache ou dados de um aplicativo"
    url: "https://help.motorola.com/hc/1796/12/global/en-us/jcb1208210742sS4.html"
---

Muita gente chama de “backup no Google Drive” a cópia que o WhatsApp envia para a conta Google. A Central de Ajuda fala em conta Google e em armazenamento Google, não numa pasta comum de documentos. O Google, na ajuda do Drive, confirma o elo: o backup do WhatsApp no Android entra na mesma cota usada por Drive, Gmail e Fotos. Por isso a cópia trava quando essa cota enche, mesmo que você não veja um arquivo solto no meio dos seus documentos.

Há também um backup na nuvem do próprio WhatsApp, que a Central de Ajuda descreve como recurso em construção e teste, e que pode não aparecer na sua conta. Dá para trocar o destino em Configurações, Conversas, Backup de conversas. Este texto é sobre a conta Google. Não misture o aviso de um destino com o botão do outro.

Os menus mudam na One UI, na Motorola e na HyperOS ou MIUI. Siga o sentido do passo.

## Antes de qualquer coisa

A Central de Ajuda é direta na página de backup que não conclui:

- Só dá para restaurar o histórico se você já tinha um backup feito e ele terminou.
- Na conta Google, o histórico não fica nos servidores do WhatsApp. O armazenamento é o da conta Google.
- Existe uma cópia por número. A nova substitui a antiga. Não há como restaurar “a de semana passada” se você já gravou outra por cima.

> Cuidado: se as conversas ou as mídias que você procura já sumiram do celular, ou se a restauração ainda não acabou, não apague o backup, não crie um backup novo e não restaure o aparelho de fábrica. A Central de Ajuda diz que a cópia atual pode ser a única, e que qualquer uma dessas ações a substitui ou a apaga de vez. Os testes abaixo são para quando as conversas ainda estão no telefone, ou quando aparece uma mensagem de erro durante a restauração.

Se o celular foi trocado e você está no meio de restaurar, o conselho oficial é outro: manter o Wi-Fi e a tomada, e não tratar uma pausa sem mensagem de erro como falha. A restauração vem em duas etapas. Primeiro as mensagens, de preferência com o WhatsApp aberto até os chats aparecerem. Depois fotos e vídeos em segundo plano. Nessa segunda etapa dá para usar ou fechar o aplicativo sem perder o progresso. A Central de Ajuda diz que o backup das conversas novas só volta a acontecer depois que a restauração termina.

## O que a tela está dizendo

“Travou” e “pausou” não são um único erro. A Central de Ajuda separa alguns avisos. Os nomes abaixo estão como na página em inglês lida para este texto; no aplicativo em português a frase vem traduzida:

- Espera de Wi-Fi. O backup pode estar configurado para não usar dados móveis. Conecte um Wi-Fi estável ou ligue a opção de backup por dados móveis, se você aceitar o consumo.
- Falha que pede mais armazenamento. A página diz que o limite estourou e que é preciso liberar espaço no aparelho, apagando mídia ou conversas, ou aumentar o plano se o aperto for na nuvem.
- Barra em 100% com a notificação ainda na tela. Pode haver envio ou descarga de mídia em segundo plano. A orientação é esperar algumas horas antes de concluir que parou.
- Backup que não anda no meio do processo. A lista oficial inclui reiniciar, entrar de novo na conta Google, trocar de rede com cuidado, reduzir o tamanho da cópia, carregar a bateria, forçar o fechamento do WhatsApp, conferir o chip em celular com dois SIM e atualizar o Google Play Services.

Backup pela metade, diz a mesma página, pode vir de internet instável, pouco espaço no celular ou interrupção no meio do processo.

O Google pode apagar um backup da conta que ficou cinco meses sem atualização. Isso está na Central de Ajuda, na página sobre backups da conta Google. Não é um motivo para ficar criando cópia nova em cima de uma restauração incompleta. É um motivo para, no dia a dia, deixar um backup que termina.

## Wi-Fi, bateria e o celular com dois chips

Antes de começar, a página de como fazer backup pede espaço livre no aparelho e uma conexão estável. Para a conta Google, pede também uma conta Google ativa no telefone, o app Google Play Services instalado e espaço livre nessa conta.

Na hora em que a cópia emperra, a Central de Ajuda sugere:

1. Reiniciar o aparelho.
2. Sair e entrar de novo na conta Google. Deixe este item para depois dos testes de rede e de espaço. Sair da conta interrompe sincronização de outros apps.
3. Desligar e ligar o Wi-Fi, testar outra rede ou usar os dados móveis. Ficar trocando de Wi-Fi durante o envio pode fazer o backup expirar. Escolha uma rede e permaneça nela.
4. Deixar a bateria carregada ou o celular na tomada.
5. Forçar a parada ou fechar o WhatsApp e abrir de novo.
6. No celular com dois chips, deixar ativo o chip do número usado no WhatsApp.
7. Ver se o Google Play Services precisa de atualização. O caminho citado é Configurações, Aplicativos, Google Play Services. O nome pode estar em inglês no sistema. Não desinstale esse componente do sistema: só procure atualização na Play Store.

Para forçar a parada, o atalho usual é manter o ícone do WhatsApp pressionado e abrir as informações do aplicativo. Na Samsung, a página de cache também passa por Configurações, Aplicativos. Na Motorola, o toque longo no ícone abre as informações. O botão é Parar ou Forçar parada. Isso fecha o app. Não é limpar dados.

## Espaço no celular e espaço na conta Google

São dois depósitos.

No celular, o WhatsApp precisa de folga para montar a cópia. Se o aparelho está no limite, reduza mídia pelo gerenciador de armazenamento do próprio WhatsApp. O tutorial de [espaço cheio](/espaco-e-armazenamento/armazenamento-do-whatsapp-cheio/) explica como tirar vídeo e foto sem apagar o texto da conversa. A Central de Ajuda, na página de backup que falha, também manda revisar o uso em Configurações, Conversas, Backup de conversas, e apagar mídia desnecessária.

Na conta Google, a ajuda do Drive diz que uma conta pessoal inclui até 15 GB compartilhados entre Drive, Gmail, Fotos e o backup do WhatsApp no Android. Quem assina um plano maior tem outro teto. O número que vale é o da sua conta, em [one.google.com/storage](https://one.google.com/storage) ou no aplicativo Google One, não um valor genérico de blog.

Quando a conta passa da cota, a ajuda do Google One diz que não dá para enviar arquivo novo ao Drive, que o backup de fotos pode parar e que o Gmail pode ser afetado. A Central de Ajuda do WhatsApp diz o equivalente para esta cópia: se você estourou o limite do armazenamento Google, precisa liberar espaço para o backup continuar. A ajuda do Drive é específica: o backup do WhatsApp no Android conta nessa cota.

A ordem que o Google publica para encolher o backup, e ela importa, é esta:

1. No WhatsApp, abra Configurações, Conversas, Backup de conversas.
2. Desligue a inclusão de vídeos. O Google diz que vídeo costuma ser o maior pedaço.
3. Toque em fazer backup agora, para gerar uma cópia já sem os vídeos.
4. Só então, se ainda precisar, apague a cópia antiga no gerenciamento de armazenamento do Google One.

> Cuidado: apagar o backup do WhatsApp na conta Google é permanente. O Google avisa que, se você trocar de celular ou reinstalar o aplicativo antes de criar outra cópia, perde o histórico que estava só naquela nuvem. Não apague essa cópia se as conversas já saíram do telefone. Não apague “para liberar” no meio de uma restauração.

Se o backup nem começa porque a conta já estourou a cota, pode ser preciso liberar outra coisa primeiro: anexo grande do Gmail, arquivo do Drive ou foto, conforme o que a tela de armazenamento mostrar. A ajuda do Google One diz que, depois de apagar muitos arquivos, a conta pode levar de 48 a 72 horas para mostrar o espaço certo. Não fique criando backup novo a cada minuto esperando o número mudar na hora.

Desligar “incluir vídeos” não apaga o vídeo que já está nas conversas do celular. Ele deixa de entrar nas próximas cópias da conta Google. Leia a frase na tela antes de confirmar.

Há ainda, na mesma tela de backup, a opção de usar dados móveis e a de incluir o arquivo de status. Ligar dados móveis só ajuda se o Wi-Fi for o motivo da espera e se o seu plano aguentar o tamanho da cópia. A Central de Ajuda recomenda Wi-Fi porque o arquivo pode ser grande.

## Conta Google e permissão

Se a rede e o espaço estão em ordem e o erro continua, a Central de Ajuda lista, para a conta Google:

1. A permissão de fotos e vídeos do WhatsApp em permitir.
2. Configurações do celular, Contas, gerenciar contas, a conta Google, sincronizar agora, e esperar acabar.
3. Se ainda falhar, remover a conta do aparelho e abri-la de novo pelo WhatsApp, em Configurações, Conversas, Backup de conversas, conta Google.

> Cuidado: remover a conta Google do celular tira a sincronização dela naquele aparelho até você entrar outra vez. Tenha a senha. Não use este passo se você não consegue entrar na conta. E não faça isso quando as conversas do WhatsApp já sumiram e você depende do backup que está nessa conta: leia a tela inteira antes de confirmar qualquer aviso de exclusão de cópia.

A permissão de fotos muda de lugar na One UI, na Motorola e na Xiaomi. A busca das Configurações por “WhatsApp” e depois Permissões costuma achar. No Galaxy, o suporte da Samsung descreve o gerenciador em Segurança e privacidade. Na Motorola, a ajuda de permissões cita Segurança e privacidade, Controles de privacidade, ou o toque longo no ícone, Informações do app, Permissões. Não há uma página única da Xiaomi só para o backup do WhatsApp; o caminho de permissão do Xiaomi 14T está na página oficial de permissões de aplicativos, em Segurança e privacidade ou em Apps.

Limpar o cache do WhatsApp não substitui esses passos. Se você limpar, use só Limpar cache. A Samsung avisa que limpar dados reseta o aplicativo e remove o que estava salvo nele.

## O que não resolve e ainda apaga

Desinstalar o WhatsApp está no fim da página oficial, e com uma condição: as conversas e as mídias ainda estão no aparelho e já têm backup, e você confere que existe uma cópia recente para restaurar antes de remover o app. A reinstalação é pela Play Store.

Não crie um backup novo enquanto tenta restaurar um antigo. A Central de Ajuda repete que a cópia nova cobre a antiga para sempre.

Se a restauração termina e ainda faltam conversas, a explicação oficial mais citada é que o arquivo restaurado não continha aquelas conversas. O backup manual, feito antes de trocar de aparelho, é o que a Central de Ajuda recomenda para levar o histórico mais recente.

Este site não recupera backup corrompido, não oferece ferramenta de extração e não pede o arquivo da sua cópia. A própria Central de Ajuda diz que, esgotados os passos, um backup corrompido não é restaurado por eles e que eles não determinam a causa. Se as conversas ainda estão no telefone, o caminho seguro é um backup novo que termine, não um programa de fora.
