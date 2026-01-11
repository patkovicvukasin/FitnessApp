package com.andrea360.fitnessapp.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionCapacityUpdate {
    private Long sessionId;
    private int availableSlots;
    private int maxCapacity;
}