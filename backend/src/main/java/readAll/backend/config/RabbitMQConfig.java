// package readAll.backend.config;

// import org.springframework.amqp.rabbit.connection.ConnectionFactory;
// import org.springframework.amqp.core.Queue;
// import org.springframework.amqp.rabbit.core.RabbitTemplate;
// import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class RabbitMQConfig {

//     public static final String QUEUE_NAME = "example.queue";
//     public static final String ORDER_QUEUE = "order.queue";

//     @Bean
//     public Queue exampleQueue() {
//         return new Queue(QUEUE_NAME, true);
//     }


//     @Bean
//     public Queue orderQueue() {
//         return new Queue(ORDER_QUEUE, true);
//     }

//     @Bean
//     public Jackson2JsonMessageConverter messageConverter() {
//         return new Jackson2JsonMessageConverter();
//     }

//     @Bean
//     public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
//         RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//         rabbitTemplate.setMessageConverter(messageConverter());
//         return rabbitTemplate;
//     }
// }
