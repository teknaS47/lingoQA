# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        before_action :version
        def index
          @bugzilla_product_names = @version.bugzilla_product_names_id
          
        #   BugzillaProductName.all

        #   @version.bugzilla_product_names
          render json: @bugzilla_product_names
        end

      private
      def version
        @version = BugzillaProductName.find(params[:bugzilla_product_names_id])
      end

      end
    end
  end
  