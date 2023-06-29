package types

import "gorm.io/gorm"

type BasicText struct {
	Used    bool
	Name    string
	Content string
}

type Text struct {
	gorm.Model
	Used    bool
	Name    string
	Content string
}
