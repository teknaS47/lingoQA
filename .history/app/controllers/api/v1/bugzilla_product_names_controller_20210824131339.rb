# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        def index
          @bugzilla_product_names = BugzillaProductName.all

        #   @version.bugzilla_product_names
          render json: @bugzilla_product_names
        end

    #   private
    #   def version
    #     @version = Version.find(params[:product_version_id])
    #   end

      end
    end
  end
  