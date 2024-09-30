package app.finance.api.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<UserModel, Integer>{
    UserModel findByEmail(String email);
}