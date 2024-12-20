"""change food data types to float

Revision ID: dbc2a2184cc5
Revises: b8ab1ec778da
Create Date: 2024-10-27 19:53:35.153580

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dbc2a2184cc5'
down_revision: Union[str, None] = 'b8ab1ec778da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('food', 'name',
                    existing_type=sa.VARCHAR(),
                    nullable=False)
    op.create_index(op.f('ix_food_brand'), 'food', ['brand'], unique=False)
    op.create_index(op.f('ix_food_name'), 'food', ['name'], unique=False)
    op.alter_column('food', 'calories',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'total_fat',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'saturated_fat',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'polyunsaturated_fat',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'monounsaturated_fat',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'trans_fat',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'sodium',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'potassium',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'total_carbs',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'dietary_fiber',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'sugars',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'protein',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'vitamin_a',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'vitamin_c',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'calcium',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.alter_column('food', 'iron',
                    existing_type=sa.INTEGER(), type_=sa.FLOAT())
    op.add_column('food', sa.Column('added_sugars', sa.FLOAT))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_food_name'), table_name='food')
    op.drop_index(op.f('ix_food_brand'), table_name='food')
    op.alter_column('food', 'name',
                    existing_type=sa.VARCHAR(),
                    nullable=True)
    op.alter_column('food', 'calories',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'total_fat',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'saturated_fat',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'polyunsaturated_fat',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'monounsaturated_fat',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'trans_fat',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'sodium',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'potassium',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'total_carbs',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'dietary_fiber',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'sugars',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'protein',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'vitamin_a',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'vitamin_c',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'calcium',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.alter_column('food', 'iron',
                    existing_type=sa.FLOAT(), type_=sa.INTEGER())
    op.drop_column('food', 'added_sugars')
    # ### end Alembic commands ###
