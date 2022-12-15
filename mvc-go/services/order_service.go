package services

import (
	"fmt"
	detailCliente "mvc-go/clients/detail"
	orderCliente "mvc-go/clients/order"
	productCliente "mvc-go/clients/product"
	"mvc-go/dto"
	"mvc-go/model"
	e "mvc-go/utils/errors"
	"time"

	"github.com/golang-jwt/jwt"
	log "github.com/sirupsen/logrus"
)

type orderService struct{}

type orderServiceInterface interface {
	GetOrdersByUserId(token string) (dto.OrdersDto, e.ApiError)
	GetOrders() (dto.OrdersDto, e.ApiError)
	InsertOrder(orderDto dto.OrderDto) (dto.OrderDto, e.ApiError)
	CheckStock(orderDto dto.OrderDto) (int, bool)
}

var (
	OrderService orderServiceInterface
)

func init() {
	OrderService = &orderService{}
}

func (s *orderService) GetOrders() (dto.OrdersDto, e.ApiError) {

	var orders model.Orders = orderCliente.GetOrders()
	var ordersDto dto.OrdersDto

	for _, order := range orders {
		var orderDto dto.OrderDto

		orderDto.Id_order = order.Id
		orderDto.Total = order.Total
		orderDto.Id_user = order.Id_user

		ordersDto = append(ordersDto, orderDto)
	}

	return ordersDto, nil
}

func (s *orderService) GetOrdersByUserId(token string) (dto.OrdersDto, e.ApiError) {
	fmt.Println("culoooooo")
	log.Debug("token1: ", token)
	var id_user float64
	tkn, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) { return jwtKey, nil })
	log.Debug("token: ", tkn, "error: ", err)
	fmt.Println("culoooooo")

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, e.NewUnauthorizedApiError("Unauthorized1")
		}
		return nil, e.NewUnauthorizedApiError("Unauthorized1")
	}

	if !tkn.Valid {
		return nil, e.NewUnauthorizedApiError("Unauthorized3")

	}
	if claims, ok := tkn.Claims.(jwt.MapClaims); ok && tkn.Valid {

		id_user = (claims["id_user"].(float64))

	} else {
		return nil, e.NewUnauthorizedApiError("Unauthorized4")
	}

	var orders model.Orders = orderCliente.GetOrdersByUserId(int(id_user))
	var ordersDto dto.OrdersDto

	var total float32
	for _, order := range orders {
		var orderDto dto.OrderDto

		orderDto.Id_order = order.Id
		orderDto.Id_user = order.Id_user
		orderDto.Fecha = order.Fecha

		var details model.Details = detailCliente.GetDetailsByOrderId(order.Id)

		for _, detail := range details {
			var detailDto dto.DetailDto

			detailDto.Id_product = detail.Id_product

			var product model.Product = productCliente.GetProductById(detailDto.Id_product)

			detailDto.Id_detail = detail.Id
			detailDto.Precio_Unitario = product.Price
			detailDto.Cantidad = detail.Cantidad
			detailDto.Total = detail.Precio_Unitario * detail.Cantidad
			detailDto.Nombre = product.Name
			detailDto.Id_order = order.Id
			detailDto.Picture = detail.Picture

			total += detailDto.Total

			orderDto.Detail = append(orderDto.Detail, detailDto)
		}

		orderDto.Total = total

		total = 0

		ordersDto = append(ordersDto, orderDto)
	}

	return ordersDto, nil
}

func (s *orderService) CheckStock(orderDto dto.OrderDto) (int, bool) {

	var ok bool

	for _, detailDto := range orderDto.Detail {

		var detail model.Detail

		detail.Id_product = detailDto.Id_product

		ok = productCliente.CheckStock(detail.Id_product, int(detailDto.Cantidad))

		if ok == false {
			return detail.Id_product, ok
		}
	}
	return 0, true
}

func (s *orderService) InsertOrder(orderDto dto.OrderDto) (dto.OrderDto, e.ApiError) {

	var order model.Order

	order.Id_user = orderDto.Id_user
	order.Fecha = time.Now().Format("2006.01.02")

	order = orderCliente.InsertOrder(order)

	var total float32
	var details model.Details

	for _, detailDto := range orderDto.Detail {

		var detail model.Detail

		detail.Id_product = detailDto.Id_product

		var product model.Product = productCliente.GetProductById(detail.Id_product)
		detail.Precio_Unitario = product.Price
		detail.Cantidad = detailDto.Cantidad
		detail.Total = detail.Precio_Unitario * detail.Cantidad
		detail.Nombre = product.Name
		detail.Picture = product.Picture
		detail.Id_order = order.Id

		total += detail.Total

		productCliente.UpdateStock(detail.Id_product, int(detailDto.Cantidad))

		details = append(details, detail)
	}

	orderCliente.UpdateTotal(total, order.Id)

	detailCliente.InsertDetails(details)

	return orderDto, nil
}
