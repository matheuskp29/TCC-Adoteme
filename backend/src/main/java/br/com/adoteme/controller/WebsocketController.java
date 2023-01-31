package br.com.adoteme.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebsocketController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/conversation")
    @SendTo("/adocao/messages")
    public String chat(@Payload String message) {
        return message;
    }
}
