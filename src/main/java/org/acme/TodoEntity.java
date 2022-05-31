package org.acme;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
public class TodoEntity extends PanacheEntity {
    public String text;

    @Column(updatable = false, insertable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    public Date createdAt;

}
