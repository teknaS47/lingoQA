# frozen_string_literal: true

module Api
  module V1
    # Controller methods for product_version model
    class ProductVersionsController < ApplicationController
      before_action :product
      def index
        @versions = @product.product_versions
        render json: @versions
      end

      private
      def product
        @product = Product.find(params[:product_id])
      end
    end
  end
end
