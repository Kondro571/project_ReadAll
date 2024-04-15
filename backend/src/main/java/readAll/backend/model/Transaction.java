package readAll.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Transaction")
public class Transaction {

    @Id
    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @Column(name = "response", nullable = false)
    private String response;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "amount", nullable = false)
    private float amount;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;





    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }

}
