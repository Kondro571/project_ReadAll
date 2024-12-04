// package readAll.backend.services;
// import org.springframework.stereotype.Service;

// import readAll.backend.config.RabbitMQConfig;
// import readAll.backend.model.Order;

// import org.springframework.amqp.rabbit.annotation.RabbitListener;

// @Service
// public class OrderListener {

//     @RabbitListener(queues = RabbitMQConfig.ORDER_QUEUE)
//     public void processOrder(Order order) {
//         // Przykład: Wypisywanie zamówienia do konsoli
//         System.out.println("Przetwarzanie zamówienia: " + order);

//         // Dodaj tutaj przyszłe wysyłanie e-maili, gdy będzie to gotowe
//         // emailService.sendSimpleMessage(
//         //     order.getCustomer().getEmail(),
//         //     "Twoje zamówienie jest przetwarzane",
//         //     "Drogi kliencie,\n\nTwoje zamówienie o numerze " + order.getId() + " jest obecnie przetwarzane."
//         // );
//     }
// }
