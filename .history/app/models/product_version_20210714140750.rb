# frozen_string_literal: true

# The ProductVersion class represents the product_version model
class ProductVersion < ApplicationRecord
  # Screenshots references a product_version
  has_many :screenshots
  # Version reference a product
  belongs_to :product
  validates :name, presence: true
end
