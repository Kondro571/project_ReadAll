// package readAll.backend.services;

// import org.springframework.amqp.rabbit.annotation.RabbitListener;
// import org.springframework.stereotype.Service;

// import readAll.backend.config.RabbitMQConfig;

// @Service
// public class MessageListener {

//     @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
//     public void receiveMessage(String message) {
//         System.out.println("Received message: " + message);
//     }
// }
