class Group < ApplicationRecord
  has_many :users, throught: :users_groups
  has_many :messages
  has_many :users_groups
end
