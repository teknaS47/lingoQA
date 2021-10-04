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

      def new
        version = ProductVersion.new
      end

      def create
        version = ProductVersion.new(version_name_params)
        version.save!
        rescue ActiveRecord::RecordInvalid => invalid
          render json: { errors: invalid.record.errors }
      end

      def version_name_params
        params.permit(:name, :product_id, :bugzilla_product_names_id)
      end

      private
      def product
        @product = Product.find(params[:product_id])
      end

      

    end
  end
end
