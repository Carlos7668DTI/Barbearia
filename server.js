const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/agendar', (req, res) => {
  const { nome, celular, servico, horario, pagamento } = req.body;

  const mensagem = `✂️ Novo agendamento confirmado!\n\n👤 Cliente: ${nome}\n📞 Telefone: ${celular}\n💈 Serviço: ${servico}\n🕒 Horário: ${horario}\n💳 Pagamento: ${pagamento}`;

  axios.post('https://api.z-api.io/instances/3E94E1D5DD191111653C9ADC54EDACF3/token/6DE16A907FE40F32A7F46D8A/send-text', {
    phone: '34996765003', // Ex: 5534999998888
    message: mensagem
  })
  .then(() => {
    console.log("✅ Mensagem enviada para o Francisco");
    res.send("Agendamento confirmado e padrinho notificado!");
  })
  .catch(err => {
    console.error("❌ Erro ao enviar mensagem:", err);
    res.send("Agendamento salvo, mas houve erro ao notificar o padrinho.");
  });
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
