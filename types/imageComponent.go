package types

import "gorm.io/gorm"

type BasicImage struct {
	Used bool
	Name string
	Url  string
}

type Image struct {
	gorm.Model
	Used bool
	Name string
	Url  string
}
