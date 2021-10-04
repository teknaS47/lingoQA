# frozen_string_literal: true

module Api
  module V1
    # Controller methods for locales model
    class LocalesController < ApplicationController
      def index
        @locales = Locale.all
        render json: @locales
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
