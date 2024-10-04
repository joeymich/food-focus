from enum import Enum


class MealEnum(str, Enum):
    BREAKFAST = 'BREAKFAST'
    LUNCH = 'LUNCH'
    DINNER = 'DINNER'
    SNACKS = 'SNACKS'
