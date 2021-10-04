# frozen_string_literal: true

module Api
  module V1
    # Controller methods for product model
    class ProductsController < ApplicationController
      def index
        @products = Product.all
        render json: @products
      end
      def show
        @allProducts = Product.all
        render json: @allProducts
    end
  end
end
