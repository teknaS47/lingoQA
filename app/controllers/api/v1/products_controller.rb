# frozen_string_literal: true

module Api
  module V1
    # Controller methods for product model
    class ProductsController < ApplicationController
      def index
        @products = Product.all
        render json: @products
      end

      def new
        product = Product.new
      end

      def create
        product = Product.new(product_name_params)
        product.save!
      rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors }
      end

      def product_name_params
        params.permit(:name)
      end
    end
  end
end
