import { ITemplatesProvider } from 'src/shared/application/providers/templates.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestTemplatesProvider implements ITemplatesProvider {
  sendWelcome(nameOne: string, nameTwo: string): string {
    return `<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Boas-vindas</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background-color:#4f46e5; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:26px;">
                🎉 Seja muito bem-vindo, ${nameOne}!
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; line-height:1.6; margin-top:0;">
                Olá, <strong>${nameTwo}</strong> 👋
              </p>

              <p style="font-size:16px; line-height:1.6;">
                É um prazer ter você conosco! Seu acesso ao sistema foi criado com sucesso e agora você pode aproveitar todos os recursos disponíveis.
              </p>

              <p style="font-size:16px; line-height:1.6;">
                Caso tenha qualquer dúvida, nossa equipe está pronta para te ajudar.
              </p>

              <!-- Botão -->
              <div style="text-align:center; margin:30px 0;">
                <a href="#"
                   style="background-color:#4f46e5; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block;">
                  Acessar o Sistema
                </a>
              </div>

              <p style="font-size:14px; color:#666666; line-height:1.6;">
                Se você não solicitou este acesso, por favor ignore esta mensagem.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f1f5f9; padding:20px; text-align:center; font-size:13px; color:#666666;">
              © 2026 • APP-MY-QM<br>
              Todos os direitos reservados.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
  }

  sendDeleted(name: string): string {
    return `<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Conta Excluída</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background-color:#dc2626; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">
                Conta excluída com sucesso
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; line-height:1.6; margin-top:0;">
                Olá, <strong>${name}</strong>,
              </p>

              <p style="font-size:16px; line-height:1.6;">
                Confirmamos que sua conta foi excluída com sucesso do nosso sistema, conforme sua solicitação.
              </p>

              <p style="font-size:16px; line-height:1.6;">
                A partir deste momento, seus dados não estarão mais disponíveis para acesso. Caso tenha optado por um período de retenção, eles serão removidos permanentemente após esse prazo.
              </p>

              <p style="font-size:16px; line-height:1.6;">
                Se essa exclusão não foi feita por você ou se acredita que houve algum erro, entre em contato conosco o quanto antes.
              </p>

              <div style="background-color:#fef2f2; border-left:4px solid #dc2626; padding:15px; margin:25px 0; color:#7f1d1d; font-size:14px; line-height:1.5;">
                ⚠️ Após a exclusão definitiva, não será possível recuperar sua conta ou seus dados.
              </div>

              <p style="font-size:15px; line-height:1.6;">
                Agradecemos pelo tempo em que esteve conosco.
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Atenciosamente,<br>
                <strong>Equipe Nome do Sistema</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f1f5f9; padding:20px; text-align:center; font-size:13px; color:#666666;">
              © 2026 • Nome do Sistema<br>
              Todos os direitos reservados.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
  }
}
