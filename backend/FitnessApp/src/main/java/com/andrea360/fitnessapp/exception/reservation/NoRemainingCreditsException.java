package com.andrea360.fitnessapp.exception.reservation;

public class NoRemainingCreditsException extends RuntimeException {
    public NoRemainingCreditsException(String message) {
        super(message);
    }
}
