# frozen_string_literal: true

module Api
  module V1
    # Controller methods for product model
    class ProductsController < ApplicationController
      def index
        @products = Product.all
        render json: @products
      end
      def create
        name = Product.new(screenshot_params)
        screenshot.save!
        rescue ActiveRecord::RecordInvalid => invalid
          render json: { errors: invalid.record.errors }
      end
    end
  end
end
