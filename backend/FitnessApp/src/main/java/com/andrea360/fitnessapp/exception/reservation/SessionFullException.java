package com.andrea360.fitnessapp.exception.reservation;

public class SessionFullException extends RuntimeException {
    public SessionFullException(String message) {
        super(message);
    }
}
