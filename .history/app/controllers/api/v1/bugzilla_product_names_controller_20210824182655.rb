# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        before_action :version
        def index

          @bugzilla_product_names = @version.bugzilla_product_names_id
          @bn = BugzillaProductName.find_by(id:2)
          
        #   BugzillaProductName.all

        #   @version.bugzilla_product_names
          render json: @bn
        end

      private
      def version
        @version = ProductVersion.find(params[:id]) 
      end

      end
    end
  end
  