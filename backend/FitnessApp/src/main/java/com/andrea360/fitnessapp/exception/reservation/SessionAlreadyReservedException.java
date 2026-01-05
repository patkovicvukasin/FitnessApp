package com.andrea360.fitnessapp.exception.reservation;

public class SessionAlreadyReservedException extends RuntimeException {
    public SessionAlreadyReservedException(String message) {
        super(message);
    }
}
