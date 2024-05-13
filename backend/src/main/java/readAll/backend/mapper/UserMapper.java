package readAll.backend.mapper;


// import com.sergio.jwt.backend.dtos.SignUpDto;
// import com.sergio.jwt.backend.dtos.UserDto;
// import com.sergio.jwt.backend.entites.User;

import readAll.backend.dtos.SignUpDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}