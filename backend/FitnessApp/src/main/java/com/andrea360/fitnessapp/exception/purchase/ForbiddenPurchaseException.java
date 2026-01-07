package com.andrea360.fitnessapp.exception.purchase;

public class ForbiddenPurchaseException extends RuntimeException {
    public ForbiddenPurchaseException(String message) {
        super(message);
    }
}
