# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        before_action :version
        def index
          @bugzilla_product_names = BugzillaProductName.@version

        #   @version.bugzilla_product_names
          render json: @bugzilla_product_names
        end

      private
      def version
        @version = ProductVersion.find(params[:bugzilla_product_name_id])
      end

      end
    end
  end
  