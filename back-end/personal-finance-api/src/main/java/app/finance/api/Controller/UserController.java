package app.finance.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.finance.api.Model.UserModel;
import app.finance.api.Repository.IUserRepository;
import at.favre.lib.crypto.bcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/Users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody UserModel userModel){
        try {
            var user = this.userRepository.findByEmail(userModel.getEmail());
            if(user != null){
                logger.warn("User already exists: {}", userModel.getEmail());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
            }

            var passwordHashed = BCrypt.withDefaults().hashToString(12, userModel.getPassword().toCharArray());
            userModel.setPassword(passwordHashed);
            
            var userCreated = this.userRepository.save(userModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
        } catch (Exception e) {
            logger.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModel userModel){
        try {
            var user = this.userRepository.findByEmail(userModel.getEmail());
            logger.debug("User found: {}", user);
            if(user == null){
                logger.warn("User not found: {}", userModel.getEmail());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
            }

            var passwordVerified = BCrypt.verifyer().verify(userModel.getPassword().toCharArray(), user.getPassword());
            if(!passwordVerified.verified){
                logger.warn("Invalid password for user: {}", userModel.getEmail());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
            }

            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception e) {
            logger.error("Error logging in user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error logging in user");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        //TODO: Implement logout
        return ResponseEntity.status(HttpStatus.OK).body("Logout");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(){
        //TODO: Implement forgot password
        return ResponseEntity.status(HttpStatus.OK).body("Forgot password");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(){
        //TODO: Implement reset password
        return ResponseEntity.status(HttpStatus.OK).body("Reset password");
    }
}