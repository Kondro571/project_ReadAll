package readAll.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
            System.out.println("aaaaaaaaaaa");
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@ReadAll.com"); // Nadawca wiadomości
            message.setTo(to); // Odbiorca
            message.setSubject(subject); // Temat
            message.setText(text); // Treść wiadomości
            mailSender.send(message); // Wysyłka wiadomości
        } catch (MailException e) {
            throw new RuntimeException("Error while sending email: " + e.getMessage());
        }
    }

    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("your-email@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // `true` oznacza, że wiadomość jest w formacie HTML
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error while sending email: " + e.getMessage());
        }
    }
    
    
}
