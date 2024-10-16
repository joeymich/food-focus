"""add food, food_log, and serving_size tables

Revision ID: b8ab1ec778da
Revises: 7311fb665dfc
Create Date: 2024-10-03 22:21:32.830794

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b8ab1ec778da'
down_revision: Union[str, None] = '7311fb665dfc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('food',
                    sa.Column('brand', sa.String(), nullable=True),
                    sa.Column('name', sa.String(), nullable=True),
                    sa.Column('calories', sa.Integer(), nullable=True),
                    sa.Column('total_fat', sa.Integer(), nullable=True),
                    sa.Column('saturated_fat', sa.Integer(), nullable=True),
                    sa.Column('polyunsaturated_fat',
                              sa.Integer(), nullable=True),
                    sa.Column('monounsaturated_fat',
                              sa.Integer(), nullable=True),
                    sa.Column('trans_fat', sa.Integer(), nullable=True),
                    sa.Column('sodium', sa.Integer(), nullable=True),
                    sa.Column('potassium', sa.Integer(), nullable=True),
                    sa.Column('total_carbs', sa.Integer(), nullable=True),
                    sa.Column('dietary_fiber', sa.Integer(), nullable=True),
                    sa.Column('sugars', sa.Integer(), nullable=True),
                    sa.Column('protein', sa.Integer(), nullable=True),
                    sa.Column('vitamin_a', sa.Integer(), nullable=True),
                    sa.Column('vitamin_c', sa.Integer(), nullable=True),
                    sa.Column('calcium', sa.Integer(), nullable=True),
                    sa.Column('iron', sa.Integer(), nullable=True),
                    sa.Column('id', sa.UUID(), server_default=sa.text(
                        'gen_random_uuid()'), nullable=False),
                    sa.PrimaryKeyConstraint('id', name=op.f('pk_food'))
                    )
    op.create_table('serving_size',
                    sa.Column('food_id', sa.UUID(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('ratio', sa.Float(), nullable=False),
                    sa.Column('id', sa.UUID(), server_default=sa.text(
                        'gen_random_uuid()'), nullable=False),
                    sa.ForeignKeyConstraint(['food_id'], ['food.id'], name=op.f(
                        'fk_serving_size_food_id_food'), ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id', name=op.f('pk_serving_size'))
                    )
    op.create_index(op.f('ix_serving_size_food_id'),
                    'serving_size', ['food_id'], unique=False)
    op.create_table('food_log',
                    sa.Column('user_id', sa.UUID(), nullable=False),
                    sa.Column('serving_size_id', sa.UUID(), nullable=False),
                    sa.Column('serving_count', sa.Float(), nullable=False),
                    sa.Column('date', sa.Date(), nullable=False),
                    sa.Column('meal', sa.Enum('BREAKFAST', 'LUNCH', 'DINNER',
                                              'SNACKS', name='mealenum'), nullable=True),
                    sa.Column('id', sa.UUID(), server_default=sa.text(
                        'gen_random_uuid()'), nullable=False),
                    sa.ForeignKeyConstraint(['serving_size_id'], ['serving_size.id'], name=op.f(
                        'fk_food_log_serving_size_id_serving_size'), ondelete='CASCADE'),
                    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f(
                        'fk_food_log_user_id_user'), ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id', name=op.f('pk_food_log'))
                    )
    op.create_index(op.f('ix_food_log_serving_size_id'),
                    'food_log', ['serving_size_id'], unique=False)
    op.create_index(op.f('ix_food_log_user_id'),
                    'food_log', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_food_log_user_id'), table_name='food_log')
    op.drop_index(op.f('ix_food_log_serving_size_id'), table_name='food_log')
    op.drop_table('food_log')
    op.drop_index(op.f('ix_serving_size_food_id'), table_name='serving_size')
    op.drop_table('serving_size')
    op.drop_table('food')
    # ### end Alembic commands ###
