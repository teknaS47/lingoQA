# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        def index
          @bugzilla_product_names = BugzillaProductName.all
          render json: @bugzilla_product_names
        end

        private
      def product
        @product = Product.find(params[:product_id])
      end
      end
    end
  end
  