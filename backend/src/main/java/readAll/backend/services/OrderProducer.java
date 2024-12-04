// package readAll.backend.services;

// import org.springframework.amqp.rabbit.core.RabbitTemplate;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import readAll.backend.config.RabbitMQConfig;
// import readAll.backend.model.Order;

// @Service
// public class OrderProducer {

//     private final RabbitTemplate rabbitTemplate;

//     @Autowired
//     public OrderProducer(RabbitTemplate rabbitTemplate) {
//         this.rabbitTemplate = rabbitTemplate;
//     }

//     public void sendOrderMessage(Order order) {
//         rabbitTemplate.convertAndSend(RabbitMQConfig.ORDER_QUEUE, order);
//     }
// }
