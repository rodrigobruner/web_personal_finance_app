package app.finance.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;

@RestController
@RequestMapping("/Users")
public class UserController {
    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/")
    public ResponseEntity create(@RequestBody UserModel userModel){
        var user = this.userRepository.findByEmail(userModel.getEmail());
        if(user != null){
            System.out.println("User already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }

        var passwordHashred = BCrypt.withDefaults().hashToString(12, userModel.getPassword().toCharArray());
        userModel.setPassword(passwordHashred);
        
        var userCreated = this.userRepository.save(userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserModel userModel){
        var user = this.userRepository.findByEmail(userModel.getEmail());
        if(user == null){
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        var passwordHashred = BCrypt.verifyer().verify(userModel.getPassword().toCharArray(), user.getPassword());
        if(!passwordHashred.verified){
            System.out.println("Invalid password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
        }

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(){
        //TODO: Implement logout
        return ResponseEntity.status(HttpStatus.OK).body("Logout");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity forgotPassword(){
        //TODO: Implement forgot password
        return ResponseEntity.status(HttpStatus.OK).body("Forgot password");
    }

    @PostMapping("/reset-password")
    public ResponseEntity resetPassword(){
        //TODO: Implement reset password
        return ResponseEntity.status(HttpStatus.OK).body("Reset password");
    }
}