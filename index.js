const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Token del bot
const TOKEN = "7237132123:AAHsvp9xJc_MDS6nOlBqiFLihny6T-VQYqI";
const API_URL = https://api.telegram.org/bot${TOKEN};
const WEBHOOK_URL = "https://granjabot.onrender.com/webhook"; // dominio de Render

app.use(express.json());
app.use(express.static("public")); // para servir index.html

// Mensaje de inicio
app.get("/", (req, res) => {
  res.send("🤖 GranjaBot está activo y en funcionamiento.");
});

// Webhook: recibe mensajes de Telegram
app.post("/webhook", async (req, res) => {
  const msg = req.body.message;

  if (msg && msg.text === "/start") {
    const chat_id = msg.chat.id;
    const first_name = msg.from.first_name || "Granjero";

    // Enviar mensaje de bienvenida con botón
    await axios.post(${API_URL}/sendMessage, {
      chat_id,
      text: 👋 ¡Bienvenido, ${first_name}!\n\n🐣 Estás ingresando a la mejor Mini App de minería virtual. Toca el botón para comenzar.,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Abrir Mini App",
              web_app: {
                url: "https://granjabot.onrender.com",
              },
            },
          ],
        ],
      },
    });
  }

  res.sendStatus(200);
});

// Iniciar servidor y registrar Webhook
app.listen(PORT, async () => {
  console.log(🚀 Servidor activo en puerto ${PORT});

  try {
    const res = await axios.get(${API_URL}/setWebhook?url=${WEBHOOK_URL});
    console.log("✅ Webhook configurado:", res.data);
  } catch (err) {
    console.error("❌ Error al configurar webhook:", err.response?.data || err);
  }
});
