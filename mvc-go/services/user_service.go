package services

import (
	userCliente "mvc-go/clients/user"
	"mvc-go/dto"
	"mvc-go/model"
	e "mvc-go/utils/errors"

	"github.com/golang-jwt/jwt"
	log "github.com/sirupsen/logrus"
)

type userService struct{}

type userServiceInterface interface {
	GetUserById(id int) (dto.UserDto, e.ApiError)
	GetUsers() (dto.UsersDto, e.ApiError)
	LoginUser(loginDto dto.LoginDto) (dto.TokenDto, e.ApiError)
}

var (
	UserService userServiceInterface
)

func init() {
	UserService = &userService{}
}

var jwtKey = []byte("secret_key")

func (s *userService) GetUserById(id int) (dto.UserDto, e.ApiError) {

	var user model.User = userCliente.GetUserById(id)
	var userDto dto.UserDto

	if user.Id == 0 {
		return userDto, e.NewBadRequestApiError("user not found")
	}
	userDto.Name = user.Name
	userDto.LastName = user.LastName
	userDto.UserName = user.UserName
	userDto.Id_user = user.Id
	return userDto, nil
}

func (s *userService) GetUsers() (dto.UsersDto, e.ApiError) {

	var users model.Users = userCliente.GetUsers()
	var usersDto dto.UsersDto

	for _, user := range users {
		var userDto dto.UserDto
		userDto.Name = user.Name
		userDto.LastName = user.LastName
		userDto.UserName = user.UserName
		userDto.Id_user = user.Id

		usersDto = append(usersDto, userDto)
	}

	return usersDto, nil
}

//var jwtKey = []byte("secret_key")

func (s *userService) LoginUser(loginDto dto.LoginDto) (dto.TokenDto, e.ApiError) { //develve (dto.TokenDto, e.ApiError)

	/***************************  prueba 1 ///////////////////////////////////////////////////////////////////////*/

	var user model.User = userCliente.GetUserByUserName(loginDto.User)
	log.Debug(loginDto)

	var tokenDto dto.TokenDto //genera un token dto vacio

	if user.Id == 0 {
		return tokenDto, e.NewBadRequestApiError("user not found")
	}

	if loginDto.Password == user.Password {

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"id_user": user.Id,
		})
		tokenString, _ := token.SignedString(jwtKey)
		tokenDto.Token = tokenString
		tokenDto.Id_user = user.Id

		return tokenDto, nil

	} else {
		return tokenDto, e.NewBadRequestApiError("Bad password")
	}

	/*******************************  prueba 2   ***********************************************************/
	/*
		var user model.User = userCliente.GetUserByUserName(loginDto.User)
		log.Debug(loginDto)

		var tokenDto dto.TokenDto //genera un token dto vacio

		if user.Id == 0 {
			return tokenDto, e.NewBadRequestApiError("user not found")
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"id_user": user.Id,
		})
		tokenString, _ := token.SignedString(jwtKey)
		tokenDto.Token = tokenString
		tokenDto.Id_user = user.Id

		if user.Password == tokenString {
			return tokenDto, nil

		} else {
			return tokenDto, e.NewBadRequestApiError("Bad password")
		}  */
}
