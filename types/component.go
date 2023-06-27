package types

import "gorm.io/gorm"

type Component struct {
	gorm.Model
	Used    bool
	Content string
}
