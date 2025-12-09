package org.example.petadoption.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String username;
    private String role;

    public UserResponse(String username, String role) {
        this.username = username;
        this.role = role;
    }
}