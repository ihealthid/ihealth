import { Injectable } from '@nestjs/common';
import { Whatsapp, create } from 'venom-bot';
import ollama from 'ollama';

@Injectable()
export class WhatsappService {
  private client: Whatsapp;

  constructor() {
    create({
      session: 'mentarimedika',
    })
      .then((client) => {
        this.client = client;
        client.onMessage((message) => {
          if (message.content.includes('ask:')) {
            console.log(message.content)
            ollama
              .chat({
                model: 'llama3',
                messages: [
                  {
                    role: 'user',
                    content: message.content.replace('ask:', ''),
                  },
                ],
              })
              .then((res) => {
                client.sendText(message.sender.id, res.message.content);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getQr() {
    // return new Promise<string>((resolve) => {
    //   this.client.on('qr', (qr) => {
    //     resolve(qr);
    //   });
    // });
  }
}
