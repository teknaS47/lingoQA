# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        def index
          @bugzilla_product_names = @version.all

        #   @version.bugzilla_product_names
          render json: @bugzilla_product_names
        end

      private
      def version
        @version = ProductVersion.find(params[:bugzilla_product_names_id])
      end

      end
    end
  end
  